---
title: What generative AI does well and where it fails
level: foundational
order: 50
facts:
  - id: adaptability
    text: Foundation models adapt to a wide range of tasks from input prompts, such as question answering, language processing and image classification.
    source: https://aws.amazon.com/what-is/foundation-models/
  - id: uses
    text: Common generative AI uses include customer support, language translation, content generation and copywriting.
    source: https://aws.amazon.com/what-is/foundation-models/
  - id: hallucination
    text: A hallucination is output from a generative AI model that is inconsistent, factually incorrect or unrelated to the input prompt.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/definitions.html
  - id: unreliable
    text: Foundation models can give unreliable answers that are inappropriate, toxic or incorrect, and can pick up bias from their training data.
    source: https://aws.amazon.com/what-is/foundation-models/
  - id: inaccurate
    text: Generative AI can produce inaccurate or misleading information because it relies on patterns in its training data, and it can reflect biases or inaccuracies in that data.
    source: https://aws.amazon.com/what-is/generative-ai/
  - id: nondeterministic
    text: A model samples each next token from a probability distribution, so the same prompt can produce different responses; a lower temperature makes responses more deterministic.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html#inference-randomness
  - id: interpretability
    text: Model interpretability is the ability to understand and explain the reasoning behind a model's outputs.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/definitions.html
  - id: rag-grounding
    text: Retrieval augmented generation (RAG) grounds a model's output in documents retrieved for the request, which helps reduce hallucination.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/definitions.html
cards:
  - id: generative-ai-027
    q: A chatbot confidently cites a company policy that doesn't exist. What is this called?
    a: A hallucination, output that is factually incorrect or not grounded in the input.
    facts: [hallucination]
  - id: generative-ai-028
    q: Users notice the same question to an LLM gets different answers each time. Why?
    a: LLMs are nondeterministic; they sample each token from a probability distribution. A lower temperature makes answers more consistent.
    facts: [nondeterministic]
  - id: generative-ai-029
    q: Which technique reduces hallucinations by giving the model relevant company documents with each request?
    a: Retrieval augmented generation (RAG), which grounds responses in retrieved content.
    facts: [rag-grounding, hallucination]
  - id: generative-ai-030
    q: Name three advantages of generative AI for a business.
    a: "Any three of: adaptability to many tasks, conversational interaction, fast content generation (text, images, code), translation and summarization at scale."
    facts: [adaptability, uses]
  - id: generative-ai-031
    q: Name three disadvantages of generative AI solutions.
    a: "Any three of: hallucinations (inaccuracy), nondeterministic output, bias from training data, toxic or inappropriate output, limited interpretability."
    facts: [hallucination, unreliable, nondeterministic, interpretability]
  - id: generative-ai-032
    q: A bank must explain exactly why each loan was denied, to satisfy regulators. Is a large generative model a good fit for the decision?
    a: "Not on its own. LLMs have limited interpretability, so a simpler, explainable model (or rules) fits regulated decisions better."
    trap: true
    facts: [interpretability]
---
Generative AI is flexible: one model writes, summarizes, translates and chats. The same flexibility makes it unreliable in ways that matter: it can invent facts, answer differently each time and repeat the bias in its data.

### How it works

| Advantages | Disadvantages |
|---|---|
| Adapts to many tasks from a prompt | Hallucinations: confident but wrong output |
| Natural conversation | Nondeterminism: different answers to the same prompt |
| Fast content generation | Bias and toxicity learned from data |
| Summaries and translation at scale | Hard to interpret why it answered |

1. Hallucinations come from predicting likely text, not looking up facts; grounding with RAG and output checks reduce them.
2. Nondeterminism comes from sampling; lower temperature reduces variation.
3. Bias comes from training data; curated data, guardrails and evaluation reduce it.

### Exam cues

- If the question says made-up but plausible facts, think hallucination.
- If the question says same input, different output, think nondeterminism.
- If the question says decisions must be explained to regulators, think limited interpretability; prefer an explainable model.

### Remember

- Hallucination = inconsistent, incorrect or off-prompt output.
- RAG grounds answers; lower temperature makes them consistent.

> **Trap:** Lowering temperature makes answers consistent, not true. A model can repeat the same hallucination every time.
