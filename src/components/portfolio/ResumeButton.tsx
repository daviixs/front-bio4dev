import React from "react";
import { FileDown } from "lucide-react";
import { cn } from "@/components/ui/utils";

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
        "fixed top-6 left-6 z-[100]",
        "inline-flex items-center gap-2 px-6 py-3",
        "bg-gradient-to-r from-blue-600 to-purple-600",
        "text-white font-semibold rounded-lg",
        "hover:from-blue-700 hover:to-purple-700",
        "transition-all duration-300",
        "shadow-lg hover:shadow-xl hover:scale-105",
        "backdrop-blur-sm",
        className
      )}
    >
      <FileDown size={20} />
      <span className="hidden sm:inline">Download CV</span>
      <span className="sm:hidden">CV</span>
    </a>
  );
}
