# Análise do Schema Prisma para Portfólio 1

## Resumo Executivo

O schema Prisma atual **NÃO possui suporte completo** para implementar o Portfólio 1. Embora existam alguns modelos que cobrem parcialmente algumas funcionalidades, são necessárias adições e modificações significativas.

---

## Mapeamento Detalhado

### ✅ O que JÁ está coberto:

#### 1. Hero Section (PARCIAL)
- ✅ `Profile.avatarUrl` → `hero.avatarUrl`
- ✅ `Legenda.nome` → `hero.name`
- ✅ `Legenda.titulo` → `hero.tagline`
- ✅ `Legenda.descricao` → `hero.description`
- ❌ **FALTA:** `hero.greeting` (ex: "Olá, eu sou")

#### 2. Projetos (PARCIAL)
- ✅ `Projeto.nome` → `projects[].title`
- ✅ `Projeto.descricao` → `projects[].description`
- ✅ `Projeto.gif` → `projects[].gif`
- ❌ **FALTAM:** `demoLink` e `codeLink`

#### 3. Redes Sociais (PARCIAL)
- ✅ Modelo `Social` existe com suporte para GitHub, LinkedIn, etc.
- ⚠️ **PROBLEMA:** Links do footer não estão estruturados adequadamente

---

## ❌ O que FALTA completamente:

### 1. Tech Stack Detalhado

**Estrutura necessária:**
```typescript
techStack: {
  title: string;           // Ex: "Tech Stack"
  subtitle: string;        // Ex: "Tecnologias que utilizo"
  technologies: Array<{
    name: string;          // Ex: "React"
    icon: string;          // Ex: "Code2"
    color: string;         // Ex: "text-cyan-500"
  }>;
}
```

**O que existe:**
- `Config.stacks` - apenas um número inteiro

**Solução proposta:**
```prisma
model TechStack {
  id          String    @id @default(uuid()) @db.Uuid
  profileId   String    @unique @db.Uuid
  title       String    @db.VarChar(120)
  subtitle    String?   @db.Text
  createdAt   DateTime  @default(now())
  
  profile     Profile   @relation(fields: [profileId], references: [id])
  technologies Technology[]
  
  @@index([profileId])
}

model Technology {
  id          String    @id @default(uuid()) @db.Uuid
  techStackId String    @db.Uuid
  name        String    @db.VarChar(100)
  icon        String?   @db.VarChar(50)   // Nome do ícone (ex: "Code2")
  color       String?   @db.VarChar(50)   // Classe CSS de cor
  ordem       Int       @default(0)
  createdAt   DateTime  @default(now())
  
  techStack   TechStack @relation(fields: [techStackId], references: [id])
  
  @@index([techStackId])
}
```

---

### 2. Work History (Experiência Profissional)

**Estrutura necessária:**
```typescript
workHistory: Array<{
  company: string;
  period: string;              // Ex: "2023 - Atual"
  summary: string;
  technologies: string[];      // Array de strings
  responsibilities: string[];  // Array de strings
  impact: string;
}>
```

**Solução proposta:**
```prisma
model WorkExperience {
  id            String    @id @default(uuid()) @db.Uuid
  profileId     String    @db.Uuid
  company       String    @db.VarChar(200)
  period        String    @db.VarChar(50)      // Ex: "2023 - Atual"
  summary       String    @db.Text
  impact        String    @db.Text
  ordem         Int       @default(0)
  createdAt     DateTime  @default(now())
  
  profile       Profile   @relation(fields: [profileId], references: [id])
  technologies  WorkTechnology[]
  responsibilities WorkResponsibility[]
  
  @@index([profileId])
}

model WorkTechnology {
  id              String         @id @default(uuid()) @db.Uuid
  workExperienceId String        @db.Uuid
  name            String         @db.VarChar(100)
  ordem           Int            @default(0)
  
  workExperience  WorkExperience @relation(fields: [workExperienceId], references: [id])
  
  @@index([workExperienceId])
}

model WorkResponsibility {
  id              String         @id @default(uuid()) @db.Uuid
  workExperienceId String        @db.Uuid
  description     String         @db.Text
  ordem           Int            @default(0)
  
  workExperience  WorkExperience @relation(fields: [workExperienceId], references: [id])
  
  @@index([workExperienceId])
}
```

---

### 3. Footer

**Estrutura necessária:**
```typescript
footer: {
  title: string;
  subtitle: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  copyrightName: string;
}
```

