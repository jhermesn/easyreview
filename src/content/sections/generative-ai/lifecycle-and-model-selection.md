---
title: GenAI lifecycle and choosing a model
level: foundational
order: 40
facts:
  - id: lifecycle
    text: "The Generative AI Lens lifecycle phases are scoping, model selection, model customization, development and integration, deployment, and continuous improvement."
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lifecycle.html
  - id: scoping
    text: Scoping defines the business problem, asks whether generative AI is relevant to it, weighs risks and costs, and sets the success metrics.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lifecycle.html#scoping
  - id: selection-factors
    text: Model selection weighs factors such as modality, size, accuracy, training data, pricing, context window, inference latency and compatibility with existing infrastructure, as well as the hosting provider's data usage policies.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lifecycle.html#model-selection
  - id: customization
    text: Model customization fits a pre-trained model to the use case with techniques such as prompt engineering, RAG, agents, fine-tuning, continued pre-training, model distillation and human feedback alignment.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lifecycle.html#model-customization
  - id: improvement
    text: Continuous improvement monitors metrics such as accuracy, toxicity and coherence of outputs, gathers user feedback, and updates data and models over time.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lifecycle.html#continuous-improvement
  - id: start-small
    text: To optimize cost, test the smallest model first and move to larger ones only until one meets the minimum performance bar; newer and larger models often cost more per token.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/gencost01-bp01.html#implementation-guidance
  - id: routing
    text: Routing simple requests to smaller, cheaper models and complex ones to larger models keeps quality while lowering cost; Amazon Bedrock offers intelligent prompt routing for this.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/gencost01-bp01.html#implementation-guidance
  - id: sustainability
    text: Smaller models, distillation, quantization and pruning reduce compute, cost and carbon footprint, and a fine-tuned smaller model can often match a large general-purpose model for a specific task.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/gensus03-bp01.html#implementation-guidance
cards:
  - id: generative-ai-020
    q: Two foundation models both meet a support bot's quality bar; one is much larger. Which should the company pick, and why?
    a: The smaller one. It meets the requirements with lower token cost, lower latency and less energy per request.
    facts: [start-small, sustainability]
  - id: generative-ai-021
    q: Name four factors to compare when selecting a foundation model.
    a: "Any four of: modality, model size, accuracy, cost (token pricing), context window, latency, language support, customization options, data usage policy."
    facts: [selection-factors]
  - id: generative-ai-022
    q: In the generative AI lifecycle, which phase decides whether generative AI is relevant to the problem and how success is measured?
    a: Scoping, the first phase.
    facts: [scoping, lifecycle]
  - id: generative-ai-023
    q: An app sends both simple FAQ lookups and complex reasoning questions to the same large model. How can it cut cost without hurting quality?
    a: Route simple requests to a smaller model and complex ones to a larger model, for example with Amazon Bedrock intelligent prompt routing.
    facts: [routing]
  - id: generative-ai-024
    q: Which practices make a generative AI workload more sustainable?
    a: Choosing the smallest adequate model, model distillation, quantization and pruning, which all cut compute and energy.
    facts: [sustainability]
  - id: generative-ai-025
    q: Which lifecycle phase tracks output accuracy, toxicity and user feedback after launch?
    a: Continuous improvement.
    facts: [improvement]
  - id: generative-ai-026
    q: Is the newest, largest foundation model always the right choice?
    a: "No. Pick the smallest model that meets the requirements; bigger models cost more per token and add latency."
    trap: true
    facts: [start-small]
---
A generative AI project starts with scoping the problem, then picking and adapting a model, integrating it, deploying it and improving it with feedback. Model choice is a cost and quality trade-off you revisit as new models appear.

### How it works

1. **Scoping:** is generative AI the right tool? Define risks, costs and success metrics.
2. **Model selection:** compare modality, size, accuracy, price, context window and latency.
3. **Model customization:** prompt engineering, RAG, agents, fine-tuning or distillation, cheapest first.
4. **Development and integration:** connect the model to data, tools, guardrails and a user interface.
5. **Deployment:** release with CI/CD and infrastructure as code.
6. **Continuous improvement:** monitor quality, collect feedback, update.

| Selection factor | Question to ask |
|---|---|
| Modality | Text, image, audio, video, multimodal? |
| Cost | Price per input and output token |
| Latency | Fast enough for real-time use? |
| Context window | Fits the documents and conversation? |
| Languages | Supports the users' languages? |
| Customization | Can it be fine-tuned if needed? |

### Exam cues

- If the question says choose between models that both meet the bar, think the smaller, cheaper one, because it saves cost, latency and energy.
- If the question says mix of simple and complex requests, think routing by complexity (intelligent prompt routing).
- If the question says sustainability or environmental impact of model choice, think smaller models and distillation.

### Remember

- Lifecycle: scoping, model selection, customization, integration, deployment, continuous improvement.
- Start small and scale up only as needed.

> **Trap:** The biggest model isn't the safe default. It costs more per token and responds slower, and a smaller tuned model often matches it on one task.
