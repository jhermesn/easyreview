# Translations

The interface is available in English (default, at the root) and Brazilian Portuguese (under `/pt-br/`). Study content is written in English; where a translation does not exist yet, pages in another language show the English content with a notice.

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

## Study content

Units, sections, facts, flashcards, diagrams and the glossary are in English. Exam facts and the exam guide outlines come from the English AWS pages.
