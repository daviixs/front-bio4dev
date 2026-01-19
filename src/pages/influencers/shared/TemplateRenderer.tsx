import React from "react";
import { DynamicThemeRenderer } from "@/components/editors/DynamicThemeRenderer";
import type { ProfileData } from "@/temas-lintree/types";
import type { InfluencerTemplateData } from "./types";

const DEFAULT_AVATAR_URL = "https://api.dicebear.com/7.x/avataaars/svg";

function toProfileData(data: InfluencerTemplateData): ProfileData {
  return {
    id: data.themeId,
    themeName: data.themeId,
    name: data.name || "Seu Nome",
    bio: data.bio || "",
    photoUrl: data.photoUrl || DEFAULT_AVATAR_URL,
    backgroundStyle: "bg-white",
    buttonStyle: "bg-slate-100 hover:bg-slate-200 rounded-lg",
    textColor: "text-slate-900",
    accentColor: "#3b82f6",
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
    <DynamicThemeRenderer
      profileData={toProfileData(data)}
      themeId={data.themeId}
      editMode={false}
    />
  );
}
