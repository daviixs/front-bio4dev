import {
  buildDeveloperDraft,
  normalizeDeveloperDraft,
  type DeveloperDraft,
  type DeveloperDraftAuthIntent,
  type DeveloperTemplateType,
} from './shared';

const DRAFT_STORAGE_PREFIX = 'bio4dev_dev_draft_v1:';
const AUTH_INTENT_STORAGE_KEY = 'bio4dev_dev_auth_intent_v1';

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

export function saveDeveloperDraft(draft: DeveloperDraft) {
  if (!canUseStorage()) {
    return;
  }

  const normalized = normalizeDeveloperDraft({
    ...draft,
    updatedAt: new Date().toISOString(),
  });

  if (!normalized) {
    return;
  }

  window.localStorage.setItem(
    getDraftStorageKey(normalized.draftId),
    JSON.stringify(normalized),
  );
}

export function createDeveloperDraft(input: {
  draftId: string;
  templateType: DeveloperTemplateType;
  slug: string;
  displayName: string;
}) {
  const draft = buildDeveloperDraft(input);
  saveDeveloperDraft(draft);
  return draft;
}

export function loadDeveloperDraft(draftId: string) {
  if (!canUseStorage()) {
    return null;
  }

  const stored = parseJson<DeveloperDraft>(
    window.localStorage.getItem(getDraftStorageKey(draftId)),
  );

  if (!stored) {
    return null;
  }

  const normalized = normalizeDeveloperDraft({
    ...stored,
    draftId,
  });

  if (!normalized) {
    clearDeveloperDraft(draftId);
    return null;
  }

  return normalized;
}

export function clearDeveloperDraft(draftId: string) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(getDraftStorageKey(draftId));
}

export function findReusableDeveloperDraft(input: {
  templateType: DeveloperTemplateType;
  slug: string;
}) {
  if (!canUseStorage()) {
    return null;
  }

  const matches: DeveloperDraft[] = [];

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (!key || !key.startsWith(DRAFT_STORAGE_PREFIX)) {
      continue;
    }

    const stored = parseJson<DeveloperDraft>(window.localStorage.getItem(key));
    if (!stored?.draftId) {
      continue;
    }

    const normalized = normalizeDeveloperDraft(stored);
    if (!normalized) {
      continue;
    }

    if (
      normalized.templateType === input.templateType &&
      normalized.slug === input.slug
    ) {
      matches.push(normalized);
    }
  }

  matches.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));

  return matches[0] || null;
}

export function setDeveloperDraftAuthIntent(intent: DeveloperDraftAuthIntent) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(AUTH_INTENT_STORAGE_KEY, JSON.stringify(intent));
}

export function clearDeveloperDraftAuthIntent() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(AUTH_INTENT_STORAGE_KEY);
}

export function readDeveloperDraftAuthIntent() {
  if (!canUseStorage()) {
    return {
      intent: null as DeveloperDraftAuthIntent | null,
      hasInvalidData: false,
    };
  }

  const stored = parseJson<DeveloperDraftAuthIntent>(
    window.localStorage.getItem(AUTH_INTENT_STORAGE_KEY),
  );

  if (!stored) {
    return {
      intent: null as DeveloperDraftAuthIntent | null,
      hasInvalidData: false,
    };
  }

  if (
    stored.intent !== 'developer_draft_finalize' ||
    typeof stored.draftId !== 'string' ||
    !stored.draftId.trim()
  ) {
    clearDeveloperDraftAuthIntent();
    return {
      intent: null as DeveloperDraftAuthIntent | null,
      hasInvalidData: true,
    };
  }

  return {
    intent: {
      intent: 'developer_draft_finalize',
      draftId: stored.draftId,
      returnTo:
        typeof stored.returnTo === 'string' && stored.returnTo.trim()
          ? stored.returnTo
          : `/onboarding/developer/${stored.draftId}`,
      createdAt:
        typeof stored.createdAt === 'string' && stored.createdAt.trim()
          ? stored.createdAt
          : new Date().toISOString(),
    },
    hasInvalidData: false,
  };
}

export function consumeDeveloperDraftAuthIntent() {
  const state = readDeveloperDraftAuthIntent();
  clearDeveloperDraftAuthIntent();
  return state.intent;
}
