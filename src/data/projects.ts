import docAssistantCover from '../../assets/images/docassistant.png';
import ascendraCover from '../../assets/images/cloud_workspace.webp';
import ascendraDetailCover from '../../assets/images/cloud_workspace_desc.png';
import socialRadarCover from '../../assets/images/social_radar.webp';
import bioQuestCover from '../../assets/images/bioquest.webp';
import docAssistantMascot from '../../assets/images/mascot-floating-v2.html?url';
import docAssistantMascotGallery from '../../assets/images/mascot-floating-v2-gallery.html?url';

// Typed project records — single source for Home's Selected Projects preview
// and Portfolio's case studies (ARCHITECTURE.md §16).
export type ProjectStatus = 'ready' | 'coming-soon' | 'mvp-coming-soon';

export type ProjectResourceLink = {
  label: string;
  href: string;
  // Visually prominent (accent) tile style — set for one resource per
  // project at most, per product decision.
  accent?: boolean;
};

export type ProjectResources = {
  caseStudy?: ProjectResourceLink;
  uxResearch?: ProjectResourceLink;
  uiMockups?: ProjectResourceLink;
  mvp?: ProjectResourceLink;
  // Home Projects Table only — never rendered on Portfolio case study pages.
  landingPage?: ProjectResourceLink;
  github?: ProjectResourceLink;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;
  cover: {
    src?: string;
    // Portfolio case-study (Project Description) cover only — overrides
    // `src` there when present; the Portfolio Gallery thumbnail always uses
    // `src`, never this.
    detailSrc?: string;
    // Portfolio case-study cover only (not the gallery thumbnail) — an
    // animated HTML embed that takes precedence over `src`/`detailSrc` there.
    embedUrl?: string;
    // Portfolio Gallery thumbnail only — overrides `embedUrl` there when
    // present (e.g. a size-tuned copy of the same animation).
    galleryEmbedUrl?: string;
    imageAlt: string;
  };
  overview: string;
  role: string;
  problem: string;
  solution: string;
  resources: ProjectResources;
  // false = Home Projects Table only, no dedicated Portfolio case study page.
  showOnPortfolioPage: boolean;
};

