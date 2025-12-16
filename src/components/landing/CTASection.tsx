import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section id="precos" className="bg-slate-100 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
              Comece agora e destaque sua carreira
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 lg:text-lg">
              Junte-se a milhares de desenvolvedores que já criaram seus portfólios 
              com o Bio4Dev. Configure em minutos, personalize com facilidade e 
              compartilhe com o mundo. Seu próximo emprego pode estar a um clique 
              de distância.
            </p>
            
            <div className="mt-8">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-blue-600 px-8 py-6 text-lg font-bold text-white hover:bg-blue-700"
                >
                  Criar Portfólio Grátis
                </Button>
              </Link>
            </div>
          </div>

          {/* Phone Mockup with Photos */}
          <div className="relative flex items-center justify-center">
            {/* Decorative circles */}
            <div className="absolute h-[280px] w-[280px] rounded-full border-2 border-blue-600 opacity-30 lg:h-[550px] lg:w-[550px]" />
            <div className="absolute h-[200px] w-[200px] rounded-full border-[12px] border-blue-600 opacity-50 lg:h-[384px] lg:w-[384px]" />

            {/* Phone mockup */}
            <div className="relative z-10 h-[320px] w-[160px] rounded-[32px] bg-slate-900 p-1.5 shadow-2xl lg:h-[627px] lg:w-[308px] lg:p-2">
              <div className="h-full w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-500 to-blue-500 lg:rounded-[32px]">
                {/* Inserir imagem do app mockup aqui */}
                <div className="flex h-full flex-col items-center justify-center p-4">
                  <div className="h-8 w-8 rounded-full bg-white/20 lg:h-12 lg:w-12" />
                  <div className="mt-2 h-1.5 w-16 rounded bg-white/30 lg:h-2 lg:w-24" />
                  <div className="mt-8 grid grid-cols-2 gap-2 lg:gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-16 w-16 rounded-xl bg-white/10 lg:h-24 lg:w-24" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating photo cards */}
            <div className="absolute left-0 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 lg:gap-4">
              <div className="h-[55px] w-[90px] overflow-hidden rounded-lg border-2 border-dashed border-red-500 bg-white p-1 shadow-lg lg:h-[136px] lg:w-[221px] lg:p-2">
                {/* Inserir imagem do Figma aqui */}
                <div className="h-full w-full rounded bg-gradient-to-br from-pink-200 to-pink-300" />
              </div>
              <div className="h-[55px] w-[60px] overflow-hidden rounded-lg border-2 border-dashed border-red-500 bg-white p-1 shadow-lg lg:h-[136px] lg:w-[141px] lg:p-2">
                {/* Inserir imagem do Figma aqui */}
                <div className="h-full w-full rounded bg-gradient-to-br from-orange-200 to-orange-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

