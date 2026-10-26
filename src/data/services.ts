import type { Locale, Localized } from '../i18n/locales';

// Services & prices (/services). Prices follow the site language rather than
// a region picker or IP detection: EN shows the international price list,
// RU/BE the Belarus one. Only packaged services get a public "from" price —
// apps, SaaS and design systems are quoted after a brief, and the hourly
// rate is shared in conversation, never on the page.
export type PriceRegion = 'intl' | 'by';

export const PRICE_REGION_BY_LOCALE: Record<Locale, PriceRegion> = {
  en: 'intl',
  ru: 'by',
  be: 'by',
};

export type ServicePackage = {
  id: string;
  title: Localized;
  description: Localized;
  // Lower bound of the price range, in USD.
  priceFrom: Record<PriceRegion, number>;
  // Visually highlighted card (the most complete landing offer).
  featured?: boolean;
};

export const servicePackages: ServicePackage[] = [
  {
    id: 'landing-turnkey',
    title: { en: 'Turnkey landing page', ru: 'Лендинг под ключ', be: 'Лэндынг пад ключ' },
    description: {
      en: 'Design, development, launch on your hosting or domain, forms, basic SEO and analytics (GA4 / Yandex Metrica).',
      ru: 'Дизайн, вёрстка, размещение на хостинге или домене, формы, базовое SEO и аналитика (GA4 / Яндекс Метрика).',
      be: 'Дызайн, вёрстка, размяшчэнне на хостынгу або дамене, формы, базавае SEO і аналітыка (GA4 / Яндэкс Метрыка).',
    },
    priceFrom: { intl: 800, by: 350 },
    featured: true,
  },
  {
    id: 'business-card-site',
    title: { en: 'Business card website', ru: 'Сайт-визитка', be: 'Сайт-візітка' },
    description: {
      en: '3–5 pages, turnkey: design, development, launch, forms, basic SEO and analytics.',
      ru: '3–5 страниц под ключ: дизайн, вёрстка, размещение, формы, базовое SEO и аналитика.',
      be: '3–5 старонак пад ключ: дызайн, вёрстка, размяшчэнне, формы, базавае SEO і аналітыка.',
    },
    priceFrom: { intl: 1000, by: 450 },
  },
  {
    id: 'landing-design-dev',
    title: { en: 'Landing page design + development', ru: 'Дизайн + вёрстка лендинга', be: 'Дызайн + вёрстка лэндынга' },
    description: {
      en: 'A Figma layout and a responsive build of it — you host it yourself.',
      ru: 'Макет в Figma и адаптивная вёрстка по нему — размещение на вашей стороне.',
      be: 'Макет у Figma і адаптыўная вёрстка па ім — размяшчэнне на вашым баку.',
    },
    priceFrom: { intl: 550, by: 250 },
  },
  {
    id: 'landing-design',
    title: { en: 'Landing page design', ru: 'Дизайн лендинга', be: 'Дызайн лэндынга' },
    description: {
      en: '5–8 sections, desktop and mobile, delivered as a Figma layout.',
      ru: '5–8 блоков, десктоп и мобильная версия, макет в Figma.',
      be: '5–8 блокаў, дэсктоп і мабільная версія, макет у Figma.',
    },
    priceFrom: { intl: 350, by: 150 },
  },
  {
    id: 'landing-dev',
    title: { en: 'Landing page development', ru: 'Вёрстка лендинга', be: 'Вёрстка лэндынга' },
    description: {
      en: 'A responsive, accessible build from your finished design.',
      ru: 'Адаптивная и доступная вёрстка по вашему готовому макету.',
      be: 'Адаптыўная і даступная вёрстка па вашым гатовым макеце.',
    },
    priceFrom: { intl: 250, by: 120 },
  },
  {
    id: 'ux-audit',
    title: { en: 'UX audit', ru: 'UX-аудит', be: 'UX-аўдыт' },
    description: {
      en: 'A review of your website or app with a prioritised list of usability issues and fixes.',
      ru: 'Разбор сайта или приложения: проблемы юзабилити и приоритизированный список улучшений.',
      be: 'Разбор сайта або праграмы: праблемы юзабіліці і прыярытэзаваны спіс паляпшэнняў.',
    },
    priceFrom: { intl: 300, by: 120 },
  },
];

// Larger work — no public price, quoted after a brief.
export const onRequestServices: Localized<string[]> = {
  en: [
    'MVP of a web or mobile app (UX + UI, clickable prototype)',
    'Large app or SaaS product: UX research, information architecture, design system, all screens',
    'Design system / UI kit',
    'Web app screen design (10+ screens)',
  ],
  ru: [
    'MVP веб- или мобильного приложения (UX + UI, кликабельный прототип)',
    'Крупное приложение или SaaS-продукт: UX-исследование, информационная архитектура, дизайн-система, все экраны',
    'Дизайн-система / UI-kit',
    'Дизайн экранов веб-приложения (от 10 экранов)',
  ],
  be: [
    'MVP вэб- або мабільнай праграмы (UX + UI, клікабельны прататып)',
    'Буйная праграма або SaaS-прадукт: UX-даследаванне, інфармацыйная архітэктура, дызайн-сістэма, усе экраны',
    'Дызайн-сістэма / UI-kit',
    'Дызайн экранаў вэб-праграмы (ад 10 экранаў)',
  ],
};

// Same terms for both price lists.
export const serviceTerms: Localized<string[]> = {
  en: [
    '50% upfront, the rest on delivery. Large projects are paid in stages.',
    'Two rounds of revisions are included; further changes are billed hourly.',
    'Hosting, domain and paid plugins are paid by the client.',
    'Texts and photos are provided by the client; copywriting and content sourcing are quoted separately.',
    'Rush jobs: +30%.',
    '“Turnkey” covers landing pages and business card sites without complex logic — no CRM or payment integrations.',
  ],
  ru: [
    'Предоплата 50%, остаток после сдачи. Крупные проекты оплачиваются по этапам.',
    'В цену входят 2 раунда правок, дальнейшие правки оплачиваются почасово.',
    'Хостинг, домен и платные плагины оплачивает клиент.',
    'Тексты и фото предоставляет клиент. Копирайтинг и подбор контента считаются отдельно.',
    'За срочность +30%.',
    '«Под ключ» — это лендинги и визитки без сложной логики, без интеграций с CRM или оплатой.',
  ],
  be: [
    'Перадаплата 50%, астатак пасля здачы. Буйныя праекты аплачваюцца па этапах.',
    'У кошт уваходзяць 2 раўнды правак, далейшыя праўкі аплачваюцца пагадзінна.',
    'Хостынг, дамен і платныя плагіны аплачвае кліент.',
    'Тэксты і фота падае кліент. Капірайтынг і падбор кантэнту лічацца асобна.',
    'За тэрміновасць +30%.',
    '«Пад ключ» — гэта лэндынгі і візіткі без складанай логікі, без інтэграцый з CRM або аплатай.',
  ],
};

// How a project runs, step by step.
export const serviceProcess: Localized<string[]> = {
  en: ['Brief and estimate', 'Research and structure', 'Design in Figma', 'Development', 'Launch, SEO and analytics'],
  ru: ['Бриф и оценка', 'Исследование и структура', 'Дизайн в Figma', 'Вёрстка и разработка', 'Запуск, SEO и аналитика'],
  be: ['Брыф і ацэнка', 'Даследаванне і структура', 'Дызайн у Figma', 'Вёрстка і распрацоўка', 'Запуск, SEO і аналітыка'],
};
