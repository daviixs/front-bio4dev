# Home SEO and Landing Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the `/` landing page metadata and copy with the real Bio4Dev developer-portfolio product without changing the existing landing-page structure.

**Architecture:** Update base metadata in `index.html`, then enforce the home-route metadata from `Home.tsx` so the landing page sets its own title, canonical, description, and social tags on mount. Rewrite existing landing component copy in place, preserving layout, routes, and CTA destinations.

**Tech Stack:** React 18, TypeScript, React Router, Vite, existing landing components

---

## File Structure

- Modify: `front-bio4dev/index.html`
- Modify: `front-bio4dev/src/pages/Home.tsx`
- Modify: `front-bio4dev/src/components/landing/Header.tsx`
- Modify: `front-bio4dev/src/components/landing/HeroSection.tsx`
- Modify: `front-bio4dev/src/components/landing/FeaturesSection.tsx`
- Modify: `front-bio4dev/src/components/landing/ToolsSection.tsx`
- Modify: `front-bio4dev/src/components/landing/FocusSection.tsx`
- Modify: `front-bio4dev/src/components/landing/FAQSection.tsx`
- Modify: `front-bio4dev/src/components/landing/Footer.tsx`
- Modify: `front-bio4dev/src/components/landing/DesktopFloatingCTA.tsx`
- Validate: `front-bio4dev/package.json` via `npm run build`

Project note: the frontend repo has no dedicated automated test script configured, so this plan uses targeted static verification plus `npm run build` as the acceptance gate.

### Task 1: Add Home Metadata Defaults

**Files:**
- Modify: `front-bio4dev/index.html`
- Validate: `front-bio4dev/index.html`

- [ ] **Step 1: Verify current metadata gaps**

Run:

```bash
rg -n 'lang=|meta name="description"|rel="canonical"|og:|twitter:' front-bio4dev/index.html
```

Expected: only the current `lang="en"` or no SEO tag matches beyond the existing title and viewport.

- [ ] **Step 2: Replace the `<html>` language and enrich the `<head>` defaults**

Update the head block to the following shape:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <script type="module">
      if (import.meta.env.DEV) {
        import('react-grab');
      }
    </script>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Criar Portfólio Profissional para Devs | Bio4Dev</title>
    <meta
      name="description"
      content="Crie seu portfólio profissional com templates personalizáveis, preview antes da publicação, integração com GitHub e layout responsivo. Comece grátis."
    />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="https://bio4dev.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="Bio4Dev" />
    <meta
      property="og:title"
      content="Criar Portfólio Profissional para Devs | Bio4Dev"
    />
    <meta
      property="og:description"
      content="Crie seu portfólio profissional com templates personalizáveis, preview antes da publicação, integração com GitHub e layout responsivo. Comece grátis."
    />
    <meta property="og:url" content="https://bio4dev.com/" />
    <meta
      property="og:image"
      content="https://bio4dev.com/images/templates/Portifolio%201.png"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Criar Portfólio Profissional para Devs | Bio4Dev"
    />
    <meta
      name="twitter:description"
      content="Crie seu portfólio profissional com templates personalizáveis, preview antes da publicação, integração com GitHub e layout responsivo. Comece grátis."
    />
    <meta
      name="twitter:image"
      content="https://bio4dev.com/images/templates/Portifolio%201.png"
    />
```

- [ ] **Step 3: Verify the static tags exist**

Run:

```bash
rg -n 'pt-BR|description|canonical|og:title|twitter:card' front-bio4dev/index.html
```

Expected: one match for each new metadata family.

- [ ] **Step 4: Commit**

```bash
git -C front-bio4dev add index.html
git -C front-bio4dev commit -m "chore: add home metadata defaults"
```

### Task 2: Enforce Route-Level SEO on `/`

**Files:**
- Modify: `front-bio4dev/src/pages/Home.tsx`
- Validate: `front-bio4dev/src/pages/Home.tsx`

- [ ] **Step 1: Confirm the page currently has no route-level metadata logic**

Run:

```bash
rg -n 'document.title|meta\\[name=|meta\\[property=|canonical' front-bio4dev/src/pages/Home.tsx
```

Expected: no matches.

- [ ] **Step 2: Add a small home-only SEO effect to `Home.tsx`**

Insert metadata constants and a `useEffect` that updates title, description, canonical, robots, Open Graph, and Twitter tags when the home route mounts:

```tsx
import React, { useEffect } from 'react';

const HOME_SEO = {
  title: 'Criar Portfólio Profissional para Devs | Bio4Dev',
  description:
    'Crie seu portfólio profissional com templates personalizáveis, preview antes da publicação, integração com GitHub e layout responsivo. Comece grátis.',
  canonical: 'https://bio4dev.com/',
  image: 'https://bio4dev.com/images/templates/Portifolio%201.png',
};

