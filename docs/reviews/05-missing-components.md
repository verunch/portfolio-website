# Missing Components Checklist

Grouped per the project's component taxonomy (`ARCHITECTURE.md` §8, §11).

## Shared UI

None missing — `Button`, `SectionLabel`, `Divider`, `ImagePlaceholder` are all built.

## Navigation

None missing — `NavLinks`, `navConfig` are built.

## Layout

- [ ] `Footer` — real implementation (currently a stub) + mounting in `RootLayout`

## Home

- [ ] `StackGrid`
- [ ] About section
- [ ] `ProjectsTable`

## Portfolio

- [ ] `PortfolioHero`
- [ ] `ProjectCardGallery`
- [ ] `CaseStudySection`
- [ ] `CaseStudyHeader`
- [ ] `CaseStudyOverviewGrid`

## Project Components

- [ ] `ProjectStatusBadge`
- [ ] `ProjectResources`

## Journal

Nothing built. **Correctly out of scope** — `ARCHITECTURE.md` §1/§19 Phase 4 explicitly excludes Dear Diary from the MVP. Not a deficiency.

## Data Layer (blocking dependency, not a UI component group)

- [ ] `data/projects.ts`
- [ ] `data/profile.ts`
- [ ] `data/stack.ts`

## Hooks

- [ ] `useScrollToHash`
- [ ] `useContainerBreakpoint`

## See also

- [../../PROJECT_STATUS.md](../../PROJECT_STATUS.md) — current dashboard
- [../../TODO.md](../../TODO.md) — actionable task list
- [10-roadmap.md](./10-roadmap.md) — sequencing for building these components
