import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { put, get, list, del } from '@vercel/blob';

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  if (process.env.VERCEL === '1') {
    throw new Error('BLOB_READ_WRITE_TOKEN ausente no ambiente de build Vercel.');
  }
  console.log('Blob round-trip: ignorado fora da Vercel (sem credencial local).');
} else {
  // Chave efêmera de diagnóstico isolada; não é cadastro e nunca aparece na galeria.
  const id=randomUUID();
  const path='encontreumtecnico/diagnostics/'+id+'.json';
  const content=JSON.stringify({ id, kind:'private-blob-health', version:1 });
  let created=false;
  try {
    await put(path, content, { access:'private', contentType:'application/json', addRandomSuffix:false });
    created=true;
    const response=await get(path, { access:'private' });
    assert.equal(response?.statusCode,200,'Gravação não pôde ser recuperada');
    assert.ok(response.stream,'Blob privado sem conteúdo');
    const decoded=JSON.parse(await new Response(response.stream).text());
    assert.deepEqual(decoded,JSON.parse(content),'Conteúdo persistido não confere');
    const page=await list({prefix:path,limit:5});
    assert.ok(page.blobs.some(x=>x.pathname===path),'Arquivo não encontrado no índice');
    console.log('Blob round-trip privado: PUT, GET, LIST aprovados.');
  } finally {
    if(created) {
      await del(path);
      const check=await get(path, { access:'private' });
      assert.equal(check,null,'Diagnóstico temporário não foi excluído');
      console.log('Blob round-trip privado: DELETE aprovado, sem dados de teste restantes.');
    }
  }
}
