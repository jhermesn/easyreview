// Units, sections and how a cert sees them. A cert includes exactly the sections its exam guide
// maps (src/data/guides/<cert>.json): 100% of the guide and nothing the guide doesn't ask for.
import { resolve } from 'node:path';
import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, LOCALES, localeIds, type Locale } from '../i18n/locales';
import { availableCerts, getCert, GOLDEN_TRAIL, isTrail, type Cert } from './certs';
import { getGuide } from './guides';
import { hashFile, mergeSection, sectionProblems } from './translate';
import { CATEGORIES, categoryName } from './categories';
import { revisionTime } from './revisions';

// `lang` is the language the entry's text is in: the page's locale when a fresh translation exists, else English.
export type Unit = CollectionEntry<'units'> & { lang: Locale };
export type Section = CollectionEntry<'sections'> & { lang: Locale };
export interface CertUnit { unit: Unit; domain: string; sections: Section[] }
export interface CertView { cert: Cert; units: CertUnit[]; sections: Section[]; missing: string[] }

export const unitIdOf = (s: { id: string }) => s.id.split('/')[0];
export const sectionSlug = (s: Section) => s.id.split('/')[1];
export const sectionHref = (certId: string, s: Section) => `/${certId}/${unitIdOf(s)}#${sectionSlug(s)}`;

const LEVELS = ['foundational', 'associate', 'professional'];
const bySectionOrder = (a: Section, b: Section) =>
  LEVELS.indexOf(a.data.level) - LEVELS.indexOf(b.data.level) || a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);

// Docs-first: a section is published once every card cites facts that exist in the section.
// `astro dev` and SHOW_DRAFTS=1 also show incomplete sections, for authors.
const showDrafts = import.meta.env.DEV || process.env.SHOW_DRAFTS === '1';
export function isComplete(s: CollectionEntry<'sections'>): boolean {
  const facts = new Set(s.data.facts.map((f) => f.id));
  return s.data.facts.length > 0 && s.data.cards.every((c) => c.facts.length > 0 && c.facts.every((f) => facts.has(f)));
}

interface Content { units: Map<string, Unit>; sections: Map<string, Section> }
const cache = new Map<Locale, Promise<Content>>();
export function getContent(locale: Locale = DEFAULT_LOCALE): Promise<Content> {
  if (!cache.has(locale)) cache.set(locale, locale === DEFAULT_LOCALE ? loadEnglish() : loadTranslated(locale));
  return cache.get(locale)!;
}

async function loadEnglish(): Promise<Content> {
  const lang = DEFAULT_LOCALE;
  const units = new Map((await getCollection('units')).map((u) => [u.id, { ...u, lang }]));
  const all = await getCollection('sections');
  const cardIds = new Map<string, string>();
  for (const s of all) {
    if (!units.has(unitIdOf(s))) throw new Error(`section ${s.id}: unit "${unitIdOf(s)}" has no file in src/content/units`);
    for (const c of s.data.cards) {
      if (cardIds.has(c.id)) throw new Error(`card id "${c.id}" is used in ${cardIds.get(c.id)} and ${s.id}`);
      cardIds.set(c.id, s.id);
    }
  }
  const sections = new Map(all.filter((s) => showDrafts || isComplete(s)).map((s) => [s.id, { ...s, lang }]));
  return { units, sections };
}

