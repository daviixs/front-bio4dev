import { Mail, Instagram, Twitter, Youtube } from 'lucide-react';

interface FooterProps {
  description: string;
  email: string;
  socials: {
    instagram: string;
    twitter: string;
    youtube: string;
  };
}

export default function Footer({ description, email, socials }: FooterProps) {
  return (
    <footer id="contact" className="min-h-[120px] shrink-0 flex flex-col md:flex-row gap-8 md:gap-8 items-center border-t border-[#222] py-10 md:py-0">
      <div className="max-w-md text-center md:text-left">
        <h3 className="text-lg mb-2 font-bold">Contact</h3>
        <p className="text-[11px] text-[#a0a0a0] leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center md:items-end gap-3">
        <a href={`mailto:${email}`} className="text-sm text-white no-underline hover:text-[#FF6B35] transition-colors flex items-center gap-2">
          <Mail className="w-4 h-4" /> {email}
        </a>
        <div className="flex gap-4 text-[12px] text-[#777]">
          <a href={socials.instagram} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
            <Instagram className="w-3.5 h-3.5"/> Instagram
          </a>
          <a href={socials.twitter} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
            <Twitter className="w-3.5 h-3.5"/> X (Twitter)
          </a>
          <a href={socials.youtube} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
            <Youtube className="w-3.5 h-3.5"/> YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
