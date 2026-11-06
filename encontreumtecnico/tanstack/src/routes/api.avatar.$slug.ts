import {createFileRoute} from '@tanstack/react-router'
import {publicAvatarResponse} from '../server/public-avatar'
export const Route=createFileRoute('/api/avatar/$slug')({server:{handlers:{
 GET:({params})=>publicAvatarResponse(params.slug)
}}})
