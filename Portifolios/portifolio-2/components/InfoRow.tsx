import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoRowProps {
  icon: LucideIcon;
  text: string;
  className?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon: Icon, text, className = "" }) => {
  return (
    <div className={`flex items-center gap-3 text-sm text-gray-300 ${className}`}>
      <Icon size={16} className={text.includes("Product Designer") || text.includes("Dev") ? "text-yellow-500" : "text-red-500"} />
      <span className="font-medium tracking-wide">{text}</span>
    </div>
  );
};

export default InfoRow;