// English content with every fresh translation of `locale` in place (src/lib/translate.ts). A stale one
// is skipped, so the reader gets the current English text; a fresh one with problems stops the build.
async function loadTranslated(locale: Locale): Promise<Content> {
  const en = await getContent(DEFAULT_LOCALE);
  const isFresh = (english: { filePath?: string }, source: string) => !!english.filePath && hashFile(resolve(english.filePath)) === source;
  const units = new Map(en.units);
  for (const tr of await getCollection('unitTranslations', (e) => e.id.startsWith(`${locale}/`))) {
    const u = en.units.get(tr.id.slice(`${locale}/units/`.length));
    if (!u || !isFresh(u, tr.data.source)) continue;
    units.set(u.id, { ...u, data: { ...u.data, title: tr.data.title, summary: tr.data.summary }, body: tr.body, rendered: tr.rendered, filePath: tr.filePath, lang: locale });
  }
  const sections = new Map(en.sections);
  const problems: string[] = [];
  for (const tr of await getCollection('sectionTranslations', (e) => e.id.startsWith(`${locale}/`))) {
    const s = en.sections.get(tr.id.slice(`${locale}/sections/`.length));
    if (!s || !isFresh(s, tr.data.source)) continue;
    const found = sectionProblems(s.data, s.body ?? '', tr.data, tr.body ?? '');
    if (found.length) problems.push(...found.map((p) => `${tr.filePath}: ${p}`));
    else sections.set(s.id, { ...s, data: mergeSection(s.data, tr.data), body: tr.body, rendered: tr.rendered, filePath: tr.filePath, lang: locale });
  }
  if (problems.length) throw new Error(`translations do not match their English files (npm run lint lists them):\n${problems.join('\n')}`);
  return { units, sections };
}

// The cert's units in guide order, each with only the sections the guide maps to it.
export async function getCertView(certId: string, locale: Locale = DEFAULT_LOCALE): Promise<CertView> {
  if (isTrail(certId)) return trailView(locale);
  const cert = getCert(certId);
  const { units, sections } = await getContent(locale);
  const picked = new Map<string, { domain: string; ids: Set<string> }>();
  const missing: string[] = [];
  for (const d of getGuide(certId)?.domains ?? [])
    for (const task of d.tasks)
      for (const item of task.items)
        for (const id of item.sections) {
          const s = sections.get(id);
          if (!s) { missing.push(`${item.id} maps to missing or unpublished section "${id}"`); continue; }
          const entry = picked.get(unitIdOf(s)) ?? { domain: d.id, ids: new Set<string>() };
          entry.ids.add(id);
          picked.set(unitIdOf(s), entry);
        }
  // Within a domain, units the exam leans on most (most mapped sections) come first.
  const domainRank = (id: string) => cert.domains.findIndex((d) => d.id === id);
  const certUnits = [...picked]
    .map(([unitId, { domain, ids }]) => ({
      unit: units.get(unitId)!,
      domain,
      sections: [...ids].map((id) => sections.get(id)!).sort(bySectionOrder),
    }))
    .sort((a, b) => domainRank(a.domain) - domainRank(b.domain) || b.sections.length - a.sections.length || a.unit.data.title.localeCompare(b.unit.data.title));
  return { cert, units: certUnits, sections: certUnits.flatMap((u) => u.sections), missing };
}

// The Golden Jacket trail: every published section of every unit, with no exam scope or level limit.
// Units are grouped by service category (src/lib/categories.ts); inside one, units the earliest available
// cert shows come first, so the trail still starts with the entry-level exams. A category's weight is its
// share of the trail's sections.
async function trailView(locale: Locale): Promise<CertView> {
  const { units, sections } = await getContent(locale);
  const exams = await Promise.all(availableCerts().map((c) => getCertView(c.id, locale)));
  const firstExam = new Map<string, number>();
  exams.forEach((v, i) => v.units.forEach((u) => firstExam.has(u.unit.id) || firstExam.set(u.unit.id, i)));
  const byUnit = new Map<string, Section[]>();
  for (const s of sections.values()) byUnit.set(unitIdOf(s), [...(byUnit.get(unitIdOf(s)) ?? []), s]);
  const order: string[] = CATEGORIES.map((c) => c.id);
  const rank = (unitId: string) => firstExam.get(unitId) ?? exams.length;
  const trailUnits = [...byUnit]
    .map(([unitId, list]) => ({ unit: units.get(unitId)!, domain: units.get(unitId)!.data.category, sections: list.sort(bySectionOrder) }))
    .sort((a, b) => order.indexOf(a.domain) - order.indexOf(b.domain) || rank(a.unit.id) - rank(b.unit.id) || a.unit.data.title.localeCompare(b.unit.data.title));
  const all = trailUnits.flatMap((u) => u.sections);
  const share = (id: string) => trailUnits.filter((u) => u.domain === id).reduce((n, u) => n + u.sections.length, 0);
  const domains = order
    .filter((id) => share(id) > 0)
    .map((id) => ({ id, name: categoryName(id, locale), weight: Math.max(1, Math.round((100 * share(id)) / all.length)) }));
  return { cert: { ...GOLDEN_TRAIL, domains }, units: trailUnits, sections: all, missing: [] };
}

