# Rodada 5 — Busca e perfis reais (06/11/2026)

## Implementado
- Busca por nome e especialidade insensível a acentos e variações de espaços.
- Filtro de localidade com três estados: correspondente, desconhecido ou outra localidade. Endereço não informado não significa disponibilidade na região.
- Botão opcional para incluir perfis sem cidade cadastrada em buscas regionais, sempre acompanhado de aviso.
- Rota /tecnico/:slug aceita slugs da origem e UUID de cadastros aprovados, sem expor dados pendentes, e-mail ou chave.
- WhatsApp exibido somente quando está nos campos aprovados e publicados.
- Cards da home e da galeria acessam perfis novos e antigos.
- Acessibilidade: atalho de teclado para conteúdo, Escape no menu, alvos de toque maiores e campos móveis legíveis.

## Testes
- 12 testes unitários para busca, localidade e URL de perfil.
- Build TanStack SSR, verificação TypeScript e smoke de rotas sem extensão.
- Verificações HTTP de leitura do endereço Vercel fixo. Nenhum cadastro fictício de diagnóstico público.

## Pendências
- Dados históricos WordPress e wp-content/uploads não importados; login Google e mensagens antigas pendentes.
- Galeria de novos aprovados precisa de paginação de dados ao expandir significativamente.
- 2 de 10 marcos da migração completa concluídos; oito pendentes. Redesign não altera essa porcentagem.
- Domínio original e DNS intocados; a prévia Vercel segue noindex.
