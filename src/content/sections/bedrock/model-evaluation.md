---
title: Model and RAG evaluation in Bedrock
level: foundational
order: 50
facts:
  - id: what
    text: Amazon Bedrock evaluations measure the performance of Bedrock models and knowledge bases, and also of models and RAG sources outside Amazon Bedrock.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html#evaluation
  - id: types
    text: "Amazon Bedrock has automatic (programmatic) model evaluation jobs, jobs that use human workers, jobs that use a judge model (LLM-as-a-judge), and LLM-based RAG evaluations of knowledge bases."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html#evaluation
  - id: datasets
    text: Automatic model evaluation jobs use your own prompt dataset or a built-in dataset, with task types such as general text generation, text summarization, question and answer, and text classification.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-tasks.html
  - id: dimensions
    text: Automatic evaluation metrics include accuracy, robustness and toxicity; for summarization, accuracy is computed with BERTScore.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-tasks.html
  - id: human
    text: Human evaluation jobs bring in your own employees or subject-matter experts from your industry to rate model responses.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html#evaluation
  - id: rag-metrics
    text: RAG evaluation metrics include context relevance and context coverage for retrieval, and correctness, completeness and faithfulness (avoiding hallucination against the retrieved text) for generated responses.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation-metrics.html
  - id: human-two-models
    text: "A Bedrock model evaluation job that uses human workers rates or compares the responses of up to two models, and the evaluators are managed as a work team."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-type-human.html#model-evaluation-type-human
  - id: builtin-datasets
    text: "Built-in prompt datasets for automatic evaluation are open-source datasets sampled down to 100 prompts; BOLD tests fairness across profession, gender, race, religious and political ideologies, and RealToxicityPrompts tests toxicity."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-prompt-datasets.html#model-evaluation-prompt-datasets-builtin
cards:
  - id: bedrock-035
    q: A bank wants its own compliance experts to rate several foundation models on its customer questions. Which Amazon Bedrock feature fits?
    a: A model evaluation job that uses human workers (the bank's own work team).
    facts: [human, types]
  - id: bedrock-036
    q: A team wants to quickly compare candidate models on accuracy, robustness and toxicity with standard datasets. Which Amazon Bedrock option fits?
    a: An automatic model evaluation job with built-in datasets.
    facts: [datasets, dimensions]
  - id: bedrock-037
    q: A team needs scalable, quality-focused scores with explanations for each response, without human raters. Which Amazon Bedrock evaluation type fits?
    a: A model evaluation job that uses a judge model (LLM-as-a-judge).
    facts: [types]
  - id: bedrock-038
    q: Which Amazon Bedrock RAG evaluation metric checks whether answers stick to the retrieved text instead of hallucinating?
    a: Faithfulness.
    facts: [rag-metrics]
  - id: bedrock-039
    q: A RAG chatbot gives wrong answers. Which Amazon Bedrock evaluation shows whether the retrieval or the generation step is at fault?
    a: "A RAG evaluation of the knowledge base: context relevance and coverage score retrieval; correctness, completeness and faithfulness score generation."
    facts: [rag-metrics]
  - id: bedrock-040
    q: Can Amazon Bedrock evaluations assess a model hosted outside Amazon Bedrock?
    a: "Yes. Bedrock evaluations also cover models and RAG sources outside Amazon Bedrock."
    trap: true
    facts: [what]
  - id: bedrock-059
    q: "A team wants a quick, low-effort check of whether a foundation model produces biased text about gender, race or religion. What can it use in Amazon Bedrock?"
    a: "An automatic model evaluation job with a built-in prompt dataset such as BOLD, which tests fairness across those groups."
    facts: [builtin-datasets]
  - id: bedrock-060
    q: "How can people help evaluate foundation model responses in Amazon Bedrock?"
    a: "Human evaluation lets employees or subject-matter experts rate the responses."
    facts: [human]
---
Amazon Bedrock evaluations compare models, and RAG pipelines, on your own prompts or standard datasets, scored by metrics, by a judge model or by your own people.

### How it works

| Evaluation type | Who scores | Use for |
|---|---|---|
| Automatic (programmatic) | Computed metrics | Fast comparison on accuracy, robustness, toxicity |
| Judge model | A second LLM, with explanations | Quality at scale |
| Human workers | Your team or experts | Subjective or domain judgment |
| RAG evaluation | LLM-based metrics | Retrieval and answer quality of a knowledge base |

1. Choose the task type and dataset (built-in or your own prompts in Amazon S3).
2. Choose models, including custom, imported and provisioned ones.
3. Review the scores and pick the model or setup that fits the use case.

### Exam cues

- If the question says compare FMs quickly on predefined quality and responsibility metrics, think automatic evaluation.
- If the question says the company's own experts must judge, think human-based evaluation.
- If the question says check retrieval relevance and answer accuracy of a knowledge base, think RAG evaluation.
- If the question says check a model for bias with little effort, think an automatic evaluation with a built-in dataset such as BOLD.

### Remember

- Four types: automatic, judge model, human, RAG.
- RAG metrics: context relevance and coverage (retrieval); correctness, completeness, faithfulness (generation).

> **Trap:** A human evaluation job only rates models; it doesn't change them. Training a model on human preferences is RLHF, a customization step.
