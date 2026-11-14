import { beforeEach, describe, expect, it, vi } from 'vitest';
import { KEYS } from './storage';
import { exportCode, importCode } from './transfer';

beforeEach(() => {
  const store = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  });
});

describe('progress code', () => {
  it('round-trips every saved key', async () => {
    localStorage.setItem(KEYS.known, JSON.stringify({ 'codedeploy/agent-setup': 1 }));
    localStorage.setItem(KEYS.progress, JSON.stringify({ 'codedeploy-011': { due: 1, ivl: 3 } }));
    const code = await exportCode();
    localStorage.removeItem(KEYS.known);
    localStorage.removeItem(KEYS.progress);

    await importCode(code);

    expect(JSON.parse(localStorage.getItem(KEYS.known)!)).toEqual({ 'codedeploy/agent-setup': 1 });
    expect(JSON.parse(localStorage.getItem(KEYS.progress)!)).toEqual({ 'codedeploy-011': { due: 1, ivl: 3 } });
  });

  it('replaces progress the code does not hold', async () => {
    localStorage.setItem(KEYS.known, JSON.stringify({ a: 1 }));
    const code = await exportCode();
    localStorage.setItem(KEYS.progress, JSON.stringify({ stale: {} }));

    await importCode(code);

    expect(localStorage.getItem(KEYS.progress)).toBeNull();
  });

  it.each([
    ['not a code', 'transfer.error.notCode'],
    ['ER1.@@@', 'transfer.error.damaged'],
  ])('rejects %j', async (code, message) => {
    await expect(importCode(code)).rejects.toThrow(message);
  });

  it('rejects a code with no progress and leaves storage alone', async () => {
    localStorage.setItem(KEYS.known, JSON.stringify({ a: 1 }));
    const empty = await (async () => {
      localStorage.removeItem(KEYS.known);
      const c = await exportCode();
      localStorage.setItem(KEYS.known, JSON.stringify({ a: 1 }));
      return c;
    })();

    await expect(importCode(empty)).rejects.toThrow('transfer.error.empty');
    expect(localStorage.getItem(KEYS.known)).toBe('{"a":1}');
  });
});
