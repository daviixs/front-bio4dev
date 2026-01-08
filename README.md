# 🚀 Bio4Dev - Frontend

Plataforma de criação de páginas de bio para desenvolvedores.

## 📋 Pré-requisitos

- Node.js 18+
- Backend rodando em `http://localhost:3000`

## 🛠️ Stack Tecnológica

- **Vite + React 18** - Build tool e framework
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **React Router v6** - Navegação
- **Zustand** - Gerenciamento de estado
- **React Hook Form + Zod** - Formulários e validação
- **Axios** - Requisições HTTP
- **Sonner** - Notificações toast

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
│   └── ui/         # Componentes shadcn/ui
├── lib/            # Utilitários e serviços
│   └── api.ts      # Cliente Axios e endpoints
├── pages/          # Páginas da aplicação
│   ├── dashboard/  # Páginas do dashboard
│   ├── LandingPage.tsx
│   ├── Login.tsx
│   ├── SignupPage.tsx
│   └── ...
├── stores/         # Estados Zustand
│   ├── authStore.ts
│   └── profileStore.ts
├── templates/      # Templates de portfólio
│   ├── Template01.tsx  # Minimal
│   ├── Template02.tsx  # Neon
│   └── Template03.tsx  # Creative
├── types/          # Tipos TypeScript
└── App.tsx         # Rotas e layout principal
```

## 🎨 Templates Disponíveis

1. **Template 01 - Minimal**: Design limpo e profissional
2. **Template 02 - Neon**: Moderno com gradientes e efeitos neon
3. **Template 03 - Creative**: Artístico com animações

## 📱 Páginas

| Rota                    | Descrição                 |
| ----------------------- | ------------------------- |
| `/`                     | Landing Page              |
| `/login`                | Login de usuário          |
| `/signup`               | Cadastro de usuário       |
| `/profile/create`       | Criação de perfil         |
| `/setup`                | Wizard de configuração    |
| `/dashboard`            | Painel administrativo     |
| `/dashboard/profile`    | Editar informações        |
| `/dashboard/projects`   | Gerenciar projetos        |
| `/dashboard/socials`    | Gerenciar redes sociais   |
| `/dashboard/pages`      | Gerenciar páginas         |
| `/dashboard/appearance` | Escolher template         |
| `/dashboard/settings`   | Configurações             |
| `/:username`            | Página pública do usuário |

## 🔌 API Endpoints

O frontend se comunica com o backend em `http://localhost:3000`.

### Endpoints Necessários no Backend:

**Users:**

- `POST /users` - Criar usuário
- `POST /auth/login` - Login
- `GET /users/:id` - Buscar usuário

**Profile:**

- `POST /profile` - Criar perfil
- `POST /profile/:id` - Atualizar perfil
- `GET /profile/:id/complete` - Perfil completo
- `GET /profile/username/:username` - Perfil público

**Legenda:**

- `POST /legenda` - Criar legenda
- `PATCH /legenda/:id` - Atualizar legenda

**Config:**

- `POST /config` - Criar config
- `POST /config/:id` - Atualizar config

**Social:**

- `POST /social` - Criar rede social
- `GET /social/profile/:profileId` - Listar redes
- `PATCH /social/:id` - Atualizar
- `DELETE /social/:id` - Deletar

**Projetos:**

- `POST /projetos` - Criar projeto
- `GET /projetos/profile/:profileId` - Listar
- `PATCH /projetos/:id` - Atualizar
- `DELETE /projetos/:id` - Deletar

**Pages:**

- `POST /pages` - Criar página
- `GET /pages/profile/:profileId` - Listar
- `PATCH /pages/:id` - Atualizar
- `DELETE /pages/:id` - Deletar

## 🎯 Funcionalidades

- ✅ Autenticação (Login/Signup)
- ✅ Criação de perfil com username único
- ✅ Wizard de configuração inicial
- ✅ Dashboard com navegação lateral
- ✅ CRUD de informações pessoais
- ✅ CRUD de projetos
- ✅ CRUD de redes sociais
- ✅ CRUD de páginas
- ✅ 3 templates visuais
- ✅ Página pública por username
- ✅ Copiar link do perfil
- ✅ Publicar/despublicar perfil
- ✅ Design responsivo
- ✅ Notificações toast
- ✅ Loading states

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz (opcional):

```env
VITE_API_URL=http://localhost:3000
```

## 📄 Licença

MIT
