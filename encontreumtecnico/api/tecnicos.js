import { configured, find, publicFields, respond } from '../lib/core.js';

export default async function handler(req,res) {
  if(req.method!=='GET') {res.setHeader('Allow','GET');return respond(res,405,{erro:'Método não permitido.'});}
  if(!configured()) return respond(res,503,{erro:'Galeria indisponível: armazenamento não configurado.',tecnicos:[]});
  const cursor=typeof req.query?.cursor==='string' ? req.query.cursor.slice(0,400) : undefined;
  try{
    const page=await find('approved',60,cursor);
    res.setHeader('Cache-Control','public, s-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({tecnicos:page.items.map(publicFields),cursor:page.cursor,origem:'cadastros-aprovados'});
  }catch{return respond(res,503,{erro:'Não foi possível carregar os cadastros.',tecnicos:[]});}
}
