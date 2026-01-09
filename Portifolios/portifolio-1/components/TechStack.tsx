import { TechStack as TechStackType } from '@/types';
import { TechIcon } from '@/components/portfolio/TechIcon';

interface TechStackProps {
  techStack?: TechStackType;
}

export function TechStack({ techStack }: TechStackProps) {
  const technologies = techStack?.technologies || [
    { name: 'HTML5', icon: 'logos:html-5', color: 'text-orange-600' },
    { name: 'CSS3', icon: 'logos:css-3', color: 'text-blue-600' },
    { name: 'JavaScript', icon: 'logos:javascript', color: 'text-yellow-500' },
    { name: 'React', icon: 'logos:react', color: 'text-cyan-500' },
    { name: 'Node.js', icon: 'logos:nodejs-icon', color: 'text-green-600' },
    { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', color: 'text-teal-500' },
    { name: 'Git', icon: 'logos:git-icon', color: 'text-orange-700' },
    { name: 'GitHub', icon: 'logos:github-icon', color: 'text-gray-800' },
    { name: 'VS Code', icon: 'logos:visual-studio-code', color: 'text-blue-500' },
    { name: 'Database', icon: 'logos:postgresql', color: 'text-purple-600' },
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
                <TechIcon icon={tech.icon} size={40} />
              </div>
              <span className="text-gray-700">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
