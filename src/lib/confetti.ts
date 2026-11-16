// A short burst of confetti drawn on a canvas inside `host`. A modal dialog sits in the top layer, so the
// canvas goes inside it to show above the backdrop. Skipped when the reader prefers reduced motion.
const DURATION = 3200;
const COLORS = ['--amber', '--mint', '--purple', '--gold', '--magenta'];

export function confetti(host: HTMLElement = document.body) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { position: 'fixed', inset: '0', width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: '1' });
  canvas.setAttribute('aria-hidden', 'true');
  host.append(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas.remove();
  const dpr = devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const style = getComputedStyle(document.documentElement);
  const colors = COLORS.map((c) => style.getPropertyValue(c).trim()).filter(Boolean);
  const pieces = Array.from({ length: 160 }, (_, i) => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * innerWidth * 0.4,
    y: innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 14,
    vy: -4 - Math.random() * 12,
    size: 5 + Math.random() * 6,
    rot: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.3,
    color: colors[i % colors.length] || '#f5b301',
  }));

  const start = performance.now();
  const frame = (now: number) => {
    const elapsed = now - start;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.globalAlpha = Math.max(0, 1 - elapsed / DURATION);
    for (const p of pieces) {
      p.vy += 0.35;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }
    if (elapsed < DURATION) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
