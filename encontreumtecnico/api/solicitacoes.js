import {hasStorage,newId,read,write,page,response,checkOwner,validateSolicitacao,publicSolicitacao} from '../lib/portal.js';
export default async function handler(req,res){
 if(!hasStorage())return response(res,503,{erro:'Armazenamento não configurado.'});
 if(req.method==='GET'){
  try {
   const result=await page('solicitacoes','approved',{cursor:typeof req.query?.cursor==='string'?req.query.cursor.slice(0,500):undefined,limit:80});
   res.setHeader('Cache-Control','public,s-maxage=60,stale-while-revalidate=120');
   return res.status(200).json({solicitacoes:result.records.map(publicSolicitacao),cursor:result.cursor});
  }catch{return response(res,503,{erro:'Não foi possível carregar solicitações.'});}
 }
 if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return response(res,405,{erro:'Método não permitido.'});}
 const body=req.body||{};
 if(JSON.stringify(body).length>14000)return response(res,413,{erro:'Dados muito extensos.'});
 const check=validateSolicitacao(body);if(check.error)return response(res,400,{erro:check.error});
 const clienteId=String(body.clienteId||'');
 if(!/^[0-9a-f-]{36}$/i.test(clienteId))return response(res,401,{erro:'Acesso do cliente inválido.'});
 try{
  const cliente=await read('clientes','approved',clienteId)||await read('clientes','pending',clienteId);
  if(!checkOwner(req,cliente))return response(res,401,{erro:'Acesso do cliente inválido.'});
  const id=newId();
  await write('solicitacoes','pending',id,{...check.data,id,
    clienteId,clienteNome:cliente.nome,whatsapp:cliente.whatsapp||'',
    criadoEm:new Date().toISOString(),status:'pending'});
  return response(res,201,{sucesso:true,id,estado:'pendente',mensagem:'Solicitação salva e enviada para revisão.'});
 }catch{return response(res,503,{erro:'Não foi possível salvar a solicitação.'});}
}
