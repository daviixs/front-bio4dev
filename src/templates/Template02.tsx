import { Github, Instagram, Youtube, Mail, ExternalLink, Code2, Sparkles, Zap, Briefcase, BookOpen } from 'lucide-react';
import { TechIcon } from '@/components/portfolio/TechIcon';
import type { ProfileComplete } from '@/types';

interface TemplateProps {
  profile: ProfileComplete;
}

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  youtube: <Youtube className="w-5 h-5" />,
  tiktok: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  ),
};

// Template Neon - Moderno e vibrante
export function Template02({ profile }: TemplateProps) {
  const legenda = profile.legendas?.[0];
  const socials = profile.social;
  const { projetos, config } = profile;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-white/70">Desenvolvedor</span>
          </div>

          {/* Avatar */}
          <div className="mb-8">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0f]">
                  {legenda?.legendaFoto ? (
                    <img
                      src={legenda.legendaFoto}
                      alt={legenda.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <Code2 className="w-16 h-16 text-white/30" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              {legenda?.nome?.split(' ')[0] || 'Seu'}
            </span>{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {legenda?.nome?.split(' ').slice(1).join(' ') || 'Nome'}
            </span>
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl text-white/60 mb-4">
            {legenda?.titulo || 'Desenvolvedor'}
          </p>
          
          {legenda?.subtitulo && (
            <p className="text-lg text-emerald-400 mb-8">
              {legenda.subtitulo}
            </p>
          )}

          {/* Description */}
          {legenda?.descricao && (
            <p className="text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
              {legenda.descricao}
            </p>
          )}

          {/* Stats */}
          {config && (
            <div className="flex justify-center gap-8 md:gap-16 mb-12">
              {[
                { value: config.stacks, label: 'Tecnologias' },
                { value: config.projetos, label: 'Projetos' },
                { value: projetos?.length || 0, label: 'Em Destaque' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}+
                  </p>
                  <p className="text-sm text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Social Links */}
          {socials && socials.length > 0 && (
            <div className="flex justify-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300 hover:scale-110"
                >
                  {socialIcons[social.plataforma]}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tech Stack Section */}
      {profile.techStack?.technologies && profile.techStack.technologies.length > 0 && (
        <section className="py-20 px-6 relative border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white/70">Skills</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Tecnologias
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {profile.techStack.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 group text-center"
                >
                  <div className="mb-3 flex justify-center group-hover:scale-110 transition-transform">
                    <TechIcon icon={tech.icon} size={32} className="text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {profile.workHistory && profile.workHistory.length > 0 && (
        <section className="py-20 px-6 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white/70">Journey</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Experiência
                </span>
              </h2>
            </div>

            <div className="space-y-8">
              {profile.workHistory.map((work, index) => (
                <div
                  key={index}
                  className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-emerald-500 before:to-transparent"
                >
                  <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {work.summary}
                        </h3>
                        <p className="text-emerald-400 font-medium">
                          {work.company}
                        </p>
                      </div>
                      <span className="text-sm text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/10 h-fit">
                        {work.period}
                      </span>
                    </div>
                    {work.impact && (
                      <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {work.impact}
                      </p>
                    )}
                    {work.technologies && work.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {work.technologies.map((tech: any, i: number) => (
                          <span
                            key={i}
                            className="text-[10px] uppercase tracking-wider font-bold text-emerald-400/70 py-1 px-2 rounded border border-emerald-500/20 bg-emerald-500/5"
                          >
                            {tech.technology}
                          </span>
                        ))}
                      </div>
                    )}
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white/70">Portfolio</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Projetos
                </span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projetos.map((projeto, index) => (
                <div
                  key={projeto.id}
                  className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20" />
                    {projeto.gif ? (
                      <img
                        src={projeto.gif}
                        alt={projeto.nome}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code2 className="w-16 h-16 text-white/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 relative">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {projeto.nome}
                    </h3>
                    <p className="text-white/50 text-sm line-clamp-2">
                      {projeto.descricao}
                    </p>
                  </div>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] -z-10" />
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Code2 className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                {legenda?.nome || profile.username}
              </span>
            </div>

            {profile.footer && (
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold mb-2">{profile.footer.title}</h3>
                <p className="text-white/50 mb-6">{profile.footer.subtitle}</p>
                {profile.footer.email && (
                  <a
                    href={`mailto:${profile.footer.email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Vamos Conversar
                  </a>
                )}
              </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-between w-full pt-12 border-t border-white/5 gap-4">
              <p className="text-white/30 text-sm">
                © {new Date().getFullYear()} • {profile.footer?.copyrightName || legenda?.nome || profile.username}
              </p>
              <p className="text-white/30 text-sm flex items-center gap-1">
                {profile.footer?.madeWith || 'Feito com 💚 usando Bio4Dev'}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

