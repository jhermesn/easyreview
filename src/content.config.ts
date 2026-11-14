import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const tone = z.enum(['compute', 'storage', 'network', 'security', 'mgmt', 'database', 'devtools', 'integration', 'user', 'neutral']);
// Official AWS Architecture Icon id from src/data/aws-icons.json (synced by scripts/sync-aws-icons.mjs).
const iconId = z.string().regex(/^[a-z0-9-]+$/);

const diagram = z.object({
  id: z.string(),
  title: z.string(),
  width: z.number().default(800),
  height: z.number().default(420),
  groups: z
    .array(z.object({ label: z.string(), x: z.number(), y: z.number(), w: z.number(), h: z.number(), tone: tone.default('neutral'), icon: iconId.optional() }))
    .default([]),
  nodes: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      sub: z.string().optional(),
      x: z.number(),
      y: z.number(),
      w: z.number().default(140),
      h: z.number().default(56),
      tone: tone.default('neutral'),
      icon: iconId.optional(),
      info: z.string().optional(),
    }),
  ),
  edges: z
    .array(
      z.object({
        from: z.string(),
        to: z.string(),
        step: z.number().int().positive().optional(),
        label: z.string().optional(),
        dashed: z.boolean().default(false),
      }),
    )
    .default([]),
  steps: z.array(z.string()).default([]),
}).superRefine((d, ctx) => {
  const ids = new Set(d.nodes.map((n) => n.id));
  for (const e of d.edges)
    if (!ids.has(e.from) || !ids.has(e.to)) ctx.addIssue({ code: 'custom', path: ['edges'], message: `diagram ${d.id}: edge ${e.from}->${e.to} references a missing node` });
});

const slugId = z.string().regex(/^[a-z0-9-]+$/);
const awsSource = z.string().regex(/^https:\/\/(docs\.)?aws\.amazon\.com\//, 'source must be a docs.aws.amazon.com or aws.amazon.com URL');

function uniqueIds(items: { id: string }[], key: string, ctx: z.RefinementCtx) {
  const seen = new Set<string>();
  items.forEach(({ id }, i) => {
    if (seen.has(id)) ctx.addIssue({ code: 'custom', path: [key, i, 'id'], message: `id "${id}" repeats` });
    seen.add(id);
  });
}

// One unit per AWS service, or per cross-service concept (deployment strategies, disaster recovery).
const units = defineCollection({
  loader: glob({ base: './src/content/units', pattern: '*.md' }),
  // `names`: official and short service names. Mentions in other units' sections link here,
  // and exam guide service lists match against them (src/lib/guides.ts).
  schema: z.object({ title: z.string(), names: z.array(z.string()).default([]), summary: z.string(), icon: iconId.optional() }),
});

// Terms a unit's sections use that a reader may not know: src/content/glossary/<unit>.json.
// Definitions apply only inside that unit, because the same word can mean different things per service.
const glossary = defineCollection({
  loader: glob({ base: './src/content/glossary', pattern: '*.json' }),
  schema: z.array(z.object({ term: z.string(), aliases: z.array(z.string()).default([]), definition: z.string(), source: awsSource })),
});

// One exam-relevant idea of a unit: src/content/sections/<unit>/<slug>.md, id "<unit>/<slug>".
// Certs pick sections through their guide map (src/data/guides/<cert>.json), never the other way.
const sections = defineCollection({
  loader: glob({ base: './src/content/sections', pattern: '**/[^_]*.md' }),
  // Cards citing missing facts are drafts, not errors: lib/content.ts leaves them unpublished.
  schema: z
    .object({
      title: z.string(),
      level: z.enum(['foundational', 'associate', 'professional']).default('associate'),
      order: z.number().default(100),
      // Claims taken from AWS documentation. Numbers, limits and dates live here and nowhere else.
      facts: z.array(z.object({ id: slugId, text: z.string().min(1), source: awsSource })).default([]),
      diagrams: z.array(diagram).default([]),
      // Card ids are permanent: progress is stored against them, so rewording keeps it.
      cards: z
        .array(z.object({ id: slugId, q: z.string(), a: z.string(), trap: z.boolean().default(false), facts: z.array(slugId).default([]) }))
        .default([]),
    })
    .superRefine((s, ctx) => {
      uniqueIds(s.facts, 'facts', ctx);
      uniqueIds(s.cards, 'cards', ctx);
      uniqueIds(s.diagrams, 'diagrams', ctx);
    }),
});

// Translations: src/content/i18n/<locale>/ mirrors src/content/. `source` is the hash of the English file
// the translation was made from (src/lib/translate.ts); ids stay English, so progress is shared.
const sourceHash = z.string().regex(/^[0-9a-f]{12}$/, 'source must be the 12-character hash from npm run translations');
const unitTranslations = defineCollection({
  loader: glob({ base: './src/content/i18n', pattern: '*/units/*.md' }),
  schema: z.object({ source: sourceHash, title: z.string(), summary: z.string() }),
});
const optionalText = z.string().optional();
const sectionTranslations = defineCollection({
  loader: glob({ base: './src/content/i18n', pattern: '*/sections/**/[^_]*.md' }),
  schema: z.object({
    source: sourceHash,
    title: z.string(),
    facts: z.record(slugId, z.string().min(1)).default({}),
    cards: z.record(slugId, z.object({ q: z.string(), a: z.string() })).default({}),
    diagrams: z
      .record(
        z.string(),
        z.object({
          title: optionalText,
          nodes: z.record(z.string(), z.object({ label: optionalText, sub: optionalText, info: optionalText })).optional(),
          groups: z.array(z.string()).optional(),
          // Keyed "<from>><to>", the edge's two node ids.
          edges: z.record(z.string(), z.string()).optional(),
          steps: z.array(z.string()).optional(),
        }),
      )
      .default({}),
  }),
});

export const collections = { units, sections, glossary, unitTranslations, sectionTranslations };
