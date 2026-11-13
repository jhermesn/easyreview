# Writing content

## Rules

- **Only sourced sections are published.** A production build drops a section with no facts, or with a card that cites a missing fact. `npm run dev` and `SHOW_DRAFTS=1` show them for authors.
- **One section per idea, shared across certs.** Before writing a section, search for an existing one and map it in the cert's guide (`src/data/guides/<cert>.json`). A duplicated section splits the reader's "known" progress.
- **Card ids are permanent.** Progress is stored against them: reword a card freely, but never change or reuse its `id`. A new card takes the next number after the highest one in the whole unit.
- **Date the facts that change.** Retired or renamed services, closed-to-new-customers notices and new features (with month and year) are facts, because exam questions may predate them.

## Section format

Front matter (exact schema in `src/content.config.ts`):

| Field | Meaning |
|---|---|
| `title` | Short section title |
| `level` | `foundational`, `associate` or `professional` |
| `order` | Sort order inside the unit |
| `facts` | `{ id, text, source }`: one atomic claim in your own words and the exact AWS doc URL, with `#anchor` when the page has one |
| `cards` | `{ id, q, a, trap, facts }`: `facts` lists the fact ids the card relies on |
| `diagrams` | See [diagrams.md](diagrams.md) |

The Markdown body follows a fixed order, so readers know where to look:

1. A first paragraph with no heading: what it is and the problem it solves, plus a one-sentence mental model when it helps.
2. `### How it works`: numbered steps of the mechanism.
3. `### Exam cues`: bullets shaped "If the question says <situation>, think <answer>, because <reason>."
4. `### Remember`: short bullets with the numbers and defaults. They must match facts.
5. Traps as blockquotes starting with `**Trap:**`. Blockquotes are reserved for traps: the site styles every blockquote as a trap callout.

Short paragraphs with one idea each, and a table for three or more options. `src/content/sections/codedeploy/` has good examples.

## Flashcards

- Ask what the exam asks: which service or feature solves X, ordering, defaults and limits, what breaks when, cross-account and multi-Region setups. Mix recall cards with at least two exam-style scenario cards per section.
- `q` stands alone. Decks shuffle cards across units, so every question names its service and situation in full. Never write "Same case", "as above", "now" or "instead" questions, and never lean on the section title. When two cards share a scenario, repeat it in both.
- `a` starts with the answer, then at most three short lines of why. It uses the inline format of `src/lib/format.ts`: `` `code` ``, `**bold**`, lines starting with `- `, and `\n` for line breaks.
- `trap: true` marks cards where the obvious answer is wrong.

## Style

- Plain English, short sentences, no marketing words.
- Define a technical term where it first appears, or add it to the unit's glossary (`src/content/glossary/<unit>.json`), which renders as a tooltip.
- Use a service's official name, so it links to its unit.
- Draw a diagram for anything hard to picture from text: order of execution, request flows, topologies, failover sequences, timing. Otherwise use a table.
