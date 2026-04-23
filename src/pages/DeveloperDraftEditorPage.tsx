import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { EditablePortfolio1 } from '@/components/portfolio/EditablePortfolio1';
import { EditablePortfolio2 } from '@/components/portfolio/EditablePortfolio2';
import { EditablePortfolio3 } from '@/components/portfolio/EditablePortfolio3';
import {
  GoogleAuthGate,
  type GoogleAuthGateChrome,
} from '@/components/shared/GoogleAuthGate';
import { PreviewToolbarCard } from '@/components/shared/PreviewToolbarCard';
import { developerOnboardingApi, profileApi } from '@/lib/api';
import { getApiErrorMessage } from '@/lib/api-errors';
import type { ProfileComplete } from '@/types';
import {
  clearDeveloperDraft,
  clearDeveloperDraftAuthIntent,
  loadDeveloperDraft,
  saveDeveloperDraft,
  setDeveloperDraftAuthIntent,
} from '@/features/developer-create/storage';
import {
  getDeveloperTemplateName,
  normalizeDeveloperDraft,
  normalizeDeveloperSlug,
  toDeveloperFinalizePayload,
  type DeveloperDraft,
} from '@/features/developer-create/shared';
import { persistLegacyProfilePointers } from '@/features/onboarding/storage';
import { useAuthStore } from '@/stores/authStore';

const DEV_DRAFT_TOAST_ID = 'developer-draft-editor-toast';
const DEV_EDITOR_CHROME = {
  root: 'developer-theme-scope flex min-h-screen flex-col bg-white',
  page: 'bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.12),transparent_34%)] bg-slate-50',
  previewToolbar:
    'border border-indigo-200/80 bg-white/94 text-slate-900 shadow-[0_24px_60px_-36px_rgba(79,70,229,0.35)] backdrop-blur',
  previewToolbarTitle: 'text-slate-900',
  previewToolbarMeta: 'text-slate-500',
  previewToolbarPrimary:
    'border border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700',
  previewToolbarSecondary:
    'border border-slate-200 bg-white text-slate-900 hover:bg-slate-100',
};

const DEV_GOOGLE_GATE_CHROME: GoogleAuthGateChrome = {
  modalBackdrop: 'bg-slate-950/45 backdrop-blur-[2px]',
  modalCard:
    'border border-slate-200 bg-white shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)]',
  modalAccentLine:
    'bg-gradient-to-r from-transparent via-slate-300/80 to-transparent',
  modalEyebrow: 'text-slate-500',
  modalTitle: 'text-slate-900',
  modalBody: 'text-slate-600',
  modalError:
    'rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700',
  modalContinue:
    'inline-flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-[1px] hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0',
  modalClose:
    'w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-800 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60',
};

