import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
if(!process.env.BLOB_READ_WRITE_TOKEN || !process.env.ADMIN_ACCESS_TOKEN){
 if(process.env.VERCEL==='1')throw Error('Blob ou administração sem configuração');
 console.log('Cliente e solicitações E2E ignorados fora da Vercel');
}else{
 process.env.REGISTRATION_STORAGE_PREFIX='encontreumtecnico/diagnostics/portal/'+randomUUID()+'/';
 const [{default:client},{default:admin},{default:requests},{default:own},{default:publicClients},store]=await Promise.all([
  import('../api/cliente.js'),import('../api/admin-portal.js'),import('../api/solicitacoes.js'),
  import('../api/minhas-solicitacoes.js'),import('../api/clientes.js'),import('../lib/portal.js')
 ]);
 const mk=()=>({headers:{},code:0,body:null,setHeader(k,v){this.headers[k]=v;return this},status(x){this.code=x;return this},json(v){this.body=v;return this}});
 async function call(handler,method,body={},token='',query={}){
  const res=mk();await handler({method,body,query,headers:{authorization:token?'Bearer '+token:''}},res);return res;
 }
 const adminKey=process.env.ADMIN_ACCESS_TOKEN;
 const fields={acao:'cadastro',nome:'Cliente Interno (não publicado)',setor:'Teste isolado',cidade:'Curitiba',
  uf:'PR',email:'teste@example.invalid',whatsapp:'41999999999',descricao:'Registro privado para validar fluxo.',aceite:true,autorizacaoPublica:true};
 let clientId,jobId;
 try{
  const created=await call(client,'POST',fields);
  assert.equal(created.code,201);clientId=created.body.id;const secret=created.body.chave;
  const denied=await call(client,'POST',{id:clientId},'invalid');assert.equal(denied.code,401);
  const loaded=await call(client,'POST',{id:clientId},secret);assert.equal(loaded.code,200);
  assert.equal(loaded.body.cliente.email,fields.email);

  const job={clienteId:clientId,titulo:'Verificar rede de dados (diagnóstico)',especialidade:'Rede cabeada',
   descricao:'Precisamos validar cabeamento da rede de teste do sistema.',cidade:'Curitiba',uf:'PR',aceite:true,exibirContato:false};
  const submitted=await call(requests,'POST',job,secret);assert.equal(submitted.code,201);jobId=submitted.body.id;
  const blocked=await call(admin,'POST',{tipo:'solicitacao',id:jobId,acao:'aprovar'},adminKey);
  assert.equal(blocked.code,409,'Solicitação não deve ser aprovada antes do cliente');

  const inbox=await call(admin,'GET',{},adminKey,{tipo:'cliente'});
  assert.equal(inbox.code,200);assert.ok(inbox.body.pendentes.some(x=>x.id===clientId));
  const approveClient=await call(admin,'POST',{tipo:'cliente',id:clientId,acao:'aprovar'},adminKey);
  assert.equal(approveClient.code,200);
  const clientPublic=await call(publicClients,'GET');
  assert.equal(clientPublic.code,200);const c=clientPublic.body.clientes.find(x=>x.id===clientId);
  assert.ok(c);assert.equal('email' in c,false);assert.equal('whatsapp' in c,false);

  const approveJob=await call(admin,'POST',{tipo:'solicitacao',id:jobId,acao:'aprovar'},adminKey);
  assert.equal(approveJob.code,200);
  const visible=await call(requests,'GET');assert.equal(visible.code,200);
  const record=visible.body.solicitacoes.find(x=>x.id===jobId);
  assert.ok(record);assert.equal(record.whatsapp,'');
  const mine=await call(own,'POST',{clienteId},secret);
  assert.equal(mine.code,200);assert.ok(mine.body.solicitacoes.some(x=>x.id===jobId));

  const edited=await call(own,'PUT',{...job,clienteId:clientId,id:jobId,descricao:'Revisamos o endereço da rede do escritório experimental.'},secret);
  assert.equal(edited.code,200);assert.equal((await store.read('solicitacoes','approved',jobId)).descricao,job.descricao);
  const reapprove=await call(admin,'POST',{tipo:'solicitacao',id:jobId,acao:'aprovar'},adminKey);
  assert.equal(reapprove.code,200);

  const deletedJob=await call(own,'DELETE',{clienteId:clientId,id:jobId},secret);assert.equal(deletedJob.code,200);
  assert.equal(await store.read('solicitacoes','approved',jobId),null);
  const deletedClient=await call(client,'DELETE',{id:clientId},secret);assert.equal(deletedClient.code,200);
  assert.equal(await store.read('clientes','approved',clientId),null);
  console.log('Cliente + solicitação E2E: cadastro, autenticação, moderação, publicação, revisão e exclusão aprovados.');
 }finally{
  if(jobId){await store.erase('solicitacoes','pending',jobId).catch(()=>{});await store.erase('solicitacoes','approved',jobId).catch(()=>{});}
  if(clientId){await store.erase('clientes','pending',clientId).catch(()=>{});await store.erase('clientes','approved',clientId).catch(()=>{});}
  console.log('Cliente + solicitação E2E: registros privados de diagnóstico limpos.');
 }
}
