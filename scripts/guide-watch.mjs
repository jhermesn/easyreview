// Detects changes to the official exam guides, each cert's exam code and its exam facts
// (duration, format, cost, languages, passing score) that the cert pages show.
// Usage: node scripts/guide-watch.mjs           report changes against the snapshot (exit 1 when something changed)
//        node scripts/guide-watch.mjs --update  write a fresh snapshot after the content was brought up to date
// Snapshot: src/data/guides/watch.json; exam facts: src/data/exams.json (rendered on cert pages)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { certs } from '../src/lib/certs.ts';
import { articleHtml, fetchPage, plainText, sha } from './aws-docs.mjs';

const SNAPSHOT = 'src/data/guides/watch.json';
const EXAMS = 'src/data/exams.json';
// Labels in the "Exam overview" block of each certification page on aws.amazon.com.
const PAGE_FIELDS = { Category: 'category', 'Exam duration': 'duration', 'Exam format': 'format', Cost: 'cost', 'Testing options': 'testing', 'Languages offered': 'languages' };

const get = (url) => fetchPage(url, 'easyreview-guide-watch');
// Hash only the article text so layout or navigation tweaks on the docs site don't count as changes.
const articleText = (html) => plainText(articleHtml(html));

const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"');
// Paragraphs become sentences, so a note under a list ("... will be retired") stays readable.
const clean = (html) =>
  html
    .split(/<\/p>|<br\s*\/?>/i)
    .map((p) => decode(p.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .map((p, i, all) => (i < all.length - 1 && !/[.;:!?]$/.test(p) ? `${p}.` : p))
    .join(' ');

// The cert page embeds its overview as JSON items: {"itemHeading":"Cost","itemLongLoc":"<p>300 USD...</p>"}.
function pageFacts(html) {
  const facts = {};
  for (const m of html.matchAll(/"itemHeading":"([^"]+)","itemLongLoc":"((?:[^"\\]|\\.)*)"/g)) {
    const key = PAGE_FIELDS[JSON.parse(`"${m[1]}"`).trim()];
    if (key && !facts[key]) facts[key] = clean(JSON.parse(`"${m[2]}"`));
  }
  return facts;
}

// Scoring rules from the exam guide's introduction page.
function guideFacts(html) {
  const text = clean(articleHtml(html));
  const num = (re) => re.exec(text)?.[1]?.replace(/,/g, '');
  const facts = {
    passingScore: num(/minimum passing score is ([\d,]+)/i),
    scaledScore: /scaled score of ([\d,]+\s*[–-]\s*[\d,]+)/i.exec(text)?.[1],
    scoredQuestions: num(/includes (\d+) questions that affect your score/i),
    unscoredQuestions: num(/includes (\d+) unscored questions/i),
  };
  return Object.fromEntries(Object.entries(facts).filter(([, v]) => v));
}

async function guidePages(guideUrl) {
  const html = await get(guideUrl);
  const dir = guideUrl.replace(/[^/]+$/, '');
  const links = [...html.matchAll(/href="([^"#?]+\.html)"/g)].map((m) => new URL(m[1], guideUrl).href).filter((u) => u.startsWith(dir));
  return [...new Set([guideUrl, ...links])].sort();
}

async function snapshot() {
  const pages = {};
  const codes = {};
  const exams = {};
  for (const cert of certs) {
    const page = await get(cert.page).catch(() => '');
    codes[cert.id] = [...new Set(page.match(/\b[A-Z]{3}-[CB]\d{2}\b/g) ?? [])].sort();
    const facts = pageFacts(page);
    if (Object.keys(facts).length) exams[cert.id] = { source: cert.page, ...facts };
    if (!cert.guideUrl) continue;
    for (const url of await guidePages(cert.guideUrl)) {
      const html = await get(url);
      pages[url] = sha(articleText(html));
      if (url === cert.guideUrl && exams[cert.id]) Object.assign(exams[cert.id], { guide: url, ...guideFacts(html) });
    }
  }
  return { pages, codes, exams };
}

const current = await snapshot();
const { exams, ...watched } = current;
const today = new Date().toISOString().slice(0, 10);
if (process.argv.includes('--update') || !existsSync(SNAPSHOT)) {
  writeFileSync(SNAPSHOT, JSON.stringify({ checked: today, ...watched }, null, 2) + '\n');
  // Merged over the saved facts, so a cert page that fails to load keeps the facts already saved.
  const before = existsSync(EXAMS) ? JSON.parse(readFileSync(EXAMS, 'utf8')).exams : {};
  writeFileSync(EXAMS, JSON.stringify({ retrieved: today, exams: { ...before, ...exams } }, null, 2) + '\n');
  console.log(`snapshot written: ${Object.keys(current.pages).length} guide pages, ${Object.keys(current.codes).length} certs`);
  process.exit(0);
}

const saved = JSON.parse(readFileSync(SNAPSHOT, 'utf8'));
const changes = [];
for (const [url, hash] of Object.entries(current.pages)) {
  if (!saved.pages[url]) changes.push(`new guide page: ${url}`);
  else if (saved.pages[url] !== hash) changes.push(`guide page changed: ${url}`);
}
for (const url of Object.keys(saved.pages)) if (!current.pages[url]) changes.push(`guide page gone: ${url}`);
const savedExams = existsSync(EXAMS) ? JSON.parse(readFileSync(EXAMS, 'utf8')).exams : {};
for (const [id, facts] of Object.entries(exams)) {
  for (const [field, value] of Object.entries(facts)) {
    const was = savedExams[id]?.[field];
    if (was !== value) changes.push(`exam facts for ${id} changed: ${field}: ${was ?? '(none)'} -> ${value}`);
  }
}
for (const [id, list] of Object.entries(current.codes)) {
  const before = (saved.codes[id] ?? []).join(',');
  if (list.length && before !== list.join(',')) changes.push(`exam codes for ${id} changed: [${before}] -> [${list.join(',')}]`);
}

if (changes.length) {
  console.log(`Exam guide changes since ${saved.checked}:\n- ${changes.join('\n- ')}`);
  process.exit(1);
}
console.log(`No exam guide changes since ${saved.checked}.`);
