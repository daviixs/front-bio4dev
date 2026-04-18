import type { TemplateType } from '@/types';

export type PlatformId =
  | 'instagram'
  | 'whatsapp'
  | 'tiktok'
  | 'youtube'
  | 'website'
  | 'spotify'
  | 'threads'
  | 'facebook'
  | 'x'
  | 'soundcloud'
  | 'snapchat'
  | 'pinterest'
  | 'patreon'
  | 'twitch'
  | 'applemusic';

export type AdditionalLink = {
  id: string;
  label: string;
  url: string;
};

export type OnboardingState = {
  step: number;
  selectedPlatforms: PlatformId[];
  platformLinks: Partial<Record<PlatformId, string>>;
  additionalLinks: AdditionalLink[];
  displayName: string;
  bio: string;
  avatarDataUrl?: string | null;
  avatarFileName?: string | null;
};

export type OnboardingDraftStatus =
  | 'collecting'
  | 'pending_auth'
  | 'completed';

export type OnboardingDraft = {
  version: 1;
  draftId: string;
  status: OnboardingDraftStatus;
  templateType: TemplateType;
  slug: string;
  displayName: string;
  data: OnboardingState;
  createdAt: string;
  updatedAt: string;
};

export type OnboardingAuthIntent = {
  intent: 'onboarding_finalize';
  draftId: string;
  returnTo: string;
  createdAt: string;
};

export function createInitialAdditionalLinks(): AdditionalLink[] {
  return [
    { id: 'additional-1', label: '', url: '' },
    { id: 'additional-2', label: '', url: '' },
    { id: 'additional-3', label: '', url: '' },
  ];
}

export function createDefaultOnboardingState(
  overrides: Partial<OnboardingState> = {},
): OnboardingState {
  return {
    step: overrides.step ?? 1,
    selectedPlatforms: overrides.selectedPlatforms ?? [],
    platformLinks: overrides.platformLinks ?? {},
    additionalLinks:
      overrides.additionalLinks && overrides.additionalLinks.length > 0
        ? overrides.additionalLinks.map((link, index) => ({
            id: link.id || `additional-${index + 1}`,
            label: link.label || '',
            url: link.url || '',
          }))
        : createInitialAdditionalLinks(),
    displayName: overrides.displayName ?? '',
    bio: overrides.bio ?? '',
    avatarDataUrl: overrides.avatarDataUrl ?? null,
    avatarFileName: overrides.avatarFileName ?? null,
  };
}
