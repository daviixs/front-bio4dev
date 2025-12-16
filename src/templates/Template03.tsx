import React from 'react';
import { Github, Instagram, Youtube, Mail, ExternalLink, Code2, Star, Rocket, Heart } from 'lucide-react';
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

// Template Creative - Design artístico e único
export function Template03({ profile }: TemplateProps) {
  const { legenda, socials, projetos, config } = profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-fuchsia-950 to-pink-950 text-white">
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
                  {legenda?.nome || 'Seu Nome'}
                </span>
              </h1>

              <p className="text-2xl text-white/70 mb-4">
                {legenda?.titulo || 'Desenvolvedor'}
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
                    { value: config.stacks, label: 'Stacks', emoji: '💻' },
                    { value: config.projetos, label: 'Projetos', emoji: '🚀' },
                    { value: projetos?.length || 0, label: 'Destaques', emoji: '⭐' },
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
                    index % 2 === 0 ? 'md:translate-y-8' : ''
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
      <footer className="py-12 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">{legenda?.nome || 'Bio4Dev'}</span>
          </div>
          <p className="text-white/40 text-sm">
            Feito com 💜 usando Bio4Dev • © {new Date().getFullYear()}
          </p>
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

