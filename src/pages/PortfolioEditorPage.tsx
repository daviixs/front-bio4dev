import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, ExternalLink, Github, Linkedin, Twitter, Mail, Coffee, Code2, FileCode, Palette, Database, GitBranch, Terminal, Settings, Briefcase, Calendar, MapPin, User, Facebook, Figma, FolderGit2, Cpu, ArrowUpRight, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { EditableWrapper } from '@/components/portfolio/EditableWrapper';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Componentes editáveis do Portfólio 1
interface Portfolio1Data {
  hero: {
    greeting: string;
    name: string;
    tagline: string;
    description: string;
    avatarUrl: string;
  };
  techStack: {
    title: string;
    subtitle: string;
    technologies: Array<{ name: string; icon: string; color: string }>;
  };
  workHistory: Array<{
    company: string;
    period: string;
    summary: string;
    technologies: string[];
    responsibilities: string[];
    impact: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    gif: string;
    demoLink: string;
    codeLink: string;
  }>;
  footer: {
    title: string;
    subtitle: string;
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
    copyrightName: string;
  };
}

// Componentes editáveis do Portfólio 2
interface Portfolio2Data {
  profile: {
    name: string;
    role: string;
    tagline: string;
    location: string;
    avatarUrl: string;
  };
  socialLinks: Array<{
    id: string;
    name: string;
    handle: string;
    url: string;
    colorClass: string;
    textColorClass?: string;
    colSpan: 1 | 2;
  }>;
  experience: Array<{
    id: string;
    role: string;
    company: string;
    date: string;
    description: string;
    current: boolean;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
  }>;
  techStack: string[];
}

type PortfolioData = Portfolio1Data | Portfolio2Data;