**Solução proposta:**
```prisma
model Footer {
  id            String    @id @default(uuid()) @db.Uuid
  profileId     String    @unique @db.Uuid
  title         String    @db.VarChar(200)
  subtitle      String?   @db.Text
  email         String    @db.VarChar(180)
  github        String?   @db.Text
  linkedin      String?   @db.Text
  twitter       String?   @db.Text
  copyrightName String    @db.VarChar(120)
  createdAt     DateTime  @default(now())
  
  profile       Profile   @relation(fields: [profileId], references: [id])
  
  @@index([profileId])
}
```

---

### 4. Modificações nos Modelos Existentes

#### A. Modelo `Legenda`
Adicionar campo para `greeting`:

```prisma
model Legenda {
  id          String    @id @default(uuid()) @db.Uuid
  profileId   String    @db.Uuid
  greeting    String?   @db.VarChar(100)    // NOVO: "Olá, eu sou"
  legendaFoto String    @db.Text
  nome        String    @db.VarChar(120)
  titulo      String    @db.VarChar(200)
  subtitulo   String?   @db.VarChar(200)
  descricao   String    @db.Text
  createdAt   DateTime  @default(now())

  profile     Profile   @relation(fields: [profileId], references: [id])
  templates   Template[]

  @@index([profileId])
}
```

#### B. Modelo `Projeto`
Adicionar campos `demoLink` e `codeLink`:

```prisma
model Projeto {
  id        String    @id @default(uuid()) @db.Uuid
  profileId String    @db.Uuid
  nome      String    @db.VarChar(200)
  descricao String    @db.Text
  gif       String    @db.Text
  demoLink  String?   @db.Text              // NOVO: Link para demo ao vivo
  codeLink  String?   @db.Text              // NOVO: Link para código (GitHub)
  ordem     Int       @default(0)           // NOVO: Ordenação
  createdAt DateTime  @default(now())

  profile   Profile   @relation(fields: [profileId], references: [id])
  templates Template[]

  @@index([profileId])
}
```

#### C. Modelo `Profile`
Adicionar relacionamentos para novos modelos:

```prisma
model Profile {
  id            String        @id @default(uuid()) @db.Uuid
  userId        String        @unique @db.Uuid
  username      String        @unique @db.VarChar(40)
  bio           String?       @db.Text
  avatarUrl     String?       @db.Text
  themeId       Int?
  templateType  TemplateType
  published     Boolean       @default(false)
  createdAt     DateTime      @default(now())

  // Relations existentes
  user        User            @relation(fields: [userId], references: [id])
  pages       Page[]
  social      Social[]
  legendas    Legenda[]
  projetos    Projeto[]
  config      Config?
  templates   Template[]

  // NOVOS relacionamentos
  techStack   TechStack?      // Um por perfil
  workHistory WorkExperience[]
  footer      Footer?

  @@index([userId])
}
```

---

## Resumo das Alterações Necessárias

### ✅ Adicionar novos modelos:
1. `TechStack` - Título e subtítulo da seção de tecnologias
2. `Technology` - Tecnologias individuais com ícone e cor
3. `WorkExperience` - Experiências profissionais
4. `WorkTechnology` - Tecnologias usadas em cada experiência
5. `WorkResponsibility` - Responsabilidades de cada experiência
6. `Footer` - Informações do rodapé

### 🔧 Modificar modelos existentes:
1. `Legenda` - Adicionar campo `greeting`
2. `Projeto` - Adicionar `demoLink`, `codeLink` e `ordem`
3. `Profile` - Adicionar relacionamentos para novos modelos

### ⚠️ Considerações:

1. **Template Type**: O enum `TemplateType` atualmente tem `template_01`, `template_02`, `template_03`. Se o "Portfólio 1" corresponde a `template_01`, pode ser necessário garantir que os novos modelos sejam usados apenas quando `templateType = template_01`.

2. **Compatibilidade**: As modificações propostas são aditivas e não quebram a estrutura existente (exceto pelo campo `greeting` em `Legenda`, que é opcional).

3. **Campos JSON vs Relacionamentos**: A opção de usar JSON (`conteudo Json` como no modelo `Custom`) poderia simplificar, mas relacionamentos normalizados oferecem melhor integridade e queryabilidade.

---

## Conclusão

Para implementar completamente o Portfólio 1, são necessárias:
- **6 novos modelos**
- **Modificações em 3 modelos existentes**
- **Estrutura de relacionamentos atualizada**

O schema atual pode ser usado como base, mas requer expansão significativa para suportar todas as funcionalidades do Portfólio 1.

