# Onboarding Nav & Logo Design

Date: 2026-04-01  
Author: Codex (GPT-5)  
Context: Influencer onboarding flow at `/onboarding` in front-bio4dev.

## Goals
- Hide landing navigation links and CTAs on onboarding pages to reduce exit paths.
- Swap inline SVG logo for provided asset `public/images/logobio4dev.png`, keeping click-through to home.

## Scope
- Applies to any route whose pathname starts with `/onboarding` (including nested steps).
- Affects both desktop header and mobile menu.
- Header remains unchanged elsewhere.

## Decisions
- Compute `isOnboarding = location.pathname.startsWith("/onboarding")` inside `Header`.
- Gate existing landing UI (`nav` links, login, primary CTA, mobile toggle, mobile drawer) behind `!isOnboarding && !hideLandingActions`.
- Replace `LogoMark` SVG with `<img src="/images/logobio4dev.png" alt="Bio4Dev" />`, height ~40px, preserve `Link` to `/`.
- Keep existing `/dashboard` hiding logic intact.

## Accessibility
- Maintain `aria-label` on mobile menu button (even though hidden in onboarding).
- Provide descriptive `alt` text for logo image.

## Non-Goals
- No styling overhaul, no new font/color changes.
- No dark/light logo variants; single asset only.

## Risks / Notes
- Ensure mobile overlay is also gated; otherwise drawer could still appear.
- Verify asset path works with Vite static serving (`/images/logobio4dev.png`).

## Acceptance Criteria
- Visiting `/onboarding` or any subroute shows only the logo in the header; no nav links, login, CTA, or mobile menu.
- Other routes remain visually identical to current behavior.
- Logo renders from `public/images/logobio4dev.png` with correct sizing and links to `/`.
