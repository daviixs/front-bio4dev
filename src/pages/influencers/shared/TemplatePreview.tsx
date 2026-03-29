import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProfileLoader } from "@/hooks/useProfileLoader";
import { mapProfileCompleteToInfluencerData } from "./mappers";
import { TemplateRenderer } from "./TemplateRenderer";
import type { InfluencerTemplateId } from "./templateMap";
import { profileApi } from "@/lib/api";
import { toast } from "sonner";

export function TemplatePreview({ templateId }: { templateId: InfluencerTemplateId }) {
  const { profileId } = useParams<{ profileId: string }>();
  const navigate = useNavigate();
  const { profile, isLoading, error } = useProfileLoader(profileId);
  const [isPublishing, setIsPublishing] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Carregando preview...</p>
      </div>
    );
  }

  if (error || !profile || !profileId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Nao foi possivel carregar o preview.</p>
      </div>
    );
  }

  const data = mapProfileCompleteToInfluencerData(profile, templateId);

  const handlePublish = async () => {
    if (!profileId) return;

    // Se já estiver publicado, apenas redireciona.
    if (profile.published) {
      navigate("/dashboard");
      return;
    }

    setIsPublishing(true);
    try {
      // Mock: tenta publicar; se falhar, ainda navega.
      await profileApi.update(profileId, { published: true }).catch(() => {});
      toast.success("Site publicado!");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Erro ao publicar";
      toast.error(message);
    } finally {
      setIsPublishing(false);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Preview do template
            </h1>
            <p className="text-sm text-slate-500">{templateId}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="default"
              size="sm"
              disabled={isPublishing}
              onClick={handlePublish}
            >
              {isPublishing ? "Publicando..." : "Publicar meu site"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                navigate(
                  `/dashboard/influencer/${templateId}/${profileId}/edit`,
                )
              }
            >
              Voltar para edicao
            </Button>
          </div>
        </div>
      </div>
      <TemplateRenderer data={data} />
    </div>
  );
}
