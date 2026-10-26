import type { Localized } from '../i18n/locales';

// name, bio, social links, résumé URL — the profile slice of HomeContent (ARCHITECTURE.md §16).
export type Profile = {
  name: Localized;
  // Monogram shown in the IdentityRail.
  initials: Localized;
  bio: Localized;
  email: string;
  linkedin: string;
  telegram: string;
  resumeUrl: string;
  roles: Localized<string[]>;
  location: Localized;
  languages: Localized;
  experienceSummary: Localized;
  about: { paragraphs: Localized<string[]> };
};

export const profile: Profile = {
  name: { en: 'Vera Bakerava', ru: 'Вера Бакерова', be: 'Вера Бакерава' },
  initials: { en: 'VB', ru: 'ВБ', be: 'ВБ' },
  bio: {
    en: 'I build thoughtful digital products from idea to MVP. I take on requests for design, frontend development and full-cycle projects — from discovery to a launched product.',
    ru: 'Создаю продуманные цифровые продукты от идеи до MVP. Беру в работу заявки на дизайн, вёрстку и frontend-разработку, а также проекты полного цикла — от исследования до запущенного продукта.',
    be: 'Ствараю прадуманыя лічбавыя прадукты ад ідэі да MVP. Бяру ў працу заяўкі на дызайн, вёрстку і frontend-распрацоўку, а таксама праекты поўнага цыкла — ад даследавання да запушчанага прадукту.',
  },
  email: 'verbapho@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vera-bakerava-7a1022a1/',
  telegram: 'https://t.me/verabakea',
  resumeUrl: '/resume.pdf',
  roles: {
    en: ['Product Designer (UX/UI)', 'Frontend Developer'],
    ru: ['Продуктовый дизайнер (UX/UI)', 'Frontend-разработчик'],
    be: ['Прадуктовы дызайнер (UX/UI)', 'Frontend-распрацоўшчык'],
  },
  location: {
    en: 'Batumi, Georgia / Minsk, Belarus',
    ru: 'Батуми, Грузия / Минск, Беларусь',
    be: 'Батумі, Грузія / Мінск, Беларусь',
  },
  languages: {
    en: 'Russian/Belarusian — native, English — B2, German — A2',
    ru: 'Русский/белорусский — родные, английский — B2, немецкий — A2',
    be: 'Руская/беларуская — родныя, англійская — B2, нямецкая — A2',
  },
  experienceSummary: {
    en: 'Across UX/UI product design and frontend development, from design systems to shipped web applications.',
    ru: 'UX/UI-дизайн продуктов и frontend-разработка — от дизайн-систем до запущенных веб-приложений.',
    be: 'UX/UI-дызайн прадуктаў і frontend-распрацоўка — ад дызайн-сістэм да запушчаных вэб-дадаткаў.',
  },
  about: {
    paragraphs: {
      en: [
        'I enjoy turning complex ideas into products people can actually use. My process combines product discovery, UX/UI design, design systems, and frontend implementation, allowing concepts to quickly become testable MVPs. I believe thoughtful design should not only look good but also make complex workflows feel simple and intuitive.',
        'You can work with me in three ways: design only — research, UX/UI, a design system and a Figma prototype; frontend only — a responsive, accessible React/TypeScript build of your design or mine; or the full cycle — a turnkey product from discovery and design to frontend, launch, SEO and analytics.',
        'You can order a landing page, a business card website, a portfolio website or a web app from me — I’ll handle the whole range of work: from research and design to frontend development, launch, SEO and analytics setup.',
      ],
      ru: [
        'Мне нравится превращать сложные идеи в продукты, которыми действительно удобно пользоваться. Мой процесс объединяет product discovery, UX/UI-дизайн, дизайн-системы и frontend-разработку, поэтому концепции быстро становятся MVP, готовыми к тестированию. Я считаю, что продуманный дизайн должен не только хорошо выглядеть, но и делать сложные процессы простыми и интуитивными.',
        'Со мной можно работать в трёх форматах: только дизайн — исследование, UX/UI, дизайн-система и прототип в Figma; только вёрстка и frontend — адаптивная и доступная реализация на React/TypeScript по вашему или моему дизайну; или полный цикл — продукт под ключ: от исследования и дизайна до frontend-разработки, запуска, SEO и аналитики.',
        'Вы можете заказать у меня лендинг, сайт-визитку, сайт-портфолио или веб-приложение — я выполню весь спектр работ: от исследования и дизайна до вёрстки, запуска, SEO и подключения аналитики.',
      ],
      be: [
        'Мне падабаецца ператвараць складаныя ідэі ў прадукты, якімі сапраўды зручна карыстацца. Мой працэс аб’ядноўвае product discovery, UX/UI-дызайн, дызайн-сістэмы і frontend-распрацоўку, таму канцэпцыі хутка становяцца MVP, гатовымі да тэсціравання. Я лічу, што прадуманы дызайн павінен не толькі добра выглядаць, але і рабіць складаныя працэсы простымі і інтуітыўнымі.',
        'Са мной можна працаваць у трох фарматах: толькі дызайн — даследаванне, UX/UI, дызайн-сістэма і прататып у Figma; толькі вёрстка і frontend — адаптыўная і даступная рэалізацыя на React/TypeScript па вашым або маім дызайне; або поўны цыкл — прадукт пад ключ: ад даследавання і дызайну да frontend-распрацоўкі, запуску, SEO і аналітыкі.',
        'Вы можаце замовіць у мяне лэндынг, сайт-візітку, сайт-партфоліа або вэб-дадатак — я выканаю ўвесь спектр работ: ад даследавання і дызайну да вёрсткі, запуску, SEO і падключэння аналітыкі.',
      ],
    },
  },
};
