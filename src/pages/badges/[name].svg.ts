import type { APIRoute } from 'astro';
import { certs, getCert } from '../../lib/certs';
import { badgeSvg } from '../../lib/badge';

export function getStaticPaths() {
  return certs.flatMap((c) => [{ params: { name: c.id } }, { params: { name: `${c.id}-gold` } }]);
}

export const GET: APIRoute = ({ params }) => {
  const gold = params.name!.endsWith('-gold');
  const cert = getCert(params.name!.replace(/-gold$/, ''));
  return new Response(badgeSvg(cert, gold), { headers: { 'content-type': 'image/svg+xml' } });
};
