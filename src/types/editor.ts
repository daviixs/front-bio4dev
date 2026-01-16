// src/types/editor.ts

export interface ProfileData {
  id: string;
  themeName: string;
  name: string;
  bio: string;
  photoUrl: string;
  backgroundStyle: string;
  buttonStyle: string;
  textColor: string;
  accentColor: string;
  socials: SocialLink[];
  buttons: ProfileButton[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ProfileButton {
  label: string;
  url: string;
  subtext?: string;
}

export interface EditorProps {
  profile: ProfileData;
  onSave: (data: ProfileData) => void;
  onCancel: () => void;
}