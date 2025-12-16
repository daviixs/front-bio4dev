import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/components/ui/utils';

const faqs = [
  {
    question: 'O Bio4Dev é gratuito?',
    answer: 'Sim! Você pode criar sua conta e montar seu portfólio completamente grátis. Oferecemos todos os templates e funcionalidades essenciais sem custo. Futuramente teremos planos premium com recursos extras.',
  },
  {
    question: 'Preciso saber programar para usar?',
    answer: 'Não! O Bio4Dev foi criado para ser simples. Você só precisa preencher suas informações, adicionar seus projetos e escolher um template. Todo o código é gerado automaticamente para você.',
  },
  {
    question: 'Posso usar meu próprio domínio?',
    answer: 'Atualmente sua página fica em bio4dev.com/seuusername. Em breve liberaremos a opção de conectar seu próprio domínio personalizado nos planos premium.',
  },
  {
    question: 'Quantos projetos posso adicionar?',
    answer: 'Você pode adicionar quantos projetos quiser! Não há limite. Recomendamos destacar seus 4-6 melhores projetos para uma apresentação mais impactante.',
  },
  {
    question: 'Meu portfólio funciona em dispositivos móveis?',
    answer: 'Sim! Todos os nossos templates são 100% responsivos e se adaptam perfeitamente a qualquer tamanho de tela, seja desktop, tablet ou smartphone.',
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 lg:px-6">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
            Perguntas Frequentes
          </h2>
        </div>

        {/* FAQ Accordion */}
        <Accordion.Root type="single" collapsible className="flex flex-col">
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="border-t border-slate-200"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-6 text-left lg:py-8">
                  <span className="text-lg font-normal text-blue-600 lg:text-xl">
                    {faq.question}
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180 lg:h-6 lg:w-6" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="pb-6 text-base leading-relaxed text-slate-600 lg:pb-8 lg:text-lg">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}

