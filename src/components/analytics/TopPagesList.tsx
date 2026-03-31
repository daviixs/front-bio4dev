import { ExternalLink } from "lucide-react";
import { cn } from "@/components/ui/utils";
import type { TopPage } from "@/types";

interface TopPagesListProps {
  pages: TopPage[];
}

export function TopPagesList({ pages }: TopPagesListProps) {
  if (!pages || pages.length === 0) return null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {pages.map((page) => (
        <div key={page.path} className="flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
              {page.path}
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
            <p className="text-xs text-muted-foreground">{page.visits} acessos</p>
          </div>
          <div
            className={cn(
              "text-xs font-medium",
              page.trendPct === null
                ? "text-muted-foreground"
                : page.trendPct >= 0
                  ? "text-emerald-600"
                  : "text-rose-500",
            )}
          >
            {page.trendPct === null ? "—" : `${page.trendPct.toFixed(1)}%`}
          </div>
        </div>
      ))}
    </div>
  );
}
