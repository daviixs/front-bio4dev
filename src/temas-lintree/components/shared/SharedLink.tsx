
import React from 'react';

interface SharedLinkProps {
  label: string;
  subtext?: string;
  icon?: React.ReactNode;
  className: string;
  onClick?: () => void;
}

const SharedLink: React.FC<SharedLinkProps> = ({ label, subtext, icon, className, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 transition-all duration-300 group ${className}`}
  >
    <div className="flex items-center gap-3">
      {icon && <div className="group-hover:scale-110 transition-transform">{icon}</div>}
      <div className="text-left">
        <span className="block font-bold text-sm uppercase tracking-tight">{label}</span>
        {subtext && <span className="block text-[10px] opacity-60 font-medium">{subtext}</span>}
      </div>
    </div>
  </button>
);

export default SharedLink;
