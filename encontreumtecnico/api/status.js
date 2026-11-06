import { configured, load, hash, verifySecret, respond } from '../lib/core.js';
export default async function handler(req,res){
  if(req.method!=='POST'){res.setHeader('Allow','POST');return respond(res,405,{erro:'Método não permitido.'});}
  if(!configured())return respond(res,503,{erro:'Consulta temporariamente indisponível.'});
  const id=String(req.body?.id||'');
  if(!/^[0-9a-f-]{36}$/i.test(id))return respond(res,400,{erro:'Protocolo inválido.'});
  const authorization=String(req.headers.authorization||'');
  const key=authorization.startsWith('Bearer ')?authorization.slice(7):'';
  if(key.length<40||key.length>120)return respond(res,401,{erro:'Chave inválida.'});
  for(const status of ['pending','approved']){
    try{
      const record=await load(status,id);
      if(!record)continue;
      if(!record.chaveHash||!verifySecret(hash(key),record.chaveHash))return respond(res,401,{erro:'Chave inválida.'});
      return respond(res,200,{id,estado:status==='pending'?'pendente':'aprovado',atualizadoEm:record.aprovadoEm||record.criadoEm});
    }catch{/* Tentar o próximo estado sem revelar dados. */}
  }
  return respond(res,404,{erro:'Cadastro não encontrado.'});
}
