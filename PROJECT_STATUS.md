# Project Status

Living dashboard for the portfolio website. Full detail lives in the linked documents — this file is a scannable snapshot, not a duplicate of it.

## Overall completion

**~25%** — see [docs/reviews/08-completion-estimate.md](docs/reviews/08-completion-estimate.md) for the full breakdown.

## Current milestone

None in progress. Milestone 3 complete, plus a design-fidelity correction pass (container, identity, rail nav, buttons). Awaiting approval to start Milestone 4.

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
- **Design-fidelity correction pass (2)** — `Header` given a centered 1180px container (previously stretched edge-to-edge); real identity ("Vera Bakerava" / "VB") replacing "Your Name" placeholders across `Header`, `Footer`, `IdentityRail`, `data/profile.ts`; `IdentityRail`'s vertical gap and active-item indicator corrected; Résumé "new tab" hint tightened to the correct breakpoint. Several other requested changes were **not** implemented because they'd contradict the approved wireframe/color system — see `docs/architecture/DECISIONS.md` Open Questions

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
