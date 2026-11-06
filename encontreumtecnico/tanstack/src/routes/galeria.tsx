import {createFileRoute,Link,useNavigate} from '@tanstack/react-router'
import {createServerFn} from '@tanstack/react-start'
import {useEffect,useMemo,useState} from 'react'
import type {FormEvent} from 'react'
import {ServiceIcon} from '../components/ServiceIcon'
type Tech={id:string;nome:string;especialidade?:string;servico?:string;cidade?:string;uf?:string;descricao?:string;imagem?:string;url?:string;whatsapp?:string;nomeInferido?:boolean}
const getProfiles=createServerFn({method:'GET'}).handler(async()=>{
 const base='https://encontreumtecnico-migracao-git-feat-encontreumtec-211d15-msolus.vercel.app'
 const [old,fresh]=await Promise.allSettled([fetch(base+'/api/profissionais',{signal:AbortSignal.timeout(10000)}).then(r=>r.ok?r.json():Promise.reject()),fetch(base+'/api/tecnicos',{signal:AbortSignal.timeout(10000)}).then(r=>r.ok?r.json():Promise.reject())])
 const seen=new Map<string,Tech>()
 if(old.status==='fulfilled')for(const p of old.value.profissionais||[])if(p?.id)seen.set(p.id,{...p,especialidade:p.especialidade||p.servico||''})
 if(fresh.status==='fulfilled')for(const p of fresh.value.tecnicos||[])if(p?.id)seen.set(p.id,p)
 return [...seen.values()]
})
const specialties=['Notebook','Computador','Redes','Wi-Fi','Impressora','Suporte remoto','Servidor','Celular']
export const Route=createFileRoute('/galeria')({
 validateSearch:(search:Record<string,unknown>)=>({q:typeof search.q==='string'?search.q.slice(0,90):'',city:typeof search.city==='string'?search.city.slice(0,90):''}),
 loader:()=>getProfiles(),component:Gallery
})
function Gallery(){
 const profiles=Route.useLoaderData(),search=Route.useSearch(),navigate=useNavigate()
 const [query,setQuery]=useState(search.q),[city,setCity]=useState(search.city),[uf,setUf]=useState(''),[sort,setSort]=useState('name'),[limit,setLimit]=useState(24)
 useEffect(()=>{setQuery(search.q);setCity(search.city);setLimit(24)},[search.q,search.city])
 const results=useMemo(()=>{
  const q=query.toLocaleLowerCase('pt-BR').trim(),c=city.toLocaleLowerCase('pt-BR').trim()
  return profiles.filter(p=>(!q||[p.nome,p.especialidade,p.servico,p.descricao].join(' ').toLocaleLowerCase('pt-BR').includes(q))&&(!c||String(p.cidade||'').toLocaleLowerCase('pt-BR').includes(c))&&(!uf||p.uf===uf)).sort((a,b)=>sort==='complete'?(Number(Boolean(b.cidade&&b.especialidade))-Number(Boolean(a.cidade&&a.especialidade))||a.nome.localeCompare(b.nome,'pt-BR')):a.nome.localeCompare(b.nome,'pt-BR'))
 },[profiles,query,city,uf,sort])
 function submit(e:FormEvent){e.preventDefault();setLimit(24);void navigate({to:'/galeria',search:{q:query.trim(),city:city.trim()}})}
 function clear(){setQuery('');setCity('');setUf('');setLimit(24);void navigate({to:'/galeria',search:{q:'',city:''}})}
 return <main className="directory-page">
 <section className="directory-hero"><div className="container"><p className="section-eyebrow">DIRETÓRIO DE PROFISSIONAIS</p><h1>Encontre um técnico para você.</h1><p>Explore perfis públicos, pesquise por especialidade e converse diretamente com profissionais independentes.</p><div className="directory-trust"><span><ServiceIcon name="user" size={17}/>{profiles.length} perfis públicos disponíveis</span><span><ServiceIcon name="check" size={17}/> Sem anúncios de profissionais fictícios</span></div></div></section>
 <div className="container">
  <form className="directory-filters" role="search" onSubmit={submit}><label className="filter-input"><span><ServiceIcon name="search" size={18}/> Nome ou especialidade</span><input value={query} onChange={e=>{setQuery(e.target.value);setLimit(24)}} placeholder="Ex.: notebook, redes"/></label><label className="filter-input"><span><ServiceIcon name="location" size={18}/> Cidade</span><input value={city} onChange={e=>{setCity(e.target.value);setLimit(24)}} placeholder="Ex.: Curitiba"/></label><label className="filter-input state-filter"><span>Estado</span><select value={uf} onChange={e=>{setUf(e.target.value);setLimit(24)}}><option value="">Todos os estados</option>{'AC AL AM AP BA CE DF ES GO MA MG MS MT PA PB PE PI PR RJ RN RO RR RS SC SE SP TO'.split(' ').map(s=><option key={s} value={s}>{s}</option>)}</select></label><button type="submit" className="btn">Buscar <ServiceIcon name="arrow" size={16}/></button></form>
  <div className="service-filter-row"><span>Especialidades:</span>{specialties.map(s=><Link to="/galeria" search={{q:s,city}} key={s} className={query.toLowerCase()===s.toLowerCase()?'selected':''}>{s}</Link>)}</div>
  <div className="directory-results-bar"><div><strong>{results.length} resultado(s)</strong><span>{query||city||uf?' para os filtros informados':' no diretório público'}</span></div><div className="results-tools">{query||city||uf?<button className="clear-filters" onClick={clear}>Limpar filtros</button>:null}<label>Ordenar <select value={sort} onChange={e=>setSort(e.target.value)}><option value="name">Nome (A–Z)</option><option value="complete">Dados mais completos</option></select></label></div></div>
  <div className="directory-list">{results.slice(0,limit).map(p=><article key={p.id} className="directory-card"><div className="directory-avatar">{p.imagem?<img loading="lazy" src={p.imagem} alt={'Imagem pública de '+p.nome}/>:<ServiceIcon name="user" size={42}/>}</div><div className="directory-details"><div className="directory-meta"><span>{p.url?'Perfil público do WordPress':'Novo cadastro aprovado'}</span>{p.cidade?<span><ServiceIcon name="location" size={13}/>{p.cidade}{p.uf?'/'+p.uf:''}</span>:null}</div><h2>{p.nome}</h2>{p.nomeInferido?<p className="directory-warning">Nome derivado do endereço original; confirme os dados no perfil.</p>:null}<p className="directory-specialty">{p.especialidade||p.servico||'Especialidade no cadastro original'}</p><p className="directory-description">{p.descricao||'Consulte o perfil para conhecer detalhes e formas de contato.'}</p></div><div className="directory-action">{p.url?<Link to="/tecnico/$slug" params={{slug:p.url.split('/').filter(Boolean).at(-1)||''}} className="btn">Ver perfil <ServiceIcon name="arrow" size={16}/></Link>:p.whatsapp?<a href={'https://wa.me/'+(p.whatsapp.startsWith('55')?p.whatsapp:'55'+p.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn">Conversar <ServiceIcon name="arrow" size={16}/></a>:<span className="small">Contato após revisão</span>}</div></article>)}</div>
  {!results.length?<div className="info-empty directory-empty"><ServiceIcon name="search" size={34}/><h2>Nenhum perfil encontrado com esses filtros</h2><p>Alguns perfis da origem ainda não têm cidade ou especialidade estruturadas na nova plataforma. Remova os filtros ou publique uma solicitação de serviço.</p><div className="actions"><button type="button" className="btn" onClick={clear}>Ver todos</button><Link to="/cliente" className="btn secondary">Publicar solicitação</Link></div></div>:null}
  {limit<results.length?<div className="directory-more"><span>Mostrando {Math.min(limit,results.length)} de {results.length}</span><button className="btn" onClick={()=>setLimit(n=>n+24)}>Carregar mais técnicos <ServiceIcon name="chevron" size={15}/></button></div>:null}
  <aside className="directory-info"><ServiceIcon name="shield" size={22}/><div><strong>Diretório com informações transparentes</strong><p>Os perfis históricos do WordPress ainda estão em migração. Só exibimos os dados públicos disponíveis, sem inventar avaliações, cidades, preços ou certificações.</p></div></aside>
  <section className="directory-join"><div><p className="section-eyebrow">SOU TÉCNICO</p><h2>Seu trabalho merece visibilidade.</h2><p>Cadastre seu perfil gratuitamente e faça parte do diretório.</p></div><Link className="btn" to="/cadastro">Quero me cadastrar <ServiceIcon name="arrow" size={16}/></Link></section>
 </div></main>
}
