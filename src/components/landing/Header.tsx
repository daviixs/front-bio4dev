import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';
import { List, X, ArrowUpRight } from '@phosphor-icons/react';
import { cn } from '@/components/ui/utils';

const menuItems = [
  { label: 'Epic Builder', href: '#recursos' },
  { label: 'Epic Learn', href: '#templates' },
];

export function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { loginWithGoogle, isLoading } = useAuthStore();

  const hideLandingActions = location.pathname.startsWith('/dashboard');
  const isOnboarding = location.pathname.startsWith('/onboarding');
  const shouldHideLanding = hideLandingActions || isOnboarding;

  useEffect(() => {
    if (shouldHideLanding) setOpen(false);
  }, [shouldHideLanding]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err: any) {
      toast.error(err?.message || 'Erro ao iniciar login com Google');
    }
  };

  const LinkSet = () => (
    <>
      {menuItems.map((item, idx) => (
        <a
          key={item.label}
          href={item.href}
          className={cn(
            'flex items-center px-2 py-1 text-sm font-medium text-[#ece5d9] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'hover:text-[#c3986b]',
          )}
          style={{ transitionDelay: `${idx * 50}ms` }}
          onClick={() => setOpen(false)}
        >
          {item.label}
        </a>
      ))}
    </>
  );

  return (
    <>
      <header className="w-full bg-[var(--surface)]">
        <div className="flex w-full items-center justify-between px-4 py-5 md:px-[3vw] lg:px-[4vw]">
          <div className="flex flex-1 items-center justify-start">
            <Link to="/" className="flex items-center px-0 py-0">
              <img
                src="/images/logobio4dev.png"
                alt="Bio4Dev"
                className="h-10 w-auto"
                loading="eager"
              />
            </Link>
          </div>

          {!shouldHideLanding && (
            <nav className="hidden items-center justify-center gap-8 lg:flex">
              <LinkSet />
            </nav>
          )}

          {!shouldHideLanding && (
            <div className="hidden flex-1 items-center justify-end gap-2 lg:flex">
              <button
                onClick={handleLogin}
                className="group flex items-center gap-2 rounded-full border border-[#c3986b]/40 bg-[#2c2621] px-4 py-2 text-sm font-medium text-[#ece5d9] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#3a3028]"
              >
                {isLoading ? 'Redirecionando...' : 'Entrar'}
              </button>
              <Link
                to="/profile/type"
                className="group inline-flex items-center gap-3 rounded-full bg-[#c3986b] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-[1px] hover:bg-[#b1835f]"
              >
                Começar agora
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                  <ArrowUpRight size={18} weight="bold" />
                </span>
              </Link>
            </div>
          )}

          {!shouldHideLanding && (
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c3986b]/30 bg-[#2c2621] text-[#ece5d9] shadow-[0_12px_25px_-18px_rgba(0,0,0,0.35)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Abrir menu"
              aria-expanded={open}
            >
              {open ? (
                <X size={22} weight="bold" />
              ) : (
                <List size={22} weight="bold" />
              )}
            </button>
          )}
        </div>
      </header>

      {!shouldHideLanding && open && (
        <div className="fixed inset-0 z-30 bg-[#2c2621]/90 backdrop-blur-2xl lg:hidden">
          <div className="mx-4 mt-24 rounded-3xl border border-[#c3986b]/25 bg-[#2c2621] p-6 text-[#ece5d9] shadow-[0_28px_80px_-50px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col gap-2">
              <LinkSet />
            </div>
            <div className="mt-6 grid gap-3">
              <button
                onClick={handleLogin}
                className="flex items-center justify-center gap-2 rounded-full border border-[#c3986b]/30 bg-[#2c2621] px-4 py-3 text-sm font-semibold text-[#ece5d9] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] hover:bg-[#3a3028]"
              >
                {isLoading ? 'Redirecionando...' : 'Entrar'}
              </button>
              <Link
                to="/profile/type"
                className="group inline-flex items-center justify-between gap-3 rounded-full bg-[#c3986b] px-5 py-3 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#b1835f]"
                onClick={() => setOpen(false)}
              >
                Começar agora
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                  <ArrowUpRight size={18} weight="bold" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
