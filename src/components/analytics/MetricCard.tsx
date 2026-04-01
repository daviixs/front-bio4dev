import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/components/ui/utils";

interface MetricCardProps {
  title: string;
  value: ReactNode;
  helper?: string;
  delta?: number | null;
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
}

const deltaColor = (delta?: number | null) => {
  if (delta === null || delta === undefined) return "text-muted-foreground";
  return delta >= 0 ? "text-[#7bc79b]" : "text-[#e27b7b]";
};

const formatDelta = (delta?: number | null) => {
  if (delta === null || delta === undefined) return "—";
  const sign = delta > 0 ? "+" : "";
  return `${sign}${delta.toFixed(1)}%`;
};

export function MetricCard({
  title,
  value,
  helper,
  delta,
  loading,
  icon,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-[rgba(236,229,217,0.14)] shadow-[0_18px_40px_-28px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:-translate-y-0.5",
        "[animation-duration:260ms] animate-[fadeIn_0.26s_ease-out,slideUp_0.26s_ease-out]",
        className,
      )}
      style={{ animationFillMode: "both" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/4 via-transparent to-white/2 opacity-60" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {icon && <span className="text-foreground/70">{icon}</span>}
          {title}
        </CardTitle>
        <span className="text-xs font-medium text-foreground/50">{helper}</span>
      </CardHeader>
      <CardContent className="relative z-10">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-3xl font-semibold text-foreground">{value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={cn("font-semibold inline-flex items-center gap-1", deltaColor(delta))}>
                {formatDelta(delta)}
              </span>
              {helper ? <span className="ml-2 text-foreground/60">{helper}</span> : null}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
