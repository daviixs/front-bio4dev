import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa6';
import {
  FiArrowLeft,
  FiArrowRight,
  FiImage,
  FiLink2,
  FiPlus,
  FiTrash2,
} from 'react-icons/fi';
import {
  SiFacebook,
  SiInstagram,
  SiPatreon,
  SiPinterest,
  SiSnapchat,
  SiSoundcloud,
  SiSpotify,
  SiThreads,
  SiTiktok,
  SiTwitch,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  clearDraft,
  loadDraft,
  persistLegacyProfilePointers,
  saveDraft,
  setAuthIntent,
  toFinalizeOnboardingPayload,
} from '@/features/onboarding/storage';
import {
  createDefaultOnboardingState,
  type AdditionalLink,
  type OnboardingDraft,
  type OnboardingState,
  type PlatformId,
} from '@/features/onboarding/types';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { onboardingApi, profileApi, socialApi } from '@/lib/api';
import { getApiErrorMessage } from '@/lib/api-errors';
import { useSaveTemplate } from '@/hooks/useSaveTemplate';
import { useAuthStore } from '@/stores/authStore';
import type { TemplateType } from '@/types';
import {
  getInfluencerThemePreset,
  type InfluencerThemeChrome,
} from '@/pages/influencers/shared/themePresets';
import { resolveThemeId } from '@/pages/influencers/shared/templateMap';

type PlatformInputType = 'handle' | 'url' | 'phone';

type PlatformConfig = {
  id: PlatformId;
  label: string;
  icon: React.ElementType;
  placeholder: string;
  type: PlatformInputType;
};

type OnboardingChrome = {
  root: string;
  page: string;
  contentCard: string;
  buttonPrimary: string;
  buttonSecondary: string;
  input: string;
  accentText: string;
  accentTextHover: string;
  accentBg: string;
  accentSoft: string;
  accentBorder: string;
  focusRing: string;
  topBarText: string;
  progressLabel: string;
  progressTrack: string;
  heading: string;
  subtitle: string;
  sectionLabel: string;
  defaultCard: string;
  iconBadge: string;
  surfaceCard: string;
  bodyText: string;
  captionText: string;
  helperText: string;
  warningText: string;
  successText: string;
  removeButton: string;
  previewShell: string;
  previewCard: string;
  previewRow: string;
  previewValue: string;
  infoBar: string;
  infoText: string;
  emptyState: string;
  modalBackdrop: string;
  modalCard: string;
  modalAccentLine: string;
  modalEyebrow: string;
  modalTitle: string;
  modalBody: string;
  modalError: string;
  modalContinue: string;
  modalClose: string;
};

const PLATFORM_OPTIONS: PlatformConfig[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    icon: SiInstagram,
    placeholder: '@usuario',
    type: 'handle',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: SiWhatsapp,
    placeholder: 'Numero do WhatsApp',
    type: 'phone',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    icon: SiTiktok,
    placeholder: 'tiktok.com/usuario',
    type: 'url',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: SiYoutube,
    placeholder: 'youtube.com/usuario',
    type: 'url',
  },
  {
    id: 'website',
    label: 'Website',
    icon: FaGlobe,
    placeholder: 'seusite.com',
    type: 'url',
  },
  {
    id: 'spotify',
    label: 'Spotify',
    icon: SiSpotify,
    placeholder: 'open.spotify.com/usuario',
    type: 'url',
  },
  {
    id: 'threads',
    label: 'Threads',
    icon: SiThreads,
    placeholder: '@usuario',
    type: 'handle',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: SiFacebook,
    placeholder: 'facebook.com/usuario',
    type: 'url',
  },
  {
    id: 'x',
    label: 'X',
    icon: SiX,
    placeholder: '@usuario',
    type: 'handle',
  },
  {
    id: 'soundcloud',
    label: 'SoundCloud',
    icon: SiSoundcloud,
    placeholder: 'soundcloud.com/usuario',
    type: 'url',
  },
  {
    id: 'snapchat',
    label: 'Snapchat',
    icon: SiSnapchat,
    placeholder: '@usuario',
    type: 'handle',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    icon: SiPinterest,
    placeholder: 'pinterest.com/usuario',
    type: 'url',
  },
  {
    id: 'patreon',
    label: 'Patreon',
    icon: SiPatreon,
    placeholder: 'patreon.com/usuario',
    type: 'url',
  },
  {
    id: 'twitch',
    label: 'Twitch',
    icon: SiTwitch,
    placeholder: 'twitch.tv/usuario',
    type: 'url',
  },
];

const PLATFORM_SOCIAL_MAP: Record<PlatformId, string> = {
  instagram: 'instagram',
  whatsapp: 'whatsapp',
  tiktok: 'tiktok',
  youtube: 'youtube',
  website: 'website',
  spotify: 'spotify',
  threads: 'threads',
  facebook: 'facebook',
  x: 'x',
  soundcloud: 'soundcloud',
  snapchat: 'snapchat',
  pinterest: 'pinterest',
  patreon: 'patreon',
  twitch: 'twitch',
  applemusic: 'applemusic',
};

// API ainda nao aceita todas as plataformas do onboarding.
const API_SUPPORTED_PLATFORMS = new Set<PlatformId>([
  'instagram',
  'whatsapp',
  'tiktok',
  'youtube',
  'facebook',
  'pinterest',
]);

const ONBOARDING_LIMIT_TOAST_ID = 'influencer-onboarding-limit-toast';
const ONBOARDING_LINKS_TOAST_ID = 'influencer-onboarding-links-toast';
const ONBOARDING_FINISH_TOAST_ID = 'influencer-onboarding-finish-toast';
const ONBOARDING_AUTH_TOAST_ID = 'influencer-onboarding-auth-toast';

const isValidUrl = (value: string) => {
  if (!value.trim()) return true;
  try {
    const trimmed = value.trim();
    if (/^https?:\/\//i.test(trimmed)) {
      const url = new URL(trimmed);
      return url.protocol === 'http:' || url.protocol === 'https:';
    }
    return true;
  } catch {
    return false;
  }
};

const isValidPhone = (value: string) => {
  if (!value.trim()) return true;
  return /^\+?[1-9]\d{7,14}$/.test(value.trim());
};

const isValidHandle = (value: string) => {
  if (!value.trim()) return true;
  return /^@?[a-zA-Z0-9._-]+$/.test(value.trim());
};