// Sections no cert maps: shown in no cert, so they are either a gap in a guide map or extra content.
export async function orphanSections(certIds: string[]): Promise<string[]> {
  const { sections } = await getContent();
  const used = new Set((await Promise.all(certIds.map((id) => getCertView(id)))).flatMap((v) => v.sections.map((s) => s.id)));
  return [...sections.keys()].filter((id) => !used.has(id));
}

// One flashcard as the deck component receives it (src/components/FlashDeck.astro).
export interface DeckCard {
  id: string;
  topic: string;
  topicTitle: string;
  domain: string;
  q: string;
  a: string;
  trap: boolean;
  // BCP 47 tag of the card's text, which stays English until its section is translated.
  lang: string;
  // Time of the card's latest material change: a card last reviewed before it is due again.
  revised?: number;
}

export function deckCards(view: CertView): DeckCard[] {
  return view.units.flatMap(({ unit, domain, sections }) =>
    sections.flatMap((s) =>
      s.data.cards.map((c) => ({ id: c.id, topic: unit.id, topicTitle: unit.data.title, domain, q: c.q, a: c.a, trap: c.trap, lang: LOCALES[s.lang].lang, revised: cardRevision(s, c.id) })),
    ),
  );
}

export const sectionIds = (sections: Section[]) => sections.map((s) => s.id).join(',');

export function latestRevision(s: Section): { at: number; date: Date; note: string } | undefined {
  const last = [...s.data.revised].sort((a, b) => b.date.getTime() - a.date.getTime())[0];
  return last && { at: revisionTime(last.date), date: last.date, note: last.note };
}
export const cardRevision = (s: Section, cardId: string): number | undefined =>
  Math.max(0, ...s.data.revised.filter((r) => r.cards.includes(cardId)).map((r) => revisionTime(r.date))) || undefined;

// Section id -> time of its latest revision, for every section that has one (lib/known.ts reads it on each page).
export async function revisionTimes(): Promise<Record<string, number>> {
  const { sections } = await getContent();
  return Object.fromEntries([...sections.values()].flatMap((s) => {
    const r = latestRevision(s);
    return r ? [[s.id, r.at]] : [];
  }));
}

// Readers count topics (units), and a topic is known once all of its sections are: "a,b|c" = two topics.
export function knownGroups(sections: Section[]): string {
  const byUnit = new Map<string, Section[]>();
  for (const s of sections) byUnit.set(unitIdOf(s), [...(byUnit.get(unitIdOf(s)) ?? []), s]);
  return [...byUnit.values()].map(sectionIds).join('|');
}

// Locales other than English whose Golden Jacket copy of a unit is fully translated (the unit and every section).
export async function translatedLocales(unitId: string): Promise<Locale[]> {
  const others = localeIds.filter((l) => l !== DEFAULT_LOCALE);
  const done = await Promise.all(others.map(async (l) => {
    const own = (await getCertView(GOLDEN_TRAIL.id, l)).units.find((u) => u.unit.id === unitId);
    return !!own && own.unit.lang === l && own.sections.every((sec) => sec.lang === l);
  }));
  return others.filter((_, i) => done[i]);
}
