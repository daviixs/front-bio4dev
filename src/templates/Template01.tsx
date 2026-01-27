import React from "react";
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Coffee,
  Instagram,
  Youtube,
  FileDown,
  Briefcase,
  Calendar,
} from "lucide-react";
import { TechIcon } from "@/components/portfolio/TechIcon";
import type {
  ProfileComplete,
  Legenda,
  WorkExperience,
  Projeto,
  TechStack as TechStackType,
  Footer as FooterType,
  Social,
} from "@/types";

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
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Imagem de Perfil */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img
              src={
                legenda?.legendaFoto ||
                profile?.avatarUrl ||
                "https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
              }
              alt={legenda?.nome || "Desenvolvedor"}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-2xl"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
          </div>
        </div>

        {/* Saudação */}
        <p className="text-blue-600 mb-4">{legenda?.greeting || "Olá, eu sou"}</p>

        {/* Nome */}
        <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
          {legenda?.nome || "Desenvolvedor"}
        </h1>

        {/* Frase de apresentação */}
        <p className="text-2xl md:text-3xl text-gray-700 mb-8">
          {legenda?.titulo || "Eu construo coisas para web"}
        </p>

        {/* Descrição adicional */}
        <p className="max-w-2xl mx-auto text-gray-600 mb-10">
          {legenda?.descricao ||
            "Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis. Especializado em transformar ideias em aplicações web modernas e funcionais."}
        </p>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projetos"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
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
  { name: "HTML5", icon: "logos:html-5", color: "text-orange-600" },
  { name: "CSS3", icon: "logos:css-3", color: "text-blue-600" },
  { name: "JavaScript", icon: "logos:javascript", color: "text-yellow-500" },
  { name: "React", icon: "logos:react", color: "text-cyan-500" },
  { name: "Node.js", icon: "logos:nodejs-icon", color: "text-green-600" },
  { name: "Tailwind CSS", icon: "logos:tailwindcss-icon", color: "text-teal-500" },
];

