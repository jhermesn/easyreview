// Study content translations: src/content/i18n/<locale>/ mirrors src/content/ (units, sections, glossary).
// A translation records `source`, the hash of the English file it was made from. While the hash matches,
// the translation is fresh and replaces the English text; once the English file changes it is stale and
// readers get the English text again, so a translation never shows an outdated fact.
// Used by the build (src/lib/content.ts, src/lib/autolink.ts) and by scripts/translations.mjs.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export const hashText = (text: string) => createHash('sha256').update(text.replace(/\r\n/g, '\n')).digest('hex').slice(0, 12);
export const hashFile = (path: string) => hashText(readFileSync(path, 'utf8'));

// 'src/content/i18n/pt-br/sections/a/b.md' -> 'src/content/sections/a/b.md', and back.
export const englishPathOf = (path: string) => path.replace(/(^|\/)src\/content\/i18n\/[^/]+\//, '$1src/content/');
export const translationPathOf = (path: string, locale: string) => path.replace(/(^|\/)src\/content\//, `$1src/content/i18n/${locale}/`);

interface Fact { id: string; text: string }
interface Card { id: string; q: string; a: string }
interface DiagramText {
  id: string;
  title: string;
  groups: { label: string }[];
  nodes: { id: string; label: string; sub?: string; info?: string }[];
  edges: { from: string; to: string; label?: string }[];
  steps: string[];
}
export interface SectionText { title: string; facts: Fact[]; cards: Card[]; diagrams: DiagramText[] }

export interface DiagramTranslation {
  title?: string;
  nodes?: Record<string, { label?: string; sub?: string; info?: string }>;
  groups?: string[];
  edges?: Record<string, string>;
  steps?: string[];
}
export interface SectionTranslation {
  source: string;
  title: string;
  facts: Record<string, string>;
  cards: Record<string, { q: string; a: string }>;
  diagrams?: Record<string, DiagramTranslation>;
}

export interface Term { term: string; aliases: string[]; definition: string }
export interface GlossaryTranslation { source: string; terms: Record<string, Term> }

export const edgeKey = (e: { from: string; to: string }) => `${e.from}>${e.to}`;

function sameKeys(kind: string, english: string[], translated: string[]): string[] {
  const en = new Set(english);
  const tr = new Set(translated);
  return [
    ...english.filter((k) => !tr.has(k)).map((k) => `${kind} "${k}" is not translated`),
    ...translated.filter((k) => !en.has(k)).map((k) => `${kind} "${k}" is not in the English file`),
  ];
}

// "## ### ###": the heading outline a translated body must keep, so cues and lists stay in place.
export const headingOutline = (markdown: string) => (markdown.match(/^#{2,6}(?= )/gm) ?? []).join(' ');

function diagramProblems(en: DiagramText, tr: DiagramTranslation): string[] {
  const where = `diagram ${en.id}`;
  const problems: string[] = [];
  const nodes = new Set(en.nodes.map((n) => n.id));
  for (const id of Object.keys(tr.nodes ?? {})) if (!nodes.has(id)) problems.push(`${where}: node "${id}" is not in the English diagram`);
  const edges = new Set(en.edges.map(edgeKey));
  for (const key of Object.keys(tr.edges ?? {})) if (!edges.has(key)) problems.push(`${where}: edge "${key}" is not in the English diagram`);
  if (tr.groups && tr.groups.length !== en.groups.length) problems.push(`${where}: ${tr.groups.length} group labels for ${en.groups.length} groups`);
  if (tr.steps && tr.steps.length !== en.steps.length) problems.push(`${where}: ${tr.steps.length} steps for ${en.steps.length}`);
  return problems;
}

// What keeps a fresh translation from replacing its English section: every fact and card translated,
// nothing extra, diagram overrides that point at real parts, and the same heading outline.
export function sectionProblems(en: SectionText, enBody: string, tr: SectionTranslation, trBody: string): string[] {
  const problems = [
    ...sameKeys('fact', en.facts.map((f) => f.id), Object.keys(tr.facts)),
    ...sameKeys('card', en.cards.map((c) => c.id), Object.keys(tr.cards)),
  ];
  const diagrams = new Map(en.diagrams.map((d) => [d.id, d]));
  for (const [id, d] of Object.entries(tr.diagrams ?? {})) {
    const original = diagrams.get(id);
    problems.push(...(original ? diagramProblems(original, d) : [`diagram "${id}" is not in the English file`]));
  }
  if (headingOutline(enBody) !== headingOutline(trBody)) problems.push(`body headings "${headingOutline(trBody)}" differ from the English "${headingOutline(enBody)}"`);
  return problems;
}

// The English section with the translated text in place; ids, sources, layout and card facts stay English.
export function mergeSection<T extends SectionText>(en: T, tr: SectionTranslation): T {
  return {
    ...en,
    title: tr.title,
    facts: en.facts.map((f) => ({ ...f, text: tr.facts[f.id] ?? f.text })),
    cards: en.cards.map((c) => ({ ...c, ...tr.cards[c.id] })),
    diagrams: en.diagrams.map((d) => {
      const t = tr.diagrams?.[d.id];
      if (!t) return d;
      return {
        ...d,
        title: t.title ?? d.title,
        groups: d.groups.map((g, i) => ({ ...g, label: t.groups?.[i] ?? g.label })),
        nodes: d.nodes.map((n) => ({ ...n, ...t.nodes?.[n.id] })),
        edges: d.edges.map((e) => (t.edges?.[edgeKey(e)] ? { ...e, label: t.edges[edgeKey(e)] } : e)),
        steps: t.steps ?? d.steps,
      };
    }),
  };
}

export function glossaryProblems(en: Term[], tr: GlossaryTranslation): string[] {
  return sameKeys('term', en.map((t) => t.term), Object.keys(tr.terms));
}

export const mergeGlossary = (en: Term[], tr: GlossaryTranslation): Term[] => en.map((t) => tr.terms[t.term] ?? t);
