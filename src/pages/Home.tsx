import React from 'react';
import {
  Header,
  HeroSection,
  FeaturesSection,
  ToolsSection,
  FocusSection,
  FAQSection,
  Footer,
} from '@/components/landing';

export function Home() {
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
    </div>
  );
}