function upsertMeta(
  selector: string,
  create: () => HTMLMetaElement | HTMLLinkElement,
  value: string,
) {
  const element = document.head.querySelector(selector) ?? create();

  if (!element.parentNode) {
    document.head.appendChild(element);
  }

  if (element instanceof HTMLLinkElement) {
    element.href = value;
    return;
  }

  element.setAttribute('content', value);
}

export function Home() {
  useEffect(() => {
    document.title = HOME_SEO.title;

    upsertMeta(
      'meta[name="description"]',
      () => {
        const meta = document.createElement('meta');
        meta.name = 'description';
        return meta;
      },
      HOME_SEO.description,
    );

    upsertMeta(
      'meta[name="robots"]',
      () => {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        return meta;
      },
      'index,follow',
    );

    upsertMeta(
      'link[rel="canonical"]',
      () => {
        const link = document.createElement('link');
        link.rel = 'canonical';
        return link;
      },
      HOME_SEO.canonical,
    );

    for (const [property, content] of [
      ['og:type', 'website'],
      ['og:locale', 'pt_BR'],
      ['og:site_name', 'Bio4Dev'],
      ['og:title', HOME_SEO.title],
      ['og:description', HOME_SEO.description],
      ['og:url', HOME_SEO.canonical],
      ['og:image', HOME_SEO.image],
      ['twitter:card', 'summary_large_image'],
      ['twitter:title', HOME_SEO.title],
      ['twitter:description', HOME_SEO.description],
      ['twitter:image', HOME_SEO.image],
    ] as const) {
      const isTwitter = property.startsWith('twitter:');

      upsertMeta(
        isTwitter ? `meta[name="${property}"]` : `meta[property="${property}"]`,
        () => {
          const meta = document.createElement('meta');
          if (isTwitter) {
            meta.name = property;
          } else {
            meta.setAttribute('property', property);
          }
          return meta;
        },
        content,
      );
    }
  }, []);

  return <div>{/* existing page structure */}</div>;
}
```

- [ ] **Step 3: Verify the page now contains metadata setup logic**

Run:

```bash
rg -n 'HOME_SEO|document.title|upsertMeta|og:title|twitter:card' front-bio4dev/src/pages/Home.tsx
```

Expected: matches for the helper and metadata keys.

- [ ] **Step 4: Commit**

```bash
git -C front-bio4dev add src/pages/Home.tsx
git -C front-bio4dev commit -m "feat: add home route seo metadata"
```

### Task 3: Rewrite Header and Hero Copy

**Files:**
- Modify: `front-bio4dev/src/components/landing/Header.tsx`
- Modify: `front-bio4dev/src/components/landing/HeroSection.tsx`

- [ ] **Step 1: Replace stale menu labels in `Header.tsx`**

Update `menuItems` to:

```tsx
const menuItems = [
  { label: 'Recursos', href: '#recursos' },
  { label: 'Templates', href: '#templates' },
];
```

- [ ] **Step 2: Rewrite the hero heading, supporting text, and proof row in `HeroSection.tsx`**

Use the following copy:

```tsx
<h1
  className="mx-auto max-w-3xl font-normal text-[#ece5d9] text-[36px] leading-[1.2] sm:text-[48px] sm:leading-[58px]"
  style={{ fontFamily: '"Lora", serif' }}
>
  Crie seu portfólio profissional online com templates feitos para desenvolvedores.
</h1>

<p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#ece5d9]/70 sm:text-lg">
  Monte sua bio, projetos, experiências, stack tecnológica e redes sociais em
  uma página responsiva, com personalização avançada e preview antes da
  publicação.
</p>

<span className="mt-1 text-[13px] text-[#ece5d9]/40">
  Comece grátis e crie seu portfólio em minutos.
</span>
```

Replace the proof row content with capability labels:

```tsx
<div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c3986b]">
  Recursos para tirar seu portfólio do rascunho e publicar com clareza
</div>

{[
  'Templates',
  'Projetos',
  'Experiências',
  'GitHub',
  'Preview',
  'Analytics',
].map((name, idx) => (
  <div key={name} className="flex items-center justify-center rounded-2xl border border-[#c3986b]/25 bg-[#2c2621] px-4 py-3 text-[#ece5d9]">
    <span className="text-sm font-semibold">{name}</span>
  </div>
))}
```

Also update the main image alt text to:

```tsx
alt="Preview do editor de portfólio da Bio4Dev"
```

Update the mobile sticky CTA copy to:

```tsx
<div className="text-sm font-semibold text-slate-800">
  Pronto para criar seu portfólio?
</div>
```

- [ ] **Step 3: Verify there are no stale hero phrases left**

Run:

```bash
rg -n 'épicos|app builder|assinatura|5\\.000 builders|bio agora' \
  front-bio4dev/src/components/landing/Header.tsx \
  front-bio4dev/src/components/landing/HeroSection.tsx
