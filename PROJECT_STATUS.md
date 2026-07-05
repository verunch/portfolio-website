# Project Status

Living dashboard for the portfolio website. Full detail lives in the linked documents — this file is a scannable snapshot, not a duplicate of it.

## Overall completion

**~25%** — see [docs/reviews/08-completion-estimate.md](docs/reviews/08-completion-estimate.md) for the full breakdown.

## Current milestone

None in progress. Milestone 2 complete, plus a visual-fidelity pass correcting Home against the approved wireframe. Awaiting approval to start Milestone 3.

## Next milestone

**Milestone 3 — Selected Projects table.** Build `ProjectStatusBadge` and `ProjectsTable` (table/condensed/cards variants), wire to `data/projects.ts`, assemble into `HomePage`.

## Completed milestones

- Foundation (tokens, `Button`, `SectionLabel`, `Divider`, `ImagePlaceholder`, folder scaffold, routing shell)
- `RootLayout` with `Header`/`IdentityRail` variant switch, `navConfig`
- Documentation audit (`docs/reviews/`) and documentation restructure (this dashboard, `CHANGELOG.md`, `TODO.md`, `docs/architecture/DECISIONS.md`)
- **Milestone 1** — Data layer (`data/projects.ts`, `data/profile.ts`, `data/stack.ts`) + `IntroBlock` desktop composition fix (side-by-side bio/CTA row, matching Home (A))
- **Milestone 2** — `StackGrid` (`components/project/`) + `StackSection`/`AboutSection` wired to `data/stack.ts`/`data/profile.ts`, assembled into `HomePage` with `Divider` separators
- **Visual fidelity pass** — `HeroCollage`'s featured card corrected to match the wireframe (text-only panel, no nested image, accent underline restored); hero name sizing resolved to the wireframe's literal per-breakpoint values (see `docs/architecture/DECISIONS.md`); hero→intro and inter-section spacing rebalanced; Résumé button's "new tab" hint added at desktop/laptop

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
