# Corrected Implementation Roadmap

Each milestone is independently reviewable and independently committable, ordered by dependency.

1. **Milestone 1 — Data layer + Home hero correction.** Build `data/projects.ts`, `data/profile.ts`, `data/stack.ts`. Fix `IntroBlock`'s desktop composition to match the approved side-by-side bio/CTA row, rail-aligned.
2. **Milestone 2 — My Stack + About.** Build `StackGrid`, wire to `data/stack.ts`. Build the About section from `data/profile.ts`.
3. **Milestone 3 — Selected Projects table.** Build `ProjectStatusBadge` and `ProjectsTable` (table/condensed/cards variants), wire to `data/projects.ts`, assemble into `HomePage`.
4. **Milestone 4 — Footer.** Real dark-panel implementation per Color Foundation §06, mounted in `RootLayout` for every route.
5. **Milestone 5 — Portfolio hero + gallery.** `PortfolioHero`, `ProjectCardGallery`, replacing the current stub.
6. **Milestone 6 — Case study section.** One reusable `CaseStudySection` (header + overview grid), rendered 4× from `data/projects.ts`.
7. **Milestone 7 — Project Resources.** `ProjectResources` (row/wrap/grid variants), wired into each `CaseStudySection`.
8. **Milestone 8 — Anchor scroll.** `useScrollToHash` hook + `prefers-reduced-motion` handling.
9. **Milestone 9 — Accessibility + SEO pass.** Per-route metadata, landmark verification, screen-reader pass on responsive transforms.
10. **Milestone 10 — Responsive QA sweep.** Verify all 4 breakpoints on both routes against the wireframe pixel values identified in this audit.

See [09-priority-matrix.md](./09-priority-matrix.md) for the priority rationale behind this sequencing.

## See also

- [../../PROJECT_STATUS.md](../../PROJECT_STATUS.md) — current dashboard
- [../../TODO.md](../../TODO.md) — this roadmap as a day-to-day checklist
- [../architecture/DECISIONS.md](../architecture/DECISIONS.md) — decisions & open questions affecting Milestone 1
