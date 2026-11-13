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
const allKnown = (ids: string[], all: Known) => ids.length > 0 && ids.every((id) => all[id]);

// Elements opt in with data attributes (values are comma-separated section ids):
//   data-known="a,b"         gets .is-known when every id is known (a unit = its sections)
//   data-known-set="a,b|c"   groups split by "|" (a topic = its sections); sets --pct and fills
//                            [data-known-count] with "known groups/total groups"
//   data-known-toggle="a,b"  button that marks all ids known or not (aria-pressed reflects state)
//   data-cert on a known-set  records whether that cert is complete (every group known)
//   img[data-badge-cert]      shows the gold badge once its cert is complete
export function applyKnown(all = readKnown()) {
  document.querySelectorAll<HTMLElement>('[data-known]').forEach((el) => el.classList.toggle('is-known', allKnown(idsOf(el.dataset.known), all)));
  const complete = readJson<Record<string, boolean>>(KEYS.complete, {});
  document.querySelectorAll<HTMLElement>('[data-known-set]').forEach((el) => {
    const groups = (el.dataset.knownSet ?? '').split('|').map(idsOf).filter((g) => g.length);
    const n = groups.filter((g) => allKnown(g, all)).length;
    el.style.setProperty('--pct', `${groups.length ? Math.round((n / groups.length) * 100) : 0}%`);
    const count = el.querySelector<HTMLElement>('[data-known-count]');
    if (count) count.textContent = `${n}/${groups.length}`;
    if (el.dataset.cert) complete[el.dataset.cert] = groups.length > 0 && n === groups.length;
    el.classList.toggle('is-gold', !!el.dataset.cert && complete[el.dataset.cert]);
  });
  // Pages without a cert's known-set (search, 404) rely on the last recorded state.
  writeJson(KEYS.complete, complete);
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
}
