export interface InfluencerTemplateData {
  id?: string;
  themeId: string;
  name: string;
  bio: string;
  photoUrl: string;
  socials: Array<{ id?: string; platform: string; url: string }>;
  buttons: Array<{
    id?: string;
    label: string;
    url: string;
    subtext?: string;
    icon?: string;
    style?: string;
  }>;
  metadata?: Record<string, unknown>;
}
