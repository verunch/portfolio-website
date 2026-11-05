# Flow log

Decisions and the reasoning behind them, newest first.

## 2026-11-05 — Link previews (Open Graph) match the first screen

**Problem.** The Telegram preview showed an old cover ("Vera Bakerava · Product Designer · UX/UI · AI · SaaS ·
MedTech · EdTech · From idea to MVP") and a description that didn't match anything on the site. Messengers read
the preview from the raw HTML and never run JavaScript, so the language switcher has no effect on it.

**Decisions.**

- The preview stays in English (the default language of `/`), but its text is now taken from the English first
  screen: title "Vera Bakerava — Product Designer" (role + name, as in the hero), description = hero bio +
  services line.
- New image `public/og-image-en.jpg` (1200×630, ~90 KB) in the hero style: portrait on the left, warm panel on the
  right with "Product Designer", "VERA BAKERAVA" and "AI · SaaS · FinTech · MedTech · EdTech". Fonts and colors from
  the design system (Cormorant Garamond / Inter / IBM Plex Sans, `#f2efdf`, `#403636`, `#55666c`). New file name
  instead of overwriting `og-image.jpg`, so caches can't serve the old picture; the old file is removed.
- `/portfolio` gets its own static HTML with its own title, description, og:url and canonical (`portfolioPage`
  plugin in `vite.config.ts`, rewrite in `vercel.json`). Before, every URL got the home page's tags, with og:url
  pointing to `/`.
- Tags are in the HTML source, not added by a script — checked with `curl … | grep og:` after deploy.
- `t.meta.title` in all three languages now matches the hero role ("Product Designer" / "продуктовый дизайнер" /
  "прадуктовы дызайнер") instead of "Product & UX/UI Designer", so the tab title and the preview say the same.
- A Russian version of the image (`public/og-image-ru.jpg`) is kept locally, not deployed, for the future `/ru`
  pages.

**After deploy.** Refresh the Telegram cache via @WebpageBot (and LinkedIn Post Inspector).
