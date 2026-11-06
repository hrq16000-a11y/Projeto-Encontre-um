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

## Atualização da publicação Vercel — 06/11/2026

- URL estável de homologação: https://encontreumtecnico-migracao-msolus.vercel.app/
- Alias da Vercel associado ao deploy `dpl_EkLj6CK2QDPaTXHy6kjtHRxVzVQc` — estado READY, commit `3bc78c39339e6be01472ef4ba32ee9c85e61ae55`.
- **22/22** testes unitários passaram.
- E2E técnico aprovado: cadastro, armazenamento privado, consulta, moderação, galeria, edição/reaprovação e exclusão.
- E2E cliente/solicitação aprovado: cadastro, autenticação por chave, aprovação de cliente, solicitação, revisão, exibição pública e exclusão.
- Excluir cliente agora remove também suas solicitações vinculadas nos estados pendente e aprovado; validado com registro de teste isolado.
- Páginas novas: `/cliente.html`, `/clientes.html`, `/atividades.html`, `/admin-portal.html`.
- APIs: `/api/cliente`, `/api/clientes`, `/api/solicitacoes`, `/api/minhas-solicitacoes`, `/api/admin-portal`.
- Checagem externa GitHub Actions `42164738475` passou em páginas, APIs públicas, estado do armazenamento, URLs únicas de técnicos (356 de duas fontes do sitemap) e acesso negado sem credenciais.
- Não migrados: contas e logins WordPress, histórico das relações entre clientes/técnicos, mensagens, arquivos privados e provas de compatibilidade de URLs.
- **A nova versão não substitui integralmente o WordPress.** Ainda não há Google OAuth, recuperação de chaves por e-mail, antispam robusto, nem banco transacional relacional para relações completas. O ambiente permanece `noindex` para não competir com o domínio original.
- Administração nesta homologação utiliza `ADMIN_ACCESS_TOKEN` do ambiente Preview da Vercel; não exibir em código, logs ou respostas públicas. Para a passagem a produção, substituir por autenticação com contas e papéis e rotação de segredo.
- Não alterar DNS nem publicar no domínio oficial até exportação/restauração e reconciliação de MySQL, upload de mídia, autenticação, SEO e jornadas.

## TanStack Start SSR — 06/11/2026

- **Projeto Vercel novo:** `encontreumtecnico-tanstack`, ID `prj_hR8sI1zUbXfLuL5fbI5U9iWk4IXx`, team `msolus`.
- **Endereço fixo atribuído pela Vercel:** https://encontreumtecnico-tanstack.vercel.app/
- **Deploy de produção TanStack READY:** `dpl_AGKy8NWsCaVDxZ4BrbpexsGPNYNo`, commit `7f2aeb77d491b2207fda0fdb64106595ad980c40`. Ambiente ainda **noindex, nofollow**.
- **Arquitetura:** TanStack Start + React SSR + Nitro + Vite 8, rotas limpas sem .html, protótipo independente do Lovable/Supabase. Ainda não é 100% autossuficiente pois as APIs TanStack encaminham requisições ao projeto Vercel legado `encontreumtecnico-migracao`.
- **Identidade:** logo e favicon reais extraídos do WordPress autorizado e versionados no GitHub dentro de ambos os projetos. Os arquivos estão agora locais à aplicação, sem dependência visual da URL original.
- **Páginas React SSR:** `/`, `/galeria`, `/cadastro`, `/cliente`, `/clientes`, `/atividades`, `/admin`, `/meu-perfil`, `/acompanhar`, `/tecnico/:slug`. Todas renderizaram HTTP 200 em testes locais do GitHub e no deploy Vercel de prévia. O perfil `/tecnico/alan-nascimento` foi testado na prévia.
- **Backend Vercel:** cadastros de técnicos/cliente, aprovação, perfis, solicitações, armazenamento Blob e acompanhamento validados por testes integrados com operações reais e dados de diagnóstico apagados. Não há alegação de login WordPress legado funcional.
- **Galeria:** 356 URLs únicas de perfis antigos derivadas dos dois sitemaps públicos da origem. Não confundir com importação dos campos completos nem do banco MySQL.
- **Histórico WordPress:** **0% dos registros privados importados e reconciliados** (sem SQL/arquivos da hospedagem disponíveis nesta conexão); usuários antigos não estão autenticando na Vercel, e links de origem podem continuar necessários para histórico e contato.
- **Segurança de publicação:** não atribuir domínio oficial, alterar DNS, ligar indexação ou declarar clonagem 100% antes de acesso à hospedagem, importação integral das contas, mídias, histórico, autenticação/roles, ensaio de restauração, revalidação final e plano de reversão.
- **Próximas decisões técnicas:** substituir ponte temporária por APIs transacionais nativas do projeto TanStack sem perder novos cadastros; usar banco relacional independente para contas e relacionamentos; fazer inventário e reconciliação do SQL + `wp-content/uploads` e mapear Careerfy/JobSearch; implementar Google OAuth e provas de propriedade dos perfis antigos.
