// Sätteri hast plugin for section bodies: the first mention of a glossary term gets a definition
// tooltip, and the first mention of another unit's service name links to that unit's page.
// Glossary terms come from the section's own unit only (src/content/glossary/<unit>.json), since
// the same word can mean different things per service.
import { readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { HastPluginEntry } from 'satteri';
import { parse } from 'yaml';
import { escapeRe } from './format';

interface Term { term: string; aliases: string[]; definition: string }
interface Target { key: string; text: string; caseSensitive: boolean; plural: boolean; definition?: string; unit?: string }

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const SKIP = new Set(['a', 'code', 'pre', 'kbd', 'dfn', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button']);
// Acronyms such as TLS or ARN only match in capitals; other terms match in any case.
const isAcronym = (s: string) => /^[A-Z0-9][A-Z0-9-]{1,7}$/.test(s);

function readUnitNames(): Map<string, string[]> {
  const dir = join(ROOT, 'src/content/units');
  const out = new Map<string, string[]>();
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const front = readFileSync(join(dir, f), 'utf8').split(/^---$/m)[1];
    out.set(basename(f, '.md'), parse(front).names ?? []);
  }
  return out;
}

// A unit is linkable once some cert's guide maps one of its sections; links go to the first such cert.
function readUnitCerts(): Map<string, string> {
  const dir = join(ROOT, 'src/data/guides');
  const out = new Map<string, string>();
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
    const guide = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    if (!guide.cert || !guide.domains) continue;
    for (const d of guide.domains)
      for (const t of d.tasks) for (const item of t.items) for (const id of item.sections) if (!out.has(id.split('/')[0])) out.set(id.split('/')[0], guide.cert);
  }
  return out;
}

function readGlossary(unit: string): Term[] {
  try {
    return JSON.parse(readFileSync(join(ROOT, 'src/content/glossary', `${unit}.json`), 'utf8'));
  } catch {
    return [];
  }
}

function buildMatcher(unit: string, names: Map<string, string[]>, certs: Map<string, string>) {
  const targets: Target[] = [];
  for (const t of readGlossary(unit))
    for (const text of [t.term, ...t.aliases])
      targets.push({ key: `term:${t.term.toLowerCase()}`, text, caseSensitive: isAcronym(text), plural: !isAcronym(text), definition: t.definition });
  for (const [other, list] of names)
    if (other !== unit && certs.has(other)) for (const text of list) targets.push({ key: `unit:${other}`, text, caseSensitive: true, plural: false, unit: other });
  if (!targets.length) return undefined;
  // Longest first, so "EC2 Auto Scaling" wins over "EC2" at the same position.
  targets.sort((a, b) => b.text.length - a.text.length);
  const alternatives = targets.map((t) => {
    const body = escapeRe(t.text) + (t.plural ? '(?:s|es)?' : '');
    return t.caseSensitive ? body : `(?i:${body})`;
  });
  const re = new RegExp(`(?<![\\w@-])(?:${alternatives.join('|')})(?![\\w@-])`, 'g');
  const find = (match: string) =>
    targets.find((t) => {
      const stem = t.plural ? match.replace(/(?:es|s)$/, '') : match;
      return [match, stem].some((m) => (t.caseSensitive ? m === t.text : m.toLowerCase() === t.text.toLowerCase()));
    });
  return { re, find };
}

export function autolink({ base }: { base: string }): HastPluginEntry {
  const names = readUnitNames();
  const certs = readUnitCerts();
  const matchers = new Map<string, ReturnType<typeof buildMatcher>>();
  const prefix = base.replace(/\/$/, '');

  return () => {
    const used = new Set<string>();
    let unit: string | undefined;
    let slug = '';
    let tips = 0;
    return {
      name: 'autolink',
      before(_root, ctx) {
        const path = ctx.fileURL ? fileURLToPath(ctx.fileURL) : '';
        // Only section bodies: src/content/sections/<unit>/<slug>.md
        if (basename(dirname(dirname(path))) !== 'sections') return;
        unit = basename(dirname(path));
        slug = basename(path, '.md');
        if (!matchers.has(unit)) matchers.set(unit, buildMatcher(unit, names, certs));
      },
      text(node, ctx) {
        const matcher = unit && matchers.get(unit);
        if (!matcher) return;
        for (let p = ctx.parent(node); p && p.type === 'element'; p = ctx.parent(p)) if (SKIP.has(p.tagName)) return;
        const parts: any[] = [];
        let last = 0;
        for (const m of node.value.matchAll(matcher.re)) {
          const target = matcher.find(m[0]);
          if (!target || used.has(target.key)) continue;
          used.add(target.key);
          if (m.index > last) parts.push({ type: 'text', value: node.value.slice(last, m.index) });
          parts.push(target.unit ? unitLink(target.unit, m[0]) : termTip(target.definition!, m[0], `def-${unit}-${slug}-${++tips}`));
          last = m.index + m[0].length;
        }
        if (!parts.length) return;
        if (last < node.value.length) parts.push({ type: 'text', value: node.value.slice(last) });
        ctx.replaceNode(node, parts);
      },
    };
  };

  function unitLink(target: string, text: string) {
    return {
      type: 'element',
      tagName: 'a',
      properties: { href: `${prefix}/${certs.get(target)}/${target}`, className: ['unit-link'], dataUnit: target },
      children: [{ type: 'text', value: text }],
    };
  }

  function termTip(definition: string, text: string, id: string) {
    return {
      type: 'element',
      tagName: 'span',
      properties: { className: ['term'] },
      children: [
        { type: 'element', tagName: 'dfn', properties: { tabIndex: 0, ariaDescribedBy: id }, children: [{ type: 'text', value: text }] },
        { type: 'element', tagName: 'span', properties: { className: ['term-def'], role: 'tooltip', id }, children: [{ type: 'text', value: definition }] },
      ],
    };
  }
}
