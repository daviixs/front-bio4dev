# ✅ Rotas do Profile - Status de Implementação

## Resumo das Rotas Necessárias

| Método | Rota                          | Descrição                        | Status              | Usado em            |
| ------ | ----------------------------- | -------------------------------- | ------------------- | ------------------- |
| GET    | `/profile`                    | Lista todos os perfis            | ✅ **IMPLEMENTADO** | BioPage.tsx         |
| GET    | `/profile/:id`                | Busca um perfil por ID           | ✅ **JÁ EXISTIA**   | BioEditPage.tsx     |
| POST   | `/profile/:id`                | Atualiza um perfil               | ✅ **IMPLEMENTADO** | BioEditPage.tsx     |
| PATCH  | `/profile/:id`                | Atualiza um perfil (REST padrão) | ✅ **JÁ EXISTIA**   | -                   |
| POST   | `/profile`                    | Cria um novo perfil              | ✅ **JÁ EXISTIA**   | SetupWizardPage.tsx |
| GET    | `/profile/username/:username` | Busca perfil por username        | ✅ **JÁ EXISTIA**   | Página pública      |

---

## 🆕 Mudanças Implementadas

### 1. **GET /profile** (Nova rota)

- **Arquivo:** `src/profile/profile.controller.ts`
- **Método:** `findAll()`
- **Retorna:** Lista de todos os perfis com dados essenciais
- **Campos retornados:**
  - id, userId, username, bio, avatarUrl
  - theme, mainColor, templateType, published, createdAt
- **Ordenação:** Por data de criação (mais recente primeiro)

### 2. **POST /profile/:id** (Nova rota - alias)

- **Arquivo:** `src/profile/profile.controller.ts`
- **Método:** `updateProfilePost()`
- **Função:** Atualiza perfil (mesmo comportamento que PATCH)
- **Motivo:** Compatibilidade com frontend que espera POST

## 🧪 Como Testar

