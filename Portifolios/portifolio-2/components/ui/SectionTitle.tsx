import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Título de seção padronizado com indicador amarelo
 */
const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = "",
}) => {
  return (
    <h2
      className={`text-xl font-bold text-white mb-6 flex items-center gap-2 ${className}`}
    >
      <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block" />
      {children}
    </h2>
  );
};

export default SectionTitle;
