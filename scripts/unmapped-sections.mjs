// Lists sections a cert could map but doesn't: published-level sections (at or below the exam's level) in
// units the cert's guide already uses, that no guide item maps. Mapping only proves breadth, so review this
// list when a cert is added or audited: map what the exam asks, leave the rest.
// Usage: node scripts/unmapped-sections.mjs <cert> [--json]
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { getCert } from '../src/lib/certs.ts';
import { sectionFitsCert } from '../src/lib/levels.ts';

const SECTIONS = 'src/content/sections';
const [certId] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!certId) {
  console.error('usage: node scripts/unmapped-sections.mjs <cert> [--json]');
  process.exit(2);
}
const cert = getCert(certId);
const guide = JSON.parse(readFileSync(`src/data/guides/${certId}.json`, 'utf8'));
const mapped = new Set();
for (const d of guide.domains) for (const t of d.tasks) for (const it of t.items) for (const s of it.sections) mapped.add(s);
const services = (guide.services ?? []).flatMap((cat) => cat.services);
const units = new Set([...mapped].map((id) => id.split('/')[0]));
for (const s of services) if (s.unit) units.add(s.unit);

const candidates = [];
for (const unit of [...units].sort()) {
  let files;
  try {
    files = readdirSync(join(SECTIONS, unit)).filter((f) => f.endsWith('.md'));
  } catch {
    continue;
  }
  for (const file of files) {
    const id = `${unit}/${file.replace(/\.md$/, '')}`;
    if (mapped.has(id)) continue;
    const front = parse(/^---\n([\s\S]*?)\n---/.exec(readFileSync(join(SECTIONS, unit, file), 'utf8'))?.[1] ?? '') ?? {};
    if (!front.facts?.length || !sectionFitsCert(cert.level, front.level)) continue;
    candidates.push({ id, title: front.title, level: front.level, cards: front.cards?.length ?? 0 });
  }
}

if (process.argv.includes('--json')) console.log(JSON.stringify(candidates, null, 1));
else {
  console.log(`${candidates.length} ${cert.level}-or-lower sections in ${certId} units are not mapped:`);
  for (const c of candidates) console.log(`- ${c.id} (${c.level}, ${c.cards} cards): ${c.title}`);
}
