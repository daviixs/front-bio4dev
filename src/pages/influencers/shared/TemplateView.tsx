import React from "react";
import { useParams } from "react-router-dom";
import { useProfileLoader } from "@/hooks/useProfileLoader";
import { mapProfileCompleteToInfluencerData } from "./mappers";
import { TemplateRenderer } from "./TemplateRenderer";
import type { InfluencerTemplateData } from './types';
import { resolveThemeId, type InfluencerTemplateId } from './templateMap';
import { getInfluencerThemePreset } from './themePresets';

interface TemplateViewProps {
  templateId: InfluencerTemplateId;
  data?: InfluencerTemplateData;
}

export function TemplateView({ templateId, data }: TemplateViewProps) {
  const { profileId } = useParams<{ profileId: string }>();
  const { profile, isLoading, error } = useProfileLoader(
    data ? undefined : profileId,
  );
  const preset = getInfluencerThemePreset(resolveThemeId(templateId));

  if (data) {
    return <TemplateRenderer data={data} />;
  }

  if (isLoading) {
    return (
      <div
        className={`influencer-theme-scope flex min-h-screen items-center justify-center px-6 ${preset.chrome.page}`}
      >
        <div className="rounded-3xl border border-white/10 bg-white/90 px-6 py-5 text-center shadow-sm backdrop-blur">
          <p className="text-slate-500">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div
        className={`influencer-theme-scope flex min-h-screen items-center justify-center px-6 ${preset.chrome.page}`}
      >
        <div className="rounded-3xl border border-white/10 bg-white/90 px-6 py-5 text-center shadow-sm backdrop-blur">
          <p className="text-slate-500">Perfil nao encontrado.</p>
        </div>
      </div>
    );
  }

  const resolved = mapProfileCompleteToInfluencerData(profile, templateId);

  return <TemplateRenderer data={resolved} />;
}
