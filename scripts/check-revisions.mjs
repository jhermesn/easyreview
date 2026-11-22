// Lists sections whose facts or card answers changed since the base ref without a new `revised` entry, so the
// author decides whether the change is material (readers who studied it must re-read: add `revised`) or
// editorial (a typo or rewording: leave it). It never fails; in GitHub Actions it annotates the pull request.
// Usage: node scripts/check-revisions.mjs <base ref> [head ref]   (head defaults to the working tree)
import { execFileSync } from 'node:child_process';
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';

const DIR = 'src/content/sections';
const [base, head] = process.argv.slice(2);
if (!base) {
  console.error('usage: node scripts/check-revisions.mjs <base ref> [head ref]');
  process.exit(2);
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const frontMatter = (text) => parse(/^---\n([\s\S]*?)\n---/.exec(text ?? '')?.[1] ?? '') ?? {};
const read = (ref, file) => {
  if (ref) return git('ls-tree', '--name-only', ref, file).trim() ? git('show', `${ref}:${file}`) : undefined;
  return existsSync(file) ? readFileSync(file, 'utf8') : undefined;
};
const byId = (items = []) => new Map(items.map((x) => [x.id, x]));
const revisionKeys = (data) => new Set((data.revised ?? []).map((r) => `${r.date}|${r.note}`));

// Facts whose text or source changed or that were removed, and cards whose question or answer changed.
function materialChanges(before, after) {
  const facts = byId(after.facts);
  const cards = byId(after.cards);
  return {
    facts: (before.facts ?? []).filter((f) => !facts.has(f.id) || facts.get(f.id).text !== f.text || facts.get(f.id).source !== f.source).map((f) => f.id),
    cards: (before.cards ?? []).filter((c) => cards.has(c.id) && (cards.get(c.id).q !== c.q || cards.get(c.id).a !== c.a)).map((c) => c.id),
  };
}

const changed = git('diff', '--name-only', '--diff-filter=M', base, ...(head ? [head] : []), '--', DIR)
  .split('\n')
  .filter((f) => f.endsWith('.md'));
const findings = [];
for (const file of changed) {
  const before = frontMatter(read(base, file));
  const after = frontMatter(read(head, file));
  const { facts, cards } = materialChanges(before, after);
  if (!facts.length && !cards.length) continue;
  const old = revisionKeys(before);
  if ([...revisionKeys(after)].some((k) => !old.has(k))) continue;
  findings.push({ file, facts, cards });
}

if (!findings.length) {
  console.log('No fact or card answer changed without a revised entry.');
  process.exit(0);
}
console.log(`${findings.length} sections changed facts or card answers with no new revised entry. If a change is material, add one (docs/content.md#revisions):`);
const summary = [];
for (const { file, facts, cards } of findings) {
  const what = [facts.length && `facts ${facts.join(', ')}`, cards.length && `cards ${cards.join(', ')}`].filter(Boolean).join('; ');
  console.log(`  ${file}: ${what}`);
  if (process.env.GITHUB_ACTIONS) console.log(`::notice file=${file}::Changed ${what}. Material change? Add a revised entry with cards: [${cards.join(', ')}].`);
  summary.push(`- \`${file}\`: ${what}`);
}
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Changed without a revised entry\n\n${summary.join('\n')}\n`);
