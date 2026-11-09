// AUDITORIA ISOLADA: apenas listagem de metadados, sem leitura de conteúdo e sem escrita.
// Executar SOMENTE no Preview temporário, nunca mesclar esta build de auditoria ao portal.
import { list } from '@vercel/blob';

const categories = [
  'pending', 'approved',
  'clientes/pending', 'clientes/approved',
  'solicitacoes/pending', 'solicitacoes/approved',
];
const root = 'encontreumtecnico/v1/';
const maxPages = 40;
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error('Armazenamento antigo indisponível para auditoria de leitura');
}
const counts = {};
let complete = true;

for (const category of categories) {
  let cursor;
  let total = 0;
  let totalBytes = 0;
  let finished = false;
  for (let page = 0; page < maxPages; page++) {
    const response = await list({
      prefix: root + category + '/',
      cursor,
      limit: 100,
    });
    // Não registrar nomes de arquivos, identificadores, e-mails ou caminhos.
    total += response.blobs.length;
    totalBytes += response.blobs.reduce((sum, blob) => sum + (Number(blob.size) || 0), 0);
    if (!response.hasMore) {
      finished = true;
      break;
    }
    cursor = response.cursor;
    if (!cursor) throw new Error('Paginação do armazenamento sem cursor');
  }
  counts[category] = { objects: total, bytes: totalBytes, complete: finished };
  if (!finished) complete = false;
}

console.log('EUT_BLOB_INVENTORY_COUNTS=' + JSON.stringify({
  root: 'v1', // raiz técnica, não contém dado pessoal
  counts,
  complete,
  note: 'Somente quantidade e bytes de objetos privados; nenhum cadastro lido ou alterado',
}));
if (!complete) process.exitCode = 2;
