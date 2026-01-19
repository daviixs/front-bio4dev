import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProfileLoader } from "@/hooks/useProfileLoader";
import { mapProfileCompleteToInfluencerData } from "./mappers";
import { TemplateRenderer } from "./TemplateRenderer";
import type { InfluencerTemplateId } from "./templateMap";

export function TemplatePreview({ templateId }: { templateId: InfluencerTemplateId }) {
  const { profileId } = useParams<{ profileId: string }>();
  const navigate = useNavigate();
  const { profile, isLoading, error } = useProfileLoader(profileId);

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
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              navigate(`/dashboard/influencer/${templateId}/${profileId}/edit`)
            }
          >
            Voltar para edicao
          </Button>
        </div>
      </div>
      <TemplateRenderer data={data} />
    </div>
  );
}
