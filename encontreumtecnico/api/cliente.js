import {hasStorage,newId,newSecret,digest,norm,checkOwner,read,write,erase,page,response,validateCliente} from '../lib/portal.js';
export default async function handler(req,res){
 if(!hasStorage())return response(res,503,{erro:'Cadastro de clientes indisponível.'});
 if(!['POST','PUT','DELETE'].includes(req.method)){res.setHeader('Allow','POST, PUT, DELETE');return response(res,405,{erro:'Método não permitido.'});}
 const body=req.body||{};
 if(JSON.stringify(body).length>12000)return response(res,413,{erro:'Dados muito extensos.'});
 if(req.method==='POST'&&body.acao==='cadastro'){
  const check=validateCliente(body);if(check.error)return response(res,400,{erro:check.error});
  const id=newId(),chave=newSecret(),now=new Date().toISOString();
  try{
   await write('clientes','pending',id,{...check.data,id,criadoEm:now,status:'pending',chaveHash:digest(chave)});
   return response(res,201,{sucesso:true,id,chave,estado:'pendente',mensagem:'Cadastro salvo, aguardando aprovação.'});
  }catch{return response(res,503,{erro:'Não foi possível salvar. Tente novamente.'});}
 }
 const id=norm(body.id,40);
 if(!/^[0-9a-f-]{36}$/i.test(id))return response(res,401,{erro:'Protocolo ou chave inválidos.'});
 try{
  const pending=await read('clientes','pending',id), approved=await read('clientes','approved',id);
  const record=pending||approved;
  if(!checkOwner(req,record))return response(res,401,{erro:'Protocolo ou chave inválidos.'});
  if(req.method==='POST')return response(res,200,{id,estado:pending?'pendente':'aprovado',cliente:{
    nome:record.nome,setor:record.setor,cidade:record.cidade,uf:record.uf,
    email:record.email,whatsapp:record.whatsapp,descricao:record.descricao||''
  }});
  if(req.method==='DELETE'){
   // Revogação explícita: apagar todas as solicitações ligadas ao cliente antes de apagar a conta.
   // Não concluir a exclusão da conta se uma página não puder ser processada.
   for(const state of ['pending','approved']){
     let cursor=null,iterations=0,related=[];
     do{
       const batch=await page('solicitacoes',state,{cursor,limit:100});
       related.push(...batch.records.filter(x=>x.clienteId===id).map(x=>x.id));
       cursor=batch.cursor;
       iterations++;
       if(iterations>100)throw Error('Limite de registros excedido');
     }while(cursor);
     for(const rid of related){await erase('solicitacoes',state,rid);}
   }
   await Promise.all([erase('clientes','pending',id),erase('clientes','approved',id)]);
   return response(res,200,{sucesso:true,estado:'excluido'});
  }
  const check=validateCliente(body);if(check.error)return response(res,400,{erro:check.error});
  await write('clientes','pending',id,{...check.data,id,criadoEm:record.criadoEm,
    status:'pending',chaveHash:record.chaveHash,atualizadoEm:new Date().toISOString()},true);
  return response(res,200,{sucesso:true,estado:'pendente',mensagem:'Informações atualizadas e enviadas para revisão.'});
 }catch{return response(res,503,{erro:'Não foi possível processar o cadastro.'});}
}
