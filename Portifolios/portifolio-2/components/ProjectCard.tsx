import React from 'react';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-[#18181b] p-5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white/5 rounded-lg text-yellow-500">
            <FolderGit2 size={20} />
        </div>
        <a href={project.link} className="text-gray-500 hover:text-white transition-colors">
            <ExternalLink size={18} />
        </a>
      </div>
      
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">{project.title}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
      
      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
            <span key={tag} className="text-[10px] font-medium px-2 py-1 bg-white/5 text-gray-300 rounded-md">
                {tag}
            </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;