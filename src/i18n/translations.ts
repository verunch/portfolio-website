import type { Locale } from './locales';

// UI copy for every locale. `en` is the source of truth for the shape —
// `ru`/`be` are typed against it, so a missing key fails the build.
const en = {
  meta: {
    title: 'Vera Bakerava — Product & UX/UI Designer',
  },
  languageSwitcher: {
    ariaLabel: 'Language',
  },
  nav: {
    home: 'Home',
    portfolio: 'Portfolio',
    resume: 'Résumé',
    primaryAriaLabel: 'Primary',
    pageNavAriaLabel: 'Page navigation',
    scrollToTop: 'Scroll to top',
  },
  header: {
    tagline: 'Product Designer',
  },
  identityRail: {
    ariaLabel: 'Identity',
    homeAriaLabel: 'Vera Bakerava — Home',
  },
  socials: {
    linkedin: 'LinkedIn',
    email: 'Email',
  },
  home: {
    emailLink: 'email ↗',
    linkedinLink: 'linkedin ↗',
    viewPortfolio: 'View Portfolio',
    resume: 'Résumé',
    stackLabel: 'My Stack',
    stackSubtitle: '— tools & technologies I work with',
    aboutLabel: 'About',
    selectedProjectsLabel: 'Selected Projects',
    showAll: 'Show all',
    showLess: 'Show less',
  },
  table: {
    project: 'Project',
    status: 'Status',
    viewProject: 'View',
  },
  status: {
    ready: 'Ready',
    'coming-soon': 'Coming Soon',
    'mvp-coming-soon': 'MVP Coming Soon',
  },
  // `column` — Home Projects Table header; `tile`/`platform` — Portfolio
  // case-study resource tiles.
  resources: {
    caseStudy: { column: 'Case Study (Notion)', tile: 'Case Study', platform: 'Notion' },
    uiMockups: { column: 'UI (Figma)', tile: 'UI Mockups', platform: 'Figma' },
    uxResearch: { column: 'UX (Miro)', tile: 'UX Research', platform: 'Miro' },
    mvp: { column: 'MVP', tile: 'MVP', platform: 'Live app' },
    landingPage: { column: 'Landing Page', tile: 'Landing Page', platform: 'Live page' },
    livePage: { column: 'Live Page (animatic)', tile: 'Live Page', platform: 'Animatic' },
    website: { column: 'Web Site', tile: 'Web Site', platform: 'Live site' },
    github: { column: 'GitHub', tile: 'GitHub', platform: 'Repo' },
  },
  portfolio: {
    title: 'Portfolio',
    helper: 'Click a card to jump to its case study ↓',
    groups: {
      saas: 'Websites & Apps',
      showcase: 'Cases',
    },
    projectIndex: 'Project',
    overview: 'Overview',
    role: 'Role',
    problem: 'Problem',
    solution: 'Solution',
    product: 'Product',
    design: 'Design',
    metrics: 'Metrics',
    projectResources: 'Project Resources',
    placeholderText: 'Description coming soon.',
  },
  resumeModal: {
    title: 'Resume',
    ariaLabel: 'Résumé',
    close: 'Close résumé preview',
    languages: 'Languages',
    location: 'Location',
    experience: 'Experience',
    previousPage: 'Previous page',
    nextPage: 'Next page',
    zoomOut: 'Zoom out',
    zoomIn: 'Zoom in',
    loading: 'Loading résumé…',
    loadError: "Couldn't load the preview.",
    openPdf: 'Open the PDF directly',
    fullscreen: 'Open Full Screen',
    download: 'Download PDF',
  },
  lightbox: {
    close: 'Close image',
  },
  access: {
    onRequest: 'Access available on request',
    onRequestShort: 'On request',
  },
  notFound: {
    title: 'Page not found',
    backHome: 'Back home',
  },
};

export type Translations = typeof en;

