import { describe, expect, it } from 'vitest';
import { shareLinks } from './share';

describe('shareLinks', () => {
  const links = shareLinks('Concluí o tópico IAM & MFA. Venha estudar também!', 'https://jhermesn.dev/easyreview/pt-br/clf-c02/iam/');
  const href = (name: string) => links.find((l) => l.name === name)!.href;

  it('encodes the text and the URL so accents and symbols survive', () => {
    expect(href('X')).toBe(
      'https://twitter.com/intent/tweet?text=Conclu%C3%AD%20o%20t%C3%B3pico%20IAM%20%26%20MFA.%20Venha%20estudar%20tamb%C3%A9m!&url=https%3A%2F%2Fjhermesn.dev%2Feasyreview%2Fpt-br%2Fclf-c02%2Fiam%2F',
    );
  });

  it('puts text and link in one message where the network takes a single field', () => {
    expect(decodeURIComponent(new URL(href('WhatsApp')).searchParams.get('text')!)).toBe(
      'Concluí o tópico IAM & MFA. Venha estudar também! https://jhermesn.dev/easyreview/pt-br/clf-c02/iam/',
    );
  });

  it('gives LinkedIn and Facebook only the page URL', () => {
    expect(new URL(href('LinkedIn')).searchParams.get('url')).toBe('https://jhermesn.dev/easyreview/pt-br/clf-c02/iam/');
    expect(new URL(href('Facebook')).searchParams.get('u')).toBe('https://jhermesn.dev/easyreview/pt-br/clf-c02/iam/');
  });

  it('only links to https share pages', () => {
    expect(links.every((l) => l.href.startsWith('https://'))).toBe(true);
  });
});
