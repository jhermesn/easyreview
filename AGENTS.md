# Agent guide

Easy Review is a static Astro study site for AWS Certification exams. The rules and formats live in `docs/`, one topic per file. This file is the index for every agent and harness; `CLAUDE.md` and `GEMINI.md` only import it.

| Read | When |
|---|---|
| [docs/product.md](docs/product.md) | Always: what the site is, where content may come from, name and trademark rules, look |
| [docs/tech.md](docs/tech.md) | Always: stack, commands, environment, checks before you finish, commits |
| [docs/structure.md](docs/structure.md) | Always: content model and where everything lives |
| [docs/content.md](docs/content.md) | Before editing anything in `src/content/`: section format, flashcards, style |
| [docs/diagrams.md](docs/diagrams.md) | Before adding or changing a diagram |
| [docs/certifications.md](docs/certifications.md) | When adding a certification |
| [docs/maintenance.md](docs/maintenance.md) | When fixing a `content-health` issue |
| [docs/translations.md](docs/translations.md) | Before adding or changing interface text, adding a language, or translating study content |

The rules that matter most:

- Every fact comes from an AWS documentation page, with its exact URL. Write in your own words; never copy third-party study material or reproduce a practice question.
- Card ids are permanent: reword freely, never change or reuse an `id`.
- Run the checks in `docs/tech.md` and leave no new warnings before you finish.
