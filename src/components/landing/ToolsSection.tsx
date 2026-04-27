import React from 'react';
import { Reveal } from './Reveal';
import { motion } from 'framer-motion';
import { sectionFade } from './animations';

const testimonials = [
  {
    name: 'Ana Silva',
    quote:
      '"A facilidade para criar o portfólio é absurda. Escolhi um template minimalista e em minutos minha página estava no ar."',
    role: 'Influenciadora',
    initials: 'AS',
  },
  {
    name: 'Carlos Mendes',
    quote:
      '"Poder compartilhar meus prejetos me ajudou muito nas entrevistas. É realmente um sistema fantastico"',
    role: 'Engenheiro de Software',
    initials: 'CM',
  },
  {
    name: 'Beatriz Costa',
    quote:
      '"A integração com o GitHub facilitou demais a minha vida. Meus projetos e métricas de engajamento ficam sempre atualizados."',
    role: 'Tech Lead',
    initials: 'BC',
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
              Depoimentos
            </p>
            <h2
              className="text-3xl font-normal text-[#ece5d9] sm:text-4xl"
              style={{ fontFamily: '"Lora", serif' }}
            >
              O que os profissionais dizem sobre a plataforma
            </h2>
            <p className="text-sm text-[#ece5d9]/60">
              Veja como estamos ajudando pessoas a destacarem suas carreiras com facilidade.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <Reveal key={testimonial.name} delay={idx * 80}>
              <div className="h-full rounded-[14px] border border-white/10 bg-[#2a2520] p-7 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.6)]">
                <p className="text-sm leading-[1.75] text-[#ece5d9] italic">
                  {testimonial.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3a342e] text-sm font-semibold text-[#c3986b]">
                    {testimonial.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#ece5d9] leading-tight">
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-[#ece5d9]/40 leading-tight">
                      {testimonial.role}
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
