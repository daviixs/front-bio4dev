import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { profileApi } from "@/lib/api";
import { saveAll as saveInfluencerData } from "@/pages/influencers/shared/services";
import type { InfluencerTemplateData } from "@/pages/influencers/shared/types";
import { toast } from "sonner";

export function AuthCallbackPage() {
  const [processing, setProcessing] = useState(true);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAuthStore();

  const ensureProtocol = (value: string) => {
    if (!value) return value;
    if (/^https?:\/\//i.test(value)) return value;
    return `https://${value}`;
  };

  const normalizeSocialUrl = (platform: string, value: string) => {
    const trimmed = (value || "").trim();
    if (!trimmed) return "";
    if (platform === "whatsapp") {
      const digits = trimmed.replace(/[^\d]/g, "");
      return digits ? `https://wa.me/${digits}` : "";
    }
    if (["instagram", "x", "threads", "snapchat"].includes(platform)) {
      const handle = trimmed.replace(/^@/, "");
      if (!handle) return "";
      if (platform === "instagram") return `https://instagram.com/${handle}`;
      if (platform === "x") return `https://x.com/${handle}`;
      if (platform === "threads") return `https://www.threads.net/@${handle}`;
      if (platform === "snapchat") return `https://www.snapchat.com/add/${handle}`;
    }
    return ensureProtocol(trimmed);
  };

  const buildTemplateDataFromStorage = (
    draftId: string,
    templateType: string,
  ): InfluencerTemplateData => {
    const persistedRaw = localStorage.getItem(
      `bio4dev_onboarding_${draftId}_persisted`,
    );
    if (persistedRaw) {
      try {
        const parsed = JSON.parse(persistedRaw) as InfluencerTemplateData;
        return {
          ...parsed,
          themeId: parsed.themeId || templateType,
        };
      } catch {
        // fall back to reconstructed data below
      }
    }

    const onboardingRaw = localStorage.getItem(
      `bio4dev_onboarding_${draftId}`,
    );
    let onboarding: any = {};
    try {
      onboarding = onboardingRaw ? JSON.parse(onboardingRaw) : {};
    } catch {
      onboarding = {};
    }

    const themeId =
      onboarding.templateType ||
      templateType ||
      localStorage.getItem(`bio4dev_theme_${draftId}`) ||
      "template_04";

    const socials =
      (onboarding.selectedPlatforms || []).map((platformId: string) => {
        const raw = onboarding.platformLinks?.[platformId] || "";
        const url = normalizeSocialUrl(platformId, raw);
        return url
          ? {
              platform: platformId,
              url,
            }
          : null;
      }).filter(Boolean) || [];

    const buttons =
      (onboarding.additionalLinks || [])
        .filter((link: any) => link?.label?.trim() && link?.url?.trim())
        .map((link: any, index: number) => ({
          label: link.label.trim(),
          url: link.url.trim(),
          subtext: "",
          icon: "link",
          style: "primary",
          ordem: index,
        })) || [];

    return {
      themeId,
      name: onboarding.displayName || onboarding.username || "Meu perfil",
      bio: onboarding.bio || "",
      photoUrl: onboarding.avatarDataUrl || "",
      socials,
      buttons,
    };
  };

  useEffect(() => {
    const code = params.get("code");
    const state = params.get("state");

    if (!code) {
      toast.error("Código do Google ausente");
      navigate("/profile/type", { replace: true });
      return;
    }

    handleOAuthCallback(code, state)
      .then(async () => {
        const currentUser = useAuthStore.getState().user;

        // Tentar converter draft em perfil real imediatamente após login
        const draftId = localStorage.getItem("bio4dev_profile_id");
        if (draftId && draftId.startsWith("draft-") && currentUser?.id) {
          try {
            const draftDataRaw = localStorage.getItem(
              `bio4dev_draft_profile_${draftId}`,
            );
            const draftData = draftDataRaw ? JSON.parse(draftDataRaw) : {};
            const templateType = draftData.templateType || "template_04";
            const username = draftData.username || draftData.slug || "meu-perfil";
            const slug = draftData.slug || draftData.username || username;

            if (import.meta.env.DEV) {
              console.log("Callback: criando perfil do draft", {
                draftId,
                userId: currentUser.id,
                username,
                slug,
                templateType,
              });
            }

            const response = await profileApi.create({
              userId: currentUser.id,
              username,
              slug,
              templateType,
              published: false,
            });

            const realId = response.profile?.id || response.id;
            localStorage.setItem("bio4dev_profile_id", realId);
            localStorage.setItem(`bio4dev_theme_${realId}`, templateType);
            localStorage.removeItem(`bio4dev_draft_profile_${draftId}`);

            const templateData = buildTemplateDataFromStorage(
              draftId,
              templateType,
            );
            await saveInfluencerData(realId, templateData);

            navigate(
              `/dashboard/influencer/${templateType}/${realId}/preview`,
              { replace: true },
            );
            return;
          } catch (error: any) {
            const backendMessage = error?.response?.data?.message || "";
            if (backendMessage.toLowerCase().includes("usuário não encontrado")) {
              toast.error("Sessão expirada. Faça login novamente.");
              navigate("/profile/type", { replace: true });
              return;
            }
            console.error("Callback: erro ao criar perfil do draft", error);
            // Continua para fallback
          }
        }

        const storedRedirect = localStorage.getItem(
          "bio4dev_post_auth_redirect",
        );
        if (storedRedirect) {
          localStorage.removeItem("bio4dev_post_auth_redirect");
          navigate(storedRedirect, { replace: true });
          return;
        }
        navigate("/dashboard", { replace: true });
      })
      .catch(() => {
        toast.error("Não foi possível autenticar. Tente novamente.");
        navigate("/profile/type", { replace: true });
      })
      .finally(() => setProcessing(false));
  }, [params, navigate, handleOAuthCallback]);

  if (processing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        Conectando com o Google...
      </div>
    );
  }

  return null;
}
