import React from 'react';
import { Sparkles } from '@/components/ui/sparkles';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import {
  LayoutTemplate,
  FolderGit2,
  Briefcase,
  Github,
  Eye,
  BarChart3,
} from 'lucide-react';

const logos = [
  { id: 'templates', component: LayoutTemplate, label: 'Templates' },
  { id: 'projetos', component: FolderGit2, label: 'Projetos' },
  { id: 'experiencias', component: Briefcase, label: 'Experiências' },
  { id: 'github', component: Github, label: 'GitHub' },
  { id: 'preview', component: Eye, label: 'Preview' },
  { id: 'analytics', component: BarChart3, label: 'Analytics' },
];

export function FeatureShowcase() {
  return (
    <div className="relative w-full overflow-hidden pb-16 pt-10">
      <div className="relative z-20 mx-auto w-full max-w-[100vw] overflow-hidden md:max-w-7xl">
        <div className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#c3986b]">
          Recursos para tirar seu portfólio do rascunho e publicar com clareza
        </div>

        <div className="relative h-[100px] w-full">
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={35}
            gap={32}
          >
            {logos.map(({ id, component: Logo, label }) => (
              <div
                key={id}
                className="flex items-center gap-4 rounded-[20px] border border-[#c3986b]/25 bg-[#2c2621] px-8 py-5 text-[#ece5d9] shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300"
              >
                <Logo className="h-7 w-7 text-[#c3986b]" />
                <span className="text-base font-medium tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </InfiniteSlider>

        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 mx-auto -mt-16 h-[400px] w-full max-w-7xl overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,var(--gradient-color),transparent_70%)] before:opacity-10" />
        <div className="absolute -left-[50%] top-1/2 z-10 aspect-[1/0.15] w-[200%] rounded-[100%] border-t border-[#c3986b]/15 bg-transparent" />
        <Sparkles
          density={800}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          color="var(--sparkles-color)"
          background="transparent"
        />
      </div>
    </div>
  );
}
