// The site's own certification badge art: a square-cornered hexagon on the site's ink and grid,
// coloured by exam level, with the exam code. The gold variant marks a cert whose every topic is known.
// Official AWS Certification badges are reserved for certified individuals, so the site never shows them.
import type { Cert, Level } from './certs';
import { withBase } from './format';

// The official level hues of AWS Certification (slate, blue, teal, indigo, magenta), lightened just enough
// to keep 4.5:1 contrast on the badge's dark fill.
const LEVEL_COLOR: Record<Level, string> = {
  foundational: '#757e8b',
  associate: '#6672e3',
  professional: '#288996',
  specialty: '#7c6ed8',
  business: '#de3d82',
};
// Pips under the code: how far up the AWS track the exam sits.
const LEVEL_PIPS: Record<Level, number> = { foundational: 1, business: 1, associate: 2, professional: 3, specialty: 3 };

const HEX = 'M83 2 164 49v94L83 190 2 143V49Z';
const INNER = 'M83 16 152 56v80L83 176 14 136V56Z';
const FONT = `ui-monospace,'SF Mono',Menlo,Consolas,'Liberation Mono',monospace`;

export const badgeUrl = (certId: string, gold = false) => withBase(`/badges/${certId}${gold ? '-gold' : ''}.svg`);

export function badgeSvg(cert: Cert, gold = false): string {
  const [prefix, version = ''] = cert.code.split('-');
  const accent = gold ? 'url(#gold)' : LEVEL_COLOR[cert.level];
  const pips = LEVEL_PIPS[cert.level];
  const pipRow = Array.from({ length: pips }, (_, i) => {
    const x = 83 - (pips * 10 - 4) / 2 + i * 10;
    return cert.level === 'specialty'
      ? `<rect x="${x + 0.5}" y="155.5" width="5" height="5" transform="rotate(45 ${x + 3} 158)" fill="${accent}"/>`
      : `<rect x="${x}" y="155" width="6" height="6" fill="${accent}"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 166 192" width="498" height="576" font-family="${FONT}" font-weight="700" text-anchor="middle">
<defs>
<clipPath id="hex"><path d="${HEX}"/></clipPath>
<pattern id="grid" width="13" height="13" patternUnits="userSpaceOnUse"><path d="M13 0H0V13" fill="none" stroke="#1f2833" stroke-width="1"/></pattern>
<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2bf"/><stop offset=".45" stop-color="#f2c14e"/><stop offset="1" stop-color="#a8761c"/></linearGradient>
</defs>
<path d="${HEX}" fill="${gold ? '#161208' : '#0b1017'}"/>
<path d="${HEX}" fill="url(#grid)"/>
<path d="${HEX}" fill="none" stroke="${accent}" stroke-width="10" clip-path="url(#hex)"/>
<path d="${INNER}" fill="none" stroke="${gold ? '#5c4a1c' : '#1f2833'}" stroke-width="1.5"/>
<text x="83" y="62" font-size="10.5" letter-spacing="1.6" fill="${accent}">${cert.level.toUpperCase()}</text>
<text x="83" y="114" font-size="44" fill="${gold ? 'url(#gold)' : '#e6ebf2'}">${prefix}</text>
<text x="83" y="139" font-size="18" fill="${gold ? '#f2c14e' : '#97a4b3'}">${version}</text>
${pipRow}
</svg>`;
}
