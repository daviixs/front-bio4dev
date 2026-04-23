import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sectionFade } from './animations';

const faqs = [
  {
    question: 'O que posso adicionar no meu portfólio?',
    answer:
      'Você pode adicionar bio, projetos, experiências profissionais, stack tecnológica, redes sociais e links personalizados.',
  },
  {
    question: 'Posso visualizar antes de publicar?',
    answer:
      'Sim. A Bio4Dev permite visualizar o portfólio antes da publicação e compartilhar previews temporários com tokens seguros que expiram em 24 horas.',
  },
  {
    question: 'Posso integrar GitHub e redes sociais?',
    answer:
      'Sim. Você pode importar projetos do GitHub e conectar plataformas como LinkedIn, Twitter e outras redes sociais.',
  },
  {
    question: 'Meu portfólio funciona em dispositivos móveis?',
    answer:
      'Sim. Os templates são responsivos e foram otimizados para desktop, tablet e mobile.',
  },
  {
    question: 'Posso manter meu portfólio privado?',
    answer:
      'Sim. Você pode publicar ou manter o portfólio privado, com controle de privacidade e autenticação robusta.',
  },
];

export function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(
    faqs[0]?.question ?? null,
  );

  return (
    <motion.section
      id="faq"
      className="py-16 lg:py-20"
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c3986b]">
            Perguntas frequentes
          </p>
          <h2
            className="text-[42px] font-normal leading-tight text-[#ece5d9] md:text-[48px]"
            style={{ fontFamily: '"Lora", serif' }}
          >
            Tudo o que você precisa saber para criar seu portfólio
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-[#ece5d9]/12">
          {faqs.map((faq) => {
            const isOpen = openItem === faq.question;
            return (
              <div key={faq.question} className="py-2">
                <button
                  className="flex w-full items-center justify-between py-6 text-left"
                  onClick={() => setOpenItem(isOpen ? null : faq.question)}
                >
                  <span className="text-[15px] font-normal text-[#ece5d9]">
                    {faq.question}
                  </span>
                  <span className="text-[#ece5d9] text-xl leading-none">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 text-[14px] leading-[1.75] text-[#ece5d9]/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
