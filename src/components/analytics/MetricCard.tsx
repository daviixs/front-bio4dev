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
  return delta >= 0 ? "text-emerald-600" : "text-rose-500";
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
        "shadow-sm transition-transform duration-200",
        "[animation-duration:220ms] animate-[fadeIn_0.22s_ease-out,slideUp_0.22s_ease-out]",
        className,
      )}
      style={{ animationFillMode: "both" }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {icon && <span className="text-slate-500">{icon}</span>}
          {title}
        </CardTitle>
        <span className="text-xs font-medium text-slate-400">{helper}</span>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-3xl font-bold text-slate-900">{value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={cn("font-semibold inline-flex items-center gap-1", deltaColor(delta))}>
                {formatDelta(delta)}
              </span>
              {helper ? <span className="ml-2 text-slate-500">{helper}</span> : null}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
