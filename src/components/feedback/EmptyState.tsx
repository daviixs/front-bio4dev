import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center gap-3 rounded-2xl border border-dashed border-[rgba(236,229,217,0.25)] bg-[#1b1613]/70 px-6 py-10 text-foreground/70 backdrop-blur-sm",
        "[animation-duration:260ms] animate-[fadeIn_0.26s_ease-out,slideUp_0.26s_ease-out]",
        className,
      )}
      style={{ animationFillMode: "both" }}
    >
      {icon && <div className="text-foreground/60">{icon}</div>}
      <div>
        <p className="text-base font-semibold text-foreground">{title}</p>
        {description && <p className="text-sm text-foreground/60 mt-1">{description}</p>}
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="default" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
