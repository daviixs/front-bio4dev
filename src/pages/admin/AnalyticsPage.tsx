import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUp,
  ArrowDown,
  Users,
  Eye,
  MousePointer2,
  Clock,
  Loader2,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { analyticsApi, profileApi } from "@/lib/api";
import type {
  OverviewResponse,
  TimeseriesPoint,
  DeviceBreakdown,
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

export default function AnalyticsPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<OverviewResponse | null>(null);
  const [timeseries, setTimeseries] = useState<TimeseriesPoint[]>([]);
  const [devices, setDevices] = useState<DeviceBreakdown[]>([]);
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
        const userProfile = profiles.find((p) => p.userId === user.id);

        if (!userProfile) {
          setError("no-profile");
          return;
        }

        const [overviewRes, timeseriesRes, devicesRes] = await Promise.all([
          analyticsApi.getOverview(userProfile.id),
          analyticsApi.getTimeseries(userProfile.id, "day", "last90d"),
          analyticsApi.getDevices(userProfile.id),
        ]);

        setOverview(overviewRes);
        setTimeseries(timeseriesRes);
        setDevices(devicesRes);
      } catch (err: any) {
        console.error(err);
        setError("fetch-error");
        toast.error("Erro ao carregar analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const accessData = useMemo(
    () =>
      timeseries.map((item) => ({
        name: item.label,
        visits: item.visits,
        unique: item.unique,
      })),
    [timeseries],
  );

  const deviceData = useMemo(
    () => devices.map((d) => ({ name: d.device, value: d.value })),
    [devices],
  );

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
          Crie um perfil para ver analytics.
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

  const growth = overview?.growthPct;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Analytics
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Detailed insights into your portfolio performance.
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Visits
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.totalVisits ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {growth === null || growth === undefined ? (
                <span className="text-muted-foreground">—</span>
              ) : (
                <span
                  className={`font-medium inline-flex items-center ${
                    growth >= 0 ? "text-emerald-600" : "text-rose-500"
                  }`}
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
              Unique Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overview?.uniqueVisitors ?? "—"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Same as visits for now</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Session Duration
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDuration(overview?.avgSessionDurationMs ?? 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bounce Rate
            </CardTitle>
            <MousePointer2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(overview?.bounceRatePct ?? 0).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Últimos 30 dias</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Visits Over Time</CardTitle>
          </CardHeader>
          <CardContent className="pl-0 sm:pl-2">
            <div className="h-[250px] sm:h-[300px] w-full">
              {accessData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  Nenhum acesso no período.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={accessData}>
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
                    <Area
                      type="monotone"
                      dataKey="unique"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fillOpacity={0}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pl-0 sm:pl-2">
            <div className="h-[250px] sm:h-[300px] w-full">
              {deviceData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  Nenhum dado de dispositivo.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deviceData}>
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
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="hsl(var(--primary))"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
