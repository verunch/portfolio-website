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

## Open Questions

| Question | Why it's open | Reference |
|---|---|---|
| Does Home's tablet breakpoint (768–1023px) need visible nav links alongside the hamburger, or is hamburger-only acceptable? | `ARCHITECTURE.md` §6 says the rail "collapses to a top bar (monogram left, **nav + hamburger** right)" — the wireframe mock itself is ambiguous grayscale | [docs/reviews/01-home-audit.md](../reviews/01-home-audit.md), [docs/reviews/06-responsive-review.md](../reviews/06-responsive-review.md) |
| Should the Twitter and Behance icons be removed from `IdentityRail`'s socials? | The wireframe's Home (A) detailed breakpoints explicitly show exactly these 3 icons (Tw/Be/in) at both the desktop rail and mobile treatments — removing 2 of them would deviate from the approved wireframe, not correct toward it. Left in place pending explicit confirmation this is an intentional scope cut, not a fidelity fix | Portfolio Wireframes v2.dc.html — Home (A), desktop-rail and mobile mockups |
| Should "View Portfolio →" lose its arrow, and should the Résumé "new tab" hint be removed entirely? | The wireframe shows `View Portfolio →` (with arrow) at all 4 breakpoints, and the "new tab" hint at the 1440 breakpoint specifically — removing either would contradict the literal wireframe text. Left as-is (arrow) / tightened only to the correct breakpoint (new tab) pending confirmation this is an intentional override | Portfolio Wireframes v2.dc.html — Home (A), all breakpoints |
| Should Tech Stack badges drop their text labels and become icon-style "brand-inspired" marks? | The wireframe shows an abbreviation + text label under every badge at all 4 breakpoints; the approved docs don't describe or depict icon-style marks anywhere. Implementing this would be new UI invention, not a correction toward an approved reference — not implemented pending confirmation and, if approved, a concrete design direction | Portfolio Wireframes v2.dc.html — Home (A), "MY STACK" row, all breakpoints |
| Does `IdentityRail`'s 72px width count as part of Home's 1180px content container, or additional to it? | Currently rendered as rail (72px, fixed) + a separately-centered 1180px content area — up to 1252px combined, which leaves very little margin at common ~1280px laptop viewports. `ARCHITECTURE.md` §14 specifies the 1180px container generally but doesn't address whether Home's rail is inside or outside that total | `ARCHITECTURE.md` §9, §14 |

## See also

- [PROJECT_STATUS.md](../../PROJECT_STATUS.md) — current dashboard
- [TODO.md](../../TODO.md) — actionable task list
- [CHANGELOG.md](../../CHANGELOG.md) — history of changes
- [docs/reviews/](../reviews/) — full engineering audit
