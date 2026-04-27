import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { sectionFade } from './animations';
import customImage from '@/landingpage-images/image.png';
import { Reveal } from './Reveal';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { FeatureShowcase } from './FeatureShowcase';

export function HeroSection() {
  return (
    <motion.section
      className="relative overflow-hidden"
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="mx-auto flex w-full flex-col items-center px-4 pb-0 pt-6 text-center sm:px-6">
        <ContainerScroll
          titleComponent={
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
              <Reveal delay={100}>
                <h1
                  className="mx-auto max-w-5xl font-normal text-[#ece5d9] text-[42px] leading-[1.1] sm:text-[64px] sm:leading-[1.15] md:text-[72px]"
                  style={{ fontFamily: '"Lora", serif' }}
                >
                  Crie seu portfólio profissional online com templates feitos para
                  desenvolvedores.
                </h1>
              </Reveal>

              <Reveal delay={180}>
                <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-[#ece5d9]/70 sm:text-xl md:text-2xl">
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
          }
        >
          <img
            src={customImage}
            alt="Preview do editor de portfólio da Bio4Dev"
            className="mx-auto h-auto w-full rounded-[14px] md:rounded-[20px]"
            draggable={false}
            loading="lazy"
          />
        </ContainerScroll>
      </div>

      <Reveal delay={260}>
        <FeatureShowcase />
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
