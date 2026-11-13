// Fails when a card id that exists on the base branch is gone: readers' progress is stored against card ids.
// Usage: node scripts/check-card-ids.mjs <base ref>   (for example origin/main)
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';

const DIR = 'src/content/sections';
const base = process.argv[2];
if (!base) {
  console.error('usage: node scripts/check-card-ids.mjs <base ref>');
  process.exit(2);
}

const cardIds = (text) => (parse(/^---\n([\s\S]*?)\n---/.exec(text)?.[1] ?? '')?.cards ?? []).map((c) => c.id);
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const before = git('ls-tree', '-r', '--name-only', base, DIR)
  .split('\n')
  .filter((f) => f.endsWith('.md'))
  .flatMap((f) => cardIds(git('show', `${base}:${f}`)));
const now = new Set(
  readdirSync(DIR, { recursive: true }).map(String).filter((f) => f.endsWith('.md')).flatMap((f) => cardIds(readFileSync(`${DIR}/${f}`, 'utf8'))),
);

const gone = before.filter((id) => !now.has(id));
if (gone.length) {
  console.log(`${gone.length} card ids from ${base} are gone (reword a card instead of renaming or deleting it):\n  ${gone.join('\n  ')}`);
  process.exit(1);
}
console.log(`All ${before.length} card ids from ${base} are still there.`);
