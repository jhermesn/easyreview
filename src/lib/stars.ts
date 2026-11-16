// The star count shown next to "Star" in the header and footer. The build writes the count it read then
// (src/lib/repo.ts), so the page works without JavaScript; each visit refreshes it from the GitHub API once
// per browser session. The API limit is per visitor IP, far above one call per session.
export const REPO = 'jhermesn/easyreview';
const SESSION_KEY = 'easyreview:stars:v1';

// 999, 1.2k, 12k
export const compactCount = (n: number) => (n < 1000 ? String(n) : `${Number((n / 1000).toFixed(n < 10_000 ? 1 : 0))}k`);

function cachedCount(): number | undefined {
  try {
    const n = Number(sessionStorage.getItem(SESSION_KEY) ?? NaN);
    return Number.isInteger(n) && n >= 0 ? n : undefined;
  } catch {
    return undefined;
  }
}

async function fetchCount(): Promise<number | undefined> {
  const cached = cachedCount();
  if (cached !== undefined) return cached;
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, { headers: { accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(5000) });
    const n = res.ok ? (await res.json()).stargazers_count : undefined;
    if (!Number.isInteger(n) || n < 0) return undefined;
    try {
      sessionStorage.setItem(SESSION_KEY, String(n));
    } catch {
      // Unavailable storage: the next page load asks again.
    }
    return n;
  } catch {
    // Offline, blocked or rate limited: keep the count from the build.
    return undefined;
  }
}

// <b data-stars data-one="star" data-many="stars"> holds [data-stars-n] (the number) and [data-stars-word]
// (the word for screen readers). It is hidden when the build could not read the count.
function showStars(n: number) {
  document.querySelectorAll<HTMLElement>('[data-stars]').forEach((el) => {
    const number = el.querySelector('[data-stars-n]');
    const word = el.querySelector('[data-stars-word]');
    if (number) number.textContent = compactCount(n);
    if (word) word.textContent = ` ${n === 1 ? el.dataset.one : el.dataset.many}`;
    el.hidden = false;
  });
}

let fresh: Promise<number | undefined> | undefined;
export function refreshStars() {
  (fresh ??= fetchCount()).then((n) => {
    if (n !== undefined) showStars(n);
  });
}
