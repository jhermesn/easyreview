// Diagram geometry (used by Diagram.astro) and layout lint (run by scripts/lint-content.mjs).
// Diagrams are authored as coordinates without a preview, so the lint reports what the author can't see.

export interface Box { x: number; y: number; w: number; h: number }
export interface DNode extends Box { id: string; label: string; sub?: string; info?: string; tone?: string; icon?: string }
export interface DEdge { from: string; to: string; step?: number; label?: string; dashed?: boolean }
export interface DGroup extends Box { label: string; tone?: string; icon?: string }
export interface DiagramInput {
  id: string;
  width: number;
  height: number;
  groups: DGroup[];
  nodes: DNode[];
  edges: DEdge[];
  steps: string[];
}

// Defaults must match src/content.config.ts.
export function withDefaults(d: Partial<DiagramInput> & { id: string; nodes: Partial<DNode>[] }): DiagramInput {
  return {
    id: d.id,
    width: d.width ?? 800,
    height: d.height ?? 420,
    groups: d.groups ?? [],
    nodes: d.nodes.map((n) => ({ w: 140, h: 56, ...n }) as DNode),
    edges: d.edges ?? [],
    steps: d.steps ?? [],
  };
}

// Clip the centre-to-centre line to each node's border so arrows touch the box edge.
function borderPoint(n: Box, dx: number, dy: number) {
  const cx = n.x + n.w / 2;
  const cy = n.y + n.h / 2;
  const t = Math.min(dx === 0 ? Infinity : n.w / 2 / Math.abs(dx), dy === 0 ? Infinity : n.h / 2 / Math.abs(dy));
  return { x: cx + dx * t, y: cy + dy * t };
}

export function layoutEdges(d: DiagramInput) {
  const byId = new Map(d.nodes.map((n) => [n.id, n]));
  return d.edges.flatMap((e) => {
    const a = byId.get(e.from);
    const b = byId.get(e.to);
    if (!a || !b) return [];
    const dx = b.x + b.w / 2 - (a.x + a.w / 2);
    const dy = b.y + b.h / 2 - (a.y + a.h / 2);
    const len = Math.hypot(dx, dy) || 1;
    const p1 = borderPoint(a, dx / len, dy / len);
    const p2 = borderPoint(b, -dx / len, -dy / len);
    const end = { x: p2.x - (dx / len) * 4, y: p2.y - (dy / len) * 4 };
    return [{ ...e, p1, end, mid: { x: (p1.x + end.x) / 2, y: (p1.y + end.y) / 2 } }];
  });
}

// IBM Plex Mono is monospaced: text width is about characters x a fixed advance per font size.
export const CHAR_WIDTH = { label: 7.7, sub: 6.4, group: 7.4, edge: 6.7 };

// Icon nodes stack an official AWS icon, the name and the subtitle (draw.io AWS style).
export const ICON = { node: 40, group: 24, pad: 8 };
export function nodeText(n: DNode) {
  if (!n.icon) return { label: n.y + n.h / 2 + (n.sub ? -3 : 5), sub: n.y + n.h / 2 + 13 };
  const label = n.y + ICON.pad + ICON.node + 16;
  return { label, sub: label + 14 };
}
const minHeight = (n: DNode) => (n.icon ? ICON.pad + ICON.node + 16 + (n.sub ? 14 : 0) + 8 : 0);

// Where an edge label is drawn (above its step badge when there is one).
export const edgeLabelY = (mid: { y: number }, hasStep: boolean) => mid.y - (hasStep ? 16 : 6);

const hit = (a: Box, b: Box) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
const inside = (p: { x: number; y: number }, n: Box) => p.x > n.x + 2 && p.x < n.x + n.w - 2 && p.y > n.y + 2 && p.y < n.y + n.h - 2;

export function lintDiagram(d: DiagramInput): string[] {
  const problems: string[] = [];
  const ids = new Set(d.nodes.map((n) => n.id));
  const edges = layoutEdges(d);

  for (const n of d.nodes) {
    if (n.x < 0 || n.y < 0 || n.x + n.w > d.width || n.y + n.h > d.height) problems.push(`node "${n.id}" leaves the viewBox`);
    for (const m of d.nodes) if (n.id < m.id && hit(n, m)) problems.push(`nodes "${n.id}" and "${m.id}" overlap`);
    if (n.label.length * CHAR_WIDTH.label > n.w - 14) problems.push(`label of "${n.id}" overflows its box (needs w >= ${Math.ceil(n.label.length * CHAR_WIDTH.label + 14)})`);
    if (n.sub && n.sub.length * CHAR_WIDTH.sub > n.w - 12) problems.push(`sub of "${n.id}" overflows its box (needs w >= ${Math.ceil(n.sub.length * CHAR_WIDTH.sub + 12)})`);
    if (n.h < minHeight(n)) problems.push(`icon node "${n.id}" is too short (needs h >= ${minHeight(n)})`);
  }
  for (const g of d.groups) {
    if (g.label.length * CHAR_WIDTH.group + (g.icon ? ICON.group + 6 : 0) > g.w - 20) problems.push(`group label "${g.label}" is wider than its group`);
    if (g.x < 0 || g.y < 0 || g.x + g.w > d.width || g.y + g.h > d.height) problems.push(`group "${g.label}" leaves the viewBox`);
  }
  for (const e of d.edges) if (!ids.has(e.from) || !ids.has(e.to)) problems.push(`edge ${e.from}->${e.to} references a missing node`);
  for (const e of edges) {
    for (const n of d.nodes) {
      if (n.id === e.from || n.id === e.to) continue;
      const crosses = Array.from({ length: 41 }, (_, i) => i / 40).some((t) => inside({ x: e.p1.x + (e.end.x - e.p1.x) * t, y: e.p1.y + (e.end.y - e.p1.y) * t }, n));
      if (crosses) problems.push(`edge ${e.from}->${e.to} crosses node "${n.id}"`);
    }
  }
  const labels = edges.filter((e) => e.label).map((e) => {
    const w = e.label!.length * CHAR_WIDTH.edge + 6;
    return { id: `${e.from}->${e.to}`, x: e.mid.x - w / 2, y: edgeLabelY(e.mid, !!e.step) - 11, w, h: 14 };
  });
  labels.forEach((l, i) => {
    for (const n of d.nodes) if (hit(l, n)) problems.push(`edge label ${l.id} overlaps node "${n.id}"`);
    for (const o of labels.slice(i + 1)) if (hit(l, o)) problems.push(`edge labels ${l.id} and ${o.id} overlap`);
    if (l.x < 0 || l.x + l.w > d.width) problems.push(`edge label ${l.id} leaves the viewBox`);
  });
  const stepNumbers = d.edges.flatMap((e) => (e.step ? [e.step] : []));
  d.steps.forEach((_, i) => { if (!stepNumbers.includes(i + 1)) problems.push(`step ${i + 1} has no edge`); });
  return problems;
}
