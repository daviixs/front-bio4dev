import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Instagram,
  MessageCircle,
  PlaySquare,
  Youtube,
  Globe,
  Disc3,
  AtSign,
  Facebook,
  Twitter,
  Radio,
  Camera,
  Pin,
  HandHelping,
  Twitch,
  Apple,
  Link2,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { landingTheme } from "@/theme/landingTheme";
import { profileApi, socialApi } from "@/lib/api";
import { useSaveTemplate } from "@/hooks/useSaveTemplate";

type PlatformId =
  | "instagram"
  | "whatsapp"
  | "tiktok"
  | "youtube"
  | "website"
  | "spotify"
  | "threads"
  | "facebook"
  | "x"
  | "soundcloud"
  | "snapchat"
  | "pinterest"
  | "patreon"
  | "twitch"
  | "applemusic";

type PlatformInputType = "handle" | "url" | "phone";

type PlatformConfig = {
  id: PlatformId;
  label: string;
  icon: React.ElementType;
  placeholder: string;
  type: PlatformInputType;
};

type AdditionalLink = {
  id: string;
  label: string;
  url: string;
};

type OnboardingState = {
  step: number;
  selectedPlatforms: PlatformId[];
  platformLinks: Partial<Record<PlatformId, string>>;
  additionalLinks: AdditionalLink[];
  displayName: string;
  bio: string;
  avatarDataUrl?: string | null;
  avatarFileName?: string | null;
};

const PLATFORM_OPTIONS: PlatformConfig[] = [
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    placeholder: "@usuario",
    type: "handle",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    placeholder: "Numero do WhatsApp",
    type: "phone",
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: PlaySquare,
    placeholder: "URL",
    type: "url",
  },
  {
    id: "youtube",
    label: "YouTube",
    icon: Youtube,
    placeholder: "URL",
    type: "url",
  },
  {
    id: "website",
    label: "Website",
    icon: Globe,
    placeholder: "URL",
    type: "url",
  },
  {
    id: "spotify",
    label: "Spotify",
    icon: Disc3,
    placeholder: "URL",
    type: "url",
  },
  {
    id: "threads",
    label: "Threads",
    icon: AtSign,
    placeholder: "@usuario",
    type: "handle",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: Facebook,
    placeholder: "URL",
    type: "url",
  },
  {
    id: "x",
    label: "X",
    icon: Twitter,
    placeholder: "@usuario",
    type: "handle",
  },
  {
    id: "soundcloud",
    label: "SoundCloud",
    icon: Radio,
    placeholder: "URL",
    type: "url",
  },
  {
    id: "snapchat",
    label: "Snapchat",
    icon: Camera,
    placeholder: "@usuario",
    type: "handle",
  },
  {
    id: "pinterest",
    label: "Pinterest",
    icon: Pin,
    placeholder: "URL",
    type: "url",
  },
  {
    id: "patreon",
    label: "Patreon",
    icon: HandHelping,
    placeholder: "URL",
    type: "url",
  },
  {
    id: "twitch",
    label: "Twitch",
    icon: Twitch,
    placeholder: "URL",
    type: "url",
  },
  {
    id: "applemusic",
    label: "Apple Music",
    icon: Apple,
    placeholder: "URL",
    type: "url",
  },
];

const PLATFORM_SOCIAL_MAP: Record<PlatformId, string> = {
  instagram: "instagram",
  whatsapp: "whatsapp",
  tiktok: "tiktok",
  youtube: "youtube",
  website: "website",
  spotify: "spotify",
  threads: "threads",
  facebook: "facebook",
  x: "x",
  soundcloud: "soundcloud",
  snapchat: "snapchat",
  pinterest: "pinterest",
  patreon: "patreon",
  twitch: "twitch",
  applemusic: "applemusic",
};

// API ainda nao aceita todas as plataformas do onboarding.
const API_SUPPORTED_PLATFORMS = new Set<PlatformId>([
  "instagram",
  "whatsapp",
  "tiktok",
  "youtube",
  "facebook",
  "pinterest",
]);

