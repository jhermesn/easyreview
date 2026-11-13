# Structure

## Content model

- **Unit**: one AWS service, or one cross-service concept such as deployment strategies. `src/content/units/<unit>.md` holds the title, `names` (official and short service names), a one-line summary and a short intro.
- **Section**: one exam-relevant idea of a unit, `src/content/sections/<unit>/<slug>.md`. It holds the facts, cards and diagrams for that idea, plus its Markdown body.
- **Fact**: one claim from an AWS documentation page, with the exact URL. Numbers, limits, defaults and dates live in facts and nowhere else. Cards cite the facts they rely on.
- **Glossary**: `src/content/glossary/<unit>.json`, terms a unit's sections use that a reader may not know. A definition applies only inside its unit, because the same word can mean different things per service.
- **Guide map**: `src/data/guides/<cert>.json` lists each exam guide item and the section ids that cover it. A cert shows exactly the sections its guide maps. A section mapped by several certs is shared, so the "known" mark a reader sets on it (`src/lib/known.ts`) shows in all of them.

A section is published once it has facts and every card cites facts that exist in it (`src/lib/content.ts`). When a section renders, `src/lib/autolink.ts` gives the first mention of each glossary term a definition tooltip and links the first mention of another unit's `names` to that unit.

## Layout

```
docs/                      project docs for contributors and agents (index in AGENTS.md)
docs/assets/               README screenshots and icons
scripts/                   section lint, card id check and the content-health watchers
e2e/                       browser smoke test (Playwright)
src/
  content.config.ts        Zod schemas for units, sections and glossary
  content/units/           one file per unit
  content/sections/<unit>/ one file per section
  content/glossary/        one JSON file per unit
  content/passed/          "Who passed" entries, one JSON file per GitHub login
  data/guides/<cert>.json  exam guide outline, items mapped to section ids
  data/exams.json          exam facts (duration, cost, format) shown on cert pages
  data/aws-icons.json      official AWS Architecture Icon ids
  lib/certs.ts             every AWS Certification: code, level, domains for the ones with content
  lib/content.ts           loading, publishing rule, per-cert view of units and sections
  lib/guides.ts            guide loading and coverage checks
  lib/autolink.ts          glossary tooltips and unit links in section bodies
  lib/badge.ts             the site's own exam badges (/badges/<cert>.svg, <cert>-gold.svg)
  lib/passed.ts            "Who passed" schema, GitHub and Credly lookups, tiers
  lib/format.ts            withBase(), HTML escaping, the inline card format
  components/Diagram.astro SVG diagram renderer (boxes, groups, numbered arrows, info hotspots)
  components/FlashDeck.astro flashcard deck (flip, knew it / missed, missed-only, traps-only)
  layouts/Base.astro       top bar with cert tabs, sidebar tree, content column
  pages/                   / (certs), /<cert>, /<cert>/<unit>, /<cert>/flashcards, /<cert>/coverage, /search, /passed
public/aws-icons/          icons copied by scripts/sync-aws-icons.mjs, only the ones content uses
```

Browser storage keys start with `easyreview:` (`src/lib/storage.ts`). `src/lib/transfer.ts` packs them into the progress code; a new key added to `KEYS` travels with it.
