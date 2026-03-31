import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, RocketLaunch, UsersThree } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { sectionFade } from "./animations";
import mockupImage from "@/landingpage-images/mockup-portrait.png";
import { Reveal } from "./Reveal";

export function HeroSection() {
  return (
    <motion.section
      className="relative overflow-hidden"
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="grain-overlay" aria-hidden />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pb-20 pt-28 text-center">
        <div className="w-full max-w-3xl">
          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-[#ece5d9] sm:text-5xl lg:text-[54px] lg:leading-[1.05]">
              Tudo o que você precisa para construir produtos épicos com IA em um só lugar.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#d0c2b4]">
              O melhor ai app builder do mercado, aulas com didática inigualável e a comunidade mais séria de AI builders do Brasil - tudo em uma só assinatura.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/signup"
                className="group inline-flex items-center justify-between gap-3 rounded-full bg-[#c3986b] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_-18px_rgba(195,152,107,0.75)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] active:scale-[0.98] hover:bg-[#b1835f]"
              >
                Crie sua conta gratuita
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                  <ArrowRight size={18} weight="bold" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="relative w-full max-w-4xl">
            <div className="double-shell">
              <div className="core relative overflow-hidden rounded-[22px] bg-white p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(195,152,107,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(236,229,217,0.16),transparent_34%)]" />
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center justify-between rounded-2xl border border-[#c3986b]/25 bg-white/70 px-4 py-3 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)]">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Stack AI Builder</p>
                      <p className="text-lg font-semibold text-slate-800">Templates, mídia e CTA quente</p>
                    </div>
                    <UsersThree size={28} weight="fill" className="text-[#c3986b]" />
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c3986b]/12 via-transparent to-white" />
                    <img
                      src={mockupImage}
                      alt="Preview do template Bio4Dev em um iPhone"
                      className="relative z-10 h-[520px] w-auto drop-shadow-[0_30px_70px_-40px_rgba(15,23,42,0.5)]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={260}>
        <div className="mx-auto mt-6 flex w-full max-w-6xl flex-col gap-4 px-6 pb-6 text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c3986b]">
            Confiado por mais de 5.000 builders de empresas que constroem softwares de ponta
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {["itau", "mercadolivre", "brex", "g4", "vtex", "stone"].map((name, idx) => (
              <div
                key={name}
                className="flex items-center justify-center rounded-2xl border border-[#c3986b]/25 bg-[#2c2621] px-4 py-3 text-[#ece5d9] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[2px] hover:border-[#c3986b]/50"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <LogoMark brand={name} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="fixed inset-x-0 bottom-4 z-30 mx-auto flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border border-[#c3986b]/35 bg-white/90 px-4 py-3 shadow-[0_18px_40px_-26px_rgba(195,152,107,0.6)] backdrop-blur-xl lg:hidden">
        <div className="text-sm font-semibold text-slate-800">
          Pronto para montar sua bio agora?
        </div>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 rounded-full bg-[#c3986b] px-4 py-2 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#b1835f]"
        >
          Começar
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </motion.section>
  );
}

function LogoMark({ brand }: { brand: string }) {
  const common = "h-5 w-auto fill-current";
  switch (brand) {
    case "itau":
      return (
        <svg viewBox="0 0 64 64" className={common} aria-label="Itaú">
          <rect x="6" y="6" width="52" height="52" rx="12" ry="12" />
          <text x="20" y="40" fontSize="24" fontWeight="700" fill="#2c2621">
            it
          </text>
        </svg>
      );
    case "mercadolivre":
      return (
        <svg viewBox="0 0 64 32" className={common} aria-label="Mercado Livre">
          <path d="M4 16c0-6.6 5.4-12 12-12h16c6.6 0 12 5.4 12 12s-5.4 12-12 12H16C9.4 28 4 22.6 4 16Z" />
          <path d="M16 14c2-2 6-2 8 0m8 0c2-2 6-2 8 0" stroke="#2c2621" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "brex":
      return (
        <svg viewBox="0 0 64 24" className={common} aria-label="Brex">
          <path d="M6 20V4h8c3 0 5 2 5 4.5S17 13 14 13h-5" />
          <path d="M19 20V4h7c3 0 5 1.8 5 4s-1.4 4-4.2 4.5L36 20" />
          <path d="M36 20V4h12" />
          <path d="M42 12h6" />
        </svg>
      );
    case "g4":
      return (
        <svg viewBox="0 0 48 24" className={common} aria-label="G4 Educação">
          <text x="2" y="17" fontSize="16" fontWeight="700" letterSpacing="1">G4</text>
        </svg>
      );
    case "vtex":
      return (
        <svg viewBox="0 0 48 24" className={common} aria-label="VTEX">
          <path d="M4 4h8l4 16h-6zM18 4h6l-4 16h-6zM28 4h6l-4 16h-6z" />
        </svg>
      );
    case "stone":
      return (
        <svg viewBox="0 0 56 20" className={common} aria-label="Stone">
          <text x="2" y="15" fontSize="14" fontWeight="700" letterSpacing="0.5">stone</text>
        </svg>
      );
    default:
      return <span className="text-sm font-semibold capitalize">{brand}</span>;
  }
}
