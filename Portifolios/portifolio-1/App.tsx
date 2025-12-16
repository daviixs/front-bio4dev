import React from 'react';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { WorkHistory } from './components/WorkHistory';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Seção Hero/Inicial */}
      <Hero />

      {/* Seção Tech Stack */}
      <TechStack />

      {/* Seção de Histórico de Trabalho */}
      <WorkHistory />

      {/* Seção de Projetos */}
      <Projects />

      {/* Rodapé */}
      <Footer />
    </div>
  );
}