import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { sectionFade } from './animations';
import customImage from '@/landingpage-images/image.png';
import { Reveal } from './Reveal';

export function HeroSection() {
  return (
    <motion.section
      className="relative overflow-hidden"
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="mx-auto flex w-full flex-col items-center px-4 pb-20 pt-6 text-center sm:px-6">
        <div className="w-full max-w-4xl">
          <Reveal delay={100}>
            <h1
              className="mx-auto max-w-3xl font-normal text-[#ece5d9] text-[36px] leading-[1.2] sm:text-[48px] sm:leading-[58px]"
              style={{ fontFamily: '"Lora", serif' }}
            >
              Crie seu portfólio profissional online com templates feitos para
              desenvolvedores.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#ece5d9]/70 sm:text-lg">
              Monte sua bio, projetos, experiências, stack tecnológica e redes
              sociais em uma página responsiva, com personalização avançada e
              preview antes da publicação.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col items-center gap-3">
              <Link
                to="/profile/type"
                className="inline-flex items-center justify-center rounded-full bg-[#c3986b] px-8 py-3.5 text-sm font-semibold text-[#221e1b] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] hover:bg-[#b1835f] active:scale-[0.98]"
              >
                Crie sua conta gratuita
              </Link>
              <span className="mt-1 text-[13px] text-[#ece5d9]/40">
                Comece grátis e crie seu portfólio em minutos.
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="relative mx-auto mt-16 flex w-full max-w-[96vw] justify-center md:max-w-[1600px]">
            <img
              src={customImage}
              alt="Preview do editor de portfólio da Bio4Dev"
              className="relative z-10 h-auto w-full rounded-[14px] border border-[#c3986b]/10 bg-black/50 shadow-[0_0_80px_rgba(0,0,0,0.6)] md:rounded-[20px] rounded-b-none"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>

      <Reveal delay={260}>
        <div className="mx-auto mt-6 flex w-full max-w-6xl flex-col gap-4 px-6 pb-6 text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c3986b]">
            Recursos para tirar seu portfólio do rascunho e publicar com
            clareza
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {[
              'Templates',
              'Projetos',
              'Experiências',
              'GitHub',
              'Preview',
              'Analytics',
            ].map(
              (name, idx) => (
                <div
                  key={name}
                  className="flex items-center justify-center rounded-2xl border border-[#c3986b]/25 bg-[#2c2621] px-4 py-3 text-[#ece5d9] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[2px] hover:border-[#c3986b]/50"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <span className="text-sm font-semibold">{name}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </Reveal>

      <div className="fixed inset-x-0 bottom-4 z-30 mx-auto flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border border-[#c3986b]/35 bg-white/90 px-4 py-3 shadow-[0_18px_40px_-26px_rgba(195,152,107,0.6)] backdrop-blur-xl lg:hidden">
        <div className="text-sm font-semibold text-slate-800">
          Pronto para criar seu portfólio?
        </div>
        <Link
          to="/profile/type"
          className="inline-flex items-center gap-2 rounded-full bg-[#c3986b] px-4 py-2 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#b1835f]"
        >
          Começar
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </motion.section>
  );
}
