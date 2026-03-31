import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, FileText, MousePointer2 } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { MetricCard } from "@/components/analytics/MetricCard";
import { ChartShell } from "@/components/analytics/ChartShell";
import { AreaSpark } from "@/components/analytics/AreaSpark";
import { TopPagesList } from "@/components/analytics/TopPagesList";
import { PageHeader } from "@/components/structure/PageHeader";
import { EmptyState } from "@/components/feedback/EmptyState";
import {
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

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const profilesState = useProfilesByUser(user?.id);
  const primaryProfile = profilesState.data?.[0];
  const overviewState = useOverviewData(primaryProfile?.id);
  const timeseriesState = useTimeseriesData(primaryProfile?.id, "day", "last90d");
  const topPagesState = useTopPagesData(primaryProfile?.id, 5, "last30d");

  const loading =
    profilesState.loading ||
    overviewState.loading ||
    timeseriesState.loading ||
    topPagesState.loading;

  const anyError =
    profilesState.error ||
    overviewState.error ||
    timeseriesState.error ||
    topPagesState.error;

  const userProfiles = profilesState.data || [];
  const publishedBios = userProfiles.filter((p) => p.published).length;
  const templatesUsed = new Set(userProfiles.map((p) => p.templateType)).size;

  const chartData = useMemo(() => {
    return (timeseriesState.data || []).map((item) => ({
      name: item.label,
      visits: item.visits,
      unique: item.unique,
    }));
  }, [timeseriesState.data]);

  const totalAccesses = overviewState.data?.totalVisits ?? 0;
  const avgSession = formatDuration(overviewState.data?.avgSessionDurationMs ?? 0);
  const growth = overviewState.data?.growthPct;

  if (profilesState.empty && !profilesState.loading) {
    return (
      <EmptyState
        title="Crie um perfil para ver seu dashboard"
        description="Você ainda não tem portfólios publicados."
        actionLabel="Criar perfil"
        onAction={() => navigate("/profile/create")}
      />
    );
  }

  if (anyError) {
    return (
      <EmptyState
        title="Não foi possível carregar o dashboard"
        description={anyError}
        actionLabel="Tentar novamente"
        onAction={() => {
          profilesState.refetch();
          overviewState.refetch();
          timeseriesState.refetch();
          topPagesState.refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your portfolio performance."
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
          title="Total Accesses"
          value={totalAccesses}
          delta={growth}
          helper="vs último mês"
          loading={loading}
          icon={<MousePointer2 className="h-4 w-4" />}
        />
        <MetricCard
          title="Published Bios"
          value={publishedBios}
          helper="Portfólios ativos"
          loading={loading}
          icon={<Globe className="h-4 w-4" />}
        />
        <MetricCard
          title="Templates Used"
          value={templatesUsed}
          helper="Distintos"
          loading={loading}
          icon={<FileText className="h-4 w-4" />}
        />
        <MetricCard
          title="Avg. Session"
          value={avgSession}
          delta={growth}
          helper="Últimos 30 dias"
          loading={loading}
        />
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-7">
        <ChartShell
          title="Access Analytics"
          loading={timeseriesState.loading}
          empty={chartData.length === 0}
          error={timeseriesState.error}
          onRetry={timeseriesState.refetch}
          height={300}
          className="lg:col-span-4"
        >
          <div className="h-[250px] sm:h-[300px] w-full">
            <AreaSpark data={chartData} showUnique />
          </div>
        </ChartShell>

        <ChartShell
          title="Most Accessed Pages"
          loading={topPagesState.loading}
          empty={(topPagesState.data || []).length === 0}
          error={topPagesState.error}
          onRetry={topPagesState.refetch}
          height={300}
          className="lg:col-span-3"
        >
          <TopPagesList pages={topPagesState.data || []} />
        </ChartShell>
      </div>
    </div>
  );
}
