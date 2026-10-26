import docAssistantCover from '../../assets/images/docassistant.png';
import ascendraCover from '../../assets/images/cloud_workspace.webp';
import ascendraDetailCover from '../../assets/images/ascendra_desc.webp';
import ascendraIllustration from '../../assets/images/ascendra_illustration.webp';
import socialRadarCover from '../../assets/images/social_radar.webp';
import bioQuestCover from '../../assets/images/bioquest.webp';
import productDesignerCover from '../../assets/images/product_designer_portfolio.webp';
import productDesignerDetailCover from '../../assets/images/product_designer_portfolio_desc.webp';
import motionDesignCover from '../../assets/images/motion_design_showcase.webp';
import motionDesignCardCover from '../../assets/images/motion_design_showcase_card.webp';
import photographerCover from '../../assets/images/photographer_portfolio.webp';
import photographerCardCover from '../../assets/images/photographer_portfolio_card.webp';
import docAssistantMascot from '../../assets/images/mascot-floating-v2.html?url';
import docAssistantMascotGallery from '../../assets/images/mascot-floating-v2-gallery.html?url';
import type { Localized } from '../i18n/locales';

// Typed project records — single source for Home's Selected Projects preview
// and Portfolio's case studies (ARCHITECTURE.md §16).
export type ProjectStatus = 'ready' | 'coming-soon' | 'mvp-coming-soon';

// Portfolio page subsection a case study is listed under.
export type ProjectGroup = 'saas' | 'showcase';

export type ProjectResourceLink = {
  href: string;
  // Visually prominent (accent) tile style — set for one resource per
  // project at most, per product decision.
  accent?: boolean;
  // Private resource: shown disabled with an "access on request" tooltip
  // instead of linking out (all GitHub repos, per product decision).
  onRequest?: boolean;
};

// Key order here doesn't matter — display order lives in ProjectsTable's
// RESOURCE_COLUMNS and ProjectResources' RESOURCE_META.
export type ProjectResources = {
  caseStudy?: ProjectResourceLink;
  uxResearch?: ProjectResourceLink;
  uiMockups?: ProjectResourceLink;
  mvp?: ProjectResourceLink;
  landingPage?: ProjectResourceLink;
  livePage?: ProjectResourceLink;
  website?: ProjectResourceLink;
  github?: ProjectResourceLink;
};

