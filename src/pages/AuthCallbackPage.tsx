import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { onboardingApi } from '@/lib/api';
import { getApiErrorMessage } from '@/lib/api-errors';
import {
  clearDraft,
  consumeAuthIntent,
  loadDraft,
  persistLegacyProfilePointers,
  toFinalizeOnboardingPayload,
} from '@/features/onboarding/storage';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export function AuthCallbackPage() {
  const [processing, setProcessing] = useState(true);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAuthStore();

  useEffect(() => {
    const code = params.get('code');
    const state = params.get('state');

    if (!code) {
      toast.error('Código do Google ausente');
      navigate('/profile/type', { replace: true });
      return;
    }

    const hydrateProfile = () => {
      void useAuthStore.getState().loadProfile();
    };

    handleOAuthCallback(code, state)
      .then(async () => {
        const authIntent = consumeAuthIntent();

        if (authIntent?.intent === 'onboarding_finalize') {
          const draft = loadDraft(authIntent.draftId);
          if (!draft) {
            toast.error('Rascunho do onboarding não encontrado.');
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
              );
            }

            navigate(result.redirectTo, { replace: true });
            return;
          } catch (error: unknown) {
            const message =
              getApiErrorMessage(error) ||
              'Não foi possível salvar seu perfil após o login.';

            toast.error(message);

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

        const storedRedirect = localStorage.getItem(
          'bio4dev_post_auth_redirect',
        );
        if (storedRedirect) {
          localStorage.removeItem('bio4dev_post_auth_redirect');
          hydrateProfile();
          navigate(storedRedirect, { replace: true });
          return;
        }

        hydrateProfile();
        navigate('/dashboard', { replace: true });
      })
      .catch((error: unknown) => {
        const message =
          getApiErrorMessage(error) ||
          'Não foi possível autenticar. Tente novamente.';
        toast.error(message);
        navigate('/profile/type', { replace: true });
      })
      .finally(() => setProcessing(false));
  }, [params, navigate, handleOAuthCallback]);

  if (processing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        Conectando com o Google...
      </div>
    );
  }

  return null;
}
