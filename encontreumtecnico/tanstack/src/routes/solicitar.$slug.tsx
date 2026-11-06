import {createFileRoute,Link} from '@tanstack/react-router'
import {useCallback,useState} from 'react'
import type {FormEvent} from 'react'
import {ServiceIcon} from '../components/ServiceIcon'
import {GoogleClientAccess} from '../components/GoogleClientAccess'
export const Route=createFileRoute('/solicitar/$slug')({component:Solicitar})
const UF='AC AL AM AP BA CE DF ES GO MA MG MS MT PA PB PE PI PR RJ RN RO RR RS SC SE SP TO'.split(' ')
const categories=['Formatação de computador','Conserto de notebook','Instalação de software','Configuração de rede e Wi-Fi','Impressoras e periféricos','Manutenção de servidores','Suporte remoto','Outro serviço de tecnologia']
type Result={protocolo:string;mensagem:string;linkWhatsapp:string|null;contatoDisponivel:boolean}
function Solicitar(){
 const {slug}=Route.useParams()
 const [authenticated,setAuthenticated]=useState(false)
 const onStatus=useCallback((v:boolean)=>setAuthenticated(v),[])
 const [coords,setCoords]=useState<{latitude:number;longitude:number}|null>(null)
 const [geoError,setGeoError]=useState('')
 const [geoBusy,setGeoBusy]=useState(false)
 const [busy,setBusy]=useState(false)
 const [result,setResult]=useState<Result|null>(null)
 const [error,setError]=useState('')
 function getGPS(){
  setGeoError('')
  if(!navigator.geolocation){setGeoError('Localização indisponível neste aparelho. Informe cidade e bairro manualmente.');return}
  setGeoBusy(true)
  navigator.geolocation.getCurrentPosition(
   position=>{setCoords({latitude:Number(position.coords.latitude.toFixed(5)),longitude:Number(position.coords.longitude.toFixed(5))});setGeoBusy(false)},
   ()=>{setCoords(null);setGeoError('Localização não autorizada ou indisponível. Você pode informar os dados manualmente.');setGeoBusy(false)},
   {enableHighAccuracy:false,timeout:9000,maximumAge:300000}
  )
 }
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault()
  if(!authenticated){setError('Entre com Google antes de enviar a solicitação.');return}
  const form=e.currentTarget
  const fields=Object.fromEntries(new FormData(form).entries()) as Record<string,unknown>
  fields.tecnico=slug
  fields.aceite=(form.elements.namedItem('aceite') as HTMLInputElement).checked
  fields.confirmouLocalizacao=(form.elements.namedItem('confirmouLocalizacao') as HTMLInputElement).checked
  fields.compartilharEndereco=(form.elements.namedItem('compartilharEndereco') as HTMLInputElement).checked
  fields.compartilharGps=Boolean(coords)&&(form.elements.namedItem('compartilharGps') as HTMLInputElement).checked
  if(fields.compartilharGps&&coords){fields.latitude=coords.latitude;fields.longitude=coords.longitude}
  setError('');setBusy(true)
  try{
   const response=await fetch('/api/triagem',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(fields)})
   const data=await response.json()
   if(!response.ok)throw Error(data.erro||'Não foi possível enviar a solicitação')
   setResult(data)
  }catch(e){setError(e instanceof Error?e.message:'Erro ao enviar solicitação')}finally{setBusy(false)}
 }
 return <main className="request-triage-page"><div className="container">
  <nav className="breadcrumb" aria-label="Você está aqui"><Link to="/">Início</Link><ServiceIcon name="chevron" size={14}/><Link to="/galeria" search={{q:'',city:''}}>Técnicos</Link><ServiceIcon name="chevron" size={14}/><span>Solicitar atendimento</span></nav>
  <div className="triage-hero"><span className="triage-hero-icon"><ServiceIcon name="support" size={32}/></span><div><p className="section-eyebrow">ATENDIMENTO DIRETO • COM TRIAGEM</p><h1>Descreva seu problema para o técnico.</h1><p>Prepare uma mensagem completa antes de conversar. Seu endereço exato e seu contato não serão publicados no diretório.</p></div></div>
  <div className="triage-grid">
   <div className="triage-main">
    <div className="triage-step"><span>1</span><div><h2>Identificação do cliente</h2><p>O contato exige uma conta Google verificada. Não liberamos números para visitantes anônimos.</p></div></div>
    <GoogleClientAccess onStatus={onStatus}/>
    <div className="triage-step"><span>2</span><div><h2>Detalhes do atendimento</h2><p>Informe o equipamento, o serviço e as condições para evitar mensagens incompletas.</p></div></div>
    {result?<div className="triage-success" role="status"><ServiceIcon name="check" size={40}/><h2>Solicitação registrada</h2><p>{result.mensagem}</p><div className="secret">Protocolo: {result.protocolo}</div>{result.linkWhatsapp?<a className="btn" href={result.linkWhatsapp} target="_blank" rel="noopener noreferrer">Abrir mensagem triada no WhatsApp <ServiceIcon name="arrow" size={17}/></a>:<div className="notice">O número deste técnico não foi disponibilizado. O contato só será possível quando houver cadastro aprovado e autorização para acesso.</div>}<Link to="/galeria" search={{q:'',city:''}} className="btn secondary">Voltar à galeria</Link></div>:<form className="triage-form" onSubmit={submit}>
     <label className="field">Serviço desejado *<input list="triage-categories" name="categoria" minLength={3} required placeholder="Ex.: formatação de computador"/><datalist id="triage-categories">{categories.map(c=><option key={c} value={c}/>)}</datalist></label>
     <div className="two"><label className="field">Equipamento<input name="equipamento" placeholder="Notebook, computador, roteador…"/></label><label className="field">Modelo ou fabricante<input name="fabricante" placeholder="Ex.: Dell Inspiron, Windows 11"/></label></div>
     <label className="field">O que está acontecendo? *<textarea name="problema" required minLength={20} maxLength={1200} placeholder="Explique o problema, quando começou e o resultado que espera." rows={5}/></label>
     <label className="field">Tipo de atendimento<select name="modalidade" defaultValue="a-combinar"><option value="a-combinar">A combinar</option><option value="presencial">Presencial</option><option value="remoto">Remoto</option></select></label>
     <div className="triage-step mini"><span>3</span><div><h2>Localidade confirmada pelo cliente</h2><p>GPS é opcional. Localização por IP nunca substitui seu endereço informado.</p></div></div>
     <div className="two"><label className="field">Cidade *<input name="cidade" autoComplete="address-level2" minLength={2} required placeholder="Sua cidade"/></label><label className="field">Estado *<select name="uf" defaultValue="" required><option value="">Selecione</option>{UF.map(s=><option key={s} value={s}>{s}</option>)}</select></label></div>
     <div className="two"><label className="field">Bairro<input name="bairro" autoComplete="address-level3" placeholder="Seu bairro"/></label><label className="field">CEP<input name="cep" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" maxLength={10}/></label></div>
     <label className="check"><input name="compartilharEndereco" type="checkbox"/> Autorizo enviar o endereço exato ao técnico escolhido na mensagem privada.</label>
     <label className="field">Endereço exato (somente se autorizado)<input name="endereco" autoComplete="street-address" placeholder="Rua, número e complemento" maxLength={180}/></label>
     <div className="triage-geolocation"><button type="button" onClick={getGPS} disabled={geoBusy} className="btn secondary"><ServiceIcon name="location" size={17}/>{geoBusy?'Buscando GPS…':'Usar GPS com minha permissão'}</button>{coords?<p className="small">GPS disponível. A coordenada só será armazenada se você marcar a autorização abaixo.</p>:null}{geoError?<p className="small" role="status">{geoError}</p>:null}</div>
     {coords?<label className="check"><input name="compartilharGps" type="checkbox"/> Autorizo incluir a posição aproximada obtida por GPS apenas na solicitação privada.</label>:null}
     <label className="check"><input name="confirmouLocalizacao" type="checkbox" required/> Confirmei que a cidade, UF e demais informações estão corretas.</label>
     <label className="check"><input name="aceite" type="checkbox" required/> Autorizo armazenar esta solicitação privada e gerar uma mensagem para o profissional escolhido.</label>
     {error?<div className="notice error" role="alert">{error}</div>:null}
     <button className="btn triage-send" disabled={!authenticated||busy}>{busy?'Registrando solicitação…':authenticated?'Registrar e preparar contato':'Entre com Google para continuar'} <ServiceIcon name="arrow" size={17}/></button>
     <p className="small">A plataforma conecta clientes e técnicos independentes. Não garante preço, disponibilidade ou execução do atendimento.</p>
    </form>}
   </div>
   <aside className="triage-aside"><ServiceIcon name="shield" size={47}/><h2>Seu atendimento começa com informações claras.</h2><p>O profissional recebe uma descrição estruturada do serviço que você deseja contratar. Você continua livre para negociar valores, agenda e condições.</p><div className="triage-aside-points"><span><ServiceIcon name="check" size={18}/> Login Google obrigatório</span><span><ServiceIcon name="check" size={18}/> Telefones fora da vitrine pública</span><span><ServiceIcon name="check" size={18}/> Cidade informada e confirmada</span><span><ServiceIcon name="check" size={18}/> GPS somente com permissão</span><span><ServiceIcon name="check" size={18}/> Mensagem preenchida com a triagem</span></div></aside>
  </div>
 </div></main>
}
