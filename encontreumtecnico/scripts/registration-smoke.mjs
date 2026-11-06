// E2E in a private, isolated Blob namespace. Never appears in the actual gallery.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';

if(!process.env.BLOB_READ_WRITE_TOKEN || !process.env.ADMIN_ACCESS_TOKEN){
 if(process.env.VERCEL==='1')throw new Error('Variáveis de armazenamento/admin ausentes no ambiente Vercel');
 console.log('Cadastro E2E: ignorado fora da Vercel.');
} else {
 const runId=randomUUID();
 process.env.REGISTRATION_STORAGE_PREFIX='encontreumtecnico/diagnostics/registration/'+runId+'/';
 const [{default:register},{default:admin},{default:status},{default:technicians},core]=await Promise.all([
  import('../api/cadastro.js'),import('../api/admin.js'),import('../api/status.js'),import('../api/tecnicos.js'),import('../lib/core.js')
 ]);
 function response(){
  return {headers:{},code:200,payload:null,setHeader(name,value){this.headers[name]=value;return this;},status(code){this.code=code;return this;},json(payload){this.payload=payload;return this;}};
 }
 const body={nome:'Verificação Interna (não publicado)',especialidade:'Teste de persistência',
 cidade:'Curitiba',uf:'PR',email:'teste@exemplo.invalid',whatsapp:'',descricao:'Registro temporário isolado em área de diagnóstico.',
 aceite:true,autorizacaoPublica:true,campoExtra:''};
 let id=null;
 try{
  const created=response();
  await register({method:'POST',body,headers:{}},created);
  assert.equal(created.code,201,'Cadastro não foi persistido');
  id=created.payload.id;
  const key=created.payload.chave;
  assert.ok(/^[0-9a-f-]{36}$/i.test(id));
  assert.ok(typeof key==='string' && key.length>=40);
  const stored=await core.load('pending',id);
  assert.equal(stored.nome,body.nome);
  assert.equal(stored.email,body.email);

  const pending=response();
  await status({method:'POST',body:{id},headers:{authorization:'Bearer '+key}},pending);
  assert.equal(pending.code,200);
  assert.equal(pending.payload.estado,'pendente');

  const denied=response();
  await admin({method:'GET',headers:{authorization:'Bearer invalid'}},denied);
  assert.equal(denied.code,401);

  const validAuth='Bearer '+process.env.ADMIN_ACCESS_TOKEN;
  const queue=response();
  await admin({method:'GET',headers:{authorization:validAuth}},queue);
  assert.equal(queue.code,200);
  assert.ok(queue.payload.pendentes.some(p=>p.id===id));

  const approval=response();
  await admin({method:'POST',headers:{authorization:validAuth},body:{id,acao:'aprovar'}},approval);
  assert.equal(approval.code,200);

  const approved=response();
  await status({method:'POST',body:{id},headers:{authorization:'Bearer '+key}},approved);
  assert.equal(approved.code,200);
  assert.equal(approved.payload.estado,'aprovado');

  const gallery=response();
  await technicians({method:'GET',query:{},headers:{}},gallery);
  assert.equal(gallery.code,200);
  const found=gallery.payload.tecnicos.find(p=>p.id===id);
  assert.ok(found,'Cadastro aprovado não foi localizado na galeria');
  assert.equal(Object.hasOwn(found,'email'),false);
  assert.equal(Object.hasOwn(found,'chaveHash'),false);
  console.log('Cadastro E2E: gravação → fila → aprovação → status → galeria: aprovado.');
 } finally {
  if(id){
   await core.remove('pending',id).catch(()=>{});
   await core.remove('approved',id).catch(()=>{});
   assert.equal(await core.load('pending',id),null);
   assert.equal(await core.load('approved',id),null);
   console.log('Cadastro E2E: registros diagnósticos privados excluídos.');
  }
 }
}
