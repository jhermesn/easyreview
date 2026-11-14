// Markdown renders once for every cert and locale, so a unit link that the glossary plugin (src/lib/autolink.ts)
// puts in a section body points at one cert's default-locale page. Point it at the reader's cert when that cert
// covers the unit, and at the reader's locale.
import { defineMiddleware } from 'astro:middleware';
import { localeOf, localePath, stripLocale } from './i18n';
import { availableCerts } from './lib/certs';
import { getCertView } from './lib/content';

let certUnits: Promise<Map<string, Set<string>>> | undefined;
const unitsByCert = () =>
  (certUnits ??= Promise.all(
    availableCerts().map(async (c) => [c.id, new Set((await getCertView(c.id)).units.map((u) => u.unit.id))] as const),
  ).then((entries) => new Map(entries)));

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const html = await response.text();
  if (!html.includes('class="unit-link"')) return new Response(html, response);
  const locale = localeOf(context.currentLocale);
  const pageCert = stripLocale(context.url.pathname).split('/')[1];
  const covered = (await unitsByCert()).get(pageCert);
  const linked = html.replace(/<a href="([^"]+)" class="unit-link"/g, (_, href: string) => {
    const [, cert, unit] = stripLocale(href).split('/');
    return `<a href="${localePath(locale, `/${covered?.has(unit) ? pageCert : cert}/${unit}`)}" class="unit-link"`;
  });
  return new Response(linked, response);
});
