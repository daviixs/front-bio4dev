import React from 'react';
import { cn } from '@/components/ui/utils';
import mockupImage from '@/landingpage-images/mockup-image2.png';

const toolItems = [
  {
    title: 'Dashboard Intuitivo',
    description: 'Gerencie tudo em um só lugar: edite suas informações, adicione projetos, conecte redes sociais e escolha seu template favorito. Interface simples e poderosa.',
    active: true,
  },
  {
    title: 'Projetos & Tecnologias',
    description: null,
    active: false,
  },
  {
    title: 'Redes Sociais Integradas',
    description: null,
    active: false,
  },
];

export function ToolsSection() {
  return (
    <section id="recursos" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-20">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
            Tudo que você precisa
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 lg:text-lg">
            Ferramentas completas para criar e gerenciar seu portfólio profissional.
            Sem código, sem complicação.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Phone Mockup with Photos */}
          <div className="relative flex items-center justify-center">
            {/* Decorative circles */}
            <div className="absolute h-[280px] w-[280px] rounded-full border-[5px] border-amber-500 opacity-30 lg:h-[550px] lg:w-[550px]" />
            <div className="absolute h-[220px] w-[220px] rounded-full border-2 border-amber-500 opacity-50 lg:h-[468px] lg:w-[468px]" />

            {/* Phone Mockup Image */}
            <div className="relative z-10">
              <img 
                src={mockupImage} 
                alt="Preview do template Bio4Dev"
                className="h-[400px] w-auto drop-shadow-2xl lg:h-[600px]"
              />
            </div>

            {/* Floating photo cards */}
            <div className="absolute right-0 top-8 z-20 grid gap-2 lg:right-[-20px] lg:top-16 lg:gap-4">
              <div className="flex gap-2 lg:gap-4">
                <div className="h-[50px] w-[80px] overflow-hidden rounded-lg border-2 border-dashed border-yellow-500 bg-white/90 p-1 shadow-lg backdrop-blur-sm lg:h-[80px] lg:w-[140px] lg:p-2">
                  <div className="flex h-full w-full flex-col items-center justify-center rounded bg-gradient-to-br from-slate-800 to-slate-900">
                    <span className="text-[8px] font-bold text-white lg:text-xs">Dashboard</span>
                  </div>
                </div>
                <div className="h-[50px] w-[70px] overflow-hidden rounded-lg border-2 border-dashed border-yellow-500 bg-white/90 p-1 shadow-lg backdrop-blur-sm lg:h-[80px] lg:w-[120px] lg:p-2">
                  <div className="flex h-full w-full flex-col items-center justify-center rounded bg-gradient-to-br from-blue-500 to-blue-600">
                    <span className="text-[8px] font-bold text-white lg:text-xs">Projetos</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 lg:gap-4">
                <div className="h-[50px] w-[60px] overflow-hidden rounded-lg border-2 border-dashed border-yellow-500 bg-white/90 p-1 shadow-lg backdrop-blur-sm lg:h-[80px] lg:w-[100px] lg:p-2">
                  <div className="flex h-full w-full flex-col items-center justify-center rounded bg-gradient-to-br from-emerald-500 to-emerald-600">
                    <span className="text-[8px] font-bold text-white lg:text-xs">Stacks</span>
                  </div>
                </div>
                <div className="h-[50px] w-[50px] overflow-hidden rounded-lg border-2 border-dashed border-yellow-500 bg-white/90 p-1 shadow-lg backdrop-blur-sm lg:h-[80px] lg:w-[80px] lg:p-2">
                  <div className="flex h-full w-full flex-col items-center justify-center rounded bg-gradient-to-br from-purple-500 to-purple-600">
                    <span className="text-[8px] font-bold text-white lg:text-xs">Links</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="flex flex-col gap-6">
            {toolItems.map((item, index) => (
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
      </div>
    </section>
  );
}

