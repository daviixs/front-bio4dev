import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/components/ui/utils';

const menuItems = [
  { label: 'Recursos', href: '#recursos' },
  { label: 'Templates', href: '#templates' },
  { label: 'Preços', href: '#precos' },
  { label: 'FAQ', href: '#faq' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Code2 className="h-7 w-7 text-blue-600 lg:h-8 lg:w-8" />
          <span className="text-2xl font-bold text-slate-900 lg:text-3xl">
            Bio<span className="text-blue-600">4Dev</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-slate-700',
                'transition-colors hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/signup">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Criar Portfólio
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-lg p-2 text-slate-900 hover:bg-slate-100 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-900 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4">
            <Link to="/signup">
              <Button className="w-full justify-center bg-blue-600 text-white hover:bg-blue-700">
                Criar Portfólio
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

