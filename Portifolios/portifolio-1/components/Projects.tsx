import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Projeto } from '@/types';

interface ProjectsProps {
  projects?: Projeto[];
}

export function Projects({ projects: apiProjects }: ProjectsProps) {
  const projects = apiProjects || [
    {
      nome: 'E-commerce Moderno',
      descricao:
        'Plataforma completa de e-commerce com carrinho, pagamentos e painel administrativo.',
      gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHY5b3BkcHVucXVtOWt6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif',
      demoLink: '#',
      codeLink: '#',
    },
    {
      nome: 'Dashboard Analytics',
      descricao:
        'Dashboard interativo para visualização de dados com gráficos e métricas em tempo real.',
      gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPEqDGUULpEU0aQ/giphy.gif',
      demoLink: '#',
      codeLink: '#',
    },
    {
      nome: 'App de Tarefas',
      descricao:
        'Aplicativo de gerenciamento de tarefas com drag & drop e categorização inteligente.',
      gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlBO7eyXzSZkJri/giphy.gif',
      demoLink: '#',
      codeLink: '#',
    },
    {
      nome: 'Rede Social',
      descricao:
        'Plataforma social com feed, stories, mensagens diretas e sistema de notificações.',
      gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKP9ln2Dr6ze6f6/giphy.gif',
      demoLink: '#',
      codeLink: '#',
    },
    {
      nome: 'Clone Netflix',
      descricao:
        'Réplica da interface da Netflix com integração de API de filmes e player de vídeo.',
      gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xeJpnrWC4XWblEk/giphy.gif',
      demoLink: '#',
      codeLink: '#',
    },
    {
      nome: 'Portfolio 3D',
      descricao:
        'Portfólio interativo com elementos 3D, animações e experiência imersiva.',
      gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRzozg4TCBXv6QU/giphy.gif',
      demoLink: '#',
      codeLink: '#',
    },
  ];

  return (
    <section id="projetos" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Projetos
          </h2>
          <p className="text-gray-600">
            Alguns dos meus trabalhos recentes
          </p>
        </div>

        {/* Grade de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* GIF do projeto */}
              <div className="relative overflow-hidden h-56 bg-gradient-to-br from-blue-100 to-purple-100">
                <img
                  src={project.gif}
                  alt={project.nome}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Conteúdo do card */}
              <div className="p-6">
                <h3 className="mb-3 text-gray-800">
                  {project.nome}
                </h3>
                <p className="text-gray-600 mb-6">
                  {project.descricao}
                </p>

                {/* Botões */}
                <div className="flex gap-4">
                  <a
                    href={project.demoLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                  <a
                    href={project.codeLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <Github size={18} />
                    Ver Código
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
