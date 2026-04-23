import React from 'react';
import { Reveal } from './Reveal';
import { motion } from 'framer-motion';
import { sectionFade } from './animations';
import VideoLP from '../../../lp-images/VideoLP.mp4';

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
      <div className="mx-auto flex w-full max-w-[96vw] flex-col text-left md:max-w-[1600px]">
        <Reveal>
          <div className="w-full rounded-[24px] border border-white/12 bg-[#221e1b] px-6 py-14 shadow-[0_35px_100px_-50px_rgba(0,0,0,0.8)] md:px-14 md:py-24">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
              {/* Video Player */}
              <div className="relative w-full flex-1 lg:flex-[1.1]">
                <div className="aspect-[16/10] overflow-hidden rounded-[10px] border border-white/12 bg-[#2e2824]">
                  <video
                    src={VideoLP}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Text column */}
              <div className="flex flex-1 flex-col items-start gap-5 lg:flex-[1]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c3986b]">
                  Bio4Dev
                </p>
                <h3
                  className="text-[32px] font-normal leading-[1.2] text-[#ece5d9] md:text-[34px]"
                  style={{ fontFamily: '"Lora", serif' }}
                >
                  Tudo para criar, personalizar e publicar seu portfólio
                  profissional.
                </h3>
                <p className="max-w-xl text-sm leading-[1.75] text-[#ece5d9]/60">
                  Escolha um template, adicione bio, projetos, experiências,
                  stack e links personalizados. Visualize antes de publicar e
                  compartilhe seu portfólio com mais confiança.
                </p>
                <button className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#c3986b] px-8 py-3 text-sm font-medium text-[#221e1b] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] active:scale-[0.98]">
                  Ver recursos
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </motion.section>
  );
}
