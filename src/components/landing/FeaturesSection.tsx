import React from "react";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";
import { sectionFade } from "./animations";

export function FeaturesSection() {
  return (
    <motion.section
      id="recursos"
      className="bg-[var(--surface)] py-20"
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6">
        <Reveal>
          <div className="w-full rounded-[16px] border border-white/12 bg-[#221e1b] p-10 md:p-14 shadow-[0_28px_70px_-40px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
              {/* Video / iframe placeholder */}
              <div className="relative w-full flex-1 lg:flex-[1.1]">
                <div className="aspect-[16/10] overflow-hidden rounded-[10px] border border-white/12 bg-[#2e2824]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(195,152,107,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(236,229,217,0.12),transparent_34%)]" />
                  <div className="relative flex h-full w-full items-center justify-center text-[#ece5d9]/70 text-sm font-semibold">
                    <span className="rounded-full border border-white/20 px-3 py-1">Vídeo do produto (16:10)</span>
                  </div>
                </div>
              </div>

              {/* Text column */}
              <div className="flex flex-1 flex-col items-start gap-5 lg:flex-[1]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c3986b]">
                  Bio4Dev Suite
                </p>
                <h3 className="text-[32px] font-semibold leading-tight text-[#ece5d9] md:text-[34px]">
                  Tudo para criar bios e portfólios épicos em um só lugar
                </h3>
                <p className="max-w-xl text-sm leading-[1.75] text-[#ece5d9]/60">
                  Monte sua bio com IA, media curta, CTA quente e templates mobile-first. Atualize links em minutos,
                  teste mensagens de contato e acompanhe cliques em tempo real — tudo dentro do painel Bio4Dev.
                </p>
                <button className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#c3986b] px-8 py-3 text-sm font-medium text-[#221e1b] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] active:scale-[0.98]">
                  Ver como funciona
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </motion.section>
  );
}
