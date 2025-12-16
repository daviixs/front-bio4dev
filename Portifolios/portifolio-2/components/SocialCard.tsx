import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SocialLink } from '../types';

interface SocialCardProps {
  item: SocialLink;
}

const SocialCard: React.FC<SocialCardProps> = ({ item }) => {
  const textColor = item.textColorClass || 'text-white';
  const subTextColor = item.textColorClass ? 'text-gray-600' : 'text-gray-400';

  return (
    <a 
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${item.colSpan === 2 ? 'col-span-2' : 'col-span-1'}
        ${item.colorClass}
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
        <div className={`p-2.5 rounded-xl ${item.id === 'dev' ? 'bg-black text-white' : 'bg-white/10'}`}>
          <item.icon size={22} className={item.id === 'dev' ? 'text-white' : 'text-white'} />
        </div>
        <div className={`p-1.5 rounded-full ${item.id === 'dev' ? 'bg-gray-200' : 'bg-white/10'} opacity-0 group-hover:opacity-100 transition-opacity`}>
           <ArrowUpRight size={18} className={item.id === 'dev' ? 'text-black' : 'text-white'} />
        </div>
      </div>

      <div className="z-10">
        {item.id === 'github' && (
             <span className="mb-2 inline-block px-2.5 py-0.5 text-[10px] font-bold bg-white text-black rounded uppercase tracking-wider">Follow</span>
        )}
        <h3 className={`font-bold text-lg ${textColor}`}>{item.name}</h3>
        <p className={`text-xs ${subTextColor} font-medium truncate mt-0.5`}>{item.handle}</p>
      </div>
    </a>
  );
};

export default SocialCard;