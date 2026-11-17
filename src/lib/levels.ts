import type { Level } from './certs';

export type SectionLevel = 'foundational' | 'associate' | 'professional';

const RANK: Record<Level, number> = { business: 0, foundational: 0, associate: 1, professional: 2, specialty: 2 };

// A section mapped by a lower-level exam keeps its notes there, but its flashcards drill at the section's
// own depth, so a cert's decks only take cards from sections at or below the exam's level.
export const cardsFitCert = (certLevel: Level, sectionLevel: SectionLevel): boolean => RANK[sectionLevel] <= RANK[certLevel];
