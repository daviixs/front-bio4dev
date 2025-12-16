# 🎯 PROMPT PARA INTEGRAÇÃO FRONTEND + BACKEND - Bio4Dev

## 📋 CONTEXTO DO PROJETO

**Nome:** Bio4Dev - Plataforma de criação de páginas de bio para desenvolvedores  
**Backend:** NestJS + Prisma + PostgreSQL (Supabase)  
**Tecnologia de IDs:** UUID v4  
**API Base URL:** `http://localhost:3000`  
**Documentação:** Swagger disponível em `http://localhost:3000/api`

---

## 🎨 OBJETIVO PRINCIPAL

Criar uma aplicação frontend completa que permita desenvolvedores criarem e gerenciarem seus próprios portfólios/páginas de bio com templates personalizados. A aplicação deve:

1. **Permitir cadastro e login de usuários**
2. **Criar e editar perfil de desenvolvedor**
3. **Escolher template visual (template_01, template_02, template_03)**
4. **Gerenciar informações do portfólio** (legenda, projetos, stacks, redes sociais)
5. **Criar múltiplas páginas** com slugs personalizados
6. **Visualizar página pública** acessível por slug
7. **Interface de administração** para edição completa

---

## 🗄️ ARQUITETURA DO BANCO DE DADOS

### Modelos Principais:

#### 1️⃣ **User** (Usuário)

```typescript
{
  id: string,          // UUID v4
  email: string,       // Único
  senha: string,       // Hash
  nome: string,
  createdAt: Date,
  updatedAt: Date
}
```

#### 2️⃣ **Profile** (Perfil Público)

```typescript
{
  id: string,              // UUID v4
  userId: string,          // UUID v4 (FK -> User)
  username: string,        // Único, slug do perfil
  bio?: string,
  avatarUrl?: string,
  themeId?: number,
  templateType: 'template_01' | 'template_02' | 'template_03',
  published: boolean,      // Se está publicado
  createdAt: Date
}
```

#### 3️⃣ **Legenda** (Cabeçalho do Portfólio)

```typescript
{
  id: string,              // UUID v4
  profileId: string,       // UUID v4 (FK -> Profile)
  legendaFoto: string,     // URL da foto principal
  nome: string,
  titulo: string,          // Ex: "Desenvolvedor Full Stack"
  subtitulo: string,       // Ex: "Especialista em Node.js"
  descricao: string,       // Bio expandida
  createdAt: Date
}
```

#### 4️⃣ **Config** (Configurações Numéricas)

```typescript
{
  id: string,              // UUID v4
  profileId: string,       // UUID v4 (FK -> Profile) - ÚNICO
  stacks: number,          // Quantidade de tecnologias
  projetos: number,        // Quantidade de projetos
  createdAt: Date
}
```

#### 5️⃣ **Page** (Páginas do Portfólio)

```typescript
{
  id: string,              // UUID v4
  profileId: string,       // UUID v4 (FK -> Profile)
  titulo: string,          // Ex: "Meus Projetos"
  slug: string,            // Ex: "meus-projetos" (único)
  ordem?: number,          // Ordem no menu
  createdAt: Date
}
```

#### 6️⃣ **Social** (Redes Sociais)

```typescript
{
  id: string,              // UUID v4
  profileId: string,       // UUID v4 (FK -> Profile)
  plataforma: 'instagram' | 'tiktok' | 'youtube' | 'github',
  url: string,
  ordem: number
}
```

#### 7️⃣ **Projeto** (Projetos em Destaque)

```typescript
{
  id: string,              // UUID v4
  profileId: string,       // UUID v4 (FK -> Profile)
  nome: string,
  descricao: string,
  gif: string,             // URL do preview animado
  createdAt: Date
}
```

---

## 🔌 ROTAS DA API DISPONÍVEIS

### ✅ **Implementadas**

#### **Users**

- `POST /users` - Criar usuário
  - Body: `{ email, senha, nome }`
  - Retorna: `{ message, user: { id, email, nome, createdAt } }`

#### **Profile**

