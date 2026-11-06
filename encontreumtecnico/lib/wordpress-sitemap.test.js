import test from 'node:test';
import assert from 'node:assert/strict';
import {extractCandidateSitemap,mergeSitemapDirectory} from './wordpress.js';
const xml=`<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://encontreumtecnico.com/tecnico/alan-nascimento/</loc></url>
  <url><loc>https://encontreumtecnico.com/tecnico/maria-silva/</loc></url>
  <url><loc>https://example.com/tecnico/pessoa-falsa/</loc></url>
  <url><loc>https://encontreumtecnico.com/tecnico/alan-nascimento/</loc></url>
  <url><loc>https://encontreumtecnico.com/cliente/cliente-exemplo/</loc></url>
</urlset>`;
test('sitemap de técnicos aceita somente URL real do domínio e deduplica',()=>{
 const got=extractCandidateSitemap(xml);
 assert.equal(got.length,2);
 assert.equal(got[0].url,'https://encontreumtecnico.com/tecnico/alan-nascimento/');
 assert.equal(got[0].nomeInferido,true);
 assert.equal(got[0].cidade,'');
});
test('sitemap vazio e conteúdo HTML inválido não fabricam perfis',()=>{
 assert.deepEqual(extractCandidateSitemap(''),[]);
 assert.deepEqual(extractCandidateSitemap('<html>profile</html>'),[]);
});
test('galeria combina sitemaps e enriquece somente mesmo link público',()=>{
 const p=extractCandidateSitemap(xml);
 const merged=mergeSitemapDirectory([p.slice(0,1),p.slice(1)],[
   {id:'wp-alan-nascimento',nome:'Alan Nascimento',url:p[0].url,imagem:'https://encontreumtecnico.com/wp-content/uploads/a.jpg'}
 ]);
 assert.equal(merged.length,2);
 assert.equal(merged[0].nomeInferido,false);
 assert.equal(merged[0].imagem,'https://encontreumtecnico.com/wp-content/uploads/a.jpg');
});
