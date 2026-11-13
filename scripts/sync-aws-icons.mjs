// Index the official AWS Architecture Icons package and copy the icons diagrams use.
//
// Download and unzip the package from https://aws.amazon.com/architecture/icons/ anywhere outside
// the repository, then pass its folder. This script writes:
//   src/data/aws-icons.json   every icon id with its official name, kind and release
//   public/aws-icons/<id>.svg only the icons referenced by `icon:` in content (units and diagrams)
// Usage: node scripts/sync-aws-icons.mjs <package dir>
//        node scripts/sync-aws-icons.mjs --check   (build: no package needed; every used icon must be
//                                                   indexed and copied)
// Ids: services drop the Amazon/AWS prefix ("codedeploy", "route-53"); resources are
// "res-<service>-<resource>" or "res-<name>" for general icons; groups are "group-<name>".
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

function usedIcons() {
  const used = new Set();
  for (const file of walk('src/content')) {
    if (!file.endsWith('.md')) continue;
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(/\bicon:\s*["']?([a-z0-9-]+)/g)) used.add(m[1]);
  }
  return used;
}

if (process.argv[2] === '--check') {
  const { icons } = JSON.parse(readFileSync('src/data/aws-icons.json', 'utf8'));
  const bad = [...usedIcons()].filter((id) => !icons[id] || !existsSync(join('public/aws-icons', `${id}.svg`)));
  if (bad.length) {
    console.error(`[icons] not indexed or not copied: ${bad.join(', ')}. Run node scripts/sync-aws-icons.mjs <package dir>.`);
    process.exit(1);
  }
  process.exit(0);
}

const pkg = process.argv[2];
if (!pkg || !existsSync(pkg)) {
  console.error('[icons] usage: node scripts/sync-aws-icons.mjs <package dir> (download it from https://aws.amazon.com/architecture/icons/)');
  process.exit(1);
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const stripVendor = (s) => s.replace(/^(Amazon|AWS)-/, '');
const icons = {};
let release = '';

function add(id, entry) {
  if (icons[id] && icons[id].file !== entry.file) id = `${id}-${slug(entry.vendor ?? 'alt')}`;
  icons[id] = entry;
}

for (const file of walk(pkg)) {
  if (!file.endsWith('.svg')) continue;
  release ||= /_(\d{8})/.exec(file)?.[1] ?? '';
  const name = basename(file, '.svg');
  let m;
  if ((m = /^Arch_(.+)_48$/.exec(name))) {
    const vendor = /^(Amazon|AWS)-/.exec(m[1])?.[1];
    add(slug(stripVendor(m[1])), { kind: 'service', name: m[1].replace(/-/g, ' '), file, vendor });
  } else if ((m = /^Res_(.+)_48(_Dark)?$/.exec(name))) {
    // Prefer the dark variant: the site has a dark background.
    const id = `res-${slug(stripVendor(m[1]))}`;
    if (icons[id] && !m[2]) continue;
    icons[id] = { kind: 'resource', name: m[1].replace(/_/g, ' ').replace(/-/g, ' '), file };
  } else if ((m = /^(.+)_32(_Dark)?$/.exec(name)) && file.includes('Architecture-Group-Icons')) {
    const id = `group-${slug(m[1])}`;
    if (icons[id] && !m[2]) continue;
    icons[id] = { kind: 'group', name: m[1].replace(/-/g, ' '), file };
  }
}

const used = usedIcons();
const missing = [...used].filter((id) => !icons[id]);
if (missing.length) {
  console.error(`[icons] unknown icon ids: ${missing.join(', ')} (see src/data/aws-icons.json)`);
  process.exit(1);
}

mkdirSync('public/aws-icons', { recursive: true });
for (const id of used) copyFileSync(icons[id].file, join('public/aws-icons', `${id}.svg`));

const index = Object.fromEntries(
  Object.entries(icons)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, { kind, name }]) => [id, { kind, name }]),
);
writeFileSync('src/data/aws-icons.json', JSON.stringify({ release, source: 'https://aws.amazon.com/architecture/icons/', icons: index }, null, 1) + '\n');
console.log(`[icons] release ${release}: ${Object.keys(icons).length} icons indexed, ${used.size} copied to public/aws-icons/`);
