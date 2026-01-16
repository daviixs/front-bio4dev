import React from "react";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "tech" | "status";
  className?: string;
}

const variantStyles = {
  default:
    "text-[10px] font-medium px-2 py-1 bg-white/5 text-gray-300 rounded-md",
  tech: "px-4 py-2 bg-[#18181b] hover:bg-[#202025] text-gray-300 font-medium rounded-xl border border-white/5 hover:border-yellow-500/30 hover:text-yellow-500 transition-all cursor-default text-sm",
  status:
    "inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20",
};

/**
 * Tag/Badge reutilizável com variantes
 */
const Tag: React.FC<TagProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  return (
    <span className={`${variantStyles[variant]} ${className}`}>{children}</span>
  );
};

export default Tag;
