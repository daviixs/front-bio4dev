# Onboarding First-Time Google Gate Design

## Context

Public users can start profile creation at `/profile/create`, enter onboarding with a local draft, and only authenticate at the end. Current behavior has two problems:

- first-time public flow can surface raw `Unauthorized` before auth is finished
- final onboarding CTA shows `Faça login com Google para salvar seu perfil.` and immediately redirects, instead of presenting a clear in-context auth checkpoint

Desired behavior: first-time public users should see a modal card in onboarding step 3, continue with Google from there, and have the draft finalized automatically after callback. Dashboard users must not see this gate.

## Approved Direction

- Scope change to first-time public onboarding flow only
- Add an onboarding-only Google auth modal on step 3
- Replace pre-auth error toast + immediate redirect with modal-first flow
- Keep authenticated dashboard creation flow unchanged
- Preserve current draft + auth-intent auto-finalize pattern after callback

## Architecture

- `CreateProfilePage` continues creating a local `draft-*` onboarding record
- Public onboarding stays accessible without login until final CTA
- `InfluencerOnboardingPage` owns modal open/close state for first-time public draft flow
- Modal confirm action triggers `loginWithGoogle()`
- `AuthCallbackPage` continues consuming onboarding auth intent and auto-finalizing draft after Google success
- No modal added to dashboard creation path

## UX and Visual Direction

- Final CTA on public draft opens centered modal over onboarding page
- Background remains visible to preserve flow continuity
- Modal explains profile is ready and Google is only needed to save first profile
- Primary action: `Continuar com Google`
- Secondary action: close modal and keep editing
- No error toast before modal opens
- Motion stays short and restrained: soft overlay fade, subtle scale-in, under 200ms

## Data Flow

- Public first-time flow:
  1. User starts at `/profile/create`
  2. Frontend creates local draft
  3. User fills onboarding unlogged
  4. Final CTA opens auth modal
  5. Modal confirm stores auth intent and starts Google OAuth
  6. Callback authenticates user
  7. Callback auto-finalizes onboarding draft
  8. Draft clears and user navigates to preview/dashboard
- Dashboard/authenticated flow remains direct save path with no modal

## Error Handling

- Do not expose raw `Unauthorized` during first-time public flow
- If OAuth start fails, show auth error in modal context
- If callback fails, return user to same onboarding draft with data preserved
- If finalize fails after auth, keep draft and return user to onboarding
- Review any post-login `loadProfile()` call that may trigger noisy protected requests before first profile exists

## Validation

- Public user reaches onboarding from `/profile/create` without raw `Unauthorized`
- Public user clicks final CTA and sees modal, not toast + redirect
- Closing modal preserves all entered data
- Confirming modal starts Google OAuth
- Successful callback auto-finalizes draft and navigates correctly
- Failed callback/finalize returns to same draft with preserved data
- Dashboard creation path never shows this modal
- Project build passes with no regressions
