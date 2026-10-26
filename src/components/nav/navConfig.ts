import type { Translations } from '../../i18n/translations';

export type NavItem = {
  // Key into the active locale's `nav` translations.
  labelKey: keyof Translations['nav'];
  path: string;
  external?: boolean;
  // Opens the résumé preview modal instead of navigating — see ResumeModalContext.
  action?: 'resumeModal';
};

// Per ARCHITECTURE.md §3: "Dear Diary" is intentionally omitted from the MVP nav —
// re-adding it later is appending one object to this array.
export const navConfig: NavItem[] = [
  { labelKey: 'home', path: '/' },
  { labelKey: 'portfolio', path: '/portfolio' },
  { labelKey: 'resume', path: '/resume.pdf', external: true, action: 'resumeModal' },
];
