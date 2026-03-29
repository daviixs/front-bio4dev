import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Globe,
  FileText,
  MousePointer2,
  Loader2,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/components/ui/utils";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { analyticsApi, profileApi } from "@/lib/api";
import type {
  OverviewResponse,
  TimeseriesPoint,
  TopPage,
  Profile,
} from "@/types";

const formatDuration = (ms: number) => {
  if (!ms || ms <= 0) return "0s";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
};

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [timeseries, setTimeseries] = useState<TimeseriesPoint[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [publishedBios, setPublishedBios] = useState(0);
  const [templatesUsed, setTemplatesUsed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);

        const profiles: Profile[] = await profileApi.getAll();
        const userProfiles = profiles.filter((p) => p.userId === user.id);

        setPublishedBios(userProfiles.filter((p) => p.published).length);
        setTemplatesUsed(new Set(userProfiles.map((p) => p.templateType)).size);

        const primaryProfile = userProfiles[0];
        if (!primaryProfile) {
          setError("no-profile");
          return;
        }

        const [overviewRes, timeseriesRes, topPagesRes] = await Promise.all([
          analyticsApi.getOverview(primaryProfile.id),
          analyticsApi.getTimeseries(primaryProfile.id, "day", "last90d"),
          analyticsApi.getTopPages(primaryProfile.id, 5),
        ]);

        setOverview(overviewRes);
        setTimeseries(timeseriesRes);
        setTopPages(topPagesRes);
      } catch (err: any) {
        console.error(err);
        setError("fetch-error");
        toast.error("Erro ao carregar dados do dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const chartData = useMemo(() => {
    return timeseries.map((item) => ({
      name: item.label,
      visits: item.visits,
    }));
  }, [timeseries]);

  const totalAccesses = overview?.totalVisits ?? 0;
  const avgSession = formatDuration(overview?.avgSessionDurationMs ?? 0);
  const growth = overview?.growthPct;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error === "no-profile") {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
        <p className="text-lg font-semibold text-slate-900">
          Crie um perfil para ver seu dashboard.
        </p>
        <button
          onClick={() => navigate("/profile/create")}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          Criar perfil
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Overview of your portfolio performance.
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Accesses
            </CardTitle>
            <MousePointer2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAccesses}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {growth === null || growth === undefined ? (
                <span className="text-muted-foreground">—</span>
              ) : (
                <span
                  className={cn(
                    "font-medium inline-flex items-center",
                    growth >= 0 ? "text-emerald-600" : "text-rose-500",
                  )}
                >
                  {growth >= 0 ? (
                    <ArrowUp className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3" />
                  )}
                  {growth.toFixed(1)}%
                </span>
              )}{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Published Bios
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedBios}</div>
            <p className="text-xs text-muted-foreground mt-1">Active portfolios</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Templates Used
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templatesUsed}</div>
            <p className="text-xs text-muted-foreground mt-1">Distinct templates</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Session
            </CardTitle>
            <div className="h-4 w-4 text-muted-foreground font-bold text-xs">min</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSession}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {growth === null || growth === undefined ? (
                <span className="text-muted-foreground">—</span>
              ) : (
                <span
                  className={cn(
                    "font-medium inline-flex items-center",
                    growth >= 0 ? "text-emerald-600" : "text-rose-500",
                  )}
                >
                  {growth >= 0 ? (
                    <ArrowUp className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3" />
                  )}
                  {growth.toFixed(1)}%
                </span>
              )}{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Access Analytics</CardTitle>
          </CardHeader>
          <CardContent className="pl-0 sm:pl-2">
            <div className="h-[250px] sm:h-[300px] w-full">
              {chartData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  Nenhum acesso no período.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="visits"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorVisits)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Most Accessed Pages</CardTitle>
          </CardHeader>
          <CardContent>
            {topPages.length === 0 ? (
              <div className="text-sm text-muted-foreground">Nenhuma página acessada no período.</div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {topPages.map((page) => (
                  <div key={page.path} className="flex items-center justify-between group">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                        {page.path}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                      <p className="text-xs text-muted-foreground">{page.visits} accesses</p>
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
