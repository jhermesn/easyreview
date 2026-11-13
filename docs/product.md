# Product

Easy Review is a free static study site for AWS Certification exams. The first exam covered is DevOps Engineer - Professional (DOP-C02). Each unit page has short notes, exam traps, interactive diagrams, the AWS documentation facts behind them and a flashcard deck. There is no backend and no accounts: flashcard progress and "known" marks stay in the reader's browser, and a progress code moves them to another device.

The goal is 80/20 review: what the exam asks, in the fewest words. A reader should get through a section in a few minutes after missing a practice question. Correctness matters more than volume, because a wrong fact on a study site costs the reader an exam question.

## Where content comes from

- Every number, limit, default, date and behaviour a section states is a fact with the exact `docs.aws.amazon.com` or `aws.amazon.com` URL. A claim you cannot find in AWS documentation is dropped, and your report says so.
- Write from the AWS page you have open, not from memory checked afterwards. Site copy never says content was "verified", "validated" or "checked against" AWS docs; it says where the content comes from.
- When AWS pages disagree (product pages, user guides and API references sometimes give different dates), keep the most recently updated statement and name the page that lost in your report.
- Write in your own words. Never copy or closely paraphrase third-party study material such as courses, practice exams or books, never reproduce a practice question, and never name courses, instructors or question vendors.
- Diagrams are drawn with the site's diagram schema, never copied from slides or screenshots.

## Name and marks

- The product name is "Easy Review". AWS trademark guidelines forbid AWS marks in product names, so "AWS" appears only in relational phrases such as "study notes for AWS Certification exams".
- Official AWS Certification badges are reserved for certified individuals. The site draws its own exam badges (`src/lib/badge.ts`) and never shows the official ones.
- AWS Architecture Icons come unchanged from the official package, under the terms listed in `NOTICE.md`.
- The brand scales by size: favicon and app icons show the logo alone; link previews (`public/og.png`, 1200x630) and the GitHub social preview (`docs/assets/social-preview.png`, 1280x640) show the logo with the name. Keep counts out of these images, since platforms cache them for a long time.

## Look

The site follows the AWS Builder Center design standards. Colors, type and spacing come from the tokens in `src/styles/global.css`; reuse them instead of new values. The layout has two panels: a sidebar tree (cert, then domain, then unit) beside the content. Navigation prefers icons (`src/components/Icon.astro`) and the site's own badges over text. Check every UI change at desktop width and at about 400 px.
