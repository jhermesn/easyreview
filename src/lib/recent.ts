// Remembers the last certification page the reader opened, so the home page can offer
// "Continue" and pages without a cert (home, search) can link straight back to it.
import { KEYS, readJson, writeJson } from './storage';
import { badgeUrl } from './badge';

export interface Recent {
  cert: string;
  code: string;
  path: string;
  title: string;
  at: number;
}

export function readRecent(): Recent | null {
  const value = readJson<Recent | null>(KEYS.recent, null);
  return value && typeof value.path === 'string' && value.path.startsWith('/') ? value : null;
}

// Record the current page when it belongs to a cert (Base.astro sets data-cert on <body>).
export function trackRecent() {
  const { cert, code, pageTitle } = document.body.dataset;
  if (!cert || !code) return;
  writeJson(KEYS.recent, { cert, code, path: location.pathname, title: pageTitle || 'Overview', at: Date.now() });
}

// Fill every [data-recent] block: links get the path, [data-recent-title]/[data-recent-code] get text,
// img[data-recent-badge] gets the badge. Blocks stay hidden when there is nothing to resume.
export function applyRecent() {
  const recent = readRecent();
  document.querySelectorAll<HTMLElement>('[data-recent]').forEach((el) => {
    if (!recent) { el.hidden = true; return; }
    el.hidden = false;
    if (el instanceof HTMLAnchorElement) el.href = recent.path;
    el.querySelectorAll<HTMLAnchorElement>('a[data-recent-link]').forEach((a) => (a.href = recent.path));
    el.querySelectorAll<HTMLElement>('[data-recent-title]').forEach((t) => (t.textContent = recent.title));
    el.querySelectorAll<HTMLElement>('[data-recent-code]').forEach((t) => (t.textContent = recent.code));
    el.querySelectorAll<HTMLImageElement>('img[data-recent-badge]').forEach((img) => { img.src = badgeUrl(recent.cert); img.dataset.badgeCert = recent.cert; });
  });
}