export function PortfolioEditorPage() {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const navigate = useNavigate();

  // Estado inicial baseado no portfólio selecionado
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    // Carregar dados do portfólio selecionado
    if (portfolioId === '1') {
      setPortfolioData({
        hero: {
          greeting: 'Olá, eu sou',
          name: 'João Silva',
          tagline: 'Eu construo coisas para web',
          description:
            'Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis. Especializado em transformar ideias em aplicações web modernas e funcionais.',
          avatarUrl:
            'https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQ5MjIxNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        techStack: {
          title: 'Tech Stack',
          subtitle: 'Tecnologias e ferramentas que utilizo no dia a dia',
          technologies: [
            { name: 'HTML5', icon: 'Code2', color: 'text-orange-600' },
            { name: 'CSS3', icon: 'Palette', color: 'text-blue-600' },
            { name: 'JavaScript', icon: 'FileCode', color: 'text-yellow-500' },
            { name: 'React', icon: 'FileCode', color: 'text-cyan-500' },
            { name: 'Node.js', icon: 'Terminal', color: 'text-green-600' },
            { name: 'Tailwind CSS', icon: 'Palette', color: 'text-teal-500' },
            { name: 'Git', icon: 'GitBranch', color: 'text-orange-700' },
            { name: 'GitHub', icon: 'Github', color: 'text-gray-800' },
            { name: 'VS Code', icon: 'Settings', color: 'text-blue-500' },
            { name: 'Database', icon: 'Database', color: 'text-purple-600' },
          ],
        },
        workHistory: [
          {
            company: 'Empresa de E-commerce XPTO',
            period: '2023 - Atual',
            summary:
              'Desenvolvimento de plataforma de e-commerce escalável para mais de 100 mil usuários ativos. Refatoração completa do frontend para melhorar performance e experiência do usuário.',
            technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
            responsibilities: [
              'Desenvolvimento de componentes reutilizáveis e escaláveis',
              'Implementação de testes unitários e integração contínua',
              'Otimização de performance e SEO',
            ],
            impact: 'Redução de 40% no tempo de carregamento e aumento de 25% na taxa de conversão.',
          },
          {
            company: 'StartUp FinTech ABC',
            period: '2022 - 2023',
            summary:
              'Criação de dashboard financeiro para gestão de investimentos e análise de carteiras. Integração com múltiplas APIs bancárias e de mercado financeiro.',
            technologies: ['React', 'Next.js', 'Tailwind CSS', 'GraphQL', 'MongoDB'],
            responsibilities: [
              'Arquitetura e desenvolvimento do frontend da aplicação',
              'Integração com APIs de terceiros e tratamento de dados financeiros',
              'Desenvolvimento de gráficos e visualizações de dados em tempo real',
            ],
            impact: 'Aplicação lançada com sucesso, atendendo mais de 5 mil usuários nos primeiros 3 meses.',
          },
          {
            company: 'Agência Digital Criativa',
            period: '2021 - 2022',
            summary:
              'Desenvolvimento de sites institucionais e landing pages para diversos clientes. Foco em responsividade, acessibilidade e otimização de performance.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'WordPress', 'Sass', 'Git'],
            responsibilities: [
              'Transformação de designs (Figma/Adobe XD) em código responsivo',
              'Implementação de animações e interações complexas',
              'Garantia de compatibilidade cross-browser e acessibilidade',
            ],
            impact: 'Entrega de mais de 15 projetos dentro do prazo e orçamento, com taxa de satisfação de clientes acima de 95%.',
          },
        ],
        projects: [
          {
            title: 'E-commerce Moderno',
            description:
              'Plataforma completa de e-commerce com carrinho, pagamentos e painel administrativo.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHY5b3BkcHVucXVtOWt6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif',
          },
          {
            title: 'Dashboard Analytics',
            description:
              'Dashboard interativo para visualização de dados com gráficos e métricas em tempo real.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPEqDGUULpEU0aQ/giphy.gif',
            demoLink: '#',
            codeLink: '#',
          },
          {
            title: 'App de Tarefas',
            description:
              'Aplicativo de gerenciamento de tarefas com drag & drop e categorização inteligente.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlBO7eyXzSZkJri/giphy.gif',
            demoLink: '#',
            codeLink: '#',
          },
          {
            title: 'Rede Social',
            description:
              'Plataforma social com feed, stories, mensagens diretas e sistema de notificações.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKP9ln2Dr6ze6f6/giphy.gif',
            demoLink: '#',
            codeLink: '#',
          },
          {
            title: 'Clone Netflix',
            description:
              'Réplica da interface da Netflix com integração de API de filmes e player de vídeo.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xeJpnrWC4XWblEk/giphy.gif',
            demoLink: '#',
            codeLink: '#',
          },
          {
            title: 'Portfolio 3D',
            description:
              'Portfólio interativo com elementos 3D, animações e experiência imersiva.',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnVxdW5lcmJzenFrdHZmZnR6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRzozg4TCBXv6QU/giphy.gif',
            demoLink: '#',
            codeLink: '#',
          },
        ],
        footer: {
          title: 'Vamos trabalhar juntos?',
          subtitle: 'Estou sempre aberto a novos projetos e oportunidades',
          email: 'contato@joaosilva.dev',
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          copyrightName: 'João Silva',
        },
      });
    } else if (portfolioId === '2') {
      setPortfolioData({
        profile: {
          name: 'Muhammad Aqsam',
          role: 'Product Designer & Developer',
          tagline: 'Building digital products that matter.',
          location: 'Bahawalpur, Pakistan',
          avatarUrl:
            'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=fbbf24&clothing=hoodie&clothingColor=3c4f5c',
        },
        socialLinks: [
          { 
            id: 'github', 
            name: 'GitHub', 
            handle: '@m-aqsam', 
            url: 'https://github.com',
            colorClass: 'bg-[#18181b] hover:bg-[#27272a] border border-gray-800',
            colSpan: 2
          },
          { 
            id: 'email', 
            name: 'Email', 
            handle: 'maqsam1155@gmail.com', 
            url: 'mailto:maqsam1155@gmail.com',
            colorClass: 'bg-[#1e293b] hover:bg-[#263345]',
            colSpan: 1
          },
          { 
            id: 'facebook', 
            name: 'Facebook', 
            handle: '@m_aqsam', 
            url: 'https://facebook.com',
            colorClass: 'bg-[#3b82f6] hover:bg-[#2563eb]',
            colSpan: 1
          },
          { 
            id: 'figma', 
            name: 'Figma', 
            handle: '@maqsam', 
            url: 'https://figma.com',
            colorClass: 'bg-[#1e1e1e] hover:bg-[#2d2d2d]',
            colSpan: 1
          },
          { 
            id: 'dev', 
            name: 'DEV', 
            handle: '@maqsam', 
            url: 'https://dev.to',
            colorClass: 'bg-white hover:bg-gray-100',
            textColorClass: 'text-black',
            colSpan: 1
          },
        ],
        experience: [
          {
            id: '1',
            role: 'Senior Product Designer',
            company: 'TechFlow Solutions',
            date: '2023 - Present',
            description:
              'Leading the design system initiative and overseeing product UX for enterprise clients.',
            current: true,
          },
          {
            id: '2',
            role: 'Frontend Developer',
            company: 'Creative Digital',
            date: '2021 - 2023',
            description:
              'Developed responsive web applications using React and TypeScript. Collaborated closely with UI designers.',
            current: false,
          },
          {
            id: '3',
            role: 'UI/UX Intern',
            company: 'StartUp Inc',
            date: '2020 - 2021',
            description:
              'Assisted in wireframing and prototyping mobile applications. Conducted user research interviews.',
            current: false,
          },
        ],
        projects: [
          {
            id: 'p1',
            title: 'E-Commerce Dashboard',
            description:
              'A comprehensive analytics dashboard for online retailers featuring real-time data visualization.',
            tags: ['React', 'Tailwind', 'Recharts'],
            link: '#',
          },
          {
            id: 'p2',
            title: 'HealthTrack App',
            description:
              'Mobile-first fitness tracking application focusing on simplicity and user retention.',
            tags: ['Figma', 'UX Research', 'Prototyping'],
            link: '#',
          },
          {
            id: 'p3',
            title: 'Finance AI',
            description: 'Personal finance assistant powered by generative AI to help users save money.',
            tags: ['TypeScript', 'OpenAI API', 'Node.js'],
            link: '#',
          },
        ],
        techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Figma', 'Git', 'PostgreSQL', 'Framer Motion', 'Prisma'],
      });
    }
  }, [portfolioId]);

  const handleSave = () => {
    // Aqui você pode salvar os dados no backend
    toast.success('Portfólio salvo com sucesso!');
  };

  if (!portfolioData || !portfolioId) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Carregando portfólio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0f0f17] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard/bio')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">
                  Editando Portfólio {portfolioId}
                </h1>
                <p className="text-sm text-white/60">
                  Clique no ícone de caneta para editar elementos
                </p>
              </div>
            </div>
            <Button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className={portfolioId === '1' ? 'bg-white' : ''}>
        {portfolioId === '1' && 'hero' in portfolioData && (
          <Portfolio1Editor data={portfolioData as Portfolio1Data} />
        )}
        {portfolioId === '2' && 'profile' in portfolioData && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Portfolio2Editor data={portfolioData as Portfolio2Data} />
          </div>
        )}
      </div>
    </div>
  );
}

