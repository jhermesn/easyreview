# Keeping content current

The `Content health` workflow (`.github/workflows/content-health.yml`) runs every Monday and on demand. When a check fails, it opens or updates one issue labelled `content-health`.

| Check | Script | Catches |
|---|---|---|
| Exam guides | `node scripts/guide-watch.mjs` | Changed exam guide pages, new exam codes on a cert's AWS page (for example a C03 replacing a C02), and changed exam facts (duration, format, cost, languages, testing options, passing score) |
| Doc links | `npm run lint:links` ([lychee](https://lychee.cli.rs), settings in `lychee.toml`) | Fact and glossary sources that no longer resolve, usually a retired or renamed service |
| Doc sections | `node scripts/doc-watch.mjs` | Changed text under a cited `#anchor` (or on a cited page without one), and anchors that disappeared. Lists the facts and glossary terms to re-check, first the ones that state a number the page no longer has. PDF sources are left to the link check |
| Who passed | `node scripts/verify-passed.mjs` | Entries whose Credly badges expired or disappeared, or whose Credly profile no longer links their GitHub profile. The same script checks new entries in pull requests (see CONTRIBUTING.md) |
| Section lint | `npm run lint` | Cards citing missing facts, cut-off bodies, diagram layout problems |
| Strict coverage | `STRICT_COVERAGE=1 npm run build` | Guide items without a section, in-scope services without a section in the cert, sections no cert maps |

## When the issue fires

1. **Guide page changed:** re-extract that guide into `src/data/guides/<cert>.json` in the same shape. Keep the section mappings of unchanged items, map new items, and write sections for anything uncovered.
2. **New exam code:** treat it as a new guide. Update the cert's `code` in `src/lib/certs.ts`, re-extract the guide, and re-check every mapped section against the new outline.
3. **Dead link:** find the current AWS page and re-check the facts that cite it, or record the retirement, with its date, as a fact.
4. **Doc section changed:** re-read the section and fix the listed facts, plus the cards and body lines that rely on them. A new limit, default or feature gets a dated fact. A missing anchor means the section moved: point the facts at the new anchor.
5. Run `node scripts/guide-watch.mjs --update` or `node scripts/doc-watch.mjs --update` for the check that fired, and commit the new snapshot (`src/data/guides/watch.json` and `src/data/exams.json`, or `src/data/doc-watch.json`) with the content changes. Newly cited pages join the doc-watch snapshot the same way.