const validatePlatformValue = (
  platform: PlatformConfig,
  value: string,
): string | null => {
  if (!value.trim()) return null;
  if (platform.type === 'url' && !isValidUrl(value)) {
    return 'Informe uma URL valida.';
  }
  if (platform.type === 'phone' && !isValidPhone(value)) {
    return 'Use o formato internacional, ex: +5511999998888.';
  }
  if (platform.type === 'handle' && !isValidHandle(value)) {
    return 'Use @usuario sem espacos.';
  }
  return null;
};

const normalizeSocialUrl = (platformId: PlatformId, value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return '';

  if (platformId === 'whatsapp') {
    const digits = trimmed.replace(/[^\d]/g, '');
    return digits ? `https://wa.me/${digits}` : '';
  }

  if (platformId === 'instagram') {
    const handle = trimmed.replace(/^@/, '');
    return handle ? `https://instagram.com/${handle}` : '';
  }

  if (platformId === 'x') {
    const handle = trimmed.replace(/^@/, '');
    return handle ? `https://x.com/${handle}` : '';
  }

  if (platformId === 'threads') {
    const handle = trimmed.replace(/^@/, '');
    return handle ? `https://www.threads.net/@${handle}` : '';
  }

  if (platformId === 'snapchat') {
    const handle = trimmed.replace(/^@/, '');
    return handle ? `https://www.snapchat.com/add/${handle}` : '';
  }

  return trimmed;
};

const trackOnboardingEvent = (
  event: string,
  payload: Record<string, unknown>,
) => {
  const record = {
    event,
    payload,
    timestamp: new Date().toISOString(),
  };
  const existing = localStorage.getItem('bio4dev_onboarding_events');
  const next = existing ? JSON.parse(existing) : [];
  next.push(record);
  localStorage.setItem('bio4dev_onboarding_events', JSON.stringify(next));
  console.log('[onboarding]', record);
};

const PUBLIC_ONBOARDING_CHROME: OnboardingChrome = {
  root:
    'influencer-theme-scope flex min-h-screen flex-col bg-[#221e1b] text-[#ece5d9]',
  page:
    'bg-[radial-gradient(circle_at_top,rgba(195,152,107,0.18),transparent_35%),radial-gradient(circle_at_84%_6%,rgba(255,255,255,0.05),transparent_24%)]',
  contentCard:
    'rounded-3xl border border-[#4a4038] bg-[#261f1a]/92 p-6 shadow-[0_36px_90px_-48px_rgba(0,0,0,0.72)] backdrop-blur sm:p-10',
  buttonPrimary:
    'h-11 rounded-full border border-[#d3ab7d] bg-[#c3986b] px-5 font-semibold text-[#1c140f] shadow-[0_18px_42px_-26px_rgba(195,152,107,0.7)] transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-[1px] hover:bg-[#d2a67a] active:scale-[0.98]',
  buttonSecondary:
    'border border-[#4a4038] bg-[#2d241f] text-[#ece5d9] shadow-[0_16px_36px_-28px_rgba(0,0,0,0.45)] transition-[transform,background-color,border-color] duration-200 ease-out hover:-translate-y-[1px] hover:bg-[#382e27] active:scale-[0.98]',
  input:
    'border-[#4a4038] bg-[#1f1916] text-[#f5ede4] placeholder:text-[#8f8073] focus-visible:border-[#c3986b] focus-visible:ring-[#c3986b]/20',
  accentText: 'text-[#d6b18b]',
  accentTextHover: 'hover:text-[#edd0af]',
  accentBg: 'bg-[#c3986b]',
  accentSoft: 'bg-[#35291f] text-[#f5ede4]',
  accentBorder: 'border-[#7d6041]',
  focusRing: 'focus-visible:ring-2 focus-visible:ring-[#c3986b]/20',
  topBarText: 'text-[#cbbcae]',
  progressLabel: 'text-[#b69f88]',
  progressTrack: 'bg-[#3a3028]',
  heading: 'text-[#f5ede4]',
  subtitle: 'text-[#cbbcae]',
  sectionLabel: 'text-[#b69f88]',
  defaultCard: 'border-[#433931] bg-[#2d241f] hover:border-[#5c4e43]',
  iconBadge: 'bg-[#3a3028] text-[#e7d7c6]',
  surfaceCard: 'border border-[#4a4038] bg-[#2d241f]/95',
  bodyText: 'text-[#f0e6db]',
  captionText: 'text-[#cbbcae]',
  helperText: 'text-[#ab9a8a]',
  warningText: 'text-[#dcb37c]',
  successText: 'text-[#8cc29f]',
  removeButton:
    'h-10 w-10 rounded-full border border-[#5c4e43] text-[#cbbcae] transition-[transform,background-color,border-color,color] duration-200 ease-out hover:border-rose-400 hover:bg-[#3a3028] hover:text-rose-200 active:scale-[0.98]',
  previewShell: 'border border-[#4a4038] bg-[#211a16] text-[#f0e6db]',
  previewCard: 'border border-[#4a4038] bg-[#2b231e]',
  previewRow: 'border border-[#41372f] bg-[#332923] text-[#ece5d9]',
  previewValue: 'text-[#bcae9f]',
  infoBar: 'border border-[#4a4038] bg-[#302822]',
  infoText: 'text-[#cbbcae]',
  emptyState: 'border border-dashed border-[#4a4038] text-[#bcae9f]',
  modalBackdrop: 'bg-[#120f0d]/75 backdrop-blur-[2px]',
  modalCard:
    'border border-[#4a4038] bg-[#261f1a] text-[#f5ede4] shadow-[0_24px_80px_-32px_rgba(0,0,0,0.65)]',
  modalAccentLine:
    'bg-gradient-to-r from-transparent via-[#c3986b]/70 to-transparent',
  modalEyebrow: 'text-[#b69f88]',
  modalTitle: 'text-[#f5ede4]',
  modalBody: 'text-[#cbbcae]',
  modalError:
    'rounded-2xl border border-[#8c5b5b] bg-[#3a2222] px-4 py-3 text-sm text-[#ffd7d7]',
  modalContinue:
    'inline-flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-[#d9c2a8] bg-[#f5ede4] px-4 text-sm font-semibold text-[#1c140f] shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)] transition-[transform,background-color,border-color] duration-200 ease-out hover:-translate-y-[1px] hover:border-[#f3e2ce] hover:bg-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0',
  modalClose:
    'w-full rounded-2xl border border-[#4a4038] bg-[#302822] px-4 py-3 text-sm text-[#ece5d9] transition-[transform,background-color,border-color] duration-200 ease-out hover:bg-[#3a3028] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
};

