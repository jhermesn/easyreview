// A cert's study path: ordered stages, each listing the units to learn in it. Files live in
// src/data/roadmaps/<cert>.json; every unit the cert's guide maps must appear in exactly one stage.
import type { Locale } from '../i18n';

export interface RoadmapStage {
  id: string;
  title: Partial<Record<Locale, string>> & { en: string };
  goal: Partial<Record<Locale, string>> & { en: string };
  units: string[];
}
export interface Roadmap {
  cert: string;
  stages: RoadmapStage[];
}

const files = import.meta.glob<Roadmap>('../data/roadmaps/*.json', { eager: true, import: 'default' });
export const getRoadmap = (certId: string): Roadmap | undefined => files[`../data/roadmaps/${certId}.json`];

// Units missing from the roadmap, listed twice, or not in the cert.
export function roadmapProblems(roadmap: Roadmap, certUnits: string[]): string[] {
  const listed = roadmap.stages.flatMap((s) => s.units);
  const known = new Set(certUnits);
  const problems = [
    ...certUnits.filter((u) => !listed.includes(u)).map((u) => `unit "${u}" is in no stage`),
    ...listed.filter((u, i) => listed.indexOf(u) !== i).map((u) => `unit "${u}" is in more than one stage`),
    ...listed.filter((u) => !known.has(u)).map((u) => `unit "${u}" is not in ${roadmap.cert}`),
  ];
  return [...new Set(problems)];
}

export const localized = (text: RoadmapStage['title'], locale: Locale) => text[locale] ?? text.en;
