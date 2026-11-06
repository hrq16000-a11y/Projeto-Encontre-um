import {createFileRoute} from '@tanstack/react-router'
import {clearCookie,noStoreJSON,requireSameOrigin} from '../server/google-auth'
export const Route=createFileRoute('/api/auth/logout')({server:{handlers:{
 POST:({request})=>!requireSameOrigin(request)?noStoreJSON({erro:'Origem inválida'},403):noStoreJSON({autenticado:false},200,{'Set-Cookie':clearCookie()})
}}})