// Componente de edição do Portfólio 1
function Portfolio1Editor({ data }: { data: Portfolio1Data }) {
  const [portfolioData, setPortfolioData] = useState(data);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [editingWorkIndex, setEditingWorkIndex] = useState<number | null>(null);
  
  // Estados temporários para edição de projetos
  const [tempProject, setTempProject] = useState<Portfolio1Data['projects'][0] | null>(null);
  
  // Estados temporários para edição de experiência
  const [tempWork, setTempWork] = useState<Portfolio1Data['workHistory'][0] | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          {/* Imagem de Perfil */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <EditableWrapper
                value={portfolioData.hero.avatarUrl}
                onChange={(newValue) =>
                  setPortfolioData({
                    ...portfolioData,
                    hero: { ...portfolioData.hero, avatarUrl: newValue },
                  })
                }
                type="image"
                label="Editar Avatar"
              >
                <img
                  src={portfolioData.hero.avatarUrl}
                  alt="Desenvolvedor"
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-2xl"
                />
              </EditableWrapper>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
            </div>
          </div>

          {/* Greeting */}
          <EditableWrapper
            value={portfolioData.hero.greeting}
            onChange={(newValue) =>
              setPortfolioData({
                ...portfolioData,
                hero: { ...portfolioData.hero, greeting: newValue },
              })
            }
            type="text"
            label="Editar Saudação"
          >
            <p className="text-blue-600 mb-4">{portfolioData.hero.greeting}</p>
          </EditableWrapper>

          {/* Name */}
          <EditableWrapper
            value={portfolioData.hero.name}
            onChange={(newValue) =>
              setPortfolioData({
                ...portfolioData,
                hero: { ...portfolioData.hero, name: newValue },
              })
            }
            type="text"
            label="Editar Nome"
          >
            <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {portfolioData.hero.name}
            </h1>
          </EditableWrapper>

          {/* Tagline */}
          <EditableWrapper
            value={portfolioData.hero.tagline}
            onChange={(newValue) =>
              setPortfolioData({
                ...portfolioData,
                hero: { ...portfolioData.hero, tagline: newValue },
              })
            }
            type="text"
            label="Editar Tagline"
          >
            <p className="text-2xl md:text-3xl text-gray-700 mb-8">
              {portfolioData.hero.tagline}
            </p>
          </EditableWrapper>

          {/* Description */}
          <EditableWrapper
            value={portfolioData.hero.description}
            onChange={(newValue) =>
              setPortfolioData({
                ...portfolioData,
                hero: { ...portfolioData.hero, description: newValue },
              })
            }
            type="text"
            label="Editar Descrição"
          >
            <p className="max-w-2xl mx-auto text-gray-600 mb-10">
              {portfolioData.hero.description}
            </p>
          </EditableWrapper>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projetos"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Ver Projetos
            </a>
            <a
              href="#contato"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Entre em Contato
            </a>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <EditableWrapper
              value={portfolioData.techStack.title}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  techStack: { ...portfolioData.techStack, title: newValue },
                })
              }
              type="text"
              label="Editar Título"
            >
              <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {portfolioData.techStack.title}
              </h2>
            </EditableWrapper>
            <EditableWrapper
              value={portfolioData.techStack.subtitle}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  techStack: { ...portfolioData.techStack, subtitle: newValue },
                })
              }
              type="text"
              label="Editar Subtítulo"
            >
              <p className="text-gray-600">{portfolioData.techStack.subtitle}</p>
            </EditableWrapper>
          </div>

          {/* Grade de tecnologias */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {portfolioData.techStack.technologies.map((tech, index) => {
              const IconComponent = {
                Code2,
                FileCode,
                Palette,
                Database,
                GitBranch,
                Github,
                Terminal,
                Settings,
              }[tech.icon as keyof typeof Code2] || Code2;
              
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer group"
                >
                  <div className={`${tech.color} mb-3 group-hover:scale-110 transition-transform`}>
                    <IconComponent size={40} />
                  </div>
                  <span className="text-gray-700">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Work History Section */}
      <section id="experiencia" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Experiência Profissional
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Histórico de projetos e empresas onde apliquei minhas habilidades para criar soluções impactantes
            </p>
            <Button
              onClick={() => {
                const newWork = {
                  company: 'Nova Empresa',
                  period: '2024 - Atual',
                  summary: 'Descrição da experiência profissional',
                  technologies: ['React', 'TypeScript'],
                  responsibilities: ['Responsabilidade 1', 'Responsabilidade 2'],
                  impact: 'Impacto alcançado',
                };
                setPortfolioData({
                  ...portfolioData,
                  workHistory: [...portfolioData.workHistory, newWork],
                });
                toast.success('Nova experiência adicionada!');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Experiência
            </Button>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-400"></div>
            <div className="space-y-12">
              {portfolioData.workHistory.map((work, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 relative group">
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingWorkIndex(index);
                            setTempWork({ ...work });
                          }}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-600"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newHistory = portfolioData.workHistory.filter((_, i) => i !== index);
                            setPortfolioData({ ...portfolioData, workHistory: newHistory });
                            toast.success('Experiência removida!');
                          }}
                          className="bg-red-50 hover:bg-red-100 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <h3 className="text-xl mb-2 text-gray-900">{work.company}</h3>

                      <div className={`flex items-center gap-2 text-sm text-blue-600 ${index % 2 === 0 ? '' : 'md:justify-end'} mb-4`}>
                        <Calendar className="w-4 h-4" />
                        <span>{work.period}</span>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">{work.summary}</p>

                      {/* Tecnologias */}
                      <div className="mb-4">
                        <h4 className="text-sm text-gray-900 mb-2">Tecnologias:</h4>
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                          {work.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Responsabilidades */}
                      <div className="mb-4">
                        <h4 className="text-sm text-gray-900 mb-2">Responsabilidades:</h4>
                        <ul className={`space-y-1 text-sm text-gray-700 ${index % 2 === 0 ? 'list-disc list-inside' : 'md:list-none'}`}>
                          {work.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="leading-relaxed">
                              {index % 2 !== 0 && <span className="md:inline hidden">• </span>}
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Impacto */}
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-sm text-gray-900 mb-2">Impacto:</h4>
                        <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">{work.impact}</p>
                      </div>
                    </div>
                  </div>
                  {/* Ícone central (visível apenas em desktop) */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full items-center justify-center shadow-lg">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>

                  {/* Espaço vazio do outro lado (apenas desktop) */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicador de início da carreira */}
          <div className="text-center mt-12">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg">
              Início da Jornada
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projetos
            </h2>
            <p className="text-gray-600 mb-6">
              Alguns dos meus trabalhos recentes
            </p>
            <Button
              onClick={() => {
                  const newProject = {
                  title: 'Novo Projeto',
                  description: 'Descrição do projeto',
                  gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHY5b3BkcHVucXVtOWt6OWN0YzR4ZjF6OWN5dTNxYzJ6ZjJ6ZjJ6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif',
                  demoLink: '#',
                  codeLink: '#',
                };
                setPortfolioData({
                  ...portfolioData,
                  projects: [...portfolioData.projects, newProject],
                });
                toast.success('Novo projeto adicionado!');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Projeto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative"
              >
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingProjectIndex(index);
                      setTempProject({ ...project });
                    }}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newProjects = portfolioData.projects.filter((_, i) => i !== index);
                      setPortfolioData({ ...portfolioData, projects: newProjects });
                      toast.success('Projeto removido!');
                    }}
                    className="bg-red-50 hover:bg-red-100 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {/* GIF do projeto */}
                <div className="relative overflow-hidden h-56 bg-gradient-to-br from-blue-100 to-purple-100">
                  <img
                    src={project.gif}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Conteúdo do card */}
                <div className="p-6">
                  <h3 className="mb-3 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mb-6">{project.description}</p>

                  {/* Botões */}
                  <div className="flex gap-4">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                    <a
                      href={project.codeLink}
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

      {/* Footer Section */}
      <footer id="contato" className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <EditableWrapper
              value={portfolioData.footer.title}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  footer: { ...portfolioData.footer, title: newValue },
                })
              }
              type="text"
              label="Editar Título"
            >
              <h2 className="text-3xl md:text-4xl mb-4">{portfolioData.footer.title}</h2>
            </EditableWrapper>
            <EditableWrapper
              value={portfolioData.footer.subtitle}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  footer: { ...portfolioData.footer, subtitle: newValue },
                })
              }
              type="text"
              label="Editar Subtítulo"
            >
              <p className="text-gray-400 mb-8">{portfolioData.footer.subtitle}</p>
            </EditableWrapper>
            <EditableWrapper
              value={portfolioData.footer.email}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  footer: { ...portfolioData.footer, email: newValue },
                })
              }
              type="text"
              label="Editar Email"
            >
              <a
                href={`mailto:${portfolioData.footer.email}`}
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg"
              >
                {portfolioData.footer.email}
              </a>
            </EditableWrapper>
          </div>

          {/* Redes sociais */}
          <div className="flex justify-center gap-6 mb-8">
            <EditableWrapper
              value={portfolioData.footer.github}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  footer: { ...portfolioData.footer, github: newValue },
                })
              }
              type="text"
              label="Editar Link do GitHub"
            >
              <a
                href={portfolioData.footer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
            </EditableWrapper>
            <EditableWrapper
              value={portfolioData.footer.linkedin}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  footer: { ...portfolioData.footer, linkedin: newValue },
                })
              }
              type="text"
              label="Editar Link do LinkedIn"
            >
              <a
                href={portfolioData.footer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </EditableWrapper>
            <EditableWrapper
              value={portfolioData.footer.twitter}
              onChange={(newValue) =>
                setPortfolioData({
                  ...portfolioData,
                  footer: { ...portfolioData.footer, twitter: newValue },
                })
              }
              type="text"
              label="Editar Link do Twitter"
            >
              <a
                href={portfolioData.footer.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </EditableWrapper>
            <a
              href={`mailto:${portfolioData.footer.email}`}
              className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors hover:scale-110"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>

          {/* Divisor */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <EditableWrapper
                value={portfolioData.footer.copyrightName}
                onChange={(newValue) =>
                  setPortfolioData({
                    ...portfolioData,
                    footer: { ...portfolioData.footer, copyrightName: newValue },
                  })
                }
                type="text"
                label="Editar Nome do Copyright"
              >
                <p className="text-gray-400 text-center md:text-left">
                  © {new Date().getFullYear()} {portfolioData.footer.copyrightName}. Todos os direitos reservados.
                </p>
              </EditableWrapper>

              {/* Frase com emoji */}
              <p className="text-gray-400 flex items-center gap-2">
                Feito com <span className="text-blue-500">💙</span> e
                <Coffee size={18} className="text-yellow-600" />
                café
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Dialog para editar experiência profissional */}
      <Dialog open={editingWorkIndex !== null} onOpenChange={(open) => !open && setEditingWorkIndex(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Experiência Profissional</DialogTitle>
          </DialogHeader>
          {tempWork && (
            <div className="space-y-4 mt-4">
              <div>
                <Label>Empresa</Label>
                <Input
                  value={tempWork.company}
                  onChange={(e) => setTempWork({ ...tempWork, company: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Período</Label>
                <Input
                  value={tempWork.period}
                  onChange={(e) => setTempWork({ ...tempWork, period: e.target.value })}
                  className="mt-2"
                  placeholder="2023 - Atual"
                />
              </div>
              <div>
                <Label>Resumo</Label>
                <Textarea
                  value={tempWork.summary}
                  onChange={(e) => setTempWork({ ...tempWork, summary: e.target.value })}
                  className="mt-2 min-h-[100px]"
                />
              </div>
              <div>
                <Label>Tecnologias (separadas por vírgula)</Label>
                <Input
                  value={tempWork.technologies.join(', ')}
                  onChange={(e) =>
                    setTempWork({
                      ...tempWork,
                      technologies: e.target.value.split(',').map((t) => t.trim()).filter((t) => t),
                    })
                  }
                  className="mt-2"
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
              <div>
                <Label>Responsabilidades (uma por linha)</Label>
                <Textarea
                  value={tempWork.responsibilities.join('\n')}
                  onChange={(e) =>
                    setTempWork({
                      ...tempWork,
                      responsibilities: e.target.value.split('\n').filter((r) => r.trim()),
                    })
                  }
                  className="mt-2 min-h-[100px]"
                  placeholder="Responsabilidade 1&#10;Responsabilidade 2"
                />
              </div>
              <div>
                <Label>Impacto</Label>
                <Textarea
                  value={tempWork.impact}
                  onChange={(e) => setTempWork({ ...tempWork, impact: e.target.value })}
                  className="mt-2 min-h-[80px]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingWorkIndex(null)}>
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    if (editingWorkIndex !== null) {
                      const newHistory = [...portfolioData.workHistory];
                      newHistory[editingWorkIndex] = tempWork;
                      setPortfolioData({ ...portfolioData, workHistory: newHistory });
                      setEditingWorkIndex(null);
                      toast.success('Experiência atualizada!');
                    }
                  }}
                >
                  Salvar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Componente de edição do Portfólio 2
function Portfolio2Editor({ data }: { data: Portfolio2Data }) {
  const [portfolioData, setPortfolioData] = useState(data);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null);
  
  // Estados temporários para edição
  const [tempProject, setTempProject] = useState<Portfolio2Data['projects'][0] | null>(null);
  const [tempExperience, setTempExperience] = useState<Portfolio2Data['experience'][0] | null>(null);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#050505] overflow-x-hidden text-slate-200">
      <main className="w-full max-w-md md:max-w-xl lg:max-w-2xl z-10 px-6 py-10 flex flex-col gap-6">
        {/* Profile Card */}
        <div className="bg-[#121318] rounded-[2rem] p-6 sm:p-8 border border-white/5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <EditableWrapper
                value={portfolioData.profile.avatarUrl}
                onChange={(newValue) =>
                  setPortfolioData({
                    ...portfolioData,
                    profile: { ...portfolioData.profile, avatarUrl: newValue },
                  })
                }
                type="image"
                label="Editar Avatar"
              >
                <div className="relative group">
                  <div className="relative w-40 h-40 mx-auto bg-[#fbbf24] rounded-full border-4 border-[#121318] overflow-hidden shadow-xl">
                    <img 
                      src={portfolioData.profile.avatarUrl} 
                      alt={portfolioData.profile.name} 
                      className="w-full h-full object-cover pt-2"
                    />
                  </div>
                </div>
              </EditableWrapper>
            </div>

            <div className="flex-1 text-center sm:text-left mt-2">
              {/* Name */}
              <EditableWrapper
                value={portfolioData.profile.name}
                onChange={(newValue) =>
                  setPortfolioData({
                    ...portfolioData,
                    profile: { ...portfolioData.profile, name: newValue },
                  })
                }
                type="text"
                label="Editar Nome"
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                  {portfolioData.profile.name}
                </h1>
              </EditableWrapper>

              {/* Role */}
              <EditableWrapper
                value={portfolioData.profile.role}
                onChange={(newValue) =>
                  setPortfolioData({
                    ...portfolioData,
                    profile: { ...portfolioData.profile, role: newValue },
                  })
                }
                type="text"
                label="Editar Cargo"
              >
                <p className="text-yellow-500 font-medium text-sm mb-4">
                  {portfolioData.profile.role}
                </p>
              </EditableWrapper>

              {/* Tagline and Location */}
              <div className="flex flex-col gap-2 mb-4">
                <EditableWrapper
                  value={portfolioData.profile.tagline}
                  onChange={(newValue) =>
                    setPortfolioData({
                      ...portfolioData,
                      profile: { ...portfolioData.profile, tagline: newValue },
                    })
                  }
                  type="text"
                  label="Editar Tagline"
                >
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <User size={16} className="text-yellow-500" />
                    <span className="font-medium tracking-wide">{portfolioData.profile.tagline}</span>
                  </div>
                </EditableWrapper>

                <EditableWrapper
                  value={portfolioData.profile.location}
                  onChange={(newValue) =>
                    setPortfolioData({
                      ...portfolioData,
                      profile: { ...portfolioData.profile, location: newValue },
                    })
                  }
                  type="text"
                  label="Editar Localização"
                >
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <MapPin size={16} className="text-red-500" />
                    <span className="font-medium tracking-wide">{portfolioData.profile.location}</span>
                  </div>
                </EditableWrapper>
              </div>

              {/* Open to work badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Open to work
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section - Moved Up */}
        <section className="grid grid-cols-2 gap-4">
          {portfolioData.socialLinks.map((link, index) => {
            const IconComponent = {
              github: Github,
              email: Mail,
              facebook: Facebook,
              figma: Figma,
              dev: Code2,
            }[link.id] || Github;

            const textColor = link.textColorClass || 'text-white';
            const subTextColor = link.textColorClass ? 'text-gray-600' : 'text-gray-400';

            return (
              <EditableWrapper
                key={link.id}
                value={link.url}
                onChange={(newValue) => {
                  const newLinks = [...portfolioData.socialLinks];
                  newLinks[index] = { ...link, url: newValue };
                  setPortfolioData({ ...portfolioData, socialLinks: newLinks });
                }}
                type="text"
                label="Editar URL"
              >
                <a 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    ${link.colSpan === 2 ? 'col-span-2' : 'col-span-1'}
                    ${link.colorClass}
                    relative p-6 rounded-3xl transition-all duration-300 hover:scale-[1.02] active:scale-95
                    flex flex-col justify-between
                    shadow-md
                    h-40
                    group
                    overflow-hidden
                    border border-white/5
                  `}
                >
                  <div className="flex justify-between items-start z-10">
                    <div className={`p-2.5 rounded-xl ${link.id === 'dev' ? 'bg-black text-white' : 'bg-white/10'}`}>
                      <IconComponent size={22} className={link.id === 'dev' ? 'text-white' : 'text-white'} />
                    </div>
                    <div className={`p-1.5 rounded-full ${link.id === 'dev' ? 'bg-gray-200' : 'bg-white/10'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <ArrowUpRight size={18} className={link.id === 'dev' ? 'text-black' : 'text-white'} />
                    </div>
                  </div>

                  <div className="z-10">
                    {link.id === 'github' && (
                      <span className="mb-2 inline-block px-2.5 py-0.5 text-[10px] font-bold bg-white text-black rounded uppercase tracking-wider">Follow</span>
                    )}
                    <EditableWrapper
                      value={link.name}
                      onChange={(newValue) => {
                        const newLinks = [...portfolioData.socialLinks];
                        newLinks[index] = { ...link, name: newValue };
                        setPortfolioData({ ...portfolioData, socialLinks: newLinks });
                      }}
                      type="text"
                      label="Editar Nome"
                    >
                      <h3 className={`font-bold text-lg ${textColor}`}>{link.name}</h3>
                    </EditableWrapper>
                    <EditableWrapper
                      value={link.handle}
                      onChange={(newValue) => {
                        const newLinks = [...portfolioData.socialLinks];
                        newLinks[index] = { ...link, handle: newValue };
                        setPortfolioData({ ...portfolioData, socialLinks: newLinks });
                      }}
                      type="text"
                      label="Editar Handle"
                    >
                      <p className={`text-xs ${subTextColor} font-medium truncate mt-0.5`}>{link.handle}</p>
                    </EditableWrapper>
                  </div>
                </a>
              </EditableWrapper>
            );
          })}
        </section>

        {/* Experience Section */}
        <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
            Experience
          </h2>
          <div className="relative border-l border-gray-800 ml-3 space-y-8">
            {portfolioData.experience.map((item, index) => (
              <div key={item.id} className="ml-6 relative group">
                {/* Dot on timeline */}
                <span className={`absolute -left-[1.95rem] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#121318] ${item.current ? 'bg-yellow-500 animate-pulse' : 'bg-gray-600'}`}></span>
                
                <div className="flex justify-end gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingExperienceIndex(index);
                      setTempExperience({ ...item });
                    }}
                    className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newExp = portfolioData.experience.filter((_, i) => i !== index);
                      setPortfolioData({ ...portfolioData, experience: newExp });
                      toast.success('Experiência removida!');
                    }}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                  <h3 className="text-white font-semibold text-lg">{item.role}</h3>
                  <time className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">{item.date}</time>
                </div>
                
                <p className="text-yellow-500/90 text-sm font-medium mb-2">{item.company}</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
            <h2 className="text-xl font-bold text-white">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolioData.projects.map((project, index) => (
              <div key={project.id} className="bg-[#18181b] p-5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors group relative">
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingProjectIndex(index);
                      setTempProject({ ...project });
                    }}
                    className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newProjects = portfolioData.projects.filter((_, i) => i !== index);
                      setPortfolioData({ ...portfolioData, projects: newProjects });
                      toast.success('Projeto removido!');
                    }}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
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
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => {
                const newProject = {
                  id: `p${portfolioData.projects.length + 1}`,
                  title: 'Novo Projeto',
                  description: 'Descrição do projeto',
                  tags: ['React', 'TypeScript'],
                  link: '#',
                };
                setPortfolioData({
                  ...portfolioData,
                  projects: [...portfolioData.projects, newProject],
                });
                toast.success('Novo projeto adicionado!');
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Projeto
            </Button>
          </div>
        </section>

        {/* Tech Stack Section */}
        <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {portfolioData.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#18181b] hover:bg-[#202025] text-gray-300 font-medium rounded-xl border border-white/5 hover:border-yellow-500/30 hover:text-yellow-500 transition-all cursor-default text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

