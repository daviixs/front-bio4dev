import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { template01Theme } from '@/theme/template01Theme';
import { Footer as FooterType, Social } from '@/types';

interface FooterProps {
  footer?: FooterType;
  socials?: Social[];
}

export function Footer({ footer }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    footer?.github && {
      href: footer.github,
      label: 'GitHub',
      icon: <Github size={24} />,
    },
    footer?.linkedin && {
      href: footer.linkedin,
      label: 'LinkedIn',
      icon: <Linkedin size={24} />,
    },
  ].filter(Boolean) as Array<{
    href: string;
    label: string;
    icon: React.ReactNode;
  }>;

  return (
    <footer
      id="contato"
      className={`py-12 px-6 transition-colors duration-300 ${template01Theme.footerBg}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Contact section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl mb-4">
            {footer?.title || 'Vamos trabalhar juntos?'}
          </h2>
          <p className={`mb-8 ${template01Theme.footerSecondary}`}>
            {footer?.subtitle ||
              'Estou sempre aberto a novos projetos e oportunidades'}
          </p>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors hover:scale-110 ${template01Theme.socialSurface}`}
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
          {!socialLinks.length && (
            <>
              <span
                className={`w-12 h-12 flex items-center justify-center rounded-full opacity-50 ${template01Theme.socialSurface}`}
                aria-hidden="true"
              >
                <Github size={24} />
              </span>
              <span
                className={`w-12 h-12 flex items-center justify-center rounded-full opacity-50 ${template01Theme.socialSurface}`}
                aria-hidden="true"
              >
                <Linkedin size={24} />
              </span>
            </>
          )}
        </div>

        {/* Divider */}
        <div className={`border-t pt-8 ${template01Theme.divider}`}>
          <p className={`${template01Theme.footerSecondary} text-center`}>
            © {currentYear} {footer?.copyrightName || 'João Silva'}. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
