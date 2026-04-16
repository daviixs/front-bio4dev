import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <div id="projects">
      <div className="text-[#FF6B35] font-bold mb-5 text-lg">PROJECTS</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#222] flex flex-col group cursor-pointer hover:border-[#444] transition-colors"
          >
            <div 
              className="h-32 w-full flex items-center justify-center font-black text-sm tracking-wider relative overflow-hidden"
              style={{ backgroundColor: project.thumbnailBg }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent z-10"></div>
              <span className="z-20 text-center uppercase">{project.thumbnailText}</span>
            </div>
            <div className="p-3 flex justify-between items-center text-[10px] font-semibold">
              <div>{project.subtitle}</div>
              <span className="opacity-60 flex items-center gap-1 group-hover:opacity-100 transition-opacity uppercase">
                Visit <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
