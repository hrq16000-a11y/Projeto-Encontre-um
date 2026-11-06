import test from 'node:test';
import assert from 'node:assert/strict';
import { validate, hash, verifySecret, publicFields, keyFor } from './core.js';

const valid={nome:'Técnico Curitiba',especialidade:'Manutenção de computadores',cidade:'Curitiba',uf:'PR',descricao:'Reparo de notebooks',email:'contato@example.com',whatsapp:'41999999999',aceite:true,autorizacaoPublica:true};
test('cadastro válido preserva contato profissional',()=>{const result=validate(valid);assert.equal(result.error,undefined);assert.equal(result.data.uf,'PR');});
test('cadastro sem consentimento é recusado',()=>assert.ok(validate({...valid,autorizacaoPublica:false}).error));
test('email inválido é recusado',()=>assert.ok(validate({...valid,email:'invalido'}).error));
test('honeypot bloqueia spam',()=>assert.ok(validate({...valid,campoExtra:'bot'}).error));
test('um cadastro aprovado não expõe email nem chave',()=>{const x=publicFields({...valid,id:'x',chaveHash:'secret'});assert.equal('email' in x,false);assert.equal('chaveHash' in x,false);});
test('identificadores impedem traversal',()=>assert.throws(()=>keyFor('approved','../etc/passwd')));
test('credencial usa comparação constante',()=>{const key='a'.repeat(48);assert.equal(verifySecret(key,key),true);assert.equal(verifySecret('b'.repeat(48),key),false);});
test('hash token determinístico',()=>assert.equal(hash('a'),hash('a')));
