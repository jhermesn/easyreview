import { describe, expect, it } from 'vitest';
import { lintDiagram, withDefaults } from './diagram';

const node = (id: string, x: number, y = 40) => ({ id, label: id, x, y, w: 120, h: 60 });
const diagram = (overrides: Record<string, unknown> = {}) =>
  withDefaults({ id: 'd', nodes: [node('a', 20), node('b', 300)], edges: [{ from: 'a', to: 'b', step: 1 }], steps: ['A calls B.'], ...overrides });

describe('lintDiagram', () => {
  it('accepts a clean layout', () => {
    expect(lintDiagram(diagram())).toEqual([]);
  });

  it('reports overlapping nodes', () => {
    expect(lintDiagram(diagram({ nodes: [node('a', 20), node('b', 60)] }))).toContain('nodes "a" and "b" overlap');
  });

  it('reports a node outside the viewBox', () => {
    expect(lintDiagram(diagram({ nodes: [node('a', 20), node('b', 760)] }))).toContain('node "b" leaves the viewBox');
  });

  it('reports an edge that crosses a third node', () => {
    const nodes = [node('a', 20), node('mid', 300), node('b', 600)];
    const problems = lintDiagram(diagram({ nodes, edges: [{ from: 'a', to: 'b', step: 1 }] }));
    expect(problems).toContain('edge a->b crosses node "mid"');
  });

  it('reports an edge to a missing node and a step with no edge', () => {
    const problems = lintDiagram(diagram({ edges: [{ from: 'a', to: 'ghost' }], steps: ['Orphan step.'] }));
    expect(problems).toEqual(expect.arrayContaining(['edge a->ghost references a missing node', 'step 1 has no edge']));
  });
});
