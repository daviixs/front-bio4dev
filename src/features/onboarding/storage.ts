import type { TemplateType } from '@/types';
import {
  createDefaultOnboardingState,
  type OnboardingAuthIntent,
  type OnboardingDraft,
} from './types';

const DRAFT_STORAGE_PREFIX = 'bio4dev_onboarding_draft_v1:';
const AUTH_INTENT_STORAGE_KEY = 'bio4dev_onboarding_auth_intent_v1';

function canUseStorage() {
  return (
    typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  );
}

function parseJson<T>(value: string | null): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getDraftStorageKey(draftId: string) {
  return `${DRAFT_STORAGE_PREFIX}${draftId}`;
}

function normalizeDraft(
  raw: Partial<OnboardingDraft> & { draftId: string },
): OnboardingDraft | null {
  if (!raw.templateType || !raw.slug) {
    return null;
  }

  return {
    version: 1,
    draftId: raw.draftId,
    status: raw.status ?? 'collecting',
    templateType: raw.templateType,
    slug: raw.slug,
    displayName: raw.displayName ?? raw.data?.displayName ?? raw.slug,
    data: createDefaultOnboardingState(raw.data),
    createdAt: raw.createdAt ?? new Date().toISOString(),
    updatedAt: raw.updatedAt ?? new Date().toISOString(),
  };
}

function migrateLegacyDraft(draftId: string) {
  if (!canUseStorage()) {
    return null;
  }

  const legacyMeta = parseJson<{
    username?: string;
    slug?: string;
    templateType?: TemplateType;
  }>(window.localStorage.getItem(`bio4dev_draft_profile_${draftId}`));
  const legacyState = parseJson<Record<string, unknown>>(
    window.localStorage.getItem(`bio4dev_onboarding_${draftId}`),
  );
  const legacyTheme = window.localStorage.getItem(
    `bio4dev_theme_${draftId}`,
  ) as TemplateType | null;

  if (!legacyMeta && !legacyState && !legacyTheme) {
    return null;
  }

  const displayName =
    (typeof legacyState?.displayName === 'string' && legacyState.displayName) ||
    legacyMeta?.username ||
    legacyMeta?.slug ||
    draftId;
  const slug = legacyMeta?.slug || draftId.replace(/^draft-/, 'meu-link');
  const templateType = legacyMeta?.templateType || legacyTheme || 'template_04';

  const draft = normalizeDraft({
    draftId,
    templateType,
    slug,
    displayName,
    data: createDefaultOnboardingState({
      ...((legacyState || {}) as Partial<OnboardingDraft['data']>),
      displayName,
    }),
  });

  if (draft) {
    saveDraft(draft);
  }

  return draft;
}

export function createDraft(input: {
  draftId: string;
  templateType: TemplateType;
  slug: string;
  displayName: string;
}) {
  const now = new Date().toISOString();
  const draft: OnboardingDraft = {
    version: 1,
    draftId: input.draftId,
    status: 'collecting',
    templateType: input.templateType,
    slug: input.slug,
    displayName: input.displayName,
    data: createDefaultOnboardingState({
      displayName: input.displayName,
    }),
    createdAt: now,
    updatedAt: now,
  };

  saveDraft(draft);
  return draft;
}

export function loadDraft(draftId: string) {
  if (!canUseStorage()) {
    return null;
  }

  const stored = parseJson<OnboardingDraft>(
    window.localStorage.getItem(getDraftStorageKey(draftId)),
  );

  if (stored) {
    return normalizeDraft(stored);
  }

  return migrateLegacyDraft(draftId);
}

export function saveDraft(draft: OnboardingDraft) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    getDraftStorageKey(draft.draftId),
    JSON.stringify(draft),
  );
}

export function clearDraft(draftId: string) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(getDraftStorageKey(draftId));
  window.localStorage.removeItem(`bio4dev_draft_profile_${draftId}`);
  window.localStorage.removeItem(`bio4dev_onboarding_${draftId}`);
  window.localStorage.removeItem(`bio4dev_onboarding_${draftId}_persisted`);
  window.localStorage.removeItem(`bio4dev_theme_${draftId}`);

  if (window.localStorage.getItem('bio4dev_profile_id') === draftId) {
    window.localStorage.removeItem('bio4dev_profile_id');
  }
}

export function setAuthIntent(intent: OnboardingAuthIntent) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(AUTH_INTENT_STORAGE_KEY, JSON.stringify(intent));
}

export function getAuthIntent() {
  if (!canUseStorage()) {
    return null;
  }

  return parseJson<OnboardingAuthIntent>(
    window.localStorage.getItem(AUTH_INTENT_STORAGE_KEY),
  );
}

export function consumeAuthIntent() {
  const intent = getAuthIntent();
  clearAuthIntent();
  return intent;
}

export function clearAuthIntent() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(AUTH_INTENT_STORAGE_KEY);
}

export function persistLegacyProfilePointers(
  profileId: string,
  templateType: TemplateType,
) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem('bio4dev_profile_id', profileId);
  window.localStorage.setItem(`bio4dev_theme_${profileId}`, templateType);
}

export function toFinalizeOnboardingPayload(draft: OnboardingDraft) {
  const additionalLinks = draft.data.additionalLinks
    .map((link) => ({
      label: link.label.trim(),
      url: link.url.trim(),
    }))
    .filter((link) => link.label && link.url);

  return {
    draftId: draft.draftId,
    templateType: draft.templateType,
    slug: draft.slug,
    displayName:
      draft.data.displayName.trim() || draft.displayName.trim() || draft.slug,
    bio: draft.data.bio.trim(),
    avatarDataUrl: draft.data.avatarDataUrl?.trim() || '',
    selectedPlatforms: draft.data.selectedPlatforms,
    platformLinks: draft.data.platformLinks,
    additionalLinks: additionalLinks.length > 0 ? additionalLinks : undefined,
  };
}
