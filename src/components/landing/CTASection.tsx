import React from "react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { ShieldCheck, ArrowRight, WhatsappLogo, EnvelopeSimple } from "@phosphor-icons/react";

export function CTASection() {
  return (
    <section id="precos" className="bg-[var(--surface)] py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-6">
        <Reveal>
          <div className="lg:col-span-6">
            <p className="inline-flex w-max items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f5ede4]">
              Em minutos, no mobile
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[#f5ede4] sm:text-4xl">
              Publique hoje, teste o CTA amanhã.
            </h2>
            <p className="mt-3 text-base text-[#d0c2b4]">
              Onboarding guiado, templates já otimizados e mensagem pronta para contato. Sua bio fica viva e mensurável.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-3 rounded-full bg-[#c3986b] px-6 py-3 text-base font-semibold text-white shadow-[0_20px_44px_-22px_rgba(195,152,107,0.75)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] active:scale-[0.98] hover:bg-[#b1835f]"
              >
                Começar agora
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                  <ArrowRight size={18} weight="bold" />
                </span>
              </Link>
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-[#f5ede4]">
                <ShieldCheck size={18} weight="fill" className="text-[#c3986b]" />
                CTA principal: WhatsApp ou Email
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="lg:col-span-6">
            <div className="double-shell">
              <div className="core grid gap-4 rounded-[22px] bg-white p-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-[#c3986b]/12 p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#c3986b]">
                    CTA quente
                    <WhatsappLogo size={16} weight="fill" />
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Mensagem pronta para WhatsApp</p>
                  <p className="text-sm text-slate-600">Controle o texto e responda mais rápido.</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.4)]">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                    Alternativa
                    <EnvelopeSimple size={16} weight="bold" />
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Mailto com assunto definido</p>
                  <p className="text-sm text-slate-600">Para quem prefere email estruturado.</p>
                </div>
                <div className="sm:col-span-2 rounded-2xl border border-slate-100 bg-white p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Pronto para agir</p>
                      <p className="text-lg font-semibold text-slate-900">CTA fixo visível no scroll mobile</p>
                      <p className="text-sm text-slate-600">Sem h-screen: usamos min-h-[100dvh] para estabilidade no iOS.</p>
                    </div>
                    <Link
                      to="/signup"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#c3986b] px-4 py-2 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] hover:bg-[#b1835f]"
                  >
                    Montar bio
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
