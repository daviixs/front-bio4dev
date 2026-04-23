import React, { useEffect } from 'react';
import {
  Header,
  HeroSection,
  FeaturesSection,
  ToolsSection,
  FocusSection,
  FAQSection,
  Footer,
  DesktopFloatingCTA,
} from '@/components/landing';

const HOME_SEO = {
  title: 'Criar Portfólio Profissional para Devs | Bio4Dev',
  description:
    'Crie seu portfólio profissional com templates personalizáveis, preview antes da publicação, integração com GitHub e layout responsivo. Comece grátis.',
  canonical: 'https://bio4dev.com/',
  image: 'https://bio4dev.com/images/templates/Portifolio%201.png',
} as const;

function upsertNamedMeta(name: string, content: string) {
  let meta = document.head.querySelector(
    `meta[name="${name}"]`,
  ) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }

  meta.content = content;
}

function upsertPropertyMeta(property: string, content: string) {
  let meta = document.head.querySelector(
    `meta[property="${property}"]`,
  ) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }

  meta.content = content;
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }

  link.href = href;
}

export function Home() {
  useEffect(() => {
    document.documentElement.lang = 'pt-BR';
    document.title = HOME_SEO.title;

    upsertNamedMeta('description', HOME_SEO.description);
    upsertNamedMeta('robots', 'index,follow');
    upsertCanonical(HOME_SEO.canonical);

    upsertPropertyMeta('og:type', 'website');
    upsertPropertyMeta('og:locale', 'pt_BR');
    upsertPropertyMeta('og:site_name', 'Bio4Dev');
    upsertPropertyMeta('og:title', HOME_SEO.title);
    upsertPropertyMeta('og:description', HOME_SEO.description);
    upsertPropertyMeta('og:url', HOME_SEO.canonical);
    upsertPropertyMeta('og:image', HOME_SEO.image);

    upsertNamedMeta('twitter:card', 'summary_large_image');
    upsertNamedMeta('twitter:title', HOME_SEO.title);
    upsertNamedMeta('twitter:description', HOME_SEO.description);
    upsertNamedMeta('twitter:image', HOME_SEO.image);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[var(--surface)]">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ToolsSection />
        <FocusSection />
        <FAQSection />
      </main>
      <Footer />
      <DesktopFloatingCTA />
    </div>
  );
}
