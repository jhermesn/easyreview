// Section checks the schema can't express: card fact references, the full body and diagram layout.
// The schema itself (ids, source URLs, diagram edges) is checked by `npm run build` (src/content.config.ts).
// Usage: node scripts/lint-content.mjs [src/content/sections/<unit>/<slug>.md ...]   (default: every section,
// then every translation in src/content/i18n, see scripts/translations.mjs)
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';
import { lintDiagram, withDefaults } from '../src/lib/diagram.ts';
import { checkTranslations } from './translations.mjs';

const DIR = 'src/content/sections';
// Progress is stored per card id, so one id in two places would merge two cards' progress.
const cardFiles = new Map();

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
    cardFiles.set(c.id, [...(cardFiles.get(c.id) ?? []), file]);
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
  // Sources are listed once, under "From the AWS docs" (the facts); the body names things without linking out.
  if (/\]\(https?:\/\//.test(match[2])) problems.push('body: external link (put the source in a fact instead)');
  for (const d of data.diagrams ?? []) for (const p of lintDiagram(withDefaults(d))) problems.push(`diagram ${d.id}: ${p}`);
  for (const d of data.diagrams ?? []) for (const f of d.facts ?? []) if (!factIds.has(f)) problems.push(`diagram ${d.id}: unknown fact "${f}"`);
  if (file.includes('/reference-architectures/')) problems.push(...referenceFloor(data.diagrams ?? []));
  return problems;
}

// A reference architecture below these sizes is missing a boundary, a trust edge or a failure path
// (docs/diagrams.md#reference-architectures).
function referenceFloor(diagrams) {
  if (!diagrams.length) return ['reference architecture: needs a diagram'];
  return diagrams.flatMap((d) => {
    const missing = [];
    if ((d.nodes ?? []).length < 10) missing.push(`at least 10 nodes (has ${(d.nodes ?? []).length})`);
    if ((d.steps ?? []).length < 6) missing.push(`at least 6 steps (has ${(d.steps ?? []).length})`);
    if (!(d.groups ?? []).length) missing.push('a group for its account, Region or VPC boundary');
    if (!(d.edges ?? []).some((e) => e.dashed)) missing.push('a dashed failure or recovery edge');
    if (!(d.facts ?? []).length) missing.push('`facts` listing the facts it relies on');
    return missing.map((m) => `diagram ${d.id}: reference architecture needs ${m}`);
  });
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
for (const [id, where] of cardFiles) if (where.length > 1) { console.log(`FAIL card id ${id} is used ${where.length} times: ${where.join(', ')}`); failed++; }
console.log(failed ? `${failed} of ${files.length} sections have problems.` : `${files.length} sections OK.`);
if (!process.argv.slice(2).length) failed += checkTranslations();
process.exit(failed ? 1 : 0);
