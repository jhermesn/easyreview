// Share links that need no script from the social network: each one opens that network's own share page.
export interface ShareLink {
  name: string;
  href: string;
}

export function shareLinks(text: string, url: string): ShareLink[] {
  const e = encodeURIComponent;
  const textAndUrl = e(`${text} ${url}`);
  return [
    // LinkedIn takes only the URL and builds the post from the page preview.
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}` },
    { name: 'X', href: `https://twitter.com/intent/tweet?text=${e(text)}&url=${e(url)}` },
    { name: 'WhatsApp', href: `https://wa.me/?text=${textAndUrl}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}` },
    { name: 'Bluesky', href: `https://bsky.app/intent/compose?text=${textAndUrl}` },
    { name: 'Telegram', href: `https://t.me/share/url?url=${e(url)}&text=${e(text)}` },
  ];
}
