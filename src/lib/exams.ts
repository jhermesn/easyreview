// Exam logistics per cert, collected from each cert's AWS page and exam guide by scripts/guide-watch.mjs --update.
import data from '../data/exams.json';

export interface ExamFacts {
  source: string;
  category?: string;
  duration?: string;
  format?: string;
  cost?: string;
  testing?: string;
  languages?: string;
  guide?: string;
  passingScore?: string;
  scaledScore?: string;
  scoredQuestions?: string;
  unscoredQuestions?: string;
}

const exams = data.exams as Record<string, ExamFacts>;
export const examsRetrieved = data.retrieved;
export const examFacts = (certId: string): ExamFacts | undefined => exams[certId];
export const firstSentence = (text: string) => text.split(/\.\s/)[0].replace(/\.$/, '');
export const restAfterFirstSentence = (text: string) => text.split(/\.\s/).slice(1).join('. ');

// Short line for tooltips: "180 minutes · 300 USD".
export function examSummary(certId: string): string {
  const f = exams[certId];
  return f ? [f.duration, f.cost && firstSentence(f.cost)].filter(Boolean).join(' · ') : '';
}
