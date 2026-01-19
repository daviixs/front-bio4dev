import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonsEditor } from "@/components/influencers/ButtonsEditor";
import { SocialList } from "@/components/influencers/SocialList";
import { LinksList } from "@/components/influencers/LinksList";
import { useProfileLoader } from "@/hooks/useProfileLoader";
import { useSaveTemplate } from "@/hooks/useSaveTemplate";
import { mapProfileCompleteToInfluencerData } from "./mappers";
import type { InfluencerTemplateData } from "./types";
import type { InfluencerTemplateId } from "./templateMap";
import { getErrorMessage } from "@/lib/logger";

export function TemplateEditor({ templateId }: { templateId: InfluencerTemplateId }) {
  const { profileId } = useParams<{ profileId: string }>();
  const navigate = useNavigate();
  const { profile, isLoading, error } = useProfileLoader(profileId);
  const { save, isSaving } = useSaveTemplate(templateId);
  const [formData, setFormData] = React.useState<InfluencerTemplateData | null>(
    null,
  );

  React.useEffect(() => {
    if (!profile) {
      return;
    }
    setFormData(mapProfileCompleteToInfluencerData(profile, templateId));
  }, [profile, templateId]);

  const handleSave = async () => {
    if (!profileId || !formData) {
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Nome e obrigatorio.");
      return;
    }

    if (!formData.bio.trim()) {
      toast.error("Bio e obrigatoria.");
      return;
    }

    if (formData.buttons.some((button) => !button.label || !button.url)) {
      toast.error("Preencha label e URL de todos os botoes.");
      return;
    }

    try {
      await save(profileId, formData, profile || undefined);
      toast.success("Template salvo com sucesso.");
    } catch (saveError) {
      toast.error(getErrorMessage(saveError, "Erro ao salvar template."));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Carregando editor...</p>
      </div>
    );
  }

  if (error || !profileId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">
          Nao foi possivel carregar o perfil.
        </p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Preparando dados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Editor do template
            </h1>
            <p className="text-sm text-slate-500">
              Template: {templateId}
            </p>
          </div>
          <ButtonsEditor
            isSaving={isSaving}
            onSave={handleSave}
            onPreview={() =>
              navigate(
                `/dashboard/influencer/${templateId}/${profileId}/preview`,
              )
            }
            onBack={() => navigate(-1)}
          />
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-base font-semibold text-slate-900">
            Informacoes basicas
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              value={formData.name}
              placeholder="Nome"
              onChange={(event) =>
                setFormData({ ...formData, name: event.target.value })
              }
            />
            <Input
              value={formData.photoUrl}
              placeholder="URL da foto"
              onChange={(event) =>
                setFormData({ ...formData, photoUrl: event.target.value })
              }
            />
          </div>
          <Textarea
            value={formData.bio}
            placeholder="Bio"
            onChange={(event) =>
              setFormData({ ...formData, bio: event.target.value })
            }
          />
        </section>

        <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-base font-semibold text-slate-900">Botoes</h2>
          <LinksList
            buttons={formData.buttons}
            onChange={(buttons) => setFormData({ ...formData, buttons })}
          />
        </section>

        <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-base font-semibold text-slate-900">Sociais</h2>
          <SocialList
            socials={formData.socials}
            onChange={(socials) => setFormData({ ...formData, socials })}
          />
        </section>
      </div>
    </div>
  );
}
