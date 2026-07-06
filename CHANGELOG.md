# Changelog

Notable changes to the portfolio website, most recent first. Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## Unreleased

### Added
- `CHANGELOG.md`, `TODO.md`, `docs/architecture/DECISIONS.md`.
- `PROJECT_STATUS.md` simplified into a scannable dashboard, with detail moved out to the linked documents.
- **Milestone 1**: `data/projects.ts`, `data/profile.ts`, `data/stack.ts` — typed, data-driven access layer per `ARCHITECTURE.md` §8/§16, seeded with placeholder content pending Phase 3 real copy.
- **Milestone 2**: `StackGrid` (`components/project/`), `StackSection` and `AboutSection` (`routes/HomePage/`) — Home now renders My Stack (13 tool badges from `data/stack.ts`) and About (from `data/profile.ts`), separated by `Divider` hairlines.
- **Milestone 3**: `ProjectStatusBadge` and `ProjectsTable` (`components/project/`), wired to `data/projects.ts` via a new `SelectedProjectsSection` (`routes/HomePage/`). Reshapes responsively (7-col table → condensed icon group → stacked cards) per `ARCHITECTURE.md` §6/§14's exact column fractions, using a `display: contents` technique so one DOM structure serves all three states without separate component trees.

### Changed
- Seed project set decision resolved: **Ascendra** replaces **MedTech**; **DocAssistant** confirmed complete. Moved from open questions to [docs/architecture/DECISIONS.md](docs/architecture/DECISIONS.md).
- **Milestone 1**: `IntroBlock` desktop (≥1024px) composition fixed from a stacked column to the approved side-by-side row — bio cluster left, CTA buttons right, bottom-aligned — matching Home (A)'s desktop breakpoint. `IntroBlock` now sources profile content from `data/profile.ts` instead of an inline placeholder object.
- **Visual fidelity pass** (against `Portfolio Wireframes v2.dc.html`'s "Home (A) — responsive breakpoints"):
  - `HeroCollage`'s featured project card no longer nests a second `ImagePlaceholder` inside it — it's a text-only panel (`bg.warm` background, `border.base` border) matching the wireframe, with its 40×2px accent underline restored and its kicker restyled to the eyebrow typographic role (uppercase, letter-spaced).
  - `HeroCollage`'s collage grid ratio corrected: equal columns (`1fr 1fr`) at tablet, `1.05fr 1fr` only from laptop (≥1024px) up — previously used the laptop/desktop ratio at tablet too.
  - Home's hero name (`IntroBlock` H1) resolved to the wireframe's literal per-breakpoint sizes (21/24/25/30px) instead of a `clamp()` reaching 52px — resolves the open question in `docs/architecture/DECISIONS.md`.
  - Hero→intro spacing and inter-section rhythm (Intro→Stack→About) rebalanced: previously both used the same flex `gap`, which combined with `Divider`'s own margin to roughly double the spacing around each divider.
  - Résumé button now shows a small "new tab" hint at desktop/laptop, matching the wireframe's detailed breakpoint mock.
  - Verified Button primary/outline against `Color Foundation.dc.html` (color, radius, padding, hover) — already compliant, no changes needed.
- **Design-fidelity correction pass** (against `ARCHITECTURE.md`, `Portfolio Wireframes v2.dc.html`, `Color Foundation.dc.html`):
  - `Header`'s bar and expanded nav now sit inside the same centered 1180px container as `HomePage` — previously stretched full viewport width on Portfolio/404 and on Home below 1024px.
  - Real identity: "Vera Bakerava" / "VB" replaces "Your Name" / "YN" placeholders in `Header`, `Footer`, `IdentityRail`, and `data/profile.ts`. Email and LinkedIn URL remain placeholder pending real contact details.
  - `IdentityRail`'s vertical gap tightened (`justify-content: flex-start` + `socials` pinned via `margin-top: auto`, replacing `justify-content: space-between`) — the rail is `position: fixed` spanning the full viewport, so the wireframe's `space-between` rule (sized for its own ~250–300px-tall rail) was stretching the nav far below the avatar.
  - `IdentityRail`'s active nav item now uses color only (`brand.900`), no underline/border indicator, matching the wireframe's rail treatment.
  - Résumé "new tab" hint tightened to ≥1440px only (previously ≥1024px) — the wireframe shows it at the 1440 desktop mock only.
  - Two other requested changes were reviewed and **not yet** implemented because they contradict the approved wireframe as written and weren't part of the explicit product-decision list below: removing the "View Portfolio →" arrow, and removing the Résumé "new tab" hint entirely. See `docs/architecture/DECISIONS.md` Open Questions.
- **Product decisions overriding the wireframe** (explicit product-owner direction, recorded in `docs/architecture/DECISIONS.md`, not fidelity corrections):
  - `IdentityRail`: Twitter and Behance icons removed from the rail's socials — LinkedIn only.
  - `StackGrid`: text labels removed from beneath every tool badge (superseded further below — badges are now brand-colored).
- **Milestones 5–8 + further product decisions**:
  - Portfolio page built out: `PortfolioHero`, `ProjectCardGallery`, `CaseStudySection` (reusable, ×4 from `data/projects.ts`), `ProjectResources` (row/wrap/grid variants per `ARCHITECTURE.md` §14), and `useScrollToHash` (`src/hooks/`, respects `prefers-reduced-motion`). `PortfolioPage` now has the same centered 1180px container as `HomePage`, plus the 2px brand-colored accent rule the wireframe shows between the card gallery and the first case study.
  - `StackGrid` badges now colored per tool's common brand color (`data/stack.ts`'s new `brandColor`/`textColor` fields — e.g. React `#61DAFB`, GitHub `#181717`, VS Code `#007ACC`) so they read as recognizable technology marks rather than generic token-colored circles. No logos/artwork reproduced — color only, same convention as common badge-generator tools. This is a deliberate, scoped exception to the app's own token palette, documented in `docs/architecture/DECISIONS.md`.
  - Primary button changed to white text (`text.inverse`) on a new `brand.700` token (`#55666C`), replacing ink on `brand.primary` — matches Color Foundation's literal white-on-primary button mock while staying at accessible contrast (Color Foundation's own §07 names `brand-700` as the fix for keeping white text). `brand.700`/`brand.800` added to `tokens/colors.ts` and `styles/tokens.css` from Color Foundation's own extended brand ramp.

## 2026-07-05 — Documentation audit

### Added
- Full engineering audit in `docs/reviews/`: Home audit, Portfolio audit, Design System audit, Architecture compliance, missing components checklist, responsive review, accessibility review, completion estimate, priority matrix, corrected roadmap.
- `PROJECT_STATUS.md` living dashboard (initial version).
- GitHub repository connected, Vercel deployment configured (`vercel.json` SPA rewrites).

## Foundation

Predates detailed change tracking; summarized here for context.

### Added
- Vite + React + TypeScript + React Router scaffold; routes `/`, `/portfolio`, `*`.
- Design tokens (color, typography, spacing) transcribed verbatim from Color Foundation.
- Shared UI primitives: `Button`, `SectionLabel`, `Divider`, `ImagePlaceholder`.
- Navigation: `navConfig`, `NavLinks`, `Header`, `IdentityRail`, `RootLayout`.
- Home page (partial): `HeroCollage`, `IntroBlock`.

## See also

- [PROJECT_STATUS.md](PROJECT_STATUS.md) — current dashboard
- [TODO.md](TODO.md) — actionable task list
- [docs/architecture/DECISIONS.md](docs/architecture/DECISIONS.md) — decisions log
- [docs/reviews/](docs/reviews/) — full engineering audit
