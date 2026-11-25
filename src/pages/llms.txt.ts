// llms.txt (https://llmstxt.org) for this subpath: what the site is and where each exam and topic lives,
// so answer engines can cite the right page. Topics link to the Golden Jacket copy, the one search engines index.
import type { APIRoute } from 'astro';
import { GOLDEN_TRAIL, availableCerts } from '../lib/certs';
import { deckCards, getCertView } from '../lib/content';
import { getGuide } from '../lib/guides';
import { absoluteUrl, certFullName } from '../lib/seo';
import { plainText } from '../lib/format';

export const GET: APIRoute = async ({ site }) => {
  const url = (path: string) => absoluteUrl(path, site!);
  const exams = await Promise.all(availableCerts().map(async (cert) => {
    const view = await getCertView(cert.id);
    const coverage = getGuide(cert.id) ? `; exam guide coverage: ${url(`/${cert.id}/coverage/`)}` : '';
    return `- [${certFullName(cert)}](${url(`/${cert.id}/`)}): ${view.units.length} topics, ${deckCards(view).length} flashcards${coverage}`;
  }));
  const topics = (await getCertView(GOLDEN_TRAIL.id)).units.map(({ unit }) => `- [${unit.data.title}](${url(`/${GOLDEN_TRAIL.id}/${unit.id}/`)}): ${plainText(unit.data.summary)}`);
  const body = [
    '# Easy Review',
    '',
    '> Free study notes, step-by-step diagrams and spaced-repetition flashcards for AWS Certification exams. Every fact links to the AWS documentation page it comes from. Made by Jorge Hermes (https://jhermesn.dev). Not affiliated with AWS.',
    '',
    'Each topic is written once and shared by every exam that covers it. Topic pages list notes, exam cues, traps and the flashcards as plain HTML.',
    '',
    '## Exams',
    ...exams,
    '',
    '## Topics',
    ...topics,
    '',
    '## Optional',
    `- [Who passed](${url('/passed/')}): people who studied here and passed, checked against their Credly badges`,
    '- [Source code](https://github.com/jhermesn/easyreview): MIT for code, CC BY 4.0 for content',
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
