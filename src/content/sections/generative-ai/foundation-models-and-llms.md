---
title: Foundation models and LLMs
level: foundational
order: 10
facts:
  - id: fm
    text: A foundation model (FM) is an AI model with a large number of parameters, trained on a massive amount of diverse data, that can serve a wide range of use cases; FMs can generate text or images and convert input into embeddings.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions.html
  - id: self-supervised
    text: Foundation models use self-supervised learning, creating their own labels from the input data, and in general learn to predict the next item in a sequence.
    source: https://aws.amazon.com/what-is/foundation-models/
  - id: adaptability
    text: A unique feature of foundation models is adaptability; they perform many different tasks, such as question answering, NLP and image classification, from prompts, and serve as base models for more specialized applications.
    source: https://aws.amazon.com/what-is/foundation-models/
  - id: cost
    text: Building a foundation model from scratch costs millions of dollars and can take months, so using a pre-trained FM is faster and cheaper than training a new model.
    source: https://aws.amazon.com/what-is/foundation-models/
  - id: llm
    text: Large language models (LLMs) are one class of FMs, focused on language tasks such as summarization, text generation, classification, conversation and information extraction.
    source: https://aws.amazon.com/what-is/generative-ai/
  - id: transformer
    text: LLMs are built on the transformer, neural networks with an encoder and a decoder and self-attention; unlike recurrent neural networks (RNNs), transformers process whole sequences in parallel.
    source: https://aws.amazon.com/what-is/large-language-model/
  - id: bert
    text: BERT (Bidirectional Encoder Representations from Transformers), released in 2018, was one of the first foundation models; it analyzes the context of the complete sequence before making a prediction.
    source: https://aws.amazon.com/what-is/foundation-models/
  - id: diffusion
    text: Diffusion models create data by adding controlled noise to a sample over several steps and then reversing the process, removing noise until a new sample emerges.
    source: https://aws.amazon.com/what-is/generative-ai/
  - id: gan
    text: A generative adversarial network (GAN) trains two networks against each other, a generator that creates fake samples and a discriminator that tries to tell them from real data.
    source: https://aws.amazon.com/what-is/generative-ai/
  - id: vae
    text: Variational autoencoders (VAEs), from 2013, were the first deep generative models that could generate realistic images and speech.
    source: https://aws.amazon.com/what-is/generative-ai/
cards:
  - id: generative-ai-001
    q: What makes a foundation model different from a traditional ML model built for one task?
    a: It's pre-trained on massive, diverse data and adapts to many tasks through prompts or fine-tuning, instead of being trained for a single task.
    facts: [fm, adaptability]
  - id: generative-ai-002
    q: How are foundation models pre-trained without human-labeled data?
    a: Self-supervised learning. The model creates its own labels from the input, such as predicting the next word in a sequence.
    facts: [self-supervised]
  - id: generative-ai-003
    q: Which neural network architecture are LLMs built on, and what lets it train faster than an RNN?
    a: The transformer. Its self-attention processes whole sequences in parallel, while an RNN reads inputs one step at a time.
    facts: [transformer]
  - id: generative-ai-004
    q: Which generative model type creates images by adding noise to data and then learning to remove it step by step?
    a: A diffusion model.
    facts: [diffusion]
  - id: generative-ai-005
    q: A team needs realistic synthetic data and picks a model with a generator and a discriminator trained against each other. What is it?
    a: A generative adversarial network (GAN).
    facts: [gan]
  - id: generative-ai-006
    q: Is an LLM the same thing as a foundation model?
    a: "An LLM is one kind of FM, the kind focused on language.\nFMs also include image, multimodal and embedding models."
    trap: true
    facts: [llm, fm]
  - id: generative-ai-007
    q: A startup wants a model for customer support summaries. Why start from a pre-trained foundation model instead of training one from scratch?
    a: Training an FM from scratch costs millions of dollars and months of compute; adapting a pre-trained FM is faster and cheaper.
    facts: [cost, adaptability]
  - id: generative-ai-008
    q: Which early foundation model reads text bidirectionally, using the context on both sides of a word?
    a: BERT (Bidirectional Encoder Representations from Transformers).
    facts: [bert]
---
A foundation model (FM) is a large model pre-trained on broad data that you adapt to many tasks instead of training a new model per task. Large language models (LLMs) are the FMs that work with language.

### How it works

1. **Pre-training:** the model reads huge amounts of unlabeled data and learns to predict the next item, creating its own labels (self-supervised learning).
2. **Architecture:** LLMs use transformers, whose self-attention weighs every word against every other word in parallel.
3. **Use:** you prompt the model for a task, or customize it further with your data.

| Model type | How it generates | Typical use |
|---|---|---|
| Transformer (LLM) | Predicts the next token | Text, code, chat |
| Diffusion | Removes noise step by step | Images |
| GAN | Generator vs discriminator | Synthetic data, images |
| VAE | Encodes and decodes variations | Images, speech |

### Exam cues

- If the question says one model, many tasks, adapted with prompts, think foundation model.
- If the question says images generated from noise, think diffusion model.
- If the question says generator and discriminator, think GAN.
- If the question says self-attention or contextual embeddings, think transformer.

### Remember

- FMs learn with self-supervised learning on unlabeled data.
- LLMs are a subset of FMs.
- Transformers process sequences in parallel; RNNs process them step by step.

> **Trap:** Fine-tuning an FM uses labeled data, but pre-training it doesn't; don't answer "supervised learning" for how FMs are pre-trained.
