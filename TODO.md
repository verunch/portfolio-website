# TODO

Actionable task list. Milestone sequencing and rationale live in [docs/reviews/10-roadmap.md](docs/reviews/10-roadmap.md) and [docs/reviews/09-priority-matrix.md](docs/reviews/09-priority-matrix.md); this file is the checklist for day-to-day tracking.

## Open questions (blocking, need an answer before related work starts)

- [ ] Does Home's tablet breakpoint need visible nav links alongside the hamburger, or is hamburger-only acceptable? — see [docs/architecture/DECISIONS.md](docs/architecture/DECISIONS.md)

## Milestones

- [x] **Milestone 1** — `data/` layer (`projects.ts`, `profile.ts`, `stack.ts`) + Home hero/intro composition fix
- [x] **Milestone 2** — My Stack (`StackGrid`) + About section
- [x] **Milestone 3** — Selected Projects table (`ProjectStatusBadge`, `ProjectsTable`)
- [ ] **Milestone 4** — Footer (real implementation, mounted globally)
- [x] **Milestone 5** — Portfolio hero + card gallery
- [x] **Milestone 6** — Case study section (reusable, ×4 projects)
- [x] **Milestone 7** — Project Resources block
- [x] **Milestone 8** — Anchor scroll + reduced-motion handling
- [ ] **Milestone 9** — Accessibility + SEO pass
- [ ] **Milestone 10** — Responsive QA sweep

## Launch follow-ups

- [ ] Vercel: enable Analytics and Speed Insights; set `VITE_YM_ID` and redeploy.
- [ ] Yandex Metrica: create the 6 JavaScript-event goals listed in `src/lib/analytics.ts`.
- [ ] Google Search Console / Yandex Webmaster: verify ownership (meta tags reserved in `index.html`), submit `sitemap.xml`.
- [ ] Per-locale URLs (`/ru`, `/be`) if RU/BE search traffic matters — language currently switches client-side on one URL.
- [ ] Remove the now-unused `ImageLightbox` component, or reuse it.
- [ ] Order form: verify a real submission reaches Telegram and email; clean up duplicate Vercel env vars (keep the four `*_VB_PD2`).
- [ ] Add the user's Telegram channel link (waiting for URL) and Metrica goals `order_cta_click`, `order_request`.

## Technical debt

- No `useContainerBreakpoint` hook (`useScrollToHash` now exists in `src/hooks/`).
- No prerendering/SSG decision made for SEO (`ARCHITECTURE.md` §18).
- No per-route `<title>` / OG metadata.

## See also

- [PROJECT_STATUS.md](PROJECT_STATUS.md) — current dashboard
- [CHANGELOG.md](CHANGELOG.md) — history of changes
- [docs/architecture/DECISIONS.md](docs/architecture/DECISIONS.md) — decisions log
- [docs/reviews/](docs/reviews/) — full engineering audit
