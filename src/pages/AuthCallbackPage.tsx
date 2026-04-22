import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { developerOnboardingApi, onboardingApi } from '@/lib/api';
import { getApiErrorMessage } from '@/lib/api-errors';
import {
  clearDeveloperDraft,
  clearDeveloperDraftAuthIntent,
  loadDeveloperDraft,
  readDeveloperDraftAuthIntent,
} from '@/features/developer-create/storage';
import { toDeveloperFinalizePayload } from '@/features/developer-create/shared';
import {
  clearDraft,
  consumeAuthIntent,
  loadDraft,
  persistLegacyProfilePointers,
  toFinalizeOnboardingPayload,
} from '@/features/onboarding/storage';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

const AUTH_CALLBACK_TOAST_ID = 'auth-callback-toast';
const AUTH_CALLBACK_MESSAGES: Record<string, string> = {
  access_denied: 'Você cancelou o login com Google.',
  invalid_state: 'A validação do login expirou. Tente novamente.',
  missing_code: 'Não foi possível concluir o login com Google.',
  oauth_provider_error:
    'O Google não concluiu a autenticação. Tente novamente.',
  oauth_callback_failed:
    'Não foi possível autenticar com Google. Tente novamente.',
};

export function AuthCallbackPage() {
  const [processing, setProcessing] = useState(true);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { bootstrapAuth } = useAuthStore();

  useEffect(() => {
    const hydrateProfile = () => {
      void useAuthStore.getState().loadProfile();
    };
    const status = params.get('status');
    const reason = params.get('reason') || '';

    const completeAuthRedirect = async () => {
      if (status !== 'success') {
        throw new Error(
          AUTH_CALLBACK_MESSAGES[reason] ||
            'Não foi possível autenticar. Tente novamente.',
        );
      }

      const authStatus = await bootstrapAuth();
      if (authStatus !== 'authenticated') {
        throw new Error(
          'Sua sessão não pôde ser restaurada após o login. Tente novamente.',
        );
      }

      const authIntent = consumeAuthIntent();

      if (authIntent?.intent === 'onboarding_finalize') {
        const draft = loadDraft(authIntent.draftId);
        if (!draft) {
          toast.error('Rascunho do onboarding não encontrado.', {
            id: AUTH_CALLBACK_TOAST_ID,
          });
          navigate('/profile/create', { replace: true });
          return;
        }

        try {
          const result = await onboardingApi.finalize(
            toFinalizeOnboardingPayload(draft),
          );

          persistLegacyProfilePointers(result.profileId, result.templateType);
          clearDraft(draft.draftId);
          localStorage.removeItem('bio4dev_post_auth_redirect');
          hydrateProfile();

          if (result.skippedPlatforms.length > 0) {
            toast.warning(
              `Algumas plataformas ainda nao sao suportadas pela API: ${result.skippedPlatforms.join(', ')}.`,
              { id: AUTH_CALLBACK_TOAST_ID },
            );
          }

          navigate(result.redirectTo, { replace: true });
          return;
        } catch (error: unknown) {
          const message =
            getApiErrorMessage(error) ||
            'Não foi possível salvar seu perfil após o login.';

          toast.error(message, { id: AUTH_CALLBACK_TOAST_ID });

          if (message.toLowerCase().includes('limite')) {
            navigate('/dashboard/bio', { replace: true });
            return;
          }

          navigate(authIntent.returnTo || `/onboarding/${draft.draftId}`, {
            replace: true,
          });
          return;
        }
      }

      const developerIntentState = readDeveloperDraftAuthIntent();
      if (developerIntentState.hasInvalidData) {
        toast.error('Dados do rascunho dev expiraram. Tente novamente.', {
          id: AUTH_CALLBACK_TOAST_ID,
        });
        navigate('/profile/create/developer', { replace: true });
        return;
      }

      const developerDraftIntent = developerIntentState.intent;
      if (developerDraftIntent) {
        localStorage.removeItem('bio4dev_post_auth_redirect');

        try {
          const draft = loadDeveloperDraft(developerDraftIntent.draftId);
          if (!draft) {
            toast.error('Rascunho dev não encontrado neste navegador.', {
              id: AUTH_CALLBACK_TOAST_ID,
            });
            navigate('/profile/create/developer', { replace: true });
            return;
          }

          const result = await developerOnboardingApi.finalize(
            toDeveloperFinalizePayload(draft),
          );

          persistLegacyProfilePointers(result.profileId, result.templateType);
          clearDeveloperDraftAuthIntent();
          clearDeveloperDraft(draft.draftId);
          hydrateProfile();
          toast.success('Portfólio salvo com sucesso!', {
            id: AUTH_CALLBACK_TOAST_ID,
          });
          navigate(result.redirectTo, { replace: true });
          return;
        } catch (error: unknown) {
          const message =
            getApiErrorMessage(error) ||
            'Não foi possível salvar seu portfólio após o login.';

          toast.error(message, { id: AUTH_CALLBACK_TOAST_ID });

          if (message.toLowerCase().includes('limite')) {
            navigate('/dashboard/bio', { replace: true });
            return;
          }

          navigate(developerDraftIntent.returnTo, {
            replace: true,
          });
          return;
        }
      }

      const storedRedirect = localStorage.getItem('bio4dev_post_auth_redirect');
      if (storedRedirect) {
        localStorage.removeItem('bio4dev_post_auth_redirect');
        hydrateProfile();
        navigate(storedRedirect, { replace: true });
        return;
      }

      hydrateProfile();
      navigate('/dashboard', { replace: true });
    };

    void completeAuthRedirect()
      .catch((error: unknown) => {
        const message =
          error instanceof Error
            ? error.message
            : 'Não foi possível autenticar. Tente novamente.';
        toast.error(message, { id: AUTH_CALLBACK_TOAST_ID });
        clearDeveloperDraftAuthIntent();
        void navigate('/profile/type', { replace: true });
      })
      .finally(() => setProcessing(false));
  }, [bootstrapAuth, navigate, params]);

  if (processing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        Conectando com o Google...
      </div>
    );
  }

  return null;
}
