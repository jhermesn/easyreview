# Translations

The interface is available in English (default, at the root) and Brazilian Portuguese (under `/pt-br/`). Study content is written in English first and translated per section; where a translation does not exist yet, pages in another language show the English text with a notice.

## How it works

- `src/i18n/locales.ts` lists the languages. The default locale keeps the unprefixed URLs; every other locale is served under `/<id>/`.
- `src/i18n/en.ts` holds every interface string, keyed by where it appears (`nav.search`, `deck.again`). It is the source for all translations.
- `src/i18n/<id>.ts` holds one language. A missing key falls back to English, so a partial translation still works.
- Strings use `{name}` placeholders (`'Start {code}'`). A translation must keep every placeholder of the English text; `npm test` checks this.
- Pages live in `src/pages/[...lang]/`, so one page file serves every language. Links go through `localePath(locale, path)`, and the head lists every language version with `hreflang`. The sitemap lists them too.
- In client scripts, `clientT()` reads the page's language from `<html data-locale>`.

## Translate the interface into a new language

1. Add the language to `LOCALES` in `src/i18n/locales.ts`: its URL id (lowercase, such as `es` or `pt-br`), its name in that language, its BCP 47 tag (`lang`), its Open Graph locale (`og`) and `complete: false`. Set `complete: true` once every string is translated; from then on `npm test` fails when a string is missing.
2. Copy `src/i18n/pt-br.ts` to `src/i18n/<id>.ts`, translate the values, and add the dictionary to `dictionaries` in `src/i18n/index.ts`.
3. Keep product and AWS names as they are: Easy Review, AWS Certification, service names, the Golden Jackets tiers and the exam level names (Foundational, Associate...).
4. Run `npm test`, `npm run build` and `npm run test:e2e`, then check a few pages in the browser, on a phone width too.

## Add or change an interface string

Add the key to `src/i18n/en.ts` and use it with `t('key')` (pages and components get `t` from `useTranslations(localeOf(Astro.currentLocale))`). Add the same key to every `complete` language in the same pull request (`npm test` fails otherwise); other languages show the English text until someone translates it.

## Translate study content

English is the source: every fact is written from an English AWS documentation page first (docs/content.md). A translation follows one English file and never adds facts of its own.

The pt-BR translation of the technical resources unit (`src/content/i18n/pt-br/units/technical-resources.md` and its three sections) is a complete example to copy from. Any section is a good first contribution, one file at a time.

Translate the exams AWS offers in that language first. AWS lists the languages of each exam on its exam page; a reader preparing for an exam in Portuguese gets the most from Portuguese notes.

### Where translations live

`src/content/i18n/<locale>/` mirrors `src/content/`:

| English file | Translation |
|---|---|
| `src/content/units/<unit>.md` | `src/content/i18n/<locale>/units/<unit>.md`: `title`, `summary` and the intro |
| `src/content/sections/<unit>/<slug>.md` | `src/content/i18n/<locale>/sections/<unit>/<slug>.md`: title, facts, cards, diagram text and the body |
| `src/content/glossary/<unit>.json` | `src/content/i18n/<locale>/glossary/<unit>.json`: each term, its aliases and definition |

A section translation keys facts and cards by their English ids, so progress and "known" marks stay the same in every language. Sources, card `facts` and `trap`, and diagram layout come from the English file and are not repeated:

```yaml
---
source: 3f9a1c0b2d4e
title: Grupos de implantação
facts:
  deployment-group: Um grupo de implantação é o conjunto de instâncias que uma implantação atinge.
cards:
  codedeploy-012:
    q: O que define o conjunto de instâncias que uma implantação do CodeDeploy atinge?
    a: O grupo de implantação.
diagrams:
  traffic-shift:
    title: Troca de tráfego
    nodes:
      lb: { label: Balanceador de carga }
    groups: [Produção]
    edges:
      lb>blue: todo o tráfego
    steps: [O balanceador envia todo o tráfego para o ambiente azul]
---
### Como funciona
...
```

Diagram text is optional per part: a node, group, edge or step left out keeps its English label, which suits service names. The body keeps the English heading outline (the same `##`/`###` levels in the same order), and the trap blocks and lists stay where they are. Translate the `**Trap:**` label too (`**Pegadinha:**` in pt-BR).

A glossary translation keys terms by their English `term`:

```json
{
  "source": "cad0dcc034a7",
  "terms": {
    "Deployment group": { "term": "Grupo de implantação", "aliases": [], "definition": "..." }
  }
}
```

### Fresh and stale

`source` is a hash of the English file the translation was made from. While it matches, the translation is fresh and replaces the English text. When someone edits the English file, the translation becomes stale and readers get the current English text until a translator catches up, so a translation never shows an outdated number.

1. Write or update the translation from the current English file.
2. Run `npm run translations -- --stamp <translation file>` to record the English file's current hash.
3. Run `npm run lint`: it fails when a fresh translation misses a fact or card, has one the English file doesn't, points at a diagram part that doesn't exist or changes the heading outline. The build fails on the same problems.

`npm run translations` lists progress per locale and exam and every stale translation; the weekly content health check reports stale ones. English contributors don't need to touch translations: editing an English file is enough, and the translation catches up later.

Exam facts and the exam guide outlines on coverage pages stay in English, as AWS publishes them.
