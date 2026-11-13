// Web app manifest, built so paths follow the configured base path.
import { withBase } from '../lib/format';

export function GET() {
  const manifest = {
    name: 'Easy Review: AWS Certification study notes',
    short_name: 'Easy Review',
    description: 'Notes, diagrams and flashcards for AWS certification exams, from the AWS docs.',
    start_url: withBase('/'),
    scope: withBase('/'),
    display: 'standalone',
    background_color: '#06090d',
    theme_color: '#06090d',
    icons: [
      { src: withBase('/icons/icon-192.png'), sizes: '192x192', type: 'image/png' },
      { src: withBase('/icons/icon-512.png'), sizes: '512x512', type: 'image/png' },
      { src: withBase('/icons/maskable-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
  return new Response(JSON.stringify(manifest), { headers: { 'Content-Type': 'application/manifest+json' } });
}
