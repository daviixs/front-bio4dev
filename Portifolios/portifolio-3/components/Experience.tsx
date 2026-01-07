
import React from 'react';
import { Building2, Briefcase, Calendar } from 'lucide-react';

interface ExperienceItemProps {
  company: string;
  role: string;
  period: string;
  description: string;
  color?: string;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ company, role, period, description, color = "#60A5FA" }) => (
  <div className="group py-10 flex flex-col md:flex-row gap-6 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-4 -mx-4 transition-colors rounded-xl">
    <div className="md:w-1/4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
          <Building2 size={20} className="text-white/60" />
        </div>
        <h4 className="font-bold text-white/90 text-lg">{company}</h4>
      </div>
      <div className="flex items-center gap-2 text-sm text-[#AAAAAA]">
        <Calendar size={14} />
        <span>{period}</span>
      </div>
    </div>
    <div className="md:w-3/4">
      <div className="flex items-center gap-2 mb-3">
        <Briefcase size={18} style={{ color }} />
        <h3 className="text-xl font-bold" style={{ color }}>{role}</h3>
      </div>
      <p className="text-[#AAAAAA] leading-relaxed text-base">
        {description}
      </p>
    </div>
  </div>
);

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-[#0F0F0F]">
      <div className="flex items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight shrink-0">EXPERIENCE</h2>
        <div className="h-px flex-grow ml-8 bg-gradient-to-r from-white/10 to-transparent"></div>
      </div>

      <div className="flex flex-col">
        <ExperienceItem 
          company="Google"
          role="Senior Software Engineer"
          period="2021 — PRESENT"
          description="Leading the core frontend infrastructure team for Google Cloud. Focused on developer experience, monorepo architecture, and improving CI/CD performance across thousands of modules."
          color="#60A5FA"
        />
        <ExperienceItem 
          company="Meta"
          role="Software Engineer II"
          period="2018 — 2021"
          description="Contributed to the React Core team, maintaining open source libraries and internal tooling used by millions of developers. Spearheaded the implementation of concurrent rendering features."
          color="#C084FC"
        />
        <ExperienceItem 
          company="Apple"
          role="Frontend Developer"
          period="2016 — 2018"
          description="Designed and developed high-fidelity product marketing landing pages for global launches. Focused on accessibility, micro-interactions, and pixel-perfect implementation."
          color="#FACC15"
        />
      </div>
    </section>
  );
};

export default Experience;
