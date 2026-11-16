// The header's menus open one at a time: the sidebar and the "more tools" list on phones, and the
// reminder, progress transfer and language panels. A click outside or Escape closes them.
const get = <T extends Element>(selector: string) => document.querySelector<T>(selector);

function setOpen(panel: HTMLElement | null, button: HTMLElement | null, open: boolean) {
  panel?.classList.toggle('open', open);
  button?.setAttribute('aria-expanded', String(open));
}

// Closes every header menu except `keep` (and the tools list when `keep` sits inside it).
function closeAll(keep?: Element) {
  document.querySelectorAll<HTMLDetailsElement>('.topbar details[open]').forEach((d) => {
    if (d !== keep) d.open = false;
  });
  const tools = get<HTMLElement>('[data-tools]');
  if (!keep || !tools?.contains(keep)) setOpen(tools, get('[data-more]'), false);
  setOpen(get('[data-sidebar]'), get('[data-menu]'), false);
}

let documentBound = false;

// Runs on every page load; the header is replaced on navigation, so its elements are bound again.
export function bindHeaderMenus() {
  const header = get<HTMLElement>('.topbar');
  if (header && !header.dataset.menus) {
    header.dataset.menus = '1';
    // toggle doesn't bubble, so it is caught on the way down.
    header.addEventListener('toggle', (e) => {
      if (e.target instanceof HTMLDetailsElement && e.target.open) closeAll(e.target);
    }, true);
  }

  const more = get<HTMLButtonElement>('[data-more]');
  const tools = get<HTMLElement>('[data-tools]');
  if (more && tools && !more.dataset.ready) {
    more.dataset.ready = '1';
    more.addEventListener('click', () => {
      const open = !tools.classList.contains('open');
      closeAll();
      setOpen(tools, more, open);
    });
    tools.addEventListener('click', (e) => {
      if ((e.target as Element).closest('a')) closeAll();
    });
  }

  const menu = get<HTMLButtonElement>('[data-menu]');
  const side = get<HTMLElement>('[data-sidebar]');
  if (menu && side && !menu.dataset.ready) {
    menu.dataset.ready = '1';
    menu.addEventListener('click', () => {
      const open = !side.classList.contains('open');
      closeAll();
      setOpen(side, menu, open);
    });
    side.addEventListener('click', (e) => {
      if ((e.target as Element).closest('a')) setOpen(side, menu, false);
    });
    get('.main')?.addEventListener('click', () => setOpen(side, menu, false));
    side.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest' });
  }

  if (documentBound) return;
  documentBound = true;
  document.addEventListener('click', (e) => {
    const target = e.target as Element;
    document.querySelectorAll<HTMLDetailsElement>('.topbar details[open]').forEach((d) => {
      if (!d.contains(target)) d.open = false;
    });
    if (!target.closest('[data-more], [data-tools]')) setOpen(get('[data-tools]'), get('[data-more]'), false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}
