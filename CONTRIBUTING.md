# Contributing

## Add yourself to "Who passed"

Passed an AWS Certification exam? Add yourself to the [Who passed](https://jhermesn.dev/easyreview/passed/) page with one pull request.

1. Make your AWS Certification badges public on [Credly](https://www.credly.com). Your profile URL looks like `https://www.credly.com/users/<username>`.
2. On Credly, put your GitHub profile URL (`https://github.com/<your-login>`) in your profile's website or bio. Only you can edit your Credly profile, so this link is how the check knows the badges are yours.
3. Add a file named after your GitHub login, `src/content/passed/<your-github-login>.json`:

   ```json
   {
     "github": "your-github-login",
     "credly": "your-credly-username",
     "linkedin": "https://www.linkedin.com/in/you",
     "builder": "https://builder.aws.com/community/@you"
   }
   ```

   `linkedin` and `builder` (your AWS Builder Center profile) are optional.
4. Open the pull request from your own account. The `Who passed` check confirms that:
   - the file name and `github` match your login;
   - your Credly profile links your GitHub profile;
   - Credly shows at least one active AWS Certification.

You don't list your exams. Each build reads them from your public Credly badges, and your name, description and photo from your GitHub profile, so the page stays current when you pass another exam or update your profile. The site rebuilds every week.

**Tiers** follow the Golden Jackets Brazil community, counted over the current non-beta AWS Certifications (12 today):

| Tier | Active certifications |
|---|---|
| Golden Jacket | All of them at once |
| Alumni | All of them once, some expired since |
| Challenger | 10 or 11 |
| Rising | 7 to 9 |
| Certified | Any other number |

"Most certified" groups people by tier. "Recently updated" lists everyone by their latest certification, with the tier shown as the frame around their card.

The entry holds only what you put in it. The page shows your public GitHub name, bio and photo (served from this site, not hot-linked) and your AWS badges from Credly, and reads nothing else. To leave the wall, open a pull request that deletes your file.

## Content and code

Start with [`AGENTS.md`](AGENTS.md): it lists the docs in [`docs/`](docs/) and when each one applies. Every fact comes from an AWS documentation page with its exact URL. Run the checks in [`docs/tech.md`](docs/tech.md#before-you-finish) before you open a pull request.

Looking for something to pick up? Issues labelled [`good first issue`](https://github.com/jhermesn/easyreview/labels/good%20first%20issue) are small and self-contained; [`help wanted`](https://github.com/jhermesn/easyreview/labels/help%20wanted) and [`certification`](https://github.com/jhermesn/easyreview/labels/certification) are bigger. Comment on an issue before you start, so two people don't write the same section.

## Translations

Study content is written in English and translated one section at a time. To translate a section, follow [`docs/translations.md`](docs/translations.md#translate-study-content); the Brazilian Portuguese technical resources unit is a complete example.

## Labels

| Label | Meaning |
|---|---|
| `triage` | New, not yet looked at by a maintainer |
| `bug`, `content`, `enhancement`, `documentation`, `accessibility` | What kind of change it needs |
| `certification` | Coverage for a coming-soon exam or a new exam version |
| `good first issue`, `help wanted` | Open for contributors |
| `content-health` | Opened by the weekly content check |
| `dependencies` | Dependency updates from Dependabot |
| `question`, `duplicate`, `invalid`, `wontfix` | How an issue was closed or answered |
