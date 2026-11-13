// Verifies entries on the "Who passed" wall (src/content/passed/<github-login>.json):
//   1. the entry matches the schema, its file name is the GitHub login, and in a PR it is the PR author's own (PR_AUTHOR);
//   2. the Credly profile (website or bio) links that GitHub profile, which only the Credly owner can do;
//   3. the public Credly profile shows at least one active AWS Certification.
// Usage: node scripts/verify-passed.mjs [files...]   (no files: every entry; exit 1 when one fails)
// Env: PR_AUTHOR (GitHub login that opened the PR).
import { readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { credlyAwsCerts, credlyLinksGithub, passedEntry } from '../src/lib/passed.ts';

const DIR = 'src/content/passed';

async function verify(file) {
  const login = basename(file, '.json');
  let raw;
  try {
    raw = JSON.parse(readFileSync(file, 'utf8'));
  } catch (err) {
    return [`not valid JSON: ${err.message}`];
  }
  const parsed = passedEntry.safeParse(raw);
  if (!parsed.success) return parsed.error.issues.map((i) => `${i.path.join('.') || 'entry'}: ${i.message}`);
  const entry = parsed.data;
  if (entry.github.toLowerCase() !== login.toLowerCase()) return [`"github" must equal the file name (${login})`];
  if (process.env.PR_AUTHOR && process.env.PR_AUTHOR.toLowerCase() !== login.toLowerCase())
    return [`only @${login} can add or change this entry (this PR is from @${process.env.PR_AUTHOR})`];
  if (!(await credlyLinksGithub(entry.credly, login)))
    return [`the Credly profile ${entry.credly} must link https://github.com/${login} (in its website or bio)`];
  const earned = await credlyAwsCerts(entry.credly);
  if (!earned.some((e) => e.active)) return [`no active AWS Certification badge on Credly profile ${entry.credly}`];
  return [];
}

const files = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => join(DIR, f));
let failed = false;
for (const file of files) {
  const problems = await verify(file).catch((err) => [`could not verify: ${err.message}`]);
  console.log(problems.length ? `FAIL ${file}\n  ${problems.join('\n  ')}` : `ok   ${file}`);
  failed ||= problems.length > 0;
}
if (!files.length) console.log('No entries yet.');
process.exit(failed ? 1 : 0);
