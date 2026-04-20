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

const PLATFORM_LABELS: Record<string, string> = {
  applemusic: 'Apple Music',
  behance: 'Behance',
  bitbucket: 'Bitbucket',
  codepen: 'CodePen',
  devto: 'Dev.to',
  discord: 'Discord',
  dribbble: 'Dribbble',
  email: 'Email',
  facebook: 'Facebook',
  figma: 'Figma',
  github: 'GitHub',
  gitlab: 'GitLab',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  medium: 'Medium',
  patreon: 'Patreon',
  pinterest: 'Pinterest',
  snapchat: 'Snapchat',
  soundcloud: 'SoundCloud',
  spotify: 'Spotify',
  stackoverflow: 'Stack Overflow',
  telegram: 'Telegram',
  threads: 'Threads',
  tiktok: 'TikTok',
  twitch: 'Twitch',
  website: 'Website',
  whatsapp: 'WhatsApp',
  x: 'X',
  youtube: 'YouTube',
};

const LEGACY_FOOTER_FALLBACK_ORDER = [
  'github',
  'linkedin',
  'twitter',
  'instagram',
] as const;

export interface SocialLinkInput {
  id?: string | number | null;
  platform?: string | null;
  plataforma?: string | null;
  url?: string | null;
  ordem?: number | null;
}

export interface LegacyFooterSocials {
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  instagram?: string | null;
}

export interface RenderableSocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  Icon: IconType;
  order: number;
}

export function normalizeSocialPlatform(platform?: string) {
  const normalized = (platform || '')
    .trim()
    .toLowerCase()
    .replace(/[\s_.-]+/g, '');

  return PLATFORM_ALIASES[normalized] || normalized;
}

export function getSocialPlatformLabel(platform?: string) {
  const normalized = normalizeSocialPlatform(platform);

  return PLATFORM_LABELS[normalized] || 'Link';
}

export function getSocialIconComponent(platform?: string): IconType {
  return SOCIAL_ICON_MAP[normalizeSocialPlatform(platform)] || FaLink;
}

function toRenderableSocialLink(
  social: SocialLinkInput,
  fallbackOrder: number,
): RenderableSocialLink | null {
  const platform = normalizeSocialPlatform(social.platform || social.plataforma);
  const url = social.url?.trim();

  if (!platform || !url) return null;

  return {
    id: social.id?.toString() || `${platform}-${fallbackOrder}`,
    platform,
    label: getSocialPlatformLabel(platform),
    url,
    Icon: getSocialIconComponent(platform),
    order: social.ordem ?? fallbackOrder,
  };
}

export function buildRenderableSocialLinks(
  socials?: SocialLinkInput[] | null,
  legacyFooter?: LegacyFooterSocials | null,
) {
  const explicitSocials = (socials || [])
    .map((social, index) => toRenderableSocialLink(social, index))
    .filter((social): social is RenderableSocialLink => Boolean(social))
    .sort((a, b) => a.order - b.order);

  if (explicitSocials.length > 0) {
    return explicitSocials;
  }

  return LEGACY_FOOTER_FALLBACK_ORDER.map((platform, index) =>
    toRenderableSocialLink(
      {
        id: platform,
        platform,
        url: legacyFooter?.[platform],
        ordem: index,
      },
      index,
    ),
  ).filter((social): social is RenderableSocialLink => Boolean(social));
}

export function SocialIcon({
  platform,
  ...props
}: { platform?: string } & IconBaseProps) {
  const Icon = getSocialIconComponent(platform);
  return <Icon {...props} />;
}