const INITIAL_ADDITIONAL_LINKS: AdditionalLink[] = [
  { id: "additional-1", label: "", url: "" },
  { id: "additional-2", label: "", url: "" },
  { id: "additional-3", label: "", url: "" },
];

const getDefaultState = (): OnboardingState => ({
  step: 1,
  selectedPlatforms: [],
  platformLinks: {},
  additionalLinks: INITIAL_ADDITIONAL_LINKS,
  displayName: "",
  bio: "",
  avatarDataUrl: null,
  avatarFileName: null,
});

const isValidUrl = (value: string) => {
  if (!value.trim()) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
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
  if (platform.type === "url" && !isValidUrl(value)) {
    return "Informe uma URL valida.";
  }
  if (platform.type === "phone" && !isValidPhone(value)) {
    return "Use o formato E.164, com numeros e opcional +.";
  }
  if (platform.type === "handle" && !isValidHandle(value)) {
    return "Use @usuario sem espacos.";
  }
  return null;
};

const ensureProtocol = (value: string) => {
  if (!value) return value;
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
};

const normalizeSocialUrl = (platformId: PlatformId, value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";

  if (platformId === "whatsapp") {
    const digits = trimmed.replace(/[^\d]/g, "");
    return digits ? `https://wa.me/${digits}` : "";
  }

  if (platformId === "instagram") {
    const handle = trimmed.replace(/^@/, "");
    return handle ? `https://instagram.com/${handle}` : "";
  }

  if (platformId === "x") {
    const handle = trimmed.replace(/^@/, "");
    return handle ? `https://x.com/${handle}` : "";
  }

  if (platformId === "threads") {
    const handle = trimmed.replace(/^@/, "");
    return handle ? `https://www.threads.net/@${handle}` : "";
  }

  if (platformId === "snapchat") {
    const handle = trimmed.replace(/^@/, "");
    return handle ? `https://www.snapchat.com/add/${handle}` : "";
  }

  return ensureProtocol(trimmed);
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
  const existing = localStorage.getItem("bio4dev_onboarding_events");
  const next = existing ? JSON.parse(existing) : [];
  next.push(record);
  localStorage.setItem("bio4dev_onboarding_events", JSON.stringify(next));
  console.log("[onboarding]", record);
};

const TopBar = ({
  onBack,
  onSkip,
  showSkip,
}: {
  onBack: () => void;
  onSkip: () => void;
  showSkip: boolean;
}) => (
  <div className="mb-8 flex items-center justify-between text-sm text-slate-600">
    <button
      type="button"
      onClick={onBack}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition ${landingTheme.buttonSecondary} ${landingTheme.focusRing}`}
    >
      <ArrowLeft className="h-4 w-4" />
      Voltar
    </button>
    {showSkip && (
      <button
        type="button"
        onClick={onSkip}
        className={`rounded-full px-4 py-2 transition ${landingTheme.accentText} ${landingTheme.accentTextHover}`}
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
}: {
  step: number;
  totalSteps: number;
  selectedCount: number;
}) => {
  const progress = Math.min(100, (step / totalSteps) * 100);
  return (
    <div className="mb-6 space-y-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
        <span>Etapa {step} de 3</span>
        <span>{selectedCount}/5 selecionadas</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${landingTheme.accentBg} transition-all`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const StepHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="space-y-3">
    <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
      {title}
    </h1>
    <p className="text-base text-slate-600">{subtitle}</p>
  </div>
);

