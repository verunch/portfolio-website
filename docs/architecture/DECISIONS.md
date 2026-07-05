# Architecture & Product Decisions

A running log of decisions that resolve ambiguity between the approved wireframes, the approved architecture, and real-world implementation choices. When a question in [TODO.md](../../TODO.md) or [PROJECT_STATUS.md](../../PROJECT_STATUS.md) gets an answer, it moves here and is removed from the open list.

## Resolved Decisions

| Decision | Resolution | Why |
|---|---|---|
| Seed project set (4th project) | **Ascendra** replaces **MedTech** | `ARCHITECTURE.md` §16 originally named MedTech as a placeholder concept project; confirmed replaced with Ascendra as the real 4th project |
| DocAssistant status | **Complete / shipped** | No longer treated as an open question — `data/projects.ts` should mark DocAssistant `status: 'shipped'` |
| Home `IdentityRail` nav labels | Use the shared global nav (`Home / Portfolio / Résumé ↗`), not the wireframe's literal "WORK / ABOUT / CONTACT" | `ARCHITECTURE.md` §9/§12 — one nav data source (`navConfig.ts`) must drive both `Header` and `IdentityRail` |
| Primary button text color | Ink (`text.primary`) on `brand.primary`, not white | `ARCHITECTURE.md` §13 — resolves a contrast failure (≈2.1:1) present in Color Foundation's own component mock |
| Button variant scope | Only `primary` / `outline` / `tile` are implemented | `ARCHITECTURE.md` §10/§11 intentionally narrows Color Foundation's full button catalogue (its "Secondary" beige variant is out of scope) |
| Journal / Dear Diary | Excluded from MVP | `ARCHITECTURE.md` §1/§19 Phase 4 — reserved for future addition, not a current gap |
| Home hero name sizing | Use the wireframe's literal per-breakpoint px values (21/24/25/30px), not `ARCHITECTURE.md` §15's broader 30–52px range | Resolved during the visual-fidelity milestone in favor of the wireframe as source of truth for Home; §15's range remains the general typographic guideline for roles without a more specific wireframe value |
| Identity | Placeholder "Your Name" / "YN" replaced with **Vera Bakerava** / **VB** across `Header`, `Footer`, `IdentityRail`, `data/profile.ts` | Real identity supplied directly; email and LinkedIn URL in `data/profile.ts` remain placeholder pending real contact details — not invented |
| `IdentityRail` active-item indicator | Color-only (`brand.900` text), no underline/border | Matches the wireframe's actual rail treatment (`#2b2b2b` active vs `#9a9a9a` inactive, no rule beneath either) — the border-right indicator previously in `NavLinks`'s vertical variant wasn't in the wireframe. Color Foundation's generic nav example *does* show an underline for active items, but that example is the horizontal nav pattern (Header/Portfolio), not this rail — left untouched there |
| `IdentityRail` vertical gap | `justify-content: flex-start` + fixed gap, `socials` pinned via `margin-top: auto`, replacing `justify-content: space-between` | The wireframe's `space-between` assumes a rail bounded by the hero row's height (~250–300px); our rail is `position: fixed` spanning the full viewport, so the same rule stretched the nav far below the avatar. Not a wireframe deviation — a correction for a structural difference (fixed full-height rail vs. wireframe's bounded box) that already existed |
| Résumé button "new tab" hint breakpoint | Visible only at ≥1440px (desktop), not ≥1024px | The wireframe's detailed breakpoints show this hint at the 1440 desktop mock only — the 1280 laptop mock omits it |

## Product Decisions (override approved wireframe)

These intentionally move the implementation *away* from `Portfolio Wireframes v2.dc.html` as literally drawn — by explicit product-owner direction, not as fidelity corrections. Recorded here so the divergence from the wireframe has a durable, documented reason rather than reading as an unreviewed drift.

| Decision | Resolution | Why | Wireframe reference overridden |
|---|---|---|---|
| `IdentityRail` social icons | **Twitter and Behance removed**; LinkedIn only | Product decision — these two are not part of the current MVP | Wireframe shows exactly 3 icons (Tw/Be/in) at the desktop rail, laptop rail, and mobile treatments of Home (A) |
| Tech Stack badges | **Text labels removed.** Badge is the sole visual unit (larger, bolder abbreviation, subtle gradient/shadow for a more polished feel); full technology name preserved as a visually-hidden (`sr-only`) accessible name, not shown on screen | Product decision — badges should read as clean, professional marks rather than "placeholder circles with abbreviations." No per-brand logos/colors were introduced (avoids reproducing copyrighted artwork); styling stays within the existing approved token palette (`bg.surface`, `bg.warm`, `border.strong`, `text.primary`) | Wireframe shows an abbreviation circle **plus** a separate text-label `<div>` beneath it for all 13 tools at all 4 breakpoints |

## Open Questions

| Question | Why it's open | Reference |
|---|---|---|
| Does Home's tablet breakpoint (768–1023px) need visible nav links alongside the hamburger, or is hamburger-only acceptable? | `ARCHITECTURE.md` §6 says the rail "collapses to a top bar (monogram left, **nav + hamburger** right)" — the wireframe mock itself is ambiguous grayscale | [docs/reviews/01-home-audit.md](../reviews/01-home-audit.md), [docs/reviews/06-responsive-review.md](../reviews/06-responsive-review.md) |
| Should "View Portfolio →" lose its arrow, and should the Résumé "new tab" hint be removed entirely? | The wireframe shows `View Portfolio →` (with arrow) at all 4 breakpoints, and the "new tab" hint at the 1440 breakpoint specifically — removing either would contradict the literal wireframe text. Not part of the explicit product-decision list approved so far; left as-is (arrow) / tightened only to the correct breakpoint (new tab) pending explicit confirmation this is also an intentional override | Portfolio Wireframes v2.dc.html — Home (A), all breakpoints |
| Does `IdentityRail`'s 72px width count as part of Home's 1180px content container, or additional to it? | Currently rendered as rail (72px, fixed) + a separately-centered 1180px content area — up to 1252px combined, which leaves very little margin at common ~1280px laptop viewports. `ARCHITECTURE.md` §14 specifies the 1180px container generally but doesn't address whether Home's rail is inside or outside that total | `ARCHITECTURE.md` §9, §14 |

## See also

- [PROJECT_STATUS.md](../../PROJECT_STATUS.md) — current dashboard
- [TODO.md](../../TODO.md) — actionable task list
- [CHANGELOG.md](../../CHANGELOG.md) — history of changes
- [docs/reviews/](../reviews/) — full engineering audit
