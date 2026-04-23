import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  FileText,
  MousePointer2,
  ExternalLink,
  Edit2,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
  LayoutTemplate,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/authStore';
import { profileApi } from '@/lib/api';
import { MetricCard } from '@/components/analytics/MetricCard';
import { ChartShell } from '@/components/analytics/ChartShell';
import { AreaSpark } from '@/components/analytics/AreaSpark';
import { TopPagesList } from '@/components/analytics/TopPagesList';
import { PageHeader } from '@/components/structure/PageHeader';
import { EmptyState } from '@/components/feedback/EmptyState';
import {
  useOverviewData,
  useProfilesByUser,
  useTimeseriesData,
  useTopPagesData,
} from '@/hooks/useAnalyticsData';
import type { Profile } from '@/types';
import { useState } from 'react';

const DASHBOARD_TOAST_ID = 'dashboard-action-toast';

const formatDuration = (ms: number) => {
  if (!ms || ms <= 0) return '0s';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
};

function PortfolioCard({
  profile,
  onTogglePublish,
  publishLoading,
}: {
  profile: Profile;
  onTogglePublish: (profile: Profile) => void;
  publishLoading: string | null;
}) {
  const navigate = useNavigate();
  const publicUrl = `/${profile.slug}`;

  return (
    <div className="group rounded-xl border border-[rgba(236,229,217,0.10)] bg-[#1d1714]/60 p-5 transition-all duration-200 hover:border-[rgba(236,229,217,0.18)] hover:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-10 rounded-lg bg-gradient-to-br from-[#c3986b]/20 to-[#b1835f]/10 border border-[rgba(236,229,217,0.08)] flex items-center justify-center flex-shrink-0">
            <LayoutTemplate className="size-4 text-[#c3986b]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate">
              {profile.username || profile.slug}
            </h3>
            <p className="text-xs text-foreground/50 truncate">
              {profile.templateType.replace('_', ' ')}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
            profile.published
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
              : 'bg-foreground/5 text-foreground/50 border border-foreground/10'
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${profile.published ? 'bg-emerald-400' : 'bg-foreground/30'}`}
          />
          {profile.published ? 'Published' : 'Draft'}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => window.open(publicUrl, '_blank')}
          className="text-xs text-[#c3986b]/70 hover:text-[#c3986b] transition-colors flex items-center gap-1 truncate"
        >
          bio4dev.com/{profile.slug}
          <ExternalLink className="size-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(`/dashboard/portfolio/${profile.id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground/70 bg-foreground/5 hover:bg-foreground/10 hover:text-foreground transition-all"
        >
          <Edit2 className="size-3.5" />
          Edit
        </button>
        <button
          onClick={() => {
            const base = window.location.origin;
            window.open(`${base}${publicUrl}`, '_blank');
          }}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground/70 bg-foreground/5 hover:bg-foreground/10 hover:text-foreground transition-all"
        >
          <Eye className="size-3.5" />
          View
        </button>
        <button
          onClick={() => onTogglePublish(profile)}
          disabled={publishLoading === profile.id}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            profile.published
              ? 'text-amber-400/80 bg-amber-500/10 hover:bg-amber-500/15 hover:text-amber-400'
              : 'text-emerald-400/80 bg-emerald-500/10 hover:bg-emerald-500/15 hover:text-emerald-400'
          } disabled:opacity-50`}
        >
          {publishLoading === profile.id ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : profile.published ? (
            <XCircle className="size-3.5" />
          ) : (
            <CheckCircle className="size-3.5" />
          )}
          {profile.published ? 'Unpublish' : 'Publish'}
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [publishLoading, setPublishLoading] = useState<string | null>(null);

  const profilesState = useProfilesByUser(user?.id);
  const primaryProfile = profilesState.data?.[0];
  const overviewState = useOverviewData(primaryProfile?.id);
  const timeseriesState = useTimeseriesData(
    primaryProfile?.id,
    'day',
    'last90d',
  );
  const topPagesState = useTopPagesData(primaryProfile?.id, 5, 'last30d');

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
  const avgSession = formatDuration(
    overviewState.data?.avgSessionDurationMs ?? 0,
  );
  const growth = overviewState.data?.growthPct;

  const handleTogglePublish = async (profile: Profile) => {
    try {
      setPublishLoading(profile.id);
      const newStatus = !profile.published;
      await profileApi.update(profile.id, { published: newStatus });
      profilesState.refetch();
      toast.success(
        newStatus ? 'Portfolio published!' : 'Portfolio unpublished.',
        { id: DASHBOARD_TOAST_ID },
      );
    } catch {
      toast.error('Failed to change publish status.', {
        id: DASHBOARD_TOAST_ID,
      });
    } finally {
      setPublishLoading(null);
    }
  };

  if (profilesState.empty && !profilesState.loading) {
    return (
      <EmptyState
        title="Crie um perfil para ver seu dashboard"
        description="Você ainda não tem portfólios publicados."
        actionLabel="Criar perfil"
        onAction={() => navigate('/profile/create')}
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
            onClick={() => navigate('/profile/create')}
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

      {/* Published Portfolios */}
      {userProfiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Your Portfolios
              </h2>
              <p className="text-sm text-foreground/50 mt-0.5">
                {publishedBios} published · {userProfiles.length - publishedBios}{' '}
                draft
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard/bio')}
              className="text-xs text-[#c3986b]/70 hover:text-[#c3986b] transition-colors font-medium"
            >
              View all →
            </button>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {userProfiles.map((profile) => (
              <PortfolioCard
                key={profile.id}
                profile={profile}
                onTogglePublish={handleTogglePublish}
                publishLoading={publishLoading}
              />
            ))}
          </div>
        </div>
      )}

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
