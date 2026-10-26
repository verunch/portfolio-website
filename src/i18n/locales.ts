export const LOCALES = ['en', 'ru', 'be'] as const;

export type Locale = (typeof LOCALES)[number];

// Short label shown in the language switcher.
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU',
  be: 'BE',
};

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  be: 'Беларуская',
};

// Content that varies by language. A plain string is used as-is in every
// locale (brand names like "DocAssistant" never get translated).
export type Localized<T = string> = T | Record<Locale, T>;

export function resolveLocalized<T>(value: Localized<T>, locale: Locale): T {
  if (value !== null && typeof value === 'object' && !Array.isArray(value) && 'en' in value) {
    return (value as Record<Locale, T>)[locale];
  }
  return value as T;
}
