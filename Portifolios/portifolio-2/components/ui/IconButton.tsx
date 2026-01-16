import React from "react";
import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  variant?: "default" | "save" | "cancel" | "edit";
  size?: number;
  className?: string;
  title?: string;
}

const variantStyles = {
  default: "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white",
  save: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  cancel: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  edit: "text-gray-500 hover:text-yellow-500 opacity-0 group-hover:opacity-100",
};

/**
 * Botão de ícone padronizado com variantes
 */
const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  variant = "default",
  size = 16,
  className = "",
  title,
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-colors ${variantStyles[variant]} ${className}`}
    >
      <Icon size={size} />
    </button>
  );
};

export default IconButton;
