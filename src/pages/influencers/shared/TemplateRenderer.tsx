import React from "react";
import { DynamicThemeRenderer } from "@/components/editors/DynamicThemeRenderer";
import type { ProfileData } from "@/temas-lintree/types";
import type { InfluencerTemplateData } from "./types";
import { getInfluencerThemePreset } from "./themePresets";

const DEFAULT_AVATAR_URL = "https://api.dicebear.com/7.x/avataaars/svg";

function toProfileData(data: InfluencerTemplateData): ProfileData {
  const preset = getInfluencerThemePreset(data.themeId);

  return {
    id: data.themeId,
    themeName: data.themeId,
    name: data.name || "Seu Nome",
    bio: data.bio || "",
    photoUrl: data.photoUrl || DEFAULT_AVATAR_URL,
    backgroundStyle: preset.profile.backgroundStyle,
    buttonStyle: preset.profile.buttonStyle,
    textColor: preset.profile.textColor,
    accentColor: preset.profile.accentColor,
    socials: data.socials.map((social) => ({
      platform: social.platform as any,
      url: social.url,
    })),
    buttons: data.buttons.map((button) => ({
      label: button.label,
      url: button.url,
      subtext: button.subtext || undefined,
    })),
  };
}

export function TemplateRenderer({ data }: { data: InfluencerTemplateData }) {
  return (
    <div className="influencer-theme-scope">
      <DynamicThemeRenderer
        profileData={toProfileData(data)}
        themeId={data.themeId}
        editMode={false}
      />
    </div>
  );
}
