
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, subtitle, imageUrl }) => (
  <div className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60">
    <div className="aspect-video w-full overflow-hidden">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-60"></div>
    </div>
    <div className="p-8">
      <p className="text-[#C084FC] text-sm font-semibold tracking-wider uppercase mb-2">{subtitle}</p>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="flex gap-4">
        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
          <Github size={20} />
        </button>
        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
          <ExternalLink size={20} />
        </button>
      </div>
    </div>
  </div>
);

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">PROJECTS</h2>
        <div className="h-px flex-grow ml-8 bg-gradient-to-r from-white/10 to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <ProjectCard 
          title="Neural Design System" 
          subtitle="UI/UX Tutorial" 
          imageUrl="https://picsum.photos/seed/p1/800/450" 
        />
        <ProjectCard 
          title="Serverless Edge API" 
          subtitle="NodeJS & AWS" 
          imageUrl="https://picsum.photos/seed/p2/800/450" 
        />
        <ProjectCard 
          title="Crypto Dashboard Pro" 
          subtitle="React & Web3" 
          imageUrl="https://picsum.photos/seed/p3/800/450" 
        />
        <ProjectCard 
          title="AI Content Generator" 
          subtitle="Python & OpenAI" 
          imageUrl="https://picsum.photos/seed/p4/800/450" 
        />
      </div>
    </section>
  );
};

export default Projects;
