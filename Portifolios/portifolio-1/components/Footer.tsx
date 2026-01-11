import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Coffee,
  Instagram,
  Youtube,
  FileDown,
} from "lucide-react";
import { Footer as FooterType, Social } from "@/types";

interface FooterProps {
  footer?: FooterType;
  socials?: Social[];
}

const socialIconMap: Record<string, React.ReactNode> = {
  github: <Github size={24} />,
  linkedin: <Linkedin size={24} />,
  twitter: <Twitter size={24} />,
  instagram: <Instagram size={24} />,
  tiktok: <span className="font-bold text-xl">d</span>,
  youtube: <Youtube size={24} />,
};

export function Footer({ footer, socials }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Prefer links set in the footer (what the user edits in the editor)
  const footerSocials = [
    footer?.github && { href: footer.github, label: "GitHub", icon: <Github size={24} /> },
    footer?.linkedin && { href: footer.linkedin, label: "LinkedIn", icon: <Linkedin size={24} /> },
    footer?.twitter && { href: footer.twitter, label: "Twitter", icon: <Twitter size={24} /> },
    footer?.email && { href: `mailto:${footer.email}`, label: "Email", icon: <Mail size={24} /> },
  ].filter(Boolean) as Array<{ href: string; label: string; icon: React.ReactNode }>;

  // Fallback to legacy socials list if footer links aren't set
  const legacySocials =
    socials?.map((social) => ({
      href: social.url,
      label: social.plataforma,
      icon: socialIconMap[social.plataforma] || <Mail size={24} />,
      id: social.id,
    })) || [];

  const socialLinks = footerSocials.length > 0 ? footerSocials : legacySocials;

  return (
    <footer
      id="contato"
      className="py-12 px-6 transition-colors duration-300"
      style={{
        backgroundColor: "#09090b",
        color: "#ffffff",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Contact section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl mb-4">{footer?.title || "Vamos trabalhar juntos?"}</h2>
          <p className="text-gray-400 mb-8">{footer?.subtitle || "Estou sempre aberto a novos projetos e oportunidades"}</p>

          {/* Contact email / Resume */}
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
                Baixe aqui meu Currículo
              </a>
            )}
          </div>
        </div>

        {/* Social links */}
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

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-center md:text-left">
              © {currentYear} {footer?.copyrightName || "João Silva"}. Todos os direitos reservados.
            </p>

            {/* Made with */}
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
