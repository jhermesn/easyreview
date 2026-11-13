// Moves saved progress between browsers as a text code: the storage keys as JSON,
// deflate-compressed and base64url-encoded, behind a version prefix.
import { KEYS, readJson, writeJson } from './storage';

const PREFIX = 'ER1.';
type Saved = Partial<Record<keyof typeof KEYS, unknown>>;

async function pipe(bytes: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer());
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
const fromBase64Url = (s: string) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

export async function exportCode(): Promise<string> {
  const saved: Saved = {};
  for (const [name, key] of Object.entries(KEYS)) {
    const value = readJson<unknown>(key, null);
    if (value !== null) saved[name as keyof typeof KEYS] = value;
  }
  const json = new TextEncoder().encode(JSON.stringify(saved));
  return PREFIX + toBase64Url(await pipe(json, new CompressionStream('deflate-raw')));
}

// Replaces this browser's progress with the code's. Throws on anything that isn't a code from this site.
export async function importCode(code: string): Promise<void> {
  const trimmed = code.replace(/\s+/g, '');
  if (!trimmed.startsWith(PREFIX)) throw new Error('This is not an Easy Review progress code.');
  let saved: unknown;
  try {
    const bytes = await pipe(fromBase64Url(trimmed.slice(PREFIX.length)), new DecompressionStream('deflate-raw'));
    saved = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error('The code is incomplete or damaged. Copy it again.');
  }
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) throw new Error('The code holds no progress.');
  const entries = Object.entries(saved).filter(([name, value]) => name in KEYS && value && typeof value === 'object');
  if (!entries.length) throw new Error('The code holds no progress.');
  for (const key of Object.values(KEYS)) localStorage.removeItem(key);
  for (const [name, value] of entries) writeJson(KEYS[name as keyof typeof KEYS], value);
}
