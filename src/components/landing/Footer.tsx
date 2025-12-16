import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Linkedin, Code2 } from 'lucide-react';

const footerLinks = {
  produto: {
    title: 'Produto',
    links: [
      { label: 'Recursos', href: '#recursos' },
      { label: 'Templates', href: '#templates' },
      { label: 'Preços', href: '#precos' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  templates: {
    title: 'Templates',
    links: [
      { label: 'Minimal', href: '#' },
      { label: 'Neon', href: '#' },
      { label: 'Creative', href: '#' },
    ],
  },
  conta: {
    title: 'Conta',
    links: [
      { label: 'Criar Conta', href: '/signup' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
  suporte: {
    title: 'Suporte',
    links: [
      { label: 'Central de Ajuda', href: '#' },
      { label: 'Contato', href: '#' },
      { label: 'Documentação', href: '#' },
    ],
  },
};

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-16">
        {/* Top Section */}
        <div className="grid gap-12 border-b border-slate-700 pb-12 lg:grid-cols-5 lg:gap-8 lg:pb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Code2 className="h-7 w-7 text-blue-500" />
              <span className="text-2xl font-bold text-white">
                Bio<span className="text-blue-500">4Dev</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Crie seu portfólio de desenvolvedor em minutos. 
              Mostre seus projetos, conecte suas redes e destaque-se no mercado.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          className="text-sm text-slate-400 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm text-slate-400 transition-colors hover:text-white"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-6 pt-8 lg:flex-row lg:justify-between">
          {/* Copyright */}
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Bio4Dev. Todos os direitos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-slate-500 transition-colors hover:text-white"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

