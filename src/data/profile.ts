// name, bio, social links, résumé URL — the profile slice of HomeContent (ARCHITECTURE.md §16).
export type Profile = {
  name: string;
  bio: string;
  email: string;
  linkedin: string;
  resumeUrl: string;
};

// Placeholder copy carried over verbatim from the approved wireframe's own seed
// text (Home (A) — desktop breakpoint intro strip) — not invented. Real content
// lands in Phase 3 (ARCHITECTURE.md §19).
export const profile: Profile = {
  name: 'Your Name',
  bio: 'Short bio — one or two calm, specific lines on who you are and what you build.',
  email: 'hello@yourname.com',
  linkedin: 'https://linkedin.com/in/yourname',
  resumeUrl: '/resume.pdf',
};
