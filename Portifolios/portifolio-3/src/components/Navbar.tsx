import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  initials: string;
}

export default function Navbar({ initials }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="h-20 shrink-0 flex justify-between items-center bg-[#0d0d0d]/80 backdrop-blur-md sticky top-0 z-[100] border-b border-[#222] md:border-none">
      <div className="font-serif italic text-3xl font-bold">{initials}</div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center">
        {navLinks.map((link) => (
          <a 
            key={link.name}
            href={link.href} 
            className="ml-6 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-[#0d0d0d] border-b border-[#222] flex flex-col p-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="py-3 text-lg font-medium border-b border-[#1a1a1a] last:border-none"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
