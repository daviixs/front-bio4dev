import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Eye, MousePointer2, Clock } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { MetricCard } from "@/components/analytics/MetricCard";
import { ChartShell } from "@/components/analytics/ChartShell";
import { AreaSpark } from "@/components/analytics/AreaSpark";
import { BarDiscrete } from "@/components/analytics/BarDiscrete";
import { TopPagesList } from "@/components/analytics/TopPagesList";
import { PageHeader } from "@/components/structure/PageHeader";
import { EmptyState } from "@/components/feedback/EmptyState";
import {
  useDevicesData,
  useOverviewData,
  useProfilesByUser,
  useTimeseriesData,
  useTopPagesData,
} from "@/hooks/useAnalyticsData";

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

  const profilesState = useProfilesByUser(user?.id);
  const primaryProfile = profilesState.data?.[0];
  const overviewState = useOverviewData(primaryProfile?.id);
  const timeseriesState = useTimeseriesData(primaryProfile?.id, "day", "last90d");
  const devicesState = useDevicesData(primaryProfile?.id, "last30d");
  const topPagesState = useTopPagesData(primaryProfile?.id, 5, "last30d");

  const loading =
    profilesState.loading ||
    overviewState.loading ||
    timeseriesState.loading ||
    devicesState.loading ||
    topPagesState.loading;

  const anyError =
    profilesState.error ||
    overviewState.error ||
    timeseriesState.error ||
    devicesState.error ||
    topPagesState.error;

  const accessData = useMemo(
    () =>
      (timeseriesState.data || []).map((item) => ({
        name: item.label,
        visits: item.visits,
        unique: item.unique,
      })),
    [timeseriesState.data],
  );

  const deviceData = useMemo(
    () => (devicesState.data || []).map((d) => ({ name: d.device, value: d.value })),
    [devicesState.data],
  );

  if (profilesState.empty && !profilesState.loading) {
    return (
      <EmptyState
        title="Crie um perfil para ver analytics"
        description="Você ainda não tem portfólios publicados."
        actionLabel="Criar perfil"
        onAction={() => navigate("/profile/create")}
      />
    );
  }

  if (anyError) {
    return (
      <EmptyState
        title="Erro ao carregar analytics"
        description={anyError}
        actionLabel="Tentar novamente"
        onAction={() => {
          profilesState.refetch();
          overviewState.refetch();
          timeseriesState.refetch();
          devicesState.refetch();
          topPagesState.refetch();
        }}
      />
    );
  }

  const growth = overviewState.data?.growthPct;

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Analytics"
        subtitle="Detailed insights into your portfolio performance."
        actions={
          <button
            onClick={() => navigate("/profile/create")}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Criar perfil
          </button>
        }
      />

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Visits"
          value={overviewState.data?.totalVisits ?? 0}
          delta={growth}
          helper="vs último mês"
          loading={loading}
          icon={<Eye className="h-4 w-4" />}
        />
        <MetricCard
          title="Unique Visitors"
          value={overviewState.data?.uniqueVisitors ?? "—"}
          helper="Contagem estimada"
          loading={loading}
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Avg. Session Duration"
          value={formatDuration(overviewState.data?.avgSessionDurationMs ?? 0)}
          helper="Últimos 30 dias"
          loading={loading}
          icon={<Clock className="h-4 w-4" />}
        />
        <MetricCard
          title="Bounce Rate"
          value={`${(overviewState.data?.bounceRatePct ?? 0).toFixed(1)}%`}
          helper="Últimos 30 dias"
          loading={loading}
          icon={<MousePointer2 className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <ChartShell
          title="Visits Over Time"
          loading={timeseriesState.loading}
          empty={accessData.length === 0}
          error={timeseriesState.error}
          onRetry={timeseriesState.refetch}
          height={300}
        >
          <div className="h-[250px] sm:h-[300px] w-full">
            <AreaSpark data={accessData} showUnique />
          </div>
        </ChartShell>

        <ChartShell
          title="Device Breakdown"
          loading={devicesState.loading}
          empty={deviceData.length === 0}
          error={devicesState.error}
          onRetry={devicesState.refetch}
          height={300}
        >
          <div className="h-[250px] sm:h-[300px] w-full">
            <BarDiscrete data={deviceData} />
          </div>
        </ChartShell>
      </div>

      <ChartShell
        title="Top pages"
        loading={topPagesState.loading}
        empty={(topPagesState.data || []).length === 0}
        error={topPagesState.error}
        onRetry={topPagesState.refetch}
        height={260}
      >
        <TopPagesList pages={topPagesState.data || []} />
      </ChartShell>
    </div>
  );
}
