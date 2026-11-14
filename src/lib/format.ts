export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function inline(s: string): string {
  return escapeHtml(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

// Minimal formatter for flashcard answers and diagram info text:
// escapes HTML, then supports `code`, **bold**, "- " bullet lines and line breaks.
export function formatRich(text: string): string {
  const lines = text.trim().split('\n');
  const out: string[] = [];
  let inList = false;
  for (const raw of lines) {
    const line = raw.trimEnd();
    const bullet = /^\s*[-*] (.*)$/.exec(line);
    if (bullet) {
      if (!inList) out.push('<ul>');
      inList = true;
      out.push(`<li>${inline(bullet[1])}</li>`);
      continue;
    }
    if (inList) out.push('</ul>');
    inList = false;
    if (line.trim()) out.push(`<p>${inline(line)}</p>`);
  }
  if (inList) out.push('</ul>');
  return out.join('');
}

// Card text without the inline markup of formatRich, for structured data.
export const plainText = (text: string) => text.replace(/\*\*|`/g, '').replace(/\s*\n\s*(- )?/g, ' ').trim();

export const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// JSON for an inline <script> tag: "<" is escaped so the data can never close the tag.
export const jsonForScript = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
