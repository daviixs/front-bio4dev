# PRD - Bio4Dev (Frontend + Backend)

## 1. Resumo Executivo
Plataforma web para criacao e gestao de bios/portfolios de desenvolvedores com templates personalizados. Frontend (Vite + React + TS + Tailwind + shadcn/ui) entrega onboarding, wizard, dashboard e pagina publica; backend (NestJS + Prisma + PostgreSQL, UUID v4) expone APIs REST documentadas em Swagger para perfis, paginas, redes, projetos, stacks e tokens de preview de 24h. Diferenciais: preview seguro, wizard pre-preenchido, tres templates tematicos e DX opiniativa (docs, client Axios centralizado, tipos compartilhados).

## 2. Problema e Oportunidade
- Dor: criadores e squads precisam publicar portfolios rapidamente, com revisao segura antes de publicar; fluxos atuais sao ad-hoc, sem preview controlado, com risco de vazamento e retrabalho em slugs/ordens.
- Oportunidade: backend unificado e frontend opinativo reduzem tempo de setup, oferecem templates prontos e controle de acesso a rascunhos, permitindo reuso em campanhas, links-bio e vitrines internas.
- [Sugestao Tecnica] Posicionar como white-label para agencias; planos pagos por limites de projetos/paginas/templates e tokens extra.

## 3. Publico-Alvo e Personas
- Dev/designer individual que quer portfolio personalizavel com preview seguro.
- Squad de marketing/produto que precisa lançar landing pages de talentos/campanhas sem depender de infra.
- Equipe de engenharia que reutiliza backend para apps web/mobile.
- [Sugestao Tecnica] Agencia digital que administra portfolios de varios clientes.

## 4. User Stories (criterios tecnicos)
- Visitante acessa bio4dev.com/{username} e ve portfolio publicado ou via token valido.
  - Aceite: GET /profile/username/:username retorna publicado; unpublished exige token; 401 token invalido, 403 sem token, 404 username inexistente; cache invalida ao publicar/despublicar.
- Usuario autenticado cria/atualiza perfil (username unico, bio, avatar, tema, template, published).
  - Aceite: validacao server-side; published default false; erro 409 em username duplicado; update de username propaga para slugs/public cache.
- Usuario autenticado conclui wizard com dados default para ir ao ar em minutos.
  - Aceite: ao concluir, cria legenda, config, socials, projetos, pages default e marca published=true; toasts de sucesso/erro; retry idempotente para itens ja criados.
- Dono gera link de preview temporario (24h) para rascunhos.
  - Aceite: token UUID unico, expira em 24h com job de limpeza; tokens revogados ao deletar perfil; acesso com token ignora published, respeita expiracao; sem token retorna 403 se unpublished.
- Dono gerencia conteudos via dashboard (legenda, paginas, projetos, redes, stacks) com reordenacao.
  - Aceite: CRUD completo; ordenacao persistida com estrategia de re-ranking; valida duplicidade (projeto por nome, slug unico por profile); drag-and-drop salva ordem com debounce; erros exibidos em toast.
- Dono escolhe entre 3 templates e ve preview ao vivo.
  - Aceite: troca persiste templateType; preview usa dados reais; responsivo desktop/mobile; fallback para assets default.
- Dono copia link publico do perfil.
  - Aceite: acao copia URL com username; toast de confirmacao; erro se profile sem username definido.
- [Sugestao Tecnica] Upload de avatar/imagens de projeto com validacao de tipo/tamanho e placeholder seguro.

## 5. Edge Cases e Regras de Negocio
- Username change: PATCH profile com username novo valida disponibilidade; se alterado, invalida cache, reemite links de share; tokens de preview continuam funcionando pelo profileId, nao pelo username.
- Slugs duplicados: validacao otimista no client (checar slug existente) e server retorna 409 em conflito; ao editar slug usado em links, frontend alerta quebra de rotas.
- Tokens de preview: expiracao precisa (createdAt + 24h); se perfil for deletado, tokens sao revogados; tokens expirados limpos via cron/job; acesso com token expirado responde 401.
- Reordenacao (drag-and-drop): usar colunas numericas de ordem com re-ranking discreto (ex.: reescrever ordem sequencial 1..n ao soltar) para evitar drift; [Sugestao Tecnica] indices lexicograficos (ex. 100,200) se volume grande para evitar writes massivos.
- Publicacao/despublicacao: publicar troca flag e invalida cache; despublicar retorna 403 para rota publica e remove do cache/CDN; preview token ainda acessa se valido.
- Delecao cascata: remover profile dispara delecao/soft delete de legenda, socials, projetos, pages, config; tokens revogados.

