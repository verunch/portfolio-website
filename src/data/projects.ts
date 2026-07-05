// Typed project records — single source for Home's Selected Projects preview
// and Portfolio's case studies (ARCHITECTURE.md §16). Not yet consumed by any
// component; ProjectsTable (Milestone 3) and CaseStudySection (Milestone 6)
// wire this in later.
export type ProjectStatus = 'shipped' | 'in-progress' | 'concept';

export type ProjectResourceLink = {
  label: string;
  href: string;
};

export type ProjectResources = {
  caseStudy?: ProjectResourceLink;
  uxResearch?: ProjectResourceLink;
  uiMockups?: ProjectResourceLink;
  mvp?: ProjectResourceLink;
  github?: ProjectResourceLink;
};

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  cover: { imageAlt: string };
  overview: string;
  role: string;
  problem: string;
  solution: string;
  solutionMedia?: { imageAlt: string };
  outcome: string;
  resources: ProjectResources;
};

// Seed set per ARCHITECTURE.md §16, with the seed-set correction from
// docs/architecture/DECISIONS.md (Ascendra replaces MedTech; DocAssistant
// confirmed shipped). Placeholder copy — real content lands in Phase 3 (§19).
// Missing resource keys are intentional: they render the em-dash empty state
// (§16) in ProjectsTable / ProjectResources once those components exist.
export const projects: Project[] = [
  {
    slug: 'social-radar',
    title: 'Social Radar',
    status: 'shipped',
    cover: { imageAlt: 'Social Radar cover' },
    overview: 'Placeholder overview — real content lands in Phase 3.',
    role: 'Placeholder role.',
    problem: 'Placeholder problem statement.',
    solution: 'Placeholder solution summary.',
    solutionMedia: { imageAlt: 'Social Radar solution screens' },
    outcome: 'Placeholder outcome summary.',
    resources: {
      caseStudy: { label: 'Case Study', href: '#' },
      uxResearch: { label: 'UX Research', href: '#' },
      uiMockups: { label: 'UI Mockups', href: '#' },
      mvp: { label: 'MVP', href: '#' },
      github: { label: 'GitHub', href: '#' },
    },
  },
  {
    slug: 'bioquest',
    title: 'BioQuest',
    status: 'in-progress',
    cover: { imageAlt: 'BioQuest cover' },
    overview: 'Placeholder overview — real content lands in Phase 3.',
    role: 'Placeholder role.',
    problem: 'Placeholder problem statement.',
    solution: 'Placeholder solution summary.',
    outcome: 'Placeholder outcome summary.',
    resources: {
      uxResearch: { label: 'UX Research', href: '#' },
      uiMockups: { label: 'UI Mockups', href: '#' },
      github: { label: 'GitHub', href: '#' },
    },
  },
  {
    slug: 'docassistant',
    title: 'DocAssistant',
    status: 'shipped',
    cover: { imageAlt: 'DocAssistant cover' },
    overview: 'Placeholder overview — real content lands in Phase 3.',
    role: 'Placeholder role.',
    problem: 'Placeholder problem statement.',
    solution: 'Placeholder solution summary.',
    solutionMedia: { imageAlt: 'DocAssistant solution screens' },
    outcome: 'Placeholder outcome summary.',
    resources: {
      caseStudy: { label: 'Case Study', href: '#' },
      uiMockups: { label: 'UI Mockups', href: '#' },
      mvp: { label: 'MVP', href: '#' },
      github: { label: 'GitHub', href: '#' },
    },
  },
  {
    slug: 'ascendra',
    title: 'Ascendra',
    status: 'concept',
    cover: { imageAlt: 'Ascendra cover' },
    overview: 'Placeholder overview — real content lands in Phase 3.',
    role: 'Placeholder role.',
    problem: 'Placeholder problem statement.',
    solution: 'Placeholder solution summary.',
    outcome: 'Placeholder outcome summary.',
    resources: {
      uxResearch: { label: 'UX Research', href: '#' },
    },
  },
];