const createEditorOnboardingChrome = (
  chrome: InfluencerThemeChrome,
): OnboardingChrome => ({
  root: 'influencer-theme-scope flex min-h-screen flex-col bg-white',
  page: chrome.page,
  contentCard: 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10',
  buttonPrimary: chrome.buttonPrimary,
  buttonSecondary: chrome.buttonSecondary,
  input: chrome.input,
  accentText: chrome.accentText,
  accentTextHover: chrome.accentTextHover,
  accentBg: chrome.accentBg,
  accentSoft: chrome.accentSoft,
  accentBorder: chrome.accentBorder,
  focusRing: chrome.focusRing,
  topBarText: 'text-slate-600',
  progressLabel: 'text-slate-500',
  progressTrack: 'bg-slate-200',
  heading: 'text-slate-900',
  subtitle: 'text-slate-600',
  sectionLabel: 'text-slate-500',
  defaultCard: 'border-slate-200 bg-white hover:border-slate-300',
  iconBadge: 'bg-slate-100 text-slate-700',
  surfaceCard: 'border border-slate-200 bg-white',
  bodyText: 'text-slate-900',
  captionText: 'text-slate-500',
  helperText: 'text-slate-400',
  warningText: 'text-amber-600',
  successText: 'text-emerald-600',
  removeButton:
    'h-10 w-10 rounded-full border border-slate-700/60 text-slate-300 hover:border-rose-400 hover:text-rose-300',
  previewShell: 'border border-slate-200 bg-slate-50 text-slate-900',
  previewCard: 'border border-slate-200 bg-white',
  previewRow: 'border border-slate-200 bg-white text-slate-700',
  previewValue: 'text-slate-500',
  infoBar: 'border border-slate-200 bg-slate-50',
  infoText: 'text-slate-600',
  emptyState: 'border border-dashed border-slate-200 text-slate-500',
  modalBackdrop: 'bg-slate-950/45 backdrop-blur-[2px]',
  modalCard:
    'border border-slate-200 bg-white shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)]',
  modalAccentLine:
    'bg-gradient-to-r from-transparent via-slate-300/80 to-transparent',
  modalEyebrow: 'text-slate-500',
  modalTitle: 'text-slate-900',
  modalBody: 'text-slate-600',
  modalError:
    'rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700',
  modalContinue:
    'inline-flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-[1px] hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0',
  modalClose:
    'w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-800 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60',
});