## 6. Requisitos Funcionais
- Autenticacao e contas: signup/login via /users e /auth/login; JWT ou session; guard de rotas privadas; refresh token opcional; logout limpa armazenamento.
- Profile e preview: CRUD de profile; flag published; token de preview 24h; GET /profile/username/:username aplica regra de publicacao/token; limpeza automatica de tokens expirados.
- Wizard inicial: sequencia com dados default e pre-fill opcional via GitHub API (nome, avatar, bio, repos em destaque) com consentimento; conclusao marca published=true.
- Conteudo: CRUD de legenda, config, pages (slug unico, ordem), social (plataforma enumerada, url, ordem), projetos (nome, descricao, gif, links demo/code, ordem), tech stack, historico profissional, footer unico por profile.
- Dashboard: formularios com React Hook Form + Zod; toasts Sonner; loading states; drag-and-drop com persistencia; autosave opcional com debounce.
- Templates e pagina publica: 3 templates (minimal/neon/creative) com SEO basico e OG dinamico; rota /:username responsiva; dados carregados do endpoint publico com cache controlado.
- API cliente: Axios centralizado (src/lib/api.ts), interceptors para auth e 429/401; Zustand para auth/profile; persistencia seletiva em storage seguro.
- Documentacao e DX: Swagger em /api; contrato OpenAPI versionado; exemplos de payload; lint/format nos DTOs; scripts de seed para wizard default.
- [Sugestao Tecnica] Suporte futuro a blocos customizados e webhooks de publicacao; paginacao/busca para listas grandes.

## 7. Requisitos Nao-Funcionais
- Performance: latencia p95 <300ms em operacoes simples; pagina publica LCP <2.5s em 4G; bundles com code splitting; cache de profile por username com TTL (ex.: 60s) e invalidacao em mutacoes.
- Confiabilidade: expiracao de tokens garantida; transacoes Prisma ao recriar colecoes (projetos/stacks); health checks; retries com backoff em chamadas criticas do wizard.
- Escalabilidade: stateless; PostgreSQL com indices em username, tokens, FKs; suportar multiplos perfis/tokens concorrentes; [Sugestao Tecnica] CDN para assets/gifs.
- Seguranca: tokens UUID aleatorios; validacao class-validator/Zod; CORS configurado; acesso a unpublished bloqueado sem token; rate limiting por IP e por userId em rotas sensiveis; [Sugestao Tecnica] auditoria de acoes admin.
- Observabilidade: logs estruturados por request; metricas de latencia/erros; tracing distribuido; dashboards de uptime e erros; alertas em p95/p99 e taxas de erro 4xx/5xx.
- Compatibilidade: API REST JSON v1; OpenAPI publicado; frontend mobile-first e compatível com navegadores modernos; temas com contraste minimo AA.
- Operacao: migracoes Prisma versionadas; pipeline CI com lint/test/build; env VITE_API_URL; variaveis separadas por ambiente; backups e rollback de migracao.

## 8. SEO, A11y e Growth
- SEO/OG: OG tags dinamicas por username (title, description, image), Twitter Card summary_large; sitemap auto; canonical para username; meta robots controlado por published; [Sugestao Tecnica] prerender da pagina publica.
- Shareability: botao copiar link; preview image gerada a partir do template; UTMs opcionais; short links opcionais.
- Acessibilidade: WCAG 2.1 AA (contraste minimo, foco visivel, navegacao por teclado, labels associados, aria-live para toasts, skip to content); testes de navegacao por teclado nos templates.
- Onboarding: wizard em passos (conta -> perfil -> legenda -> redes -> projetos -> paginas -> review/publicar) com barra de progresso; pre-fill GitHub opcional (avatar, bio, repos) com autorizacao; gamificacao com checklist e indicador de completude.

## 9. Tabela de Endpoints (principais)
| Metodo | Rota | Descricao | Sucesso | Erros esperados |
| --- | --- | --- | --- | --- |
| POST | /users | Criar usuario | 201 {id,email,nome} | 400 validacao, 409 email duplicado, 500 |
| POST | /auth/login | Autenticar | 200 {token,refresh?} | 400 credenciais, 401 invalido, 429 rate limit, 500 |
| POST | /profile | Criar perfil | 201 {profile} | 400 validacao, 409 username duplicado, 401/403 auth, 500 |
| PATCH | /profile/:id | Atualizar perfil | 200 {profile} | 400 validacao, 401/403, 409 username duplicado, 404 nao encontrado, 500 |
| GET | /profile/:id/complete | Perfil completo | 200 {profile+relacionamentos} | 401/403, 404, 500 |
| GET | /profile/username/:username | Perfil publico | 200 {profile} | 401 token preview invalido, 403 unpublished sem token, 404 inexistente, 429, 500 |
| POST | /profile/:id/preview-token | Criar token preview | 201 {token,expiraEm} | 401/403, 404, 429, 500 |
| POST | /legenda | Criar legenda | 201 {legenda} | 400, 401/403, 404 profile, 500 |
| PATCH | /legenda/:id | Atualizar legenda | 200 {legenda} | 400, 401/403, 404, 500 |
| POST | /config | Criar config | 201 {config} | 400, 401/403, 404 profile, 409 duplicado por profile, 500 |
| PATCH | /config/:id | Atualizar config | 200 {config} | 400, 401/403, 404, 500 |
| POST | /social | Criar rede | 201 {social} | 400, 401/403, 404 profile, 409 duplicado opcional, 500 |
| GET | /social/profile/:profileId | Listar redes | 200 [{social}] | 401/403, 404, 500 |
| POST | /projetos | Criar projeto | 201 {projeto} | 400, 401/403, 404 profile, 409 nome duplicado, 500 |
| PATCH | /projetos/:id | Atualizar projeto | 200 {projeto} | 400, 401/403, 404, 409 duplicidade, 500 |
| POST | /pages | Criar pagina | 201 {page} | 400, 401/403, 404 profile, 409 slug duplicado, 500 |
| PATCH | /pages/:id | Atualizar pagina | 200 {page} | 400, 401/403, 404, 409 slug duplicado, 500 |
| DELETE | /pages/:id | Deletar pagina | 204 | 401/403, 404, 500 |
| GET | /pages/profile/:profileId | Listar paginas | 200 [{page}] | 401/403, 404, 500 |

