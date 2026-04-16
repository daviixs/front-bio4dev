# Portfolio 1 Toast Feedback Design

## Context

O editor inline do `portfolio 1` disparava muitos toasts por ação:

- o próprio `EditablePortfolio1` mostrava sucesso em quase toda edição
- o `EditableResumeButton` adicionava outro sucesso no fluxo de currículo
- o `BioEditPage` mostrava mais um `Alterações salvas com sucesso!` ao recarregar o perfil

Isso fazia o feedback parecer duplicado e empilhado.

## Approved Behavior

- Edições inline do `portfolio 1` não exibem mais toast de sucesso.
- Erros continuam sendo exibidos em toast.
- Ações explícitas e maiores continuam podendo exibir sucesso:
  - salvar manualmente no topo
  - adicionar/remover tech
  - salvar/remover experiência
  - salvar/remover projeto
  - salvar/remover footer
- O botão `Salvar Alterações` do topo em `/dashboard/bio/:id` continua exibindo sucesso quando clicado manualmente.
- O recarregamento automático do perfil após mudanças internas deixa de exibir o toast genérico de sucesso.

## Implementation Notes

- Centralizar os toasts do editor do `portfolio 1` em um único `toast id` para impedir empilhamento visual.
- Remover `toast.success(...)` dos fluxos inline:
  - legenda/campos editáveis
  - avatar
  - currículo
- Fazer o `BioEditPage` diferenciar:
  - refresh automático sem toast
  - save manual com toast

## Validation

- Editar texto inline no `portfolio 1`: nenhum toast de sucesso deve aparecer.
- Forçar erro em edição inline: apenas um toast de erro deve aparecer.
- Atualizar currículo: não deve empilhar toast local + toast do editor.
- Clicar em `Salvar Alterações`: deve continuar aparecendo um único toast de sucesso.
