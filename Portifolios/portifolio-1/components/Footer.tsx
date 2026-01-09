import React from 'react';
import { Github, Linkedin, Mail, Twitter, Coffee, Instagram, Youtube, FileDown } from 'lucide-react';
import { Footer as FooterType, Social } from '@/types';

interface FooterProps {
  footer?: FooterType;
  socials?: Social[];
}

const socialIconMap: Record<string, React.ReactNode> = {
  github: <Github size={24} /> as any,
  linkedin: <Linkedin size={24} /> as any,
  twitter: <Twitter size={24} /> as any,
  instagram: <Instagram size={24} /> as any,
  tiktok: <span className="font-bold text-xl">d</span>,
  youtube: <Youtube size={24} /> as any,
};

export function Footer({ footer, socials }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Seção de contato */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl mb-4">
            {footer?.title || "Vamos trabalhar juntos?"}
          </h2>
          <p className="text-gray-400 mb-8">
            {footer?.subtitle || "Estou sempre aberto a novos projetos e oportunidades"}
          </p>

          {/* Email de contato / Currículo */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {footer?.email && (
              <a
                href={`mailto:${footer.email}`}
                className="inline-flex items-center gap-2 px-8 py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all shadow-md"
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
                Baixe aqui meu Currículo
              </a>
            )}
          </div>
        </div>

        {/* Redes sociais */}
        <div className="flex justify-center gap-6 mb-8">
          {socials?.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110"
              aria-label={social.plataforma}
            >
              {socialIconMap[social.plataforma] || <Mail size={24} />}
            </a>
          ))}
          {!socials?.length && (
            <>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors h-110" aria-label="GitHub"><Github size={24} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors h-110" aria-label="LinkedIn"><Linkedin size={24} /></a>
            </>
          )}
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} {footer?.copyrightName || "João Silva"}. Todos os direitos reservados.
            </p>

            {/* Frase com emoji */}
            <p className="text-gray-400 flex items-center gap-2">
              {footer?.madeWith || (
                <>
                  Feito com <span className="text-blue-500">💙</span> e
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
