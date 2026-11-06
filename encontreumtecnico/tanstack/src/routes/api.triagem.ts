import {createFileRoute} from '@tanstack/react-router'
import {get,list,put} from '@vercel/blob'
import {createHash,randomUUID} from 'node:crypto'
import {readGoogleSession,googleConfigured,noStoreJSON,requireSameOrigin} from '../server/google-auth'
import {validateTriage,triageText,whatsAppLink} from '../lib/triage'
const BACKEND='https://encontreumtecnico-migracao-git-feat-encontreumtec-211d15-msolus.vercel.app'
const PRIVATE_PREFIX='encontreumtecnico/v2/triage/'
async function approvedTarget(slug:string):Promise<{id:string;nome:string;whatsapp?:string}|null>{
 const isUUID=/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(slug)
 if(isUUID){
  const blob=await get('encontreumtecnico/v1/approved/'+slug+'.json',{access:'private',useCache:false})
  if(!blob?.stream)return null
  const record=JSON.parse(await new Response(blob.stream).text())
  return record.status==='approved'&&record.id===slug?{id:slug,nome:record.nome,whatsapp:record.whatsapp||''}:null
 }
 const res=await fetch(BACKEND+'/api/profissionais',{signal:AbortSignal.timeout(9000)})
 if(!res.ok)return null
 const json=await res.json()
 const target=(json.profissionais||[]).find((p:{url?:string})=>p.url==='https://encontreumtecnico.com/tecnico/'+slug+'/')
 return target?{id:slug,nome:target.nome||slug}:null
}
export const Route=createFileRoute('/api/triagem')({server:{handlers:{
 POST:async ({request})=>{
  if(!requireSameOrigin(request))return noStoreJSON({erro:'Origem inválida.'},403)
  if(!googleConfigured())return noStoreJSON({erro:'Login Google ainda precisa ser configurado.'},503)
  const account=await readGoogleSession(request)
  if(!account)return noStoreJSON({erro:'Entre com sua conta Google para solicitar contato.'},401)
  if(!process.env.BLOB_READ_WRITE_TOKEN)return noStoreJSON({erro:'Armazenamento privado ainda não configurado.'},503)
  let raw:unknown
  try{
   const text=await request.text()
   if(text.length>13000)return noStoreJSON({erro:'Descrição extensa demais.'},413)
   raw=JSON.parse(text)
  }catch{return noStoreJSON({erro:'Formulário inválido.'},400)}
  const validated=validateTriage(raw)
  if(!validated.value)return noStoreJSON({erro:validated.error||'Triagem inválida'},400)
  const v=validated.value
  try{
   const target=await approvedTarget(v.tecnico)
   if(!target)return noStoreJSON({erro:'Técnico não encontrado entre os perfis aprovados.'},404)
   const clientHash=createHash('sha256').update(account.sub).digest('hex').slice(0,32)
   const today=new Date().toISOString().slice(0,10)
   const prefix=PRIVATE_PREFIX+'by-client/'+clientHash+'/'+today+'/'
   const prior=await list({prefix,limit:10})
   if(prior.blobs.length>=8)return noStoreJSON({erro:'Limite diário de solicitações atingido. Tente outro dia.'},429)
   const id=randomUUID()
   const record={
    id,portal:'encontreumtecnico',status:'pendente',
    tecnicoId:target.id,tecnicoNome:target.nome,
    clienteGoogleSub:account.sub,clienteNome:account.name,clienteEmail:account.email,
    tipo:'contato-direto-triado',triagem:v,criadoEm:new Date().toISOString()
   }
   await put(prefix+id+'.json',JSON.stringify(record),{access:'private',contentType:'application/json',addRandomSuffix:false})
   const link=target.whatsapp?whatsAppLink(target.whatsapp,triageText(v)):null
   return noStoreJSON({sucesso:true,protocolo:id,contatoDisponivel:Boolean(link),linkWhatsapp:link,mensagem:link?'Solicitação salva. Abra o WhatsApp com a mensagem já preenchida.':'Solicitação salva. O perfil histórico ainda não possui contato privado importado.'},201)
  }catch{return noStoreJSON({erro:'Não foi possível registrar a solicitação. Tente novamente.'},503)}
 }
}}})
