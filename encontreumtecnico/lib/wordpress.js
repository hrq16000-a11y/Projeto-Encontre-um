const ORIGIN='https://encontreumtecnico.com';
const decode=value=>String(value).replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'").replace(/&nbsp;/gi,' ').replace(/&[a-z]+;/gi,' ').replace(/&#(\d+);/g,(_,num)=>String.fromCodePoint(Number(num)));
export function extractPublicDirectory(html){
  if(typeof html!=='string' || html.length>3000000)return [];
  const seen=new Set(),output=[];
  const rx=/<a\b[^>]*href\s*=\s*["']([^"']*\/tecnico\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  for(const found of html.matchAll(rx)){
    let url;try{url=new URL(decode(found[1]),ORIGIN);}catch{continue;}
    if(url.protocol!=='https:' || url.hostname!=='encontreumtecnico.com' || !/^\/tecnico\/[^/]+\/?$/.test(url.pathname))continue;
    const slug=url.pathname.split('/').filter(Boolean)[1];
    if(!slug || seen.has(slug))continue;
    const content=decode(found[2].replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
    const fallback=slug.split('-').filter(Boolean).map(x=>x[0].toUpperCase()+x.slice(1)).join(' ');
    const nome=(content.length>=3 && content.length<=100 && !/^(ver|view|detalhes|perfil|profile|saiba mais)$/i.test(content)?content:fallback).slice(0,100);
    if(!nome)continue;
    seen.add(slug);output.push({id:'wp-'+slug,nome,servico:'',cidade:'',descricao:'',url:ORIGIN+url.pathname});
    if(output.length>=100)break;
  }
  return output;
}
