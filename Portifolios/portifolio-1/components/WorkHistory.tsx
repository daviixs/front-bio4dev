import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';

interface WorkItem {
  company: string;
  period: string;
  summary: string;
  technologies: string[];
  responsibilities: string[];
  impact: string;
}

const workHistory: WorkItem[] = [
  {
    company: "Empresa de E-commerce XPTO",
    period: "2023 - Atual",
    summary: "Desenvolvimento de plataforma de e-commerce escalável para mais de 100 mil usuários ativos. Refatoração completa do frontend para melhorar performance e experiência do usuário.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    responsibilities: [
      "Desenvolvimento de componentes reutilizáveis e escaláveis",
      "Implementação de testes unitários e integração contínua",
      "Otimização de performance e SEO"
    ],
    impact: "Redução de 40% no tempo de carregamento e aumento de 25% na taxa de conversão."
  },
  {
    company: "StartUp FinTech ABC",
    period: "2022 - 2023",
    summary: "Criação de dashboard financeiro para gestão de investimentos e análise de carteiras. Integração com múltiplas APIs bancárias e de mercado financeiro.",
    technologies: ["React", "Next.js", "Tailwind CSS", "GraphQL", "MongoDB"],
    responsibilities: [
      "Arquitetura e desenvolvimento do frontend da aplicação",
      "Integração com APIs de terceiros e tratamento de dados financeiros",
      "Desenvolvimento de gráficos e visualizações de dados em tempo real"
    ],
    impact: "Aplicação lançada com sucesso, atendendo mais de 5 mil usuários nos primeiros 3 meses."
  },
  {
    company: "Agência Digital Criativa",
    period: "2021 - 2022",
    summary: "Desenvolvimento de sites institucionais e landing pages para diversos clientes. Foco em responsividade, acessibilidade e otimização de performance.",
    technologies: ["HTML5", "CSS3", "JavaScript", "WordPress", "Sass", "Git"],
    responsibilities: [
      "Transformação de designs (Figma/Adobe XD) em código responsivo",
      "Implementação de animações e interações complexas",
      "Garantia de compatibilidade cross-browser e acessibilidade"
    ],
    impact: "Entrega de mais de 15 projetos dentro do prazo e orçamento, com taxa de satisfação de clientes acima de 95%."
  }
];

export function WorkHistory() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Título da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Experiência Profissional
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Histórico de projetos e empresas onde apliquei minhas habilidades para criar soluções impactantes
          </p>
        </div>

        {/* Linha do Tempo */}
        <div className="relative">
          {/* Linha vertical central (visível apenas em desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-400"></div>

          {/* Items da timeline */}
          <div className="space-y-12">
            {workHistory.map((work, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Card de conteúdo */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
                  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    {/* Cabeçalho */}
                    <div className="mb-4">
                      <h3 className="text-xl mb-2 text-gray-900">
                        {work.company}
                      </h3>
                      <div className={`flex items-center gap-2 text-sm text-blue-600 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                        <Calendar className="w-4 h-4" />
                        <span>{work.period}</span>
                      </div>
                    </div>

                    {/* Resumo */}
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {work.summary}
                    </p>

                    {/* Tecnologias */}
                    <div className="mb-4">
                      <h4 className="text-sm text-gray-900 mb-2">Tecnologias:</h4>
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                        {work.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Responsabilidades */}
                    <div className="mb-4">
                      <h4 className="text-sm text-gray-900 mb-2">Responsabilidades:</h4>
                      <ul className={`space-y-1 text-sm text-gray-700 ${index % 2 === 0 ? 'list-disc list-inside' : 'md:list-none'}`}>
                        {work.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="leading-relaxed">
                            {index % 2 !== 0 && <span className="md:inline hidden">• </span>}
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Impacto */}
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="text-sm text-gray-900 mb-2">Impacto:</h4>
                      <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                        {work.impact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ícone central (visível apenas em desktop) */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full items-center justify-center shadow-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>

                {/* Espaço vazio do outro lado (apenas desktop) */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicador de início da carreira */}
        <div className="text-center mt-12">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg">
            Início da Jornada
          </div>
        </div>
      </div>
    </section>
  );
}
