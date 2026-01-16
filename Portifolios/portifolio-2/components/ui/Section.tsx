import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container padrão para seções do portfólio
 * Aplica estilos consistentes: fundo escuro, bordas arredondadas, padding
 */
const Section: React.FC<SectionProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-[#121318] rounded-[2rem] p-6 border border-white/5 ${className}`}
    >
      {children}
    </div>
  );
};

export default Section;
