import {get,put,list,del} from '@vercel/blob';
import {createHash,timingSafeEqual,randomBytes,randomUUID} from 'node:crypto';
const BASE=process.env.REGISTRATION_STORAGE_PREFIX||'encontreumtecnico/v1/';
const TYPES=new Set(['clientes','solicitacoes']);
const STATES=new Set(['pending','approved']);
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UF=new Set('AC AL AM AP BA CE DF ES GO MA MG MS MT PA PB PE PI PR RJ RN RO RR RS SC SE SP TO'.split(' '));
export const hasStorage=()=>Boolean(process.env.BLOB_READ_WRITE_TOKEN);
export const newId=()=>randomUUID();
export const newSecret=()=>randomBytes(24).toString('hex');
export const digest=s=>createHash('sha256').update(s).digest('hex');
export const norm=(s,max=180)=>typeof s==='string'?s.replace(/\s+/g,' ').trim().slice(0,max):'';
export const digits=s=>String(s||'').replace(/\D/g,'');
export function verify(s,expected) {
 if(typeof s!=='string'||typeof expected!=='string'||expected.length!==64)return false;
 const one=Buffer.from(digest(s));const two=Buffer.from(expected);
 return one.length===two.length&&timingSafeEqual(one,two);
}
export function checkOwner(req,item) {
 const authorization=String(req.headers?.authorization||'');
 const key=authorization.startsWith('Bearer ')?authorization.slice(7):'';
 return /^[0-9a-f]{48}$/.test(key)&&verify(key,item?.chaveHash);
}
export function isAdmin(req){
 const token=String(req.headers?.authorization||'').replace(/^Bearer /,'');
 const expected=process.env.ADMIN_ACCESS_TOKEN;
 if(!expected||expected.length<24)return false;
 const a=Buffer.from(token);const b=Buffer.from(expected);
 return a.length===b.length&&timingSafeEqual(a,b);
}
export function key(type,state,id) {
 if(!TYPES.has(type)||!STATES.has(state)||!UUID.test(id))throw Error('Identificador inválido');
 return BASE+type+'/'+state+'/'+id+'.json';
}
export async function write(type,state,id,record,overwrite=false){
 await put(key(type,state,id),JSON.stringify(record),{access:'private',addRandomSuffix:false,allowOverwrite:overwrite,contentType:'application/json'});
}
export async function read(type,state,id){
 const entry=await get(key(type,state,id),{access:'private',useCache:false});
 return entry?.stream?JSON.parse(await new Response(entry.stream).text()):null;
}
export async function erase(type,state,id){return del(key(type,state,id));}
export async function page(type,state,{cursor,limit=50}={}){
 if(!TYPES.has(type)||!STATES.has(state))throw Error('Tipo inválido');
 const batch=await list({prefix:BASE+type+'/'+state+'/',limit:Math.min(100,Math.max(1,limit)),cursor:cursor||undefined});
 const records=await Promise.all(batch.blobs.map(async blob=>{
   const id=blob.pathname.split('/').at(-1)?.replace(/\.json$/,'');
   if(!UUID.test(id||''))return null;
   try{return await read(type,state,id);}catch{return null;}
 }));
 return {records:records.filter(Boolean),cursor:batch.hasMore?batch.cursor:null};
}
export function response(res,status,data){
 res.setHeader('X-Robots-Tag','noindex,nofollow');
 res.setHeader('Cache-Control','no-store');
 return res.status(status).json(data);
}
export function validateCliente(v){
 if(!v||typeof v!=='object'||Array.isArray(v)||v.bot)return {error:'Dados inválidos.'};
 const nome=norm(v.nome,110),setor=norm(v.setor,110),cidade=norm(v.cidade,90),
  uf=norm(v.uf,2).toUpperCase(),emailValue=norm(v.email,180).toLowerCase(),
  whatsapp=digits(v.whatsapp).slice(0,13);
 if(nome.length<3||cidade.length<2||setor.length<3||!UF.has(uf)||!email.test(emailValue))
    return {error:'Preencha nome, setor, e-mail, cidade e UF corretamente.'};
 if(whatsapp && (whatsapp.length<10||whatsapp.length>13))return {error:'WhatsApp inválido.'};
 if(v.aceite!==true||v.autorizacaoPublica!==true)return {error:'É necessário aceitar as condições e autorizar as informações públicas.'};
 return {data:{nome,setor,cidade,uf,email:emailValue,whatsapp,
   descricao:norm(v.descricao,800)}};
}
export function validateSolicitacao(v){
 if(!v||typeof v!=='object'||Array.isArray(v)||v.bot)return {error:'Solicitação inválida.'};
 const titulo=norm(v.titulo,110),especialidade=norm(v.especialidade,110),
  descricao=norm(v.descricao,1200),cidade=norm(v.cidade,90),uf=norm(v.uf,2).toUpperCase();
 if(titulo.length<8||especialidade.length<3||descricao.length<20||cidade.length<2||!UF.has(uf))
  return {error:'Informe título, especialidade, descrição com pelo menos 20 caracteres, cidade e UF.'};
 if(v.aceite!==true)return {error:'Aceite a divulgação da solicitação.'};
 return {data:{titulo,especialidade,descricao,cidade,uf,exibirContato:v.exibirContato===true}};
}
export function publicCliente(v){
 return {id:v.id,nome:v.nome,setor:v.setor,cidade:v.cidade,uf:v.uf,descricao:v.descricao||'',aprovadoEm:v.aprovadoEm||null};
}
export function publicSolicitacao(v){
 return {id:v.id,titulo:v.titulo,especialidade:v.especialidade,descricao:v.descricao,
  cidade:v.cidade,uf:v.uf,clienteNome:v.clienteNome||'Cliente cadastrado',
  publicadoEm:v.publicadoEm||null};
}
