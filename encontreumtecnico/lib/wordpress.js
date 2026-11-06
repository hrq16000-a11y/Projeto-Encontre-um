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


// Mapeia somente URLs canônicas e publicamente anunciadas pelo sitemap do WordPress.
// Os nomes derivados de slugs são identificadores legíveis, NÃO nomes cadastrais verificados.
export function extractCandidateSitemap(xml) {
  if(typeof xml!=='string' || xml.length>900000 || !/<(?:urlset|sitemapindex)\b/i.test(xml))return [];
  const records=new Map();
  for(const match of xml.matchAll(/<loc>\s*([^<]{5,400})\s*<\/loc>/gi)) {
    let url; try{url=new URL(decode(match[1].trim()),ORIGIN);}catch{continue;}
    if(url.protocol!=='https:' || url.hostname!=='encontreumtecnico.com')continue;
    const parts=url.pathname.split('/').filter(Boolean);
    if(parts.length!==2 || parts[0]!=='tecnico')continue;
    const slug=parts[1];
    if(!/^[a-z0-9._%-]{2,160}$/i.test(slug))continue;
    const nome=decodeURIComponent(slug).replace(/[-_]+/g,' ').replace(/\b[a-zà-ú]/gi,c=>c.toLocaleUpperCase('pt-BR')).slice(0,100);
    const canonical=ORIGIN+'/tecnico/'+slug+'/';
    records.set(canonical,{id:'wp-'+slug,nome,servico:'',cidade:'',descricao:'',url:canonical,imagem:'',nomeInferido:true,origem:'sitemap'});
    if(records.size>=1000)break;
  }
  return [...records.values()];
}

export function mergeSitemapDirectory(sitemaps, directory=[]) {
  const map=new Map();
  for(const collection of sitemaps)for(const profile of collection || [])if(profile?.url)map.set(profile.url,profile);
  for(const profile of directory||[]) {
    if(!profile?.url)continue;
    const record=map.get(profile.url);
    if(record) map.set(profile.url,{...record,
      nome:profile.nome||record.nome, imagem:profile.imagem||record.imagem,
      nomeInferido:!profile.nome, servico:profile.servico||record.servico,
      descricao:profile.descricao||record.descricao, cidade:profile.cidade||record.cidade
    });
  }
  return [...map.values()];
}
