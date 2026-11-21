import type { Level } from './certs';

export type SectionLevel = 'foundational' | 'associate' | 'professional';

const RANK: Record<Level, number> = { business: 0, foundational: 0, associate: 1, professional: 2, specialty: 2 };

// A cert shows every card of every section its guide maps, so a guide may only map sections written at or
// below the exam's level: a deeper section brings cards the exam doesn't ask for.
export const sectionFitsCert = (certLevel: Level, sectionLevel: SectionLevel): boolean => RANK[sectionLevel] <= RANK[certLevel];

export const levelRank = (level: Level): number => RANK[level];
