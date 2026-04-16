import type { IconType, IconBaseProps } from 'react-icons';
import { FaEnvelope, FaGlobe, FaLink, FaLinkedinIn } from 'react-icons/fa6';
import {
  SiApplemusic,
  SiBehance,
  SiBitbucket,
  SiCodepen,
  SiDevdotto,
  SiDiscord,
  SiDribbble,
  SiFacebook,
  SiFigma,
  SiGithub,
  SiGitlab,
  SiInstagram,
  SiMedium,
  SiPatreon,
  SiPinterest,
  SiSnapchat,
  SiSoundcloud,
  SiSpotify,
  SiStackoverflow,
  SiTelegram,
  SiThreads,
  SiTiktok,
  SiTwitch,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from 'react-icons/si';

const PLATFORM_ALIASES: Record<string, string> = {
  applemusic: 'applemusic',
  behance: 'behance',
  bitbucket: 'bitbucket',
  codepen: 'codepen',
  dev: 'devto',
  devto: 'devto',
  discord: 'discord',
  dribbble: 'dribbble',
  email: 'email',
  facebook: 'facebook',
  figma: 'figma',
  github: 'github',
  gitlab: 'gitlab',
  instagram: 'instagram',
  linkedin: 'linkedin',
  mail: 'email',
  medium: 'medium',
  patreon: 'patreon',
  pinterest: 'pinterest',
  site: 'website',
  snapchat: 'snapchat',
  soundcloud: 'soundcloud',
  spotify: 'spotify',
  stackoverflow: 'stackoverflow',
  telegram: 'telegram',
  threads: 'threads',
  tiktok: 'tiktok',
  twitch: 'twitch',
  twitter: 'x',
  website: 'website',
  web: 'website',
  whatsapp: 'whatsapp',
  x: 'x',
  youtube: 'youtube',
};

const SOCIAL_ICON_MAP: Record<string, IconType> = {
  applemusic: SiApplemusic,
  behance: SiBehance,
  bitbucket: SiBitbucket,
  codepen: SiCodepen,
  devto: SiDevdotto,
  discord: SiDiscord,
  dribbble: SiDribbble,
  email: FaEnvelope,
  facebook: SiFacebook,
  figma: SiFigma,
  github: SiGithub,
  gitlab: SiGitlab,
  instagram: SiInstagram,
  linkedin: FaLinkedinIn,
  medium: SiMedium,
  patreon: SiPatreon,
  pinterest: SiPinterest,
  snapchat: SiSnapchat,
  soundcloud: SiSoundcloud,
  spotify: SiSpotify,
  stackoverflow: SiStackoverflow,
  telegram: SiTelegram,
  threads: SiThreads,
  tiktok: SiTiktok,
  twitch: SiTwitch,
  website: FaGlobe,
  whatsapp: SiWhatsapp,
  x: SiX,
  youtube: SiYoutube,
};

export function normalizeSocialPlatform(platform?: string) {
  const normalized = (platform || '')
    .trim()
    .toLowerCase()
    .replace(/[\s_.-]+/g, '');

  return PLATFORM_ALIASES[normalized] || normalized;
}

export function getSocialIconComponent(platform?: string): IconType {
  return SOCIAL_ICON_MAP[normalizeSocialPlatform(platform)] || FaLink;
}

export function SocialIcon({
  platform,
  ...props
}: { platform?: string } & IconBaseProps) {
  const Icon = getSocialIconComponent(platform);
  return <Icon {...props} />;
}
