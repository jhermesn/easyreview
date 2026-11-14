import { describe, expect, it } from 'vitest';
import { describeDelay, normalize, schedule } from './srs';

const MIN = 60_000;
const DAY = 86_400_000;
const now = 1_000_000_000_000;

describe('schedule', () => {
  it('given a new card, when graded good, then it is due in one day', () => {
    expect(schedule(undefined, 'good', now)).toMatchObject({ ivl: 1, due: now + DAY, last: 'ok' });
  });

  it('given a new card, when graded again, then it comes back in one minute without a lapse', () => {
    expect(schedule(undefined, 'again', now)).toMatchObject({ ivl: 0, lapses: 0, due: now + MIN, last: 'miss' });
  });

  it('given a reviewed card, when forgotten, then it lapses and loses ease', () => {
    const reviewed = { due: now, ivl: 10, ease: 2.5, reps: 3, lapses: 0, last: 'ok' as const, at: now - 10 * DAY };
    expect(schedule(reviewed, 'again', now)).toMatchObject({ ivl: 0, lapses: 1, ease: 2.3, due: now + 10 * MIN });
  });

  it('given a reviewed card, then hard < good < easy', () => {
    const reviewed = { due: now, ivl: 1, ease: 1.3, reps: 1, lapses: 0, last: 'ok' as const, at: now };
    const [hard, good, easy] = (['hard', 'good', 'easy'] as const).map((g) => schedule(reviewed, g, now).ivl);
    expect(hard).toBeLessThan(good);
    expect(good).toBeLessThan(easy);
  });

  it('never drops ease below the minimum', () => {
    const reviewed = { due: now, ivl: 5, ease: 1.3, reps: 9, lapses: 4, last: 'ok' as const, at: now };
    expect(schedule(reviewed, 'hard', now).ease).toBe(1.3);
  });
});

describe('normalize', () => {
  it.each([null, undefined, 'x', 3])('rejects %s', (raw) => {
    expect(normalize(raw, now)).toBeUndefined();
  });

  it('turns an old { ok, miss } record into a scheduled card', () => {
    expect(normalize({ ok: 2, miss: 1, last: 'ok', at: now }, now)).toMatchObject({ reps: 3, lapses: 1, ivl: 1, due: now + DAY });
  });
});

describe('describeDelay', () => {
  it.each([
    [30_000, '1m'],
    [6 * MIN, '6m'],
    [3 * 60 * MIN, '3h'],
    [4 * DAY, '4d'],
    [96 * DAY, '3.2mo'],
    [730 * DAY, '2y'],
  ])('%i ms reads %s', (ms, text) => {
    expect(describeDelay(ms)).toBe(text);
  });

  it('uses the given unit labels', () => {
    expect(describeDelay(96 * DAY, ['min', 'h', 'd', 'mês', 'a'])).toBe('3.2mês');
  });
});
