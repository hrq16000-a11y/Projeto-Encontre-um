import {hasStorage,read,page,write,erase,response,checkOwner,validateSolicitacao} from '../lib/portal.js';
export default async function handler(req,res){
 if(!['POST','PUT','DELETE'].includes(req.method)){res.setHeader('Allow','POST, PUT, DELETE');return response(res,405,{erro:'Método não permitido.'});}
 if(!hasStorage())return response(res,503,{erro:'Armazenamento não configurado.'});
 const b=req.body||{},clienteId=String(b.clienteId||'');
 if(!/^[0-9a-f-]{36}$/i.test(clienteId))return response(res,401,{erro:'Acesso inválido.'});
 try{
  const cliente=await read('clientes','approved',clienteId)||await read('clientes','pending',clienteId);
  if(!checkOwner(req,cliente))return response(res,401,{erro:'Acesso inválido.'});
  if(req.method==='POST'){
   const pending=await page('solicitacoes','pending',{limit:100}),approved=await page('solicitacoes','approved',{limit:100});
   return response(res,200,{solicitacoes:[
    ...pending.records.filter(x=>x.clienteId===clienteId).map(x=>({id:x.id,titulo:x.titulo,estado:'pendente',descricao:x.descricao})),
    ...approved.records.filter(x=>x.clienteId===clienteId).map(x=>({id:x.id,titulo:x.titulo,estado:'publicado',descricao:x.descricao}))
   ],temMais:Boolean(pending.cursor||approved.cursor)});
  }
  const id=String(b.id||'');if(!/^[0-9a-f-]{36}$/i.test(id))return response(res,400,{erro:'Identificador inválido.'});
  const pending=await read('solicitacoes','pending',id),approved=await read('solicitacoes','approved',id);
  const current=pending||approved;
  if(!current||current.clienteId!==clienteId)return response(res,404,{erro:'Solicitação não encontrada.'});
  if(req.method==='DELETE'){
   await Promise.all([erase('solicitacoes','pending',id),erase('solicitacoes','approved',id)]);
   return response(res,200,{sucesso:true,estado:'excluido'});
  }
  const check=validateSolicitacao(b);if(check.error)return response(res,400,{erro:check.error});
  await write('solicitacoes','pending',id,{...check.data,id,clienteId,clienteNome:cliente.nome,
    whatsapp:cliente.whatsapp||'',status:'pending',criadoEm:current.criadoEm,
    atualizadoEm:new Date().toISOString()},true);
  return response(res,200,{sucesso:true,estado:'pendente'});
 }catch{return response(res,503,{erro:'Não foi possível concluir a operação.'});}
}
