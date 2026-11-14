// Languages the interface is translated into. To add one, add it here and create src/i18n/<id>.ts
// (see docs/translations.md). The default locale keeps the unprefixed URLs. A `complete` locale must translate
// every interface string (npm test checks it); a new one can start partial and fall back to English.
export const LOCALES = {
  en: { name: 'English', lang: 'en', og: 'en_US', complete: true },
  'pt-br': { name: 'Português (Brasil)', lang: 'pt-BR', og: 'pt_BR', complete: true },
} as const;

export type Locale = keyof typeof LOCALES;
export const DEFAULT_LOCALE: Locale = 'en';
export const localeIds = Object.keys(LOCALES) as Locale[];
export const isLocale = (s: unknown): s is Locale => typeof s === 'string' && s in LOCALES;