const PlatformCard = ({
  platform,
  isSelected,
  order,
  disabled,
  onToggle,
}: {
  platform: PlatformConfig;
  isSelected: boolean;
  order: number;
  disabled: boolean;
  onToggle: () => void;
}) => {
  const Icon = platform.icon;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isSelected}
      aria-label={`${platform.label} platform`}
      disabled={disabled}
      className={`relative flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition ${landingTheme.focusRing} ${
        isSelected
          ? `${landingTheme.accentBorder} ${landingTheme.accentSoft}`
          : "border-slate-200 bg-white hover:border-slate-300"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-base font-semibold text-slate-900">
          {platform.label}
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          {platform.type === "handle" ? "usuario" : platform.type}
        </p>
      </div>
      {isSelected && (
        <span
          className={`absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full ${landingTheme.accentBg} text-xs font-semibold text-white`}
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
}: {
  platform: PlatformConfig;
  value: string;
  error: string | null;
  showWarning: boolean;
  onChange: (nextValue: string) => void;
}) => {
  const Icon = platform.icon;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {platform.label}
            </p>
            <p className="text-xs text-slate-500">{platform.placeholder}</p>
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
            className={`h-11 ${landingTheme.input}`}
          />
        </div>
      </div>
      <div className="mt-2 text-xs">
        {error ? (
          <span className="text-rose-400">{error}</span>
        ) : showWarning ? (
          <span className="text-amber-300">
            Opcional, mas recomendado para lancamento.
          </span>
        ) : (
          <span className="text-emerald-300">Parece correto.</span>
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
}: {
  link: AdditionalLink;
  error: { label?: string | null; url?: string | null } | null;
  onChange: (updates: Partial<AdditionalLink>) => void;
  onRemove: () => void;
}) => (
  <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
      <Link2 className="h-5 w-5" />
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
            className={`h-11 ${landingTheme.input}`}
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
            placeholder="https://"
            aria-invalid={Boolean(error?.url)}
            className={`h-11 ${landingTheme.input}`}
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
      className="h-10 w-10 rounded-full border border-slate-700/60 text-slate-300 hover:border-rose-400 hover:text-rose-300"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
);

const AvatarCard = ({
  avatarDataUrl,
  avatarError,
  onChange,
  onRemove,
}: {
  avatarDataUrl: string | null | undefined;
  avatarError: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5">
    <p className="text-sm font-semibold text-slate-900">Imagem do perfil</p>
    <div className="mt-4 flex flex-wrap items-center gap-4">
      <div className="h-24 w-24 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
        {avatarDataUrl ? (
          <img
            src={avatarDataUrl}
            alt="Avatar preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-500">
            <Image className="h-8 w-8" />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="avatar-upload"
          className="text-sm font-semibold text-slate-700"
        >
          Link da imagem
        </label>
        <Input
          id="avatar-upload"
          type="url"
          value={avatarDataUrl || ""}
          onChange={onChange}
          placeholder="https://exemplo.com/minha-foto.jpg"
          className={`h-11 ${landingTheme.input}`}
        />
        {avatarDataUrl && (
          <button
            type="button"
            onClick={onRemove}
            className="block text-xs text-rose-300 hover:text-rose-200"
          >
            Remover imagem
          </button>
        )}
        <p className="text-xs text-slate-400">Use um link publico de imagem.</p>
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
}: {
  avatarDataUrl: string | null | undefined;
  displayName: string;
  bio: string;
  selectedPlatforms: PlatformId[];
  platformLinks: Partial<Record<PlatformId, string>>;
}) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-900">
    <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
      Pre-visualizacao
    </h2>
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
          {avatarDataUrl ? (
            <img
              src={avatarDataUrl}
              alt="Avatar preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-500">
              <Image className="h-6 w-6" />
            </div>
          )}
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-900">
            {displayName.trim() || "Seu nome"}
          </p>
          <p className="text-sm text-slate-600">
            {bio.trim() || "Sua bio aparecera aqui."}
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
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                <span>{platform.label}</span>
              </div>
              <span className="text-xs text-slate-500">
                {platformLinks[platformId] || "Adicionar link"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export function InfluencerOnboardingPage({
  templateId: templateIdProp,
}: {
  templateId?: string;
}) {
  const { profileId, templateId: templateIdParam } = useParams<{
    profileId: string;
    templateId?: string;
  }>();
  const navigate = useNavigate();
  const [state, setState] = React.useState<OnboardingState>(getDefaultState);
  const [avatarError, setAvatarError] = React.useState<string | null>(null);
  const [isSavingLinks, setIsSavingLinks] = React.useState(false);
  const [isSavingAll, setIsSavingAll] = React.useState(false);
  const [resolvedTemplateId, setResolvedTemplateId] = React.useState<
    string | null
  >(templateIdProp || templateIdParam || null);
  const [isResolvingTemplate, setIsResolvingTemplate] = React.useState(
    !resolvedTemplateId && Boolean(profileId),
  );
  const { save } = useSaveTemplate(resolvedTemplateId || undefined);

  React.useEffect(() => {
    if (!profileId) return;
    const saved = localStorage.getItem(`bio4dev_onboarding_${profileId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<OnboardingState>;
        const additionalLinks =
          parsed.additionalLinks && parsed.additionalLinks.length > 0
            ? parsed.additionalLinks.map((link, index) => ({
                id: link.id || `additional-${index + 1}`,
                label: link.label || "",
                url: link.url || "",
              }))
            : INITIAL_ADDITIONAL_LINKS;
        setState({
          ...getDefaultState(),
          ...parsed,
          additionalLinks,
        });
      } catch {
        setState(getDefaultState());
      }
    }
  }, [profileId]);

  React.useEffect(() => {
    if (!profileId) return;
    try {
      localStorage.setItem(
        `bio4dev_onboarding_${profileId}`,
        JSON.stringify(state),
      );
    } catch {
      // Ignore storage quota errors.
    }
  }, [state, profileId]);

  React.useEffect(() => {
    if (!profileId || resolvedTemplateId) return;
    setIsResolvingTemplate(true);
    profileApi
      .getComplete(profileId)
      .then((profile) => {
        setResolvedTemplateId(profile.templateType);
      })
      .catch(() => {
        setResolvedTemplateId(null);
      })
      .finally(() => {
        setIsResolvingTemplate(false);
      });
  }, [profileId, resolvedTemplateId]);

  if (!profileId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Perfil nao encontrado.
      </div>
    );
  }
  if (!resolvedTemplateId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        {isResolvingTemplate ? "Carregando template..." : null}
      </div>
    );
  }

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
      state.platformLinks[platformId] || "",
    );
    return acc;
  }, {});

  const platformWarnings = state.selectedPlatforms.reduce<
    Record<string, boolean>
  >((acc, platformId) => {
    acc[platformId] = !(state.platformLinks[platformId] || "").trim();
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
      labelError = "Informe um nome para o link.";
    }
    if (trimmedLabel && !trimmedUrl) {
      urlError = "Informe a URL do link.";
    }
    if (trimmedUrl && !isValidUrl(link.url)) {
      urlError = "URL invalida.";
    }
    acc[link.id] = { label: labelError, url: urlError };
    return acc;
  }, {});

  const hasInvalidLinks =
    Object.values(platformErrors).some((value) => value) ||
    Object.values(additionalErrors).some(
      (value) => value.label || value.url,
    );

  const isDisplayNameValid = state.displayName.trim().length > 0;

  const updateState = (updates: Partial<OnboardingState>) =>
    setState((prev) => ({ ...prev, ...updates }));

  const handlePlatformToggle = (id: PlatformId) => {
    const alreadySelected = selectedSet.has(id);
    if (!alreadySelected && !canSelectMore) {
      toast.error("Voce pode selecionar ate cinco plataformas.");
      return;
    }

    const nextPlatforms = alreadySelected
      ? state.selectedPlatforms.filter((item) => item !== id)
      : [...state.selectedPlatforms, id];

    updateState({ selectedPlatforms: nextPlatforms });
    trackOnboardingEvent(
      alreadySelected ? "platform_removed" : "platform_selected",
      {
        profileId,
        platform: id,
        count: nextPlatforms.length,
      },
    );
  };

  const handleAddAdditionalLink = () => {
    if (state.additionalLinks.length >= 10) {
      toast.error("Voce pode adicionar ate 10 links adicionais.");
      return;
    }
    updateState({
      additionalLinks: [
        ...state.additionalLinks,
        { id: `additional-${Date.now()}`, label: "", url: "" },
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
      updateState({ avatarDataUrl: "", avatarFileName: null });
      setAvatarError(null);
      return;
    }

    if (!isValidUrl(value)) {
      setAvatarError("Informe uma URL valida.");
      return;
    }

    updateState({ avatarDataUrl: value.trim(), avatarFileName: null });
    setAvatarError(null);
  };

  const saveSocialsFromPlatforms = async () => {
    const currentSocials = await socialApi.getByProfileId(profileId);
    for (const social of currentSocials) {
      await socialApi.delete(social.id);
    }

    const skippedPlatforms: PlatformId[] = [];
    const selected = state.selectedPlatforms
      .map((platformId) => {
        if (!API_SUPPORTED_PLATFORMS.has(platformId)) {
          const rawValue = state.platformLinks[platformId] || "";
          if (rawValue.trim()) {
            skippedPlatforms.push(platformId);
          }
          return null;
        }
        const rawValue = state.platformLinks[platformId] || "";
        const normalized = normalizeSocialUrl(platformId, rawValue);
        if (!normalized) return null;
        return {
          platform: PLATFORM_SOCIAL_MAP[platformId],
          url: normalized,
        };
      })
      .filter(Boolean) as Array<{ platform: string; url: string }>;

    if (skippedPlatforms.length) {
      const readable = skippedPlatforms.join(", ");
      toast.warning(
        `Algumas plataformas ainda nao sao suportadas pela API: ${readable}. Use links adicionais para inclui-las.`,
      );
    }

    for (let i = 0; i < selected.length; i += 1) {
      const item = selected[i];
      const data = {
        profileId,
        plataforma: item.platform as any,
        url: item.url,
        ordem: i + 1,
      };
      console.log("Sending social data:", data);
      await socialApi.create(data);
    }
  };

  const handleContinueFromLinks = async () => {
    setIsSavingLinks(true);
    try {
      await saveSocialsFromPlatforms();
      trackOnboardingEvent("links_saved", {
        profileId,
        selectedPlatforms: state.selectedPlatforms,
        additionalLinks: state.additionalLinks.filter((link) => link.url.trim())
          .length,
      });
      updateState({ step: 3 });
    } catch {
      toast.error("Nao foi possivel salvar suas redes sociais.");
    } finally {
      setIsSavingLinks(false);
    }
  };

  const handleFinish = async () => {
    setIsSavingAll(true);
    try {
      await saveSocialsFromPlatforms();
      const buttons = state.additionalLinks
        .filter(
          (link) => link.url.trim() && link.label.trim(),
        )
        .map((link, index) => ({
          label: link.label.trim() || `Link adicional ${index + 1}`,
          url: link.url.trim(),
          subtext: "",
          icon: "link",
          style: "primary",
        }));

      await save(profileId, {
        themeId: resolvedTemplateId,
        name: state.displayName.trim(),
        bio: state.bio.trim(),
        photoUrl: state.avatarDataUrl || "",
        socials: state.selectedPlatforms
          .map((platformId) => {
            const normalized = normalizeSocialUrl(
              platformId,
              state.platformLinks[platformId] || "",
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
      trackOnboardingEvent("onboarding_completed", {
        profileId,
        selectedPlatforms: state.selectedPlatforms,
      });
      navigate(
        `/dashboard/influencer/${resolvedTemplateId}/${profileId}/preview`,
      );
    } catch {
      toast.error("Nao foi possivel salvar seu perfil.");
    } finally {
      setIsSavingAll(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <div className="flex-1 bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col">
          <TopBar
            onBack={() =>
              state.step === 1
                ? navigate("/profile/create")
                : updateState({ step: state.step - 1 })
            }
            onSkip={() =>
              state.step === 3
                ? navigate(
                    `/dashboard/influencer/${resolvedTemplateId}/${profileId}/preview`,
                  )
                : updateState({ step: 2 })
            }
            showSkip={state.step === 1 || state.step === 3}
          />

          <ProgressBar
            step={state.step}
            totalSteps={totalSteps}
            selectedCount={selectedCount}
          />

          <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            {state.step === 1 && (
              <div className="space-y-8 onboard-fade">
                <StepHeader
                  title="Em quais plataformas voce esta?"
                  subtitle="Escolha ate cinco para comecar. Voce pode atualizar quando quiser."
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
                        onToggle={() => handlePlatformToggle(platform.id)}
                      />
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
                  <span>
                    {selectedCount === 0
                      ? "Selecione ao menos uma plataforma para continuar."
                      : `${selectedCount} plataforma${selectedCount > 1 ? "s" : ""} selecionada${selectedCount > 1 ? "s" : ""}.`}
                  </span>
                  <Button
                    type="button"
                    onClick={() => updateState({ step: 2 })}
                    disabled={selectedCount === 0}
                    className={landingTheme.buttonPrimary}
                  >
                    Continuar
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {state.step === 2 && (
              <div className="space-y-8 onboard-fade">
                <StepHeader
                  title="Adicione seus links"
                  subtitle="Preencha os campos abaixo para adicionar seus conteudos ao seu novo Linktree."
                />

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Suas selecoes
                    </h2>
                    {state.selectedPlatforms.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-8 text-sm text-slate-500">
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
                              value={state.platformLinks[platformId] || ""}
                              error={platformErrors[platformId]}
                              showWarning={platformWarnings[platformId]}
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
                      <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                        Links adicionais
                      </h2>
                      <button
                        type="button"
                        onClick={handleAddAdditionalLink}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${landingTheme.buttonSecondary}`}
                      >
                        <Plus className="h-4 w-4" />
                        Adicionar link
                      </button>
                    </div>

                    <div className="space-y-3">
                      {state.additionalLinks.map((link) => (
                        <AdditionalLinkRow
                          key={link.id}
                          link={link}
                          error={additionalErrors[link.id]}
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

                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => updateState({ step: 1 })}
                    className={landingTheme.buttonSecondary}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleContinueFromLinks}
                    disabled={hasInvalidLinks}
                    className={landingTheme.buttonPrimary}
                  >
                    {isSavingLinks ? "Salvando..." : "Continuar"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {state.step === 3 && (
              <div className="space-y-8 onboard-fade">
                <StepHeader
                  title="Adicione os detalhes do perfil"
                  subtitle="Adicione sua imagem, nome e bio."
                />

                <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                  <div className="space-y-5">
                    <AvatarCard
                      avatarDataUrl={state.avatarDataUrl}
                      avatarError={avatarError}
                      onChange={handleAvatarChange}
                      onRemove={() =>
                        updateState({
                          avatarDataUrl: null,
                          avatarFileName: null,
                        })
                      }
                    />

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <label
                        className="text-sm font-semibold text-slate-900"
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
                        className={`mt-3 h-11 ${landingTheme.input}`}
                      />
                      {!isDisplayNameValid && (
                        <p className="mt-2 text-xs text-rose-400">
                          O nome de exibicao e obrigatorio.
                        </p>
                      )}
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <label
                        className="text-sm font-semibold text-slate-900"
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
                        className={`mt-3 min-h-[120px] ${landingTheme.input}`}
                      />
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
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
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => updateState({ step: 2 })}
                    className={landingTheme.buttonSecondary}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleFinish}
                    disabled={!isDisplayNameValid}
                    className={landingTheme.buttonPrimary}
                  >
                    {isSavingAll ? "Salvando..." : "Continuar"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
