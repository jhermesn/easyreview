// Small page animations, opt-in through data attributes and skipped for reduced motion:
//   data-count-up   an element whose text is an integer counts up from 0 when it scrolls into view
//   data-reveal     a list whose children fade in one after another when it scrolls into view
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.target ?? el.textContent);
  if (!Number.isFinite(target)) return;
  el.dataset.target = String(target);
  const start = performance.now();
  const duration = 900 + Math.min(target, 1000) * 0.4;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    el.textContent = String(Math.round(target * (1 - (1 - t) ** 3)));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function reveal(list: HTMLElement) {
  [...list.children].forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(Math.min(i, 12))));
  list.classList.add('revealed');
}

export function animatePage() {
  const counters = document.querySelectorAll<HTMLElement>('[data-count-up]');
  const lists = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduced()) {
    lists.forEach((l) => l.classList.add('revealed', 'instant'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target as HTMLElement;
      if (el.hasAttribute('data-count-up')) countUp(el);
      else reveal(el);
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  counters.forEach((c) => io.observe(c));
  lists.forEach((l) => io.observe(l));
}
