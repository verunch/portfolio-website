# TODO

Actionable task list. Milestone sequencing and rationale live in [docs/reviews/10-roadmap.md](docs/reviews/10-roadmap.md) and [docs/reviews/09-priority-matrix.md](docs/reviews/09-priority-matrix.md); this file is the checklist for day-to-day tracking.

## Open questions (blocking, need an answer before related work starts)

- [ ] Does Home's tablet breakpoint need visible nav links alongside the hamburger, or is hamburger-only acceptable? — see [docs/architecture/DECISIONS.md](docs/architecture/DECISIONS.md)
- [ ] Should Home's hero name use the wireframe's literal px values or `ARCHITECTURE.md` §15's range? — see [docs/architecture/DECISIONS.md](docs/architecture/DECISIONS.md)

## Milestones

- [x] **Milestone 1** — `data/` layer (`projects.ts`, `profile.ts`, `stack.ts`) + Home hero/intro composition fix
- [ ] **Milestone 2** — My Stack (`StackGrid`) + About section
- [ ] **Milestone 3** — Selected Projects table (`ProjectStatusBadge`, `ProjectsTable`)
- [ ] **Milestone 4** — Footer (real implementation, mounted globally)
- [ ] **Milestone 5** — Portfolio hero + card gallery
- [ ] **Milestone 6** — Case study section (reusable, ×4 projects)
- [ ] **Milestone 7** — Project Resources block
- [ ] **Milestone 8** — Anchor scroll + reduced-motion handling
- [ ] **Milestone 9** — Accessibility + SEO pass
- [ ] **Milestone 10** — Responsive QA sweep

## Technical debt

- No `useScrollToHash` / `useContainerBreakpoint` hooks (`src/hooks/` doesn't exist).
- No prerendering/SSG decision made for SEO (`ARCHITECTURE.md` §18).
- No per-route `<title>` / OG metadata.

## See also

- [PROJECT_STATUS.md](PROJECT_STATUS.md) — current dashboard
- [CHANGELOG.md](CHANGELOG.md) — history of changes
- [docs/architecture/DECISIONS.md](docs/architecture/DECISIONS.md) — decisions log
- [docs/reviews/](docs/reviews/) — full engineering audit
