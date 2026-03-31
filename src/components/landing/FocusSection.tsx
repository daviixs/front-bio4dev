import React from "react";
import { Reveal } from "./Reveal";
import screenshot from "@/landingpage-images/mockup-image2.png";
import { motion } from "framer-motion";
import { sectionFade } from "./animations";

export function FocusSection() {
  return (
    <motion.section
      id="templates"
      className="bg-[var(--surface)] py-20"
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
        <Reveal>
          <div className="w-full rounded-[16px] border border-white/12 bg-[#221e1b] p-10 md:p-14 shadow-[0_28px_70px_-40px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-12">
              {/* Texto à esquerda */}
              <div className="flex flex-1 flex-col gap-5" style={{ maxWidth: 360 }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c3986b]">
                  Epic Builder
                </p>
                <h3 className="font-serif text-[38px] font-semibold leading-[1.2] text-[#ece5d9] md:text-[40px]">
                  O único builder de bios com IA que não quebra o que já estava funcionando.
                </h3>
                <p className="text-sm leading-[1.75] text-[#ece5d9]/60">
                  A Bio4Dev converte sua bio em tarefas claras: adicionamos mídia curta, CTA quente e ajustes visuais de
                  forma isolada. Você continua evoluindo seu perfil sem desfazer o que já estava pronto.
                </p>
                <button className="inline-flex w-max items-center gap-2 rounded-full bg-[#c3986b] px-8 py-3 text-sm font-medium text-[#221e1b] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] active:scale-[0.98]">
                  Crie uma conta gratuita
                </button>
              </div>

              {/* Screenshot à direita */}
              <div className="flex flex-[1.4] justify-center">
                <div className="relative w-full max-w-3xl overflow-hidden rounded-[10px]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(195,152,107,0.2),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(236,229,217,0.12),transparent_34%)]" />
                  <img
                    src={screenshot}
                    alt="Interface do editor Bio4Dev"
                    className="relative z-10 w-full object-cover"
                    loading="lazy"
                    style={{ aspectRatio: "16 / 9" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-center font-serif text-xl font-normal text-[#ece5d9]">
            Feito para quem não é desenvolvedor. Aprovado por quem é.
          </p>
        </Reveal>
      </div>
    </motion.section>
  );
}
