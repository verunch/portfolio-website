# Portfolio Website — React Implementation Architecture

Status: **Approved for build.** This document is the single source of truth for implementation. It translates the approved wireframes (`Portfolio Wireframes v2.dc.html`) and the approved Design System (`Color Foundation.dc.html`) into a production React architecture. It makes no new UX, UI, or product decisions — everywhere a decision was ambiguous in the source files, this document states the decision explicitly so Claude Code can build without stopping to ask.

Source of truth files (do not reinterpret):
- `Portfolio Wireframes v2.dc.html` — approved layout: **Home (A) — responsive breakpoints** is the final homepage; approved Portfolio table; approved Project Resources block.
- `Color Foundation.dc.html` — approved color tokens (see §13).

---

## 1. Sitemap

```
/                      Home            (build now)
/portfolio             Portfolio       (build now)
/portfolio#<slug>      Case study anchor within Portfolio (build now)
/resume                → external PDF, opens in new tab (not a route)
/dear-diary            Dear Diary      (excluded from MVP — see §19 for future addition)
```

Two routed pages ship in the MVP: **Home** and **Portfolio**. `/resume` is not a page — it's an `<a>` with `target="_blank"` to a static PDF asset. `/dear-diary` is intentionally not built now; §19 specifies how it plugs in later without restructuring.

## 2. Information Architecture

| Page | Purpose | Primary content blocks |
|---|---|---|
| Home | Single-scroll landing page that establishes identity and surfaces work | Identity rail, hero collage (portrait + featured project + wide work band), name/bio/CTAs, stack grid, about, selected-projects table |
| Portfolio | Full case-study archive | Card gallery (jump links) → stacked full case-study sections, each ending in a Project Resources block |

Content ownership: Home's "Selected Projects" table is a **subset/preview** (all 4 projects, same data source, no case-study anchors required beyond what's shipped) that deep-links into Portfolio's per-project anchors. Portfolio is the canonical, exhaustive project list; Home never duplicates project copy — both read from the same project data source (§16).

## 3. Navigation Structure

Nav item set (used identically across Home and Portfolio; wireframe used "Work" — **replace with "Portfolio" everywhere per approved decision**):

```
Home · Portfolio · Résumé ↗
```

- "Dear Diary" is removed from the nav for MVP (excluded feature). The nav component must render its item list from a config array (§9) so re-adding a "Dear Diary" entry later is a one-line change, not a restructure.
- "Résumé ↗" is always styled as a distinct affordance (outlined button, not a plain link) and always opens the PDF in a new tab (`target="_blank" rel="noopener"`).
- Home (desktop 1440/1280) additionally renders a **vertical identity rail** (avatar monogram + rotated nav labels + social icons) fixed to the left of the hero — this is Home-specific chrome, not the global nav; it collapses to a top bar at tablet and to a hamburger at mobile (§6).
- Portfolio and all breakpoints below tablet use a conventional top horizontal nav bar with a hamburger under 768px.

## 4. URL Routing

React Router (v6+) data routes:

```
/                     → HomePage
/portfolio             → PortfolioPage
/portfolio#:slug        → PortfolioPage, scrolls to <section id={slug}> on mount (in-page anchor, not a route param)
*                       → NotFoundPage
```

Project slugs are derived from project data (`slug` field), e.g. `#social-radar`, `#bioquest`, `#docassistant`, `#medtech`. Anchor scrolling behavior: on `PortfolioPage` mount, if `location.hash` is set, smooth-scroll to the matching section after content paints (see wireframe note: "smooth-scroll target").

Reserved, not routed in MVP: `/dear-diary` (see §19).

## 5. Complete Page Hierarchy

