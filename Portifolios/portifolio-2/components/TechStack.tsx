import React from "react";
import { Cpu } from "lucide-react";

interface TechStackProps {
  technologies: string[];
}

const TechStack: React.FC<TechStackProps> = ({ technologies }) => {
  if (!technologies || technologies.length === 0) {
    return (
      <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
          Tech Stack
        </h2>
        <p className="text-gray-400 text-center py-8">No technologies listed</p>
      </div>
    );
  }

  return (
    <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
        Tech Stack
      </h2>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-4 py-2 bg-[#18181b] hover:bg-[#202025] text-gray-300 font-medium rounded-xl border border-white/5 hover:border-yellow-500/30 hover:text-yellow-500 transition-all cursor-default text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
