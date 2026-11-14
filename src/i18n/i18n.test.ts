import { describe, expect, it } from 'vitest';
import en from './en';
import { withBase } from '../lib/format';
import { dictionaries, localeIds, localePath, stripLocale, useTranslations } from '.';

const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe.each(localeIds.filter((l) => l !== 'en'))('%s dictionary', (locale) => {
  const dict = dictionaries[locale];

  it('only uses keys that exist in English', () => {
    expect(Object.keys(dict).filter((k) => !(k in en))).toEqual([]);
  });

  it('keeps every placeholder of the English text', () => {
    const wrong = Object.entries(dict).filter(([k, v]) => placeholders(v!).join() !== placeholders(en[k as keyof typeof en]).join());
    expect(wrong.map(([k]) => k)).toEqual([]);
  });
});

describe('useTranslations', () => {
  it('fills placeholders', () => {
    expect(useTranslations('en')('home.start', { code: 'DOP-C02' })).toBe('Start DOP-C02');
  });

  it('falls back to English for a missing key', () => {
    dictionaries['pt-br'] = { ...dictionaries['pt-br'] };
    delete dictionaries['pt-br']['nav.search'];
    expect(useTranslations('pt-br')('nav.search')).toBe('Search');
  });
});

describe('locale paths', () => {
  it.each([
    ['en', '/dop-c02', '/dop-c02'],
    ['pt-br', '/dop-c02', '/pt-br/dop-c02'],
    ['pt-br', '/', '/pt-br/'],
  ] as const)('%s %s -> base + %s', (locale, path, url) => {
    expect(localePath(locale, path)).toBe(withBase(url));
  });

  it.each(['/pt-br/dop-c02/s3', '/dop-c02/s3'])('strips the locale from base + %s', (url) => {
    expect(stripLocale(withBase(url))).toBe('/dop-c02/s3');
  });
});