```
App
├─ RootLayout                     (Header, Footer, <Outlet/>)
│  ├─ HomePage                    (/)
│  │  ├─ IdentityRail             (desktop/laptop only)
│  │  ├─ HeroCollage
│  │  │  ├─ PortraitPlaceholder
│  │  │  ├─ FeaturedProjectCard
│  │  │  └─ WideWorkBand
│  │  ├─ IntroBlock               (name, bio, contact links, CTA buttons)
│  │  ├─ StackGrid                (tool/technology chips)
│  │  ├─ AboutSection
│  │  └─ ProjectsTable            (preview variant, links to /portfolio#slug)
│  └─ PortfolioPage                (/portfolio)
│     ├─ PortfolioHero            ("Work" → "Portfolio" title + helper text)
│     ├─ ProjectCardGallery       (jump-link cards)
│     └─ CaseStudySection[]       (one per project, id=slug)
│        ├─ CaseStudyHeader       (index, title, hero image)
│        ├─ CaseStudyOverviewGrid (Overview/Role/Problem/Solution/Outcome rows)
│        └─ ProjectResources      (shared component, §11)
└─ NotFoundPage
```

## 6. Responsive Strategy

Breakpoints (from approved wireframes, mobile-first in implementation even though wireframes are documented desktop-first):

| Token | Width | Behavior summary |
|---|---|---|
| `mobile` | 0–767px | Single column everywhere. Hamburger nav. Hero stacks: portrait → featured card → wide band. CTA buttons full-width, stacked. Stack grid wraps ~5/row. Projects table → **one card per project** (2-col resource grid inside each card). Project Resources block → 2-col grid. |
| `tablet` | 768–1023px | Identity rail collapses to a top bar (monogram left, nav + hamburger right). Hero collage stays 2-up. CTA buttons 50/50. Projects table condenses: 5 resource columns collapse into **one wrapped icon group** column (`PROJECT · STATUS · RESOURCES`). Project Resources block wraps via `flex-wrap` at ~40% basis. |
| `laptop` | 1024–1439px | Full vertical identity rail returns. Full 7-column projects table (Project, Status, Case Study, UX Research, UI Mockups, MVP, GitHub). Project Resources block is a single 5-col row. |
| `desktop` | ≥1440px | Same structure as laptop with generous max-width container (1440px design width) and larger type scale. |

