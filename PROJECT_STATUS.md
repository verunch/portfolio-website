# Project Status

Living dashboard for the portfolio website. Backed by the audit in `docs/reviews/`; update this file as milestones complete.

## Overall completion

**~25%**

See [docs/reviews/08-completion-estimate.md](docs/reviews/08-completion-estimate.md) for the full breakdown and rationale.

## Current milestone

None in progress. Awaiting approval to start Milestone 1 (data layer + Home hero composition fix).

## Next milestone

**Milestone 1 — Data layer + Home hero correction.** Build `data/projects.ts`, `data/profile.ts`, `data/stack.ts`; fix `IntroBlock`'s desktop composition to match the approved side-by-side bio/CTA row.

## Completed milestones

- Foundation (tokens, `Button`, `SectionLabel`, `Divider`, `ImagePlaceholder`, folder scaffold, routing shell)
- `RootLayout` with `Header`/`IdentityRail` variant switch, `navConfig`
- Home: `HeroCollage`, `IntroBlock` (composition deviates from approved — see Home table below)
- Documentation audit (`docs/reviews/`)

## Home

| Feature | Status | Notes |
|---|---|---|
| Hero collage (portrait / featured project / wide band) | 🟡 Built, minor gaps | Missing featured-card accent underline |
| Intro block (name / bio / contacts / CTAs) | 🟡 Built, composition deviates | Stacked instead of the approved side-by-side bio/CTA row — see [01-home-audit.md](docs/reviews/01-home-audit.md) |
| Identity Rail | ✅ Built | Nav labels intentionally use global nav, not wireframe's literal "WORK/ABOUT/CONTACT" (per ARCHITECTURE.md §9/§12) |
| My Stack | ❌ Missing | Needs `StackGrid` + `data/stack.ts` |
| About | ❌ Missing | Needs `data/profile.ts` |
| Selected Projects table | ❌ Missing | Needs `ProjectsTable`, `ProjectStatusBadge`, `data/projects.ts` |
| Footer | ❌ Not mounted | Stub only |

## Portfolio

| Feature | Status | Notes |
|---|---|---|
| Portfolio Hero | ❌ Missing | — |
| Project Card Gallery | ❌ Missing | — |
| Case Study Section (×4 projects) | ❌ Missing | — |
| Project Resources block | ❌ Missing | — |
| Anchor scroll (`#slug`) | ❌ Missing | Needs `useScrollToHash` |

## Shared UI

| Component | Status | Notes |
|---|---|---|
| `Button` | ✅ Done | primary/outline/tile variants match Color Foundation |
| `SectionLabel` | ✅ Done | — |
| `Divider` | ✅ Done | — |
| `ImagePlaceholder` | ✅ Done | Correct decorative/content-bearing a11y handling |
| `NavLinks` / `navConfig` | ✅ Done | Shared between `Header` and `IdentityRail` |
| `ProjectStatusBadge` | ❌ Missing | — |
| `ProjectResources` | ❌ Missing | — |
| `ProjectsTable` | ❌ Missing | — |
| `StackGrid` | ❌ Missing | — |

## Design System

| Area | Status | Notes |
|---|---|---|
| Color tokens | ✅ Match | Verbatim to Color Foundation |
| Typography tokens | ✅ Match | Cormorant Garamond / Inter per §15 |
| Spacing/radius tokens | ✅ Match | 4px scale per §14 |
| Primary/Outline buttons | ✅ Match | Resolves an internal contradiction in Color Foundation itself — see [03-design-system-audit.md](docs/reviews/03-design-system-audit.md) |
| Secondary (beige) button | N/A | Intentionally out of scope per ARCHITECTURE.md §10/§11 |

## Accessibility

| Item | Status | Notes |
|---|---|---|
| Landmarks (`header`, `nav`, `main`) | ✅ Done | `footer` landmark not real yet |
| Hamburger a11y (`aria-expanded`, `Escape`) | ✅ Done | — |
| Focus rings | ✅ Done | On all interactive elements built so far |
| Tap targets ≥44×44px | ✅ Done | — |
| `prefers-reduced-motion` (anchor scroll) | ❌ Missing | Depends on Portfolio anchor scroll |
| Per-route SEO metadata | ❌ Missing | — |

## Responsive

| Breakpoint | Status | Notes |
|---|---|---|
| 390 (mobile) | 🟡 Partial | Hero name renders larger than wireframe spec (30px vs. 21px) |
| 768 (tablet) | 🟡 Partial | Home nav doesn't show wireframe's combined "nav + hamburger" top bar |
| 1024–1280 (laptop) | ✅ Verified | Rail, CTA row behavior correct |
| 1440 (desktop) | ✅ Verified | Shares laptop state per §6 |
| `ProjectsTable` / `ProjectResources` 3-state responsive rule | ❌ Unverifiable | Components don't exist yet |

## Technical Debt

- No `data/` access layer yet — Home and Portfolio both need it, currently blocking most remaining work.
- No `useScrollToHash` / `useContainerBreakpoint` hooks (`src/hooks/` doesn't exist).
- No prerendering/SSG decision made for SEO (ARCHITECTURE.md §18).
- No per-route `<title>` / OG metadata.

## Decisions

- **Nav labels**: Home's `IdentityRail` uses the shared global nav (`Home / Portfolio / Résumé ↗`), not the wireframe's literal "WORK/ABOUT/CONTACT" — per ARCHITECTURE.md §9/§12, one nav data source drives both `Header` and `IdentityRail`.
- **Primary button text color**: ink (`text.primary`) on `brand.primary`, not white — resolves a contrast failure in Color Foundation's own component mock, per ARCHITECTURE.md §13.
- **Button variants**: only `primary` / `outline` / `tile` are implemented; Color Foundation's "Secondary" beige variant is intentionally out of scope per ARCHITECTURE.md §10/§11.
- **Seed project set**: Social Radar, BioQuest, DocAssistant, MedTech — per ARCHITECTURE.md §16. (Note: `README.md` lists "Ascendra" instead of "MedTech" as the 4th planned project; this naming discrepancy is unresolved — see open question below.)
- **Journal / Dear Diary**: intentionally excluded from MVP scope per ARCHITECTURE.md §1/§19 Phase 4.

### Open questions

- Should `data/projects.ts` seed the 4th project as **MedTech** (per `ARCHITECTURE.md` §16) or **Ascendra** (per `README.md`)?
- Does Home's tablet breakpoint (768–1023px) need visible nav links alongside the hamburger (per §6's "nav + hamburger" phrasing), or is hamburger-only acceptable?
- Should Home's hero name follow the wireframe's literal per-breakpoint px values (30px desktop) or ARCHITECTURE.md §15's documented range (up to 52px)?

## Next priorities

1. [ ] Resolve open questions above (project naming, tablet nav, hero name sizing)
2. [ ] Milestone 1 — `data/` layer + Home hero/intro composition fix
3. [ ] Milestone 2 — My Stack + About sections
4. [ ] Milestone 3 — Selected Projects table (`ProjectStatusBadge`, `ProjectsTable`)
5. [ ] Milestone 4 — Footer (real implementation, mounted globally)
6. [ ] Milestone 5 — Portfolio hero + card gallery
7. [ ] Milestone 6 — Case study section (reusable, ×4 projects)
8. [ ] Milestone 7 — Project Resources block
9. [ ] Milestone 8 — Anchor scroll + reduced-motion handling
10. [ ] Milestone 9 — Accessibility + SEO pass
11. [ ] Milestone 10 — Responsive QA sweep
