import {hasStorage,isAdmin,read,page,write,erase,response,publicCliente} from '../lib/portal.js';
const TYPES={cliente:'clientes',solicitacao:'solicitacoes'};
export default async function handler(req,res) {
 if(!hasStorage()||!process.env.ADMIN_ACCESS_TOKEN)return response(res,503,{erro:'Administração indisponível.'});
 if(!isAdmin(req))return response(res,401,{erro:'Acesso não autorizado.'});
 if(req.method==='GET'){
  const kind=String(req.query?.tipo||'');
  if(!TYPES[kind])return response(res,400,{erro:'Tipo inválido.'});
  try{
   const items=await page(TYPES[kind],'pending',{cursor:typeof req.query?.cursor==='string'?req.query.cursor.slice(0,500):undefined,limit:60});
   return response(res,200,{pendentes:items.records.map(r=>kind==='cliente'?{
    id:r.id,nome:r.nome,cidade:r.cidade,uf:r.uf,setor:r.setor,descricao:r.descricao,
    email:r.email,whatsapp:r.whatsapp
   }:{
    id:r.id,titulo:r.titulo,clienteNome:r.clienteNome,clienteId:r.clienteId,
    cidade:r.cidade,uf:r.uf,especialidade:r.especialidade,descricao:r.descricao,
    exibirContato:r.exibirContato
   }),cursor:items.cursor});
  }catch{return response(res,503,{erro:'Fila indisponível.'});}
 }
 if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return response(res,405,{erro:'Método não permitido.'});}
 const b=req.body||{},kind=String(b.tipo||''),id=String(b.id||''),action=String(b.acao||'');
 if(!TYPES[kind]||!/^[0-9a-f-]{36}$/i.test(id)||!['aprovar','rejeitar'].includes(action))
  return response(res,400,{erro:'Solicitação administrativa inválida.'});
 const type=TYPES[kind];
 try{
  const record=await read(type,'pending',id);
  if(!record)return response(res,404,{erro:'Registro não encontrado.'});
  if(action==='aprovar'){
   if(kind==='solicitacao'){
    const cliente=await read('clientes','approved',record.clienteId);
    if(!cliente)return response(res,409,{erro:'Aprove primeiro o cadastro do cliente.'});
    record.clienteNome=cliente.nome;
    record.whatsapp=record.exibirContato?cliente.whatsapp||'':'';
   }
   await write(type,'approved',id,{...record,status:'approved',aprovadoEm:new Date().toISOString(),
    ...(kind==='solicitacao'?{publicadoEm:new Date().toISOString()}:{})},true);
  }
  await erase(type,'pending',id);
  return response(res,200,{sucesso:true,id,acao:action});
 }catch{return response(res,503,{erro:'Não foi possível revisar o registro.'});}
}
