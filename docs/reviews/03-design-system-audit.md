# Design System Audit

Source of truth: `docs/approved/Color Foundation.dc.html`, cross-checked against `docs/approved/ARCHITECTURE.md` §10–§13.

Compared against: `src/tokens/*.ts`, `src/styles/tokens.css`, `src/components/ui/*`, `src/components/nav/*`.

## Token Compliance

| Element | Verdict | Detail |
|---|---|---|
| Color tokens | ✅ Match exactly | `tokens/colors.ts` and `styles/tokens.css` reproduce every hex value verbatim (`#8D9FA6`, `#F2CB57`, `#403636`, etc.) |
| Typography tokens | ✅ Match | Cormorant Garamond / Inter per §15, correctly overriding the wireframe's placeholder font stacks |
| Spacing/radius tokens | ✅ Match | 4px scale and radius values match §14 |

## Component Compliance

| Component | Verdict | Detail |
|---|---|---|
| Primary button | ✅ Correct, resolves a doc contradiction | Color Foundation's own "Components" mock shows white text on `brand.primary` (fails ~2.1:1 per its own §07 Accessibility section — the doc contradicts itself internally). `ARCHITECTURE.md` §13 explicitly resolves this: ink (`text.primary`) on `brand.primary`. Current `Button.primary` implements the architecture-resolved version correctly |
| Outline button | ✅ Match | Transparent background, ink text, `border.strong` — matches Color Foundation's "Outline" swatch exactly |
| Both variants visible together on Home | 🟡 Present, structurally correct | `IntroBlock` renders `Button variant="primary"` (View Portfolio) and `Button variant="outline"` (Résumé) side by side. The concern about "not matching approved styling" traces to the hero/intro **layout** gap (see [01-home-audit.md](./01-home-audit.md)), not the button component itself — its CSS is token-correct |
| "Secondary" (beige) button variant | ❌ Not implemented | Color Foundation shows a 4th "Secondary" swatch (`neutral.beige` background). `ARCHITECTURE.md` §10/§11 only specifies `primary`/`outline`/`tile` for this project — **not a gap**, the architecture intentionally narrows the palette |
| Focus states | ✅ Present | 3px `focus-ring` box-shadow on Button, nav links, monogram, social links, hamburger toggle |
| Hover states | 🟡 Partial | Implemented for Button primary/outline and nav links; not yet applicable to components that don't exist yet (table rows, resource tiles, project cards) |
| Border radius | ✅ Match | 10px controls-lg (buttons), 4px cards, 50% circles — consistent with §14 |
| Component variants inventory (§11, 11 total) | 🟡 7 of 11 built | Missing: `ProjectStatusBadge`, `ProjectResources`, `ProjectsTable`, `StackGrid` |

## Summary

Every token and every built component is verbatim-correct against the design system. The remaining gap is coverage — 4 of 11 required reusable components (all data-driven, all with the most responsive-variant complexity) don't exist yet.
