// Spaced repetition in the style of Anki (a simplified SM-2). Pure functions: no DOM, no storage.
export type Grade = 'again' | 'hard' | 'good' | 'easy';
export const GRADES: Grade[] = ['again', 'hard', 'good', 'easy'];

export interface CardState {
  due: number; // ms timestamp when the card should be seen again
  ivl: number; // interval in days; 0 while learning
  ease: number; // multiplier for the next interval
  reps: number;
  lapses: number;
  last: 'ok' | 'miss';
  at: number; // last review
}

const MIN = 60_000;
const DAY = 86_400_000;
const START_EASE = 2.5;
const MIN_EASE = 1.3;

// Progress saved before scheduling existed ({ ok, miss, last, at }) becomes a reviewed or relearning card.
export function normalize(raw: unknown, now = Date.now()): CardState | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const r = raw as Partial<CardState> & { ok?: number; miss?: number };
  if (typeof r.due === 'number' && typeof r.ivl === 'number') return r as CardState;
  const at = r.at ?? now;
  const ok = r.last === 'ok';
  return { due: ok ? at + DAY : now, ivl: ok ? 1 : 0, ease: START_EASE, reps: (r.ok ?? 0) + (r.miss ?? 0), lapses: r.miss ?? 0, last: ok ? 'ok' : 'miss', at };
}

export function schedule(prev: CardState | undefined, grade: Grade, now = Date.now()): CardState {
  const s = prev ?? { due: now, ivl: 0, ease: START_EASE, reps: 0, lapses: 0, last: 'miss', at: now };
  const next = { ...s, reps: s.reps + 1, at: now, last: grade === 'again' ? 'miss' : 'ok' } as CardState;
  const learning = s.ivl === 0;
  if (grade === 'again') {
    return { ...next, ivl: 0, lapses: s.lapses + (learning ? 0 : 1), ease: learning ? s.ease : Math.max(MIN_EASE, s.ease - 0.2), due: now + (learning ? 1 : 10) * MIN };
  }
  if (learning) {
    if (grade === 'hard') return { ...next, due: now + 6 * MIN };
    const ivl = grade === 'easy' ? 4 : 1;
    return { ...next, ivl, due: now + ivl * DAY };
  }
  // Each grade waits strictly longer than the one before it: hard < good < easy.
  const hard = Math.max(s.ivl, Math.round(s.ivl * 1.2));
  const good = Math.max(hard + 1, Math.round(s.ivl * s.ease));
  const easy = Math.max(good + 1, Math.round(s.ivl * s.ease * 1.3));
  const ivl = { hard, good, easy }[grade];
  const ease = grade === 'hard' ? Math.max(MIN_EASE, s.ease - 0.15) : grade === 'easy' ? s.ease + 0.15 : s.ease;
  return { ...next, ease, ivl, due: now + ivl * DAY };
}

// "1m", "6m", "1d", "3.2mo": what the button will schedule, shown before grading like Anki does.
// units: minute, hour, day, month, year suffixes in the reader's language.
export function describeDelay(ms: number, units: string[] = ['m', 'h', 'd', 'mo', 'y']): string {
  const [m, h, d, mo, y] = units;
  if (ms < 60 * MIN) return `${Math.max(1, Math.round(ms / MIN))}${m}`;
  if (ms < DAY - 30 * MIN) return `${Math.round(ms / (60 * MIN))}${h}`;
  const days = ms / DAY;
  if (days < 30) return `${Math.round(days)}${d}`;
  if (days < 365) return `${Number((days / 30).toFixed(1))}${mo}`;
  return `${Number((days / 365).toFixed(1))}${y}`;
}

export const isDue = (s: CardState | undefined, now = Date.now()) => !!s && s.due <= now;
export const isNew = (s: CardState | undefined) => !s;
export const isKnown = (s: CardState | undefined) => !!s && s.last === 'ok';
