import { describe, expect, it } from 'vitest';
import { sectionFitsCert } from './levels';

describe('sectionFitsCert', () => {
  it.each([
    ['foundational', 'foundational', true],
    ['foundational', 'associate', false],
    ['foundational', 'professional', false],
    ['associate', 'foundational', true],
    ['associate', 'associate', true],
    ['associate', 'professional', false],
    ['professional', 'professional', true],
    ['specialty', 'professional', true],
    ['business', 'associate', false],
  ] as const)('given a %s cert and a %s section, returns %s', (cert, section, expected) => {
    expect(sectionFitsCert(cert, section)).toBe(expected);
  });
});