Implementation rule: **no separate mobile/desktop component trees.** Every component listed in §5 is a single implementation that reflows via CSS Grid/Flexbox `grid-template-columns` changes at the breakpoints above (container queries preferred where the component's layout depends on its own width, e.g. `ProjectsTable`, `ProjectResources`; viewport media queries for page-level chrome like `IdentityRail`/`Header`).

`ProjectsTable` and `ProjectResources` each need exactly **3 layout states** (row → wrapped-icons/wrap → cards|2-col-grid), not 4 — laptop and desktop share one state, tablet is its own, mobile is its own. Encode this as `table | condensed | cards` and `row | wrap | grid` variants respectively, selected by a resize observer or CSS container query, not JS breakpoint polling.

## 7. React Application Architecture

- **Framework**: React 18+, Vite build tooling, React Router v6 (data router / `createBrowserRouter`).
- **Styling**: CSS Modules or vanilla-extract/styled-components — pick one and apply consistently; all values pull from the design-token module (§13), never hardcoded hex/px in components. (This spec does not mandate a specific CSS-in-JS library; it mandates that no component hardcodes a token value.)
- **State management**: No global state library needed. This is a static content site — project/profile data is local JSON/TS modules (§16), no server state, no auth. React Context only for theme tokens if runtime theming is ever needed (not required for MVP).
- **Data fetching**: None at runtime for MVP — all content is static, bundled at build time from typed data modules. Architecture must not preclude swapping static modules for a CMS fetch later (see §20) — so components receive data via props/hooks from a small `data/` access layer, never import JSON directly inside presentational components.
- **Rendering**: Static site (Vite build → static hosting) is sufficient; SSR is not required unless SEO testing later shows a need (see §18 for how to keep that option open).

## 8. React Folder Structure

```
src/
├─ main.tsx
├─ App.tsx                       # router setup
├─ routes/
│  ├─ HomePage/
│  │  ├─ HomePage.tsx
│  │  ├─ IdentityRail.tsx
│  │  ├─ HeroCollage.tsx
│  │  ├─ IntroBlock.tsx
│  │  └─ HomePage.module.css
│  ├─ PortfolioPage/
│  │  ├─ PortfolioPage.tsx
│  │  ├─ PortfolioHero.tsx
│  │  ├─ ProjectCardGallery.tsx
│  │  ├─ CaseStudySection.tsx
│  │  └─ PortfolioPage.module.css
│  ├─ DearDiaryPage/             # scaffold only, not routed — see §19
│  └─ NotFoundPage/
├─ components/                   # shared, reusable across ≥2 routes
│  ├─ layout/
│  │  ├─ RootLayout.tsx
│  │  ├─ Header.tsx
│  │  └─ Footer.tsx
│  ├─ nav/
│  │  ├─ NavLinks.tsx            # renders from navConfig, used by Header + IdentityRail
│  │  └─ navConfig.ts
│  ├─ project/
│  │  ├─ ProjectsTable.tsx       # table|condensed|cards variants
│  │  ├─ ProjectStatusBadge.tsx
│  │  ├─ ProjectResources.tsx    # row|wrap|grid variants
│  │  └─ StackGrid.tsx
│  ├─ ui/
│  │  ├─ Button.tsx              # primary/outline variants (View Portfolio, Résumé, etc.)
│  │  ├─ SectionLabel.tsx        # the small-caps mono "ABOUT" / "SELECTED PROJECTS" eyebrow
│  │  ├─ ImagePlaceholder.tsx    # striped placeholder + label, until real assets land
│  │  └─ Divider.tsx
│  └─ ImageSlot.tsx              # thin wrapper once real images replace placeholders
├─ data/
│  ├─ projects.ts                # typed project records (single source for Home + Portfolio)
│  ├─ profile.ts                 # name, bio, social links, résumé URL
│  └─ stack.ts                   # tools/technologies list
├─ tokens/
│  ├─ colors.ts                  # generated from Color Foundation — §13
│  ├─ typography.ts              # font stacks, scale — §15
│  └─ spacing.ts                 # §14
├─ hooks/
│  ├─ useContainerBreakpoint.ts  # table/resources layout-state hook
│  └─ useScrollToHash.ts         # Portfolio anchor scroll
└─ assets/
   └─ resume.pdf
```

Rule of thumb for `components/` vs route-local files: a component graduates to `components/` the moment a second route needs it, or it appears ≥4 times on one page (design-system rule). `ProjectsTable`, `ProjectResources`, `StackGrid`, `Button`, and nav pieces qualify immediately because Home and Portfolio both use project/résumé/nav UI.

## 9. Shared Layouts

- **`RootLayout`**: wraps every route. Renders `Header` (top nav — used as-is on Portfolio and mobile/tablet Home) or nothing extra on desktop/laptop Home where `IdentityRail` replaces top nav visually (Header still mounts for a11y/routing but is visually the rail below `1024px`... see note below), then `<Outlet/>`, then `Footer` (dark `brand-900` panel per Color Foundation §06 "Footer" component).
- **Home's `IdentityRail` is a layout variant, not a separate layout.** At ≥1024px `RootLayout` renders `IdentityRail` instead of the standard `Header` for the Home route only (pass a `variant="rail" | "bar"` prop, chosen by route + breakpoint); below 1024px and on every other route, `Header` (top bar + hamburger under 768px) is used. This keeps one nav data source (`navConfig.ts`) driving two presentational shells.
- **`Footer`**: identical across all routes — name, tagline, secondary nav links, contact — dark surface per design system.

## 10. React Component Hierarchy

See §5 for the page-level tree. Leaf-level shared components and their consumers:

| Component | Used by | Notes |
|---|---|---|
| `Button` | IntroBlock (View Portfolio, Résumé), PortfolioHero, ProjectResources tiles | variants: `primary` (filled, `brand.primary`/ink per design system "Primary" button), `outline` (Résumé), `tile` (resource card) |
| `SectionLabel` | About, Stack, Selected Projects, Overview rows, Project Resources | the recurring `11px mono, letter-spacing .08em, color text.muted` eyebrow label |
| `ProjectStatusBadge` | ProjectsTable, ProjectCardGallery (optional), CaseStudyHeader | pill: Shipped / In progress / Concept — maps to functional tokens (§13) |
| `ProjectResources` | CaseStudySection (Portfolio), standalone reference block | row/wrap/grid layout variants (§6); 5 fixed slots: Case Study, UX Research, UI Mockups, MVP, GitHub; renders "—" empty state when a project lacks a resource |
| `ProjectsTable` | HomePage (preview), (Portfolio does NOT use this — Portfolio uses full `CaseStudySection` list, not a table) | table/condensed/cards variants |
| `StackGrid` | HomePage only | circular tool badges + label, wraps at all sizes |
| `ImagePlaceholder` | HeroCollage, CaseStudyHeader, PortfolioHero cards | striped SVG/CSS pattern + monospace caption (e.g. `[ portrait ]`) until real assets are supplied — never hand-drawn illustrative SVG |
| `NavLinks` | Header, IdentityRail | renders from `navConfig.ts` |

## 11. Reusable Component Inventory

Definitive list of components that must be built as standalone, prop-driven, reusable units (no route-specific hardcoding inside them):

1. `Button` (variant, size, href|onClick, external?)
2. `NavLinks` (items, orientation: horizontal|vertical, activePath)
3. `ProjectStatusBadge` (status: 'shipped'|'in-progress'|'concept')
4. `ProjectResources` (resources: ResourceLink[5], layout: row|wrap|grid — or auto via container query)
5. `ProjectsTable` (projects: Project[], variant: table|condensed|cards)
6. `StackGrid` (tools: Tool[])
7. `SectionLabel` (children, align?)
8. `ImagePlaceholder` (label, aspect|height)
9. `Divider` (spacing tokens only, no visual variants needed)
10. `Header` / `IdentityRail` (two shells, one nav data source)
11. `Footer`

## 12. Component Relationships

- `HomePage` and `PortfolioPage` both consume `data/projects.ts` — never fetch or hardcode project copy per-page. This guarantees Home's preview table and Portfolio's case studies never drift out of sync.
- `ProjectResources` is rendered **once per project** inside `CaseStudySection` on Portfolio; it is *not* rendered on Home (Home's table has its own compact resource-icon cells, which are a display mode of `ProjectsTable`, not a reuse of `ProjectResources`).
- `ProjectStatusBadge` is shared between `ProjectsTable` rows/cards and `CaseStudySection` headers.
- `Button` is the only interactive-affordance primitive; every CTA, résumé link, and resource tile is a `Button` variant — no bespoke button markup anywhere else.
- `navConfig.ts` is the single array `[{label, path, external?}]` (currently `Home, Portfolio, Résumé ↗`) consumed by both `Header` and `IdentityRail`; adding "Dear Diary" later is appending one object to this array (§19).

## 13. Design Token Usage

Tokens are sourced verbatim from the approved Color Foundation and must be implemented as a single exported token module (`tokens/colors.ts`) — components reference **semantic names only**, never raw hex.

```ts
export const color = {
  bg: { paper: '#FBFAF6', surface: '#FFFFFF', warm: '#F2EFDF', beige: '#F2DAC4' },
  brand: { primary: '#8D9FA6', light: '#A4BFBA', hover: '#7B9098', active: '#687C83', 900: '#2F383C' },
  accent: { gold: '#F2CB57', light: '#F6DE97', soft: '#F8E8B9', hover: '#E0B63E', active: '#C49A2C' },
  text: { primary: '#403636', secondary: '#6F6966', muted: '#A6A19D', inverse: '#FFFFFF' },
  border: { base: '#E5E0D6', divider: '#ECE8DF', strong: '#CFC8BB' },
  functional: { success: '#8FB89A', warning: '#E5B64A', error: '#F29991', info: '#8D9FA6', disabled: '#D8D3C8' },
  focusRing: 'rgba(141,159,166,.45)',
  overlay: 'rgba(64,54,54,.45)',
};
```

Usage rules carried over from the design system (§01/§07 of Color Foundation):
- Brand and accent are capped to ~4% and ~2% of any screen respectively — reserve for primary actions, active nav, focus rings, and the résumé/CTA buttons.
- Never place white text on `brand.primary` (contrast ≈2.1:1, fails). Use `text.inverse` only on `brand.900` or on `text.primary`/ink surfaces.
- Never use `text.muted` for paragraph or body copy — decorative/large text only.
- `Ink on Gold` (`text.primary` on `accent.gold`) is the only correct accent-surface text pairing.

Note: the wireframes render everything in **grayscale** (structure-only, "NOT VISUAL DESIGN" per their own header) — the grayscale in the wireframe file is placeholder ink, not a token. Visual implementation uses the Color Foundation palette above, mapped onto the wireframe's structure.

## 14. Grid & Spacing System

Derived from the approved wireframe's consistent rhythm (converted to an 4px-based spacing scale for implementation, since the wireframe itself used ad-hoc px values at 2x-scale artboards):

```
space-1: 4px   space-2: 8px   space-3: 12px   space-4: 16px
space-5: 20px  space-6: 24px  space-7: 28px   space-8: 32px
space-10: 40px space-12: 48px space-16: 64px  space-20: 80px
```

- Page content max-width: **1180px** (matches Color Foundation's own container width) centered, with 40px horizontal gutters below 1280px and 64–80px above.
- Card/panel border-radius: `4–5px` for content cards and table containers (wireframe used 3–5px consistently), `6–10px` for buttons/chips, `999px` for pills/badges, `50%` for circular avatars/tool badges.
- Section vertical rhythm: `72px` top/bottom padding between major sections on desktop (matches Color Foundation section spacing), collapsing to `40–48px` at mobile.
- Divider hairlines: `1px solid border.divider` between stacked sections (About/Stack/Projects), never a heavier rule except the `2px` accent rule under Portfolio's hero (`brand`-colored, per wireframe) and the `1.5px` outline on buttons.
- Grid columns: `ProjectsTable` desktop = `1.6fr 1fr 0.8fr 0.85fr 0.85fr 0.6fr 0.7fr` (7 cols); tablet condensed = `1.4fr 0.9fr 1.7fr` (3 cols, last is a wrapped icon cluster); mobile = single-column stacked cards with an internal `1fr 1fr` resource grid (last cell — GitHub — spans both columns).
- `ProjectResources` desktop = `repeat(5, 1fr)` row; tablet = `flex-wrap` at `1 1 40%` basis; mobile = `1fr 1fr` grid with the final (GitHub) tile spanning `grid-column: 1 / -1`.

## 15. Typography Hierarchy

Per explicit instruction: **headings use Cormorant Garamond, body & UI use Inter.** This supersedes the wireframe's placeholder `system-ui`/Georgia stacks — apply the following mapping:

```ts
export const font = {
  heading: `'Cormorant Garamond', Georgia, serif`,
  body: `'Inter', system-ui, -apple-system, sans-serif`,
};
```

| Role | Font | Wireframe reference size (desktop) | Weight |
|---|---|---|---|
| Hero name / page H1 (Home name, "Portfolio" title, case-study title) | Cormorant Garamond | 30–52px, 1.05–1.16 line-height | 600–700 |
| Section H2 (case-study project titles) | Cormorant Garamond | 24–36px | 600–700 |
| Eyebrow / overline labels (`ABOUT`, `SELECTED PROJECTS`, `PROJECT 01`) | Inter, mono-styled via letterSpacing (do **not** use a monospace font family in production — the wireframe's `ui-monospace` was a wireframe-only affordance to signal "structural label"; production uses Inter, uppercase, `600` weight, `.08–.12em` letter-spacing, `11–13px`) | 11–13px | 600 |
| Body copy (bio, about paragraphs, case-study copy) | Inter | 13–17px, line-height 1.6–1.75 | 400–500 |
| UI text (nav, buttons, table cells, badges) | Inter | 11–14px | 500–600 |
| Table headers | Inter, uppercase, letter-spacing .04–.06em | 8–11px | 600 |

Rationale for dropping the wireframe's `ui-monospace` in production: the wireframe used monospace purely as an annotation convention to mark "this is a structural label, not real content" (see its own header: "LOW-FIDELITY · GRAYSCALE · STRUCTURE ONLY"). The approved typography brief specifies exactly two families; monospace is not one of them, so eyebrow labels get their distinctive look from letter-spacing/case/weight on Inter instead.

Load both families via a font-loading strategy that avoids layout shift (e.g. `font-display: swap` + self-hosted `woff2`, subset to used weights: Cormorant Garamond 600/700, Inter 400/500/600/700).

## 16. Content Structure Per Page

### Home
```ts
type HomeContent = {
  identity: { monogram: string; socials: { icon: string; href: string }[] };
  hero: {
    portraitAlt: string;                  // real asset replaces ImagePlaceholder
    featured: { label: 'Featured Project'; title: string; kicker: string; slug: string };
    wideWork: { imageAlt: string };
  };
  profile: { name: string; bio: string; email: string; linkedin: string; resumeUrl: string };
  stack: Tool[];                           // data/stack.ts
  about: { paragraphs: string[] };
  projects: Project[];                     // data/projects.ts, same source as Portfolio
};
```

### Portfolio
```ts
type PortfolioContent = {
  heading: 'Portfolio';                    // wireframe said "Work" — replaced per approved decision
  helperText: string;                      // "Click a card to jump to its case study ↓"
  projects: Project[];                     // full case studies, same data source as Home
};

type Project = {
  slug: string;                            // '#social-radar' → route anchor id 'social-radar'
  title: string;
  status: 'shipped' | 'in-progress' | 'concept';
  cover: { imageAlt: string };
  overview: string;
  role: string;
  problem: string;
  solution: string;
  solutionMedia?: { imageAlt: string };
  outcome: string;
  resources: {
    caseStudy?: { label: string; href: string };   // Notion
    uxResearch?: { label: string; href: string };  // Miro
    uiMockups?: { label: string; href: string };   // Figma
    mvp?: { label: string; href: string };         // live app
    github?: { label: string; href: string };      // repo
  };
};
```

Empty-state rule (from wireframe legend "— = empty state, not available yet"): any missing `resources.*` key renders a disabled/dashed tile with an em-dash, not a broken link — same treatment in `ProjectsTable` cells and `ProjectResources` tiles.

Seed project set (from wireframes, to be replaced with real content): Social Radar (shipped, full resources), BioQuest (in progress, missing Case Study + MVP), DocAssistant (shipped, missing UX Research), MedTech (concept, only UX Research present).

## 17. Accessibility Requirements

- Semantic landmarks: `<header>`, `<nav aria-label="Primary">`, `<main>`, `<footer>` on every route.
- All `ImagePlaceholder` instances require meaningful `alt` text once real assets replace them; while placeholders exist, mark them `alt=""` with `aria-hidden="true"` if purely decorative, or a real descriptive `alt` if content-bearing (portrait, project screenshots).
- Color contrast: enforce the pairings validated in Color Foundation §07 — body text uses `text.primary` on `bg.paper` (≈9.6:1), never `text.muted` for body copy (≈2.3:1, fails), never white on `brand.primary` (≈2.1:1, fails) — use `brand.700`/`#55666C` or ink instead.
- Focus states: every interactive element (`Button`, nav links, table row links, resource tiles) gets a visible focus ring using `color.focusRing` (`rgba(141,159,166,.45)`, 3px), never `outline: none` without replacement.
- Hamburger menu (mobile/tablet `Header`): must be a real `<button aria-expanded aria-controls>` toggling a `<nav>` panel, keyboard-operable and closeable with `Escape`.
- Table→card responsive transforms must preserve reading order and equivalent information at every breakpoint — verify with a screen reader pass per breakpoint before ship.
- Anchor scrolling (`useScrollToHash`) must respect `prefers-reduced-motion` (skip smooth-scroll animation, jump instantly).
- Minimum tap target 44×44px for all resource tiles, nav items, and buttons on touch breakpoints (mobile tiles in the wireframe are 44–48px tall already — preserve this, do not shrink for density).

## 18. SEO Structure

- Static per-route `<title>` / meta description: Home → "{Name} — Product Designer"; Portfolio → "{Name} — Portfolio"; each case-study anchor is not a separate document, so it does not get its own `<title>`, but each `CaseStudySection` should carry a heading (`<h2>`) matching its project title for in-page outline/SEO value.
- One `<h1>` per route (Home: the name/hero headline; Portfolio: "Portfolio").
- Open Graph + Twitter card meta tags per route, with a static share image per project (or one site-wide OG image at minimum for MVP).
- `sitemap.xml` listing `/` and `/portfolio` (add `/dear-diary` when that route ships, §19).
- Since this ships as a static Vite build, ensure the build outputs fully static HTML per route (prerendering) rather than a client-only SPA shell, so crawlers see content without executing JS — evaluate `vite-plugin-ssg` or equivalent at implementation time if server rendering wasn't otherwise chosen.
- Résumé link: since it opens a PDF in a new tab, ensure the PDF itself has proper metadata (title, author) — it is a discoverable, indexable asset.

## 19. Development Roadmap

**Phase 0 — Foundation**
Token modules (§13–15), `Button`, `SectionLabel`, `Divider`, `ImagePlaceholder`, folder scaffold (§8), routing shell with both routes stubbed.

**Phase 1 — Home**
`Header`/`IdentityRail` shells + `navConfig`, `HeroCollage`, `IntroBlock`, `StackGrid`, About section, `ProjectsTable` (all 3 variants), `Footer`.

**Phase 2 — Portfolio**
`PortfolioHero`, `ProjectCardGallery`, `CaseStudySection` × project data, `ProjectResources` (all 3 variants), anchor-scroll behavior.

**Phase 3 — Content & Polish**
Real copy/imagery replacing all `ImagePlaceholder` instances; résumé PDF wired; a11y pass per §17; SEO metadata per §18; responsive QA across all 4 breakpoints on both routes.

**Phase 4 — Future expansion (not in MVP scope, architecture reserved for it)**
- **Dear Diary** (`/dear-diary`): add the route, add one entry to `navConfig.ts`, build `DearDiaryPage` reusing `SectionLabel`/`Divider`/`ImagePlaceholder` but with its own typographic mood (serif-forward, narrower reading column, pull-quotes, dated entry index — per the wireframe's "Mood Shift" notes) — no other page needs to change. The folder scaffold in §8 already reserves `routes/DearDiaryPage/` for this.
- CMS-backed content: swap `data/projects.ts` / `data/profile.ts` static modules for a fetch-backed data layer behind the same access-layer interface (§7) without touching presentational components.
- Case-study-specific dedicated URLs (`/portfolio/social-radar` instead of an in-page anchor) if case studies grow long enough to warrant their own document/SEO entry — the `Project.slug` field already supports this migration.

## 20. Recommended Implementation Order

1. Design tokens + typography loading (blocks everything visually).
2. `Button`, `SectionLabel`, `ImagePlaceholder`, `Divider`, `navConfig` + `NavLinks`.
3. `RootLayout` with `Header`/`Footer` wired to real routes (both pages render empty/stub content, confirming routing + layout shell + responsive nav collapse work first).
4. `ProjectStatusBadge`, `ProjectResources`, `ProjectsTable` — build these as isolated, data-driven components (e.g. in Storybook or an isolated harness) before wiring them into pages, since they carry the most responsive-variant complexity.
5. Home page: assemble `IdentityRail`/`HeroCollage`/`IntroBlock`/`StackGrid`/About/`ProjectsTable` in order top-to-bottom.
6. Portfolio page: `PortfolioHero` + `ProjectCardGallery`, then `CaseStudySection` (which consumes the already-built `ProjectResources`).
7. Anchor-scroll wiring + `prefers-reduced-motion` handling.
8. Accessibility pass (§17) and SEO metadata (§18) — do this before content freeze, not after, so heading structure/alt text are validated against real copy once it lands.
9. Responsive QA sweep at exactly the 4 documented breakpoints (390/768/1024–1280/1440) on both routes.
10. Swap all placeholders for real assets/copy; final visual QA against Color Foundation contrast rules.

---

*This document intentionally excludes React code — per instruction, implementation begins only after this architecture is reviewed and approved.*
