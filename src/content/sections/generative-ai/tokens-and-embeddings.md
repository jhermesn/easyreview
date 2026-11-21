---
title: Tokens, prompts and embeddings
level: foundational
order: 20
facts:
  - id: token
    text: A token is a sequence of characters that a model reads or predicts as one unit of meaning, such as a word, part of a word ("-ed"), a punctuation mark or a common phrase.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions.html
  - id: prompt
    text: A prompt is the input given to a model to guide its response; it can hold instructions, task context, examples of outputs or text for the model to use.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions.html
  - id: inference
    text: Model inference is the process of a foundation model generating an output (response) from a given input (prompt).
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions.html
  - id: embedding
    text: An embedding turns input into a vector of numbers so that objects can be compared for similarity, such as two sentences with similar meaning or an image and a caption.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions.html
  - id: word-vectors
    text: LLMs represent words as multi-dimensional vectors (word embeddings), so words with similar meanings sit close together and the model can capture relationships between words.
    source: https://aws.amazon.com/what-is/large-language-model/
  - id: model-parameters
    text: Model parameters are values that define a model and how it interprets input and generates responses; providers control them, and model customization updates them to create a new model.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions.html
  - id: context-window
    text: The context window is the maximum amount of text, measured in tokens, that an LLM can process in a single inference call; exceeding it causes inference failures.
    source: https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/definitions.html
cards:
  - id: generative-ai-009
    q: What is a token in a large language model?
    a: A unit of text the model reads or predicts, such as a word, part of a word, a punctuation mark or a common phrase.
    facts: [token]
  - id: generative-ai-010
    q: A search team wants to find documents with similar meaning even when they share no keywords. What representation makes this possible?
    a: Embeddings, numeric vectors where similar meanings sit close together, so similarity becomes a distance between vectors.
    facts: [embedding, word-vectors]
  - id: generative-ai-011
    q: What is the difference between a token and an embedding?
    a: "A token is a unit of text the model processes.\nAn embedding is a vector of numbers that represents the meaning of text (or images) for comparison."
    facts: [token, embedding]
  - id: generative-ai-012
    q: What is "inference" for a foundation model?
    a: The model generating an output (response) from an input (prompt).
    facts: [inference]
  - id: generative-ai-013
    q: Can you change a foundation model's parameters by editing your prompt?
    a: "No. Parameters (weights) change only through model customization, such as fine-tuning, which creates a new custom model.\nPrompts only steer one response."
    trap: true
    facts: [model-parameters, prompt]
  - id: generative-ai-039
    q: A model must read a 400-page contract in one request. Which model property decides whether it fits?
    a: The context window, the maximum number of tokens the model can process in one call.
    facts: [context-window]
---
Models don't see words; they see tokens, and they compare meaning with embeddings. Both drive cost and quality: you pay per token, and embeddings power semantic search and retrieval augmented generation.

### How it works

1. Text in a prompt is split into tokens; the model predicts the response one token at a time (inference).
2. An embedding model turns text or images into vectors of numbers.
3. Vectors with similar meaning are close together, so a vector database can find related content by distance.

### Exam cues

- If the question says pricing or limits counted in units of text, think tokens.
- If the question says semantic similarity, vector search or a vector database, think embeddings.
- If the question says change the model's behavior permanently, think customization of model parameters, not the prompt.

### Remember

- Token: unit of text. Embedding: vector of numbers that captures meaning.
- Inference: prompt in, response out.
- Context window: the most tokens one call can hold.

> **Trap:** A token is not always a whole word. Parts of words and punctuation are tokens too, so token counts are usually higher than word counts.
