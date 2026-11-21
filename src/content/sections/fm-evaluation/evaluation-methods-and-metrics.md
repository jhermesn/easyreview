---
title: Evaluation methods and metrics
level: foundational
order: 10
facts:
  - id: combine
    text: A generative AI evaluation strategy normally combines automated metric-based, model-based (LLM-as-a-judge) and human evaluation.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/dev-experimenting-quality.html#dev-experimenting-quality-metrics
  - id: golden
    text: A high-quality, human-curated "golden" evaluation dataset of questions and answers, built from real-world logs, expert examples and synthetic edge cases, is the foundation of generative AI testing.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/dev-experimenting-quality.html#dev-experimenting-quality-datasets
  - id: rouge
    text: ROUGE (Recall-Oriented Understudy for Gisting Evaluation) measures n-gram overlap between generated and reference text, focusing on recall, and is typically used for summarization and question answering.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/dev-experimenting-quality.html#dev-experimenting-quality-metrics
  - id: bleu
    text: BLEU (Bilingual Evaluation Understudy) measures n-gram overlap focusing on precision, penalizes outputs that are too short, and is typically used for machine translation.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/dev-experimenting-quality.html#dev-experimenting-quality-metrics
  - id: bertscore
    text: BERTScore compares embeddings of the generated text and the reference text, so it captures semantic similarity even when the wording differs.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/dev-experimenting-quality.html#dev-experimenting-quality-metrics
  - id: human
    text: Human evaluators rate outputs on a scale or compare two outputs (A/B testing); this suits subjective criteria but is slow, expensive and can be inconsistent.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/dev-experimenting-quality.html#dev-experimenting-quality-metrics
  - id: judge
    text: LLM-as-a-judge uses one LLM to score the outputs of another; it is cheaper and faster than human review but can inherit the judge's biases, so humans should stay in the loop for critical decisions.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/dev-experimenting-quality.html
  - id: judge-family
    text: To avoid self-preference bias, use a judge model from a different model family than the model being evaluated.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/dev-experimenting-quality.html
  - id: faithfulness
    text: Model-based metrics include faithfulness (groundedness), which checks that output is consistent with the source context, relevance to the query, coherence and style adherence.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/dev-experimenting-quality.html#dev-experimenting-quality-metrics
  - id: perplexity
    text: "Perplexity is an intrinsic language modeling metric based on how likely the model finds the test text; a lower perplexity means the model predicts the text better, but it does not always match human judgment."
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/lda.html#lda-or-ntm
cards:
  - id: fm-evaluation-001
    q: Which metric fits a model that translates product descriptions from English to Spanish against reference translations?
    a: BLEU, an n-gram precision metric made for machine translation.
    facts: [bleu]
  - id: fm-evaluation-002
    q: Which metric compares a model's summaries with reference summaries by overlapping words, focusing on recall?
    a: ROUGE (Recall-Oriented Understudy for Gisting Evaluation).
    facts: [rouge]
  - id: fm-evaluation-003
    q: Two answers say the same thing in different words. Which metric still rates them as similar?
    a: BERTScore, which compares embeddings for semantic similarity instead of exact word overlap.
    facts: [bertscore]
  - id: fm-evaluation-004
    q: A team must score thousands of chatbot answers for helpfulness every day, cheaply. Which evaluation approach scales best?
    a: LLM-as-a-judge, with a judge model from a different family, plus human review for critical decisions.
    facts: [judge, judge-family]
  - id: fm-evaluation-005
    q: When is human evaluation the best choice for a generative AI model?
    a: For subjective qualities such as tone, style or brand voice, and for critical decisions, accepting that it is slow and costly.
    facts: [human]
  - id: fm-evaluation-006
    q: What should a team build first to evaluate a new generative AI application consistently?
    a: A curated golden dataset of prompts and expected answers that represents real usage, including edge cases.
    facts: [golden]
  - id: fm-evaluation-007
    q: Is a high ROUGE score proof that a summary is factually correct?
    a: "No. ROUGE counts word overlap with a reference; a summary can share words and still be wrong. Check faithfulness too."
    trap: true
    facts: [rouge, faithfulness]
  - id: fm-evaluation-008
    q: Why should an LLM judge come from a different model family than the model it grades?
    a: Models tend to prefer outputs like their own (self-preference bias).
    facts: [judge-family]
  - id: fm-evaluation-013
    q: "A team compares two language models by perplexity on the same test text. Which result is better?"
    a: "The lower perplexity: the model predicts the test text better. It is an intrinsic metric and may not match human judgment, so pair it with task metrics or human review."
    facts: [perplexity]
---
Evaluating generative AI takes several lenses at once: automatic metrics against reference answers, a model acting as judge, and human reviewers for what only people can judge. All of them need a good evaluation dataset.

### How it works

| Method | Measures | Best for |
|---|---|---|
| ROUGE | Word overlap, recall-focused | Summarization |
| BLEU | Word overlap, precision-focused | Translation |
| BERTScore | Semantic similarity of embeddings | General text |
| LLM-as-a-judge | Faithfulness, relevance, coherence, style | Scale, fast iteration |
| Human evaluation | Ratings and A/B preferences | Subjective and critical cases |
| Benchmark datasets | Standard tasks with known answers | Comparing models |

1. Build a golden dataset from real logs, expert examples and synthetic edge cases.
2. Run automatic metrics and an LLM judge on every change.
3. Send the critical or subjective cases to human reviewers.

### Exam cues

- If the question says translation quality, think BLEU.
- If the question says summarization quality, think ROUGE (or BERTScore for meaning).
- If the question says scalable, automated quality scoring with explanations, think LLM-as-a-judge.
- If the question says subjective quality or final sign-off, think human evaluation.

### Remember

- ROUGE = recall, summaries. BLEU = precision, translation.
- Judge from a different model family; humans for critical decisions.

> **Trap:** Automatic overlap metrics need a reference answer and reward matching words, not truth or tone. Pair them with faithfulness checks or human review.
