import React from 'react';
import { Reveal } from './Reveal';
import { motion } from 'framer-motion';
import { sectionFade } from './animations';

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

export function ToolsSection() {
  return (
    <motion.section
      id="como-funciona"
      className="bg-[var(--surface)] py-20"
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        <Reveal>
          <div className="flex flex-col items-center gap-2 text-center">
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
              Tudo o que você precisa para organizar seu conteúdo e publicar com
              clareza.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature, idx) => (
            <Reveal key={feature.title} delay={idx * 80}>
              <div className="h-full rounded-[14px] border border-white/10 bg-[#2a2520] p-7 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.6)]">
                <p className="text-sm leading-[1.75] text-[#ece5d9]">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3a342e] text-sm font-semibold text-[#c3986b]">
                    {feature.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#ece5d9] leading-tight">
                      {feature.title}
                    </span>
                    <span className="text-xs text-[#ece5d9]/40 leading-tight">
                      {feature.label}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
