// The public repository, and its star count read once per build (every page shows it in the header;
// src/lib/stars.ts refreshes it in the browser).
import { githubApi } from './passed';
import { REPO } from './stars';

export const REPO_URL = `https://github.com/${REPO}`;

let cached: Promise<number | undefined> | undefined;
export const starCount = () =>
  (cached ??= githubApi(`repos/${REPO}`, process.env.GH_TOKEN)
    .then((r) => (typeof r.stargazers_count === 'number' ? r.stargazers_count : undefined))
    .catch((err) => {
      console.warn(`[stars] ${(err as Error).message}; showing the link without a count`);
      return undefined;
    }));
