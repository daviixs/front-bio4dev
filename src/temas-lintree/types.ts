
export interface SocialLink {
  platform:
    | "instagram"
    | "spotify"
    | "youtube"
    | "twitter"
    | "whatsapp"
    | "tiktok"
    | "facebook"
    | "linkedin"
    | "x"
    | "threads"
    | "website"
    | "soundcloud"
    | "snapchat"
    | "patreon"
    | "twitch"
    | "applemusic"
    | "pinterest";
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
