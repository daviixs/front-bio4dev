# Home SEO and Landing Copy Design

## Context

The current landing page at `/` is structurally usable, but its copy is
misaligned with the actual Bio4Dev product. It currently references a generic
AI builder, courses, community, mentorship, and creator-style bio workflows.
The product, however, is a platform for developers to create, customize,
preview, and publish professional online portfolios.

The current SEO baseline is also weak. The HTML entrypoint only sets a generic
page title and viewport metadata. It lacks a meta description, canonical URL,
robots directives, Open Graph metadata, and Twitter card metadata.

## Approved Scope

- Change only the home page `/`
- Keep the existing landing-page structure and section layout
- Do not add new sections or new visual components
- Replace only visible copy, labels, alt text, anchors, and metadata
- Focus the page on two conversions:
  - create a free account
  - start creating a portfolio

## Search Intent

- Primary keyword: `criar portfólio profissional`
- Secondary support terms:
  - `portfólio para desenvolvedor`
  - `templates de portfólio`
  - `portfólio online`

The page should read as a transactional SaaS landing page aimed at developers
who want to build a professional portfolio quickly without advanced design
skills.

## Content Strategy

The home page copy will be rewritten to reflect the real Bio4Dev value
proposition:

- customizable templates for developer portfolios
- dynamic sections for bio, projects, work experience, tech stack, social links
- preview before publication
- GitHub and social integrations
- basic analytics
- privacy controls
- responsive layouts

The copy must avoid inventing new features or claims beyond the provided
product description.

## Metadata Strategy

The home page metadata will be rewritten around the approved keyword and the
actual product offering.

Planned metadata:

- HTML `lang="pt-BR"`
- `title`: `Criar Portfólio Profissional para Devs | Bio4Dev`
- `meta name="description"` aligned to templates, preview, GitHub integration,
  responsiveness, and free start
- `link rel="canonical"` pointing to `https://bio4dev.com/`
- `meta name="robots"` set to `index,follow`
- Open Graph tags for website sharing
- Twitter card tags for social sharing

Because the app is a SPA, metadata should be enforced in the home route rather
than relying only on static entry HTML.

## Section-by-Section Changes

### Header

- Rename navigation labels so they match the real product context
- Keep the existing CTA behavior and destinations

### Hero

- Replace the H1 with a keyword-aligned portfolio message
- Rewrite the supporting paragraph around developer portfolio creation
- Keep both conversions present in the hero CTA language
- Replace the fake trust/proof row text with product capability labels

### Features Section

- Rewrite the title and supporting paragraph to describe the actual product
  workflow
- Keep the existing layout and media block

### Tools Section

- Keep the three-card structure
- Replace testimonials with three product capability cards:
  - customizable templates
  - preview before publishing
  - integrations and analytics

### Focus Section

- Rewrite the heading and paragraph to emphasize portfolio customization,
  publication flow, privacy, and responsive behavior

### FAQ

- Replace current answers with FAQs grounded in the provided product
  description:
  - what can be added to the portfolio
  - preview before publishing
  - GitHub and social integration
  - mobile responsiveness
  - privacy controls

### Footer

- Keep the current footer structure
- Replace labels and anchors that refer to unrelated product areas

### Floating CTA

- Keep the current component
- Align the button copy with portfolio creation

## Technical Approach

No new SEO library will be added. The implementation should stay within the
current stack and established patterns.

The preferred approach is:

- update base metadata in `index.html`
- add a small route-level SEO helper for `/` so the home route explicitly sets
  `title`, `description`, canonical, robots, Open Graph, and Twitter metadata
- keep all existing routes and section components intact

## Risks and Non-Goals

### Risks

- Since the application is a SPA, home metadata updates alone do not create a
  full per-route SEO system for every public page.

### Non-Goals

- No new sections
- No new imagery
- No new routes
- No redesign of the landing layout
- No SEO work for `/profile/create/developer` or public portfolio routes in
  this change

## Validation

The implementation must confirm:

- one clear `H1` on the home page
- home copy contains no stale references to courses, community, mentorship, or
  generic AI builder positioning
- metadata is present and aligned with the approved keyword and product
- the frontend build still succeeds
