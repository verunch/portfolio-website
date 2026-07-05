# Architecture Compliance Report

Source of truth: `docs/approved/ARCHITECTURE.md`.

Legend: ✅ Implemented · 🟡 Partially implemented · ❌ Missing

| Feature | Status |
|---|---|
| Routing shell (`/`, `/portfolio`, `*`) | ✅ Implemented |
| Anchor routing (`#slug` scroll) | ❌ Missing |
| `RootLayout` (Header/IdentityRail variant switch) | ✅ Implemented |
| `Footer` mounted globally | ❌ Missing (stub, unmounted) |
| `navConfig` single source | ✅ Implemented |
| Design tokens (§13–15) | ✅ Implemented |
| `Button`, `SectionLabel`, `Divider`, `ImagePlaceholder` | ✅ Implemented |
| `NavLinks`, `Header`, `IdentityRail` | ✅ Implemented |
| `ProjectStatusBadge` | ❌ Missing |
| `ProjectResources` | ❌ Missing |
| `ProjectsTable` | ❌ Missing |
| `StackGrid` | ❌ Missing |
| `data/` access layer (`projects.ts`, `profile.ts`, `stack.ts`) | ❌ Missing entirely |
| Home: HeroCollage, IntroBlock | 🟡 Partially implemented (built, but composition deviates — see [01-home-audit.md](./01-home-audit.md)) |
| Home: About, Stack, ProjectsTable | ❌ Missing |
| Portfolio: all components | ❌ Missing |
| `useScrollToHash`, `useContainerBreakpoint` hooks | ❌ Missing (`src/hooks/` doesn't exist) |
| Accessibility landmarks | 🟡 Partial (`<header>`, `<nav aria-label>`, `<main>` present; `<footer>` not real yet) |
| SEO metadata | ❌ Missing (no per-route `<title>`, no OG tags) |

## Summary

Foundation-level architecture (routing shell, layout, nav, tokens) is fully compliant. The gaps concentrate in the data-driven layer (`data/`, the 4 missing project components) and in Portfolio, which has no implementation yet.
