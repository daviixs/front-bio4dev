import { ExperienceItem } from '../types';

interface ExperienceProps {
  items: ExperienceItem[];
}

export default function Experience({ items }: ExperienceProps) {
  return (
    <div id="experience" className="flex-1">
      <div className="text-[#4A9EFF] font-bold mb-5 text-lg">EXPERIENCE</div>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 pb-4 border-b border-[#222] last:border-none"
          >
            <div className="w-10 h-10 min-w-[40px] rounded-lg bg-[#eee] flex items-center justify-center font-bold text-black overflow-hidden">
              {item.logo}
            </div>
            <div>
              <h4 className="text-sm mb-0.5 font-bold">{item.role}</h4>
              <div className="text-xs text-[#a0a0a0] mb-1.5">{item.period}</div>
              <p className="text-[11px] text-[#888] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
