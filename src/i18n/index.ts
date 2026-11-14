// Interface strings and locale-aware links. A key missing from a translation falls back to English,
// so a partial translation still renders. Strings use {name} placeholders.
import { withBase } from '../lib/format';
import en, { type Key } from './en';
import ptBr from './pt-br';
import { DEFAULT_LOCALE, LOCALES, isLocale, localeIds, type Locale } from './locales';

export { DEFAULT_LOCALE, LOCALES, isLocale, localeIds, type Locale, type Key };

export const dictionaries: Record<Locale, Partial<Record<Key, string>>> = { en, 'pt-br': ptBr };

export type T = (key: Key, vars?: Record<string, string | number>) => string;

export function useTranslations(locale: Locale): T {
  const dict = dictionaries[locale];
  return (key, vars) => {
    const text = dict[key] ?? en[key];
    return vars ? text.replace(/\{(\w+)\}/g, (m, name: string) => (name in vars ? String(vars[name]) : m)) : text;
  };
}

// The locale a page renders in, from Astro.currentLocale or the [...lang] route param.
export const localeOf = (value: string | undefined): Locale => (isLocale(value) ? value : DEFAULT_LOCALE);

// "/dop-c02" -> "/easyreview/dop-c02" in English, "/easyreview/pt-br/dop-c02" in Portuguese.
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return withBase(locale === DEFAULT_LOCALE ? clean : `/${locale}${clean === '/' ? '/' : clean}`);
}

// A page path without the base and locale prefix, so it can be rebuilt for another locale.
export function stripLocale(pathname: string): string {
  const base = withBase('/').replace(/\/$/, '');
  let rest = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const first = rest.split('/')[1];
  if (isLocale(first) && first !== DEFAULT_LOCALE) rest = rest.slice(first.length + 1);
  return rest || '/';
}

// getStaticPaths entries for every locale: { lang: undefined } is the default locale at the root.
export function localeParams<P extends Record<string, string | undefined>, Props>(paths: { params?: P; props?: Props }[] = [{}]) {
  return localeIds.flatMap((locale) =>
    paths.map((p) => ({ params: { ...(p.params ?? ({} as P)), lang: locale === DEFAULT_LOCALE ? undefined : locale }, props: { ...(p.props ?? ({} as Props)), locale } })),
  );
}

// In the browser: the page's locale comes from <html data-locale>.
export const clientT = (): T => useTranslations(localeOf(document.documentElement.dataset.locale));
