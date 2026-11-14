// Lists dated content whose date has just passed, such as "ends on January 1, 2027", so a retirement or
// end-of-support note gets rewritten once it happens. The weekly content health check runs it; the window
// is a little longer than a week so a date is reported at least once even if a run is skipped.
// Usage: node scripts/date-watch.mjs [--days N] [--today YYYY-MM-DD]   exit 1 when something is due
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DATE = new RegExp(`\\b(${MONTHS.join('|')}) (\\d{1,2}), (20\\d\\d)\\b`, 'g');
const ROOTS = ['src/content/sections', 'src/content/glossary', 'src/content/units'];

const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const days = Number(arg('--days') ?? 8);
const today = arg('--today') ? new Date(`${arg('--today')}T00:00:00Z`) : new Date();
const from = new Date(today.getTime() - days * 86_400_000);

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));

const due = [];
for (const file of ROOTS.flatMap(walk).filter((f) => /\.(md|json)$/.test(f))) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(DATE)) {
      const date = new Date(Date.UTC(Number(m[3]), MONTHS.indexOf(m[1]), Number(m[2])));
      if (date > from && date <= today) due.push({ file, line: i + 1, date: m[0], text: line.trim().slice(0, 160) });
    }
  });
}

if (!due.length) {
  console.log(`No dated content passed in the last ${days} days.`);
} else {
  console.log(`${due.length} dated lines passed in the last ${days} days. Rewrite them in the past tense, or update them to what AWS did:\n`);
  for (const d of due) console.log(`- \`${d.file}:${d.line}\` (${d.date}): ${d.text}`);
  process.exitCode = 1;
}
