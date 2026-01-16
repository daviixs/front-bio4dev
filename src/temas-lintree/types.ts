
export interface SocialLink {
  platform: 'instagram' | 'spotify' | 'youtube' | 'twitter' | 'whatsapp' | 'tiktok' | 'facebook' | 'linkedin';
  url: string;
}

export interface ProfileButton {
  label: string;
  url: string;
  subtext?: string;
}

export interface ProfileData {
  id: string;
  themeName: string;
  name: string;
  bio: string;
  photoUrl: string;
  backgroundStyle: string;
  buttonStyle: string;
  textColor: string;
  socials: SocialLink[];
  buttons: ProfileButton[];
  accentColor: string;
}
