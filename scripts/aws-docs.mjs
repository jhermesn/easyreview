// Shared helpers for scripts that read AWS documentation pages.
import { createHash } from 'node:crypto';

const TIMEOUT_MS = 20000;

export async function fetchPage(url, userAgent, retries = 2) {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), headers: { 'user-agent': userAgent } });
      if (res.ok) return await res.text();
      if (attempt >= retries || (res.status !== 429 && res.status < 500)) throw new Error(`${res.status} ${url}`);
    } catch (err) {
      if (attempt >= retries) throw err;
    }
    await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt + Math.random() * 1000));
  }
}

// The article body of a docs page, without the site's navigation, header and footer.
export function articleHtml(html) {
  return /<div id="main-col-body"[\s\S]*?(?=<div id="(?:main-col-footer|doc-conventions)"|<\/main>)/.exec(html)?.[0] ?? /<main[\s\S]*?<\/main>/.exec(html)?.[0] ?? html;
}

export function plainText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);
