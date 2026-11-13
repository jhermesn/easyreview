# Tech

Astro 7 static site with Sätteri Markdown, Zod content schemas (`src/content.config.ts`) and `@astrojs/sitemap`. TypeScript in strict mode. three.js loads only for the home hero. Node 24 or later. GitHub Pages serves the build (`.github/workflows/deploy.yml`).

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at http://localhost:4321/easyreview/, unpublished sections included |
| `npm run build` | Static site in `dist/`. Fails on schema errors and on diagram icons that were not copied; warns on coverage gaps |
| `npm run lint` | Section checks the schema can't express: every card cites facts that exist, the body has all its parts, diagrams don't overlap or leave the viewBox. Pass file paths to check only those |
| `npm test` | Unit tests (Vitest) for the logic behind the pages: spaced repetition, diagram lint, progress codes, Who passed tiers. Tests sit next to the code as `src/lib/<name>.test.ts` |
| `npm run test:e2e` | Browser smoke test (Playwright) of the built site on desktop and phone: run `npm run build` first. The first run needs `npx playwright install chromium` |
| `npm run lint:links` | Every fact and glossary source URL still resolves. Needs [lychee](https://lychee.cli.rs) installed |

## Environment

| Variable | Effect |
|---|---|
| `SITE_URL`, `BASE_PATH` | Site origin and path, default `https://jhermesn.dev` and `/easyreview`. The deploy workflow sets `BASE_PATH` to `/<repository name>`, where GitHub Pages serves a project site. Internal links go through `withBase()` (`src/lib/format.ts`) |
| `SHOW_DRAFTS=1` | A production build also shows unpublished sections |
| `STRICT_COVERAGE=1` | The build fails on coverage gaps instead of warning |
| `GH_TOKEN` | Optional. Raises the GitHub API rate limit for the "Who passed" profile lookups |

## Before you finish

1. `npm run lint`, `npm test` and `npm run build`, with no new `[coverage <cert>]` warnings, then `npm run test:e2e` after UI changes. CI runs all of them on every pull request, plus `scripts/check-card-ids.mjs`, which fails if a card id from the base branch is gone.
2. `STRICT_COVERAGE=1 npm run build` passes before a cert is called complete. An unpublished section counts as a gap.
3. For UI changes, look at the page in a browser at desktop width and at about 400 px.

## Working with others

- Edit only the files your task needs. Several agents may share one checkout, so never run a repo-wide formatter, `git add -A`, or a build that rewrites shared files while others are editing.
- Conventional Commits (`feat(dop-c02): ...`, `fix: ...`, `docs: ...`). Stage files by name. The message says why, in terms that still make sense a year later.
