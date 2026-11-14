// Section checks the schema can't express: card fact references, the full body and diagram layout.
// The schema itself (ids, source URLs, diagram edges) is checked by `npm run build` (src/content.config.ts).
// Usage: node scripts/lint-content.mjs [src/content/sections/<unit>/<slug>.md ...]   (default: every section,
// then every translation in src/content/i18n, see scripts/translations.mjs)
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';
import { lintDiagram, withDefaults } from '../src/lib/diagram.ts';
import { checkTranslations } from './translations.mjs';

const DIR = 'src/content/sections';

function check(file) {
  const problems = [];
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(readFileSync(file, 'utf8'));
  if (!match) return ['missing --- front matter'];
  let data;
  try {
    data = parse(match[1]);
  } catch (err) {
    return [`YAML error: ${err.message.split('\n')[0]}`];
  }
  const facts = data.facts ?? [];
  const factIds = new Set(facts.map((f) => f.id));
  // A card that cites no fact, or a missing one, leaves the section unpublished (src/lib/content.ts).
  for (const c of data.cards ?? []) {
    if (!(c.facts ?? []).length) problems.push(`card ${c.id}: cite at least one fact`);
    for (const f of c.facts ?? []) if (!factIds.has(f)) problems.push(`card ${c.id}: unknown fact "${f}"`);
  }
  // A sourced section must have its full body; this catches a body cut off mid-write.
  if (facts.length) {
    const body = match[2];
    for (const heading of ['### How it works', '### Exam cues', '### Remember']) if (!body.includes(heading)) problems.push(`body: missing "${heading}"`);
    if (!body.includes('> **Trap:**')) problems.push('body: missing a > **Trap:** block');
    if (/[ \t]$/m.test(body)) problems.push('body: line ends with whitespace (a wrapped or cut-off line)');
  }
  for (const d of data.diagrams ?? []) for (const p of lintDiagram(withDefaults(d))) problems.push(`diagram ${d.id}: ${p}`);
  return problems;
}

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync(DIR, { recursive: true }).map(String).filter((f) => f.endsWith('.md')).map((f) => `${DIR}/${f}`);
let failed = 0;
for (const file of files) {
  const problems = check(file);
  if (problems.length) console.log(`FAIL ${file}\n  ${problems.join('\n  ')}`);
  failed += problems.length > 0;
}
console.log(failed ? `${failed} of ${files.length} sections have problems.` : `${files.length} sections OK.`);
if (!process.argv.slice(2).length) failed += checkTranslations();
process.exit(failed ? 1 : 0);