- `POST /profile` - Criar perfil
  - Body: `{ userId, username, bio?, avatarUrl?, themeId?, templateType, published? }`
  - Retorna: `{ message, profile: { id, userId, username, templateType } }`
- `POST /profile/:id` - Atualizar perfil
  - Body: `{ username, bio?, avatarUrl?, themeId?, templateType, published? }`

#### **Pages**

- `POST /pages` - Criar página
  - Body: `{ profileId, titulo, slug, ordem? }`
  - Retorna: `{ message, page: { id, profileId, titulo, slug } }`
- `PATCH /pages/:id` - Atualizar página (id deve ser UUID v4)
  - Body: `{ profileId, titulo, slug, ordem? }`

#### **Legenda**

- `POST /legenda` - Criar legenda
  - Body: `{ profileId, legendaFoto, nome, titulo, subtitulo, descricao }`
  - Retorna: `{ message: 'Legenda criada com sucesso!' }`
- `PATCH /legenda/:id` - Atualizar legenda
  - Body: `{ profileId, legendaFoto, nome, titulo, subtitulo, descricao }`

#### **Config**

- `POST /config` - Criar configuração
  - Body: `{ profileId, stacks, projetos }`
  - Retorna: `{ message, config: { id, profileId, stacks, projetos } }`
- `POST /config/:id` - Atualizar configuração
  - Body: `{ profileId, stacks, projetos }`

---

### ⚠️ **Rotas que PRECISAM ser implementadas** (Backend + Frontend)

#### **Users**

- `GET /users/:id` - Buscar usuário por ID
- `GET /users` - Listar todos usuários (admin)

#### **Profile**

- `GET /profile/:id` - Buscar perfil completo por ID
- `GET /profile/username/:username` - Buscar perfil por username (rota pública)
- `GET /profile/:id/complete` - Buscar perfil com TODOS relacionamentos (legenda, config, pages, social, projetos)

#### **Pages**

- `GET /pages/:id` - Buscar página por ID
- `GET /pages/slug/:slug` - Buscar página por slug (rota pública)
- `GET /pages/profile/:profileId` - Listar todas páginas de um perfil
- `DELETE /pages/:id` - Deletar página

#### **Legenda**

- `GET /legenda/:id` - Buscar legenda por ID
- `GET /legenda/profile/:profileId` - Buscar legenda de um perfil
- `DELETE /legenda/:id` - Deletar legenda

#### **Config**

- `GET /config/:id` - Buscar config por ID
- `GET /config/profile/:profileId` - Buscar config de um perfil
- `DELETE /config/:id` - Deletar config

#### **Social** (CONTROLLER NÃO EXISTE - CRIAR)

- `POST /social` - Criar rede social
  - Body: `{ profileId, plataforma, url, ordem }`
- `GET /social/:id` - Buscar rede social por ID
- `GET /social/profile/:profileId` - Listar redes de um perfil
- `PATCH /social/:id` - Atualizar rede social
- `DELETE /social/:id` - Deletar rede social

#### **Projetos** (CONTROLLER NÃO EXISTE - CRIAR)

- `POST /projetos` - Criar projeto
  - Body: `{ profileId, nome, descricao, gif }`
- `GET /projetos/:id` - Buscar projeto por ID
- `GET /projetos/profile/:profileId` - Listar projetos de um perfil
- `PATCH /projetos/:id` - Atualizar projeto
- `DELETE /projetos/:id` - Deletar projeto

---

## 🎯 FLUXO COMPLETO DO USUÁRIO

### 1️⃣ **Cadastro e Autenticação**

```
1. Usuário acessa /signup
2. Preenche: email, senha, nome
3. POST /users → recebe user.id (UUID)
4. Redireciona para criação de perfil
```

### 2️⃣ **Criação de Perfil Inicial**

```
1. Usuário define:
   - username (será a URL: bio4dev.com/username)
   - bio curta
   - avatar (upload ou URL)
   - escolhe templateType (template_01, template_02, template_03)
2. POST /profile com userId (do passo 1)
3. Recebe profile.id (UUID)
4. Redireciona para dashboard
```

