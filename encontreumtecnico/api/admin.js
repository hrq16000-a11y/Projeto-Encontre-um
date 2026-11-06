import { configured, verifySecret, find, load, save, remove, publicFields, respond } from '../lib/core.js';

function authorized(req) {
  const authorization=String(req.headers.authorization||'');
  const token=authorization.startsWith('Bearer ')?authorization.slice(7):'';
  return verifySecret(token,process.env.ADMIN_ACCESS_TOKEN||'');
}
export default async function handler(req,res) {
  res.setHeader('X-Robots-Tag','noindex,nofollow');
  if(!configured() || !process.env.ADMIN_ACCESS_TOKEN) return respond(res,503,{erro:'Administração não configurada.'});
  if(!authorized(req))return respond(res,401,{erro:'Acesso não autorizado.'});
  if(req.method==='GET'){
    try{
      const page=await find('pending',60);
      return respond(res,200,{pendentes:page.items.map(p=>({
        id:p.id,nome:p.nome,especialidade:p.especialidade,cidade:p.cidade,uf:p.uf,
        descricao:p.descricao,whatsapp:p.whatsapp,email:p.email,criadoEm:p.criadoEm
      })),cursor:page.cursor});
    }catch{return respond(res,503,{erro:'Não foi possível carregar os cadastros pendentes.'});}
  }
  if(req.method!=='POST')return respond(res,405,{erro:'Método não permitido.'});
  const id=String(req.body?.id||''),acao=String(req.body?.acao||'');
  if(!/^[0-9a-f-]{36}$/i.test(id) || !['aprovar','rejeitar'].includes(acao))
    return respond(res,400,{erro:'Ação ou identificador inválido.'});
  try{
    const item=await load('pending',id);
    if(!item)return respond(res,404,{erro:'Cadastro não encontrado.'});
    if(acao==='aprovar')await save('approved',id,{...publicFields(item),status:'approved',chaveHash:item.chaveHash,aprovadoEm:new Date().toISOString()},true);
    await remove('pending',id);
    return respond(res,200,{sucesso:true,acao,id});
  }catch{return respond(res,503,{erro:'Não foi possível concluir a operação.'});}
}
