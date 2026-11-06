export default function handler(req,res){
  if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({erro:'Método não permitido'});}
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Robots-Tag','noindex,nofollow');
  return res.status(200).json({aplicacao:'encontreumtecnico-migracao',cadastrosConfigurados:Boolean(process.env.BLOB_READ_WRITE_TOKEN),adminConfigurado:Boolean(process.env.ADMIN_ACCESS_TOKEN),banco:'vercel-blob-private',versao:'0.2.0',siteOriginalPreservado:true});
}
