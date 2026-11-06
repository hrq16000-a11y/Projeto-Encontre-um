import test from 'node:test';
import assert from 'node:assert/strict';
import {extractPublicDirectory} from './wordpress.js';
test('extrai links públicos legítimos e elimina duplicatas',()=>{
 const html='<div><a href="https://encontreumtecnico.com/tecnico/alan-nascimento/">Alan Nascimento</a><a href="/tecnico/alan-nascimento/"><img alt="Foto"></a><a href="/tecnico/maria-silva/">Maria Silva</a></div>';
 const x=extractPublicDirectory(html);
 assert.equal(x.length,2);assert.equal(x[0].nome,'Alan Nascimento');assert.equal(x[1].url,'https://encontreumtecnico.com/tecnico/maria-silva/');
});
test('rejeita domínios externos e URLs fora de /tecnico/',()=>{
 const x=extractPublicDirectory('<a href="https://example.org/tecnico/falso/">Falso</a><a href="/tecnicos/outro/">Outro</a>');
 assert.deepEqual(x,[]);
});
test('usa slug como nome somente quando a âncora não contém texto',()=>{
 const x=extractPublicDirectory('<a href="/tecnico/joao-silva/"><img alt="imagem"></a>');
 assert.equal(x[0].nome,'Joao Silva');
});
