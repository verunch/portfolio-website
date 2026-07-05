# Home Page Audit

Source of truth: `docs/approved/ARCHITECTURE.md`, `docs/approved/Portfolio Wireframes v2.dc.html` — specifically the **"Home (A) — responsive breakpoints"** section, which `ARCHITECTURE.md` names as the final approved homepage (the earlier A/B/C exploration mockups are comparison sketches, not the implementation spec).

Compared against: `src/routes/HomePage/*`, `src/components/layout/RootLayout.tsx`, `src/components/layout/Header.tsx`.

## Gap Analysis

| Area | Current Implementation | Expected Implementation | Missing | Recommendation |
|---|---|---|---|---|
| Page composition | `HomePage.tsx` renders only `<HeroCollage/>` + `<IntroBlock/>`, stacked in a flex column with `space-12` gap | Hero (rail + collage + intro strip) → divider → My Stack → divider → About → divider → Selected Projects, one continuous flow | About, Stack, Selected Projects sections entirely absent | Build the 3 missing sections and assemble in wireframe order |
| Hero/Intro alignment | `IntroBlock` is a full-width vertical stack (name → bio → contacts → CTA row), rendered as a separate block below the collage | Wireframe's desktop intro is one flex row: bio cluster (name/bio/contacts, left) and CTA buttons (right, bottom-aligned), indented to align under the collage content (not under the rail) | The side-by-side bio/CTA composition and the rail-aligned indent | Restructure `IntroBlock`'s desktop layout into the left-bio/right-CTA row — this is the concrete instance of "Home does not visually match Home (A)" |
| Featured project card | `HeroCollage`'s featured card has eyebrow + title + kicker | Same, plus a 40×2px accent underline rule below the kicker | Small accent-rule element | Low priority — add during polish |
| Identity Rail nav labels | Renders global nav (`Home / Portfolio / Résumé ↗`) vertically | Wireframe mock literally shows `WORK / ABOUT / CONTACT` (in-page anchors) | — | **Not a bug.** `ARCHITECTURE.md` §9/§12 explicitly overrides this wireframe detail so Header and IdentityRail share one nav data source. Current behavior is correct per approved architecture |
| Header/nav at tablet (Home only) | `Header` on Home gets `hiddenAboveRail`, never gets `.expandable` — nav stays hamburger-gated from 0 up to 1024px | §6 table says tablet (768–1023) Home rail "collapses to a top bar (monogram left, **nav + hamburger** right)" — implies visible nav links alongside a hamburger | Visible top-bar nav at 768–1023 for Home | Needs a product decision on whether §6's "nav + hamburger" means both visible — the wireframe mock itself is ambiguous grayscale |
| Hero name typography | `clamp(30px, 6vw, 52px)` → renders ~30px mobile, ~52px desktop | Wireframe gives fixed per-breakpoint values: 21px mobile → 24px tablet → 25px laptop → 30px desktop | Current desktop size (52px) is ~73% larger than the wireframe's 30px | `ARCHITECTURE.md` §15 gives a "30–52px" range for this H1 role but doesn't pin Home's name to a specific end — flag for clarification rather than treat as settled |
| My Stack | Not built | 12 circular tool badges (React, TS, HTML, CSS, JS, Figma, Miro, Notion, GitHub, Claude, ChatGPT, Cursor, VS Code), wraps at all breakpoints | `StackGrid` component + `data/stack.ts` | Full build — Phase 1 item |
| About | Not built | Eyebrow + short paragraph block, two-column at desktop (label + text) | About section markup + copy placeholder | Full build |
| Selected Projects | Not built | 7-col table (desktop/laptop) → condensed icon-group (tablet) → cards (mobile), 4 seed projects | `ProjectsTable` (3 variants) + `ProjectStatusBadge` + `data/projects.ts` | Full build — highest-value missing piece; also unblocks Portfolio |
| Footer | Stub (`<footer><p>Your Name</p></footer>`), **not mounted** in `RootLayout` | Dark `brand-900` panel, name/tagline/nav/contact, per Color Foundation §06 | Real implementation + mounting | Build and wire in |
| Responsive breakpoints | Only the built pieces (collage, intro CTA row) implement fluid/2-state responsiveness | 4 explicit states (390/768/1024–1280/1440) per §6 | Can't fully verify until About/Stack/Table exist | Re-verify after Phase 1 components land |

## Summary

Home is partially built: the hero collage and intro block exist but deviate from the approved composition (stacked instead of side-by-side), and three entire content sections (My Stack, About, Selected Projects) plus the Footer are missing. See [10-roadmap.md](./10-roadmap.md) for sequencing.

## See also

- [../../PROJECT_STATUS.md](../../PROJECT_STATUS.md) — current dashboard
- [../../TODO.md](../../TODO.md) — actionable task list
- [../architecture/DECISIONS.md](../architecture/DECISIONS.md) — decisions & open questions (tablet nav, hero name sizing)
