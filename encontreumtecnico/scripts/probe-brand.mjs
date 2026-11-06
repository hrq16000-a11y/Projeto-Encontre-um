const base='https://encontreumtecnico.com/';
try{
 const response=await fetch(base,{headers:{Accept:'text/html', 'User-Agent':'EncontreUmTecnico-Migracao/1.0'},signal:AbortSignal.timeout(16000)});
 if(!response.ok)throw Error('HTTP '+response.status);
 const html=await response.text();
 const images=[...html.matchAll(/<img\b[^>]*>/gi)].map(x=>x[0]).filter(x=>/logo|site-logo|header-logo|custom-logo|brand/i.test(x)).slice(0,14);
 const icons=[...html.matchAll(/<link\b[^>]*rel=["'][^"']*(?:icon|apple-touch-icon)[^"']*["'][^>]*>/gi)].map(x=>x[0]).slice(0,5);
 const background=[...html.matchAll(/(?:logo|brand)[-_a-z]*\s*[:=]\s*["'](https?:[^"']{3,240})["']/gi)].map(x=>x[1]).slice(0,10);
 console.log(JSON.stringify({status:response.status,bytes:html.length,images,icons,background}).slice(0,6500));
}catch(e){console.log(JSON.stringify({error:String(e)}));}
