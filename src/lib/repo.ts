// The public repository, and its star count read once per build (every page shows it in the header).
import { githubApi } from './passed';

export const REPO = 'jhermesn/easyreview';
export const REPO_URL = `https://github.com/${REPO}`;

let cached: Promise<number | undefined> | undefined;
export const starCount = () =>
  (cached ??= githubApi(`repos/${REPO}`, process.env.GH_TOKEN)
    .then((r) => (typeof r.stargazers_count === 'number' ? r.stargazers_count : undefined))
    .catch((err) => {
      console.warn(`[stars] ${(err as Error).message}; showing the link without a count`);
      return undefined;
    }));

// 999, 1.2k, 12k
export const compactCount = (n: number) => (n < 1000 ? String(n) : `${Number((n / 1000).toFixed(n < 10_000 ? 1 : 0))}k`);