### Teste 1: Listar todos os perfis

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/profile" -Method GET
```

### Teste 2: Buscar perfil por ID

```powershell
$profileId = "SEU_ID_AQUI"
Invoke-RestMethod -Uri "http://localhost:5000/profile/$profileId" -Method GET
```

### Teste 3: Atualizar perfil via POST

```powershell
$profileId = "SEU_ID_AQUI"
$body = @{
    username = "johndoe"
    bio = "Desenvolvedor Full Stack"
    published = $true
    templateType = "template_01"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/profile/$profileId" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

---

## 🎯 Campos da Response

### GET /profile (Lista todos)

```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "username": "johndoe",
    "bio": "Desenvolvedor Full Stack",
    "avatarUrl": "https://example.com/avatar.jpg",
    "theme": "LIGHT",
    "mainColor": "#FF5733",
    "templateType": "template_01",
    "published": true,
    "createdAt": "2026-01-08T10:30:00.000Z"
  }
]
```

### GET /profile/:id (Busca por ID)

```json
{
  "id": "uuid",
  "userId": "uuid",
  "username": "johndoe",
  "bio": "Desenvolvedor Full Stack",
  "avatarUrl": "https://example.com/avatar.jpg",
  "theme": "LIGHT",
  "mainColor": "#FF5733",
  "templateType": "template_01",
  "published": true,
  "createdAt": "2026-01-08T10:30:00.000Z"
}
```

### POST /profile/:id (Atualizar)

```json
{
  "id": "uuid",
  "userId": "uuid",
  "username": "johndoe_updated",
  "bio": "Desenvolvedor Full Stack | Tech Lead",
  "avatarUrl": "https://example.com/new-avatar.jpg",
  "theme": "DARK",
  "mainColor": "#4A90E2",
  "templateType": "template_02",
  "published": true,
  "createdAt": "2026-01-08T10:30:00.000Z"
}
```

---

## 📋 Body Parameters para POST /profile/:id

Todos os campos são **opcionais**:

| Campo          | Tipo    | Exemplo                                     | Descrição                      |
| -------------- | ------- | ------------------------------------------- | ------------------------------ |
| `username`     | string  | "johndoe"                                   | Nome de usuário (max 40 chars) |
| `bio`          | string  | "Dev Full Stack"                            | Biografia                      |
| `avatarUrl`    | string  | "https://..."                               | URL do avatar                  |
| `theme`        | enum    | "LIGHT" ou "DARK"                           | Tema do portfolio              |
| `mainColor`    | string  | "#FF5733"                                   | Cor principal (hex)            |
| `templateType` | enum    | "template_01", "template_02", "template_03" | Template                       |
| `published`    | boolean | true                                        | Se está publicado              |

---

## ⚠️ Observações Importantes

1. **PATCH vs POST:** Ambos os métodos fazem a mesma coisa (atualizar perfil)

   - **PATCH /profile/:id** = Padrão REST
   - **POST /profile/:id** = Compatibilidade com frontend existente

2. **Validações:** Todos os campos são validados pelo DTO:

   - `username`: máximo 40 caracteres
   - `mainColor`: formato hexadecimal (#RRGGBB)
   - `avatarUrl`: URL válida
   - `theme`: apenas LIGHT ou DARK
   - `templateType`: apenas template_01, template_02 ou template_03

3. **IDs:** O sistema usa UUID v4 para todos os IDs

---

## 🚀 Próximos Passos para o Frontend

1. ✅ **Rotas prontas para consumo**

   - GET /profile - BioPage.tsx ✅
   - GET /profile/:id - BioEditPage.tsx ✅
   - POST /profile/:id - BioEditPage.tsx ✅

2. ✅ **Integração completa**

   - Todas as funcionalidades de edição de bio estão operacionais
   - O frontend pode consumir imediatamente

3. ✅ **Documentação Swagger**
   - Acesse: http://localhost:5000/api
   - Todas as rotas estão documentadas automaticamente

---

## ✅ Checklist Final

- [x] GET /profile implementado
- [x] POST /profile/:id implementado
- [x] GET /profile/:id já existia
- [x] Backend testado e funcionando
- [x] Documentação atualizada
- [x] Frontend pronto para integração
- [x] GET /profile/username/:username documentado

---

## 📁 Estrutura de Arquivos

```
api-bio4dev/
├── src/
│   ├── profile/
│   │   ├── profile.controller.ts  ← ✅ Atualizado
│   │   └── profile.service.ts     ← ✅ Atualizado
│   └── dto/
│       └── profiles.dto.ts        ← ✅ Já existia (sem mudanças)
└── test/
    ├── profile.http              ← 🆕 Novo arquivo de testes
    └── test-profile-routes.ps1   ← 🆕 Script PowerShell de testes
```

---

## 🌐 Como Consumir: GET /profile/username/:username

### Descrição
Esta rota busca um perfil público completo através do username único do usuário. Retorna todas as informações do portfólio incluindo redes sociais, projetos, tecnologias, experiências profissionais e configurações.

### ⚠️ Importante
- **Apenas perfis publicados** são retornados (`published: true`)
- Se o perfil não existir ou não estiver publicado, retorna erro 404
- Retorna todos os relacionamentos (social, projetos, techStack, workHistory, etc.)

---

### 📡 Endpoint

```
GET /profile/username/:username
```

**Parâmetros:**
- `username` (path) - Username único do usuário (string)

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

---

### 🧪 Exemplos de Uso

#### 1️⃣ PowerShell
```powershell
# Buscar perfil do usuário "johndoe"
$response = Invoke-RestMethod -Uri "http://localhost:5000/profile/username/johndoe" -Method GET

# Exibir resultado formatado
$response | ConvertTo-Json -Depth 10

# Acessar dados específicos
Write-Host "Nome: $($response.username)"
Write-Host "Bio: $($response.bio)"
Write-Host "Publicado: $($response.published)"
Write-Host "Template: $($response.templateType)"
```

#### 2️⃣ cURL (Bash/PowerShell)
```bash
# Linux/Mac/Git Bash
curl http://localhost:5000/profile/username/johndoe

# Windows PowerShell
curl.exe http://localhost:5000/profile/username/johndoe
```

#### 3️⃣ JavaScript/TypeScript (Frontend)
```typescript
// Usando Fetch API
async function getProfileByUsername(username: string) {
  try {
    const response = await fetch(`http://localhost:5000/profile/username/${username}`);
    
    if (!response.ok) {
      throw new Error(`Perfil não encontrado: ${response.status}`);
    }
    
    const profile = await response.json();
    return profile;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
}

// Usar a função
const profile = await getProfileByUsername('johndoe');
console.log(profile.username);
console.log(profile.bio);
console.log(profile.projetos); // Lista de projetos
```

#### 4️⃣ Axios (Frontend)
```typescript
import axios from 'axios';

// Buscar perfil
const response = await axios.get(`http://localhost:5000/profile/username/${username}`);
const profile = response.data;

// Acessar dados
console.log(profile.username);      // "johndoe"
console.log(profile.social);        // Array de redes sociais
console.log(profile.projetos);      // Array de projetos
console.log(profile.techStack);     // Stack de tecnologias
console.log(profile.workHistory);   // Histórico profissional
```

#### 5️⃣ React Component Example
```tsx
import { useEffect, useState } from 'react';

function ProfilePage({ username }: { username: string }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(
          `http://localhost:5000/profile/username/${username}`
        );
        
        if (!response.ok) {
          throw new Error('Perfil não encontrado ou não publicado');
        }
        
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [username]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!profile) return <div>Perfil não encontrado</div>;

  return (
    <div>
      <h1>{profile.username}</h1>
      <p>{profile.bio}</p>
      <img src={profile.avatarUrl} alt={profile.username} />
      
      {/* Redes Sociais */}
      <div>
        {profile.social?.map((social) => (
          <a key={social.id} href={social.url}>
            {social.plataforma}
          </a>
        ))}
      </div>
      
      {/* Projetos */}
      <div>
        {profile.projetos?.map((projeto) => (
          <div key={projeto.id}>
            <h3>{projeto.titulo}</h3>
            <p>{projeto.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### 📦 Response Completa

```json
{
  "id": "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
  "userId": "user-uuid-here",
  "username": "johndoe",
  "bio": "Desenvolvedor Full Stack apaixonado por tecnologia",
  "avatarUrl": "https://example.com/avatar.jpg",
  "theme": "DARK",
  "mainColor": "#4A90E2",
  "templateType": "template_01",
  "published": true,
  "createdAt": "2026-01-08T10:30:00.000Z",
  
  "legendas": [
    {
      "id": "uuid",
      "titulo": "Sobre Mim",
      "conteudo": "Texto sobre mim...",
      "ordem": 1
    }
  ],
  
  "social": [
    {
      "id": "uuid",
      "plataforma": "GitHub",
      "url": "https://github.com/johndoe",
      "icone": "github",
      "ordem": 1
    },
    {
      "id": "uuid",
      "plataforma": "LinkedIn",
      "url": "https://linkedin.com/in/johndoe",
      "icone": "linkedin",
      "ordem": 2
    }
  ],
  
  "projetos": [
    {
      "id": "uuid",
      "titulo": "Meu Portfólio",
      "descricao": "Site pessoal desenvolvido com React",
      "imagem": "https://example.com/projeto.jpg",
      "url": "https://meusite.com",
      "github": "https://github.com/johndoe/portfolio",
      "ordem": 1,
      "social": [
        {
          "id": "uuid",
          "plataforma": "Demo",
          "url": "https://demo.meusite.com"
        }
      ]
    }
  ],
  
  "techStack": {
    "id": "uuid",
    "profileId": "uuid",
    "technologies": [
      {
        "id": "uuid",
        "nome": "React",
        "icone": "react",
        "categoria": "Frontend",
        "ordem": 1
      },
      {
        "id": "uuid",
        "nome": "Node.js",
        "icone": "nodejs",
        "categoria": "Backend",
        "ordem": 2
      }
    ]
  },
  
  "workHistory": [
    {
      "id": "uuid",
      "empresa": "Tech Company",
      "cargo": "Full Stack Developer",
      "descricao": "Desenvolvimento de aplicações web",
      "dataInicio": "2024-01-01T00:00:00.000Z",
      "dataFim": null,
      "atual": true,
      "ordem": 1,
      "technologies": [
        {
          "id": "uuid",
          "nome": "React",
          "icone": "react"
        }
      ],
      "responsibilities": [
        {
          "id": "uuid",
          "descricao": "Desenvolver novas features",
          "ordem": 1
        }
      ]
    }
  ],
  
  "config": {
    "id": "uuid",
    "profileId": "uuid",
    "mostrarSobre": true,
    "mostrarProjetos": true,
    "mostrarTechStack": true,
    "mostrarExperiencias": true
  },
  
  "footer": {
    "id": "uuid",
    "profileId": "uuid",
    "texto": "© 2026 John Doe. Todos os direitos reservados.",
    "linkTexto": "Desenvolvido por Bio4Dev",
    "linkUrl": "https://bio4dev.com"
  }
}
```

---

### ❌ Possíveis Erros

#### 1. Perfil não encontrado
```json
{
  "statusCode": 500,
  "message": "Profile com username \"johndoe\" não encontrado"
}
```

#### 2. Perfil não publicado
```json
{
  "statusCode": 500,
  "message": "Profile \"johndoe\" não está publicado"
}
```

#### 3. Username inválido
```json
{
  "statusCode": 400,
  "message": "Username inválido"
}
```

---

### 🎯 Casos de Uso

#### 1. Página Pública do Portfólio
```typescript
// Rota: /bio/:username
// Exibir portfólio público do usuário

const { username } = useParams();
const profile = await getProfileByUsername(username);

// Renderizar template baseado no templateType
if (profile.templateType === 'template_01') {
  return <Template01 profile={profile} />;
} else if (profile.templateType === 'template_02') {
  return <Template02 profile={profile} />;
}
```

#### 2. Preview do Portfólio
```typescript
// Mostrar preview antes de publicar
const profile = await getProfileByUsername(currentUser.username);

if (!profile) {
  return <div>Publique seu perfil para visualizar</div>;
}

return <PortfolioPreview profile={profile} />;
```

#### 3. Compartilhamento Social
```typescript
// Gerar meta tags para SEO
const profile = await getProfileByUsername(username);

const metaTags = {
  title: `${profile.username} - Portfolio`,
  description: profile.bio,
  image: profile.avatarUrl,
  url: `https://bio4dev.com/${profile.username}`
};
```

---

### 🔗 Links Relacionados

- **Swagger Docs:** http://localhost:5000/api
- **Outras rotas de Profile:** Ver seção [Resumo das Rotas](#resumo-das-rotas-necessárias)
- **Schema Prisma:** `prisma/schema.prisma`

---

### 💡 Dicas

1. **Cache:** Considere usar cache (React Query, SWR) para melhorar performance
2. **Loading States:** Sempre mostre estado de carregamento
3. **Error Handling:** Trate erros 404 (perfil não encontrado) e 500 (não publicado)
4. **SEO:** Use os dados retornados para gerar meta tags dinâmicas
5. **Validação:** Valide o username antes de fazer a requisição

---

## 🎉 Conclusão

Todas as rotas necessárias para a funcionalidade de edição de Bio estão implementadas e prontas para uso!

**Data da implementação:** 2026-01-08  
**Status:** ✅ COMPLETO
