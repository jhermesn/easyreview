import { describe, expect, it } from 'vitest';
import { goldenJacketCerts, type Cert } from './certs';
import { passedEntry, tierOf, type Earned } from './passed';

const all = goldenJacketCerts();
const earned = (count: number, active = true): Earned[] => all.slice(0, count).map((cert: Cert) => ({ cert, issued: '2026-01-01', active }));

describe('tierOf', () => {
  it.each([
    [all.length, true, 'golden'],
    [all.length, false, 'alumni'],
    [all.length - 1, true, 'challenger'],
    [all.length - 2, true, 'challenger'],
    [all.length - 3, true, 'rising'],
    [all.length - 5, true, 'rising'],
    [all.length - 6, true, 'certified'],
    [1, true, 'certified'],
  ])('%i certs (active: %s) is %s', (count, active, tier) => {
    expect(tierOf(earned(count, active))).toBe(tier);
  });
});

describe('passedEntry', () => {
  it('accepts a minimal entry', () => {
    expect(passedEntry.safeParse({ github: 'octocat', credly: 'octo-cat' }).success).toBe(true);
  });

  it.each([
    [{ github: 'octocat' }],
    [{ github: '-bad', credly: 'x' }],
    [{ github: 'octocat', credly: 'x', linkedin: 'https://example.com/me' }],
    [{ github: 'octocat', credly: 'x', extra: true }],
  ])('rejects %j', (entry) => {
    expect(passedEntry.safeParse(entry).success).toBe(false);
  });
});
