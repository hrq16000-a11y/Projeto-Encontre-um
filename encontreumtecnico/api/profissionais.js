// Adaptador de leitura: nenhuma escrita, cadastro ou credencial no WordPress.
const ORIGIN = 'https://encontreumtecnico.com';
const PATHS = [
  '/wp-json/wp/v2/profissionais',
  '/wp-json/wp/v2/tecnicos',
  '/wp-json/wp/v2/prestadores',
  '/wp-json/wp/v2/job_listing',
  '/wp-json/wp/v2/listings',
  '/wp-json/wp/v2/rtcl_listing',
  '/wp-json/geodir/v2/places'
];

function plain(value){
  if(typeof value === 'string')return value.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim().slice(0,1000);
  if(value && typeof value.rendered === 'string') return plain(value.rendered);
  return '';
}
function publicUrl(value){
  if(typeof value !== 'string') return null;
  try{const url=new URL(value);return url.protocol==='https:' && /(^|\.)encontreumtecnico\.com$/.test(url.hostname)?url.href:null}
  catch{return null;}
}
function normalize(item){
  if(!item || typeof item!=='object' || (item.status && item.status!=='publish'))return null;
  const meta=item.acf||item.meta||{};
  const nome=plain(item.title)||plain(item.name)||plain(item.nome);
  if(!nome)return null;
  return {
    id:String(item.id||item.slug||nome).slice(0,100),
    nome:nome.slice(0,140),
    descricao:plain(item.excerpt)||plain(item.description)||plain(meta.descricao),
    servico:plain(meta.especialidade)||plain(meta.servico)||plain(meta.categoria)||'',
    cidade:plain(meta.cidade)||plain(meta.city)||plain(item.city)||'',
    url:publicUrl(item.link)||publicUrl(item.url)
  };
}
export default async function handler(req,res){
  res.setHeader('Cache-Control','public, s-maxage=300, stale-while-revalidate=600');
  res.setHeader('X-Robots-Tag','noindex, nofollow');
  if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({erro:'Método não permitido'});}
  let reached=false;
  for(const path of PATHS){
    try{
      const resp=await fetch(ORIGIN+path+'?per_page=100&status=publish&_fields=id,slug,status,title,name,excerpt,description,acf,meta,city,link,url',{
        signal:AbortSignal.timeout(2400),headers:{Accept:'application/json'}
      });
      if(resp.status===404)continue;
      if(!resp.ok)continue;
      reached=true;
      const body=await resp.json();
      if(!Array.isArray(body))continue;
      const profissionais=body.map(normalize).filter(Boolean);
      if(profissionais.length)return res.status(200).json({status:'ok',origem:'wordpress-publico',profissionais});
    }catch{/* Fontes não expostas ou inacessíveis; nunca inventar perfis. */}
  }
  return res.status(200).json({status:reached?'sem-cadastros-publicos':'indisponivel',origem:'wordpress-publico',profissionais:[]});
}
