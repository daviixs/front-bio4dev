# Restore Original Influencer Template Colors

## Summary

Influencer templates are inheriting landing-page colors through shared app shell overrides and generic renderer defaults. The fix must restore each influencer template's own visual identity across preview, editor, and public routes, while leaving non-influencer templates unchanged.

## Goals

- Remove landing-page color contamination from all influencer template contexts.
- Keep each influencer template on its fixed canonical palette.
- Make the full page feel owned by the selected influencer theme, not only the inner card.
- Avoid backend changes and avoid affecting developer/portfolio templates.

## Root Causes

1. `AppShell` wraps non-landing routes with `.app-shell`, and `globals.css` rewrites generic utility classes like `bg-white`, `text-slate-*`, and `border-slate-*` to landing-page variables.
2. Influencer shared `TemplateRenderer` injects generic defaults (`bg-white`, `text-slate-900`, `#3b82f6`) instead of theme-owned presets.
3. Shared preview/editor wrappers use neutral or LP-adjacent chrome, so the surrounding page still feels like the landing page even when the template body is correct.

## Architecture

### 1. Theme Presets

Create a shared influencer theme preset map keyed by `themeId`.

Each preset defines:

- canonical `ProfileData` style defaults for the shared renderer
- shared page chrome styles for headers, badges, actions, focus states, and editor accents

These presets become the source of truth for influencer template palette behavior.

### 2. Shell Isolation

Add a dedicated influencer shell class around shared influencer template rendering.

In CSS, this class must override `.app-shell` recoloring inside influencer template subtrees so the original Tailwind utilities render normally again. This includes:

- `bg-white`, `bg-slate-50`, `bg-slate-100`
- `text-slate-900` through `text-slate-400`
- `border-slate-200`, `border-slate-300`
- `shadow-sm`

This keeps the app shell intact globally while removing LP leakage only inside influencer rendering.

### 3. Shared Renderer Updates

Update influencer shared renderer flow so canonical theme presets are always used.

- `TemplateRenderer` stops hardcoding generic white/blue defaults.
- Shared mapper/renderer path resolves the selected influencer preset and passes preset-driven `ProfileData`.
- Old saved accent/background values for influencer templates are ignored in favor of the preset.

### 4. Full-Page Chrome

Preview/editor routes must use theme-owned chrome rather than LP gold accents.

- Preview page gets a theme-aware top control bar and full-page background owned by the influencer preset.
- Influencer onboarding/editor flow switches from LP accent tokens to theme-aware accent tokens derived from the selected template.
- Dashboard editor route should not reuse landing footer chrome.

### 5. Compatibility

- No backend contract changes.
- Non-influencer templates keep current behavior.
- Existing influencer content data stays valid; only visual ownership changes.

## Validation

- Open each influencer template in dashboard preview and confirm original palette across the full page.
- Open influencer editor and confirm LP accent colors no longer appear.
- Open public influencer route and confirm the template renders with its original palette and no `.app-shell` contamination.
- Confirm non-influencer templates still render exactly as before.
- Run `npm run build`.