export const projects: Project[] = [
  {
    slug: 'docassistant',
    title: 'DocAssistant',
    category: 'AI SaaS',
    status: 'ready',
    cover: {
      src: docAssistantCover,
      embedUrl: docAssistantMascot,
      galleryEmbedUrl: docAssistantMascotGallery,
      imageAlt: 'DocAssistant cover',
    },
    overview:
      'A platform that enables companies to transform documents and knowledge bases into AI-powered customer assistants and embeddable website widgets. The product simplifies document management, chatbot configuration, testing, and publishing.',
    role: 'Product Designer — Product Discovery • UX/UI Design • Information Architecture • Design System • Landing Page • Frontend MVP',
    problem:
      'Companies often struggle to make internal documentation accessible and useful for customers without expensive custom chatbot implementations.',
    solution:
      'Designed an end-to-end workflow for uploading documents, building a knowledge base, testing AI responses, publishing website widgets, and managing projects through a streamlined dashboard.',
    resources: {
      caseStudy: {
        label: 'Case Study',
        href: 'https://app.notion.com/p/Embeddable-Chatbot-Builder-3850a2e6e1d780ae99bcf0501af7eed9?source=copy_link',
      },
      landingPage: { label: 'Landing Page', href: 'https://verunch.github.io/DocAssistant/' },
      mvp: {
        label: 'MVP',
        href: 'https://verunch.github.io/DocAssistant/chatBuilderApp.html',
        accent: true,
      },
      github: { label: 'GitHub', href: 'https://github.com/verunch/DocAssistant' },
    },
    showOnPortfolioPage: true,
  },
  {
    slug: 'ascendra',
    title: 'Ascendra Workspaces',
    category: 'Cloud Platform',
    status: 'ready',
    cover: { src: ascendraCover, detailSrc: ascendraDetailCover, imageAlt: 'Ascendra Workspaces cover' },
    overview:
      'A cloud workspace platform designed for developers and DevOps teams to provision, organize, and manage virtual environments through a clean and scalable interface.',
    role: 'Product Designer — UX/UI Design • Dashboard Design • Information Architecture • Design System • Frontend MVP',
    problem:
      'Cloud infrastructure tools often overwhelm users with complex interfaces and fragmented workflows, slowing down everyday operations.',
    solution:
      'Designed a modern workspace experience focused on clarity, scalable dashboards, simplified infrastructure management, and efficient navigation.',
    resources: {
      mvp: { label: 'MVP', href: 'https://verunch.github.io/ascendra-workspaces/' },
      github: { label: 'GitHub', href: 'https://github.com/verunch/ascendra-workspaces' },
    },
    showOnPortfolioPage: true,
  },
  {
    slug: 'social-radar',
    title: 'Social Radar',
    category: 'Social Product',
    status: 'mvp-coming-soon',
    cover: { src: socialRadarCover, imageAlt: 'Social Radar cover' },
    overview:
      'A proximity-based social discovery platform that helps people turn shared interests into meaningful real-world connections. The product combines reciprocal matching, privacy-first interaction, and thoughtful onboarding to encourage quality conversations instead of endless scrolling.',
    role: 'Product Designer — Product Strategy • UX Research • UX/UI Design • Design System • Interactive Prototype • Frontend MVP',
    problem:
      'Most social and dating platforms optimize for engagement rather than meaningful interaction, making it difficult to discover compatible people nearby without pressure or endless swiping.',
    solution:
      'Designed a product centered around reciprocal discovery, interest-based matching, privacy controls, and low-pressure interactions to help people connect naturally offline.',
    resources: {
      caseStudy: {
        label: 'Case Study',
        href: 'https://app.notion.com/p/Social-Radar-Product-Case-36c0a2e6e1d7800b902dfcbe6c2b1f76?source=copy_link',
      },
      uxResearch: {
        label: 'UX Research',
        href: 'https://miro.com/app/board/uXjVGiCuPHs=/?share_link_id=569653291730',
      },
      uiMockups: {
        label: 'UI Mockups',
        href: 'https://www.figma.com/design/u2KtBfGPatguAJuJBpzoHU/Social-Radar-App?node-id=3365-347&t=lHhFrJtYes4BXvev-1',
      },
    },
    showOnPortfolioPage: true,
  },
  {
    slug: 'bioquest',
    title: 'Bio Quest',
    category: 'EdTech',
    status: 'mvp-coming-soon',
    cover: { src: bioQuestCover, imageAlt: 'Bio Quest cover' },
    overview:
      'A mobile educational game that transforms biology learning into an interactive adventure. Students explore the cell through visual challenges, mini-games, and progression mechanics that improve understanding and long-term retention.',
    role: 'Product Designer — Product Strategy • Learning Experience Design • UX/UI Design • Game Mechanics • Design System • Frontend MVP',
    problem:
      'Traditional biology education relies heavily on memorization, making complex concepts difficult to understand, visualize, and retain.',
    solution:
      'Designed a gamified learning experience with exploration, visual associations, progression systems, achievements, and collaborative game modes that make learning engaging and memorable.',
    resources: {
      caseStudy: {
        label: 'Case Study',
        href: 'https://app.notion.com/p/Bio-Quest-Cell-Adventure-EdTech-Project-3700a2e6e1d7802baec9d444fcac6f8d?source=copy_link',
      },
      uxResearch: {
        label: 'UX Research',
        href: 'https://miro.com/app/board/uXjVHMdVl74=/?share_link_id=837831180391',
      },
      uiMockups: {
        label: 'UI Mockups',
        href: 'https://www.figma.com/design/vHrtUuymPJOj6lvPfEpp5i/Bio-Quest--Cell-Adventure?node-id=0-1&t=cAMUv4hAdPHS2fH8-1',
      },
    },
    showOnPortfolioPage: true,
  },
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    category: 'Portfolio',
    status: 'ready',
    cover: { imageAlt: 'Portfolio Website cover' },
    overview: 'Placeholder overview — real content lands in Phase 3.',
    role: 'Placeholder role.',
    problem: 'Placeholder problem statement.',
    solution: 'Placeholder solution summary.',
    resources: {
      github: { label: 'GitHub', href: 'https://github.com/verunch/portfolio-website' },
    },
    showOnPortfolioPage: false,
  },
  {
    slug: 'cell-culture-monitoring-workspace',
    title: 'Cell Culture Monitoring Workspace',
    category: 'MedTech',
    status: 'coming-soon',
    cover: { imageAlt: 'Cell Culture Monitoring Workspace cover' },
    overview:
      'A concept for a laboratory workspace that helps researchers monitor cell cultures, organize experiments, and centralize laboratory workflows in a single interface.',
    role: 'Product Designer — UX Research • Product Discovery • Information Architecture • UX/UI Design',
    problem:
      'Laboratory software is frequently fragmented across multiple systems, making experiment monitoring, documentation, and collaboration inefficient.',
    solution:
      'Designing a unified workspace that integrates experiment tracking, culture monitoring, laboratory documentation, and scientific workflows into a streamlined experience.',
    resources: {},
    showOnPortfolioPage: false,
  },
];