## 10. Rate Limiting e Cache
- Rate limiting: public GET /profile/username/:username e /pages/slug/:slug limitados por IP (ex.: 60 req/min) e burst control; mutacoes autenticadas por userId (ex.: 30 req/min) para evitar abuso.
- Protecao de login: /auth/login com limitar mais agressivo (ex.: 5 req/min por IP + captcha opcional apos falhas).
- Cache: camada de cache (Redis) por username para profile completo com TTL 60s e cache-busting em mutacoes (publish/unpublish, updates de conteudo). [Sugestao Tecnica] ETag/If-None-Match para GET publicos.

## 11. KPIs SMART
- Conversao preview->publicacao: atingir >=35% de perfis publicados ate D+7 do primeiro token, medido semanalmente.
- Time-to-publish: mediana <15 minutos do signup ate published=true; medido por logs de evento.
- Estabilidade: p95 de latencia <300ms e taxa de erro 5xx <0.5% por semana nas rotas publicas.
- Uso: media >=3 projetos e >=2 paginas por profile ativo em 30 dias; >=1 troca de template por 30% dos usuarios ativos no mes.
- Retencao: % de usuarios que retornam e editam em 30 dias >=25%; tokens de preview com acesso valido >=60%.

## 12. Matriz MoSCoW (MVP)
- Must-have: auth (signup/login), CRUD profile/legenda/config/social/projetos/pages, templates 01-03, preview token 24h, rota publica /:username, wizard com dados default, rate limiting basico, cache/invalidaçao, a11y AA, OG dinamico basico, logs/metricas minimos.
- Should-have: pre-fill GitHub opcional, drag-and-drop com re-ranking persistente, autosave com debounce, ETag para GET publicos, health checks e tracing basico, backups automatizados.
- Could-have: blocos customizados, webhooks de publicacao, short links/UTM, modo dark/tema extra, CDN para assets/gifs.
- Won't-have (agora): marketplace de templates externos, colaboracao multi-usuario no mesmo profile, billing integrado (post-MVP).

## 13. Stack de Observabilidade e Ferramentas
- Logs: logger estruturado (pino/winston) com correlacao de requestId; export para armazenamento central (ex.: ELK/Datadog). [Sugestao Tecnica]
- Erros: Sentry ou equivalente para frontend e backend com source maps; alertas em erros novos ou picos.
- Analytics: PostHog/Amplitude para eventos de wizard, publish/unpublish, troca de template, preview link; uso de tokens e acessos publicos. [Sugestao Tecnica]
- Metrics: Prometheus + Grafana ou SaaS equivalente para latencia, throughput, erros, consumo de rate limit, cache hit ratio.

## 14. Riscos e Mitigacao
- Vazamento de rascunhos via token exposto/nao expirado: expiracao 24h, revoke manual, rate limit, logs de acesso.
- Integridade de dados (duplicidade, ordenacao perdida): validacao unica, re-ranking transacional, testes de concorrencia.
- Escopo crescente (blocos custom, uploads): fases MVP -> backlog; versionar API.
- Dependencia de auth/JWT: priorizar middleware, testes de permissao (userId === profile.userId).
- Performance em consultas completas: selecao de campos, cache por username, limites em joins; paginacao.

## 15. Contexto, Limitacoes e Diferenciais
- Contexto: acelerar publicacao de portfolios para devs e campanhas, aproveitando base NestJS/React existente.
- Limitacoes: stack alvo Node 18+, NestJS + Prisma + PostgreSQL; frontend Vite + React + Tailwind + shadcn/ui; backend em http://localhost:3000; [Sugestao Tecnica] deadline MVP 4-6 semanas com equipe reduzida, sem budget para SaaS pagos (usar free tiers onde possivel).
- Diferenciais: preview seguro temporario, wizard com dados default e pre-fill opcional GitHub, tres templates tematicos, API reutilizavel para apps web/mobile, DX opinativa com docs e seeds.
