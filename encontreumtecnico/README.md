# Encontre um Técnico — migração isolada

Este diretório é a base independente para publicar uma prévia no Vercel, sem alterar o WordPress e sem depender de Supabase ou Lovable. Não pertence ao portal EncontreUm.online.

## O que funciona nesta etapa
- Frontend responsivo e formulário de busca por serviço e cidade.
- API serverless somente de leitura, que tenta descobrir cadastros publicados pelo WordPress REST API.
- Fallback explícito sem dados fictícios caso o WordPress não exponha o tipo de conteúdo ou esteja indisponível.
- Área de prévia com noindex/nofollow (o domínio atual continua com o SEO de produção).

## O que NÃO está migrado
- Base MySQL, mídia do wp-content, usuários, senhas, histórico e metadados do WordPress.
- Login, criação/edição de cadastros, gerenciamento, avaliações e persistência transacional.
- IA de matching. Só ativar quando tiver dados verificados e custo medido.

## Próxima etapa após obter acesso ao backup da hospedagem
1. Exportar SQL completo, wp-content/uploads, lista de plugins e configuração das URLs, sem expor segredos em Git.
2. Mapear o banco e a taxonomia original, incluindo tipos de usuário e permissões.
3. Escolher banco PostgreSQL gerenciado ou Firebase dedicado com controles de acesso, sem Supabase obrigatório.
4. Importar e comparar totais/registros; validar login, recuperação de conta e autorização de cada perfil.
5. Recriar URLs, redirects 301, sitemap e metadados; testar contatos e fluxos antes de comutar.
6. Publicar em staging, testar ponta a ponta e só então trocar o domínio em uma janela controlada, mantendo rollback.

NUNCA criar cadastros fictícios, mudar DNS, nem afirmar que a migração completa ocorreu com esta prévia.
