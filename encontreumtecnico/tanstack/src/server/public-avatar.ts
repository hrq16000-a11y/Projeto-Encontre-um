const ORIGIN='https://encontreumtecnico.com'
export const validSlug=(value:string)=>/^[a-z0-9._-]{2,160}$/i.test(value)
function decode(value:string){return value.replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;/gi,"'")}
export function safeAvatarURL(src:string):string|null{
 try{
  const url=new URL(decode(src),ORIGIN)
  if(url.protocol!=='https:')return null
  if(!['encontreumtecnico.com','www.encontreumtecnico.com','secure.gravatar.com'].includes(url.hostname))return null
  if(/(?:logo|favicon|placeholder|default-avatar|banner|site-icon)/i.test(url.pathname))return null
  if(url.hostname!=='secure.gravatar.com'&&!(/\/wp-content\/uploads\/|\/avatar|\/profile|\/candidate/i.test(url.pathname)))return null
  if(url.href.length>550)return null
  return url.href
 }catch{return null}
}
function attr(tag:string,key:string){
 const re=new RegExp('(?:^|\\s)'+key+'\\s*=\\s*["\\x27]([^"\\x27]{1,600})["\\x27]','i')
 return re.exec(tag)?.[1]||''
}
export function extractPublicAvatar(html:string):string|null{
 if(typeof html!=='string'||html.length>1600000)return null
 for(const match of html.matchAll(/<img\b[^>]{0,2200}>/gi)){
  const tag=match[0]
  const mark=[attr(tag,'class'),attr(tag,'id'),attr(tag,'alt')].join(' ')
  if(!/(candidate|avatar|profile-photo|user-photo|author-photo|user[_ -]?image|profile-img)/i.test(mark))continue
  if(/(logo|banner|footer|header|advertising)/i.test(mark))continue
  const raw=attr(tag,'data-src')||attr(tag,'src')||attr(tag,'data-lazy-src')||attr(tag,'srcset').split(/[,\s]/)[0]
  const found=safeAvatarURL(raw)
  if(found)return found
 }
 for(const match of html.matchAll(/<meta\b[^>]{0,2000}>/gi)){
  const tag=match[0]
  const marker=attr(tag,'property')||attr(tag,'name')
  if(!['og:image','twitter:image'].includes(marker))continue
  const src=attr(tag,'content')
  if(!/(candidate|avatar|user|profile)/i.test(src))continue
  const found=safeAvatarURL(src)
  if(found)return found
 }
 return null
}
export async function publicAvatarResponse(slug:string):Promise<Response>{
 const headers={'Cache-Control':'public, s-maxage=21600, stale-while-revalidate=86400','X-Robots-Tag':'noindex,nofollow'}
 if(!validSlug(slug))return new Response(null,{status:404,headers})
 try{
  const response=await fetch(ORIGIN+'/tecnico/'+slug+'/',{method:'GET',headers:{Accept:'text/html','User-Agent':'EncontreUmTecnico-Avatar/1.0'},signal:AbortSignal.timeout(4500),redirect:'manual'})
  if(!response.ok||!(response.headers.get('content-type')||'').includes('text/html'))return new Response(null,{status:204,headers})
  const html=(await response.text()).slice(0,1600001)
  const avatar=extractPublicAvatar(html)
  return avatar?new Response(null,{status:302,headers:{...headers,Location:avatar}}):new Response(null,{status:204,headers})
 }catch{return new Response(null,{status:204,headers})}
}