### 3️⃣ **Dashboard - Configuração Inicial (Wizard)**

**INFORMAÇÕES GENÉRICAS INICIAIS:**

```javascript
// Dados padrão que devem ser pré-preenchidos:
const defaultData = {
  legenda: {
    legendaFoto: 'https://via.placeholder.com/400',
    nome: 'Seu Nome Aqui',
    titulo: 'Desenvolvedor(a) Full Stack',
    subtitulo: 'Apaixonado por tecnologia e inovação',
    descricao: 'Crie sua bio personalizada e mostre seus projetos ao mundo!',
  },

  config: {
    stacks: 8, // Valor padrão
    projetos: 5, // Valor padrão
  },

  socialAccounts: [
    { plataforma: 'github', url: 'https://github.com/seuusername', ordem: 1 },
    {
      plataforma: 'instagram',
      url: 'https://instagram.com/seuusername',
      ordem: 2,
    },
  ],

  projetos: [
    {
      nome: 'Projeto Exemplo 1',
      descricao: 'Descrição do projeto de exemplo',
      gif: 'https://via.placeholder.com/600x400.gif',
    },
    {
      nome: 'Projeto Exemplo 2',
      descricao: 'Outro projeto incrível',
      gif: 'https://via.placeholder.com/600x400.gif',
    },
  ],

  pages: [
    { titulo: 'Sobre Mim', slug: 'sobre', ordem: 1 },
    { titulo: 'Projetos', slug: 'projetos', ordem: 2 },
  ],
};
```

**Sequência de criação:**

```
1. POST /legenda com profileId + dados genéricos
2. POST /config com profileId + stacks: 8, projetos: 5
3. POST /social (múltiplas vezes) para redes sociais padrão
4. POST /projetos (múltiplas vezes) para projetos exemplo
5. POST /pages (múltiplas vezes) para páginas padrão
6. Marcar profile.published = true
7. Mostrar mensagem: "Seu portfólio está pronto! Edite as informações."
```

### 4️⃣ **Dashboard - Área de Edição**

**Seções editáveis:**

#### 📝 **Informações Pessoais**

- Nome, título, subtítulo, descrição
- Avatar/Foto
- Bio curta
- Edita: PATCH /legenda/:id

#### 🎨 **Aparência**

- Trocar template (template_01/02/03)
- Tema de cores (themeId)
- Edita: POST /profile/:id

#### 📊 **Estatísticas**

- Quantidade de stacks dominadas
- Quantidade de projetos
- Edita: POST /config/:id

#### 🔗 **Redes Sociais**

- Adicionar/remover Instagram, TikTok, YouTube, GitHub
- Definir ordem de exibição
- Edita: POST /social, DELETE /social/:id

#### 💼 **Projetos**

- Adicionar projeto (nome, descrição, GIF preview)
- Editar/deletar projetos
- Edita: POST /projetos, PATCH /projetos/:id, DELETE /projetos/:id

#### 📄 **Páginas**

- Criar nova página (título + slug)
- Editar páginas existentes
- Definir ordem no menu
- Edita: POST /pages, PATCH /pages/:id, DELETE /pages/:id

### 5️⃣ **Página Pública**

```
1. Usuário acessa: bio4dev.com/{username}
2. Frontend chama: GET /profile/username/{username} → retorna profile completo
3. Frontend renderiza template escolhido (template_01/02/03)
4. Mostra: legenda, redes sociais, projetos, config, páginas
```

---

## 🎨 REQUISITOS DE INTERFACE

### **Telas Necessárias:**

1. **Landing Page** (`/`)
   - Explicação do serviço
   - CTA: "Criar meu portfólio"

2. **Signup** (`/signup`)
   - Email, senha, nome
   - Chama: `POST /users`

3. **Login** (`/login`)
   - Email, senha
   - (Implementar autenticação JWT no backend)

4. **Criação de Perfil** (`/profile/create`)
   - Username, bio, avatar, template
   - Chama: `POST /profile`

