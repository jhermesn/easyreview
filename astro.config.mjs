import { defineConfig, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { autolink } from './src/lib/autolink.ts';
import { DEFAULT_LOCALE, LOCALES } from './src/i18n/locales.ts';

const base = process.env.BASE_PATH ?? '/easyreview';

// GitHub Pages project site: https://<user>.github.io/<repo>/
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://jhermesn.dev',
  base,
  output: 'static',
  trailingSlash: 'ignore',
  // "Who passed" photos are downloaded from GitHub at build time and served from this site.
  image: { domains: ['avatars.githubusercontent.com'] },
  // Interface languages: English at the root, the others under /<locale>/ (pages live in src/pages/[...lang]).
  i18n: { defaultLocale: DEFAULT_LOCALE, locales: Object.keys(LOCALES), routing: { prefixDefaultLocale: false } },
  integrations: [sitemap({ i18n: { defaultLocale: DEFAULT_LOCALE, locales: Object.fromEntries(Object.entries(LOCALES).map(([id, l]) => [id, l.lang])) } })],
  markdown: { processor: satteri({ hastPlugins: [autolink({ base })] }) },
  // The home hero's three.js chunk (~570 kB, ~140 kB gzip) loads lazily after first paint.
  vite: { build: { chunkSizeWarningLimit: 650 } },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
    // Brand wordmark.
    { provider: fontProviders.fontsource(), name: 'Space Grotesk', cssVariable: '--font-display', weights: [600, 700], styles: ['normal'], subsets: ['latin'] },
    // Handwritten accent (hero label).
    { provider: fontProviders.fontsource(), name: 'Dancing Script', cssVariable: '--font-script', weights: [600, 700], styles: ['normal'], subsets: ['latin'] },
  ],
});
