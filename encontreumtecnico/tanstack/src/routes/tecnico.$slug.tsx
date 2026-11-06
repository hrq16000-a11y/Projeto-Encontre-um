import {createFileRoute,Link} from '@tanstack/react-router'
import {createServerFn} from '@tanstack/react-start'

type Profile={id:string;nome:string;descricao:string;cidade:string;uf:string;especialidade:string;url:string;imagem:string;nomeInferido:boolean;unavailable?:boolean}
const BACKEND='https://encontreumtecnico-migracao-git-feat-encontreumtec-211d15-msolus.vercel.app'
const ORIGIN='https://encontreumtecnico.com'

function unpack(s:string):string {return s.replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'").replace(/&nbsp;/gi,' ').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>')}
function meta(content:string,field:string):string{
 for(const m of content.matchAll(/<meta\b[^>]*>/gi)){
  const tag=m[0];if(!tag.includes(field))continue
  const property=/(?:property|name)\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1]
  if(property!==field)continue
  const value=/content\s*=\s*["']([^"']{0,2000})["']/i.exec(tag)?.[1]
  if(value)return unpack(value).replace(/<[^>]*>/g,'').trim()
 }
 return ''
}
const getProfile=createServerFn({method:'GET'}).validator((slug:string)=>slug).handler(async ({data:slug})=>{
 if(!/^[a-z0-9._%-]{2,160}$/i.test(slug))return null
 try{
  const r=await fetch(BACKEND+'/api/profissionais',{signal:AbortSignal.timeout(9000)})
  if(!r.ok)return null
  const data=await r.json()
  const profile=(data.profissionais||[]).find((p:any)=>p.url===ORIGIN+'/tecnico/'+slug+'/') as Profile|undefined
  if(!profile)return null
  const base:Profile={...profile,especialidade:profile.especialidade||'',cidade:profile.cidade||'',uf:profile.uf||'',descricao:profile.descricao||'',imagem:profile.imagem||'',nomeInferido:Boolean(profile.nomeInferido)}
  try{
   const page=await fetch(base.url,{headers:{Accept:'text/html', 'User-Agent':'EncontreUmTecnico-Migracao/1.0'},signal:AbortSignal.timeout(4500)})
   if(page.ok&&(page.headers.get('content-type')||'').includes('text/html')){
    const html=await page.text()
    const name=meta(html,'og:title')
    const description=meta(html,'og:description')
    const image=meta(html,'og:image')
    if(name){base.nome=name.split(/\s[|–—]\s/)[0].slice(0,115);base.nomeInferido=false}
    if(description)base.descricao=description.slice(0,850)
    if(image){
     try{const u=new URL(image);if(['encontreumtecnico.com','www.encontreumtecnico.com'].includes(u.hostname)&&u.protocol==='https:')base.imagem=u.href}catch{}
    }
   }
  }catch{} // If the old WordPress is slow, keep the already-indexed public record.
  return base
 }catch{return null}
})

export const Route=createFileRoute('/tecnico/$slug')({
 loader:({params})=>getProfile({data:params.slug}),
 component:TechnicianProfile,
})
function TechnicianProfile(){
 const p=Route.useLoaderData()
 if(!p)return <main className="container"><h1>Perfil não disponível nesta prévia</h1><p className="subtle">Os cadastros históricos ainda estão sendo sincronizados. Consulte a galeria de técnicos.</p><Link className="btn" to="/galeria">Voltar à galeria</Link></main>
 return <main className="container"><div className="actions"><Link to="/galeria">Galeria de técnicos</Link></div><section className="panel"><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',alignItems:'start',gap:26}}><div>{p.imagem?<img src={p.imagem} alt={'Imagem pública do perfil de '+p.nome} style={{width:'100%',maxHeight:300,objectFit:'contain',background:'#f1f5fb',borderRadius:14}}/>:null}</div><div><p className="eyebrow" style={{color:'#1571cc'}}>Perfil profissional público</p><h1>{p.nome}</h1>{p.nomeInferido?<p className="small">Nome identificado pelo endereço original. Dados completos dependem da importação WordPress.</p>:null}{[p.especialidade,p.cidade,p.uf].filter(Boolean).length?<p className="subtle">{[p.especialidade,p.cidade,p.uf].filter(Boolean).join(' · ')}</p>:null}<p>{p.descricao||'Este perfil existe no diretório público. Os detalhes e opções de contato serão sincronizados do portal original.'}</p><div className="actions"><a className="btn" href={p.url} target="_blank" rel="noopener noreferrer">Ver contato e perfil original</a><Link className="btn secondary" to="/galeria">Ver mais profissionais</Link></div></div></div></section><div className="notice">Perfil público reconstruído a partir de informações já divulgadas na origem. Não exibe dados pessoais privados nem avaliações inventadas.</div></main>
}
