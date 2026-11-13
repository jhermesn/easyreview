# Security

## Reporting a vulnerability

Report privately through GitHub: on the repository's **Security** tab, choose **Report a vulnerability** ([direct link](https://github.com/jhermesn/easyreview/security/advisories/new)). Please don't open a public issue for a security problem.

You can expect an acknowledgement within a week. Once a fix ships, the advisory is published with credit to you, unless you'd rather stay anonymous.

## Scope

Easy Review is a static site on GitHub Pages with no backend and no accounts. Study progress stays in the visitor's browser (`localStorage`). The parts most worth a look:

- the GitHub Actions workflows in `.github/workflows/`, especially `passed.yml`, which runs on pull requests from forks;
- `scripts/verify-passed.mjs` and `src/lib/passed.ts`, which read GitHub and Credly data for the Who passed page;
- anything that could inject script into the built pages, such as content files, the glossary tooltips or JSON-LD.

Only the latest version of `main`, as deployed, is supported.
