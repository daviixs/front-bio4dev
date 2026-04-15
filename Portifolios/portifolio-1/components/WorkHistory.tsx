import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { template01Theme } from '@/theme/template01Theme';
import { WorkExperience } from '@/types';

interface WorkHistoryProps {
  workHistory?: WorkExperience[];
}

export function WorkHistory({ workHistory: apiWorkHistory }: WorkHistoryProps) {
  const displayWorkHistory = apiWorkHistory || [
    {
      company: 'Empresa de E-commerce XPTO',
      period: '2023 - Atual',
      summary:
        'Desenvolvimento de plataforma de e-commerce escalável para mais de 100 mil usuários ativos. Refatoração completa do frontend para melhorar performance e experiência do usuário.',
      technologies: [
        { technology: 'React' },
        { technology: 'TypeScript' },
        { technology: 'Node.js' },
        { technology: 'PostgreSQL' },
        { technology: 'AWS' },
        { technology: 'Docker' },
      ],
      responsibilities: [
        {
          responsibility:
            'Desenvolvimento de componentes reutilizáveis e escaláveis',
        },
        {
          responsibility:
            'Implementação de testes unitários e integração contínua',
        },
        { responsibility: 'Otimização de performance e SEO' },
      ],
      impact:
        'Redução de 40% no tempo de carregamento e aumento de 25% na taxa de conversão.',
    },
    {
      company: 'StartUp FinTech ABC',
      period: '2022 - 2023',
      summary:
        'Criação de dashboard financeiro para gestão de investimentos e análise de carteiras. Integração com múltiplas APIs bancárias e de mercado financeiro.',
      technologies: [
        { technology: 'React' },
        { technology: 'Next.js' },
        { technology: 'Tailwind CSS' },
        { technology: 'GraphQL' },
        { technology: 'MongoDB' },
      ],
      responsibilities: [
        {
          responsibility:
            'Arquitetura e desenvolvimento do frontend da aplicação',
        },
        {
          responsibility:
            'Integração com APIs de terceiros e tratamento de dados financeiros',
        },
        {
          responsibility:
            'Desenvolvimento de gráficos e visualizações de dados em tempo real',
        },
      ],
      impact:
        'Aplicação lançada com sucesso, atendendo mais de 5 mil usuários nos primeiros 3 meses.',
    },
    {
      company: 'Agência Digital Criativa',
      period: '2021 - 2022',
      summary:
        'Desenvolvimento de sites institucionais e landing pages para diversos clientes. Foco em responsividade, acessibilidade e otimização de performance.',
      technologies: [
        { technology: 'HTML5' },
        { technology: 'CSS3' },
        { technology: 'JavaScript' },
        { technology: 'WordPress' },
        { technology: 'Sass' },
        { technology: 'Git' },
      ],
      responsibilities: [
        {
          responsibility:
            'Transformação de designs (Figma/Adobe XD) em código responsivo',
        },
        { responsibility: 'Implementação de animações e interações complexas' },
        {
          responsibility:
            'Garantia de compatibilidade cross-browser e acessibilidade',
        },
      ],
      impact:
        'Entrega de mais de 15 projetos dentro do prazo e orçamento, com taxa de satisfação de clientes acima de 95%.',
    },
  ];

  return (
    <section className={`py-20 px-6 ${template01Theme.sectionGradient}`}>
      <div className="max-w-6xl mx-auto">
        {/* Título da Seção */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl mb-4 ${template01Theme.textPrimary}`}
          >
            Experiência Profissional
          </h2>
          <p className={`max-w-2xl mx-auto ${template01Theme.textSecondary}`}>
            Histórico de projetos e empresas onde apliquei minhas habilidades
            para criar soluções impactantes
          </p>
        </div>

        {/* Linha do Tempo */}
        <div className="relative">
          {/* Linha vertical central (visível apenas em desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#887d7a]"></div>

          {/* Items da timeline */}
          <div className="space-y-12">
            {displayWorkHistory.map((work: any, index: number) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Card de conteúdo */}
                <div
                  className={`w-full md:w-5/12 ${index % 2 === 0 ? '' : 'md:text-right'}`}
                >
                  <div
                    className={`rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 shadow-[0_22px_44px_-28px_rgba(74,65,62,0.45)] ${template01Theme.card}`}
                  >
                    {/* Cabeçalho */}
                    <div className="mb-4">
                      <h3
                        className={`text-xl mb-2 ${template01Theme.textPrimary}`}
                      >
                        {work.company}
                      </h3>
                      <div
                        className={`flex items-center gap-2 text-sm ${template01Theme.textSecondary} ${index % 2 === 0 ? '' : 'md:justify-end'}`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{work.period}</span>
                      </div>
                    </div>

                    {/* Resumo */}
                    <p
                      className={`mb-4 leading-relaxed ${template01Theme.textSecondary}`}
                    >
                      {work.summary}
                    </p>

                    {/* Tecnologias */}
                    <div className="mb-4">
                      <h4
                        className={`text-sm mb-2 ${template01Theme.textPrimary}`}
                      >
                        Tecnologias:
                      </h4>
                      <div
                        className={`flex flex-wrap gap-2 ${index % 2 === 0 ? '' : 'md:justify-end'}`}
                      >
                        {work.technologies.map(
                          (tech: any, techIndex: number) => (
                            <span
                              key={techIndex}
                              className={`px-3 py-1 rounded-full text-sm ${template01Theme.chip}`}
                            >
                              {typeof tech === 'string'
                                ? tech
                                : tech.technology}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Responsabilidades */}
                    <div className="mb-4">
                      <h4
                        className={`text-sm mb-2 ${template01Theme.textPrimary}`}
                      >
                        Responsabilidades:
                      </h4>
                      <ul
                        className={`space-y-1 text-sm ${template01Theme.textSecondary} ${index % 2 === 0 ? 'list-disc list-inside' : 'md:list-none'}`}
                      >
                        {work.responsibilities.map(
                          (resp: any, respIndex: number) => (
                            <li key={respIndex} className="leading-relaxed">
                              {index !== 0 && (
                                <span className="md:inline hidden">• </span>
                              )}
                              {typeof resp === 'string'
                                ? resp
                                : resp.responsibility}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    {/* Impacto */}
                    <div className={`pt-4 border-t ${template01Theme.divider}`}>
                      <h4 className={`text-sm mb-2 ${template01Theme.textPrimary}`}>
                        Impacto:
                      </h4>
                      <p
                        className={`text-sm p-3 rounded-lg ${template01Theme.impact}`}
                      >
                        {work.impact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ícone central (visível apenas em desktop) */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#a69b98] rounded-full items-center justify-center shadow-[0_18px_36px_-24px_rgba(74,65,62,0.55)] border border-[#887d7a]">
                  <Briefcase className="w-6 h-6 text-[#4a413e]" />
                </div>

                {/* Espaço vazio do outro lado (apenas desktop) */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>

          {/* Indicador de início da carreira */}
          <div className="text-center mt-12">
            <div
              className={`inline-block px-6 py-3 rounded-full ${template01Theme.primaryButton}`}
            >
              Início da Jornada
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
