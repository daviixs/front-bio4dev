import React from "react";
import { Hero } from "../../Portifolios/portifolio-1/components/Hero";
import { TechStack } from "../../Portifolios/portifolio-1/components/TechStack";
import { WorkHistory } from "../../Portifolios/portifolio-1/components/WorkHistory";
import { Projects } from "../../Portifolios/portifolio-1/components/Projects";
import { Footer } from "../../Portifolios/portifolio-1/components/Footer";
import { ResumeButton } from "@/components/portfolio/ResumeButton";
import type { ProfileComplete } from "@/types";

interface TemplateProps {
  profile: ProfileComplete;
}

// Template 01 - Portfólio 1 Real com todos os componentes
export function Template01({ profile }: TemplateProps) {
  const legenda = profile.legendas?.[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Botão de Download do Currículo - Fixo no Topo */}
      <ResumeButton resumeUrl={profile.footer?.resumeUrl} />

      {/* Seção Tech Stack */}
      <TechStack techStack={profile.techStack} />

      {/* Seção de Histórico de Trabalho */}
      <WorkHistory workHistory={profile.workHistory} />

      {/* Seção de Projetos */}
      <Projects projects={profile.projetos} />

      {/* Rodapé */}
      <Footer footer={profile.footer} socials={profile.social} />
    </div>
  );
}
