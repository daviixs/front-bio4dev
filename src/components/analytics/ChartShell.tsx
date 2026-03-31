import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/components/ui/utils";

interface ChartShellProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  loading?: boolean;
  empty?: boolean;
  error?: string | null;
  onRetry?: () => void;
  height?: number;
  className?: string;
}

export function ChartShell({
  title,
  action,
  children,
  loading,
  empty,
  error,
  onRetry,
  height = 300,
  className,
}: ChartShellProps) {
  return (
    <Card
      className={cn(
        "shadow-sm [animation-duration:220ms] animate-[fadeIn_0.22s_ease-out,slideUp_0.22s_ease-out]",
        className,
      )}
      style={{ animationFillMode: "both" }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg sm:text-xl text-slate-900">{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent className="pl-0 sm:pl-2">
        <div className="w-full" style={{ height }}>
          {loading ? (
            <div className="space-y-3 px-6 py-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-full w-full" />
            </div>
          ) : error ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center text-muted-foreground px-6">
              <p className="text-sm">{error}</p>
              {onRetry && (
                <Button variant="outline" size="sm" onClick={onRetry}>
                  Tentar novamente
                </Button>
              )}
            </div>
          ) : empty ? (
            <div className="h-full flex flex-col items-center justify-center text-sm text-muted-foreground">
              Nenhum dado disponível.
            </div>
          ) : (
            children
          )}
        </div>
      </CardContent>
    </Card>
  );
}