function TechStack({ techStack }: TechStackProps) {
  const technologies = techStack?.technologies || DEFAULT_TECHNOLOGIES;

  return (
    <section id="tech-stack" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
            {techStack?.title || "Tech Stack"}
          </h2>
          <p className="text-gray-600">
            {techStack?.subtitle || "Tecnologias e ferramentas que utilizo no dia a dia"}
          </p>
        </div>

        {/* Grade de tecnologias */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {technologies.map((tech: any, index: number) => (
            <div
              key={tech.id || index}
              className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer group"
            >
              <div className={`${tech.color || "text-gray-700"} mb-3 group-hover:scale-110 transition-transform`}>
                <TechIcon icon={tech.icon} size={40} />
              </div>
              <span className="text-gray-700">{tech.name}</span>
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
    company: "Empresa de E-commerce XPTO",
    period: "2023 - Atual",
    summary: "Desenvolvimento de plataforma de e-commerce escalável.",
    technologies: [{ technology: "React" }, { technology: "TypeScript" }, { technology: "Node.js" }],
    responsibilities: [{ responsibility: "Desenvolvimento de componentes reutilizáveis" }],
    impact: "Redução de 40% no tempo de carregamento.",
  },
];

function WorkHistory({ workHistory }: WorkHistoryProps) {
  const displayWorkHistory = workHistory?.length ? workHistory : DEFAULT_WORK_HISTORY;

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Título da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
            Experiência Profissional
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Histórico de projetos e empresas onde apliquei minhas habilidades
          </p>
        </div>

        {/* Linha do Tempo */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-400"></div>

          <div className="space-y-12">
            {displayWorkHistory.map((work: any, index: number) => (
              <div
                key={work.id || index}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "" : "md:text-right"}`}>
                  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="mb-4">
                      <h3 className="text-xl mb-2 text-gray-900 font-semibold">{work.company}</h3>
                      <div className={`flex items-center gap-2 text-sm text-blue-600 ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                        <Calendar className="w-4 h-4" />
                        <span>{work.period}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{work.summary}</p>

                    {work.technologies?.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm text-gray-900 mb-2 font-medium">Tecnologias:</h4>
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                          {work.technologies.map((tech: any, techIndex: number) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm"
                            >
                              {typeof tech === "string" ? tech : tech.technology}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {work.impact && (
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-sm text-gray-900 mb-2 font-medium">Impacto:</h4>
                        <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">{work.impact}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full items-center justify-center shadow-lg">
                  <Briefcase className="w-6 h-6 text-white" />
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
    nome: "E-commerce Moderno",
    descricao: "Plataforma completa de e-commerce com carrinho e pagamentos.",
    gif: "https://picsum.photos/seed/project1/800/450",
    demoLink: "#",
    codeLink: "#",
  },
  {
    nome: "Dashboard Analytics",
    descricao: "Dashboard interativo para visualização de dados.",
    gif: "https://picsum.photos/seed/project2/800/450",
    demoLink: "#",
    codeLink: "#",
  },
];

function Projects({ projects }: ProjectsProps) {
  const displayProjects = projects?.length ? projects : DEFAULT_PROJECTS;

  return (
    <section id="projetos" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
            Projetos
          </h2>
          <p className="text-gray-600">Alguns dos meus trabalhos recentes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project: any, index: number) => (
            <div
              key={project.id || index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden h-56 bg-gradient-to-br from-blue-100 to-purple-100">
                <img
                  src={project.gif || "https://picsum.photos/seed/default/800/450"}
                  alt={project.nome}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-gray-800 text-xl font-semibold">{project.nome}</h3>
                <p className="text-gray-600 mb-6">{project.descricao}</p>

                <div className="flex gap-4">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
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

const socialIconMap: Record<string, React.ReactNode> = {
  github: <Github size={24} />,
  linkedin: <Linkedin size={24} />,
  twitter: <Twitter size={24} />,
  instagram: <Instagram size={24} />,
  youtube: <Youtube size={24} />,
};

function Footer({ footer, socials }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerSocials = [
    footer?.github && { href: footer.github, label: "GitHub", icon: <Github size={24} /> },
    footer?.linkedin && { href: footer.linkedin, label: "LinkedIn", icon: <Linkedin size={24} /> },
    footer?.twitter && { href: footer.twitter, label: "Twitter", icon: <Twitter size={24} /> },
    footer?.email && { href: `mailto:${footer.email}`, label: "Email", icon: <Mail size={24} /> },
  ].filter(Boolean) as Array<{ href: string; label: string; icon: React.ReactNode }>;

  const legacySocials =
    socials?.map((social) => ({
      href: social.url,
      label: social.plataforma,
      icon: socialIconMap[social.plataforma.toLowerCase()] || <Mail size={24} />,
      id: social.id,
    })) || [];

  const socialLinks = footerSocials.length > 0 ? footerSocials : legacySocials;

  return (
    <footer
      id="contato"
      className="py-12 px-6 transition-colors duration-300"
      style={{ backgroundColor: "#09090b", color: "#ffffff" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl mb-4 font-bold">{footer?.title || "Vamos trabalhar juntos?"}</h2>
          <p className="text-gray-400 mb-8">
            {footer?.subtitle || "Estou sempre aberto a novos projetos e oportunidades"}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {footer?.email && (
              <a
                href={`mailto:${footer.email}`}
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg"
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
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FileDown size={20} />
                Baixe meu Currículo
              </a>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
          {!socialLinks.length && (
            <>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </>
          )}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} {footer?.copyrightName || "Desenvolvedor"}. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              {footer?.madeWith || (
                <>
                  Feito com <span className="text-blue-500">❤️</span> e
                  <Coffee size={18} className="text-yellow-600" />
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
    <div className="min-h-screen bg-white">
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
