// name, bio, social links, résumé URL — the profile slice of HomeContent (ARCHITECTURE.md §16).
export type Profile = {
  name: string;
  bio: string;
  email: string;
  linkedin: string;
  resumeUrl: string;
  about: { paragraphs: string[] };
};

export const profile: Profile = {
  name: 'Vera Bakerava',
  bio: 'Product Designer building thoughtful digital products from idea to MVP through UX/UI design and frontend implementation.',
  email: 'verbapho@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vera-bakerava-7a1022a1/',
  resumeUrl: '/resume.pdf',
  about: {
    paragraphs: [
      'I enjoy turning complex ideas into products people can actually use. My process combines product discovery, UX/UI design, design systems, and frontend implementation, allowing concepts to quickly become testable MVPs. I believe thoughtful design should not only look good but also make complex workflows feel simple and intuitive.',
    ],
  },
};
