export type Triage={
 tecnico:string;categoria:string;equipamento:string;fabricante:string;
 problema:string;cidade:string;uf:string;bairro:string;cep:string;
 endereco:string;modalidade:'presencial'|'remoto'|'a-combinar';
 compartilharEndereco:boolean;compartilharGps:boolean;
 latitude?:number;longitude?:number;aceite:boolean;confirmouLocalizacao:boolean
}
const states=new Set('AC AL AM AP BA CE DF ES GO MA MG MS MT PA PB PE PI PR RJ RN RO RR RS SC SE SP TO'.split(' '))
export function clip(input:unknown,max=100){
 return typeof input==='string'?input.trim().replace(/\s+/g,' ').slice(0,max):''
}
export function validateTriage(raw:unknown):{value:Triage;error?:never}|{error:string;value?:never}{
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return {error:'Formulário inválido.'}
 const x=raw as Record<string,unknown>
 const tecnico=clip(x.tecnico,160),categoria=clip(x.categoria,90),equipamento=clip(x.equipamento,100),fabricante=clip(x.fabricante,80)
 const problema=clip(x.problema,1200),cidade=clip(x.cidade,90),uf=clip(x.uf,2).toUpperCase()
 const bairro=clip(x.bairro,90),cep=clip(x.cep,10).replace(/\D/g,''),endereco=clip(x.endereco,180)
 const modalidade=['presencial','remoto','a-combinar'].includes(String(x.modalidade))?x.modalidade as Triage['modalidade']:'a-combinar'
 if(!/^[a-z0-9._%-]{2,160}$/i.test(tecnico))return {error:'Técnico inválido.'}
 if(categoria.length<3||problema.length<20||cidade.length<2||!states.has(uf))return {error:'Informe serviço, detalhes do problema, cidade e UF.'}
 if(x.aceite!==true||x.confirmouLocalizacao!==true)return {error:'Confirme os dados e autorize a triagem privada.'}
 const compartilharEndereco=x.compartilharEndereco===true
 if(!compartilharEndereco&&endereco)return {error:'Endereço preenchido exige autorização para compartilhar.'}
 const compartilharGps=x.compartilharGps===true
 const latitude=typeof x.latitude==='number'?x.latitude:undefined
 const longitude=typeof x.longitude==='number'?x.longitude:undefined
 if((latitude!==undefined||longitude!==undefined)&&!compartilharGps)return {error:'Coordenadas exigem autorização explícita.'}
 if(compartilharGps&&latitude!==undefined&&longitude!==undefined&&(!Number.isFinite(latitude)||!Number.isFinite(longitude)||Math.abs(latitude)>90||Math.abs(longitude)>180))return {error:'Coordenadas inválidas.'}
 return {value:{tecnico,categoria,equipamento,fabricante,problema,cidade,uf,bairro,cep,endereco:compartilharEndereco?endereco:'',modalidade,compartilharEndereco,compartilharGps,latitude:compartilharGps?latitude:undefined,longitude:compartilharGps?longitude:undefined,aceite:true,confirmouLocalizacao:true}}
}
export function triageText(v:Triage){
 const lines=[
  'Olá! Encontrei seu perfil no Encontre um Técnico e gostaria de solicitar um atendimento.',
  '',
  'Serviço: '+v.categoria,
  v.equipamento?'Equipamento: '+v.equipamento:'',
  v.fabricante?'Modelo/fabricante: '+v.fabricante:'',
  'Problema: '+v.problema,
  'Modalidade: '+(v.modalidade==='a-combinar'?'A combinar':v.modalidade),
  'Localidade: '+[v.bairro,v.cidade,v.uf].filter(Boolean).join(' / '),
  v.cep?'CEP: '+v.cep:'',
  v.compartilharEndereco&&v.endereco?'Endereço informado pelo cliente: '+v.endereco:'',
  'Podemos conversar sobre disponibilidade, valores e condições?'
 ]
 return lines.filter((line,i)=>Boolean(line)||i===1).join('\n').slice(0,2800)
}
export function whatsAppLink(phone:unknown,text:string){
 const normalized=String(phone||'').replace(/\D/g,'')
 if(!/^(?:55)?[1-9]\d9\d{8}$/.test(normalized))return null
 const number=normalized.length===13&&normalized.startsWith('55')?normalized:'55'+normalized
 return 'https://wa.me/'+number+'?text='+encodeURIComponent(text)
}
