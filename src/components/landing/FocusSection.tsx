import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/components/ui/utils';

const focusItems = [
  {
    title: 'Destaque-se para recrutadores',
    description: 'Seu portfólio Bio4Dev funciona como um currículo visual e interativo. Recrutadores podem ver seus projetos, stacks e contatos em segundos. Impressione na primeira visita.',
    active: true,
  },
  {
    title: 'Atualize a qualquer momento',
    description: null,
    active: false,
  },
  {
    title: 'Compartilhe em qualquer lugar',
    description: null,
    active: false,
  },
];

export function FocusSection() {
  return (
    <section id="templates" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-20">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
            Foque no que importa
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 lg:text-lg">
            Pare de perder tempo criando sites do zero. Configure uma vez, 
            compartilhe sempre e foque em programar.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Photo Gallery with Phone */}
          <div className="relative flex items-center justify-center">
            {/* Decorative circles */}
            <div className="absolute h-[280px] w-[280px] rounded-full border border-yellow-500 opacity-30 lg:h-[550px] lg:w-[550px]" />
            <div className="absolute h-[200px] w-[200px] rounded-full border-[8px] border-yellow-500 opacity-50 lg:h-[416px] lg:w-[416px]" />

            {/* Phone mockup */}
            <div className="relative z-10 h-[320px] w-[160px] rounded-[32px] bg-slate-900 p-1.5 shadow-2xl lg:h-[627px] lg:w-[308px] lg:p-2">
              <div className="h-full w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-500 to-cyan-500 lg:rounded-[32px]">
                {/* Inserir imagem do app mockup aqui */}
                <div className="flex h-full flex-col items-center justify-center p-4">
                  <div className="h-8 w-8 rounded-full bg-white/20 lg:h-12 lg:w-12" />
                  <div className="mt-2 h-1.5 w-16 rounded bg-white/30 lg:h-2 lg:w-24" />
                </div>
              </div>
            </div>

            {/* Photo gallery */}
            <div className="absolute left-0 top-0 z-20 flex flex-col gap-2 lg:gap-4">
              <div className="h-[60px] w-[60px] overflow-hidden rounded-xl border-4 border-white shadow-lg lg:h-[155px] lg:w-[143px]">
                {/* Inserir imagem do Figma aqui */}
                <div className="h-full w-full bg-gradient-to-br from-rose-300 to-rose-400" />
              </div>
              <div className="h-[70px] w-[60px] overflow-hidden rounded-xl border-4 border-white shadow-lg lg:h-[190px] lg:w-[143px]">
                {/* Inserir imagem do Figma aqui */}
                <div className="h-full w-full bg-gradient-to-br from-amber-300 to-amber-400" />
              </div>
              <div className="h-[80px] w-[60px] overflow-hidden rounded-xl border-4 border-white shadow-lg lg:h-[227px] lg:w-[143px]">
                {/* Inserir imagem do Figma aqui */}
                <div className="h-full w-full bg-gradient-to-br from-teal-300 to-teal-400" />
              </div>
            </div>

            <div className="absolute right-0 top-0 z-20 flex flex-col gap-2 lg:gap-4">
              <div className="h-[65px] w-[60px] overflow-hidden rounded-xl border-4 border-white shadow-lg lg:h-[171px] lg:w-[143px]">
                {/* Inserir imagem do Figma aqui */}
                <div className="h-full w-full bg-gradient-to-br from-violet-300 to-violet-400" />
              </div>
              <div className="h-[50px] w-[80px] overflow-hidden rounded-lg border-2 border-dashed border-red-500 bg-white p-1 shadow-lg lg:h-[140px] lg:w-[203px] lg:p-2">
                {/* Inserir imagem do Figma aqui */}
                <div className="h-full w-full rounded bg-gradient-to-br from-slate-200 to-slate-300" />
              </div>
              <div className="h-[70px] w-[60px] overflow-hidden rounded-xl border-4 border-white shadow-lg lg:h-[183px] lg:w-[143px]">
                {/* Inserir imagem do Figma aqui */}
                <div className="h-full w-full bg-gradient-to-br from-emerald-300 to-emerald-400" />
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="flex flex-col gap-6">
            {focusItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'border-l-[3px] py-2 pl-6 lg:pl-12',
                  item.active ? 'border-blue-600' : 'border-slate-300'
                )}
              >
                <h3 className="text-lg font-medium text-slate-900 lg:text-xl">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center lg:mt-20">
          <Link to="/signup">
            <Button 
              size="lg" 
              className="bg-blue-600 px-8 py-6 text-lg font-bold text-white hover:bg-blue-700"
            >
              Criar Meu Portfólio Grátis
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

