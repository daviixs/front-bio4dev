import React from "react";
import { useParams } from "react-router-dom";
import { useProfileLoader } from "@/hooks/useProfileLoader";
import { mapProfileCompleteToInfluencerData } from "./mappers";
import { TemplateRenderer } from "./TemplateRenderer";
import type { InfluencerTemplateData } from "./types";
import type { InfluencerTemplateId } from "./templateMap";

interface TemplateViewProps {
  templateId: InfluencerTemplateId;
  data?: InfluencerTemplateData;
}

export function TemplateView({ templateId, data }: TemplateViewProps) {
  const { profileId } = useParams<{ profileId: string }>();
  const { profile, isLoading, error } = useProfileLoader(
    data ? undefined : profileId,
  );

  if (data) {
    return <TemplateRenderer data={data} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Carregando perfil...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Perfil nao encontrado.</p>
      </div>
    );
  }

  const resolved = mapProfileCompleteToInfluencerData(profile, templateId);

  return <TemplateRenderer data={resolved} />;
}