export type Project = {
  slug: string;
  title: Localized;
  category: string;
  status: ProjectStatus;
  group: ProjectGroup;
  cover: {
    src?: string;
    // Portfolio case-study (Project Description) cover only — overrides
    // `src` there when present; the Portfolio Gallery thumbnail always uses
    // `src`, never this.
    detailSrc?: string;
    // Portfolio case-study cover only — several images stacked as rows,
    // top to bottom; takes precedence over `detailSrc`/`src` there.
    detailStack?: string[];
    // Portfolio case-study cover only (not the gallery thumbnail) — an
    // animated HTML embed that takes precedence over `src`/`detailSrc` there.
    embedUrl?: string;
    // Portfolio Gallery thumbnail only — overrides `embedUrl` there when
    // present (e.g. a size-tuned copy of the same animation).
    galleryEmbedUrl?: string;
    imageAlt: Localized;
  };
  // Omitted text fields render a "description coming soon" placeholder.
  overview?: Localized;
  role?: Localized;
  problem?: Localized;
  solution?: Localized;
  // Optional extended case-study blocks, shown full-width below the
  // overview. When `product`/`design` are set and `solution` isn't, the
  // Solution field is dropped instead of showing a placeholder.
  product?: Localized<string[]>;
  design?: Localized<string[]>;
  metrics?: Localized;
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
    group: 'saas',
    cover: {
      src: docAssistantCover,
      embedUrl: docAssistantMascot,
      galleryEmbedUrl: docAssistantMascotGallery,
      imageAlt: {
        en: 'DocAssistant cover',
        ru: 'Обложка DocAssistant',
        be: 'Вокладка DocAssistant',
      },
    },
    overview: {
      en: 'A platform that enables companies to transform documents and knowledge bases into AI-powered customer assistants and embeddable website widgets. The product simplifies document management, chatbot configuration, testing, and publishing.',
      ru: 'Платформа, которая позволяет компаниям превращать документы и базы знаний в AI-ассистентов для клиентов и встраиваемые виджеты для сайта. Продукт упрощает управление документами, настройку чат-бота, тестирование и публикацию.',
      be: 'Платформа, якая дазваляе кампаніям ператвараць дакументы і базы ведаў у AI-асістэнтаў для кліентаў і ўбудаваныя віджэты для сайта. Прадукт спрашчае кіраванне дакументамі, наладу чат-бота, тэсціраванне і публікацыю.',
    },
    role: {
      en: 'Product Designer — Product Discovery • UX/UI Design • Information Architecture • Design System • Landing Page • Frontend MVP',
      ru: 'Продуктовый дизайнер — Product Discovery • UX/UI-дизайн • Информационная архитектура • Дизайн-система • Лендинг • Frontend MVP',
      be: 'Прадуктовы дызайнер — Product Discovery • UX/UI-дызайн • Інфармацыйная архітэктура • Дызайн-сістэма • Лэндынг • Frontend MVP',
    },
    problem: {
      en: 'Companies often struggle to make internal documentation accessible and useful for customers without expensive custom chatbot implementations.',
      ru: 'Компаниям часто сложно сделать внутреннюю документацию доступной и полезной для клиентов без дорогой разработки собственного чат-бота.',
      be: 'Кампаніям часта складана зрабіць унутраную дакументацыю даступнай і карыснай для кліентаў без дарагой распрацоўкі ўласнага чат-бота.',
    },
    solution: {
      en: 'Designed an end-to-end workflow for uploading documents, building a knowledge base, testing AI responses, publishing website widgets, and managing projects through a streamlined dashboard.',
      ru: 'Спроектировала сквозной сценарий: загрузка документов, создание базы знаний, тестирование ответов AI, публикация виджетов на сайте и управление проектами через удобный дашборд.',
      be: 'Спраектавала скразны сцэнар: загрузка дакументаў, стварэнне базы ведаў, тэсціраванне адказаў AI, публікацыя віджэтаў на сайце і кіраванне праектамі праз зручны дашборд.',
    },
    resources: {
      caseStudy: {
        href: 'https://app.notion.com/p/Embeddable-Chatbot-Builder-3850a2e6e1d780ae99bcf0501af7eed9?source=copy_link',
      },
      landingPage: { href: 'https://verunch.github.io/DocAssistant/' },
      mvp: {
        href: 'https://verunch.github.io/DocAssistant/chatBuilderApp.html',
        accent: true,
      },
      github: { href: 'https://github.com/verunch/DocAssistant', onRequest: true },
    },
    showOnPortfolioPage: true,
  },
  {
    slug: 'ascendra',
    title: 'Ascendra Workspaces',
    category: 'Cloud Platform',
    status: 'ready',
    group: 'saas',
    cover: {
      src: ascendraCover,
      detailStack: [ascendraIllustration, ascendraDetailCover],
      imageAlt: {
        en: 'Ascendra Workspaces cover',
        ru: 'Обложка Ascendra Workspaces',
        be: 'Вокладка Ascendra Workspaces',
      },
    },
    overview: {
      en: 'A cloud workspace platform designed for developers and DevOps teams to provision, organize, and manage virtual environments through a clean and scalable interface.',
      ru: 'Облачная платформа рабочих пространств для разработчиков и DevOps-команд: создание, организация и управление виртуальными окружениями через понятный и масштабируемый интерфейс.',
      be: 'Воблачная платформа працоўных прастораў для распрацоўшчыкаў і DevOps-каманд: стварэнне, арганізацыя і кіраванне віртуальнымі асяроддзямі праз зразумелы і маштабаваны інтэрфейс.',
    },
    role: {
      en: 'Product Designer — UX/UI Design • Dashboard Design • Information Architecture • Design System • Frontend MVP',
      ru: 'Продуктовый дизайнер — UX/UI-дизайн • Дизайн дашбордов • Информационная архитектура • Дизайн-система • Frontend MVP',
      be: 'Прадуктовы дызайнер — UX/UI-дызайн • Дызайн дашбордаў • Інфармацыйная архітэктура • Дызайн-сістэма • Frontend MVP',
    },
    problem: {
      en: 'Cloud infrastructure tools often overwhelm users with complex interfaces and fragmented workflows, slowing down everyday operations.',
      ru: 'Инструменты облачной инфраструктуры часто перегружают пользователей сложными интерфейсами и разрозненными процессами, замедляя повседневную работу.',
      be: 'Інструменты воблачнай інфраструктуры часта перагружаюць карыстальнікаў складанымі інтэрфейсамі і разрозненымі працэсамі, запавольваючы штодзённую працу.',
    },
    solution: {
      en: 'Designed a modern workspace experience focused on clarity, scalable dashboards, simplified infrastructure management, and efficient navigation.',
      ru: 'Спроектировала современный опыт работы с акцентом на ясность, масштабируемые дашборды, упрощённое управление инфраструктурой и удобную навигацию.',
      be: 'Спраектавала сучасны досвед працы з акцэнтам на яснасць, маштабаваныя дашборды, спрошчанае кіраванне інфраструктурай і зручную навігацыю.',
    },
    resources: {
      mvp: { href: 'https://verunch.github.io/ascendra-workspaces/' },
      github: { href: 'https://github.com/verunch/ascendra-workspaces', onRequest: true },
    },
    showOnPortfolioPage: true,
  },
  {
    slug: 'social-radar',
    title: 'Social Radar',
    category: 'Social Product',
    status: 'mvp-coming-soon',
    group: 'saas',
    cover: {
      src: socialRadarCover,
      imageAlt: {
        en: 'Social Radar cover',
        ru: 'Обложка Social Radar',
        be: 'Вокладка Social Radar',
      },
    },
    overview: {
      en: 'A proximity-based social discovery platform that helps people turn shared interests into meaningful real-world connections. The product combines reciprocal matching, privacy-first interaction, and thoughtful onboarding to encourage quality conversations instead of endless scrolling.',
      ru: 'Платформа для знакомств с людьми поблизости, которая помогает превращать общие интересы в настоящие связи в реальной жизни. Продукт сочетает взаимный мэтчинг, приватность по умолчанию и продуманный онбординг, чтобы поощрять качественное общение вместо бесконечного скроллинга.',
      be: 'Платформа для знаёмстваў з людзьмі побач, якая дапамагае ператвараць агульныя інтарэсы ў сапраўдныя сувязі ў рэальным жыцці. Прадукт спалучае ўзаемны мэтчынг, прыватнасць па змаўчанні і прадуманы анбордынг, каб заахвочваць якасныя размовы замест бясконцага скролінгу.',
    },
    role: {
      en: 'Product Designer — Product Strategy • UX Research • UX/UI Design • Design System • Interactive Prototype • Frontend MVP',
      ru: 'Продуктовый дизайнер — Продуктовая стратегия • UX-исследование • UX/UI-дизайн • Дизайн-система • Интерактивный прототип • Frontend MVP',
      be: 'Прадуктовы дызайнер — Прадуктовая стратэгія • UX-даследаванне • UX/UI-дызайн • Дызайн-сістэма • Інтэрактыўны прататып • Frontend MVP',
    },
    problem: {
      en: 'Most social and dating platforms optimize for engagement rather than meaningful interaction, making it difficult to discover compatible people nearby without pressure or endless swiping.',
      ru: 'Большинство социальных и дейтинг-платформ оптимизированы под вовлечённость, а не под содержательное общение, поэтому найти подходящих людей поблизости без давления и бесконечных свайпов сложно.',
      be: 'Большасць сацыяльных і дэйтынг-платформаў аптымізаваны пад уцягнутасць, а не пад змястоўныя зносіны, таму знайсці падыходных людзей побач без ціску і бясконцых свайпаў складана.',
    },
    solution: {
      en: 'Designed a product centered around reciprocal discovery, interest-based matching, privacy controls, and low-pressure interactions to help people connect naturally offline.',
      ru: 'Спроектировала продукт, построенный на взаимном обнаружении, мэтчинге по интересам, настройках приватности и ненавязчивом взаимодействии, чтобы люди естественно знакомились офлайн.',
      be: 'Спраектавала прадукт, пабудаваны на ўзаемным выяўленні, мэтчынгу па інтарэсах, наладах прыватнасці і ненавязлівым узаемадзеянні, каб людзі натуральна знаёміліся афлайн.',
    },
    resources: {
      caseStudy: {
        href: 'https://app.notion.com/p/Social-Radar-Product-Case-36c0a2e6e1d7800b902dfcbe6c2b1f76?source=copy_link',
      },
      uxResearch: {
        href: 'https://miro.com/app/board/uXjVGiCuPHs=/?share_link_id=569653291730',
      },
      uiMockups: {
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
    group: 'saas',
    cover: {
      src: bioQuestCover,
      imageAlt: {
        en: 'Bio Quest cover',
        ru: 'Обложка Bio Quest',
        be: 'Вокладка Bio Quest',
      },
    },
    overview: {
      en: 'A mobile educational game that transforms biology learning into an interactive adventure. Students explore the cell through visual challenges, mini-games, and progression mechanics that improve understanding and long-term retention.',
      ru: 'Мобильная образовательная игра, которая превращает изучение биологии в интерактивное приключение. Ученики исследуют клетку через визуальные задания, мини-игры и механики прогресса, которые улучшают понимание и долгосрочное запоминание.',
      be: 'Мабільная адукацыйная гульня, якая ператварае вывучэнне біялогіі ў інтэрактыўную прыгоду. Вучні даследуюць клетку праз візуальныя заданні, міні-гульні і механікі прагрэсу, якія паляпшаюць разуменне і доўгатэрміновае запамінанне.',
    },
    role: {
      en: 'Product Designer — Product Strategy • Learning Experience Design • UX/UI Design • Game Mechanics • Design System • Frontend MVP',
      ru: 'Продуктовый дизайнер — Продуктовая стратегия • Дизайн образовательного опыта • UX/UI-дизайн • Игровые механики • Дизайн-система • Frontend MVP',
      be: 'Прадуктовы дызайнер — Прадуктовая стратэгія • Дызайн адукацыйнага досведу • UX/UI-дызайн • Гульнявыя механікі • Дызайн-сістэма • Frontend MVP',
    },
    problem: {
      en: 'Traditional biology education relies heavily on memorization, making complex concepts difficult to understand, visualize, and retain.',
      ru: 'Традиционное обучение биологии во многом держится на заучивании, из-за чего сложные понятия трудно понять, представить и запомнить.',
      be: 'Традыцыйнае навучанне біялогіі ў многім трымаецца на завучванні, праз што складаныя паняцці цяжка зразумець, уявіць і запомніць.',
    },
    solution: {
      en: 'Designed a gamified learning experience with exploration, visual associations, progression systems, achievements, and collaborative game modes that make learning engaging and memorable.',
      ru: 'Спроектировала геймифицированный учебный опыт с исследованием, визуальными ассоциациями, системой прогресса, достижениями и совместными режимами игры, которые делают обучение увлекательным и запоминающимся.',
      be: 'Спраектавала гейміфікаваны навучальны досвед з даследаваннем, візуальнымі асацыяцыямі, сістэмай прагрэсу, дасягненнямі і сумеснымі рэжымамі гульні, якія робяць навучанне захапляльным і запамінальным.',
    },
    resources: {
      caseStudy: {
        href: 'https://app.notion.com/p/Bio-Quest-Cell-Adventure-EdTech-Project-3700a2e6e1d7802baec9d444fcac6f8d?source=copy_link',
      },
      uxResearch: {
        href: 'https://miro.com/app/board/uXjVHMdVl74=/?share_link_id=837831180391',
      },
      uiMockups: {
        href: 'https://www.figma.com/design/vHrtUuymPJOj6lvPfEpp5i/Bio-Quest--Cell-Adventure?node-id=0-1&t=cAMUv4hAdPHS2fH8-1',
      },
    },
    showOnPortfolioPage: true,
  },
  {
    slug: 'portfolio-website',
    title: {
      en: 'Product Designer Portfolio Website',
      ru: 'Сайт-портфолио продуктового дизайнера',
      be: 'Сайт-партфоліа прадуктовага дызайнера',
    },
    category: 'Portfolio',
    status: 'ready',
    group: 'saas',
    cover: {
      src: productDesignerCover,
      detailSrc: productDesignerDetailCover,
      imageAlt: {
        en: 'Product Designer Portfolio Website cover',
        ru: 'Обложка сайта-портфолио продуктового дизайнера',
        be: 'Вокладка сайта-партфоліа прадуктовага дызайнера',
      },
    },
    overview: {
      en: 'A multilingual portfolio website (English, Russian, Belarusian) that presents my product design work as complete case studies — from problem and role to live MVPs, research boards, mockups and code — and turns visits into contacts and résumé views.',
      ru: 'Мультиязычный сайт-портфолио (английский, русский, белорусский), который показывает мою продуктовую работу как полноценные кейсы — от проблемы и роли до живых MVP, исследовательских досок, макетов и кода — и превращает визиты в контакты и просмотры резюме.',
      be: 'Шматмоўны сайт-партфоліа (англійская, руская, беларуская), які паказвае маю прадуктовую працу як паўнавартасныя кейсы — ад праблемы і ролі да жывых MVP, даследчых дошак, макетаў і кода — і ператварае візіты ў кантакты і прагляды рэзюмэ.',
    },
    role: {
      en: 'Product Designer — Product Discovery • UX/UI Design • Information Architecture • Design System • Frontend Development • SEO & Analytics',
      ru: 'Продуктовый дизайнер — Product Discovery • UX/UI-дизайн • Информационная архитектура • Дизайн-система • Frontend-разработка • SEO и аналитика',
      be: 'Прадуктовы дызайнер — Product Discovery • UX/UI-дызайн • Інфармацыйная архітэктура • Дызайн-сістэма • Frontend-распрацоўка • SEO і аналітыка',
    },
    problem: {
      en: 'My work was spread across Notion case studies, Figma files, Miro boards, GitHub repositories and separately hosted MVPs. Recruiters and clients had no single place to quickly understand what I do, see the process behind each product and reach me — and there was no way to know which projects actually caught their attention.',
      ru: 'Мои работы были разбросаны по кейсам в Notion, файлам Figma, доскам Miro, репозиториям GitHub и отдельно размещённым MVP. У рекрутеров и клиентов не было единого места, где можно быстро понять, чем я занимаюсь, увидеть процесс за каждым продуктом и связаться со мной, — и не было способа узнать, какие проекты действительно привлекают внимание.',
      be: 'Мае працы былі раскіданы па кейсах у Notion, файлах Figma, дошках Miro, рэпазіторыях GitHub і асобна размешчаных MVP. У рэкрутараў і кліентаў не было адзінага месца, дзе можна хутка зразумець, чым я займаюся, убачыць працэс за кожным прадуктам і звязацца са мной, — і не было спосабу даведацца, якія праекты сапраўды прыцягваюць увагу.',
    },
    product: {
      en: [
        'Defined the audiences: international recruiters and hiring managers reading in English, and local clients in Belarus who prefer Russian or Belarusian.',
        'Built the site around two goals: a contact (email or LinkedIn) and a résumé view.',
        'Home gives a 10-second overview: who I am, my stack and a projects table that links straight to every artifact — case study, Figma, Miro, MVP, landing page, live page, website, GitHub.',
        'Portfolio splits work into websites & apps and cases, each told with one template: overview, role, problem, solution and project resources.',
        'The résumé opens in a built-in PDF viewer with zoom, page navigation, full screen and download — no leaving the site.',
        'The site opens in the visitor’s language automatically and remembers their choice.',
        'Set up search engine indexing: sitemap, robots.txt, structured data and link previews for LinkedIn and messengers.',
      ],
      ru: [
        'Определила аудитории: международные рекрутеры и нанимающие менеджеры, читающие по-английски, и местные клиенты в Беларуси, которым удобнее русский или белорусский.',
        'Построила сайт вокруг двух целей: контакт (почта или LinkedIn) и просмотр резюме.',
        'Главная даёт обзор за 10 секунд: кто я, мой стек и таблица проектов со ссылками на все артефакты — кейс, Figma, Miro, MVP, лендинг, live page, сайт, GitHub.',
        'Портфолио делит работы на сайты и приложения и кейсы, каждый рассказан по единому шаблону: обзор, роль, проблема, решение и материалы проекта.',
        'Резюме открывается во встроенном PDF-просмотрщике с масштабом, навигацией по страницам, полноэкранным режимом и скачиванием — без ухода с сайта.',
        'Сайт автоматически открывается на языке посетителя и запоминает его выбор.',
        'Настроила индексацию поисковиками: sitemap, robots.txt, структурированные данные и превью ссылок для LinkedIn и мессенджеров.',
      ],
      be: [
        'Вызначыла аўдыторыі: міжнародныя рэкрутары і менеджары па найме, якія чытаюць па-англійску, і мясцовыя кліенты ў Беларусі, якім зручней руская або беларуская.',
        'Пабудавала сайт вакол дзвюх мэтаў: кантакт (пошта або LinkedIn) і прагляд рэзюмэ.',
        'Галоўная дае агляд за 10 секунд: хто я, мой стэк і табліца праектаў са спасылкамі на ўсе артэфакты — кейс, Figma, Miro, MVP, лэндынг, live page, сайт, GitHub.',
        'Партфоліа дзеліць працы на сайты і праграмы і кейсы, кожны расказаны па адзіным шаблоне: агляд, роля, праблема, рашэнне і матэрыялы праекта.',
        'Рэзюмэ адкрываецца ва ўбудаваным PDF-праглядальніку з маштабам, навігацыяй па старонках, поўнаэкранным рэжымам і спампоўваннем — без сыходу з сайта.',
        'Сайт аўтаматычна адкрываецца на мове наведвальніка і запамінае яго выбар.',
        'Наладзіла індэксацыю пошукавікамі: sitemap, robots.txt, структураваныя даныя і прэв’ю спасылак для LinkedIn і месенджараў.',
      ],
    },
    design: {
      en: [
        'A calm editorial visual language: warm paper background, sage accents, serif headings paired with clean sans-serif text.',
        'A design system built on tokens — colors, typography, spacing — with buttons, status badges, action buttons and resource tiles in a unique color per resource type.',
        'A vertical identity rail on desktop Home and a compact header everywhere else.',
        'Case studies in a two-column layout — text and cover side by side, extended product, design and metrics blocks below.',
        'An animated mascot cover for DocAssistant built as a live HTML embed.',
        'Accessible by default: semantic structure, keyboard focus states, screen reader labels in every language, reduced-motion support.',
        'Fully responsive from phones to desktops.',
      ],
      ru: [
        'Спокойный редакционный визуальный язык: тёплый «бумажный» фон, шалфейные акценты, засечные заголовки в паре с чистым гротеском.',
        'Дизайн-система на токенах — цвета, типографика, отступы — с кнопками, бейджами статусов, кнопками-действиями и плитками материалов с уникальным цветом для каждого типа ресурса.',
        'Вертикальная панель идентичности на главной на десктопе и компактная шапка на остальных страницах.',
        'Кейсы в двухколоночной раскладке — текст и обложка рядом, расширенные блоки продукта, дизайна и метрик ниже.',
        'Анимированная обложка с маскотом для DocAssistant, сделанная как живой HTML-embed.',
        'Доступность по умолчанию: семантическая структура, состояния фокуса для клавиатуры, подписи для скринридеров на каждом языке, поддержка reduced motion.',
        'Полностью адаптивный — от телефонов до десктопа.',
      ],
      be: [
        'Спакойная рэдакцыйная візуальная мова: цёплы «папяровы» фон, шалфейныя акцэнты, шрыфты з засечкамі ў загалоўках у пары з чыстым гратэскам.',
        'Дызайн-сістэма на токенах — колеры, тыпаграфіка, адступы — з кнопкамі, бэйджамі статусаў, кнопкамі-дзеяннямі і пліткамі матэрыялаў з унікальным колерам для кожнага тыпу рэсурсу.',
        'Вертыкальная панэль ідэнтычнасці на галоўнай на дэсктопе і кампактная шапка на астатніх старонках.',
        'Кейсы ў двухкалоначнай раскладцы — тэкст і вокладка побач, пашыраныя блокі прадукту, дызайну і метрык ніжэй.',
        'Аніміраваная вокладка з маскотам для DocAssistant, зробленая як жывы HTML-embed.',
        'Даступнасць па змаўчанні: семантычная структура, станы фокусу для клавіятуры, подпісы для скрынрыдэраў на кожнай мове, падтрымка reduced motion.',
        'Цалкам адаптыўны — ад тэлефонаў да дэсктопа.',
      ],
    },
    metrics: {
      en: 'The site measures the whole path to a contact in Yandex Metrica and Vercel Analytics: visits by language and source, résumé opens and downloads, clicks on project resources (by project, resource type and where they were placed), contact clicks and language switches — showing which projects and artifacts actually interest recruiters. Performance is tracked with Core Web Vitals in Vercel Speed Insights.',
      ru: 'Сайт измеряет весь путь до контакта в Яндекс Метрике и Vercel Analytics: визиты по языку и источнику, открытия и скачивания резюме, клики по материалам проектов (с учётом проекта, типа ресурса и места на сайте), клики по контактам и переключения языка — так видно, какие проекты и артефакты действительно интересуют рекрутеров. Производительность отслеживается по Core Web Vitals в Vercel Speed Insights.',
      be: 'Сайт вымярае ўвесь шлях да кантакту ў Яндэкс Метрыцы і Vercel Analytics: візіты па мове і крыніцы, адкрыцці і спампоўванні рэзюмэ, клікі па матэрыялах праектаў (з улікам праекта, тыпу рэсурсу і месца на сайце), клікі па кантактах і пераключэнні мовы — так відаць, якія праекты і артэфакты сапраўды цікавяць рэкрутараў. Прадукцыйнасць адсочваецца па Core Web Vitals у Vercel Speed Insights.',
    },
    resources: {
      website: { href: 'https://vera-bakerava-portfolio.vercel.app/' },
      github: { href: 'https://github.com/verunch/portfolio-website', onRequest: true },
    },
    showOnPortfolioPage: true,
  },
  {
    slug: 'photographer-portfolio',
    title: {
      en: 'Photographer Portfolio Website',
      ru: 'Сайт-портфолио фотографа',
      be: 'Сайт-партфоліа фатографа',
    },
    category: 'Portfolio',
    status: 'ready',
    group: 'saas',
    cover: {
      src: photographerCardCover,
      detailSrc: photographerCover,
      imageAlt: {
        en: 'Photographer Portfolio Website cover',
        ru: 'Обложка сайта-портфолио фотографа',
        be: 'Вокладка сайта-партфоліа фатографа',
      },
    },
    overview: {
      en: 'A multilingual portfolio and booking website for a candid photographer in Belarus (English, Belarusian, Russian). It shows her projects, explains prices and turns visitors into booking requests.',
      ru: 'Мультиязычный сайт-портфолио и онлайн-запись для репортажного фотографа в Беларуси (английский, белорусский, русский). Сайт показывает её проекты, объясняет цены и превращает посетителей в заявки на съёмку.',
      be: 'Шматмоўны сайт-партфоліа і анлайн-запіс для рэпартажнага фатографа ў Беларусі (англійская, беларуская, руская). Сайт паказвае яе праекты, тлумачыць цэны і ператварае наведвальнікаў у заяўкі на здымку.',
    },
    role: {
      en: 'Product Designer — Product Discovery • UX/UI Design • Information Architecture • Design System • Frontend Development • SEO & Analytics',
      ru: 'Продуктовый дизайнер — Product Discovery • UX/UI-дизайн • Информационная архитектура • Дизайн-система • Frontend-разработка • SEO и аналитика',
      be: 'Прадуктовы дызайнер — Product Discovery • UX/UI-дызайн • Інфармацыйная архітэктура • Дызайн-сістэма • Frontend-распрацоўка • SEO і аналітыка',
    },
    problem: {
      en: "The photographer's work was spread across Instagram and outdated catalogue profiles. Search showed old third-party pages instead of her own site. Clients had no single place to see her work, understand prices and book a shoot in their own language, so requests depended on chance and direct messages.",
      ru: 'Работы фотографа были разбросаны по Instagram и устаревшим профилям в каталогах. Поиск показывал старые сторонние страницы вместо её собственного сайта. У клиентов не было единого места, где можно посмотреть работы, разобраться в ценах и записаться на съёмку на своём языке, поэтому заявки зависели от случая и личных сообщений.',
      be: 'Працы фатографа былі раскіданы па Instagram і састарэлых профілях у каталогах. Пошук паказваў старыя старонкі іншых сайтаў замест яе ўласнага. У кліентаў не было адзінага месца, дзе можна паглядзець працы, разабрацца ў цэнах і запісацца на здымку на сваёй мове, таму заяўкі залежалі ад выпадку і асабістых паведамленняў.',
    },
    product: {
      en: [
        'Defined the audiences: local clients in Belarus who speak Belarusian or Russian, and English-speaking visitors.',
        'Built the site around one goal: getting a booking request.',
        'Prices are presented as clear hourly rates per shoot type, plus a special-offer mini session as an easy first step.',
        'Booking and cancellation terms are spelled out in advance, with contract templates ready to download.',
        "The site opens in the visitor's language automatically.",
        "Booking requests arrive in the photographer's Telegram instantly.",
        'Set up search engines and map listings (Google, Yandex, 2GIS) so clients can find her.',
      ],
      ru: [
        'Определила аудитории: местные клиенты в Беларуси, говорящие по-белорусски или по-русски, и англоязычные посетители.',
        'Построила сайт вокруг одной цели — получить заявку на съёмку.',
        'Цены поданы как понятные почасовые тарифы для каждого типа съёмки, плюс мини-сессия по спецпредложению как лёгкий первый шаг.',
        'Условия записи и отмены описаны заранее, шаблоны договоров можно скачать.',
        'Сайт автоматически открывается на языке посетителя.',
        'Заявки на съёмку мгновенно приходят фотографу в Telegram.',
        'Настроила поисковые системы и карты (Google, Яндекс, 2ГИС), чтобы клиенты могли её найти.',
      ],
      be: [
        'Вызначыла аўдыторыі: мясцовыя кліенты ў Беларусі, якія размаўляюць па-беларуску або па-руску, і англамоўныя наведвальнікі.',
        'Пабудавала сайт вакол адной мэты — атрымаць заяўку на здымку.',
        'Цэны пададзены як зразумелыя пагадзінныя тарыфы для кожнага тыпу здымкі, а таксама міні-сесія па спецпрапанове як лёгкі першы крок.',
        'Умовы запісу і адмены апісаны загадзя, шаблоны дагавораў можна спампаваць.',
        'Сайт аўтаматычна адкрываецца на мове наведвальніка.',
        'Заяўкі на здымку імгненна прыходзяць фатографу ў Telegram.',
        'Наладзіла пошукавыя сістэмы і карты (Google, Яндекс, 2ГІС), каб кліенты маглі яе знайсці.',
      ],
    },
    design: {
      en: [
        'A quiet, photo-first visual language: neutral palette, light typography, a dark theme.',
        'An animated start screen with an auto-entry button.',
        'Each project has its own photo gallery that keeps its rhythm.',
        'A small design system: buttons, cards, form controls, breadcrumbs.',
        'Custom date picker and dropdown that follow the page language.',
        'Fully responsive from phones to desktops.',
      ],
      ru: [
        'Спокойный визуальный язык, где главное — фотографии: нейтральная палитра, лёгкая типографика, тёмная тема.',
        'Анимированный стартовый экран с кнопкой автоматического входа.',
        'У каждого проекта своя фотогалерея, сохраняющая его ритм.',
        'Небольшая дизайн-система: кнопки, карточки, элементы форм, хлебные крошки.',
        'Собственные календарь выбора даты и выпадающий список, которые следуют языку страницы.',
        'Полностью адаптивный — от телефонов до десктопа.',
      ],
      be: [
        'Спакойная візуальная мова, дзе галоўнае — фотаздымкі: нейтральная палітра, лёгкая тыпаграфіка, цёмная тэма.',
        'Аніміраваны стартавы экран з кнопкай аўтаматычнага ўваходу.',
        'Кожны праект мае ўласную фотагалерэю, якая захоўвае яго рытм.',
        'Невялікая дызайн-сістэма: кнопкі, карткі, элементы формаў, хлебныя крошкі.',
        'Уласныя каляндар выбару даты і выпадальны спіс, якія адпавядаюць мове старонкі.',
        'Цалкам адаптыўны — ад тэлефонаў да дэсктопа.',
      ],
    },
    metrics: {
      en: 'The site measures the whole path to a booking in Yandex Metrica and Vercel Analytics: visits by language and source, clicks on booking buttons (by where on the site they were placed), contact clicks and sent booking forms — showing which pages and offers actually bring clients. Performance is tracked with Core Web Vitals.',
      ru: 'Сайт измеряет весь путь до заявки в Яндекс Метрике и Vercel Analytics: визиты по языку и источнику, клики по кнопкам записи (с учётом места на сайте), клики по контактам и отправленные формы — так видно, какие страницы и предложения действительно приводят клиентов. Производительность отслеживается по Core Web Vitals.',
      be: 'Сайт вымярае ўвесь шлях да заяўкі ў Яндэкс Метрыцы і Vercel Analytics: візіты па мове і крыніцы, клікі па кнопках запісу (з улікам месца на сайце), клікі па кантактах і адпраўленыя формы — так відаць, якія старонкі і прапановы сапраўды прыводзяць кліентаў. Прадукцыйнасць адсочваецца па Core Web Vitals.',
    },
    resources: {
      website: { href: 'https://photographer-portfolio-vera-bakerava.vercel.app/' },
      github: { href: 'https://github.com/verunch/photographer-portfolio', onRequest: true },
    },
    showOnPortfolioPage: true,
  },
  {
    slug: 'motion-design-showcase',
    title: {
      en: 'Motion Design Showcase',
      ru: 'Шоукейс по моушн-дизайну',
      be: 'Шоўкейс па моўшн-дызайне',
    },
    category: 'Motion Design',
    status: 'ready',
    group: 'showcase',
    cover: {
      src: motionDesignCardCover,
      detailSrc: motionDesignCover,
      imageAlt: {
        en: 'Motion Design Showcase cover',
        ru: 'Обложка шоукейса по моушн-дизайну',
        be: 'Вокладка шоўкейса па моўшн-дызайне',
      },
    },
    overview: {
      en: 'A hero section concept for an architecture studio website, developed as a static visual design and an interactive motion prototype. The aim was to translate architectural thinking (structure, space, light and material) into a digital first impression.',
      ru: 'Концепция первого экрана для сайта архитектурной студии, выполненная как статичный визуальный дизайн и интерактивный моушн-прототип. Задача — перевести архитектурное мышление (структуру, пространство, свет и материал) в цифровое первое впечатление.',
      be: 'Канцэпцыя першага экрана для сайта архітэктурнай студыі, выкананая як статычны візуальны дызайн і інтэрактыўны моўшн-прататып. Задача — перавесці архітэктурнае мысленне (структуру, прастору, святло і матэрыял) у лічбавае першае ўражанне.',
    },
    role: {
      en: 'Web / UI Designer — Art Direction • Layout & Composition • Typography • Motion Design • Interactive Prototype',
      ru: 'Веб / UI-дизайнер — Арт-дирекшн • Макет и композиция • Типографика • Моушн-дизайн • Интерактивный прототип',
      be: 'Вэб / UI-дызайнер — Арт-дырэкшн • Макет і кампазіцыя • Тыпаграфіка • Моўшн-дызайн • Інтэрактыўны прататып',
    },
    problem: {
      en: 'Architecture studio websites often open with a single fullscreen interior photo. It looks polished but generic, and it shows the work without conveying how the studio thinks about space.',
      ru: 'Сайты архитектурных студий часто открываются одной полноэкранной фотографией интерьера. Это выглядит аккуратно, но безлико: показывает работу, но не передаёт, как студия мыслит пространство.',
      be: 'Сайты архітэктурных студый часта адкрываюцца адной поўнаэкраннай фатаграфіяй інтэр’ера. Гэта выглядае акуратна, але безаблічна: паказвае працу, але не перадае, як студыя мысліць прастору.',
    },
    solution: {
      en: 'Designed a structural, layered hero where the composition itself reflects architectural logic: a clear grid, typography as a building element, and spatial depth built from overlapping layers. The prototype adds an entrance text animation, layer interplay, scroll-driven behavior and a seamless transition into the next section.',
      ru: 'Спроектировала структурный многослойный первый экран, где сама композиция отражает архитектурную логику: чёткая сетка, типографика как строительный элемент и пространственная глубина из перекрывающихся слоёв. Прототип добавляет анимацию появления текста, взаимодействие слоёв, поведение при скролле и плавный переход к следующей секции.',
      be: 'Спраектавала структурны шматслойны першы экран, дзе сама кампазіцыя адлюстроўвае архітэктурную логіку: дакладная сетка, тыпаграфіка як будаўнічы элемент і прасторавая глыбіня з слаёў, якія перакрываюцца. Прататып дадае анімацыю з’яўлення тэксту, узаемадзеянне слаёў, паводзіны пры скроле і плаўны пераход да наступнай секцыі.',
    },
    resources: {
      uiMockups: {
        href: 'https://www.figma.com/design/Ug8iOvNm3EodLG2Nat50Ga/adelt---testtask---2026-Vera?node-id=1-444&t=X4eohKPziKHjDPMR-1',
      },
      livePage: { href: 'https://verunch.github.io/mono_hero_animatic/' },
    },
    showOnPortfolioPage: true,
  },
  {
    slug: 'cell-culture-monitoring-workspace',
    title: 'Cell Culture Monitoring Workspace',
    category: 'MedTech',
    status: 'coming-soon',
    group: 'saas',
    cover: {
      imageAlt: {
        en: 'Cell Culture Monitoring Workspace cover',
        ru: 'Обложка Cell Culture Monitoring Workspace',
        be: 'Вокладка Cell Culture Monitoring Workspace',
      },
    },
    overview: {
      en: 'A concept for a laboratory workspace that helps researchers monitor cell cultures, organize experiments, and centralize laboratory workflows in a single interface.',
      ru: 'Концепция лабораторного рабочего пространства, которое помогает исследователям отслеживать клеточные культуры, организовывать эксперименты и собирать лабораторные процессы в едином интерфейсе.',
      be: 'Канцэпцыя лабараторнай працоўнай прасторы, якая дапамагае даследчыкам адсочваць клетачныя культуры, арганізоўваць эксперыменты і збіраць лабараторныя працэсы ў адзіным інтэрфейсе.',
    },
    role: {
      en: 'Product Designer — UX Research • Product Discovery • Information Architecture • UX/UI Design',
      ru: 'Продуктовый дизайнер — UX-исследование • Product Discovery • Информационная архитектура • UX/UI-дизайн',
      be: 'Прадуктовы дызайнер — UX-даследаванне • Product Discovery • Інфармацыйная архітэктура • UX/UI-дызайн',
    },
    problem: {
      en: 'Laboratory software is frequently fragmented across multiple systems, making experiment monitoring, documentation, and collaboration inefficient.',
      ru: 'Лабораторное ПО часто разбросано по нескольким системам, из-за чего мониторинг экспериментов, документация и совместная работа становятся неэффективными.',
      be: 'Лабараторнае ПЗ часта раскідана па некалькіх сістэмах, праз што маніторынг эксперыментаў, дакументацыя і сумесная праца становяцца неэфектыўнымі.',
    },
    solution: {
      en: 'Designing a unified workspace that integrates experiment tracking, culture monitoring, laboratory documentation, and scientific workflows into a streamlined experience.',
      ru: 'Проектирую единое рабочее пространство, объединяющее отслеживание экспериментов, мониторинг культур, лабораторную документацию и научные процессы в цельный опыт.',
      be: 'Праектую адзіную працоўную прастору, якая аб’ядноўвае адсочванне эксперыментаў, маніторынг культур, лабараторную дакументацыю і навуковыя працэсы ў цэласны досвед.',
    },
    resources: {},
    showOnPortfolioPage: false,
  },
];
