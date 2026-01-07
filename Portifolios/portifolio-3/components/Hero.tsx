
import React from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Code2, 
  Cpu, 
  Database, 
  Globe, 
  Layers, 
  Terminal 
} from 'lucide-react';

const TechIcon: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-2 text-[#AAAAAA] hover:text-white transition-colors duration-300">
    <div className="p-3 bg-[#1A1A1A] rounded-xl border border-white/5 shadow-lg">
      {icon}
    </div>
    <span className="text-[10px] uppercase tracking-widest font-semibold">{label}</span>
  </div>
);

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col items-center text-center py-24 md:py-32 px-6 animate-fade-in">
      <div className="relative mb-8">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-[#C084FC] to-[#60A5FA] p-1 shadow-2xl shadow-[#C084FC]/20">
          <img 
            src="https://picsum.photos/seed/dev/200/200" 
            alt="Developer Avatar" 
            className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-[#1A1A1A] p-2 rounded-lg border border-white/10 shadow-xl">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
        I do code and make content <br /> 
        <span className="bg-gradient-to-r from-[#C084FC] to-[#a855f7] bg-clip-text text-transparent">
          about it!
        </span>
      </h1>

      <p className="text-[#AAAAAA] text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
        I am a seasoned full-stack software engineer with 8+ years of experience 
        building scalable web applications and sharing my journey with the community.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <button className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-all duration-300 transform hover:-translate-y-1">
          Get In Touch
        </button>
        <button className="px-8 py-3 border-2 border-white/20 bg-transparent text-white font-bold rounded-lg hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-1">
          Download CV
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        <TechIcon icon={<Globe size={24} />} label="JS" />
        <TechIcon icon={<Layers size={24} />} label="React" />
        <TechIcon icon={<Terminal size={24} />} label="Node" />
        <TechIcon icon={<Database size={24} />} label="SQL" />
        <TechIcon icon={<Code2 size={24} />} label="TS" />
        <TechIcon icon={<Cpu size={24} />} label="AWS" />
      </div>
    </section>
  );
};

export default Hero;