5. **Wizard de Configuração** (`/setup`)
   - Passo 1: Informações pessoais (legenda)
   - Passo 2: Redes sociais
   - Passo 3: Projetos
   - Passo 4: Páginas extras
   - Finalização: "Seu portfólio está pronto!"

6. **Dashboard** (`/dashboard`)
   - Menu lateral:
     - Visão geral
     - Editar informações
     - Projetos
     - Redes sociais
     - Páginas
     - Configurações
   - Preview ao vivo do template

7. **Editor de Projetos** (`/dashboard/projetos`)
   - Lista de projetos
   - Formulário: nome, descrição, GIF
   - CRUD completo

8. **Editor de Páginas** (`/dashboard/pages`)
   - Lista de páginas
   - Formulário: título, slug, ordem
   - CRUD completo

9. **Página Pública** (`/:username`)
   - Renderiza template escolhido
   - Informações do perfil
   - Projetos em destaque
   - Links de redes sociais

---

## 🎯 FUNCIONALIDADES ESSENCIAIS

### **Frontend deve ter:**

- ✅ Formulários validados com feedback visual
- ✅ Loading states durante requisições
- ✅ Toast/notifications para sucesso/erro
- ✅ Preview em tempo real no dashboard
- ✅ Upload de imagens (avatar, fotos de projetos)
- ✅ Drag-and-drop para reordenar projetos/redes
- ✅ Copiar link do perfil público
- ✅ Modo claro/escuro
- ✅ Responsivo (mobile-first)

### **Backend deve ter (implementar):**

- ✅ Autenticação JWT
- ✅ Middleware de autorização (usuário só edita próprio perfil)
- ✅ Validação de permissões (userId === profile.userId)
- ✅ GET endpoints para todas entidades
- ✅ Controllers para Social e Projetos
- ✅ Rota pública para buscar perfil por username
- ✅ Soft delete (published = false ao invés de deletar)

---

## 📦 SUGESTÃO DE STACK FRONTEND

```
- Vite + React 19
- TypeScript
- Tailwind CSS
- React Router v7
- Shadcn/ui
- React Hook Form + Zod
- Axios
- Zustand
```

---

## 🔥 TAREFAS PRIORITÁRIAS

### **Backend (NestJS)**

1. ✅ Criar controller + service para **Social**
2. ✅ Criar controller + service para **Projetos**
3. ✅ Implementar GET endpoints para todas entidades
4. ✅ Criar rota `GET /profile/username/:username` (pública)
5. ✅ Criar rota `GET /profile/:id/complete` (retorna tudo relacionado)
6. ✅ Implementar autenticação JWT
7. ✅ Guards de autorização (usuário edita apenas próprio perfil)

### **Frontend**

1. ✅ Setup do projeto (escolher stack)
2. ✅ Criar telas de autenticação (signup/login)
3. ✅ Integrar com API de users
4. ✅ Criar wizard de configuração inicial com dados genéricos
5. ✅ Implementar dashboard com CRUD de projetos
6. ✅ Implementar CRUD de redes sociais
7. ✅ Implementar CRUD de páginas
8. ✅ Criar 3 templates visuais (template_01, template_02, template_03)
9. ✅ Implementar rota pública /:username
10. ✅ Preview ao vivo no dashboard

---

## 🎨 EXEMPLO DE TEMPLATE_01 (Visual utilize o que ja tem no meu projeto criado)

```

```

---

## 📝 EXEMPLO DE PAYLOAD COMPLETO

### **1. Criar usuário**

```http
POST http://localhost:3000/users
Content-Type: application/json

{
  "email": "joao@bio4dev.com",
  "senha": "senha123",
  "nome": "João Silva"
}

// Resposta:
{
  "message": "Usuário criado com sucesso!",
  "user": {
    "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    "email": "joao@bio4dev.com",
    "nome": "João Silva",
    "createdAt": "2025-12-08T10:00:00.000Z"
  }
}
```

### **2. Criar perfil**

