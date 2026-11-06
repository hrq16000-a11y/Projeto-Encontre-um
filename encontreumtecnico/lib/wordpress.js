const ORIGIN='https://encontreumtecnico.com';
const decode=value=>String(value).replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'").replace(/&nbsp;/gi,' ').replace(/&[a-z]+;/gi,' ').replace(/&#(\d+);/g,(_,num)=>{const n=Number(num);return n>=0&&n<=0x10ffff?String.fromCodePoint(n):'';});
function publicImage(fragment){
  const attrs=[...fragment.matchAll(/\b(data-src|src)\s*=\s*["']([^"']+)["']/gi)];
  const found=attrs.find(x=>x[1].toLowerCase()==='data-src')||attrs[0];
  if(!found)return '';
  try{
    const u=new URL(decode(found[2]),ORIGIN);
    if(u.protocol!=='https:')return '';
    if(['encontreumtecnico.com','www.encontreumtecnico.com','secure.gravatar.com'].includes(u.hostname))return u.href;
  }catch{}
  return '';
}
export function extractPublicDirectory(html){
  if(typeof html!=='string'||html.length>3000000)return [];
  const entries=new Map();
  const rx=/<a\b[^>]*href\s*=\s*["']([^"']*\/tecnico\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  for(const found of html.matchAll(rx)){
    let url;try{url=new URL(decode(found[1]),ORIGIN);}catch{continue;}
    if(url.protocol!=='https:'||url.hostname!=='encontreumtecnico.com'||!/^\/tecnico\/[^/]+\/?$/.test(url.pathname))continue;
    const slug=url.pathname.split('/').filter(Boolean)[1];if(!slug)continue;
    const fallback=slug.split('-').filter(Boolean).map(x=>x[0].toUpperCase()+x.slice(1)).join(' ');
    const content=decode(found[2].replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
    const meaningful=content.length>=3&&content.length<=100&&!/^(ver|view|detalhes|perfil|profile|saiba mais)$/i.test(content);
    const imagem=publicImage(found[2]);
    const existing=entries.get(slug)||{id:'wp-'+slug,nome:fallback,servico:'',cidade:'',descricao:'',url:ORIGIN+url.pathname,imagem:''};
    if(meaningful)existing.nome=content.slice(0,100);
    if(imagem)existing.imagem=imagem;
    entries.set(slug,existing);
    if(entries.size>=100)break;
  }
  return [...entries.values()].filter(x=>x.nome);
}
