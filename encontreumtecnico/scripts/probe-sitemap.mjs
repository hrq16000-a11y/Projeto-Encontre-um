// Only public GETs and minimal metadata.
const root='https://encontreumtecnico.com';
const routes=['/robots.txt','/sitemap_index.xml','/wp-sitemap.xml','/candidate-sitemap1.xml','/candidate-sitemap2.xml','/employer-sitemap1.xml','/employer-sitemap2.xml','/wp-sitemap-posts-candidate-1.xml'];
for(const path of routes){
 try{
  const resp=await fetch(root+path,{signal:AbortSignal.timeout(6500),headers:{Accept:'application/xml,text/xml,text/plain'}});
  const txt=(await resp.text()).slice(0,600000);
  const urls=[...txt.matchAll(/<loc>([^<]{3,400})<\/loc>/gi)].map(m=>m[1]);
  const relevant=urls.filter(x=>/sitemap|candidate|tecnico|jobsearch/i.test(x)).slice(0,40);
  const locs=(txt.match(/<loc>/gi)||[]).length;
  const robotLines=path.includes('robots')?txt.split('\n').filter(x=>/sitemap:/i.test(x)).slice(0,6):[];
  console.log(JSON.stringify({path,status:resp.status,type:(resp.headers.get('content-type')||'').slice(0,60),bytes:txt.length,locs,relevant,robotLines}));
 }catch(error){console.log(JSON.stringify({path,error:String(error).slice(0,120)}));}
}
