// The sitemap lists only the pages search engines should index, decided by the same rules the pages declare in
// their canonical and hreflang tags (lib/seo.ts). robots.txt on jhermesn.dev points here.
import type { APIRoute } from 'astro';
import { GOLDEN_TRAIL, availableCerts, studyTracks } from '../lib/certs';
import { getCertView, latestRevision, translatedLocales } from '../lib/content';
import { getGuide } from '../lib/guides';
import { absoluteUrl, englishIndexing, isCanonicalPage, selfIndexing, unitIndexing, type Indexing } from '../lib/seo';
import { LOCALES, localeIds, type Locale } from '../i18n';

interface Page { path: string; indexing: (locale: Locale) => Indexing; lastmod?: Date }

async function pages(): Promise<Page[]> {
  const self = (path: string): Page => ({ path, indexing: (l) => selfIndexing(path, l) });
  const list: Page[] = [self('/'), self('/passed/')];
  for (const cert of studyTracks()) {
    list.push(self(`/${cert.id}/`), { path: `/${cert.id}/flashcards/`, indexing: () => englishIndexing(`/${cert.id}/flashcards/`) });
  }
  for (const cert of availableCerts().filter((c) => getGuide(c.id))) {
    list.push({ path: `/${cert.id}/coverage/`, indexing: () => englishIndexing(`/${cert.id}/coverage/`) });
  }
  // Unit pages of single certs always point at the trail's copy, so only the trail's are listed.
  for (const { unit, sections } of (await getCertView(GOLDEN_TRAIL.id)).units) {
    const translated = await translatedLocales(unit.id);
    const revised = Math.max(0, ...sections.map((s) => latestRevision(s)?.date.getTime() ?? 0));
    list.push({ path: `/${GOLDEN_TRAIL.id}/${unit.id}/`, indexing: (l) => unitIndexing(unit.id, l, translated), lastmod: revised ? new Date(revised) : undefined });
  }
  return list;
}

export const GET: APIRoute = async ({ site }) => {
  const urls: string[] = [];
  for (const page of await pages()) {
    for (const locale of localeIds) {
      const indexing = page.indexing(locale);
      if (!isCanonicalPage(indexing, page.path, locale)) continue;
      const links = indexing.alternates.length > 1
        ? [...indexing.alternates.map((l) => [LOCALES[l].lang, absoluteUrl(page.path, site!, l)]), ['x-default', absoluteUrl(page.path, site!)]]
        : [];
      urls.push(
        `<url><loc>${absoluteUrl(page.path, site!, locale)}</loc>` +
          (page.lastmod ? `<lastmod>${page.lastmod.toISOString().slice(0, 10)}</lastmod>` : '') +
          links.map(([lang, href]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`).join('') +
          '</url>',
      );
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
