import {hasStorage,page,response,publicCliente} from '../lib/portal.js';
export default async function handler(req,res){
 if(req.method!=='GET'){res.setHeader('Allow','GET');return response(res,405,{erro:'Método não permitido.'});}
 if(!hasStorage())return response(res,503,{erro:'Armazenamento não configurado.'});
 try{
  const next=await page('clientes','approved',{cursor:typeof req.query?.cursor==='string'?req.query.cursor.slice(0,500):undefined,limit:80});
  res.setHeader('Cache-Control','public,s-maxage=60,stale-while-revalidate=120');
  return res.status(200).json({clientes:next.records.map(publicCliente),cursor:next.cursor});
 }catch{return response(res,503,{erro:'Não foi possível carregar clientes.'});}
}