const TopBar = ({
  onBack,
  onSkip,
  showSkip,
  chrome,
}: {
  onBack: () => void;
  onSkip: () => void;
  showSkip: boolean;
  chrome: OnboardingChrome;
}) => (
  <div className={`mb-8 flex items-center justify-between text-sm ${chrome.topBarText}`}>
    <button
      type="button"
      onClick={onBack}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition ${chrome.buttonSecondary} ${chrome.focusRing}`}
    >
      <FiArrowLeft className="h-4 w-4" />
      Voltar
    </button>
    {showSkip && (
      <button
        type="button"
        onClick={onSkip}
        className={`rounded-full px-4 py-2 transition ${chrome.accentText} ${chrome.accentTextHover}`}
      >
        Pular
      </button>
    )}
  </div>
);

const ProgressBar = ({
  step,
  totalSteps,
  selectedCount,
  chrome,
}: {
  step: number;
  totalSteps: number;
  selectedCount: number;
  chrome: OnboardingChrome;
}) => {
  const progress = Math.min(100, (step / totalSteps) * 100);
  return (
    <div className="mb-6 space-y-3">
      <div
        className={`flex items-center justify-between text-xs uppercase tracking-[0.3em] ${chrome.progressLabel}`}
      >
        <span>Etapa {step} de 3</span>
        <span>{selectedCount}/5 selecionadas</span>
      </div>
      <div className={`h-2 w-full overflow-hidden rounded-full ${chrome.progressTrack}`}>
        <div
          className={`h-full rounded-full ${chrome.accentBg} transition-all`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const StepHeader = ({
  title,
  subtitle,
  chrome,
}: {
  title: string;
  subtitle: string;
  chrome: OnboardingChrome;
}) => (
  <div className="space-y-3">
    <h1 className={`text-3xl font-semibold sm:text-4xl ${chrome.heading}`}>
      {title}
    </h1>
    <p className={`text-base ${chrome.subtitle}`}>{subtitle}</p>
  </div>
);

const PlatformCard = ({
  platform,
  isSelected,
  order,
  disabled,
  onToggle,
  chrome,
}: {
  platform: PlatformConfig;
  isSelected: boolean;
  order: number;
  disabled: boolean;
  onToggle: () => void;
  chrome: OnboardingChrome;
}) => {
  const Icon = platform.icon;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isSelected}
      aria-label={`${platform.label} platform`}
      disabled={disabled}
      className={`relative flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition ${chrome.focusRing} ${
        isSelected
          ? `${chrome.accentBorder} ${chrome.accentSoft}`
          : chrome.defaultCard
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${chrome.iconBadge}`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className={`text-base font-semibold ${chrome.bodyText}`}>
          {platform.label}
        </p>
        <p className={`text-xs uppercase tracking-[0.2em] ${chrome.captionText}`}>
          {platform.type === 'handle' ? 'usuario' : platform.type}
        </p>
      </div>
      {isSelected && (
        <span
          className={`absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full ${chrome.accentBg} text-xs font-semibold text-white`}
        >
          {order}
        </span>
      )}
    </button>
  );
};

const SelectedPlatformInput = ({
  platform,
  value,
  error,
  showWarning,
  onChange,
  chrome,
}: {
  platform: PlatformConfig;
  value: string;
  error: string | null;
  showWarning: boolean;
  onChange: (nextValue: string) => void;
  chrome: OnboardingChrome;
}) => {
  const Icon = platform.icon;
  return (
    <div className={`rounded-2xl p-4 ${chrome.surfaceCard}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${chrome.iconBadge}`}
          >
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className={`text-sm font-semibold ${chrome.bodyText}`}>
              {platform.label}
            </p>
            <p className={`text-xs ${chrome.captionText}`}>{platform.placeholder}</p>
          </div>
        </div>
        <div className="flex-1">
          <label className="sr-only" htmlFor={`${platform.id}-input`}>
            {platform.label} link
          </label>
          <Input
            id={`${platform.id}-input`}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={platform.placeholder}
            aria-invalid={Boolean(error)}
            className={`h-11 ${chrome.input}`}
          />
        </div>
      </div>
      <div className="mt-2 text-xs">
        {error ? (
          <span className="text-rose-400">{error}</span>
        ) : showWarning ? (
          <span className={chrome.warningText}>
            Opcional, mas recomendado para lancamento.
          </span>
        ) : (
          <span className={chrome.successText}>Parece correto.</span>
        )}
      </div>
    </div>
  );
};

const AdditionalLinkRow = ({
  link,
  error,
  onChange,
  onRemove,
  chrome,
}: {
  link: AdditionalLink;
  error: { label?: string | null; url?: string | null } | null;
  onChange: (updates: Partial<AdditionalLink>) => void;
  onRemove: () => void;
  chrome: OnboardingChrome;
}) => (
  <div className={`flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center ${chrome.surfaceCard}`}>
    <span
      className={`flex h-10 w-10 items-center justify-center rounded-xl ${chrome.iconBadge}`}
    >
      <FiLink2 className="h-5 w-5" />
    </span>
    <div className="flex-1">
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor={`${link.id}-label`}>
            Nome do link adicional
          </label>
          <Input
            id={`${link.id}-label`}
            value={link.label}
            onChange={(event) => onChange({ label: event.target.value })}
            placeholder="Nome do link"
            aria-invalid={Boolean(error?.label)}
            className={`h-11 ${chrome.input}`}
          />
        </div>
        <div>
          <label className="sr-only" htmlFor={`${link.id}-url`}>
            URL do link adicional
          </label>
          <Input
            id={`${link.id}-url`}
            value={link.url}
            onChange={(event) => onChange({ url: event.target.value })}
            placeholder="seusite.com"
            aria-invalid={Boolean(error?.url)}
            className={`h-11 ${chrome.input}`}
          />
        </div>
      </div>
      {(error?.label || error?.url) && (
        <div className="mt-2 space-y-1 text-xs text-rose-400">
          {error?.label && <p>{error.label}</p>}
          {error?.url && <p>{error.url}</p>}
        </div>
      )}
    </div>
    <Button
      type="button"
      variant="ghost"
      onClick={onRemove}
      className={chrome.removeButton}
    >
      <FiTrash2 className="h-4 w-4" />
    </Button>
  </div>
);

const AvatarCard = ({
  avatarDataUrl,
  avatarError,
  onChange,
  onRemove,
  chrome,
}: {
  avatarDataUrl: string | null | undefined;
  avatarError: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  chrome: OnboardingChrome;
}) => (
  <div className={`rounded-2xl p-5 ${chrome.surfaceCard}`}>
    <p className={`text-sm font-semibold ${chrome.bodyText}`}>Imagem do perfil</p>
    <div className="mt-4 flex flex-wrap items-center gap-4">
      <div
        className={`h-24 w-24 overflow-hidden rounded-full border ${chrome.accentBorder} ${chrome.iconBadge}`}
      >
        {avatarDataUrl ? (
          <img
            src={avatarDataUrl}
            alt="Avatar preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center ${chrome.captionText}`}>
            <FiImage className="h-8 w-8" />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="avatar-upload"
          className={`text-sm font-semibold ${chrome.bodyText}`}
        >
          Link da imagem
        </label>
        <Input
          id="avatar-upload"
          type="url"
          value={avatarDataUrl || ''}
          onChange={onChange}
          placeholder="exemplo.com/minha-foto.jpg"
          className={`h-11 ${chrome.input}`}
        />
        {avatarDataUrl && (
          <button
            type="button"
            onClick={onRemove}
            className="block text-xs text-rose-300 transition-colors hover:text-rose-200"
          >
            Remover imagem
          </button>
        )}
        <p className={`text-xs ${chrome.helperText}`}>Use um link publico de imagem.</p>
        {avatarError && <p className="text-xs text-rose-400">{avatarError}</p>}
      </div>
    </div>
  </div>
);

