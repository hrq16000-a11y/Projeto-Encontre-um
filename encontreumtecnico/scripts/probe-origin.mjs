// Leitura de origem apenas: nunca publica, modifica ou importa registros.
import { extractPublicDirectory } from '../lib/wordpress.js';
const origin='https://encontreumtecnico.com';
async function probe(path){
 const started=Date.now();
 try {
  const response=await fetch(origin+path,{signal:AbortSignal.timeout(12000),headers:{Accept:'text/html','User-Agent':'EncontreUmTecnico-Migracao/1.0'}});
  if(!response.ok)throw Error('HTTP '+response.status);
  const html=await response.text();
  const professionals=extractPublicDirectory(html);
  const pagination=[...new Set([...html.matchAll(/href\s*=\s*["']([^"']*(?:page|paged|ajax_filter)[^"']*)["']/gi)].map(x=>x[1].replace(/&amp;/g,'&')))].filter(x=>x.length<220).slice(0,12);
  return {path,status:response.status,bytes:html.length,profiles:professionals.length,ids:professionals.map(x=>x.id),pagination,elapsedMs:Date.now()-started};
 }catch(error){return {path,error:String(error).slice(0,150),elapsedMs:Date.now()-started};}
}
const first=await probe('/lista-de-tecnicos/');
const second=await probe('/lista-de-tecnicos/?page=2');
const third=await probe('/lista-de-tecnicos/page/2/');
for(const result of [first,second,third]){
 const {ids=[],...safe}=result;
 console.log(JSON.stringify({...safe,uniqueComparedWithFirst:ids.filter(x=>!first.ids?.includes(x)).length}));
}
