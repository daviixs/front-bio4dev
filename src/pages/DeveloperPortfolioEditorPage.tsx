import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Eye, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { EditablePortfolio1 } from '@/components/portfolio/EditablePortfolio1';
import { EditablePortfolio2 } from '@/components/portfolio/EditablePortfolio2';
import { EditablePortfolio3 } from '@/components/portfolio/EditablePortfolio3';
import {
  DeveloperPortfolioEditorShell,
  developerEditorChrome,
} from '@/components/shared/DeveloperPortfolioEditorShell';
import { isDeveloperTemplateType } from '@/features/developer-create/shared';
import { profileApi } from '@/lib/api';
import { getApiErrorMessage } from '@/lib/api-errors';
import type { ProfileComplete } from '@/types';
import { Button } from '@/components/ui/button';

const DEVELOPER_EDITOR_LOAD_TOAST_ID = 'developer-editor-load-toast';
const DEVELOPER_EDITOR_PREVIEW_TOAST_ID = 'developer-editor-preview-toast';

function renderPersistedEditor(
  profile: ProfileComplete,
  onProfileUpdate: (nextProfile?: ProfileComplete) => void,
) {
  if (profile.templateType === 'template_02') {
    return (
      <EditablePortfolio2
        profile={profile}
        mode="persisted"
        onProfileUpdate={onProfileUpdate}
      />
    );
  }

  if (profile.templateType === 'template_03') {
    return (
      <EditablePortfolio3
        profile={profile}
        mode="persisted"
        onProfileUpdate={onProfileUpdate}
      />
    );
  }

  return (
    <EditablePortfolio1
      profile={profile}
      mode="persisted"
      onProfileUpdate={onProfileUpdate}
    />
  );
}

export default function DeveloperPortfolioEditorPage() {
  const navigate = useNavigate();
  const { id, profileId } = useParams<{ id?: string; profileId?: string }>();
  const resolvedProfileId = profileId || id || null;
  const [profile, setProfile] = useState<ProfileComplete | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resolvedProfileId) {
      navigate('/dashboard/bio', { replace: true });
      return;
    }

    let isActive = true;

    const loadProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const profileData = await profileApi.getComplete(resolvedProfileId);

        if (!isActive) {
          return;
        }

        if (!isDeveloperTemplateType(profileData.templateType)) {
          setProfile(null);
          setError('Template nao suportado para edicao.');
          return;
        }

        setProfile(profileData);
      } catch (loadError: unknown) {
        if (!isActive) {
          return;
        }

        const message =
          getApiErrorMessage(loadError) ||
          (loadError instanceof Error
            ? loadError.message
            : 'Nao foi possivel carregar o portfolio.');

        setProfile(null);
        setError(message);
        toast.error(message, {
          id: DEVELOPER_EDITOR_LOAD_TOAST_ID,
        });
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      isActive = false;
    };
  }, [navigate, resolvedProfileId]);

  const refreshProfile = async () => {
    if (!resolvedProfileId) {
      return;
    }

    try {
      const updatedProfile = await profileApi.getComplete(resolvedProfileId);

      if (!isDeveloperTemplateType(updatedProfile.templateType)) {
        setProfile(null);
        setError('Template nao suportado para edicao.');
        return;
      }

      setProfile(updatedProfile);
      setError(null);
    } catch (refreshError: unknown) {
      const message =
        getApiErrorMessage(refreshError) ||
        (refreshError instanceof Error
          ? refreshError.message
          : 'Nao foi possivel atualizar o portfolio.');

      toast.error(message, {
        id: DEVELOPER_EDITOR_LOAD_TOAST_ID,
      });
    }
  };

  const handlePreview = async () => {
    if (!resolvedProfileId || !profile?.slug) {
      toast.error('Perfil nao encontrado para gerar preview.', {
        id: DEVELOPER_EDITOR_PREVIEW_TOAST_ID,
      });
      return;
    }

    try {
      setIsGeneratingPreview(true);

      const { token } = await profileApi.generatePreviewToken(resolvedProfileId);
      const previewUrl = `/${profile.slug}?preview=${token}`;

      window.open(previewUrl, '_blank', 'noopener,noreferrer');
    } catch (previewError: unknown) {
      const message =
        getApiErrorMessage(previewError) ||
        (previewError instanceof Error
          ? previewError.message
          : 'Nao foi possivel gerar o preview.');

      toast.error(message, {
        id: DEVELOPER_EDITOR_PREVIEW_TOAST_ID,
      });
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  if (isLoading) {
    return (
      <div className="developer-theme-scope flex min-h-screen items-center justify-center bg-[#f6efe7] text-slate-700">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          Carregando portfolio...
        </div>
      </div>
    );
  }

  if (!profile || error) {
    return (
      <div className="developer-theme-scope flex min-h-screen items-center justify-center bg-[#f6efe7] px-4">
        <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)]">
          <h1 className="text-lg font-semibold text-slate-900">
            Editor indisponivel
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {error || 'Nao foi possivel carregar este portfolio.'}
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/bio')}
            className="mt-5"
          >
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  const templateType = profile.templateType;

  if (!isDeveloperTemplateType(templateType)) {
    return (
      <div className="developer-theme-scope flex min-h-screen items-center justify-center bg-[#f6efe7] px-4">
        <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)]">
          <h1 className="text-lg font-semibold text-slate-900">
            Editor indisponivel
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Template nao suportado para edicao.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/bio')}
            className="mt-5"
          >
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <DeveloperPortfolioEditorShell
      title="Editor do portfólio"
      templateType={templateType}
      slug={profile.slug}
      metaNote={<span>Alteracoes salvas inline</span>}
      actions={
        <>
          <button
            type="button"
            onClick={handlePreview}
            disabled={isGeneratingPreview}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition ${developerEditorChrome.previewToolbarPrimary} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {isGeneratingPreview ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Preview
              </>
            )}
          </button>
          {profile.published ? (
            <button
              type="button"
              onClick={() =>
                window.open(`/${profile.slug}`, '_blank', 'noopener,noreferrer')
              }
              className={`inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition ${developerEditorChrome.previewToolbarSecondary}`}
            >
              <ExternalLink className="h-4 w-4" />
              Abrir portfólio
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => navigate('/dashboard/bio')}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition ${developerEditorChrome.previewToolbarSecondary}`}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
        </>
      }
    >
      {renderPersistedEditor(profile, () => void refreshProfile())}
    </DeveloperPortfolioEditorShell>
  );
}
