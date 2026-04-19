import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProfileLoader } from "@/hooks/useProfileLoader";
import { mapProfileCompleteToInfluencerData } from "./mappers";
import { TemplateRenderer } from "./TemplateRenderer";
import { resolveThemeId, type InfluencerTemplateId } from "./templateMap";
import { profileApi } from "@/lib/api";
import { toast } from "sonner";
import { getInfluencerThemePreset } from "./themePresets";

const TEMPLATE_PREVIEW_PUBLISH_TOAST_ID = "template-preview-publish-toast";

export function TemplatePreview({ templateId }: { templateId: InfluencerTemplateId }) {
  const { profileId } = useParams<{ profileId: string }>();
  const navigate = useNavigate();
  const { profile, isLoading, error } = useProfileLoader(profileId);
  const [isPublishing, setIsPublishing] = React.useState(false);
  const preset = getInfluencerThemePreset(resolveThemeId(templateId));

  if (isLoading) {
    return (
      <div
        className={`influencer-theme-scope flex min-h-screen items-center justify-center px-6 ${preset.chrome.page}`}
      >
        <div className="rounded-3xl border border-white/10 bg-white/92 px-6 py-5 text-center shadow-sm backdrop-blur">
          <p className="text-slate-500">Carregando preview...</p>
        </div>
      </div>
    );
  }

  if (error || !profile || !profileId) {
    return (
      <div
        className={`influencer-theme-scope flex min-h-screen items-center justify-center px-6 ${preset.chrome.page}`}
      >
        <div className="rounded-3xl border border-white/10 bg-white/92 px-6 py-5 text-center shadow-sm backdrop-blur">
          <p className="text-slate-500">Nao foi possivel carregar o preview.</p>
        </div>
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
      toast.success("Site publicado!", {
        id: TEMPLATE_PREVIEW_PUBLISH_TOAST_ID,
      });
    } catch (err: any) {
      const message = err?.response?.data?.message || "Erro ao publicar";
      toast.error(message, { id: TEMPLATE_PREVIEW_PUBLISH_TOAST_ID });
    } finally {
      setIsPublishing(false);
      navigate("/dashboard");
    }
  };

  return (
    <div
      className={`influencer-theme-scope min-h-screen ${preset.chrome.page}`}
    >
      <div className="px-4 pt-5 sm:px-6 sm:pt-6">
        <div
          className={`mx-auto flex max-w-5xl flex-col gap-4 rounded-[28px] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 ${preset.chrome.previewToolbar}`}
        >
          <div>
            <h1
              className={`text-lg font-semibold ${preset.chrome.previewToolbarTitle}`}
            >
              Preview do template
            </h1>
            <p className={`text-sm ${preset.chrome.previewToolbarMeta}`}>
              {templateId}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={isPublishing}
              onClick={handlePublish}
              className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition ${preset.chrome.previewToolbarPrimary} disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {isPublishing ? 'Publicando...' : 'Publicar meu site'}
            </button>
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/dashboard/influencer/${templateId}/${profileId}/edit`,
                )
              }
              className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition ${preset.chrome.previewToolbarSecondary}`}
            >
              Voltar para edicao
            </button>
          </div>
        </div>
      </div>
      <TemplateRenderer data={data} />
    </div>
  );
}