```http
POST http://localhost:3000/profile
Content-Type: application/json

{
  "userId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "username": "joaosilva",
  "bio": "Desenvolvedor Full Stack",
  "avatarUrl": "https://exemplo.com/avatar.jpg",
  "templateType": "template_01",
  "published": false
}

// Resposta:
{
  "message": "Perfil criado com sucesso!",
  "profile": {
    "id": "f1e2d3c4-b5a6-4321-9876-abcdef123456",
    "userId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    "username": "joaosilva",
    "templateType": "template_01"
  }
}
```

### **3. Criar legenda (informações pessoais)**

```http
POST http://localhost:3000/legenda
Content-Type: application/json

{
  "profileId": "f1e2d3c4-b5a6-4321-9876-abcdef123456",
  "legendaFoto": "https://exemplo.com/foto-principal.jpg",
  "nome": "João Silva",
  "titulo": "Desenvolvedor Full Stack",
  "subtitulo": "Especialista em Node.js e React",
  "descricao": "Apaixonado por tecnologia e inovação. Criando soluções web há mais de 5 anos."
}
```

### **4. Criar configuração**

```http
POST http://localhost:3000/config
Content-Type: application/json

{
  "profileId": "f1e2d3c4-b5a6-4321-9876-abcdef123456",
  "stacks": 8,
  "projetos": 12
}
```

### **5. Criar rede social** (IMPLEMENTAR CONTROLLER)

```http
POST http://localhost:3000/social
Content-Type: application/json

{
  "profileId": "f1e2d3c4-b5a6-4321-9876-abcdef123456",
  "plataforma": "github",
  "url": "https://github.com/joaosilva",
  "ordem": 1
}
```

### **6. Criar projeto** (IMPLEMENTAR CONTROLLER)

```http
POST http://localhost:3000/projetos
Content-Type: application/json

{
  "profileId": "f1e2d3c4-b5a6-4321-9876-abcdef123456",
  "nome": "Sistema de Gestão",
  "descricao": "Sistema completo para gestão empresarial com dashboard intuitivo",
  "gif": "https://exemplo.com/preview-projeto.gif"
}
```

---

## ✅ CHECKLIST FINAL

### **Backend**

- [ ] Controller + Service para Social (CRUD completo)
- [ ] Controller + Service para Projetos (CRUD completo)
- [ ] GET /profile/username/:username
- [ ] GET /profile/:id/complete (com todos relacionamentos)
- [ ] GET endpoints para todas entidades
- [ ] Autenticação JWT
- [ ] Guards de autorização

### **Frontend**

- [ ] Setup do projeto
- [ ] Telas de autenticação
- [ ] Wizard de configuração inicial com dados genéricos
- [ ] Dashboard com navegação lateral
- [ ] Editor de informações pessoais
- [ ] Editor de projetos (CRUD)
- [ ] Editor de redes sociais (CRUD)
- [ ] Editor de páginas (CRUD)
- [ ] Implementar template_01
- [ ] Implementar template_02
- [ ] Implementar template_03
- [ ] Rota pública /:username
- [ ] Preview ao vivo
- [ ] Copiar link do perfil
- [ ] Upload de imagens

---

## 🚀 COMEÇAR POR AQUI

**Passo 1:** Implementar controllers faltantes no backend (Social e Projetos)  
**Passo 2:** Criar GET endpoints necessários  
**Passo 3:** Setup do frontend e integração com autenticação  
**Passo 4:** Criar wizard de configuração inicial  
**Passo 5:** Implementar dashboard e CRUDs  
**Passo 6:** Criar templates visuais  
**Passo 7:** Implementar página pública

---

## 📚 DOCUMENTAÇÃO ADICIONAL

- **Swagger API:** `http://localhost:3000/api`
- **Prisma Schema:** `c:\Users\Davi\Desktop\api-bio4dev\prisma\schema.prisma`
- **Teste de fluxo completo:** `c:\Users\Davi\Desktop\api-bio4dev\test\fluxo-completo.http`

---

**BOA SORTE! 🚀**
