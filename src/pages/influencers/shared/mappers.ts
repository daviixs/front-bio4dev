import type { ProfileComplete, TemplateType } from "@/types";
import type { PortfolioData } from "@/services/api/types";
import type { InfluencerTemplateData } from "./types";
import { resolveThemeId } from "./templateMap";

const DEFAULT_AVATAR_URL = "https://api.dicebear.com/7.x/avataaars/svg";

export function mapProfileCompleteToInfluencerData(
  profile: ProfileComplete,
  templateIdOverride?: TemplateType,
): InfluencerTemplateData {
  const templateId = templateIdOverride || profile.templateType;
  const themeId = resolveThemeId(templateId);
  const legenda = profile.legendas?.[0];

  return {
    id: profile.id,
    themeId,
    name: legenda?.nome || profile.username || "Seu Nome",
    bio: legenda?.descricao || profile.bio || "",
    photoUrl:
      profile.avatarUrl || legenda?.legendaFoto || DEFAULT_AVATAR_URL,
    socials:
      profile.social?.map((social) => ({
        id: social.id,
        platform: social.plataforma?.toLowerCase() || "instagram",
        url: social.url || "#",
      })) || [],
    buttons:
      profile.linkButtons?.map((button) => ({
        id: button.id,
        label: button.label || "Link",
        url: button.url || "#",
        subtext: button.subtext || "",
        icon: button.icon,
        style: button.style,
      })) || [],
    metadata: {
      profileUsername: profile.username,
      templateType: profile.templateType,
    },
  };
}

export function mapPortfolioDataToInfluencerData(
  profile: PortfolioData,
): InfluencerTemplateData {
  const themeId = resolveThemeId(profile.templateType);
  const legenda = profile.legendas?.[0];

  return {
    id: profile.id,
    themeId,
    name: legenda?.nome || profile.username || "Seu Nome",
    bio: legenda?.descricao || profile.bio || "",
    photoUrl:
      profile.avatarUrl || legenda?.legendaFoto || DEFAULT_AVATAR_URL,
    socials:
      profile.social?.map((social) => ({
        id: social.id,
        platform: social.plataforma?.toLowerCase() || "instagram",
        url: social.url || "#",
      })) || [],
    buttons:
      profile.linkButtons?.map((button) => ({
        id: button.id,
        label: button.label || "Link",
        url: button.url || "#",
        subtext: button.subtext || "",
        icon: button.icon,
        style: button.style,
      })) || [],
    metadata: {
      profileUsername: profile.username,
      templateType: profile.templateType,
    },
  };
}
