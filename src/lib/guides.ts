import { unitIdOf, type CertView, type Section } from './content';

// Exam guide outlines live in src/data/guides/<cert>.json. Each knowledge/skill item lists the
// section ids ("<unit>/<slug>") that cover it. Each in-scope service names the unit about it, or,
// for a service without its own unit, the sections that cover it.
export interface GuideItem { id: string; kind: 'knowledge' | 'skill'; text: string; sections: string[] }
export interface GuideTask { id: string; title: string; items: GuideItem[] }
export type GuideService = { name: string; unit: string } | { name: string; sections: string[] };
export interface Guide {
  cert: string;
  source: string;
  retrieved: string;
  domains: { id: string; name: string; tasks: GuideTask[] }[];
  concepts: string[];
  services: { category: string; services: GuideService[] }[];
}

const files = import.meta.glob<Guide>('../data/guides/*.json', { eager: true, import: 'default' });

export function getGuide(certId: string): Guide | undefined {
  return Object.values(files).find((g) => g.cert === certId);
}

// The cert's sections that cover each in-scope service.
export function servicesCoverage(guide: Guide, view: CertView) {
  const covers = (s: GuideService) => (x: Section) => ('unit' in s ? unitIdOf(x) === s.unit : s.sections.includes(x.id));
  return guide.services.map((cat) => ({
    category: cat.category,
    services: cat.services.map((s) => ({ name: s.name, sections: view.sections.filter(covers(s)) })),
  }));
}

export function guideProblems(guide: Guide, view: CertView): string[] {
  const problems = [...view.missing];
  for (const d of guide.domains)
    for (const task of d.tasks)
      for (const item of task.items) if (!item.sections.length) problems.push(`${item.id} maps to no section`);
  for (const cat of servicesCoverage(guide, view))
    for (const s of cat.services) if (!s.sections.length) problems.push(`service "${s.name}" has no section in this cert`);
  return problems;
}
