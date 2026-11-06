import test from 'node:test';
import assert from 'node:assert/strict';
import {extractPublicDirectory} from './wordpress.js';
test('extrai links legítimos, nomes, imagens e elimina duplicatas',()=>{
 const html='<div><a href="/tecnico/alan-nascimento/"><img src="https://encontreumtecnico.com/wp-content/uploads/foto.jpg"></a><a href="https://encontreumtecnico.com/tecnico/alan-nascimento/">Alan Nascimento</a><a href="/tecnico/maria-silva/">Maria Silva</a></div>';
 const x=extractPublicDirectory(html);
 assert.equal(x.length,2);assert.equal(x[0].nome,'Alan Nascimento');assert.equal(x[0].imagem,'https://encontreumtecnico.com/wp-content/uploads/foto.jpg');
 assert.equal(x[1].url,'https://encontreumtecnico.com/tecnico/maria-silva/');
});
test('rejeita domínios externos e URLs fora de /tecnico/',()=>{
 assert.deepEqual(extractPublicDirectory('<a href="https://example.org/tecnico/falso/">Falso</a><a href="/tecnicos/outro/">Outro</a>'),[]);
});
test('ignora imagem externa e deriva nome da URL se âncora não contém texto',()=>{
 const x=extractPublicDirectory('<a href="/tecnico/joao-silva/"><img src="https://example.com/file.jpg"></a>');
 assert.equal(x[0].nome,'Joao Silva');assert.equal(x[0].imagem,'');
});
