import { TechItem } from '../types';

interface TechStackProps {
  items: TechItem[];
}

export default function TechStack({ items }: TechStackProps) {
  return (
    <div className="mt-12 md:mt-10">
      <div className="text-[11px] tracking-[2px] text-[#666] mb-4 uppercase font-bold text-center md:text-left">
        EXPERIENCE WITH
      </div>
      <div className="flex gap-3 flex-wrap justify-center md:justify-start">
        {items.map((item, index) => (
          <div
            key={index}
            className="w-11 h-11 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[12px] font-bold border border-[#333] transition-colors hover:border-[#555]"
            style={{ color: item.color }}
            title={item.name}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
