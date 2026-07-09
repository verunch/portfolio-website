// Font stacks and type scale per ARCHITECTURE.md §15.
// Headings use Cormorant Garamond, body/UI use Inter — this supersedes the wireframe's
// placeholder system-ui/monospace stacks per explicit approved instruction.
export const font = {
  heading: `'Cormorant Garamond', Georgia, serif`,
  body: `'Inter', system-ui, -apple-system, sans-serif`,
  editorial: `'IBM Plex Sans', 'Inter', system-ui, -apple-system, sans-serif`,
} as const;

export const type = {
  h1: { fontFamily: font.heading, fontWeight: 700, lineHeight: 1.1 },
  h2: { fontFamily: font.heading, fontWeight: 600, lineHeight: 1.2 },
  eyebrow: {
    fontFamily: font.body,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  body: { fontFamily: font.body, fontWeight: 400, lineHeight: 1.7 },
  ui: { fontFamily: font.body, fontWeight: 600, lineHeight: 1.4 },
  tableHeader: {
    fontFamily: font.body,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
} as const;
