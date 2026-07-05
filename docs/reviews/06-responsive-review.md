# Responsive Review

Verified breakpoints: 390 (mobile) · 768 (tablet) · 1024–1280 (laptop) · 1440 (desktop), per `ARCHITECTURE.md` §6.

| Breakpoint | Finding |
|---|---|
| 390 (mobile) | Hero name renders ~30px vs. the wireframe's 21px spec (see [01-home-audit.md](./01-home-audit.md)). CTA buttons correctly stack full-width. About/Stack/Table not yet built, so nothing to verify there |
| 768 (tablet) | Collage correctly switches to a 2-up grid at this breakpoint. Home nav does not show the wireframe's "nav + hamburger" combined top-bar treatment — it stays hamburger-only |
| 1024–1280 (laptop) | `IdentityRail` correctly appears at ≥1024px; `mainWithRail` margin correctly offsets content. CTA buttons correctly switch to `flex: none` (natural width) |
| 1440 (desktop) | Structurally same as laptop per architecture — no dedicated desktop-only CSS beyond container padding, matching §6's "laptop and desktop share one state" rule |
| `ProjectsTable` / `ProjectResources` 3-state responsive rule (table\|condensed\|cards, row\|wrap\|grid) | Cannot be verified — components don't exist yet |

## Summary

What's built respects the breakpoint system correctly. The components carrying the most responsive-variant complexity (`ProjectsTable`, `ProjectResources`) haven't been built, so the majority of the responsive surface area is unverifiable until [05-missing-components.md](./05-missing-components.md) items land.

## See also

- [../../PROJECT_STATUS.md](../../PROJECT_STATUS.md) — current dashboard
- [../architecture/DECISIONS.md](../architecture/DECISIONS.md) — open question on tablet nav behavior
- [01-home-audit.md](./01-home-audit.md) — hero name sizing discrepancy
