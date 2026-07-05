# Accessibility Review

Source of truth: `docs/approved/ARCHITECTURE.md` §17.

| Item | Status |
|---|---|
| Landmarks (`header`, `nav aria-label="Primary"`, `main`) | ✅ Present in `RootLayout`/`Header` |
| `footer` landmark | ❌ Stub isn't a real implementation yet, and isn't mounted |
| Hamburger `aria-expanded` / `aria-controls`, `Escape` to close | ✅ Implemented correctly in `Header.tsx` |
| Focus rings on all interactive elements built so far | ✅ Implemented (Button, NavLinks, monogram, social links, contact links) |
| `ImagePlaceholder` decorative vs. content-bearing handling | ✅ Correctly implemented (`aria-hidden` vs. `role="img" aria-label`) |
| Tap targets ≥44×44px | ✅ Button min-height 44px; hamburger button 44×44px |
| `prefers-reduced-motion` for anchor scroll | ❌ Not implemented (no anchor scroll exists yet) |
| Screen-reader pass on table→card responsive transform | ❌ Not possible yet — `ProjectsTable` doesn't exist |
| Per-route `<title>` / meta | ❌ Missing |

## Summary

What's built is accessibility-correct. The gap is coverage, not quality — accessibility work should continue to be verified per-component as each new piece (Footer, ProjectsTable, Portfolio) lands, rather than deferred to a single end-of-project pass.

## See also

- [../../PROJECT_STATUS.md](../../PROJECT_STATUS.md) — current dashboard
- [../../TODO.md](../../TODO.md) — Milestone 9 (accessibility + SEO pass)
