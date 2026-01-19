import type { TemplateType } from "@/types";

export type ThemeId =
  | "activist"
  | "altmusic"
  | "architect"
  | "artist"
  | "athlete"
  | "business"
  | "creator"
  | "ecofashion"
  | "gourmet"
  | "innovation"
  | "streamer";

export const TEMPLATE_THEME_MAP = {
  template_04: "activist",
  template_05: "altmusic",
  template_06: "architect",
  template_07: "artist",
  template_08: "athlete",
  template_09: "business",
  template_10: "creator",
  template_11: "ecofashion",
  template_12: "gourmet",
  template_13: "innovation",
  template_14: "streamer",
} as const satisfies Partial<Record<TemplateType, ThemeId>>;

export type InfluencerTemplateId = keyof typeof TEMPLATE_THEME_MAP;

export const isInfluencerTemplate = (
  templateId?: string,
): templateId is InfluencerTemplateId =>
  Boolean(templateId && templateId in TEMPLATE_THEME_MAP);

export const resolveThemeId = (templateId?: string): ThemeId =>
  (templateId && TEMPLATE_THEME_MAP[templateId as InfluencerTemplateId]) ||
  "creator";