const ru: Translations = {
  meta: {
    title: 'Вера Бакерова — продуктовый и UX/UI-дизайнер',
  },
  languageSwitcher: {
    ariaLabel: 'Язык',
  },
  nav: {
    home: 'Главная',
    portfolio: 'Портфолио',
    resume: 'Резюме',
    primaryAriaLabel: 'Основная навигация',
    pageNavAriaLabel: 'Навигация по страницам',
    scrollToTop: 'Наверх',
  },
  header: {
    tagline: 'Продуктовый дизайнер',
  },
  identityRail: {
    ariaLabel: 'Профиль',
    homeAriaLabel: 'Вера Бакерова — на главную',
  },
  socials: {
    linkedin: 'LinkedIn',
    email: 'Почта',
  },
  home: {
    emailLink: 'почта ↗',
    linkedinLink: 'linkedin ↗',
    viewPortfolio: 'Смотреть портфолио',
    resume: 'Резюме',
    stackLabel: 'Мой стек',
    stackSubtitle: '— инструменты и технологии, с которыми я работаю',
    aboutLabel: 'Обо мне',
    selectedProjectsLabel: 'Избранные проекты',
    showAll: 'Смотреть все',
    showLess: 'Свернуть',
  },
  table: {
    project: 'Проект',
    status: 'Статус',
    viewProject: 'Открыть',
  },
  status: {
    ready: 'Готово',
    'coming-soon': 'Скоро',
    'mvp-coming-soon': 'MVP скоро',
  },
  resources: {
    caseStudy: { column: 'Кейс (Notion)', tile: 'Кейс', platform: 'Notion' },
    uiMockups: { column: 'UI (Figma)', tile: 'UI-макеты', platform: 'Figma' },
    uxResearch: { column: 'UX (Miro)', tile: 'UX-исследование', platform: 'Miro' },
    mvp: { column: 'MVP', tile: 'MVP', platform: 'Приложение' },
    landingPage: { column: 'Лендинг', tile: 'Лендинг', platform: 'Страница' },
    livePage: { column: 'Live Page (аниматик)', tile: 'Live Page', platform: 'Аниматик' },
    website: { column: 'Веб-сайт', tile: 'Веб-сайт', platform: 'Сайт' },
    github: { column: 'GitHub', tile: 'GitHub', platform: 'Репозиторий' },
  },
  portfolio: {
    title: 'Портфолио',
    helper: 'Нажмите на карточку, чтобы перейти к кейсу ↓',
    groups: {
      saas: 'Сайты и приложения',
      showcase: 'Кейсы',
    },
    projectIndex: 'Проект',
    overview: 'Обзор',
    role: 'Роль',
    problem: 'Проблема',
    solution: 'Решение',
    product: 'Продукт',
    design: 'Дизайн',
    metrics: 'Метрики',
    projectResources: 'Материалы проекта',
    placeholderText: 'Описание скоро появится.',
  },
  resumeModal: {
    title: 'Резюме',
    ariaLabel: 'Резюме',
    close: 'Закрыть просмотр резюме',
    languages: 'Языки',
    location: 'Локация',
    experience: 'Опыт',
    previousPage: 'Предыдущая страница',
    nextPage: 'Следующая страница',
    zoomOut: 'Уменьшить',
    zoomIn: 'Увеличить',
    loading: 'Загрузка резюме…',
    loadError: 'Не удалось загрузить предпросмотр.',
    openPdf: 'Открыть PDF напрямую',
    fullscreen: 'На весь экран',
    download: 'Скачать PDF',
  },
  lightbox: {
    close: 'Закрыть изображение',
  },
  access: {
    onRequest: 'Доступ предоставляется по запросу',
    onRequestShort: 'По запросу',
  },
  notFound: {
    title: 'Страница не найдена',
    backHome: 'На главную',
  },
};

