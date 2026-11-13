# Adding a certification

1. Fill in `domains` for the cert in `src/lib/certs.ts` from the exam's official guide. That moves it from Coming soon to available.
2. Put the guide outline in `src/data/guides/<cert>.json`, in the same shape as `dop-c02.json`.
3. Map every guide item to existing sections first. Write new sections, following [content.md](content.md), only for what no section covers yet.
4. The build lists the gaps; `STRICT_COVERAGE=1 npm run build` fails on them.
5. Mapping proves breadth, not depth. Before the cert leaves Coming soon, take AWS's official sample questions for the exam and, for each one, find the deciding facts in AWS documentation and check that the site teaches them. Write what is missing in your own words; never copy a question.
6. Run `node scripts/guide-watch.mjs --update` so the content-health watch tracks the new guide and the cert page shows its exam facts.
