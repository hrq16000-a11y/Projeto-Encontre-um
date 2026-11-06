import {createFileRoute} from '@tanstack/react-router'
import {googleConfigured,verifyCredential,makeCookie,noStoreJSON,requireSameOrigin} from '../server/google-auth'
export const Route=createFileRoute('/api/auth/google')({server:{handlers:{
 POST:async ({request})=>{
  if(!requireSameOrigin(request))return noStoreJSON({erro:'Origem inválida'},403)
  if(!googleConfigured())return noStoreJSON({erro:'Login Google aguardando configuração segura no domínio Vercel'},503)
  let credential=''
  try{
   const raw=await request.text()
   if(raw.length>12000)return noStoreJSON({erro:'Credencial extensa demais'},413)
   const data=JSON.parse(raw)
   credential=typeof data.credential==='string'?data.credential:''
  }catch{return noStoreJSON({erro:'Credencial inválida'},400)}
  if(!credential||credential.length>8000)return noStoreJSON({erro:'Credencial inválida'},400)
  try{
   const user=await verifyCredential(credential)
   return noStoreJSON({autenticado:true,usuario:{nome:user.name,email:user.email}},200,{'Set-Cookie':await makeCookie(user)})
  }catch{return noStoreJSON({erro:'Não foi possível validar sua conta Google'},401)}
 }
}}})