```

Expected: no matches.

- [ ] **Step 4: Commit**

```bash
git -C front-bio4dev add src/components/landing/Header.tsx src/components/landing/HeroSection.tsx
git -C front-bio4dev commit -m "feat: rewrite home header and hero copy"
```

### Task 4: Rewrite Mid-Page Product Sections

**Files:**
- Modify: `front-bio4dev/src/components/landing/FeaturesSection.tsx`
- Modify: `front-bio4dev/src/components/landing/ToolsSection.tsx`
- Modify: `front-bio4dev/src/components/landing/FocusSection.tsx`

- [ ] **Step 1: Rewrite `FeaturesSection.tsx` around the real product workflow**

Use:

```tsx
<p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c3986b]">
  Bio4Dev
</p>

<h3
  className="text-[32px] font-normal leading-[1.2] text-[#ece5d9] md:text-[34px]"
  style={{ fontFamily: '"Lora", serif' }}
>
  Tudo para criar, personalizar e publicar seu portfólio profissional.
</h3>

<p className="max-w-xl text-sm leading-[1.75] text-[#ece5d9]/60">
  Escolha um template, adicione bio, projetos, experiências, stack e links
  personalizados. Visualize antes de publicar e compartilhe seu portfólio com
  mais confiança.
</p>

<button className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#c3986b] px-8 py-3 text-sm font-medium text-[#221e1b] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] active:scale-[0.98]">
  Ver recursos
</button>
```

- [ ] **Step 2: Replace testimonial content in `ToolsSection.tsx` with product capability cards**

Change the data model and copy to:

```tsx
const features = [
  {
    title: 'Templates personalizáveis',
    description:
      'Escolha entre modelos minimalista, criativo e corporativo e ajuste cores, temas e layout ao seu contexto profissional.',
    label: 'Templates',
    initials: 'TP',
  },
  {
    title: 'Preview antes da publicação',
    description:
      'Visualize seu portfólio antes de publicar e compartilhe previews temporários com tokens seguros que expiram em 24 horas.',
    label: 'Preview',
    initials: 'PP',
  },
  {
    title: 'Integrações e analytics',
    description:
      'Importe projetos do GitHub, conecte redes sociais e acompanhe visualizações e engajamento do seu portfólio.',
    label: 'Dados',
    initials: 'IA',
  },
];
```

Update the section heading to:

```tsx
<p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c3986b]">
  Recursos principais
</p>
<h2
  className="text-3xl font-normal text-[#ece5d9] sm:text-4xl"
  style={{ fontFamily: '"Lora", serif' }}
>
  Recursos para criar seu portfólio profissional com mais rapidez
</h2>
<p className="text-sm text-[#ece5d9]/60">
  Tudo o que você precisa para organizar seu conteúdo e publicar com clareza.
</p>
```

- [ ] **Step 3: Rewrite `FocusSection.tsx` to emphasize portfolio control**

Use:

```tsx
<p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c3986b]">
  Portfólio com controle
</p>

<h3
  className="text-[38px] font-normal leading-[1.2] text-[#ece5d9] md:text-[40px]"
  style={{ fontFamily: '"Lora", serif' }}
>
  Personalize, publique e compartilhe seu portfólio sem começar do zero.
</h3>

<p className="text-sm leading-[1.75] text-[#ece5d9]/60">
  Organize seu conteúdo profissional em templates responsivos, publique quando
  estiver pronto ou mantenha o portfólio privado até o momento certo.
</p>

<button className="inline-flex w-max items-center gap-2 rounded-full bg-[#c3986b] px-8 py-3 text-sm font-medium text-[#221e1b] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] active:scale-[0.98]">
  Criar conta gratuita
</button>
```

Update the image alt and closing line to:

```tsx
alt="Template de portfólio criado na Bio4Dev"

<p className="text-center font-serif text-xl font-normal text-[#ece5d9]">
  Feito para destacar projetos, experiência e credibilidade técnica.
</p>
```

- [ ] **Step 4: Verify stale product language is gone**

Run:

```bash
rg -n 'Suite|CTA quente|mídia curta|vibecoding|criadores|IA' \
  front-bio4dev/src/components/landing/FeaturesSection.tsx \
  front-bio4dev/src/components/landing/ToolsSection.tsx \
  front-bio4dev/src/components/landing/FocusSection.tsx
```

Expected: no matches.

- [ ] **Step 5: Commit**

```bash
git -C front-bio4dev add \
  src/components/landing/FeaturesSection.tsx \
  src/components/landing/ToolsSection.tsx \
  src/components/landing/FocusSection.tsx
