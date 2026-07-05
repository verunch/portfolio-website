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

## Open Questions

| Question | Why it's open | Reference |
|---|---|---|
| Does Home's tablet breakpoint (768–1023px) need visible nav links alongside the hamburger, or is hamburger-only acceptable? | `ARCHITECTURE.md` §6 says the rail "collapses to a top bar (monogram left, **nav + hamburger** right)" — the wireframe mock itself is ambiguous grayscale | [docs/reviews/01-home-audit.md](../reviews/01-home-audit.md), [docs/reviews/06-responsive-review.md](../reviews/06-responsive-review.md) |

## See also

- [PROJECT_STATUS.md](../../PROJECT_STATUS.md) — current dashboard
- [TODO.md](../../TODO.md) — actionable task list
- [CHANGELOG.md](../../CHANGELOG.md) — history of changes
- [docs/reviews/](../reviews/) — full engineering audit
