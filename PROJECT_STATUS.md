# Project Status

Living dashboard for the portfolio website. Full detail lives in the linked documents — this file is a scannable snapshot, not a duplicate of it.

## Overall completion

**~25%** — see [docs/reviews/08-completion-estimate.md](docs/reviews/08-completion-estimate.md) for the full breakdown.

## Current milestone

None in progress. Milestones 1–3 and 5–8 complete (Milestone 4/Footer and 9–10 remain), plus design-fidelity and product-decision passes overriding parts of the wireframe by explicit product-owner direction. Awaiting approval to start Milestone 4.

## Next milestone

**Milestone 4 — Footer.** Real dark-panel implementation per Color Foundation §06, mounted in `RootLayout` for every route.

## Completed milestones

- Foundation (tokens, `Button`, `SectionLabel`, `Divider`, `ImagePlaceholder`, folder scaffold, routing shell)
- `RootLayout` with `Header`/`IdentityRail` variant switch, `navConfig`
- Documentation audit (`docs/reviews/`) and documentation restructure (this dashboard, `CHANGELOG.md`, `TODO.md`, `docs/architecture/DECISIONS.md`)
- **Milestone 1** — Data layer (`data/projects.ts`, `data/profile.ts`, `data/stack.ts`) + `IntroBlock` desktop composition fix (side-by-side bio/CTA row, matching Home (A))
- **Milestone 2** — `StackGrid` (`components/project/`) + `StackSection`/`AboutSection` wired to `data/stack.ts`/`data/profile.ts`, assembled into `HomePage` with `Divider` separators
- **Milestone 3** — `ProjectStatusBadge` + `ProjectsTable` (`components/project/`), wired to `data/projects.ts`, assembled into `HomePage` as `SelectedProjectsSection`
- **Visual fidelity pass (1)** — `HeroCollage`'s featured card corrected to match the wireframe (text-only panel, no nested image, accent underline restored); hero name sizing resolved to the wireframe's literal per-breakpoint values (see `docs/architecture/DECISIONS.md`); hero→intro and inter-section spacing rebalanced; Résumé button's "new tab" hint added at desktop/laptop
- **Design-fidelity correction pass (2)** — `Header` given a centered 1180px container (previously stretched edge-to-edge); real identity ("Vera Bakerava" / "VB") replacing "Your Name" placeholders across `Header`, `Footer`, `IdentityRail`, `data/profile.ts`; `IdentityRail`'s vertical gap and active-item indicator corrected; Résumé "new tab" hint tightened to the correct breakpoint
- **Product decisions overriding the wireframe (3)** — `IdentityRail`'s Twitter/Behance icons removed (LinkedIn only); `StackGrid` badges redesigned without text labels (badge-only, accessible name preserved via `sr-only` text). Both by explicit product-owner direction — see `docs/architecture/DECISIONS.md`. The "View Portfolio →" arrow and Résumé "new tab" hint remain as the wireframe specifies pending an explicit decision on those two specifically
- **Milestones 5–8 + further product decisions (4)** — Portfolio page built out: `PortfolioHero`, `ProjectCardGallery`, `CaseStudySection` (×4), `ProjectResources`, `useScrollToHash` (reduced-motion aware); `PortfolioPage` given the same centered 1180px container as `HomePage`. `StackGrid` badges now colored per tool's common brand color (recognizable, no logos reproduced). Primary button changed to white text on `brand.700` (was ink on `brand.primary`) to match Color Foundation's literal button mock at accessible contrast. All by explicit product-owner direction — see `docs/architecture/DECISIONS.md`

## Status by area

| Area | Completion | Detail |
|---|---|---|
| Home | 35% | [01-home-audit.md](docs/reviews/01-home-audit.md) |
| Portfolio | 2% | [02-portfolio-audit.md](docs/reviews/02-portfolio-audit.md) |
| Design System | 95% tokens / 45% components | [03-design-system-audit.md](docs/reviews/03-design-system-audit.md) |
| Architecture compliance | mixed, see detail | [04-architecture-compliance.md](docs/reviews/04-architecture-compliance.md) |
| Responsive | 30% | [06-responsive-review.md](docs/reviews/06-responsive-review.md) |
| Accessibility | 40% | [07-accessibility-review.md](docs/reviews/07-accessibility-review.md) |

Missing components checklist: [05-missing-components.md](docs/reviews/05-missing-components.md).

## Decisions & open questions

Tracked in [docs/architecture/DECISIONS.md](docs/architecture/DECISIONS.md).

## Next priorities

Tracked in [TODO.md](TODO.md).

## History

Tracked in [CHANGELOG.md](CHANGELOG.md).
