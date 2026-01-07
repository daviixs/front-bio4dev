import React from 'react';
import { Code2, FileCode, Palette, Database, GitBranch, Github, Terminal, Settings } from 'lucide-react';
import { TechStack as TechStackType } from '@/types';

interface TechStackProps {
  techStack?: TechStackType;
}

const iconMap: Record<string, React.ReactNode> = {
  'HTML5': <Code2 size={40} />,
  'CSS3': <Palette size={40} />,
  'JavaScript': <FileCode size={40} />,
  'React': <FileCode size={40} />,
  'Node.js': <Terminal size={40} />,
  'Tailwind CSS': <Palette size={40} />,
  'Git': <GitBranch size={40} />,
  'GitHub': <Github size={40} />,
  'VS Code': <Settings size={40} />,
  'Database': <Database size={40} />,
};

export function TechStack({ techStack }: TechStackProps) {
  const technologies = techStack?.technologies || [
    { name: 'HTML5', icon: 'HTML5', color: 'text-orange-600' },
    { name: 'CSS3', icon: 'CSS3', color: 'text-blue-600' },
    { name: 'JavaScript', icon: 'JavaScript', color: 'text-yellow-500' },
    { name: 'React', icon: 'React', color: 'text-cyan-500' },
    { name: 'Node.js', icon: 'Node.js', color: 'text-green-600' },
    { name: 'Tailwind CSS', icon: 'Tailwind CSS', color: 'text-teal-500' },
    { name: 'Git', icon: 'Git', color: 'text-orange-700' },
    { name: 'GitHub', icon: 'GitHub', color: 'text-gray-800' },
    { name: 'VS Code', icon: 'VS Code', color: 'text-blue-500' },
    { name: 'Database', icon: 'Database', color: 'text-purple-600' },
  ];

  return (
    <section id="tech-stack" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {techStack?.title || "Tech Stack"}
          </h2>
          <p className="text-gray-600">
            {techStack?.subtitle || "Tecnologias e ferramentas que utilizo no dia a dia"}
          </p>
        </div>

        {/* Grade de tecnologias */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {technologies.map((tech: any, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer group"
            >
              <div className={`${tech.color} mb-3 group-hover:scale-110 transition-transform`}>
                {iconMap[tech.icon] || <Terminal size={40} />}
              </div>
              <span className="text-gray-700">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
