// Everything the site remembers lives in this browser's localStorage, under these keys.
// Storage can be unavailable (private mode, blocked site data); reads then return the fallback
// and writes are skipped, so the page still works for the current visit.
export const KEYS = {
  known: 'easyreview:known:v1', // section id -> marked-at time
  progress: 'easyreview:progress:v1', // card id -> flashcard results
  recent: 'easyreview:recent:v1', // last cert page opened
  complete: 'easyreview:complete:v1', // cert id -> every topic of it marked known
} as const;

export function readJson<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Unavailable storage: keep working without persistence.
  }
}
