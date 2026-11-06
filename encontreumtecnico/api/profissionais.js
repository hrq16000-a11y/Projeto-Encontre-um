// Exibe somente perfis públicos do WordPress. Não migra nem acessa contas privadas.
import { get, put } from '@vercel/blob';
import { extractCandidateSitemap, mergeSitemapDirectory } from '../lib/wordpress.js';
const ORIGIN='https://encontreumtecnico.com';
const SITEMAPS=['/candidate-sitemap1.xml','/candidate-sitemap2.xml'];
const CACHE='encontreumtecnico/public-wordpress/tecnicos-sitemaps-v2.json';
const FIRST='encontreumtecnico/public-wordpress/tecnicos-primeira-pagina.json';
const FULL_TTL_MS=6*60*60*1000, PARTIAL_TTL_MS=10*60*1000;

async function readCache(path) {
  if(!process.env.BLOB_READ_WRITE_TOKEN)return null;
  try{
    const resource=await get(path,{access:'private'});
    if(!resource?.stream)return null;
    const data=JSON.parse(await new Response(resource.stream).text());
    return Array.isArray(data.profissionais)?data:null;
  }catch{return null;}
}
async function saveCache(data) {
  if(!process.env.BLOB_READ_WRITE_TOKEN)return;
  try{
    await put(CACHE,JSON.stringify(data),{
      access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:true
    });
  }catch{/* Disponibilidade da origem não depende do sucesso de gravar cache. */}
}
async function fetchPublicSitemap(path) {
  const response=await fetch(ORIGIN+path,{
    headers:{Accept:'application/xml,text/xml', 'User-Agent':'EncontreUmTecnico-Migracao/1.0'},
    signal:AbortSignal.timeout(6500)
  });
  if(!response.ok)throw new Error('Sitemap HTTP '+response.status);
  const body=await response.text();
  if(body.length>900000)throw new Error('Sitemap excedeu limite');
  const profiles=extractCandidateSitemap(body);
  if(!profiles.length)throw new Error('Sitemap sem perfis válidos');
  return profiles;
}
function output(res,payload,origin) {
  res.setHeader('Cache-Control','public, s-maxage=600, stale-while-revalidate=1200');
  res.setHeader('X-Robots-Tag','noindex,nofollow');
  return res.status(200).json({
    status:payload.status,origem:origin,
    total:payload.profissionais.length,
    fontesValidas:payload.fontesValidas||0,
    profissionais:payload.profissionais
  });
}
export default async function handler(req,res){
  if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({erro:'Método não permitido'});}
  const cached=await readCache(CACHE);
  const ttl=cached?.status==='ok'?FULL_TTL_MS:PARTIAL_TTL_MS;
  if(cached && Date.now()-Date.parse(cached.at||0)<ttl)return output(res,cached,'wordpress-cache-sitemaps-publicos');
  const results=await Promise.all(SITEMAPS.map(p=>fetchPublicSitemap(p).then(v=>({ok:true,records:v}),()=>({ok:false,records:[]}))));
  const valid=results.filter(x=>x.ok).length;
  if(valid){
    const oldFirst=await readCache(FIRST);
    const profiles=mergeSitemapDirectory(results.map(x=>x.records),oldFirst?.profissionais);
    const payload={profissionais:profiles,status:valid===SITEMAPS.length?'ok':'parcial',fontesValidas:valid,at:new Date().toISOString()};
    // Se a origem oscila, não diminuir silenciosamente um cache anterior mais completo.
    if(cached?.profissionais?.length>profiles.length)return output(res,cached,'wordpress-cache-sitemaps-publicos');
    await saveCache(payload);
    return output(res,payload,'wordpress-sitemaps-publicos');
  }
  if(cached)return output(res,cached,'wordpress-cache-sitemaps-publicos');
  const oldFirst=await readCache(FIRST);
  if(oldFirst?.profissionais?.length)return output(res,{profissionais:oldFirst.profissionais,status:'parcial',fontesValidas:0},'wordpress-primeira-pagina-cache');
  return output(res,{profissionais:[],status:'indisponivel',fontesValidas:0},'wordpress-sitemaps-publicos');
}
