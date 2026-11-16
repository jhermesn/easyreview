---
title: Choosing a customization approach
level: foundational
order: 10
facts:
  - id: order
    text: Prioritize prompt engineering and RAG before model customization; start with the least resource-intensive option and move to more advanced methods only if needed.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/genops05-bp01.html#implementation-guidance
  - id: when-tune
    text: Choose continued pre-training or fine-tuning when a specific task needs better performance, you have labeled data for it, or the model must understand domain-specific language such as medical or legal terms.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/genops05-bp01.html#implementation-guidance
  - id: rag-pros
    text: RAG builds question answering over custom documents without fine-tuning, can take in new documents in minutes, and returns references to its sources.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/rag-vs-fine-tuning.html
  - id: rag-first
    text: For question answering over custom documents, start with RAG; use fine-tuning when the model must perform additional tasks or match an organization's style. The two can be combined.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/rag-vs-fine-tuning.html
  - id: pretraining
    text: Pre-training builds a foundation model from scratch and requires GPU clusters running continuously for weeks.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/definitions.html
  - id: context-engineering
    text: Context engineering treats the context window as a dynamic workspace; prompt engineering focuses on what to ask, while context engineering focuses on what to show the model.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/dev-experimenting-context.html
  - id: context-parts
    text: An engineered context combines the system prompt or instructions, the user query, the user profile, memory of the conversation, tool definitions and MCP servers, and knowledge retrieved with RAG.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/gen-ai-lifecycle-operational-excellence/dev-experimenting-context.html
  - id: in-context
    text: Few-shot prompting puts examples of the task in the prompt itself, improving answers without changing the model.
    source: https://docs.aws.amazon.com/nova/latest/userguide/prompting-examples.html
cards:
  - id: fm-customization-001
    q: Order these customization approaches from least to most cost and effort - fine-tuning, prompt engineering, continued pre-training, RAG, pre-training from scratch.
    a: Prompt engineering, RAG, fine-tuning, continued pre-training, pre-training from scratch.
    facts: [order, pretraining]
  - id: fm-customization-002
    q: A company wants answers grounded in product manuals that are updated every week. Which approach fits best?
    a: RAG, which picks up new documents in minutes and cites sources, with no retraining.
    facts: [rag-pros, rag-first]
  - id: fm-customization-003
    q: A model must write in a company's distinctive style for a task it does poorly, and the company has many labeled examples. Which approach fits?
    a: Fine-tuning on the labeled examples (after trying prompt engineering and RAG).
    facts: [when-tune, rag-first]
  - id: fm-customization-004
    q: What does context engineering add beyond prompt engineering?
    a: "It assembles everything the model needs in its context window: instructions, the query, user profile, conversation memory, tool definitions and retrieved knowledge. Prompting decides what to ask; context engineering decides what to show."
    facts: [context-engineering, context-parts]
  - id: fm-customization-005
    q: When does training a foundation model from scratch make sense for a typical company?
    a: Almost never. Pre-training needs GPU clusters for weeks; adapting an existing FM is far cheaper.
    facts: [pretraining]
  - id: fm-customization-006
    q: A company's generic prompts work, but the model lacks medical vocabulary and the company has a large unlabeled corpus of clinical text. Which approach fits?
    a: Continued pre-training (domain adaptation) on the unlabeled domain text.
    facts: [when-tune]
  - id: fm-customization-007
    q: Is fine-tuning the first thing to try when a model's answers are off?
    a: "No. Start with prompt engineering, then RAG; fine-tune only if those fall short."
    trap: true
    facts: [order]
---
Customization runs from cheap to expensive: better prompts, richer context, retrieval (RAG), fine-tuning, continued pre-training and, rarely, training a model from scratch. Start at the cheap end and climb only when results demand it. [Learn when to customize models](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/genops05-bp01.html)

### How it works

| Approach | Changes the model? | Cost | Use when |
|---|---|---|---|
| Prompt engineering / in-context examples | No | Lowest | Task is clear; examples help |
| Context engineering | No | Low | Model needs user data, memory, tools |
| RAG | No | Low to medium | Answers need private or fresh documents |
| Fine-tuning | Yes | Medium to high | New task or style; labeled data |
| Continued pre-training | Yes | High | Domain language; unlabeled data |
| Distillation | Yes (smaller model) | Medium | Keep quality, cut serving cost |
| Pre-training | New model | Highest | Building a foundation model |

1. Try prompts first, adding examples (in-context learning).
2. Add context: instructions, history, user profile, tools and retrieved knowledge.
3. Fine-tune or continue pre-training only for gaps that context can't close.

### Exam cues

- If the question says least effort or cost, think prompt engineering.
- If the question says private, changing documents and cited sources, think RAG.
- If the question says style or task performance with labeled data, think fine-tuning.
- If the question says domain vocabulary from unlabeled text, think continued pre-training.

### Remember

- Prompting, context and RAG leave the weights alone; fine-tuning and pre-training change them.
- RAG and fine-tuning can be combined.

> **Trap:** Fine-tuning doesn't keep a model current. Facts baked in by training go stale; RAG brings fresh data at query time.
