import { describe, expect, it } from 'vitest';
import { englishIndexing, isCanonicalPage, selfIndexing, unitIndexing } from './seo';

describe('unitIndexing', () => {
  it('given an untranslated unit, when read in Portuguese, then it points at the English trail page', () => {
    expect(unitIndexing('s3', 'pt-br', [])).toEqual({ canonical: { path: '/golden-jacket/s3/', locale: 'en' }, alternates: ['en'] });
  });

  it('given a translated unit, when read in Portuguese, then the Portuguese trail page is indexed with hreflang', () => {
    expect(unitIndexing('s3', 'pt-br', ['pt-br'])).toEqual({ canonical: { path: '/golden-jacket/s3/', locale: 'pt-br' }, alternates: ['en', 'pt-br'] });
  });

  it('given a single cert page, when checked, then it is not the canonical page', () => {
    expect(isCanonicalPage(unitIndexing('s3', 'en', []), '/saa-c03/s3/', 'en')).toBe(false);
  });

  it('given the trail page, when checked, then it is the canonical page', () => {
    expect(isCanonicalPage(unitIndexing('s3', 'en', []), '/golden-jacket/s3/', 'en')).toBe(true);
  });
});

describe('isCanonicalPage', () => {
  const cases = [
    { name: 'own page with a trailing slash', indexing: selfIndexing('/passed/', 'pt-br'), path: '/passed', locale: 'pt-br' as const, expected: true },
    { name: 'English-only page read in Portuguese', indexing: englishIndexing('/saa-c03/flashcards/'), path: '/saa-c03/flashcards/', locale: 'pt-br' as const, expected: false },
    { name: 'English-only page read in English', indexing: englishIndexing('/saa-c03/flashcards/'), path: '/saa-c03/flashcards/', locale: 'en' as const, expected: true },
  ];
  for (const c of cases) {
    it(`given the ${c.name}, then canonical is ${c.expected}`, () => {
      expect(isCanonicalPage(c.indexing, c.path, c.locale)).toBe(c.expected);
    });
  }
});
