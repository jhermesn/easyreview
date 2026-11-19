import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';
import { certs } from './certs';
import { sectionFitsCert, type SectionLevel } from './levels';

// Each guide's `scenarios` names the reference architecture for every end-to-end design the exam asks about
// (docs/diagrams.md#reference-architectures). These checks keep that list and the guide mapping in step.

const UNIT = 'reference-architectures';
const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const sectionPath = (id: string) => `src/content/sections/${id}.md`;
const sectionLevel = (id: string): SectionLevel =>
  parse(readFileSync(sectionPath(id), 'utf8').slice(4).split('\n---\n')[0]).level ?? 'associate';

interface Scenario { title: string; items: string[]; section: string }

function itemSections(guide: any): Map<string, string[]> {
  const items = guide.domains.flatMap((d: any) => d.tasks.flatMap((t: any) => t.items));
  return new Map(items.map((i: any) => [i.id, i.sections]));
}

const guides = certs
  .filter((c) => existsSync(`src/data/guides/${c.id}.json`))
  .map((c) => ({ cert: c, guide: read(`src/data/guides/${c.id}.json`) }));

for (const { cert, guide } of guides) {
  const scenarios: Scenario[] = guide.scenarios ?? [];
  const sections = itemSections(guide);

  describe(`${cert.id} scenarios`, () => {
    it('lists at least one scenario', () => {
      expect(scenarios.length).toBeGreaterThan(0);
    });

    for (const s of scenarios) {
      it(`${s.section} exists`, () => {
        expect(existsSync(sectionPath(s.section))).toBe(true);
      });

      it(`${s.section} is written at or below the exam's level`, () => {
        expect(sectionFitsCert(cert.level, sectionLevel(s.section))).toBe(true);
      });

      it(`${s.section} is mapped into every item it lists`, () => {
        const unmapped = s.items.filter((item) => !(sections.get(item) ?? []).includes(s.section));
        expect(unmapped).toEqual([]);
      });
    }

    it(`maps no ${UNIT} section that its scenarios leave out`, () => {
      const listed = new Set(scenarios.map((s) => s.section));
      const mapped = [...sections.values()].flat().filter((id) => id.startsWith(`${UNIT}/`));
      expect([...new Set(mapped)].filter((id) => !listed.has(id))).toEqual([]);
    });
  });
}

describe(`${UNIT} unit`, () => {
  it('has no section that no scenario uses', () => {
    const used = new Set(guides.flatMap(({ guide }) => (guide.scenarios ?? []).map((s: Scenario) => s.section)));
    const all = readdirSync(`src/content/sections/${UNIT}`).filter((f) => f.endsWith('.md')).map((f) => `${UNIT}/${f.slice(0, -3)}`);
    expect(all.filter((id) => !used.has(id))).toEqual([]);
  });
});
