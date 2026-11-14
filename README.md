<div align="center">

<img src="public/favicon.svg" alt="" width="72" height="72" />

# Easy Review

Free study notes for AWS Certification exams: short sections, step-by-step diagrams and spaced-repetition flashcards, all written from the AWS documentation.

**[jhermesn.dev/easyreview](https://jhermesn.dev/easyreview/)**

[![Deploy](https://github.com/jhermesn/easyreview/actions/workflows/deploy.yml/badge.svg)](https://github.com/jhermesn/easyreview/actions/workflows/deploy.yml)
[![Content health](https://github.com/jhermesn/easyreview/actions/workflows/content-health.yml/badge.svg)](https://github.com/jhermesn/easyreview/actions/workflows/content-health.yml)
[![Code: MIT](https://img.shields.io/badge/code-MIT-6672e3)](LICENSE)
[![Content: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-288996)](LICENSE-CONTENT.md)

<img src="docs/assets/home.webp" alt="Easy Review home page: a 3D DOP-C02 badge beside the headline 'Study each topic once. Use it on every exam.' and counts of topics, flashcards and diagrams" width="860" />

</div>

Two exams are covered in full: **AWS Certified Cloud Practitioner (CLF-C02)** and **AWS Certified DevOps Engineer - Professional (DOP-C02)**. Every item of their exam guides and every in-scope service is mapped to a unit. Units are shared, so a topic marked as known counts in every exam that uses it. The other AWS Certifications show as coming soon and reuse the same units as they are added.

## What's in it

| | |
|---|---|
| <img src="docs/assets/icons/book.svg" width="22" alt="" /> | **Units and sections.** A unit is one AWS service or concept, split into sections of a few minutes' reading: what it is, how it works, exam cues, what to remember, traps. |
| <img src="docs/assets/icons/docs.svg" width="22" alt="" /> | **Facts with sources.** Numbers, limits, defaults and dates live in facts, and every fact links the exact AWS documentation page. A weekly job flags facts whose cited doc section changed. |
| <img src="docs/assets/icons/diagram.svg" width="22" alt="" /> | **Diagrams** with official AWS Architecture Icons and numbered steps, for request flows, failover sequences and order of execution. |
| <img src="docs/assets/icons/cards.svg" width="22" alt="" /> | **Flashcards** with spaced repetition, a missed-only mode and a traps-only mode. |
| <img src="docs/assets/icons/check-circle.svg" width="22" alt="" /> | **Study once, use it everywhere.** A section you mark as known stays known in every exam that includes it. A cert's badge turns gold once you know every topic. |
| <img src="docs/assets/icons/target.svg" width="22" alt="" /> | **Exam guide coverage** per cert: which guide items and in-scope services each section covers. |
| <img src="docs/assets/icons/clock.svg" width="22" alt="" /> | **Exam facts** (duration, format, cost, passing score), refreshed weekly from the AWS certification pages. |
| <img src="docs/assets/icons/transfer.svg" width="22" alt="" /> | **Your progress, your browser.** No accounts and no trackers. Move progress to another device with a code. |
| <img src="docs/assets/icons/shield.svg" width="22" alt="" /> | **Who passed:** people who studied here add themselves by pull request, checked against their public Credly badges. |

## Screenshots

<table>
  <tr>
    <td width="50%"><img src="docs/assets/unit.webp" alt="CodeDeploy unit page with the sidebar of DOP-C02 units and the list of sections" /></td>
    <td width="50%"><img src="docs/assets/diagram.webp" alt="CloudFront diagram: viewer, CloudFront and a private S3 bucket with numbered steps" /></td>
  </tr>
  <tr>
    <td>A unit and its sections</td>
    <td>Diagrams with numbered steps</td>
  </tr>
  <tr>
    <td><img src="docs/assets/flashcards.webp" alt="Flashcard deck with a question about AWS Firewall Manager" /></td>
    <td><img src="docs/assets/coverage.webp" alt="Coverage page: 140 of 140 guide items covered, 105 of 105 services mentioned" /></td>
  </tr>
  <tr>
    <td>Spaced-repetition flashcards</td>
    <td>Exam guide coverage</td>
  </tr>
</table>

<p align="center"><img src="docs/assets/mobile.webp" alt="The CodeDeploy unit on a phone" width="260" /></p>

## Run it locally

```sh
npm install
npm run dev     # http://localhost:4321/easyreview/
npm run lint    # section and diagram checks
npm run build   # static site in dist/
```

Node 24 or later.

## Contributing

Fixes to facts, new sections for exams that are coming soon, and site improvements are all welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md). The rules, content model and formats are in [docs/](docs/), indexed by [AGENTS.md](AGENTS.md) for people and AI agents alike.

Found a wrong fact? [Open a content error issue](https://github.com/jhermesn/easyreview/issues/new?template=content-error.yml) with the AWS documentation link that shows the right answer.

## License

Code: [MIT](LICENSE). Study content: [CC BY 4.0](LICENSE-CONTENT.md). Third-party material, including the AWS Architecture Icons, is listed in [NOTICE.md](NOTICE.md).

Easy Review is independent and not affiliated with Amazon Web Services. When the notes and the official docs or exam guide disagree, the official sources win.
