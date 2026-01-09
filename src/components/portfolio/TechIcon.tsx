import React from 'react';
import { Icon } from '@iconify/react';
import { Terminal } from 'lucide-react';

interface TechIconProps {
  icon: string;
  className?: string;
  size?: number;
}

export function TechIcon({ icon, className, size = 40 }: TechIconProps) {
  // Se o ícone for uma string do Iconify (ex: logos:react)
  if (icon.includes(':')) {
    return <Icon icon={icon} className={className} style={{ fontSize: size }} />;
  }

  // Fallback para ícones do Lucide ou placeholders se for apenas um nome curto
  return <Terminal className={className} size={size} />;
}
