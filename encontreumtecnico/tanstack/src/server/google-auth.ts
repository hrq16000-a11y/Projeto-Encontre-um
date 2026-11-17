import {SignJWT,createRemoteJWKSet,jwtVerify} from 'jose'
const COOKIE='__Host-eut-session'
const ISSUER='encontreumtecnico-tanstack'
const GOOGLE_ISSUERS=['https://accounts.google.com','accounts.google.com']
const KEYSET=createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'))
export type GoogleSession={sub:string;name:string;email:string;role:'cliente'}
const secret=()=>process.env.AUTH_SESSION_SECRET||''
const key=()=>new TextEncoder().encode(secret())
export function googleConfigured(){return Boolean(process.env.GOOGLE_CLIENT_ID&&secret().length>=32)}
export function publicGoogleConfig(){return {enabled:googleConfigured(),clientId:googleConfigured()?process.env.GOOGLE_CLIENT_ID:''}}
export async function verifyCredential(credential:string):Promise<GoogleSession>{
 if(!googleConfigured())throw Error('Google não configurado no ambiente')
 const result=await jwtVerify(credential,KEYSET,{audience:process.env.GOOGLE_CLIENT_ID,issuer:GOOGLE_ISSUERS,algorithms:['RS256'],clockTolerance:30})
 const claim=result.payload
 if(claim.email_verified!==true||typeof claim.email!=='string'||!claim.email.trim()||typeof claim.sub!=='string'||!claim.sub)throw Error('Conta Google não verificada')
 return {sub:claim.sub,email:claim.email.toLowerCase(),name:typeof claim.name==='string'?claim.name.slice(0,100):'Cliente',role:'cliente'}
}
export async function makeCookie(session:GoogleSession){
 const token=await new SignJWT({...session}).setProtectedHeader({alg:'HS256',typ:'JWT'}).setIssuer(ISSUER).setAudience(ISSUER).setIssuedAt().setExpirationTime('8h').sign(key())
 return COOKIE+'='+token+'; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=28800'
}
export const clearCookie=()=>COOKIE+'=; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=0'
export async function readGoogleSession(request:Request):Promise<GoogleSession|null>{
 if(!googleConfigured())return null
 const found=request.headers.get('cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith(COOKIE+'='))
 if(!found)return null
 const token=found.slice(COOKIE.length+1)
 if(token.length>4000)return null
 try{
  const {payload}=await jwtVerify(token,key(),{issuer:ISSUER,audience:ISSUER,algorithms:['HS256']})
  if(typeof payload.sub!=='string'||typeof payload.email!=='string'||payload.role!=='cliente')return null
  return {sub:payload.sub,email:payload.email,name:String(payload.name||'Cliente'),role:'cliente'}
 }catch{return null}
}
export function requireSameOrigin(request:Request){
 const origin=request.headers.get('origin')
 return !origin||origin===new URL(request.url).origin
}
export function noStoreJSON(data:unknown,status=200,extra:HeadersInit={}){
 return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex,nofollow',...extra}})
}
