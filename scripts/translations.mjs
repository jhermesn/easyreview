// Study content translations (docs/translations.md): which are fresh, stale or missing, and which are broken.
// Usage:
//   node scripts/translations.mjs            report per locale and cert; exits 1 on broken or stale translations
// npm run lint checks for broken translations through checkTranslations(); stale ones only get a notice there.
//   node scripts/translations.mjs --stamp <file ...>   record the current English file's hash in each translation
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { DEFAULT_LOCALE, localeIds } from '../src/i18n/locales.ts';
import { englishPathOf, glossaryProblems, hashFile, headingOutline, sectionProblems } from '../src/lib/translate.ts';

const I18N = 'src/content/i18n';
const GUIDES = 'src/data/guides';

const walk = (dir) =>
  existsSync(dir) ? readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])) : [];

function readMarkdown(path) {
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(readFileSync(path, 'utf8').replace(/\r\n/g, '\n'));
  if (!match) throw new Error('missing --- front matter');
  return { data: parse(match[1]) ?? {}, body: match[2] };
}

// Schema defaults the English section relies on (src/content.config.ts).
function englishSection(path) {
  const { data, body } = readMarkdown(path);
  const diagrams = (data.diagrams ?? []).map((d) => ({ groups: [], edges: [], steps: [], ...d }));
  return { data: { title: data.title, facts: data.facts ?? [], cards: data.cards ?? [], diagrams }, body };
}

const translatedSection = (data) => ({ ...data, facts: data.facts ?? {}, cards: data.cards ?? {}, diagrams: data.diagrams ?? {} });

// One translation file: its English file, whether it is fresh, and what is wrong with it.
function inspect(path) {
  const english = englishPathOf(path);
  const kind = path.slice(I18N.length + 1).split('/')[1];
  if (!existsSync(english)) return { path, english, problems: ['its English file does not exist'] };
  try {
    const translation = kind === 'glossary' ? { data: JSON.parse(readFileSync(path, 'utf8')) } : readMarkdown(path);
    if (translation.data.source !== hashFile(english)) return { path, english, stale: true, problems: [] };
    let problems = [];
    if (kind === 'sections') {
      const en = englishSection(english);
      problems = sectionProblems(en.data, en.body, translatedSection(translation.data), translation.body);
    } else if (kind === 'units') {
      const en = readMarkdown(english);
      if (headingOutline(en.body) !== headingOutline(translation.body)) problems = ['body headings differ from the English file'];
    } else if (kind === 'glossary') {
      problems = glossaryProblems(JSON.parse(readFileSync(english, 'utf8')), { terms: {}, ...translation.data });
    } else problems = [`"${kind}" is not a translatable folder (units, sections, glossary)`];
    return { path, english, stale: false, problems };
  } catch (err) {
    return { path, english, problems: [err.message.split('\n')[0]] };
  }
}

function stamp(paths) {
  for (const path of paths) {
    const hash = hashFile(englishPathOf(path));
    const text = readFileSync(path, 'utf8');
    const next = path.endsWith('.json') ? text.replace(/"source":\s*"[^"]*"/, `"source": "${hash}"`) : text.replace(/^source:.*$/m, `source: ${hash}`);
    if (next === text && !text.includes(hash)) throw new Error(`${path}: no "source" field to update`);
    writeFileSync(path, next);
    console.log(`${path}: source ${hash}`);
  }
}

// Sections each cert's guide maps, to report translation progress per exam.
function certSections() {
  const out = new Map();
  for (const f of readdirSync(GUIDES).filter((f) => f.endsWith('.json')).sort()) {
    const guide = JSON.parse(readFileSync(join(GUIDES, f), 'utf8'));
    if (!guide.cert || !guide.domains) continue;
    const ids = new Set(guide.domains.flatMap((d) => d.tasks.flatMap((t) => t.items.flatMap((i) => i.sections))));
    out.set(guide.cert, [...ids]);
  }
  return out;
}

function inspectAll() {
  const results = walk(I18N).filter((p) => /\.(md|json)$/.test(p)).map(inspect);
  return { results, broken: results.filter((r) => r.problems.length), stale: results.filter((r) => r.stale) };
}

// For npm run lint: prints broken translations and returns how many there are.
export function checkTranslations() {
  const { results, broken, stale } = inspectAll();
  for (const r of broken) console.log(`FAIL ${r.path}\n  ${r.problems.join('\n  ')}`);
  if (stale.length) console.log(`${stale.length} stale translations are shown in English until updated: npm run translations`);
  console.log(broken.length ? `${broken.length} of ${results.length} translations have problems.` : `${results.length} translations OK.`);
  return broken.length;
}

function report() {
  const { results, broken, stale } = inspectAll();
  for (const r of broken) for (const p of r.problems) console.log(`${r.path}: ${p}`);
  const fresh = new Set(results.filter((r) => !r.stale && !r.problems.length).map((r) => r.path));
  const sectionsByCert = certSections();
  for (const locale of localeIds.filter((l) => l !== DEFAULT_LOCALE)) {
    console.log(`\n### ${locale}`);
    for (const [cert, ids] of sectionsByCert) {
      const done = ids.filter((id) => fresh.has(join(I18N, locale, 'sections', `${id}.md`))).length;
      console.log(`- ${cert}: ${done}/${ids.length} sections translated`);
    }
    for (const r of stale.filter((r) => r.path.startsWith(join(I18N, locale) + '/')))
      console.log(`- stale: ${r.path} (${r.english} changed; update the text, then npm run translations -- --stamp ${r.path})`);
  }
  if (!broken.length && !stale.length) console.log('\nNo broken or stale translations.');
  return broken.length + stale.length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args[0] === '--stamp') stamp(args.slice(1));
  else process.exit(report() ? 1 : 0);
}
