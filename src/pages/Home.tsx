import React from 'react';
import {
  Header,
  HeroSection,
  FeaturesSection,
  ToolsSection,
  FocusSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  Footer,
} from '@/components/landing';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ToolsSection />
        <FocusSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

