# Onboarding React Icons Design

## Context

Page `/onboarding/:profileId` still uses generic `lucide-react` icons for social platforms. This makes onboarding show fake brand symbols on platform cards, selected link inputs, and preview rows.

Project already has `react-icons` installed and already uses brand-correct mappings in `src/lib/socialIcons.tsx`.

## Approved Direction

- Replace all visible onboarding page icons with `react-icons`.
- Use real brand icons for social platforms.
- Use outline-style action icons for UI controls.
- Keep existing onboarding layout, flow, handlers, validation, draft persistence, and API payloads unchanged.

## Architecture

- Keep icon work scoped to `src/pages/InfluencerOnboardingPage.tsx`.
- Continue using `PLATFORM_OPTIONS` as source of truth for onboarding platform metadata.
- Swap icon component references inside that config from generic placeholders to brand-correct `react-icons` components.
- Replace page action imports (`back`, `next`, `add`, `trash`, `image`, related controls) with a consistent outline family from `react-icons`.

## Rendering Strategy

- Step 1 platform cards render real platform logos.
- Step 2 selected platform inputs render the same logos from the same config.
- Step 3 preview rows render the same logos again, avoiding duplicate mapping logic.
- Non-brand controls keep one consistent outline visual language so page still feels cohesive.

## Data Flow

- No changes to:
  - `PlatformId`
  - validation rules
  - `normalizeSocialUrl`
  - local draft storage
  - auth/finalize flow
  - API requests
- Change is render-layer only.

## Risks

- Brand icons can have different visual proportions than Lucide icons, so some glyphs may need minor class/size adjustment for optical alignment.
- Existing dirty changes in onboarding file must be preserved during icon replacement.

## Validation

- Open onboarding flow and verify every visible icon comes from `react-icons`.
- Confirm all social platforms use brand-correct logos.
- Confirm action icons stay visually consistent across top bar, add/remove controls, preview, and CTA rows.
- Confirm no broken interactions on step 1, 2, or 3.
- Run project build to catch import/type issues.
