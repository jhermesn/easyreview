// "Known" sections, kept in this browser. Sections are shared between certs, so a section marked
// known while studying one exam shows as known in every other exam that includes it.
import { KEYS, readJson, writeJson } from './storage';
import { badgeUrl } from './badge';

type Known = Record<string, number>;
export const readKnown = () => readJson<Known>(KEYS.known, {});

export function setKnown(ids: string[], known: boolean) {
  const all = readKnown();
  for (const id of ids) {
    if (known) all[id] = Date.now();
    else delete all[id];
  }
  writeJson(KEYS.known, all);
  applyKnown(all);
}

const idsOf = (value = '') => value.split(',').filter(Boolean);

// Section id -> time of its latest material change (Base.astro writes them into every page).
let revisions: Record<string, number> | undefined;
function readRevisions(): Record<string, number> {
  if (!revisions) {
    try {
      revisions = JSON.parse(document.querySelector('script[data-revisions]')?.textContent ?? '{}');
    } catch {
      revisions = {};
    }
  }
  return revisions!;
}
// Marked known, but the section changed afterwards: the reader should re-read it, so it no longer counts.
export const isUpdated = (id: string, all: Known, rev = readRevisions()) => !!all[id] && (rev[id] ?? 0) > all[id];
const isKnown = (id: string, all: Known) => !!all[id] && !isUpdated(id, all);
const allKnown = (ids: string[], all: Known) => ids.length > 0 && ids.every((id) => isKnown(id, all));
const anyUpdated = (ids: string[], all: Known) => ids.some((id) => isUpdated(id, all));

// Elements opt in with data attributes (values are comma-separated section ids):
//   data-known="a,b"         gets .is-known when every id is known (a unit = its sections), and
//                            .is-updated when one of them changed after it was marked
//   data-updated-only="a,b"  shown only while one of the ids is updated; a [data-updated-list]
//                            around such elements is shown only while one of them is
//   data-known-set="a,b|c"   groups split by "|" (a topic = its sections); sets --pct and fills
//                            [data-known-count] with "known groups/total groups" and
//                            [data-known-pct] with the share known, for spaces too small for the count
//   data-known-toggle="a,b"  button that marks all ids known or not (aria-pressed reflects state)
//   data-cert on a known-set  records whether that cert is complete (every group known)
//   img[data-badge-cert]      shows the gold badge once its cert is complete
//   data-known-cert="cert-id" gets .is-known once that cert is complete
export function applyKnown(all = readKnown()) {
  document.querySelectorAll<HTMLElement>('[data-known]').forEach((el) => {
    const ids = idsOf(el.dataset.known);
    el.classList.toggle('is-known', allKnown(ids, all));
    el.classList.toggle('is-updated', anyUpdated(ids, all));
  });
  document.querySelectorAll<HTMLElement>('[data-updated-only]').forEach((el) => (el.hidden = !anyUpdated(idsOf(el.dataset.updatedOnly), all)));
  document.querySelectorAll<HTMLElement>('[data-updated-list]').forEach((el) => (el.hidden = !el.querySelector('[data-updated-only]:not([hidden])')));
  const complete = readJson<Record<string, boolean>>(KEYS.complete, {});
  document.querySelectorAll<HTMLElement>('[data-known-set]').forEach((el) => {
    const groups = (el.dataset.knownSet ?? '').split('|').map(idsOf).filter((g) => g.length);
    const n = groups.filter((g) => allKnown(g, all)).length;
    const pct = `${groups.length ? Math.round((n / groups.length) * 100) : 0}%`;
    el.style.setProperty('--pct', pct);
    const count = el.querySelector<HTMLElement>('[data-known-count]');
    if (count) count.textContent = `${n}/${groups.length}`;
    const share = el.querySelector<HTMLElement>('[data-known-pct]');
    if (share) share.textContent = pct;
    if (el.dataset.cert) complete[el.dataset.cert] = groups.length > 0 && n === groups.length;
    el.classList.toggle('is-gold', !!el.dataset.cert && complete[el.dataset.cert]);
  });
  // Pages without a cert's known-set (search, 404) rely on the last recorded state.
  writeJson(KEYS.complete, complete);
  document.querySelectorAll<HTMLElement>('[data-known-cert]').forEach((el) => el.classList.toggle('is-known', !!complete[el.dataset.knownCert!]));
  // A cert finished for the first time gets one celebration, on a page that can show it (CertCelebration).
  const celebrated = readJson<Record<string, boolean>>(KEYS.celebrated, {});
  const fresh = [...document.querySelectorAll<HTMLElement>('[data-celebrate]')].map((el) => el.dataset.celebrate!).filter((c) => complete[c] && !celebrated[c]);
  if (fresh.length) {
    for (const c of fresh) celebrated[c] = true;
    writeJson(KEYS.celebrated, celebrated);
    for (const c of fresh) document.dispatchEvent(new CustomEvent('easyreview:cert-complete', { detail: c }));
  }
  document.querySelectorAll<HTMLImageElement>('img[data-badge-cert]').forEach((img) => {
    const gold = !!complete[img.dataset.badgeCert!];
    const src = badgeUrl(img.dataset.badgeCert!, gold);
    if (!img.src.endsWith(src)) img.src = src;
    img.classList.toggle('is-gold', gold);
  });
  document.querySelectorAll<HTMLButtonElement>('[data-known-toggle]').forEach((btn) => {
    const ids = idsOf(btn.dataset.knownToggle);
    const on = allKnown(ids, all);
    btn.setAttribute('aria-pressed', String(on));
    btn.classList.toggle('is-known', on);
    if (!btn.dataset.bound) {
      btn.dataset.bound = '1';
      btn.addEventListener('click', () => setKnown(ids, btn.getAttribute('aria-pressed') !== 'true'));
    }
  });
  // Components that derive state from known topics (the roadmap's next topic) update after this.
  document.dispatchEvent(new CustomEvent('easyreview:known-applied'));
}
