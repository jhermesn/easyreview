// "Who passed": people add src/content/passed/<github-login>.json by their own PR. Their name, description and
// photo come from GitHub, and their AWS Certifications from their public Credly badges, at build time.
// Shared by src/pages/passed.astro and scripts/verify-passed.mjs, so it imports nothing Vite-specific.
import { z } from 'astro/zod';
import { certs, credlyBadgeName, goldenJacketCerts, type Cert } from './certs.ts';

export const passedEntry = z
  .object({
    github: z.string().regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i, 'must be a GitHub login'),
    credly: z.string().regex(/^[a-z\d][a-z\d._-]{0,99}$/i, 'must be the username in credly.com/users/<username>'),
    linkedin: z.string().regex(/^https:\/\/(www\.)?linkedin\.com\/in\/[\w%-]+\/?$/, 'must look like https://www.linkedin.com/in/<you>').optional(),
    builder: z.string().regex(/^https:\/\/builder\.aws\.com\/community\/@[\w.-]+\/?$/, 'must look like https://builder.aws.com/community/@<you>').optional(),
  })
  .strict();
export type PassedEntry = z.infer<typeof passedEntry>;

const TIMEOUT_MS = 20000;
const AWS_ISSUER = 'Amazon Web Services Training and Certification';
const normalize = (s: string) => s.replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim().toLowerCase();

async function getJson(url: string, headers: Record<string, string> = {}) {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), headers: { 'user-agent': 'easyreview-passed', ...headers } });
  if (!res.ok) throw new Error(`${res.status} from ${new URL(url).host}`);
  return res.json();
}

export const githubApi = (path: string, token?: string) =>
  getJson(`https://api.github.com/${path}`, { accept: 'application/vnd.github+json', ...(token ? { authorization: `Bearer ${token}` } : {}) });

// Ownership proof: only the owner of a Credly account can put a link to a GitHub profile on it
// (its website or bio). A link the other way, from GitHub to Credly, anyone could add to their own profile.
export async function credlyLinksGithub(credly: string, login: string): Promise<boolean> {
  const { data } = await getJson(`https://www.credly.com/users/${credly}`, { accept: 'application/json' });
  const text = [data?.website_url, data?.bio].filter((v) => typeof v === 'string').join(' ');
  return [...text.matchAll(/github\.com\/([\w-]+)/gi)].some((m) => m[1].toLowerCase() === login.toLowerCase());
}

export interface Earned {
  cert: Cert;
  issued: string; // YYYY-MM-DD
  active: boolean;
}

// AWS Certification badges on a public Credly profile, matched to the certs this site knows (latest per cert).
// Only the fields needed here are read: Credly's `issued_to` can hold an email address.
export async function credlyAwsCerts(credly: string): Promise<Earned[]> {
  const byName = new Map(certs.map((c) => [normalize(credlyBadgeName(c)), c]));
  const latest = new Map<string, Earned>();
  for (let page = 1; page <= 10; page++) {
    const { data, metadata } = await getJson(`https://www.credly.com/users/${credly}/badges.json?page=${page}`);
    for (const b of data ?? []) {
      const issuers: string[] = b.badge_template?.issuer?.entities?.map((e: { entity?: { name?: string } }) => e.entity?.name) ?? [];
      const cert = byName.get(normalize(b.badge_template?.name ?? ''));
      if (!cert || b.state !== 'accepted' || !issuers.includes(AWS_ISSUER)) continue;
      const earned = { cert, issued: b.issued_at_date, active: !b.expires_at_date || new Date(b.expires_at_date) >= new Date() };
      const prev = latest.get(cert.id);
      if (!prev || earned.issued > prev.issued) latest.set(cert.id, earned);
    }
    if (!metadata?.total_pages || page >= metadata.total_pages) break;
  }
  return certs.flatMap((c) => (latest.has(c.id) ? [latest.get(c.id)!] : []));
}

// Tiers follow the Golden Jackets Brazil community, scaled to the current number of non-beta certs (12 today):
// all of them active, all of them once (some expired), 10-11, 7-9, then everyone else.
export const TIERS = [
  { id: 'golden', name: 'Golden Jackets', note: 'Every current AWS Certification, all active at once.' },
  { id: 'alumni', name: 'Alumni', note: 'Held every current AWS Certification; some have since expired.' },
  { id: 'challenger', name: 'Challengers', note: 'One or two certifications away from a Golden Jacket.' },
  { id: 'rising', name: 'Rising', note: 'Three to five certifications away from a Golden Jacket.' },
  { id: 'certified', name: 'Certified', note: 'AWS Certified and going for more.' },
] as const;
export type TierId = (typeof TIERS)[number]['id'];

export function tierOf(earned: Earned[]): TierId {
  const jacket = goldenJacketCerts().map((c) => c.id);
  const active = earned.filter((e) => e.active && jacket.includes(e.cert.id)).length;
  const ever = earned.filter((e) => jacket.includes(e.cert.id)).length;
  if (active === jacket.length) return 'golden';
  if (ever === jacket.length) return 'alumni';
  if (active >= jacket.length - 2) return 'challenger';
  if (active >= jacket.length - 5) return 'rising';
  return 'certified';
}
