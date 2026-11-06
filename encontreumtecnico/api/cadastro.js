import { randomUUID, randomBytes } from 'node:crypto';
import { configured, validate, hash, save, respond } from '../lib/core.js';

export default async function handler(req,res) {
  if(req.method!=='POST') {res.setHeader('Allow','POST');return respond(res,405,{erro:'Método não permitido.'});}
  if(!configured()) return respond(res,503,{erro:'Cadastro temporariamente indisponível: armazenamento não configurado.'});
  const raw=req.body;
  if(Buffer.byteLength(JSON.stringify(raw||{}),'utf8')>12000) return respond(res,413,{erro:'Dados muito extensos.'});
  const checked=validate(raw);
  if(checked.error) return respond(res,400,{erro:checked.error});
  const id=randomUUID(), chave=randomBytes(24).toString('hex');
  const item={
    ...checked.data,id,status:'pending',criadoEm:new Date().toISOString(),
    chaveHash:hash(chave)
  };
  try{
    await save('pending',id,item);
    return respond(res,201,{
      sucesso:true,id,chave,
      mensagem:'Cadastro recebido e salvo. O perfil entrará na galeria após conferência administrativa.'
    });
  }catch{
    return respond(res,503,{erro:'Não foi possível salvar o cadastro. Tente novamente.'});
  }
}