const PreviewCard = ({
  avatarDataUrl,
  displayName,
  bio,
  selectedPlatforms,
  platformLinks,
  chrome,
}: {
  avatarDataUrl: string | null | undefined;
  displayName: string;
  bio: string;
  selectedPlatforms: PlatformId[];
  platformLinks: Partial<Record<PlatformId, string>>;
  chrome: OnboardingChrome;
}) => (
  <div className={`rounded-2xl p-6 ${chrome.previewShell}`}>
    <h2 className={`text-sm font-semibold uppercase tracking-[0.3em] ${chrome.sectionLabel}`}>
      Pre-visualizacao
    </h2>
    <div className={`mt-6 rounded-2xl p-6 ${chrome.previewCard}`}>
      <div className="flex items-center gap-4">
        <div
          className={`h-16 w-16 overflow-hidden rounded-full border ${chrome.accentBorder} ${chrome.iconBadge}`}
        >
          {avatarDataUrl ? (
            <img
              src={avatarDataUrl}
              alt="Avatar preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center ${chrome.captionText}`}
            >
              <FiImage className="h-6 w-6" />
            </div>
          )}
        </div>
        <div>
          <p className={`text-lg font-semibold ${chrome.bodyText}`}>
            {displayName.trim() || 'Seu nome'}
          </p>
          <p className={`text-sm ${chrome.captionText}`}>
            {bio.trim() || 'Sua bio aparecera aqui.'}
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {selectedPlatforms.slice(0, 3).map((platformId) => {
          const platform = PLATFORM_OPTIONS.find(
            (item) => item.id === platformId,
          );
          if (!platform) return null;
          const Icon = platform.icon;
          return (
            <div
              key={`preview-${platformId}`}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${chrome.previewRow}`}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                <span>{platform.label}</span>
              </div>
              <span className={`text-xs ${chrome.previewValue}`}>
                {platformLinks[platformId] || 'Adicionar link'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const GoogleGlyph = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const GoogleAuthGate = ({
  open,
  isLoading,
  error,
  onClose,
  onContinue,
  chrome,
}: {
  open: boolean;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onContinue: () => Promise<void>;
  chrome: OnboardingChrome;
}) => {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-6 ${chrome.modalBackdrop}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-google-gate-title"
    >
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-[28px] p-6 ${chrome.modalCard}`}
      >
        <div
          className={`pointer-events-none absolute inset-x-6 top-0 h-px ${chrome.modalAccentLine}`}
        />

        <div className="space-y-5">
          <div className="space-y-3">
            <p className={`text-xs uppercase tracking-[0.3em] ${chrome.modalEyebrow}`}>
              Finalizar cadastro
            </p>
            <h2
              id="onboarding-google-gate-title"
              className={`text-2xl font-semibold tracking-tight ${chrome.modalTitle}`}
            >
              Seu perfil esta quase pronto
            </h2>
            <p className={`text-sm leading-6 ${chrome.modalBody}`}>
              Entre com Google para salvar seu primeiro perfil e concluir
              criacao automaticamente.
            </p>
          </div>

          {error && <div className={chrome.modalError}>{error}</div>}

          <button
            type="button"
            onClick={() => {
              void onContinue();
            }}
            disabled={isLoading}
            className={chrome.modalContinue}
          >
            <GoogleGlyph />
            {isLoading ? 'Conectando com Google...' : 'Continuar com Google'}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className={chrome.modalClose}
          >
            Continuar editando
          </button>
        </div>
      </div>
    </div>
  );
};

export function InfluencerOnboardingPage({
  templateId: templateIdProp,
}: {
  templateId?: string;
}) {
  const { profileId, templateId: templateIdParam } = useParams<{
    profileId: string;
    templateId?: string;
  }>();
  const location = useLocation();
  const isDashboardEditor = location.pathname.startsWith('/dashboard/influencer/');
  const navigate = useNavigate();
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    error: authError,
    loginWithGoogle,
    loadProfile,
    clearError,
  } = useAuthStore();
  const draftRef = React.useRef<OnboardingDraft | null>(null);
  const [state, setState] = React.useState<OnboardingState>(
    createDefaultOnboardingState,
  );
  const [avatarError, setAvatarError] = React.useState<string | null>(null);
  const [isGoogleGateOpen, setIsGoogleGateOpen] = React.useState(false);
  const [isSavingLinks, setIsSavingLinks] = React.useState(false);
  const [isSavingAll, setIsSavingAll] = React.useState(false);
  const [resolvedTemplateId, setResolvedTemplateId] = React.useState<
    TemplateType | null
  >((templateIdProp || templateIdParam || null) as TemplateType | null);
  const [isResolvingTemplate, setIsResolvingTemplate] = React.useState(
    !resolvedTemplateId && Boolean(profileId),
  );
  const { save } = useSaveTemplate(resolvedTemplateId || undefined);

  React.useEffect(() => {
    if (!profileId) return;
    const draft = loadDraft(profileId);
    draftRef.current = draft;

    if (draft) {
      setState(createDefaultOnboardingState(draft.data));
      setResolvedTemplateId(draft.templateType);
      setIsResolvingTemplate(false);
      return;
    }

    setState(createDefaultOnboardingState());
  }, [profileId]);

  React.useEffect(() => {
    if (
      !profileId ||
      !profileId.startsWith('draft-') ||
      !resolvedTemplateId ||
      !draftRef.current
    ) {
      return;
    }

    const nextDraft: OnboardingDraft = {
      ...draftRef.current,
      status: draftRef.current.status === 'pending_auth' ? 'pending_auth' : 'collecting',
      templateType: resolvedTemplateId,
      displayName: state.displayName.trim() || draftRef.current.displayName,
      data: createDefaultOnboardingState(state),
      updatedAt: new Date().toISOString(),
    };

    draftRef.current = nextDraft;
    saveDraft(nextDraft);
  }, [state, profileId, resolvedTemplateId]);

  React.useEffect(() => {
    if (!profileId || resolvedTemplateId) return;

    const draft = draftRef.current;
    if (draft?.templateType) {
      setResolvedTemplateId(draft.templateType);
      return;
    }

    if (!profileId.startsWith('draft-')) {
      setIsResolvingTemplate(true);
      profileApi
        .getComplete(profileId)
        .then((profile) => {
          setResolvedTemplateId(profile.templateType as TemplateType);
        })
        .catch(() => {
          setResolvedTemplateId(null);
        })
        .finally(() => {
          setIsResolvingTemplate(false);
        });
    }
  }, [profileId, resolvedTemplateId]);

  const unresolvedStateClass = isDashboardEditor
    ? 'min-h-screen flex items-center justify-center text-slate-500'
    : 'min-h-screen flex items-center justify-center bg-[#221e1b] text-[#cbbcae]';

  if (!profileId) {
    return (
      <div className={unresolvedStateClass}>
        Perfil nao encontrado.
      </div>
    );
  }
  if (!resolvedTemplateId) {
    return (
      <div className={unresolvedStateClass}>
        {isResolvingTemplate ? 'Carregando template...' : null}
      </div>
    );
  }

  const onboardingChrome = isDashboardEditor
    ? createEditorOnboardingChrome(
        getInfluencerThemePreset(resolveThemeId(resolvedTemplateId)).chrome,
      )
    : PUBLIC_ONBOARDING_CHROME;
  const totalSteps = 3;
  const selectedCount = state.selectedPlatforms.length;
  const selectedSet = new Set(state.selectedPlatforms);
  const canSelectMore = selectedCount < 5;

  const platformErrors = state.selectedPlatforms.reduce<
    Record<string, string | null>
  >((acc, platformId) => {
    const platform = PLATFORM_OPTIONS.find((item) => item.id === platformId);
    if (!platform) return acc;
    acc[platformId] = validatePlatformValue(
      platform,
      state.platformLinks[platformId] || '',
    );
    return acc;
  }, {});

  const platformWarnings = state.selectedPlatforms.reduce<
    Record<string, boolean>
  >((acc, platformId) => {
    acc[platformId] = !(state.platformLinks[platformId] || '').trim();
    return acc;
  }, {});

  const additionalErrors = state.additionalLinks.reduce<
    Record<string, { label?: string | null; url?: string | null }>
  >((acc, link) => {
    const trimmedLabel = link.label.trim();
    const trimmedUrl = link.url.trim();
    let labelError: string | null = null;
    let urlError: string | null = null;
    if (trimmedUrl && !trimmedLabel) {
      labelError = 'Informe um nome para o link.';
    }
    if (trimmedLabel && !trimmedUrl) {
      urlError = 'Informe a URL do link.';
    }
    if (trimmedUrl && !isValidUrl(link.url)) {
      urlError = 'URL invalida.';
    }
    acc[link.id] = { label: labelError, url: urlError };
    return acc;
  }, {});

  const hasInvalidLinks =
    Object.values(platformErrors).some((value) => value) ||
    Object.values(additionalErrors).some((value) => value.label || value.url);

  const isDisplayNameValid = state.displayName.trim().length > 0;

  const updateState = (updates: Partial<OnboardingState>) =>
    setState((prev) => ({ ...prev, ...updates }));

  const openGoogleGate = () => {
    clearError();
    setIsGoogleGateOpen(true);
    trackOnboardingEvent('auth_gate_opened', {
      profileId,
      step: state.step,
    });
  };

  const closeGoogleGate = () => {
    if (isAuthLoading) return;
    clearError();
    setIsGoogleGateOpen(false);
  };

  const handlePlatformToggle = (id: PlatformId) => {
    const alreadySelected = selectedSet.has(id);
    if (!alreadySelected && !canSelectMore) {
      toast.error('Voce pode selecionar ate cinco plataformas.', {
        id: ONBOARDING_LIMIT_TOAST_ID,
      });
      return;
    }

    const nextPlatforms = alreadySelected
      ? state.selectedPlatforms.filter((item) => item !== id)
      : [...state.selectedPlatforms, id];

    updateState({ selectedPlatforms: nextPlatforms });
    trackOnboardingEvent(
      alreadySelected ? 'platform_removed' : 'platform_selected',
      {
        profileId,
        platform: id,
        count: nextPlatforms.length,
      },
    );
  };

  const handleAddAdditionalLink = () => {
    if (state.additionalLinks.length >= 10) {
      toast.error('Voce pode adicionar ate 10 links adicionais.', {
        id: ONBOARDING_LIMIT_TOAST_ID,
      });
      return;
    }
    updateState({
      additionalLinks: [
        ...state.additionalLinks,
        { id: `additional-${Date.now()}`, label: '', url: '' },
      ],
    });
  };

  const handleRemoveAdditionalLink = (id: string) => {
    updateState({
      additionalLinks: state.additionalLinks.filter((link) => link.id !== id),
    });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value.trim()) {
      updateState({ avatarDataUrl: '', avatarFileName: null });
      setAvatarError(null);
      return;
    }

    if (!isValidUrl(value)) {
      setAvatarError('Informe uma URL valida.');
      return;
    }

    updateState({ avatarDataUrl: value.trim(), avatarFileName: null });
    setAvatarError(null);
  };

  const saveSocialsFromPlatforms = async (targetProfileId: string) => {
    if (targetProfileId.startsWith('draft-')) return;

    const currentSocials = await socialApi.getByProfileId(targetProfileId);
    for (const social of currentSocials) {
      await socialApi.delete(social.id);
    }

    const skippedPlatforms: PlatformId[] = [];
    const selected = state.selectedPlatforms
      .map((platformId) => {
        if (!API_SUPPORTED_PLATFORMS.has(platformId)) {
          const rawValue = state.platformLinks[platformId] || '';
          if (rawValue.trim()) {
            skippedPlatforms.push(platformId);
          }
          return null;
        }
        const rawValue = state.platformLinks[platformId] || '';
        const normalized = normalizeSocialUrl(platformId, rawValue);
        if (!normalized) return null;
        return {
          platform: PLATFORM_SOCIAL_MAP[platformId],
          url: normalized,
        };
      })
      .filter(Boolean) as Array<{ platform: string; url: string }>;

    if (skippedPlatforms.length) {
      const readable = skippedPlatforms.join(', ');
      toast.warning(
        `Algumas plataformas ainda nao sao suportadas pela API: ${readable}. Use links adicionais para inclui-las.`,
        { id: ONBOARDING_LINKS_TOAST_ID },
      );
    }

    for (let i = 0; i < selected.length; i += 1) {
      const item = selected[i];
      const data = {
        profileId: targetProfileId,
        plataforma: item.platform as any,
        url: item.url,
        ordem: i + 1,
      };
      console.log('Sending social data:', data);
      await socialApi.create(data);
    }
  };

  const persistCurrentDraft = (status: OnboardingDraft['status']) => {
    if (
      !profileId ||
      !profileId.startsWith('draft-') ||
      !resolvedTemplateId ||
      !draftRef.current
    ) {
      return null;
    }

    const nextDraft: OnboardingDraft = {
      ...draftRef.current,
      status,
      templateType: resolvedTemplateId,
      displayName: state.displayName.trim() || draftRef.current.displayName,
      data: createDefaultOnboardingState(state),
      updatedAt: new Date().toISOString(),
    };

    draftRef.current = nextDraft;
    saveDraft(nextDraft);
    return nextDraft;
  };

  const finalizeDraftOnServer = async (draft: OnboardingDraft) => {
    const result = await onboardingApi.finalize(toFinalizeOnboardingPayload(draft));

    persistLegacyProfilePointers(result.profileId, result.templateType);
    clearDraft(draft.draftId);
    draftRef.current = null;
    await loadProfile();

    if (result.skippedPlatforms.length > 0) {
      toast.warning(
        `Algumas plataformas ainda nao sao suportadas pela API: ${result.skippedPlatforms.join(', ')}.`,
        { id: ONBOARDING_FINISH_TOAST_ID },
      );
    }

    trackOnboardingEvent('onboarding_completed', {
      profileId: result.profileId,
      selectedPlatforms: draft.data.selectedPlatforms,
      skippedPlatforms: result.skippedPlatforms,
    });

    navigate(result.redirectTo);
  };

  const handleStartGoogleAuth = async () => {
    const currentDraft = persistCurrentDraft('pending_auth');

    if (!currentDraft) {
      toast.error('Rascunho do onboarding não encontrado.', {
        id: ONBOARDING_AUTH_TOAST_ID,
      });
      navigate('/profile/create');
      return;
    }

    clearError();
    setAuthIntent({
      intent: 'onboarding_finalize',
      draftId: currentDraft.draftId,
      returnTo: window.location.pathname + window.location.search,
      createdAt: new Date().toISOString(),
    });
    trackOnboardingEvent('google_auth_started', {
      profileId: currentDraft.draftId,
    });
    await loginWithGoogle();
  };

  const handleContinueFromLinks = async () => {
    setIsSavingLinks(true);
    try {
      if (!profileId) {
        toast.error('Perfil não encontrado.', {
          id: ONBOARDING_LINKS_TOAST_ID,
        });
        return;
      }

      if (profileId.startsWith('draft-')) {
        // Em modo draft, apenas segue para próxima etapa sem chamar API
        trackOnboardingEvent('links_saved_draft', {
          profileId,
          selectedPlatforms: state.selectedPlatforms,
        });
        updateState({ step: 3 });
        return;
      }

      await saveSocialsFromPlatforms(profileId);
      trackOnboardingEvent('links_saved', {
        profileId,
        selectedPlatforms: state.selectedPlatforms,
        additionalLinks: state.additionalLinks.filter((link) => link.url.trim())
          .length,
      });
      updateState({ step: 3 });
    } catch {
      toast.error('Nao foi possivel salvar suas redes sociais.', {
        id: ONBOARDING_LINKS_TOAST_ID,
      });
    } finally {
      setIsSavingLinks(false);
    }
  };

  const handleFinish = async () => {
    if (!profileId) {
      toast.error('Perfil não encontrado.', {
        id: ONBOARDING_FINISH_TOAST_ID,
      });
      return;
    }

    if (profileId.startsWith('draft-') && !isAuthenticated) {
      openGoogleGate();
      return;
    }

    setIsSavingAll(true);
    try {
      if (profileId.startsWith('draft-')) {
        const currentDraft = persistCurrentDraft('collecting');

        if (!currentDraft) {
          toast.error('Rascunho do onboarding não encontrado.', {
            id: ONBOARDING_FINISH_TOAST_ID,
          });
          navigate('/profile/create');
          return;
        }

        await finalizeDraftOnServer(currentDraft);
        return;
      }

      await saveSocialsFromPlatforms(profileId);

      const buttons = state.additionalLinks
        .filter((link) => link.url.trim() && link.label.trim())
        .map((link, index) => ({
          label: link.label.trim() || `Link adicional ${index + 1}`,
          url: link.url.trim(),
          subtext: '',
          icon: 'link',
          style: 'primary',
        }));

      await save(profileId, {
        themeId: resolvedTemplateId,
        name: state.displayName.trim(),
        bio: state.bio.trim(),
        photoUrl: state.avatarDataUrl || '',
        socials: state.selectedPlatforms
          .map((platformId) => {
            const normalized = normalizeSocialUrl(
              platformId,
              state.platformLinks[platformId] || '',
            );
            if (!normalized) return null;
            return {
              platform: PLATFORM_SOCIAL_MAP[platformId],
              url: normalized,
            };
          })
          .filter(Boolean) as Array<{ platform: string; url: string }>,
        buttons,
      });

      trackOnboardingEvent('onboarding_completed', {
        profileId,
        selectedPlatforms: state.selectedPlatforms,
      });

      navigate(`/dashboard/influencer/${resolvedTemplateId}/${profileId}/preview`);
    } catch (error: unknown) {
      const backendMessage = getApiErrorMessage(error);
      const normalizedMessage = backendMessage.toLowerCase();

      if (normalizedMessage.includes('limite')) {
        toast.error(backendMessage, {
          id: ONBOARDING_FINISH_TOAST_ID,
        });
        navigate('/dashboard/bio');
        return;
      }

      toast.error(backendMessage || 'Nao foi possivel salvar seu perfil.', {
        id: ONBOARDING_FINISH_TOAST_ID,
      });
    } finally {
      setIsSavingAll(false);
    }
  };

  return (
    <div className={onboardingChrome.root}>
      {!isDashboardEditor && <Header />}
      <div className={`flex-1 px-4 py-10 sm:px-6 lg:px-8 ${onboardingChrome.page}`}>
        <div className="mx-auto flex w-full max-w-5xl flex-col">
          <TopBar
            chrome={onboardingChrome}
            onBack={() =>
              state.step === 1
                ? navigate('/profile/create')
                : updateState({ step: state.step - 1 })
            }
            onSkip={() =>
              state.step === 3
                ? !profileId.startsWith('draft-')
                  ? navigate(
                      `/dashboard/influencer/${resolvedTemplateId}/${profileId}/preview`,
                    )
                  : undefined
                : updateState({ step: 2 })
            }
            showSkip={state.step === 1 || (state.step === 3 && !profileId.startsWith('draft-'))}
          />

          <ProgressBar
            step={state.step}
            totalSteps={totalSteps}
            selectedCount={selectedCount}
            chrome={onboardingChrome}
          />

          <div className={`flex-1 ${onboardingChrome.contentCard}`}>
            {state.step === 1 && (
              <div className="space-y-8 onboard-fade">
                <StepHeader
                  title="Em quais plataformas voce esta?"
                  subtitle="Escolha ate cinco para comecar. Voce pode atualizar quando quiser."
                  chrome={onboardingChrome}
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {PLATFORM_OPTIONS.map((platform) => {
                    const isSelected = selectedSet.has(platform.id);
                    const disabled = !isSelected && !canSelectMore;
                    const order =
                      state.selectedPlatforms.indexOf(platform.id) + 1;

                    return (
                      <PlatformCard
                        key={platform.id}
                        platform={platform}
                        isSelected={isSelected}
                        order={order}
                        disabled={disabled}
                        chrome={onboardingChrome}
                        onToggle={() => handlePlatformToggle(platform.id)}
                      />
                    );
                  })}
                </div>

                <div
                  className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4 text-sm ${onboardingChrome.infoBar} ${onboardingChrome.infoText}`}
                >
                  <span>
                    {selectedCount === 0
                      ? 'Selecione ao menos uma plataforma para continuar.'
                      : `${selectedCount} plataforma${selectedCount > 1 ? 's' : ''} selecionada${selectedCount > 1 ? 's' : ''}.`}
                  </span>
                  <Button
                    type="button"
                    onClick={() => updateState({ step: 2 })}
                    disabled={selectedCount === 0}
                    className={onboardingChrome.buttonPrimary}
                  >
                    Continuar
                    <FiArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {state.step === 2 && (
              <div className="space-y-8 onboard-fade">
                <StepHeader
                  title="Adicione seus links"
                  subtitle="Preencha os campos abaixo para adicionar seus conteudos ao seu novo Linktree."
                  chrome={onboardingChrome}
                />

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2
                      className={`text-sm font-semibold uppercase tracking-[0.3em] ${onboardingChrome.sectionLabel}`}
                    >
                      Suas selecoes
                    </h2>
                    {state.selectedPlatforms.length === 0 ? (
                      <div
                        className={`rounded-2xl px-6 py-8 text-sm ${onboardingChrome.emptyState}`}
                      >
                        Nenhuma plataforma selecionada. Voce ainda pode
                        adicionar links personalizados abaixo.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {state.selectedPlatforms.map((platformId) => {
                          const platform = PLATFORM_OPTIONS.find(
                            (item) => item.id === platformId,
                          );
                          if (!platform) return null;
                          return (
                            <SelectedPlatformInput
                              key={platformId}
                              platform={platform}
                              value={state.platformLinks[platformId] || ''}
                              error={platformErrors[platformId]}
                              showWarning={platformWarnings[platformId]}
                              chrome={onboardingChrome}
                              onChange={(nextValue) =>
                                updateState({
                                  platformLinks: {
                                    ...state.platformLinks,
                                    [platformId]: nextValue,
                                  },
                                })
                              }
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2
                        className={`text-sm font-semibold uppercase tracking-[0.3em] ${onboardingChrome.sectionLabel}`}
                      >
                        Links adicionais
                      </h2>
                      <button
                        type="button"
                        onClick={handleAddAdditionalLink}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${onboardingChrome.buttonSecondary} ${onboardingChrome.focusRing}`}
                      >
                        <FiPlus className="h-4 w-4" />
                        Adicionar link
                      </button>
                    </div>

                    <div className="space-y-3">
                      {state.additionalLinks.map((link) => (
                        <AdditionalLinkRow
                          key={link.id}
                          link={link}
                          error={additionalErrors[link.id]}
                          chrome={onboardingChrome}
                          onChange={(updates) => {
                            const nextLinks = state.additionalLinks.map(
                              (item) =>
                                item.id === link.id
                                  ? { ...item, ...updates }
                                  : item,
                            );
                            updateState({ additionalLinks: nextLinks });
                          }}
                          onRemove={() => handleRemoveAdditionalLink(link.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4 ${onboardingChrome.infoBar}`}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => updateState({ step: 1 })}
                    className={onboardingChrome.buttonSecondary}
                  >
                    <FiArrowLeft className="h-4 w-4" />
                    Voltar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleContinueFromLinks}
                    disabled={hasInvalidLinks}
                    className={onboardingChrome.buttonPrimary}
                  >
                    {isSavingLinks ? 'Salvando...' : 'Continuar'}
                    <FiArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {state.step === 3 && (
              <div className="space-y-8 onboard-fade">
                <StepHeader
                  title="Adicione os detalhes do perfil"
                  subtitle="Adicione sua imagem, nome e bio."
                  chrome={onboardingChrome}
                />

                <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                  <div className="space-y-5">
                    <AvatarCard
                      avatarDataUrl={state.avatarDataUrl}
                      avatarError={avatarError}
                      chrome={onboardingChrome}
                      onChange={handleAvatarChange}
                      onRemove={() =>
                        updateState({
                          avatarDataUrl: null,
                          avatarFileName: null,
                        })
                      }
                    />

                    <div
                      className={`rounded-2xl p-5 ${onboardingChrome.surfaceCard}`}
                    >
                      <label
                        className={`text-sm font-semibold ${onboardingChrome.bodyText}`}
                        htmlFor="display-name"
                      >
                        Nome de exibicao
                      </label>
                      <Input
                        id="display-name"
                        value={state.displayName}
                        maxLength={50}
                        onChange={(event) =>
                          updateState({
                            displayName: event.target.value.slice(0, 50),
                          })
                        }
                        placeholder="Seu nome"
                        aria-invalid={!isDisplayNameValid}
                        className={`mt-3 h-11 ${onboardingChrome.input}`}
                      />
                      {!isDisplayNameValid && (
                        <p className="mt-2 text-xs text-rose-400">
                          O nome de exibicao e obrigatorio.
                        </p>
                      )}
                    </div>

                    <div
                      className={`rounded-2xl p-5 ${onboardingChrome.surfaceCard}`}
                    >
                      <label
                        className={`text-sm font-semibold ${onboardingChrome.bodyText}`}
                        htmlFor="bio"
                      >
                        Bio
                      </label>
                      <Textarea
                        id="bio"
                        value={state.bio}
                        onChange={(event) =>
                          updateState({ bio: event.target.value.slice(0, 160) })
                        }
                        placeholder="Escreva uma bio curta..."
                        className={`mt-3 min-h-[120px] ${onboardingChrome.input}`}
                      />
                      <div
                        className={`mt-2 flex items-center justify-between text-xs ${onboardingChrome.helperText}`}
                      >
                        <span>Mantenha curto e objetivo.</span>
                        <span>{state.bio.length}/160</span>
                      </div>
                    </div>
                  </div>

                  <PreviewCard
                    avatarDataUrl={state.avatarDataUrl}
                    displayName={state.displayName}
                    bio={state.bio}
                    selectedPlatforms={state.selectedPlatforms}
                    platformLinks={state.platformLinks}
                    chrome={onboardingChrome}
                  />
                </div>

                <div
                  className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4 ${onboardingChrome.infoBar}`}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => updateState({ step: 2 })}
                    className={onboardingChrome.buttonSecondary}
                  >
                    <FiArrowLeft className="h-4 w-4" />
                    Voltar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleFinish}
                    disabled={!isDisplayNameValid}
                    className={onboardingChrome.buttonPrimary}
                  >
                    {isSavingAll ? 'Salvando...' : 'Continuar'}
                    <FiArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <GoogleAuthGate
        open={isGoogleGateOpen}
        isLoading={isAuthLoading}
        error={authError}
        chrome={onboardingChrome}
        onClose={closeGoogleGate}
        onContinue={handleStartGoogleAuth}
      />
      {!isDashboardEditor && <Footer />}
    </div>
  );
}
