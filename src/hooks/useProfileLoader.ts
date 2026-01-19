import React from "react";
import { profileApi } from "@/lib/api";
import type { ProfileComplete } from "@/types";
import { getErrorMessage, logError } from "@/lib/logger";

export function useProfileLoader(profileId?: string) {
  const [profile, setProfile] = React.useState<ProfileComplete | null>(null);
  const [isLoading, setIsLoading] = React.useState(Boolean(profileId));
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    if (!profileId) {
      setProfile(null);
      setIsLoading(false);
      setError("PROFILE_ID_MISSING");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await profileApi.getComplete(profileId);
      setProfile(response);
    } catch (err) {
      logError("useProfileLoader", err, { profileId });
      setError(getErrorMessage(err, "Erro ao carregar perfil."));
    } finally {
      setIsLoading(false);
    }
  }, [profileId]);

  React.useEffect(() => {
    load();
  }, [load]);

  return {
    profile,
    isLoading,
    error,
    reload: load,
  };
}
