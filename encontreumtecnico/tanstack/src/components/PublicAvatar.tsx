import {useState} from 'react'
import {ServiceIcon} from './ServiceIcon'
import {profileRoute} from '../lib/directory'
import type {DirectoryProfile} from '../lib/directory'
function safeImage(value:string|undefined){
 if(!value)return ''
 try{
  const url=new URL(value)
  if(url.protocol!=='https:'||!['encontreumtecnico.com','www.encontreumtecnico.com','secure.gravatar.com'].includes(url.hostname))return ''
  return url.href
 }catch{return ''}
}
export function PublicAvatar({profile,large=false}:{profile:DirectoryProfile;large?:boolean}){
 const [broken,setBroken]=useState(false)
 const slug=profileRoute(profile)
 const image=safeImage(profile.imagem)||(profile.url&&slug?'/api/avatar/'+encodeURIComponent(slug):'')
 if(!image||broken)return <span className="public-avatar-fallback"><ServiceIcon name="user" size={large?47:31}/></span>
 return <img loading="lazy" decoding="async" src={image} alt={'Foto pública de '+profile.nome} onError={()=>setBroken(true)}/>
}