git -C front-bio4dev commit -m "feat: rewrite home product sections"
```

### Task 5: Rewrite FAQ, Footer, and Floating CTA

**Files:**
- Modify: `front-bio4dev/src/components/landing/FAQSection.tsx`
- Modify: `front-bio4dev/src/components/landing/Footer.tsx`
- Modify: `front-bio4dev/src/components/landing/DesktopFloatingCTA.tsx`

- [ ] **Step 1: Replace the FAQ entries with Bio4Dev product questions**

Use:

```tsx
const faqs = [
  {
    question: 'O que posso adicionar no meu portfólio?',
    answer:
      'Você pode adicionar bio, projetos, experiências profissionais, stack tecnológica, redes sociais e links personalizados.',
  },
  {
    question: 'Posso visualizar antes de publicar?',
    answer:
      'Sim. A Bio4Dev permite visualizar o portfólio antes da publicação e compartilhar previews temporários com tokens seguros que expiram em 24 horas.',
  },
  {
    question: 'Posso integrar GitHub e redes sociais?',
    answer:
      'Sim. Você pode importar projetos do GitHub e conectar plataformas como LinkedIn, Twitter e outras redes sociais.',
  },
  {
    question: 'Meu portfólio funciona em dispositivos móveis?',
    answer:
      'Sim. Os templates são responsivos e foram otimizados para desktop, tablet e mobile.',
  },
  {
    question: 'Posso manter meu portfólio privado?',
    answer:
      'Sim. Você pode publicar ou manter o portfólio privado, com controle de privacidade e autenticação robusta.',
  },
];
```

Keep the FAQ title, but update the lead-in if needed so it matches portfolio creation rather than generic product onboarding.

- [ ] **Step 2: Rewrite stale footer labels and CTA text**

Update the footer product links to:

```tsx
<a href="#recursos">Recursos</a>
<a href="#como-funciona">Como funciona</a>
<a href="#templates">Templates</a>
<a href="#faq">FAQ</a>
```

Update the footer image alt to:

```tsx
alt="Preview de portfólio profissional criado na Bio4Dev"
```

Update the floating CTA button to:

```tsx
<button
  type="submit"
  className="inline-flex items-center gap-2 rounded-full bg-[#c3986b] px-8 py-3.5 text-base font-bold text-[#221e1b] transition-all duration-300 hover:bg-[#b1835f] active:scale-95"
>
  Criar portfólio
  <ArrowRight size={22} weight="bold" />
</button>
```

- [ ] **Step 3: Verify no stale footer or FAQ phrases remain**

Run:

```bash
rg -n 'aulas|mentoria|domínio customizado|mídia curta|bio agora' \
  front-bio4dev/src/components/landing/FAQSection.tsx \
  front-bio4dev/src/components/landing/Footer.tsx \
  front-bio4dev/src/components/landing/DesktopFloatingCTA.tsx
```

Expected: no matches.

- [ ] **Step 4: Commit**

```bash
git -C front-bio4dev add \
  src/components/landing/FAQSection.tsx \
  src/components/landing/Footer.tsx \
  src/components/landing/DesktopFloatingCTA.tsx
git -C front-bio4dev commit -m "feat: rewrite home support copy"
```

### Task 6: Validate the Home End-to-End

**Files:**
- Validate: `front-bio4dev/index.html`
- Validate: `front-bio4dev/src/pages/Home.tsx`
- Validate: `front-bio4dev/src/components/landing/*.tsx`

- [ ] **Step 1: Check for a single H1 and the target keyword**

Run:

```bash
rg -n '<h1|criar seu portfólio profissional|crie seu portfólio profissional' \
  front-bio4dev/src/components/landing/HeroSection.tsx
```

Expected: one `h1` match and one approved keyword-aligned hero line.

- [ ] **Step 2: Run the frontend build**

Run:

```bash
npm run build
```

Working directory:

```bash
front-bio4dev
```

Expected: Vite production build completes without TypeScript or bundling errors.

- [ ] **Step 3: Spot-check that stale landing language is fully gone**

Run:

```bash
rg -n 'builder|mentoria|comunidade|aulas|assinatura|vibecoding|criadores|CTA quente|mídia curta' \
  front-bio4dev/src/components/landing \
  front-bio4dev/src/pages/Home.tsx
```

Expected: no matches.

- [ ] **Step 4: Commit**

```bash
git -C front-bio4dev add index.html src/pages/Home.tsx src/components/landing
git -C front-bio4dev commit -m "feat: align home seo and landing copy"
```

## Self-Review

- Spec coverage: this plan covers metadata, route-level SEO behavior, hero/header copy, mid-page sections, FAQ/footer/floating CTA, and build validation for `/` only.
- Placeholder scan: no `TODO`, `TBD`, or abstract “implement later” instructions remain.
- Type consistency: the plan keeps all edits within existing files and preserves current route/component boundaries.
