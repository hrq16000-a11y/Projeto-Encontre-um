import { put, get, list, del } from '@vercel/blob';
import { createHash, timingSafeEqual } from 'node:crypto';

// A private build-only diagnostic namespace keeps test profiles completely outside the public gallery.
const PREFIX = process.env.REGISTRATION_STORAGE_PREFIX || 'encontreumtecnico/v1/';
const statuses = new Set(['pending','approved']);
const ID = /^[0-9a-f-]{36}$/i;

export const configured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
export const trim = (value, max=180) => typeof value === 'string' ? value.trim().replace(/\s+/g,' ').slice(0,max) : '';
export const digits = value => String(value || '').replace(/\D/g,'');
const emailOK = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 180;
export const hash = value => createHash('sha256').update(value).digest('hex');
export function verifySecret(actual, expected) {
  if (typeof actual !== 'string' || typeof expected !== 'string' || expected.length < 24) return false;
  const a=Buffer.from(actual), b=Buffer.from(expected);
  return a.length===b.length && timingSafeEqual(a,b);
}
export function validate(raw) {
  if(!raw || typeof raw!=='object' || Array.isArray(raw)) return {error:'Dados inválidos.'};
  const fields = {
    nome:trim(raw.nome,100),
    especialidade:trim(raw.especialidade,100),
    cidade:trim(raw.cidade,90),
    uf:trim(raw.uf,2).toUpperCase(),
    descricao:trim(raw.descricao,900),
    email:trim(raw.email,180).toLowerCase(),
    whatsapp:digits(raw.whatsapp).slice(0,13)
  };
  if (fields.nome.length < 3 || fields.especialidade.length < 3 || fields.cidade.length < 2)
    return {error:'Informe nome, especialidade e cidade válidos.'};
  if(!/^[A-Z]{2}$/.test(fields.uf)) return {error:'Informe a UF com duas letras.'};
  if(!emailOK(fields.email)) return {error:'Informe um e-mail válido.'};
  if(fields.whatsapp && (fields.whatsapp.length < 10 || fields.whatsapp.length > 13))
    return {error:'Informe um telefone com DDD válido ou deixe o campo vazio.'};
  if (raw.aceite !== true || raw.autorizacaoPublica !== true)
    return {error:'É necessário aceitar os termos e a divulgação dos dados profissionais informados.'};
  if (raw.campoExtra) return {error:'Não foi possível enviar este cadastro.'};
  return {data:fields};
}
export function keyFor(state, id) {
  if(!statuses.has(state) || !ID.test(id)) throw new Error('Identificador inválido.');
  return PREFIX + state + '/' + id + '.json';
}
export async function save(state, id, data, overwrite=false) {
  return put(keyFor(state,id), JSON.stringify(data), {
    access:'private', contentType:'application/json', addRandomSuffix:false, allowOverwrite:overwrite
  });
}
export async function load(state,id) {
  // Cadastros são dados transacionais: não aceitar leitura CDN desatualizada após revisão/exclusão.
  const blob=await get(keyFor(state,id), {access:'private',useCache:false});
  if(!blob || !blob.stream) return null;
  return JSON.parse(await new Response(blob.stream).text());
}
export async function remove(state,id) { return del(keyFor(state,id)); }
export async function find(state, max=48, cursor) {
  if(!statuses.has(state)) throw new Error('Estado inválido.');
  const page=await list({prefix:PREFIX+state+'/',limit:Math.min(max,100),cursor:cursor||undefined});
  const records=await Promise.all(page.blobs.map(async blob=>{
    try {return await load(state,blob.pathname.split('/').pop().replace(/\.json$/,''));}
    catch{return null;}
  }));
  return {items:records.filter(Boolean), cursor:page.hasMore?page.cursor:null};
}
export function publicFields(record) {
  return {
    id:record.id, nome:record.nome, especialidade:record.especialidade,
    cidade:record.cidade, uf:record.uf, descricao:record.descricao,
    whatsapp:record.whatsapp || '', aprovadoEm:record.aprovadoEm || null
  };
}
export function respond(res,code,data){
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('Cache-Control','no-store');
  return res.status(code).json(data);
}
