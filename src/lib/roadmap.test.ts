import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { localized, roadmapProblems, type Roadmap } from './roadmap';

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));

// The units a cert shows are the units of the sections its guide maps.
function guideUnits(cert: string): string[] {
  const guide = read(`src/data/guides/${cert}.json`);
  const sections: string[] = [
    ...guide.domains.flatMap((d: any) => d.tasks.flatMap((t: any) => t.items.flatMap((i: any) => i.sections))),
    ...(guide.services ?? []).flatMap((c: any) => c.services.flatMap((s: any) => s.sections ?? [])),
  ];
  return [...new Set(sections.map((s) => s.split('/')[0]))];
}

describe('roadmaps', () => {
  for (const file of readdirSync('src/data/roadmaps')) {
    const roadmap: Roadmap = read(`src/data/roadmaps/${file}`);
    it(`${roadmap.cert} lists every unit of its guide exactly once`, () => {
      expect(roadmapProblems(roadmap, guideUnits(roadmap.cert))).toEqual([]);
    });
    it(`${roadmap.cert} has a title and goal in every stage`, () => {
      expect(roadmap.stages.every((s) => s.title.en && s.goal.en && s.units.length)).toBe(true);
    });
  }
});

describe('roadmapProblems', () => {
  const roadmap: Roadmap = { cert: 'x', stages: [{ id: 'a', title: { en: 'A' }, goal: { en: 'g' }, units: ['iam', 'vpc', 'iam', 'nope'] }] };

  it('reports missing, repeated and unknown units', () => {
    expect(roadmapProblems(roadmap, ['iam', 'vpc', 's3'])).toEqual([
      'unit "s3" is in no stage',
      'unit "iam" is in more than one stage',
      'unit "nope" is not in x',
    ]);
  });

  it('falls back to English for a missing translation', () => {
    expect(localized({ en: 'Networking' }, 'pt-br')).toBe('Networking');
  });
});
