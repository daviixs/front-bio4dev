import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { profileApi } from '@/lib/api';
import { isDeveloperTemplateType } from '@/features/developer-create/shared';
import { templateRegistry } from '@/pages/influencers/registry';
import { isInfluencerTemplate } from '@/pages/influencers/shared/templateMap';
import { Button } from '@/components/ui/button';
import { logError } from '@/lib/logger';

type Mode = 'edit' | 'preview';

interface PortfolioEditorPageProps {
  mode: Mode;
}

export function PortfolioEditorPage({ mode }: PortfolioEditorPageProps) {
  const { templateId, profileId, portfolioId } = useParams<{
    templateId?: string;
    profileId?: string;
    portfolioId?: string;
  }>();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (templateId || !portfolioId) {
      return;
    }

    let isActive = true;

    setIsRedirecting(true);
    setError(null);

    profileApi
      .getComplete(portfolioId)
      .then((profile) => {
        if (!isActive) {
          return;
        }

        if (isDeveloperTemplateType(profile.templateType)) {
          navigate(`/dashboard/developer/${profile.id}/edit`, { replace: true });
          return;
        }

        if (isInfluencerTemplate(profile.templateType)) {
          navigate(
            `/dashboard/influencer/${profile.templateType}/${profile.id}/edit`,
            { replace: true },
          );
          return;
        }

        setError('Template nao suportado para edicao.');
      })
      .catch((err) => {
        if (!isActive) {
          return;
        }

        logError('PortfolioEditorPage', err, { portfolioId, mode });
        setError('Nao foi possivel carregar o perfil.');
      })
      .finally(() => {
        if (isActive) {
          setIsRedirecting(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [mode, navigate, portfolioId, templateId]);

  if (!templateId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {isRedirecting ? (
          <p className="text-slate-500">Redirecionando...</p>
        ) : (
          <div className="text-center space-y-3">
            <p className="text-slate-500">
              {error || 'Template nao encontrado.'}
            </p>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Voltar
            </Button>
          </div>
        )}
      </div>
    );
  }

  const entry = templateRegistry[templateId as keyof typeof templateRegistry];

  if (!entry || !profileId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Template nao encontrado.</p>
      </div>
    );
  }

  const Component = mode === 'preview' ? entry.Preview : entry.Editor;

  return <Component />;
}
