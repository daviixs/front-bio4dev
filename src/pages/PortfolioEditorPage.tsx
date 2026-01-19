import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { profileApi } from "@/lib/api";
import { templateRegistry } from "@/pages/influencers/registry";
import { isInfluencerTemplate } from "@/pages/influencers/shared/templateMap";
import { Button } from "@/components/ui/button";
import { logError } from "@/lib/logger";

type Mode = "edit" | "preview";

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
    if (!templateId && portfolioId) {
      setIsRedirecting(true);
      profileApi
        .getComplete(portfolioId)
        .then((profile) => {
          if (!isInfluencerTemplate(profile.templateType)) {
            setError("Template nao suportado para influenciadores.");
            return;
          }
          navigate(
            `/dashboard/influencer/${profile.templateType}/${profile.id}/edit`,
            { replace: true },
          );
        })
        .catch((err) => {
          logError("PortfolioEditorPage", err, { portfolioId });
          setError("Nao foi possivel carregar o perfil.");
        })
        .finally(() => setIsRedirecting(false));
    }
  }, [templateId, portfolioId, navigate]);

  if (!templateId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {isRedirecting ? (
          <p className="text-slate-500">Redirecionando...</p>
        ) : (
          <div className="text-center space-y-3">
            <p className="text-slate-500">
              {error || "Template nao encontrado."}
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

  const Component = mode === "preview" ? entry.Preview : entry.Editor;

  return <Component />;
}
