import { describe, expect, it } from 'vitest';
import { compactCount } from './repo';

describe('compactCount', () => {
  it.each([
    [0, '0'],
    [999, '999'],
    [1000, '1k'],
    [1234, '1.2k'],
    [12_345, '12k'],
  ])('%i reads %s', (n, text) => {
    expect(compactCount(n)).toBe(text);
  });
});
