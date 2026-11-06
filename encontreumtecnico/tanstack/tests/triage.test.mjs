import test from 'node:test'
import assert from 'node:assert/strict'
import {validateTriage,triageText,whatsAppLink} from '../src/lib/triage.ts'
const base={
 tecnico:'alan-nascimento',categoria:'Formatação de computadores',
 equipamento:'Computador desktop',fabricante:'Windows 11',problema:'Computador não inicia e exige instalação do sistema.',
 cidade:'Curitiba',uf:'PR',bairro:'Boqueirão',cep:'81600000',endereco:'',
 modalidade:'presencial',compartilharEndereco:false,compartilharGps:false,
 aceite:true,confirmouLocalizacao:true
}
test('triagem válida não publica telefone e requer cidade confirmada',()=>{
 const v=validateTriage(base);assert.equal(v.error,undefined);assert.equal(v.value.cidade,'Curitiba')
})
test('detalhes insuficientes são recusados',()=>assert.ok(validateTriage({...base,problema:'breve'}).error))
test('endereço sem consentimento explícito é recusado',()=>assert.ok(validateTriage({...base,endereco:'Rua Particular 125'}).error))
test('endereço autorizado é mantido apenas na triagem privada',()=>{
 const v=validateTriage({...base,endereco:'Rua Particular 125',compartilharEndereco:true})
 assert.equal(v.value.endereco,'Rua Particular 125')
})
test('coordenadas sem opt-in explícito são recusadas',()=>assert.ok(validateTriage({...base,latitude:-25.42,longitude:-49.25}).error))
test('coordenadas com opt-in e limites corretos são válidas',()=>{
 const v=validateTriage({...base,compartilharGps:true,latitude:-25.42,longitude:-49.25})
 assert.equal(v.error,undefined);assert.equal(v.value.latitude,-25.42)
})
test('posição GPS inválida é recusada',()=>assert.ok(validateTriage({...base,compartilharGps:true,latitude:500,longitude:32}).error))
test('consentimentos são obrigatórios',()=>assert.ok(validateTriage({...base,aceite:false}).error))
test('mensagem está triada com serviço, problema e bairro sem endereço não autorizado',()=>{
 const v=validateTriage(base).value
 const msg=triageText(v)
 assert.match(msg,/Formatação de computadores/)
 assert.match(msg,/Boqueirão/)
 assert.match(msg,/Windows 11/)
 assert.doesNotMatch(msg,/Rua Particular/)
})
test('WhatsApp aceita celular válido com DDD',()=>assert.equal(whatsAppLink('41999999999','Olá').startsWith('https://wa.me/5541999999999?text='),true))
test('WhatsApp não confunde DDD 55 com código do país',()=>assert.equal(whatsAppLink('55999999999','Oi').startsWith('https://wa.me/5555999999999?'),true))
test('WhatsApp recusa número inválido',()=>assert.equal(whatsAppLink('123','Oi'),null))
