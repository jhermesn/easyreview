# Adding a certification

1. Fill in `domains` for the cert in `src/lib/certs.ts` from the exam's official guide, and set `draft: true`. A draft stays Coming soon on the published site while dev builds and CI (`DRAFT_CERTS=1`) show and check it, so the cert can be built over several pull requests without readers seeing a half-reviewed version.
2. Put the guide outline in `src/data/guides/<cert>.json`, in the same shape as `dop-c02.json`.
3. Map every guide item to existing sections, and every in-scope service to its unit (or to sections, for a service without a unit), first. Map only sections at or below the exam's level: the cert shows every card of every mapped section, so a deeper section brings cards the exam doesn't ask for. Write new sections, following [content.md](content.md), only for what no section at the right level covers yet.
4. List the exam's scenarios in the guide's `scenarios`: one entry per end-to-end design the exam builds questions on, with a `title`, the guide `items` it serves and the reference architecture `section` that draws it. [diagrams.md](diagrams.md#reference-architectures) says which tasks need one and what a complete one contains. Write a section at the exam's level for each scenario that has none.
5. The build lists the gaps; `STRICT_COVERAGE=1 npm run build` fails on them.
6. Mapping proves breadth, not depth. Before the cert leaves Coming soon, take AWS's official sample questions for the exam and, for each one, find the deciding facts in AWS documentation and check that the site teaches them. Write what is missing in your own words; never copy a question.
7. Run `node scripts/unmapped-sections.mjs <cert>`: it lists sections the cert could map but doesn't. Map the ones its guide items ask for; an exam-relevant section left unmapped is invisible to that cert's readers. Then check the sections you wrote against the guides of the other certifications. Map each one into every guide item it serves, and add any new unit to those certs' study paths, so a reader of another exam gets it too.
8. Write the study path in `src/data/roadmaps/<cert>.json`: stages in the order a learner should take them, each with a title, a one-line goal and its units. Every unit the guide maps goes in exactly one stage; `npm test` fails otherwise. A cert without this file shows only the exam-domain view.
9. Run `node scripts/guide-watch.mjs --update` so the content-health watch tracks the new guide and the cert page shows its exam facts.
10. Release review, before removing `draft`. Every step above is done, and:
   - `STRICT_COVERAGE=1 npm run build` passes (CI runs it on every pull request).
   - `node scripts/unmapped-sections.mjs <cert>` was reviewed.
   - Scope review: every card of every mapped section is one this exam could ask at its level. A section with cards beyond the exam's level is split, or replaced by a section at the exam's level; it is never mapped as is.
   - The official sample questions are answerable from the site (step 6).
   - Every scenario in `scenarios` has a complete reference architecture at the exam's level, mapped into its items.

   Then remove `draft` in its own pull request. Fixing scope after release changes what readers already studied, so this review happens once, before.
