import React from "react";
import type { ProfileComplete } from "@/types";
import { getErrorMessage, logError } from "@/lib/logger";
import type { InfluencerTemplateData } from "@/pages/influencers/shared/types";
import { templateRegistry } from "@/pages/influencers/registry";

export function useSaveTemplate(templateId?: string) {
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const save = React.useCallback(
    async (
      profileId: string,
      data: InfluencerTemplateData,
      currentProfile?: ProfileComplete,
    ) => {
      if (!templateId || !templateRegistry[templateId]) {
        const message = "Template nao registrado.";
        setError(message);
        throw new Error(message);
      }

      const { services } = templateRegistry[templateId];

      setIsSaving(true);
      setError(null);
      try {
        await services.saveAll(profileId, data, currentProfile);
      } catch (err) {
        logError("useSaveTemplate", err, { templateId, profileId });
        const message = getErrorMessage(err, "Erro ao salvar template.");
        setError(message);
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [templateId],
  );

  return { save, isSaving, error };
}
