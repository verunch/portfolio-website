export type NavItem = {
  label: string;
  path: string;
  external?: boolean;
};

// Per ARCHITECTURE.md §3: "Dear Diary" is intentionally omitted from the MVP nav —
// re-adding it later is appending one object to this array.
export const navConfig: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Résumé ↗', path: '/resume.pdf', external: true },
];
