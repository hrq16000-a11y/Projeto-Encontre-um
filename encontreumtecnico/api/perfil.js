// Gestão autenticada por chave pessoal provisória. Google OAuth substituirá o acesso por chave.
import { configured, load, save, remove, validate, hash, verifySecret, respond } from '../lib/core.js';

export default async function handler(req,res) {
  res.setHeader('X-Robots-Tag','noindex,nofollow');
  const allowed=['POST','PUT','DELETE'];
  if(!allowed.includes(req.method)){res.setHeader('Allow',allowed.join(', '));return respond(res,405,{erro:'Método não permitido.'});}
  if(!configured())return respond(res,503,{erro:'Armazenamento temporariamente indisponível.'});
  const id=String(req.body?.id||'');
  const authorization=String(req.headers?.authorization||'');
  const key=authorization.startsWith('Bearer ')?authorization.slice(7):'';
  if(!/^[0-9a-f-]{36}$/i.test(id)||!/^[0-9a-f]{48}$/i.test(key))
    return respond(res,401,{erro:'Protocolo ou chave inválidos.'});

  try {
    const pending=await load('pending',id);
    const existing=pending||await load('approved',id);
    if(!existing?.chaveHash||!verifySecret(hash(key),existing.chaveHash))
      return respond(res,401,{erro:'Protocolo ou chave inválidos.'});

    if(req.method==='POST'){
      return respond(res,200,{
        id,estado:pending?'pendente':'aprovado',
        perfil:{
          nome:existing.nome,especialidade:existing.especialidade,cidade:existing.cidade,uf:existing.uf,
          descricao:existing.descricao,email:existing.email||'',whatsapp:existing.whatsapp||''
        }
      });
    }
    if(req.method==='PUT'){
      const body=req.body||{};
      if(Buffer.byteLength(JSON.stringify(body),'utf8')>12000)return respond(res,413,{erro:'Dados muito extensos.'});
      const check=validate(body);
      if(check.error)return respond(res,400,{erro:check.error});
      // O perfil aprovado continua com seus dados anteriores até a aprovação das alterações.
      await save('pending',id,{
        ...check.data,id,status:'pending',chaveHash:existing.chaveHash,
        criadoEm:existing.criadoEm||new Date().toISOString(),atualizadoEm:new Date().toISOString()
      },true);
      return respond(res,200,{sucesso:true,id,estado:'pendente',mensagem:'Alterações salvas e enviadas para nova revisão.'});
    }
    // Direito de excluir: remove ambas as versões, inclusive quando existe revisão pendente.
    await Promise.all([remove('pending',id),remove('approved',id)]);
    return respond(res,200,{sucesso:true,id,estado:'excluido'});
  } catch {
    return respond(res,503,{erro:'Não foi possível concluir a operação. Tente novamente.'});
  }
}
