import React from 'react';
import { FileDown } from 'lucide-react';
import { cn } from '@/components/ui/utils';

interface ResumeButtonProps {
  resumeUrl?: string;
  className?: string;
}

export function ResumeButton({ resumeUrl, className }: ResumeButtonProps) {
  return (
    <a
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed top-6 left-6 z-[100]',
        'inline-flex items-center gap-2 px-6 py-3',
        'bg-gray-900',
        'text-white font-semibold rounded-lg',
        'hover:bg-gray-800',
        'transition-all duration-300',
        'shadow-lg hover:shadow-xl',
        'backdrop-blur-sm',
        className,
      )}
    >
      <FileDown size={20} />
      <span className="hidden sm:inline">Download CV</span>
      <span className="sm:hidden">CV</span>
    </a>
  );
}
