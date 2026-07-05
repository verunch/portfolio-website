# Changelog

Notable changes to the portfolio website, most recent first. Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## Unreleased

### Added
- `CHANGELOG.md`, `TODO.md`, `docs/architecture/DECISIONS.md`.
- `PROJECT_STATUS.md` simplified into a scannable dashboard, with detail moved out to the linked documents.
- **Milestone 1**: `data/projects.ts`, `data/profile.ts`, `data/stack.ts` — typed, data-driven access layer per `ARCHITECTURE.md` §8/§16, seeded with placeholder content pending Phase 3 real copy.

### Changed
- Seed project set decision resolved: **Ascendra** replaces **MedTech**; **DocAssistant** confirmed complete. Moved from open questions to [docs/architecture/DECISIONS.md](docs/architecture/DECISIONS.md).
- **Milestone 1**: `IntroBlock` desktop (≥1024px) composition fixed from a stacked column to the approved side-by-side row — bio cluster left, CTA buttons right, bottom-aligned — matching Home (A)'s desktop breakpoint. `IntroBlock` now sources profile content from `data/profile.ts` instead of an inline placeholder object.

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
