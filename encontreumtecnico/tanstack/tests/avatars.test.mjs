import test from 'node:test'
import assert from 'node:assert/strict'
import {extractPublicAvatar,safeAvatarURL,validSlug} from '../src/server/public-avatar.ts'
test('identifica avatar candidato a partir de classe de imagem',()=>{
 const html='<html><img class="header-logo" src="https://encontreumtecnico.com/wp-content/uploads/logo.webp"><img class="candidate-avatar" src="https://encontreumtecnico.com/wp-content/uploads/2026/tecnico.jpg"></html>'
 assert.equal(extractPublicAvatar(html),'https://encontreumtecnico.com/wp-content/uploads/2026/tecnico.jpg')
})
test('não usa logo genérica como foto de técnico',()=>{
 assert.equal(extractPublicAvatar('<meta property="og:image" content="https://encontreumtecnico.com/wp-content/uploads/logo.webp">'),null)
})
test('não permite imagens de host externo malicioso',()=>assert.equal(safeAvatarURL('https://example.net/wp-content/uploads/other.jpg'),null))
test('aceita URL real de avatar gravatar seguro',()=>assert.match(safeAvatarURL('https://secure.gravatar.com/avatar/abcdef'),/gravatar/))
test('não aceita slugs com traversal ou barra',()=>{assert.equal(validSlug('../admin'),false);assert.equal(validSlug('joao-silva'),true)})
