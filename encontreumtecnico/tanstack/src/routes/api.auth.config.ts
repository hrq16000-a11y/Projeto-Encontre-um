import {createFileRoute} from '@tanstack/react-router'
import {publicGoogleConfig,noStoreJSON} from '../server/google-auth'
export const Route=createFileRoute('/api/auth/config')({server:{handlers:{
 GET:()=>noStoreJSON(publicGoogleConfig())
}}})
