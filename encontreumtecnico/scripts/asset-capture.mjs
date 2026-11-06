// Temporary asset-copy helper for owner's original WordPress logo and favicon.
// Emits public file bytes for the GitHub connector to commit as binary blobs.
// Only allow exact original site assets and the WEBP file type.
const assets={
 LOGO:'https://encontreumtecnico.com/wp-content/uploads/2025/01/logo-encontreumtecnico-b.png.webp',
 ICON:'https://encontreumtecnico.com/wp-content/uploads/2025/01/cropped-ico-192x192.png.webp'
};
for(const [key,url] of Object.entries(assets)){
 let error='Unavailable';
 for(let attempt=0;attempt<4;attempt++){
  try{
   const response=await fetch(url,{signal:AbortSignal.timeout(10000),headers:{Accept:'image/webp'}});
   if(!response.ok)throw Error('HTTP '+response.status);
   const bytes=new Uint8Array(await response.arrayBuffer());
   if(bytes.length<100||bytes.length>350000)throw Error('Invalid size');
   if(new TextDecoder().decode(bytes.slice(0,4))!=='RIFF' || new TextDecoder().decode(bytes.slice(8,12))!=='WEBP')
     throw Error('Unexpected file type');
   console.log('ASSET_'+key+'_BASE64_BEGIN'+Buffer.from(bytes).toString('base64')+'ASSET_'+key+'_BASE64_END');
   error='';
   break;
  }catch(e){error=String(e); await new Promise(r=>setTimeout(r,700));}
 }
 if(error)console.error('ASSET_'+key+'_ERROR '+error);
}
