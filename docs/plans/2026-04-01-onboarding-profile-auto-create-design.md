# Auto criação de perfil após login no onboarding

Data: 2026-04-01  
Autor: Codex (GPT-5)  
Contexto: onboarding de influenciadores em `/onboarding/:id`, com usuários que podem preencher sem estar logados. Problema atual: após login, o perfil não é criado e dashboard fica vazio.

## Objetivo
Garantir que, mesmo sem login inicial, ao concluir o OAuth do Google o perfil real seja criado automaticamente e o usuário seja levado ao preview/dashboard. Cobrir também o retorno ao onboarding já autenticado.

## Fluxo desenhado
- Draft salvo no localStorage:  
  - `bio4dev_profile_id` (ex.: `draft-...`)  
  - `bio4dev_draft_profile_<draftId>` com `username`, `slug`, `templateType`.
- Criação automática em dois gatilhos redundantes:
  1) **AuthCallbackPage**: após `handleOAuthCallback`, se existir draft + `user.id`, chamar `POST /profile` com `{ userId, username, slug, templateType, published: false }`, salvar ID real em `bio4dev_profile_id` e `bio4dev_theme_<id>`, remover/invalidar draft para não repetir; redirecionar direto para `/dashboard/influencer/:template/:id/preview` (fallback `/dashboard` se não houver draft).
  2) **InfluencerOnboardingPage**: `useEffect` pós-login verifica se `profileId` começa com `draft-` e ainda não há ID real; executa criação com o mesmo payload e segue fluxo existente (salva socials/buttons e navega para preview).
- Evitar duplicação: se `bio4dev_profile_id` já for um UUID real, não tentar recriar.

## Regras de erro
- Se `POST /profile` retornar 400 “Usuário não encontrado”: limpar sessão, forçar novo login, mostrar toast.
- Logar payload em ambiente de dev para debug; toasts amigáveis para usuário.

## Navegação
- Callback com draft criado: `/dashboard/influencer/:template/:id/preview`.
- Se não havia draft: `/dashboard`.

## Testes manuais
1) Preencher onboarding sem login → login Google → callback cria perfil → cai em preview/dashboard; dashboard mostra perfil.
2) Já logado → finalizar onboarding cria perfil direto → preview/dashboard ok.
3) Sessão expirada → criação retorna 400 → força novo login.
4) Reentrar onboarding com draft já convertido → não recria, apenas continua.

## Assunções
- Backend `/profile` exige `userId` válido e permite múltiplos perfis por usuário.
- Templates de influenciador mapeados já cobrem `templateType`.
