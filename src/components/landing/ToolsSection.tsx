import React from "react";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";
import { sectionFade } from "./animations";

const testimonials = [
  {
    quote:
      'Hoje a ÚNICA pessoa que está falando sobre vibecoding de forma tão lúcida! Deborah, você é como um raio de luz do meio dessa escuridão de informações vazias de topo de funil, continue… seu conteúdo é IMPECÁVEL',
    name: "Benicio SaaS",
    handle: "@BenicioSaaS",
    initials: "BS",
  },
  {
    quote:
      "Nunca pensei que um conteúdo tão técnico e avançado pudesse ser comunicado de maneira tão eficiente e prática. Entrega muito e sem enrolação.",
    name: "Harlem Trevisan",
    handle: "@HarlemTrevisan",
    initials: "HT",
  },
  {
    quote:
      "Deborah, sua didática precisa ser estudada e replicada. Parabéns!",
    name: "Igor Baldarena",
    handle: "@igorbaldarena",
    initials: "IB",
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
              Prova real
            </p>
            <h2 className="text-3xl font-semibold text-[#ece5d9] sm:text-4xl">
              Criadores que escalam suas bios com a Bio4Dev
            </h2>
            <p className="text-sm text-[#ece5d9]/60">
              Templates mobile, CTA quente e mídia curta rodando ao vivo.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <Reveal key={t.name} delay={idx * 80}>
              <div className="h-full rounded-[14px] border border-white/10 bg-[#2a2520] p-7 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.6)]">
                <p className="text-sm leading-[1.75] text-[#ece5d9]">
                  “{t.quote}”
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3a342e] text-sm font-semibold text-[#c3986b]">
                    {t.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#ece5d9] leading-tight">{t.name}</span>
                    <span className="text-xs text-[#ece5d9]/40 leading-tight">{t.handle}</span>
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
