// Detects changes to the AWS doc sections that facts and glossary terms cite.
// Each cited URL is reduced to the article text under its #anchor (the whole article when there is none)
// and hashed. A changed or vanished section lists the facts to re-check.
// Usage: node scripts/doc-watch.mjs           report changes against the snapshot (exit 1 when something changed)
//        node scripts/doc-watch.mjs --update  write a fresh snapshot after the facts were re-checked
// Snapshot: src/data/doc-watch.json
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { articleHtml, fetchPage, plainText, sha } from './aws-docs.mjs';

const SNAPSHOT = 'src/data/doc-watch.json';
const SECTIONS = 'src/content/sections';
const GLOSSARY = 'src/content/glossary';
const CONCURRENCY = 6;
const MAX_LISTED = 80;
const MISSING = 'missing';

// url (with anchor) -> citing ids like "codedeploy/agent-setup#agent-needed" or "glossary/codedeploy: AppSpec"
function citations() {
  const out = new Map();
  const add = (url, who) => out.set(url, [...(out.get(url) ?? []), who]);
  for (const unit of readdirSync(SECTIONS)) {
    for (const file of readdirSync(join(SECTIONS, unit)).filter((f) => f.endsWith('.md'))) {
      const front = /^---\n([\s\S]*?)\n---/.exec(readFileSync(join(SECTIONS, unit, file), 'utf8'))?.[1];
      for (const f of parse(front ?? '')?.facts ?? []) add(f.source, `${unit}/${file.replace(/\.md$/, '')}#${f.id}`);
    }
  }
  for (const file of readdirSync(GLOSSARY).filter((f) => f.endsWith('.json'))) {
    for (const t of JSON.parse(readFileSync(join(GLOSSARY, file), 'utf8'))) add(t.source, `glossary/${file.replace(/\.json$/, '')}: ${t.term}`);
  }
  return out;
}

// HTML from the element carrying the anchor up to the next heading of the same or a higher level.
function sectionHtml(article, anchor) {
  const found = [`id="${anchor}"`, `name="${anchor}"`].map((a) => article.indexOf(a)).filter((i) => i >= 0);
  if (!found.length) return undefined;
  const at = article.lastIndexOf('<', Math.min(...found));
  const level = /^<h([1-6])/i.exec(article.slice(at))?.[1] ?? '6';
  const end = article.slice(at + 1).search(new RegExp(`<h[1-${level}][\\s>]`, 'i'));
  return article.slice(at, end < 0 ? undefined : at + 1 + end);
}

async function hashAll(urls) {
  const pages = new Map();
  for (const url of urls) {
    const page = url.split('#')[0];
    pages.set(page, [...(pages.get(page) ?? []), url]);
  }
  const hashes = {};
  const failed = [];
  const queue = [...pages];
  async function worker() {
    for (let next = queue.shift(); next; next = queue.shift()) {
      const [page, cited] = next;
      let article;
      try {
        article = articleHtml(await fetchPage(page, 'easyreview-doc-watch'));
      } catch (err) {
        failed.push(`${page} (${err.message.split('\n')[0]})`);
        continue;
      }
      for (const url of cited) {
        const anchor = url.includes('#') ? decodeURIComponent(url.split('#')[1]) : '';
        const html = anchor ? sectionHtml(article, anchor) : article;
        hashes[url] = html === undefined ? MISSING : sha(plainText(html));
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return { hashes, failed };
}

const cited = citations();
const { hashes, failed } = await hashAll([...cited.keys()]);
const saved = existsSync(SNAPSHOT) ? JSON.parse(readFileSync(SNAPSHOT, 'utf8')) : undefined;

if (process.argv.includes('--update') || !saved) {
  // A page that fails to load keeps the hash already in the snapshot, so it stays watched.
  const sections = Object.fromEntries(
    [...cited.keys()].sort().flatMap((url) => {
      const hash = hashes[url] ?? saved?.sections[url];
      return hash ? [[url, hash]] : [];
    }),
  );
  writeFileSync(SNAPSHOT, JSON.stringify({ checked: new Date().toISOString().slice(0, 10), sections }, null, 1) + '\n');
  console.log(`snapshot written: ${Object.keys(sections).length} cited sections, ${failed.length} pages could not be loaded`);
  process.exit(0);
}

const changes = [];
for (const [url, hash] of Object.entries(hashes)) {
  const before = saved.sections[url];
  if (before === hash || !before) continue;
  const what = hash === MISSING ? 'anchor gone' : before === MISSING ? 'anchor back' : 'changed';
  changes.push(`${what}: ${url}\n  re-check: ${cited.get(url).join(', ')}`);
}
const fresh = Object.keys(hashes).filter((url) => !saved.sections[url]).length;

console.log(changes.length ? `${changes.length} cited doc sections changed since ${saved.checked}:\n` : `No cited doc section changed since ${saved.checked}.`);
for (const line of changes.slice(0, MAX_LISTED)) console.log(`- ${line}`);
if (changes.length > MAX_LISTED) console.log(`- ... and ${changes.length - MAX_LISTED} more (run the script locally for the full list)`);
if (fresh) console.log(`\n${fresh} newly cited sections are not in the snapshot yet; \`--update\` adds them.`);
if (failed.length) console.log(`\n${failed.length} pages could not be loaded this run and were skipped.`);
process.exit(changes.length ? 1 : 0);
