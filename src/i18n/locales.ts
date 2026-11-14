// Languages the interface is translated into. To add one, add it here and create src/i18n/<id>.ts
// (see docs/translations.md). The default locale keeps the unprefixed URLs.
export const LOCALES = {
  en: { name: 'English', lang: 'en', og: 'en_US' },
  'pt-br': { name: 'Português (Brasil)', lang: 'pt-BR', og: 'pt_BR' },
} as const;

export type Locale = keyof typeof LOCALES;
export const DEFAULT_LOCALE: Locale = 'en';
export const localeIds = Object.keys(LOCALES) as Locale[];
export const isLocale = (s: unknown): s is Locale => typeof s === 'string' && s in LOCALES;
