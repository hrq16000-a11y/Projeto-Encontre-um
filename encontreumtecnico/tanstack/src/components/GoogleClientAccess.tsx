import {useCallback,useEffect,useRef,useState} from 'react'
type GoogleIdentity={nome:string;email:string}
declare global{
 interface Window{
  google?:{accounts:{id:{
   initialize:(options:{client_id:string;callback:(response:{credential?:string})=>void})=>void;
   renderButton:(target:HTMLElement,options:Record<string,unknown>)=>void
  }}}
 }
}
export function GoogleClientAccess({onStatus}:{onStatus?:(signed:boolean)=>void}){
 const holder=useRef<HTMLDivElement|null>(null)
 const [user,setUser]=useState<GoogleIdentity|null>(null)
 const [clientId,setClientId]=useState('')
 const [ready,setReady]=useState(false)
 const [error,setError]=useState('')
 const [busy,setBusy]=useState(false)
 const sync=useCallback(async()=>{
  try{
   const response=await fetch('/api/auth/session',{credentials:'same-origin',cache:'no-store'})
   const payload=await response.json()
   setUser(payload.autenticado?payload.usuario:null)
   onStatus?.(Boolean(payload.autenticado))
  }catch{setUser(null);onStatus?.(false)}
 },[onStatus])
 useEffect(()=>{
  let active=true
  const load=async()=>{
   try{
    const r=await fetch('/api/auth/config',{cache:'no-store'})
    const config=await r.json()
    if(!active)return
    setClientId(config.enabled?config.clientId:'')
    setReady(true)
    await sync()
   }catch{if(active){setReady(true);setError('Autenticação temporariamente indisponível')}}
  }
  void load()
  return()=>{active=false}
 },[sync])
 useEffect(()=>{
  if(!clientId||!holder.current||user)return
  let done=false
  const callback=async ({credential}:{credential?:string})=>{
   if(!credential)return
   setBusy(true);setError('')
   try{
    const r=await fetch('/api/auth/google',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({credential})})
    const d=await r.json()
    if(!r.ok)throw Error(d.erro||'Falha de autenticação')
    await sync()
   }catch(e){setError(e instanceof Error?e.message:'Falha no login')}finally{setBusy(false)}
  }
  const render=()=>{
   if(done||!holder.current||!window.google)return
   done=true
   window.google.accounts.id.initialize({client_id:clientId,callback})
   holder.current.replaceChildren()
   window.google.accounts.id.renderButton(holder.current,{theme:'outline',size:'large',text:'signin_with',shape:'rectangular',width:300})
  }
  if(window.google){render();return}
  const script=document.createElement('script')
  script.src='https://accounts.google.com/gsi/client'
  script.async=true;script.defer=true
  script.onload=render
  script.onerror=()=>setError('Não foi possível carregar o Google')
  document.head.appendChild(script)
  return()=>{script.onload=null;script.onerror=null}
 },[clientId,user,sync])
 async function logout(){
  await fetch('/api/auth/logout',{method:'POST',credentials:'same-origin'})
  await sync()
 }
 if(user)return <div className="google-gate google-signed-in"><span>Conta Google conectada: <strong>{user.nome}</strong> ({user.email})</span><button type="button" className="btn secondary" onClick={()=>void logout()}>Sair</button></div>
 return <section className="google-gate" aria-label="Identificação do cliente">
  <h3>Entre com sua conta Google</h3>
  <p>O cliente precisa se identificar antes de solicitar contato. O telefone do técnico não será exibido anonimamente.</p>
  {!ready?<p className="small">Verificando acesso Google…</p>:clientId?<div ref={holder}/>:<div className="notice">Login Google preparado, mas ainda depende das credenciais OAuth e da origem autorizada no Google Cloud. Nenhum número será liberado enquanto estiver indisponível.</div>}
  {busy?<p className="small">Validando conta Google…</p>:null}
  {error?<p className="notice error" role="alert">{error}</p>:null}
 </section>
}
