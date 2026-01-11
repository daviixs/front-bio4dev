import {
  Github,
  Instagram,
  Youtube,
  Mail,
  ExternalLink,
  Code2,
  Star,
  Rocket,
  Heart,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { TechIcon } from "@/components/portfolio/TechIcon";
import { ResumeButton } from "@/components/portfolio/ResumeButton";
import type { ProfileComplete } from "@/types";

interface TemplateProps {
  profile: ProfileComplete;
}

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  youtube: <Youtube className="w-5 h-5" />,
  tiktok: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
};

// Template Creative - Design artístico e único
export function Template03({ profile }: TemplateProps) {
  const legenda = profile.legendas?.[0];
  const socials = profile.social;
  const { projetos, config } = profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-fuchsia-950 to-pink-950 text-white">
      {/* Botão de Download do Currículo - Fixo no Topo */}
      <ResumeButton
        resumeUrl={profile.footer?.resumeUrl}
        className="from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
      />
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Floating Shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-[100px] animate-blob" />
          <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-pink-500/30 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-fuchsia-500/30 rounded-full blur-[100px] animate-blob animation-delay-4000" />
        </div>

        {/* Stars Effect */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="relative order-2 md:order-1">
              <div className="relative w-80 h-80 mx-auto">
                {/* Decorative Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-spin-slow" />
                <div className="absolute inset-4 rounded-full border-2 border-pink-500/30 animate-spin-slow-reverse" />
                <div className="absolute inset-8 rounded-full border border-fuchsia-500/30" />

                {/* Main Image */}
                <div className="absolute inset-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    {legenda?.legendaFoto ? (
                      <img
                        src={legenda.legendaFoto}
                        alt={legenda.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-900/50 flex items-center justify-center">
                        <Code2 className="w-16 h-16 text-white/30" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating Icons */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-float">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/30 animate-float animation-delay-2000">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 md:order-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <Heart className="w-4 h-4 text-pink-400" />
                <span className="text-sm text-white/80">Olá! Eu sou</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {legenda?.nome || "Seu Nome"}
                </span>
              </h1>

              <p className="text-2xl text-white/70 mb-4">
                {legenda?.titulo || "Desenvolvedor"}
              </p>

              {legenda?.subtitulo && (
                <p className="text-lg text-pink-400 mb-6">
                  ✨ {legenda.subtitulo}
                </p>
              )}

              {legenda?.descricao && (
                <p className="text-white/50 mb-8 leading-relaxed max-w-md">
                  {legenda.descricao}
                </p>
              )}

              {/* Stats Pills */}
              {config && (
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
                  {[
                    { value: config.stacks, label: "Stacks", emoji: "💻" },
                    { value: config.projetos, label: "Projetos", emoji: "🚀" },
                    {
                      value: projetos?.length || 0,
                      label: "Destaques",
                      emoji: "⭐",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                    >
                      <span className="mr-2">{stat.emoji}</span>
                      <span className="font-bold text-white">{stat.value}</span>
                      <span className="text-white/50 ml-1">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Social Links */}
              {socials && socials.length > 0 && (
                <div className="flex gap-3 justify-center md:justify-start">
                  {socials.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                    >
                      {socialIcons[social.plataforma]}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      {profile.techStack?.technologies &&
        profile.techStack.technologies.length > 0 && (
          <section className="py-24 px-6 relative overflow-hidden">
            {/* Decorative Background for Section */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <span className="text-5xl mb-4 block animate-bounce">⚡</span>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Minhas Ferramentas
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {profile.techStack.technologies.map((tech, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                    <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 transition-all duration-500">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                        <TechIcon
                          icon={tech.icon}
                          size={32}
                          className="text-pink-400"
                        />
                      </div>
                      <span className="text-sm font-bold text-white/70 group-hover:text-white">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* Journey/Experience Section */}
      {profile.workHistory && profile.workHistory.length > 0 && (
        <section className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-5xl mb-4 block">🧗</span>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                Minha Jornada
              </h2>
            </div>

            <div className="space-y-12">
              {profile.workHistory.map((work, index) => (
                <div key={index} className="relative group lg:flex gap-8 group">
                  {/* Timeline element */}
                  <div className="hidden lg:block w-32 pt-2 text-right">
                    <span className="text-sm font-bold text-pink-400/60 uppercase tracking-widest block">
                      {work.period}
                    </span>
                  </div>

                  <div className="relative flex-1">
                    {/* Floating Glow */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative p-8 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 hover:border-pink-500/30 transition-colors">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shrink-0">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white leading-tight">
                            {work.summary}
                          </h3>
                          <div className="flex items-center gap-2 text-pink-400 font-medium">
                            <span>{work.company}</span>
                            <span className="lg:hidden text-white/30">
                              • {work.period}
                            </span>
                          </div>
                        </div>
                      </div>

                      {work.impact && (
                        <p className="text-white/60 mb-6 leading-relaxed">
                          {work.impact}
                        </p>
                      )}

                      {work.technologies && work.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {work.technologies.map((tech: any, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full text-xs font-bold border border-white/10 bg-white/5 text-white/60"
                            >
                              {tech.technology}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projetos && projetos.length > 0 && (
        <section className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-5xl mb-4 block">🎨</span>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                Meus Projetos
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projetos.map((projeto, index) => (
                <div
                  key={projeto.id}
                  className={`group relative rounded-3xl overflow-hidden ${
                    index % 2 === 0 ? "md:translate-y-8" : ""
                  }`}
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-all duration-500" />

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-purple-500/50 transition-colors duration-500" />

                  {/* Image */}
                  <div className="h-56 overflow-hidden relative">
                    {projeto.gif ? (
                      <img
                        src={projeto.gif}
                        alt={projeto.nome}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-800/50 to-pink-800/50 flex items-center justify-center">
                        <Code2 className="w-16 h-16 text-white/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative p-6 -mt-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-sm mb-3">
                      <Star className="w-3 h-3" />
                      Projeto
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                      {projeto.nome}
                    </h3>
                    <p className="text-white/50 line-clamp-2">
                      {projeto.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-24 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-xl shadow-purple-500/20 animate-float">
                <Code2 className="w-7 h-7 text-white" />
              </div>
              <span className="font-bold text-3xl tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {legenda?.nome || profile.username}
              </span>
            </div>

            {profile.footer && (
              <div className="mb-16 max-w-2xl">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {profile.footer.title}
                </h3>
                <p className="text-white/60 text-lg mb-8 leading-relaxed">
                  {profile.footer.subtitle}
                </p>
                {profile.footer.email && (
                  <a
                    href={`mailto:${profile.footer.email}`}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-purple-950 font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-white/10"
                  >
                    <Mail className="w-5 h-5" />
                    Entrar em Contato
                    <div className="absolute inset-0 rounded-2xl bg-white blur-md -z-10 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
              </div>
            )}

            <div className="w-full pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <span>© {new Date().getFullYear()}</span>
                <span>•</span>
                <span>
                  {profile.footer?.copyrightName ||
                    legenda?.nome ||
                    profile.username}
                </span>
              </div>

              <p className="text-white/40 text-sm flex items-center gap-2">
                <span>
                  {profile.footer?.madeWith || "Feito com 💜 usando Bio4Dev"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animate-twinkle { animation: twinkle 3s infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 15s linear infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
