import React from 'react';
import { EXPERIENCE_DATA } from '../constants';

const ExperienceTimeline: React.FC = () => {
  return (
    <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
        Experience
      </h2>
      
      <div className="relative border-l border-gray-800 ml-3 space-y-8">
        {EXPERIENCE_DATA.map((item, index) => (
          <div key={item.id} className="ml-6 relative">
            {/* Dot on timeline */}
            <span className={`absolute -left-[1.95rem] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#121318] ${item.current ? 'bg-yellow-500 animate-pulse' : 'bg-gray-600'}`}></span>
            
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
  );
};

export default ExperienceTimeline;