function formatSavedAt(value: string | null) {
  if (!value) {
    return 'Ainda não salvo';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function syncDraftWithProfile(
  draft: DeveloperDraft,
  nextProfile: ProfileComplete,
): DeveloperDraft {
  const nextDisplayName =
    nextProfile.legendas?.[0]?.nome?.trim() ||
    nextProfile.username?.trim() ||
    draft.displayName;
  const nextSlug =
    normalizeDeveloperSlug(nextProfile.slug || draft.slug) || draft.slug;

  return (
    normalizeDeveloperDraft({
      ...draft,
      status: 'collecting',
      slug: nextSlug,
      displayName: nextDisplayName,
      updatedAt: new Date().toISOString(),
      profile: {
        ...nextProfile,
        username: nextDisplayName,
        slug: nextSlug,
        bio: nextProfile.legendas?.[0]?.descricao || nextProfile.bio,
        avatarUrl:
          nextProfile.legendas?.[0]?.legendaFoto || nextProfile.avatarUrl,
      },
    }) || draft
  );
}

export function DeveloperDraftEditorPage() {
  const navigate = useNavigate();
  const { draftId } = useParams<{ draftId: string }>();
  const authStatus = useAuthStore((state) => state.authStatus);
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isLoading);
  const authError = useAuthStore((state) => state.error);
  const bootstrapAuth = useAuthStore((state) => state.bootstrapAuth);
  const clearError = useAuthStore((state) => state.clearError);
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const [draft, setDraft] = useState<DeveloperDraft | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [isGoogleGateOpen, setIsGoogleGateOpen] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!draftId) {
      navigate('/profile/create/developer', { replace: true });
      return;
    }

    const storedDraft = loadDeveloperDraft(draftId);
    if (!storedDraft) {
      toast.error('Rascunho não encontrado neste navegador.', {
        id: DEV_DRAFT_TOAST_ID,
      });
      navigate('/profile/create/developer', { replace: true });
      return;
    }

    setDraft(storedDraft);
    setLastSavedAt(storedDraft.updatedAt);
    setIsLoading(false);
  }, [draftId, navigate]);

  const saveDraftSnapshot = (nextDraft: DeveloperDraft) => {
    setDraft(nextDraft);
    setLastSavedAt(nextDraft.updatedAt);
    saveDeveloperDraft(nextDraft);
  };

  const handleProfileUpdate = (nextProfile?: ProfileComplete) => {
    if (!draft || !nextProfile) {
      return;
    }

    saveDraftSnapshot(syncDraftWithProfile(draft, nextProfile));
  };

  const openGoogleGate = () => {
    clearError();
    setIsGoogleGateOpen(true);
  };

  const closeGoogleGate = () => {
    if (isAuthLoading) {
      return;
    }

    clearError();
    setIsGoogleGateOpen(false);
  };

  const finalizeDraft = async (currentDraft: DeveloperDraft) => {
    const result = await developerOnboardingApi.finalize(
      toDeveloperFinalizePayload(currentDraft),
    );

    persistLegacyProfilePointers(result.profileId, result.templateType);
    clearDeveloperDraftAuthIntent();
    clearDeveloperDraft(currentDraft.draftId);
    localStorage.removeItem('bio4dev_post_auth_redirect');
    await useAuthStore.getState().loadProfile();

    toast.success('Portfólio salvo com sucesso.', {
      id: DEV_DRAFT_TOAST_ID,
    });
    navigate(result.redirectTo, { replace: true });
  };

  const handleStartGoogleAuth = async () => {
    if (!draft) {
      toast.error('Rascunho não encontrado neste navegador.', {
        id: DEV_DRAFT_TOAST_ID,
      });
      navigate('/profile/create/developer', { replace: true });
      return;
    }

    const nextDraft = normalizeDeveloperDraft({
      ...draft,
      status: 'pending_auth',
      updatedAt: new Date().toISOString(),
    });

    if (!nextDraft) {
      toast.error('Não foi possível preparar o rascunho para login.', {
        id: DEV_DRAFT_TOAST_ID,
      });
      return;
    }

    saveDraftSnapshot(nextDraft);
    setDeveloperDraftAuthIntent({
      intent: 'developer_draft_finalize',
      draftId: nextDraft.draftId,
      returnTo: `/onboarding/developer/${nextDraft.draftId}`,
      createdAt: new Date().toISOString(),
    });
    localStorage.removeItem('bio4dev_post_auth_redirect');

    try {
      await loginWithGoogle();
    } catch {
      clearDeveloperDraftAuthIntent();

      const restoredDraft = normalizeDeveloperDraft({
        ...nextDraft,
        status: 'collecting',
        updatedAt: new Date().toISOString(),
      });

      if (restoredDraft) {
        saveDraftSnapshot(restoredDraft);
      }
    }
  };

  const handleFinalize = async () => {
    if (!draft || isFinalizing) {
      return;
    }

    setIsFinalizing(true);

    try {
      const availability = await profileApi.checkSlug(draft.slug);
      if (!availability.available) {
        toast.error(availability.message || 'Este link já está em uso.', {
          id: DEV_DRAFT_TOAST_ID,
        });
        return;
      }

      const resolvedAuthStatus =
        authStatus === 'booting' ? await bootstrapAuth() : authStatus;
      const resolvedUser = useAuthStore.getState().user ?? user;

      if (resolvedAuthStatus === 'authenticated' && resolvedUser?.id) {
        await finalizeDraft(draft);
        return;
      }

      openGoogleGate();
    } catch (error: unknown) {
      console.error('Error finalizing developer draft:', error);
      const message =
        getApiErrorMessage(error) ||
        (error instanceof Error
          ? error.message
          : 'Não foi possível salvar seu portfólio.');

      const restoredDraft = normalizeDeveloperDraft({
        ...draft,
        status: 'collecting',
        updatedAt: new Date().toISOString(),
      });
      if (restoredDraft) {
        saveDraftSnapshot(restoredDraft);
      }

      toast.error(message, {
        id: DEV_DRAFT_TOAST_ID,
      });

      if (message.toLowerCase().includes('limite')) {
        navigate('/dashboard/bio');
      }
    } finally {
      setIsFinalizing(false);
    }
  };

  const editor = useMemo(() => {
    if (!draft) {
      return null;
    }

    if (draft.templateType === 'template_02') {
      return (
        <EditablePortfolio2
          profile={draft.profile}
          mode="draft"
          onProfileUpdate={handleProfileUpdate}
        />
      );
    }

    if (draft.templateType === 'template_03') {
      return (
        <EditablePortfolio3
          profile={draft.profile}
          mode="draft"
          onProfileUpdate={handleProfileUpdate}
        />
      );
    }

    return (
      <EditablePortfolio1
        profile={draft.profile}
        mode="draft"
        onProfileUpdate={handleProfileUpdate}
      />
    );
  }, [draft]);

  if (isLoading) {
    return (
      <div className="developer-theme-scope flex min-h-screen items-center justify-center bg-[#f6efe7] text-slate-700">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          Carregando rascunho...
        </div>
      </div>
    );
  }

  if (!draft) {
    return null;
  }

  return (
    <div className={DEV_EDITOR_CHROME.root}>
      <div className={`px-4 pt-5 sm:px-6 sm:pt-6 ${DEV_EDITOR_CHROME.page}`}>
        <PreviewToolbarCard
          title="Preview do template"
          meta={
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{getDeveloperTemplateName(draft.templateType)}</span>
              <span className="text-slate-300">·</span>
              <span className="font-mono text-[13px]">
                bio4.dev/{draft.slug}
              </span>
              <span className="text-slate-300">·</span>
            </div>
          }
          className={DEV_EDITOR_CHROME.previewToolbar}
          titleClassName={DEV_EDITOR_CHROME.previewToolbarTitle}
          metaClassName={DEV_EDITOR_CHROME.previewToolbarMeta}
          actions={
            <>
              <button
                type="button"
                disabled={isFinalizing}
                onClick={() => void handleFinalize()}
                className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition ${DEV_EDITOR_CHROME.previewToolbarPrimary} disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {isFinalizing
                  ? 'Salvando...'
                  : authStatus === 'authenticated'
                    ? 'Salvar portfólio'
                    : 'Criar conta e salvar'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile/create/developer')}
                className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition ${DEV_EDITOR_CHROME.previewToolbarSecondary}`}
              >
                Trocar template
              </button>
            </>
          }
        />
      </div>

      <div
        className={
          draft.templateType === 'template_02'
            ? 'bg-[#050505]'
            : draft.templateType === 'template_03'
              ? 'bg-[#0d0d0d]'
              : 'bg-[#c5b9b7]'
        }
      >
        {editor}
      </div>

      <GoogleAuthGate
        open={isGoogleGateOpen}
        isLoading={isAuthLoading}
        error={authError}
        chrome={DEV_GOOGLE_GATE_CHROME}
        eyebrow="Criar portfólio"
        title="Seu portfólio está quase pronto"
        body="Entre com Google para criar seu portfólio e concluir automaticamente."
        onClose={closeGoogleGate}
        onContinue={handleStartGoogleAuth}
      />
    </div>
  );
}
