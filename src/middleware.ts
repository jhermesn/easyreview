// Markdown renders once for every locale, so links that the glossary plugin (src/lib/autolink.ts) puts in
// section bodies point at default-locale pages. On other locales, point them at the same locale.
import { defineMiddleware } from 'astro:middleware';
import { DEFAULT_LOCALE, localeOf, localePath, stripLocale } from './i18n';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const locale = localeOf(context.currentLocale);
  if (locale === DEFAULT_LOCALE || !response.headers.get('content-type')?.includes('text/html')) return response;
  const html = (await response.text()).replace(/<a href="([^"]+)" class="unit-link"/g, (_, href: string) => `<a href="${localePath(locale, stripLocale(href))}" class="unit-link"`);
  return new Response(html, response);
});
