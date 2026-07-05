// name, bio, social links, résumé URL — the profile slice of HomeContent (ARCHITECTURE.md §16).
export type Profile = {
  name: string;
  bio: string;
  email: string;
  linkedin: string;
  resumeUrl: string;
  about: { paragraphs: string[] };
};

// name is real; bio/email/linkedin/about remain the wireframe's own seed
// placeholder copy (Home (A) — desktop breakpoint intro strip) pending real
// contact details and copy in Phase 3 (ARCHITECTURE.md §19).
export const profile: Profile = {
  name: 'Vera Bakerava',
  bio: 'Short bio — one or two calm, specific lines on who you are and what you build.',
  email: 'hello@yourname.com',
  linkedin: 'https://linkedin.com/in/yourname',
  resumeUrl: '/resume.pdf',
  about: {
    paragraphs: ['Placeholder about paragraph — real content lands in Phase 3.'],
  },
};
