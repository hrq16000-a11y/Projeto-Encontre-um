# Encontre um Técnico — controle da migração (06/11/2026)

Origem: `https://encontreumtecnico.com/` (WordPress, Careerfy + WP JobSearch; hospedagem Hosteg/cPanel identificada em inspeção anterior).
Destino de homologação: Vercel `encontreumtecnico-migracao`, projeto `prj_eDig9zjGxcavkQtsNyBeUqjAWRyj` (team msolus).
Código: `hrq16000-a11y/Projeto-Encontre-um`, branch `feat/encontreumtecnico-migracao-vercel`, PR #1.
Estratégia: substituir sem alterar o WordPress nem DNS até reconciliação e homologação completas.

## Marcos objetivos de conclusão (10)

- [x] **01. Infra isolada**: branch e Vercel; prévia noindex, CI, sem Lovable e sem Supabase.
- [x] **02. Armazenamento**: Vercel Blob privado em São Paulo, projeto com variáveis de ambiente e endpoints de saúde aprovados em checagem HTTP.
- [ ] **03. Cadastro real ponta a ponta**: gravar cadastro válido, preservar protocolo, aprovar, verificar galeria, testar edição, recuperação de acesso e proteção antispam.
- [ ] **04. Galeria completa de técnicos**: importar todos os perfis, campos, imagens, especialidades, cidades atendidas e perfis públicos, reconciliando com a origem.
- [ ] **05. Cadastro/painel de clientes**: preservar contas, setores, perfis, relacionamento, permissões e operações.
- [ ] **06. Atividades e contatos**: cadastrar atividades, status, anexos, perguntas, mensagens e contatos reais com rastreabilidade.
- [ ] **07. Autenticação e papéis**: Google/login, recuperação de acesso, funções técnico/cliente/admin, migração das contas e das credenciais com estratégia validada.
- [ ] **08. Banco e mídia WordPress**: cópia de MySQL e uploads, inventário fiel, relações, estados, URLs e conferência sem perda de dados.
- [ ] **09. SEO/URLs**: equivalência de endereços, canonicals, sitemap, estrutura sem páginas fictícias e redirects por rota, monitoramento de indexação.
- [ ] **10. Corte controlado e retorno**: teste integral, sincronização final, domínio real, monitoração, reversão sem perda de novos dados.

**Marcadores técnicos completos até aqui: 2/10 (20% do checklist, NÃO 20% dos dados migrados).**
**Importação privada de usuários, registros e arquivos da origem: 0% confirmados.**

## Evidências novas verificadas em 06/11/2026

- Vercel deployment `dpl_FvqoRmTGXYkzDHrYDURsWiRhEj9w`, commit `1952baa`: READY com 14 testes unitários e teste funcional de armazenamento privado e de cadastro, aprovação, galeria, edição, nova revisão e exclusão — todos aprovados.
- O teste de cadastro usa prefixo privado `encontreumtecnico/diagnostics/registration/<uuid>/` e exclui os objetos. Nenhum perfil de demonstração foi publicado.
- O cliente consegue atualizar/excluir um cadastro **novo** usando protocolo e chave pessoal; não equivale a migração de contas, Google OAuth, validação de e-mail nem recuperação da chave.
- O projeto passou a usar `get(...,{access:'private',useCache:false})` para registros transacionais após demonstrar falha de cache na segunda revisão. A etapa de revisão está validada.
- Sitemap oficial da origem informa dois arquivos para técnicos: 200 e 184 URLs brutas. Após filtragem/deduplicação, API pública validada via GitHub Actions retornou **356 URLs únicas**, ambas as fontes disponíveis. Campos completos e mídia original dependem da migração do banco e arquivos.
- Sitemap dos clientes informa 200 e 50 URLs brutas; ainda não importadas para o banco destino.
- Nova galeria limita inicialmente a 48 cartões e oferece carregamento incremental para não renderizar centenas simultaneamente.
- Falta persistência transacional escalável com usuários/roles, identidade e validação por e-mail para cumprir integralmente o marco 03.


## Referências da inspeção anterior

- Em 29/10/2026 foram observados **362 resultados públicos de técnicos**, **249 resultados públicos de clientes**, e em inspeção autenticada posterior foi anotado **888 contas** no WordPress; esses números não substituem a reconciliação do banco de dados e podem ter mudado.
- WordPress usa Careerfy/WP JobSearch; detalhes de papéis e metadados precisam ser extraídos do banco.
- Primeira página do diretório chegou a responder com 14 links públicos. Foi criado extrator HTTP + cache, mas a comunicação com o WordPress apresentou timeouts em verificações subsequentes.

## Tratamento de cadastros novos

- Formulário salva perfil em Blob privado como `pending` e devolve protocolo/chave.
- Só `approved` aparece na galeria pública, após autorização administrativa. E-mail não é publicado; WhatsApp profissional apenas se informado e consentido.
- A chave administrativa deve ficar somente na Vercel e futuramente ser substituída por Google OAuth/roles; jamais colocar segredos no GitHub.
- O armazenamento Blob é uma etapa de homologação; para migração de 888 contas, relações, mensagens e anexos, é necessário banco transacional compatível e restauração testada.

## Bloqueadores reais para clone 100%

1. Export integral do banco MySQL e `wp-content/uploads` da Hosteg/cPanel, com backup restaurável.
2. Inventário de tabelas e metadados Careerfy/WP JobSearch e das regras de login Google.
3. Implementação e homologação das operações ausentes antes de qualquer troca do domínio.

Não apagar contas, cadastros ou dados originais, não publicar perfis fictícios, não alterar DNS sem autorização explícita, não publicar a prévia com indexação antes da migração completa.
