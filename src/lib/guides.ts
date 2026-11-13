import type { CertView, Section, Unit } from './content';
import { escapeRe } from './format';

// Exam guide outlines live in src/data/guides/<cert>.json. Each knowledge/skill item lists the
// section ids ("<unit>/<slug>") that cover it; in-scope services are matched against section text.
export interface GuideItem { id: string; kind: 'knowledge' | 'skill'; text: string; sections: string[] }
export interface GuideTask { id: string; title: string; items: GuideItem[] }
export interface Guide {
  cert: string;
  source: string;
  retrieved: string;
  domains: { id: string; name: string; tasks: GuideTask[] }[];
  concepts: string[];
  services: { category: string; names: string[] }[];
}

const files = import.meta.glob<Guide>('../data/guides/*.json', { eager: true, import: 'default' });

export function getGuide(certId: string): Guide | undefined {
  return Object.values(files).find((g) => g.cert === certId);
}

// A guide service name matches its own short forms ("AWS Resource Access Manager (AWS RAM)" ->
// "Resource Access Manager", "RAM") plus the `names` of the unit that lists its main part.
function serviceAliases(name: string, units: Unit[]): string[] {
  const strip = (s: string) => s.replace(/^(Amazon|AWS)\s+/, '').trim();
  const m = /^(.*?)\s*\((.*)\)$/.exec(name);
  const main = m ? m[1] : name;
  const own = m ? [strip(m[1]), strip(m[2])] : [strip(name)];
  return [...own, ...(units.find((u) => u.data.names.includes(main))?.data.names ?? [])];
}

export function sectionText(s: Section): string {
  const d = s.data;
  return [
    d.title,
    s.body ?? '',
    ...d.facts.map((f) => f.text),
    ...d.cards.flatMap((c) => [c.q, c.a]),
    ...d.diagrams.flatMap((g) => [g.title, ...g.steps, ...g.nodes.flatMap((n) => [n.label, n.sub ?? '', n.info ?? ''])]),
  ].join('\n');
}

// Which of the cert's sections mention each in-scope service.
export function servicesCoverage(guide: Guide, view: CertView, units: Unit[]) {
  const texts = view.sections.map((s) => ({ section: s, text: sectionText(s) }));
  return guide.services.map((cat) => ({
    category: cat.category,
    services: cat.names.map((name) => {
      // Short all-caps aliases ("RAM", "EMR") match only in capitals.
      const patterns = serviceAliases(name, units).map((a) => new RegExp(`\\b${escapeRe(a)}\\b`, a.length <= 4 && a === a.toUpperCase() ? '' : 'i'));
      return { name, sections: texts.filter((t) => patterns.some((p) => p.test(t.text))).map((t) => t.section) };
    }),
  }));
}

export function guideProblems(guide: Guide, view: CertView, units: Unit[]): string[] {
  const problems = [...view.missing];
  for (const d of guide.domains)
    for (const task of d.tasks)
      for (const item of task.items) if (!item.sections.length) problems.push(`${item.id} maps to no section`);
  for (const cat of servicesCoverage(guide, view, units))
    for (const s of cat.services) if (!s.sections.length) problems.push(`service "${s.name}" is not mentioned in any section`);
  return problems;
}
