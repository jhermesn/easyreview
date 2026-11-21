---
title: Fine-tuning methods and training data
level: foundational
order: 20
facts:
  - id: fine-tuning
    text: Fine-tuning further trains a pre-trained foundation model on your own smaller dataset and changes the model's weights.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-fine-tuning.html
  - id: two-approaches
    text: SageMaker JumpStart offers two main fine-tuning approaches, domain adaptation on domain-specific data and instruction-based fine-tuning on prompt and response examples.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-fine-tuning.html
  - id: domain-adaptation
    text: Domain adaptation fine-tuning adapts a pre-trained model with limited domain-specific data when prompt engineering doesn't give enough customization.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-fine-tuning-domain-adaptation.html
  - id: transfer
    text: Transfer learning fine-tunes a model pre-trained on one task for a new, related task, so it adapts faster and with less data and compute than training from scratch.
    source: https://aws.amazon.com/what-is/transfer-learning/
  - id: rlhf
    text: Reinforcement learning from human feedback (RLHF) has humans score or rank model responses, and that feedback trains the model toward responses people prefer.
    source: https://aws.amazon.com/what-is/reinforcement-learning-from-human-feedback/
  - id: lora
    text: LoRA (Low-Rank Adaptation) trains a small set of adapter weights for lower cost and faster training, while full fine-tuning updates all weights for deeper customization.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/customizing-models-training-types.html
  - id: data-quality
    text: Fine-tuning data should favor quality over quantity, use accurate labels, closely reflect production use cases, and include diverse examples, difficulty levels and edge cases to prevent overfitting.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/nova-2-sft-data-prep.html
  - id: data-size
    text: For supervised fine-tuning of Amazon Nova models, the recommended dataset size is 2,000 to 10,000 samples, with a minimum of 200.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/nova-2-sft-data-prep.html
  - id: rlhf-steps
    text: "RLHF collects human prompts and ideal answers, fine-tunes a pretrained model, trains a separate reward model from human preferences between responses, and then uses that reward model to optimize the language model with reinforcement learning."
    source: https://aws.amazon.com/what-is/reinforcement-learning-from-human-feedback/
cards:
  - id: fm-customization-008
    q: A team trains a model on prompt-and-response pairs that show how to follow instructions for its tasks. Which fine-tuning approach is this?
    a: Instruction-based fine-tuning (instruction tuning).
    facts: [two-approaches]
  - id: fm-customization-009
    q: A chatbot's answers are accurate but sound robotic. Human reviewers rank pairs of answers, and the rankings train the model. What is this technique?
    a: Reinforcement learning from human feedback (RLHF).
    facts: [rlhf]
  - id: fm-customization-010
    q: A model trained to recognize animals is adapted to recognize dog breeds with a small dataset. Which ML concept is this?
    a: Transfer learning, which reuses a pre-trained model's knowledge for a related task.
    facts: [transfer]
  - id: fm-customization-011
    q: Name four qualities of a good fine-tuning dataset.
    a: "Any four of: accurate labels, representative of production use, diverse (full range of inputs and edge cases), consistent output format, enough samples, curated and free of contradictions."
    facts: [data-quality, data-size]
  - id: fm-customization-012
    q: A fine-tuned model performs well on one product line and poorly on four others. What is the likely data problem and fix?
    a: The training data wasn't representative. Add labeled examples from all product lines and fine-tune again.
    facts: [data-quality]
  - id: fm-customization-013
    q: Which fine-tuning training type is cheaper and faster because it trains only small adapter weights?
    a: LoRA (Low-Rank Adaptation). Full fine-tuning updates every weight.
    facts: [lora]
  - id: fm-customization-014
    q: Does a bigger fine-tuning dataset always beat a smaller, carefully curated one?
    a: "No. Quality comes first: accurate, representative, diverse examples matter more than raw volume."
    trap: true
    facts: [data-quality]
  - id: fm-customization-015
    q: "In RLHF, what turns human preferences into something reinforcement learning can optimize automatically?"
    a: "A separate reward model trained on human choices between responses. It then acts as the reward function that optimizes the language model."
    facts: [rlhf-steps]
---
Fine-tuning keeps training a pre-trained model on your data, so its weights change. The data decides the result: accurate, representative and varied examples matter more than volume.

### How it works

| Method | Data | Purpose |
|---|---|---|
| Instruction tuning | Prompt and response pairs | Follow task instructions |
| Domain adaptation | Domain text | Learn a field's language |
| Transfer learning | Small dataset for a related task | Reuse what the model already knows |
| RLHF | Human rankings of responses | Align with human preferences |
| LoRA | Same data, small adapters | Cheaper, faster tuning |

1. Curate data: remove duplicates and errors, label consistently, remove PII, cover every case the model will see.
2. Split into training and validation sets.
3. Train, evaluate against a baseline, and repeat.

### Exam cues

- If the question says prompt and response examples teach the model a task, think instruction-based fine-tuning.
- If the question says humans rank responses to improve the model, think RLHF.
- If the question says reuse a model trained on a related task, think transfer learning.
- If the question says the tuned model fails on cases missing from training data, think unrepresentative data; add those examples.

### Remember

- Fine-tuning changes weights; it needs curated, labeled data.
- Nova SFT: 2,000 to 10,000 samples recommended, 200 minimum.

> **Trap:** RLHF trains the model on human preferences. A human evaluation job only rates models and changes nothing.
