import {createFileRoute} from '@tanstack/react-router'
import {readGoogleSession,noStoreJSON} from '../server/google-auth'
export const Route=createFileRoute('/api/auth/session')({server:{handlers:{
 GET:async ({request})=>{
  const user=await readGoogleSession(request)
  return noStoreJSON({autenticado:Boolean(user),usuario:user?{nome:user.name,email:user.email}:null})
 }
}}})
