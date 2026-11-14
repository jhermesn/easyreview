import { describe, expect, it } from 'vitest';
import { englishPathOf, glossaryProblems, hashText, mergeGlossary, mergeSection, sectionProblems, translationPathOf, type SectionTranslation } from './translate';

const english = {
  title: 'Blue/green',
  facts: [{ id: 'f1', text: 'Two environments run at once.', source: 'https://docs.aws.amazon.com/x' }],
  cards: [{ id: 'c1', q: 'What runs?', a: 'Two environments.', trap: false, facts: ['f1'] }],
  diagrams: [
    {
      id: 'flow',
      title: 'Traffic shift',
      groups: [{ label: 'Production', x: 0, y: 0, w: 10, h: 10 }],
      nodes: [{ id: 'lb', label: 'Load balancer', x: 0, y: 0, w: 1, h: 1 }, { id: 'blue', label: 'Blue', x: 0, y: 0, w: 1, h: 1 }],
      edges: [{ from: 'lb', to: 'blue', label: 'all traffic' }],
      steps: ['Shift traffic'],
    },
  ],
};
const body = '### How it works\ntext\n### Exam cues\n- cue\n';
const translation: SectionTranslation = {
  source: 'abcdef012345',
  title: 'Blue/green (pt)',
  facts: { f1: 'Dois ambientes rodam ao mesmo tempo.' },
  cards: { c1: { q: 'O que roda?', a: 'Dois ambientes.' } },
  diagrams: { flow: { title: 'Troca de tráfego', nodes: { lb: { label: 'Balanceador' } }, groups: ['Produção'], edges: { 'lb>blue': 'todo o tráfego' }, steps: ['Trocar o tráfego'] } },
};
const translatedBody = '### Como funciona\ntexto\n### Dicas para a prova\n- dica\n';

describe('sectionProblems', () => {
  it('accepts a translation that covers every fact and card with the same headings', () => {
    expect(sectionProblems(english, body, translation, translatedBody)).toEqual([]);
  });

  it.each([
    ['a missing fact', { ...translation, facts: {} }, translatedBody, 'fact "f1" is not translated'],
    ['an extra card', { ...translation, cards: { ...translation.cards, c9: { q: 'q', a: 'a' } } }, translatedBody, 'card "c9" is not in the English file'],
    ['an unknown diagram node', { ...translation, diagrams: { flow: { nodes: { db: { label: 'x' } } } } }, translatedBody, 'diagram flow: node "db" is not in the English diagram'],
    ['a step count change', { ...translation, diagrams: { flow: { steps: [] } } }, translatedBody, 'diagram flow: 0 steps for 1'],
    ['a dropped heading', translation, '### Como funciona\ntexto\n', 'body headings "###" differ from the English "### ###"'],
  ])('reports %s', (_case, tr, trBody, problem) => {
    expect(sectionProblems(english, body, tr as SectionTranslation, trBody)).toContain(problem);
  });
});

describe('mergeSection', () => {
  const merged = mergeSection(english, translation);

  it('replaces the text and keeps ids, sources and card facts', () => {
    expect(merged.facts[0]).toEqual({ id: 'f1', text: 'Dois ambientes rodam ao mesmo tempo.', source: 'https://docs.aws.amazon.com/x' });
    expect(merged.cards[0]).toEqual({ id: 'c1', q: 'O que roda?', a: 'Dois ambientes.', trap: false, facts: ['f1'] });
  });

  it('translates diagram text without touching the layout', () => {
    const d = merged.diagrams[0];
    expect([d.title, d.groups[0].label, d.nodes[0].label, d.nodes[1].label, d.edges[0].label, d.steps[0]]).toEqual(['Troca de tráfego', 'Produção', 'Balanceador', 'Blue', 'todo o tráfego', 'Trocar o tráfego']);
    expect(d.nodes[0].x).toBe(0);
  });
});

describe('glossary', () => {
  const terms = [{ term: 'Deployment group', aliases: [], definition: 'Instances a deployment targets.' }];
  const tr = { source: 'abcdef012345', terms: { 'Deployment group': { term: 'Grupo de implantação', aliases: [], definition: 'Instâncias que uma implantação atinge.' } } };

  it('merges terms by their English name', () => {
    expect(mergeGlossary(terms, tr)[0].term).toBe('Grupo de implantação');
  });

  it('reports a term the translation leaves out', () => {
    expect(glossaryProblems(terms, { ...tr, terms: {} })).toEqual(['term "Deployment group" is not translated']);
  });
});

describe('paths and hashes', () => {
  it('maps a translation to its English file and back', () => {
    expect(englishPathOf('src/content/i18n/pt-br/sections/codedeploy/hooks.md')).toBe('src/content/sections/codedeploy/hooks.md');
    expect(translationPathOf('src/content/glossary/codedeploy.json', 'pt-br')).toBe('src/content/i18n/pt-br/glossary/codedeploy.json');
  });

  it('hashes Windows and Unix line endings alike', () => {
    expect(hashText('a\r\nb')).toBe(hashText('a\nb'));
  });
});
