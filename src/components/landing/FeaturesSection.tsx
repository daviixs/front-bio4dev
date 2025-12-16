import React from 'react';
import { Palette, FolderGit2, Link2 } from 'lucide-react';
import { cn } from '@/components/ui/utils';

const features = [
  {
    icon: Palette,
    title: 'Templates Profissionais',
    description: 'Escolha entre 3 templates exclusivos: Minimal, Neon e Creative. Cada um com design único e totalmente responsivo para impressionar recrutadores.',
    color: 'purple',
    borderColor: 'border-purple-500',
    iconBg: 'bg-purple-500',
    iconColor: 'text-white',
  },
  {
    icon: FolderGit2,
    title: 'Showcase de Projetos',
    description: 'Destaque seus melhores projetos com previews animados (GIFs), descrições e links. Mostre seu trabalho de forma profissional e atraente.',
    color: 'blue',
    borderColor: 'border-blue-500',
    iconBg: 'bg-blue-500',
    iconColor: 'text-white',
  },
  {
    icon: Link2,
    title: 'URL Personalizada',
    description: 'Sua página única em bio4dev.com/seuusername. Compartilhe facilmente em currículos, LinkedIn, GitHub e onde mais quiser divulgar seu trabalho.',
    color: 'emerald',
    borderColor: 'border-emerald-500',
    iconBg: 'bg-emerald-500',
    iconColor: 'text-white',
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-gradient-to-b from-slate-100 to-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="relative flex flex-col items-center text-center">
                {/* Dashed circle decoration */}
                <div 
                  className={cn(
                    'absolute -top-2 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full border-2 border-dashed',
                    feature.borderColor
                  )}
                  style={{ opacity: 0.5 }}
                />
                
                {/* Icon */}
                <div className={cn(
                  'relative z-10 flex h-16 w-16 items-center justify-center rounded-full',
                  feature.iconBg
                )}>
                  <Icon className={cn('h-8 w-8', feature.iconColor)} />
                </div>
                
                {/* Content */}
                <h3 className="mt-6 text-xl font-bold text-slate-900 lg:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

