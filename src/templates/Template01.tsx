import React from 'react';
import {
  ExternalLink,
  Github,
  Mail,
  Coffee,
  FileDown,
  Briefcase,
  Calendar,
} from 'lucide-react';
import type { IconType } from 'react-icons';
import { TechIcon } from '@/components/portfolio/TechIcon';
import { getSocialIconComponent } from '@/lib/socialIcons';
import { template01Theme } from '@/theme/template01Theme';
import type {
  ProfileComplete,
  Legenda,
  WorkExperience,
  Projeto,
  TechStack as TechStackType,
  Footer as FooterType,
  Social,
} from '@/types';

// ==========================================
// TYPES
// ==========================================

interface TemplateProps {
  profile: ProfileComplete;
}

// ==========================================
// HERO COMPONENT
// ==========================================

interface HeroProps {
  profile?: ProfileComplete;
  legenda?: Legenda;
}

function Hero({ profile, legenda }: HeroProps) {
  return (
    <section
      className={`min-h-screen flex items-center justify-center px-6 py-20 ${template01Theme.pageBg}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Imagem de Perfil */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img
              src={
                legenda?.legendaFoto ||
                profile?.avatarUrl ||
                'https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
              }
              alt={legenda?.nome || 'Desenvolvedor'}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-[#a69b98] shadow-[0_24px_48px_-28px_rgba(74,65,62,0.6)]"
            />
            <div className="absolute inset-0 -z-10 rounded-full bg-[#a69b98]"></div>
          </div>
        </div>

        {/* Saudação */}
        <p className={`${template01Theme.textSecondary} mb-4`}>
          {legenda?.greeting || 'Olá, eu sou'}
        </p>

        {/* Nome */}
        <h1
          className={`text-5xl md:text-7xl mb-6 font-bold ${template01Theme.textPrimary}`}
        >
          {legenda?.nome || 'Desenvolvedor'}
        </h1>

        {/* Frase de apresentação */}
        <p className={`text-2xl md:text-3xl mb-8 ${template01Theme.textSecondary}`}>
          {legenda?.titulo || 'Eu construo coisas para web'}
        </p>

        {/* Descrição adicional */}
        <p className={`max-w-2xl mx-auto mb-10 ${template01Theme.textMuted}`}>
          {legenda?.descricao ||
            'Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis. Especializado em transformar ideias em aplicações web modernas e funcionais.'}
        </p>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projetos"
            className={`px-8 py-3 rounded-lg transition-all hover:shadow-xl hover:scale-105 ${template01Theme.primaryButton}`}
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className={`px-8 py-3 rounded-lg transition-all hover:shadow-xl hover:scale-105 ${template01Theme.secondaryButton}`}
          >
            Entre em Contato
          </a>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// TECH STACK COMPONENT
// ==========================================

interface TechStackProps {
  techStack?: TechStackType;
}

const DEFAULT_TECHNOLOGIES = [
  { name: 'HTML5', icon: 'logos:html-5' },
  { name: 'CSS3', icon: 'logos:css-3' },
  { name: 'JavaScript', icon: 'logos:javascript' },
  { name: 'React', icon: 'logos:react' },
  { name: 'Node.js', icon: 'logos:nodejs-icon' },
  {
    name: 'Tailwind CSS',
    icon: 'logos:tailwindcss-icon',
  },
];

function TechStack({ techStack }: TechStackProps) {
  const technologies = techStack?.technologies || DEFAULT_TECHNOLOGIES;

  return (
    <section id="tech-stack" className={`py-20 px-6 ${template01Theme.sectionAlt}`}>
      <div className="max-w-6xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl mb-4 font-bold ${template01Theme.textPrimary}`}
          >
            Tech Stack
          </h2>
          <p className={template01Theme.textSecondary}>
            {techStack?.subtitle ||
              'Tecnologias e ferramentas que utilizo no dia a dia'}
          </p>
        </div>

        {/* Grade de tecnologias */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {technologies.map((tech: any, index: number) => (
            <div
              key={tech.id || index}
              className={`flex flex-col items-center justify-center p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer group ${template01Theme.cardAlt}`}
            >
              <div
                className={`mb-3 transition-all group-hover:scale-110 group-hover:text-[#4a413e] text-[#695f5c]`}
              >
                <TechIcon icon={tech.icon} size={40} />
              </div>
              <span className={template01Theme.textPrimary}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// WORK HISTORY COMPONENT
// ==========================================

interface WorkHistoryProps {
  workHistory?: WorkExperience[];
}

const DEFAULT_WORK_HISTORY = [
  {
    company: 'Empresa de E-commerce XPTO',
    period: '2023 - Atual',
    summary: 'Desenvolvimento de plataforma de e-commerce escalável.',
    technologies: [
      { technology: 'React' },
      { technology: 'TypeScript' },
      { technology: 'Node.js' },
    ],
    responsibilities: [
      { responsibility: 'Desenvolvimento de componentes reutilizáveis' },
    ],
    impact: 'Redução de 40% no tempo de carregamento.',
  },
];

function WorkHistory({ workHistory }: WorkHistoryProps) {
  const displayWorkHistory = workHistory?.length
    ? workHistory
    : DEFAULT_WORK_HISTORY;

  return (
    <section className={`py-20 px-6 ${template01Theme.sectionGradient}`}>
      <div className="max-w-6xl mx-auto">
        {/* Título da Seção */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl mb-4 font-bold ${template01Theme.textPrimary}`}>
            Experiência Profissional
          </h2>
          <p className={`max-w-2xl mx-auto ${template01Theme.textSecondary}`}>
            Histórico de projetos e empresas onde apliquei minhas habilidades
          </p>
        </div>

        {/* Linha do Tempo */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#887d7a]"></div>

          <div className="space-y-12">
            {displayWorkHistory.map((work: any, index: number) => (
              <div
                key={work.id || index}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div
                  className={`w-full md:w-5/12 ${index % 2 === 0 ? '' : 'md:text-right'}`}
                >
                  <div
                    className={`rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 shadow-[0_22px_44px_-28px_rgba(74,65,62,0.45)] ${template01Theme.card}`}
                  >
                    <div className="mb-4">
                      <h3
                        className={`text-xl mb-2 font-semibold ${template01Theme.textPrimary}`}
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

                    <p className={`mb-4 leading-relaxed ${template01Theme.textSecondary}`}>
                      {work.summary}
                    </p>

                    {work.technologies?.length > 0 && (
                      <div className="mb-4">
                        <h4
                          className={`text-sm mb-2 font-medium ${template01Theme.textPrimary}`}
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
                    )}

                    {work.impact && (
                      <div className={`pt-4 border-t ${template01Theme.divider}`}>
                        <h4
                          className={`text-sm mb-2 font-medium ${template01Theme.textPrimary}`}
                        >
                          Impacto:
                        </h4>
                        <p className={`text-sm p-3 rounded-lg ${template01Theme.impact}`}>
                          {work.impact}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#a69b98] rounded-full items-center justify-center shadow-[0_18px_36px_-24px_rgba(74,65,62,0.55)] border border-[#887d7a]">
                  <Briefcase className="w-6 h-6 text-[#4a413e]" />
                </div>

                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// PROJECTS COMPONENT
// ==========================================

interface ProjectsProps {
  projects?: Projeto[];
}

const DEFAULT_PROJECTS = [
  {
    nome: 'E-commerce Moderno',
    descricao: 'Plataforma completa de e-commerce com carrinho e pagamentos.',
    gif: 'https://picsum.photos/seed/project1/800/450',
    demoLink: '#',
    codeLink: '#',
  },
  {
    nome: 'Dashboard Analytics',
    descricao: 'Dashboard interativo para visualização de dados.',
    gif: 'https://picsum.photos/seed/project2/800/450',
    demoLink: '#',
    codeLink: '#',
  },
];

function Projects({ projects }: ProjectsProps) {
  const displayProjects = projects?.length ? projects : DEFAULT_PROJECTS;

  return (
    <section
      id="projetos"
      className={`py-20 px-6 ${template01Theme.sectionGradientAlt}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl mb-4 font-bold ${template01Theme.textPrimary}`}
          >
            Projetos
          </h2>
          <p className={template01Theme.textSecondary}>
            Alguns dos meus trabalhos recentes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project: any, index: number) => (
            <div
              key={project.id || index}
              className={`rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 group shadow-[0_24px_48px_-28px_rgba(74,65,62,0.45)] ${template01Theme.card}`}
            >
              <div className="relative overflow-hidden h-56 bg-[#a69b98]">
                <img
                  src={
                    project.gif || 'https://picsum.photos/seed/default/800/450'
                  }
                  alt={project.nome}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${template01Theme.projectOverlay} opacity-0 group-hover:opacity-100 transition-opacity`}
                ></div>
              </div>

              <div className="p-6">
                <h3
                  className={`mb-3 text-xl font-semibold ${template01Theme.textPrimary}`}
                >
                  {project.nome}
                </h3>
                <p className={`mb-6 ${template01Theme.textSecondary}`}>
                  {project.descricao}
                </p>

                <div className="flex gap-4">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${template01Theme.primaryButton}`}
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#695f5c] text-[#c5b9b7] rounded-lg hover:bg-[#4a413e] transition-colors shadow-[0_20px_40px_-24px_rgba(74,65,62,0.55)]"
                    >
                      <Github size={18} />
                      Ver Código
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// FOOTER COMPONENT
// ==========================================

interface FooterProps {
  footer?: FooterType;
  socials?: Social[];
}

function Footer({ footer, socials }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerSocials = [
    footer?.github && {
      href: footer.github,
      label: 'GitHub',
      icon: getSocialIconComponent('github'),
    },
    footer?.linkedin && {
      href: footer.linkedin,
      label: 'LinkedIn',
      icon: getSocialIconComponent('linkedin'),
    },
    footer?.twitter && {
      href: footer.twitter,
      label: 'Twitter',
      icon: getSocialIconComponent('twitter'),
    },
    footer?.email && {
      href: `mailto:${footer.email}`,
      label: 'Email',
      icon: getSocialIconComponent('email'),
    },
  ].filter(Boolean) as Array<{
    href: string;
    label: string;
    icon: IconType;
  }>;

  const legacySocials =
    socials?.map((social) => ({
      href: social.url,
      label: social.plataforma,
      icon: getSocialIconComponent(social.plataforma),
      id: social.id,
    })) || [];

  const socialLinks = footerSocials.length > 0 ? footerSocials : legacySocials;

  return (
    <footer
      id="contato"
      className={`py-12 px-6 transition-colors duration-300 ${template01Theme.footerBg}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl mb-4 font-bold">
            {footer?.title || 'Vamos trabalhar juntos?'}
          </h2>
          <p className={`mb-8 ${template01Theme.footerSecondary}`}>
            {footer?.subtitle ||
              'Estou sempre aberto a novos projetos e oportunidades'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {footer?.email && (
              <a
                href={`mailto:${footer.email}`}
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg transition-all ${template01Theme.footerButton}`}
              >
                <Mail size={20} />
                {footer.email}
              </a>
            )}
            {footer?.resumeUrl && (
              <a
                href={footer.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg transition-all hover:shadow-xl hover:scale-105 ${template01Theme.footerButton}`}
              >
                <FileDown size={20} />
                Baixe meu Currículo
              </a>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors hover:scale-110 ${template01Theme.socialSurface}`}
                aria-label={social.label}
              >
                <Icon size={24} />
              </a>
            );
          })}
          {!socialLinks.length && (
            <>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors hover:scale-110 ${template01Theme.socialSurface}`}
                aria-label="GitHub"
              >
                {React.createElement(getSocialIconComponent('github'), {
                  size: 24,
                })}
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors hover:scale-110 ${template01Theme.socialSurface}`}
                aria-label="LinkedIn"
              >
                {React.createElement(getSocialIconComponent('linkedin'), {
                  size: 24,
                })}
              </a>
            </>
          )}
        </div>

        <div className={`border-t pt-8 ${template01Theme.divider}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`${template01Theme.footerSecondary} text-center md:text-left`}>
              © {currentYear} {footer?.copyrightName || 'Desenvolvedor'}. Todos
              os direitos reservados.
            </p>
            <p className={`${template01Theme.footerSecondary} flex items-center gap-2`}>
              {footer?.madeWith || (
                <>
                  Feito com <span className="text-[#c5b9b7]">❤️</span> e
                  <Coffee size={18} className="text-[#a69b98]" />
                  café
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// MAIN TEMPLATE COMPONENT
// ==========================================

export function Template01({ profile }: TemplateProps) {
  const legenda = profile.legendas?.[0];

  return (
    <div className={`min-h-screen ${template01Theme.pageBg}`}>
      {/* Hero Section */}
      <Hero profile={profile} legenda={legenda} />

      {/* Tech Stack Section */}
      <TechStack techStack={profile.techStack} />

      {/* Work History Section */}
      <WorkHistory workHistory={profile.workHistory} />

      {/* Projects Section */}
      <Projects projects={profile.projetos} />

      {/* Footer Section */}
      <Footer footer={profile.footer} socials={profile.social} />
    </div>
  );
}
