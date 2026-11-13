import type { Cert } from './certs';
import { withBase } from './format';

export const absoluteUrl = (path: string, site: URL) => new URL(withBase(path), site).href;

export const certFullName = (cert: Cert) => `AWS Certified ${cert.name} (${cert.code})`;

// schema.org BreadcrumbList: home, then each level down to the current page.
export function breadcrumbs(trail: { name: string; path: string }[], site: URL) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Easy Review', path: '/' }, ...trail].map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path, site),
    })),
  };
}
