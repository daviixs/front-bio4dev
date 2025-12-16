import React from 'react';
import { Github, Instagram, Youtube, Mail, ExternalLink, Code2 } from 'lucide-react';
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

// Template Minimal - Design limpo e profissional
export function Template01({ profile }: TemplateProps) {
  const { legenda, socials, projetos, config } = profile;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-12 text-center">
            {/* Avatar */}
            <div className="mb-8 inline-block">
              <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-slate-100 shadow-lg mx-auto">
                {legenda?.legendaFoto ? (
                  <img
                    src={legenda.legendaFoto}
                    alt={legenda.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <Code2 className="w-12 h-12 text-slate-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Name & Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {legenda?.nome || 'Seu Nome'}
            </h1>
            
            <p className="text-xl text-slate-600 mb-2">
              {legenda?.titulo || 'Desenvolvedor'}
            </p>
            
            {legenda?.subtitulo && (
              <p className="text-slate-500 mb-6">
                {legenda.subtitulo}
              </p>
            )}

            {/* Description */}
            {legenda?.descricao && (
              <p className="text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                {legenda.descricao}
              </p>
            )}

            {/* Stats */}
            {config && (
              <div className="flex justify-center gap-12 py-6 border-y border-slate-100 mb-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-900">{config.stacks}</p>
                  <p className="text-sm text-slate-500">Tecnologias</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-900">{config.projetos}</p>
                  <p className="text-sm text-slate-500">Projetos</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-900">{projetos?.length || 0}</p>
                  <p className="text-sm text-slate-500">Em Destaque</p>
                </div>
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
                    className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all duration-300"
                  >
                    {socialIcons[social.plataforma]}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {projetos && projetos.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
              Projetos em Destaque
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projetos.map((projeto) => (
                <div
                  key={projeto.id}
                  className="group bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden bg-slate-200">
                    {projeto.gif ? (
                      <img
                        src={projeto.gif}
                        alt={projeto.nome}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Code2 className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {projeto.nome}
                    </h3>
                    <p className="text-slate-600 line-clamp-2">
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
      <footer className="py-8 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {legenda?.nome || 'Bio4Dev'}. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