const be: Translations = {
  meta: {
    title: 'Вера Бакерава — прадуктовы і UX/UI-дызайнер',
  },
  languageSwitcher: {
    ariaLabel: 'Мова',
  },
  nav: {
    home: 'Галоўная',
    portfolio: 'Партфоліа',
    resume: 'Рэзюмэ',
    primaryAriaLabel: 'Асноўная навігацыя',
    pageNavAriaLabel: 'Навігацыя па старонках',
    scrollToTop: 'Уверх',
  },
  header: {
    tagline: 'Прадуктовы дызайнер',
  },
  identityRail: {
    ariaLabel: 'Профіль',
    homeAriaLabel: 'Вера Бакерава — на галоўную',
  },
  socials: {
    linkedin: 'LinkedIn',
    email: 'Пошта',
  },
  home: {
    emailLink: 'пошта ↗',
    linkedinLink: 'linkedin ↗',
    viewPortfolio: 'Глядзець партфоліа',
    resume: 'Рэзюмэ',
    stackLabel: 'Мой стэк',
    stackSubtitle: '— інструменты і тэхналогіі, з якімі я працую',
    aboutLabel: 'Пра мяне',
    selectedProjectsLabel: 'Абраныя праекты',
    showAll: 'Глядзець усе',
    showLess: 'Згарнуць',
  },
  table: {
    project: 'Праект',
    status: 'Статус',
    viewProject: 'Адкрыць',
  },
  status: {
    ready: 'Гатова',
    'coming-soon': 'Хутка',
    'mvp-coming-soon': 'MVP хутка',
  },
  resources: {
    caseStudy: { column: 'Кейс (Notion)', tile: 'Кейс', platform: 'Notion' },
    uiMockups: { column: 'UI (Figma)', tile: 'UI-макеты', platform: 'Figma' },
    uxResearch: { column: 'UX (Miro)', tile: 'UX-даследаванне', platform: 'Miro' },
    mvp: { column: 'MVP', tile: 'MVP', platform: 'Дадатак' },
    landingPage: { column: 'Лэндынг', tile: 'Лэндынг', platform: 'Старонка' },
    livePage: { column: 'Live Page (анімацык)', tile: 'Live Page', platform: 'Анімацык' },
    website: { column: 'Вэб-сайт', tile: 'Вэб-сайт', platform: 'Сайт' },
    github: { column: 'GitHub', tile: 'GitHub', platform: 'Рэпазіторый' },
  },
  portfolio: {
    title: 'Партфоліа',
    helper: 'Націсніце на картку, каб перайсці да кейса ↓',
    groups: {
      saas: 'Сайты і праграмы',
      showcase: 'Кейсы',
    },
    projectIndex: 'Праект',
    overview: 'Агляд',
    role: 'Роля',
    problem: 'Праблема',
    solution: 'Рашэнне',
    product: 'Прадукт',
    design: 'Дызайн',
    metrics: 'Метрыкі',
    projectResources: 'Матэрыялы праекта',
    placeholderText: 'Апісанне хутка з’явіцца.',
  },
  resumeModal: {
    title: 'Рэзюмэ',
    ariaLabel: 'Рэзюмэ',
    close: 'Закрыць прагляд рэзюмэ',
    languages: 'Мовы',
    location: 'Месцазнаходжанне',
    experience: 'Досвед',
    previousPage: 'Папярэдняя старонка',
    nextPage: 'Наступная старонка',
    zoomOut: 'Паменшыць',
    zoomIn: 'Павялічыць',
    loading: 'Загрузка рэзюмэ…',
    loadError: 'Не ўдалося загрузіць папярэдні прагляд.',
    openPdf: 'Адкрыць PDF наўпрост',
    fullscreen: 'На ўвесь экран',
    download: 'Спампаваць PDF',
  },
  lightbox: {
    close: 'Закрыць выяву',
  },
  access: {
    onRequest: 'Доступ даецца па запыце',
    onRequestShort: 'Па запыце',
  },
  notFound: {
    title: 'Старонка не знойдзена',
    backHome: 'На галоўную',
  },
};

export const translations: Record<Locale, Translations> = { en, ru, be };
