import { GOLDEN_TRAIL, isTrail, type Cert } from './certs';
import { DEFAULT_LOCALE, localeIds, localePath, type Locale } from '../i18n';

export const absoluteUrl = (path: string, site: URL, locale: Locale = DEFAULT_LOCALE) => new URL(localePath(locale, path), site).href;

export const certFullName = (cert: Cert) => (isTrail(cert) ? cert.code : `AWS Certified ${cert.name} (${cert.code})`);

// schema.org BreadcrumbList: home, then each level down to the current page.
export function breadcrumbs(trail: { name: string; path: string }[], site: URL, locale: Locale = DEFAULT_LOCALE) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Easy Review', path: '/' }, ...trail].map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path, site, locale),
    })),
  };
}

// The site's author, as jhermesn.dev publishes him, so search engines join the two sites' structured data.
export const AUTHOR = { '@type': 'Person', '@id': 'https://jhermesn.dev#person', name: 'Jorge Hermes', url: 'https://jhermesn.dev/en/about/' };

// Which URL search engines should index for a page (`canonical`), and the locales whose copy of the same
// path is indexed in its own right (`alternates`, listed with hreflang only on the canonical page itself).
export interface Indexing {
  canonical: { path: string; locale: Locale };
  alternates: Locale[];
}

export const selfIndexing = (path: string, locale: Locale): Indexing => ({ canonical: { path, locale }, alternates: [...localeIds] });

// Pages whose main text is English in every locale (decks, guide coverage) point every locale at the English page.
export const englishIndexing = (path: string): Indexing => ({ canonical: { path, locale: DEFAULT_LOCALE }, alternates: [DEFAULT_LOCALE] });

// A unit's sections read the same under every cert that maps it, and the Golden Jacket trail shows all of them,
// so the trail's page is the one to index. A locale gets its own indexed copy only once the unit and all of its
// sections are translated (`translated` lists those locales); until then its page points at the English one.
export function unitIndexing(unitId: string, locale: Locale, translated: Locale[]): Indexing {
  const indexed = localeIds.filter((l) => l === DEFAULT_LOCALE || translated.includes(l));
  return {
    canonical: { path: `/${GOLDEN_TRAIL.id}/${unitId}/`, locale: indexed.includes(locale) ? locale : DEFAULT_LOCALE },
    alternates: indexed,
  };
}

export const isCanonicalPage = (indexing: Indexing, path: string, locale: Locale) =>
  indexing.canonical.locale === locale && indexing.canonical.path.replace(/\/$/, '') === path.replace(/\/$/, '');
