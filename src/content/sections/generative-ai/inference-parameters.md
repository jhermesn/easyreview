---
title: Inference parameters
level: foundational
order: 30
facts:
  - id: sampling
    text: For each next token, a model computes a probability distribution and samples from it; inference parameters adjust that distribution or limit the response.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html#inference-randomness
  - id: temperature
    text: A lower temperature makes the model pick higher-probability tokens and respond more deterministically; a higher temperature makes lower-probability tokens likelier and responses more random.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html#inference-randomness
  - id: top-k
    text: Top K is the number of most-likely candidate tokens the model considers for the next token; with Top K of 50 it picks from the 50 most probable tokens.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html#inference-randomness
  - id: top-p
    text: Top P is the share of the cumulative probability distribution the model considers; with Top P of 0.8 it picks from tokens in the top 80% of the distribution.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html#inference-randomness
  - id: length
    text: Response length parameters set the minimum or maximum number of tokens to return, and penalties discourage long responses or repeated tokens.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html#inference-length
  - id: defaults
    text: Inference parameter defaults and ranges depend on the model.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html
  - id: stop-sequences
    text: "Stop sequences are character sequences that make the model stop generating once it produces one of them."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html#inference-length
cards:
  - id: generative-ai-014
    q: A legal team wants consistent, factual answers from an LLM with little variation between runs. How should it set temperature?
    a: Low (close to 0). A lower temperature favors the most probable tokens, giving more deterministic responses.
    facts: [temperature]
  - id: generative-ai-015
    q: A marketing team wants more creative, varied slogans from the same prompt. Which inference parameter should it raise?
    a: Temperature (or Top P / Top K), which lets the model pick lower-probability tokens.
    facts: [temperature, top-p, top-k]
  - id: generative-ai-016
    q: Which inference parameter sets a fixed number of most-likely tokens to choose from?
    a: Top K. Top P instead uses a share of the cumulative probability.
    facts: [top-k, top-p]
  - id: generative-ai-017
    q: Which inference parameter influences the percentage of most-likely candidates the model considers for the next token?
    a: Top P.
    facts: [top-p]
  - id: generative-ai-018
    q: Responses from a model are too long and cost too much. Which inference parameter helps directly?
    a: The response length (maximum tokens) parameter, which caps the number of tokens returned.
    facts: [length]
  - id: generative-ai-019
    q: Does setting temperature to 0 retrain the model to be more accurate?
    a: "No. Inference parameters only change how one response is sampled; the model's parameters stay the same.\nIt makes output more consistent, not more correct."
    trap: true
    facts: [sampling, temperature]
  - id: generative-ai-040
    q: "An application wants the model to stop writing as soon as it outputs the text \"END\". Which inference parameter does this?"
    a: "A stop sequence. When the model generates a specified stop sequence, it stops generating more tokens."
    facts: [stop-sequences]
---
Inference parameters are dials you set per request. Temperature, Top K and Top P control how adventurous the model is when picking each next token; length settings cap how much it writes. [Inference parameters](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html)

### How it works

1. The model scores every possible next token with a probability.
2. Top K keeps a fixed number of the best candidates; Top P keeps the smallest set covering a share of the probability.
3. Temperature reshapes the probabilities: low sharpens them toward the top choice, high flattens them.
4. The model samples one token and repeats until it hits a stop condition or the length limit.

| Parameter | Lower value | Higher value |
|---|---|---|
| Temperature | More predictable | More random, creative |
| Top K | Fewer candidates | More candidates |
| Top P | Smaller share of the distribution | Larger share |
| Max length | Shorter, cheaper output | Longer output |

### Exam cues

- If the question says consistent, deterministic or factual answers, think lower temperature.
- If the question says creative or varied output, think higher temperature or Top P.
- If the question says a count of candidate tokens, think Top K; a percentage, think Top P.
- If the question says limit cost or response size, think maximum length (tokens).
- If the question says stop generation at a specific marker, think stop sequences.

### Remember

- Low temperature = more deterministic; high = more random.
- Defaults and ranges differ by model.

> **Trap:** Lower temperature doesn't stop hallucinations; it makes the model consistently pick the likeliest tokens, which can still be wrong. Grounding (RAG) addresses accuracy.
