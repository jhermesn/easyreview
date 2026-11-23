import { describe, expect, it } from 'vitest';
import { revisionTime } from './revisions';

const day = new Date('2026-11-19T00:00:00Z');
const endOfDay = Date.parse('2026-11-19T23:59:59.999Z');

describe('revisionTime', () => {
  it('counts a past revision from the end of its UTC day', () => {
    expect(revisionTime(day, Date.parse('2026-11-25T10:00:00Z'))).toBe(endOfDay);
  });

  it('counts a revision dated on the build day from the build time', () => {
    const builtAt = Date.parse('2026-11-19T03:00:00Z');
    expect(revisionTime(day, builtAt)).toBe(builtAt);
  });
});
