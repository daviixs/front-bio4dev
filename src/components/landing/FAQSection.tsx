import React, { useState } from "react";
import { motion } from "framer-motion";
import { sectionFade } from "./animations";

const faqs = [
  {
    question: "O Bio4Dev é gratuito?",
    answer:
      "Sim! Você pode criar sua conta e montar sua bio/portfólio completamente grátis. Oferecemos todos os templates e funcionalidades essenciais sem custo. Planos premium virão com extras avançados.",
  },
  {
    question: "Preciso saber programar para usar?",
    answer:
      "Não. Basta preencher suas informações, adicionar mídia curta e links. O builder faz o resto e publica em segundos.",
  },
  {
    question: "Posso usar meu próprio domínio?",
    answer:
      "Hoje sua página fica em bio4dev.com/seuusername. Conexão de domínio customizado chegará nos planos pagos.",
  },
  {
    question: "Quantos projetos posso adicionar?",
    answer:
      "Sem limite. Recomendamos destacar 4-6 para manter foco e conversão nos CTAs.",
  },
  {
    question: "Meu portfólio funciona em dispositivos móveis?",
    answer:
      "Sim. Os templates são mobile-first, com CTA fixo e mídia otimizada para toque.",
  },
];

export function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(faqs[0]?.question ?? null);

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
          <h2 className="font-serif text-[42px] font-normal leading-tight text-[#ece5d9] md:text-[48px]">
            Tudo o que você precisa saber antes de começar
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
                    {isOpen ? "−" : "+"}
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
