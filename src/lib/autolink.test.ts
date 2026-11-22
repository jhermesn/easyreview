import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { insidePhrase } from './autolink';

describe('insidePhrase', () => {
  const text = 'The grant remains Subject to the boundary; the token subject is checked.';
  const at = (word: string, from = 0) => text.indexOf(word, from);

  it('given a match inside a listed phrase, when checked, then it is skipped whatever the case', () => {
    expect(insidePhrase(text, at('Subject'), 7, ['subject to'])).toBe(true);
  });

  it('given the same word outside the phrase, when checked, then it still gets the tooltip', () => {
    expect(insidePhrase(text, at('subject'), 7, ['subject to'])).toBe(false);
  });

  it('given no phrases, when checked, then nothing is skipped', () => {
    expect(insidePhrase(text, at('Subject'), 7)).toBe(false);
  });
});

describe('glossary notIn phrases', () => {
  const dir = 'src/content/glossary';
  const terms = readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .flatMap((f) => (JSON.parse(readFileSync(`${dir}/${f}`, 'utf8')) as { term: string; aliases?: string[]; notIn?: string[] }[]).map((t) => ({ file: f, ...t })));

  it('given a notIn phrase, when the glossary loads, then the phrase contains the term or an alias', () => {
    const useless = terms.flatMap((t) =>
      (t.notIn ?? []).filter((p) => ![t.term, ...(t.aliases ?? [])].some((w) => p.toLowerCase().includes(w.toLowerCase()))).map((p) => `${t.file}: ${t.term} / ${p}`),
    );
    expect(useless).toEqual([]);
  });
});
