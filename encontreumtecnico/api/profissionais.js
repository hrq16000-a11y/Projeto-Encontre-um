// Fonte somente pública do WordPress existente: nunca recria usuários ou acessa registros privados.
import { get, put } from '@vercel/blob';
import { extractPublicDirectory } from '../lib/wordpress.js';
const ROOT='https://encontreumtecnico.com';
const CACHE_PATH='encontreumtecnico/public-wordpress/tecnicos-primeira-pagina.json';
const TTL_MS=2*60*60*1000;

async function readCache(){
  if(!process.env.BLOB_READ_WRITE_TOKEN)return null;
  try{const result=await get(CACHE_PATH,{access:'private'});if(!result?.stream)return null;
  const payload=JSON.parse(await new Response(result.stream).text());
  return Array.isArray(payload.profissionais)?payload:null;
  }catch{return null;}
}
async function saveCache(profissionais){
  if(!process.env.BLOB_READ_WRITE_TOKEN)return;
  try{await put(CACHE_PATH,JSON.stringify({profissionais,at:new Date().toISOString()}),{
    access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:true
  });}catch{/* Cache opcional, a leitura pública permanece funcional. */}
}
export default async function handler(req,res){
  res.setHeader('Cache-Control','public,s-maxage=600,stale-while-revalidate=900');
  res.setHeader('X-Robots-Tag','noindex,nofollow');
  if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({erro:'Método não permitido'});}
  const cached=await readCache();
  if(cached && Date.now()-Date.parse(cached.at||0)<TTL_MS)
    return res.status(200).json({status:'ok',origem:'wordpress-cache-publico',profissionais:cached.profissionais});
  try{
    const response=await fetch(ROOT+'/lista-de-tecnicos/',{
      headers:{Accept:'text/html','User-Agent':'EncontreUmTecnico-Migracao/1.0'},
      signal:AbortSignal.timeout(5500)
    });
    if(response.ok && (response.headers.get('content-type')||'').includes('text/html')){
      const html=await response.text();
      const profissionais=extractPublicDirectory(html);
      if(profissionais.length){
        await saveCache(profissionais);
        return res.status(200).json({status:'ok',origem:'wordpress-html-publico',profissionais});
      }
    }
  }catch{/* WordPress pode estar temporariamente indisponível. */}
  if(cached)return res.status(200).json({status:'cache',origem:'wordpress-cache-publico',profissionais:cached.profissionais});
  return res.status(200).json({status:'indisponivel',origem:'wordpress-publico',profissionais:[]});
}
