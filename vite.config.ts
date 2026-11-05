import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const SITE = 'https://vera-bakerava-portfolio.vercel.app';

// Telegram, LinkedIn etc. build link previews from the raw HTML without
// running JavaScript — so /portfolio gets its own copy of index.html with its
// own title, description and URL (served via vercel.json).
function portfolioPage(): Plugin {
  return {
    name: 'portfolio-page',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      // Skip when another plugin has already written the page.
      if (index?.type !== 'asset' || bundle['portfolio/index.html']) return;
      const title = 'Portfolio and case studies — Vera Bakerava';
      const description =
        'Product design case studies: EdTech, FinTech, SaaS, AI bots and websites — problem, solution, metrics, Figma mockups, prototypes and MVPs.';
      const source = String(index.source)
        .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
        .replace(
          /(<meta\s+(?:name="description"|property="og:description"|name="twitter:description")\s+content=")[^"]*"/g,
          `$1${description}"`,
        )
        .replace(/(<meta\s+(?:property="og:title"|name="twitter:title")\s+content=")[^"]*"/g, `$1${title}"`)
        .replace(/(<meta\s+property="og:url"\s+content=")[^"]*"/, `$1${SITE}/portfolio"`)
        .replace(/<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${SITE}/portfolio" />`);
      this.emitFile({ type: 'asset', fileName: 'portfolio/index.html', source });
    },
  };
}

export default defineConfig({
  plugins: [react(), portfolioPage()],
});
