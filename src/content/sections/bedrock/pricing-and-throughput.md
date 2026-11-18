---
title: Pricing, throughput and inference options
level: foundational
order: 20
facts:
  - id: on-demand
    text: Amazon Bedrock on-demand inference charges per input and output token with no cost when idle; prices differ by model, and newer or larger models often cost more.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/gencost01-bp01.html#implementation-guidance
  - id: batch
    text: Batch inference sends many prompts in one job and writes the responses to an Amazon S3 bucket asynchronously.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html
  - id: batch-price
    text: Batch inference for select models costs 50% less than on-demand inference.
    source: https://aws.amazon.com/bedrock/pricing/
  - id: provisioned
    text: Provisioned Throughput buys a higher level of throughput for a model at a fixed cost, billed hourly in model units, with no commitment or a 1-month or 6-month term; longer terms get a bigger discount.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html
  - id: provisioned-custom
    text: A model you customized in Amazon Bedrock runs inference on purchased Provisioned Throughput or, through a custom model deployment, on demand, paying only for what you use.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-use.html#model-customization-use
  - id: tiers
    text: Amazon Bedrock has four inference service tiers; Reserved reserves capacity for critical apps, Priority gives the fastest responses at a premium, Standard is the default, and Flex gives a discount for workloads that tolerate longer processing.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/service-tiers-inference.html
  - id: cross-region
    text: Cross-Region inference routes requests across AWS Regions for more throughput; a geographic profile keeps processing inside a geography such as the US or EU, while a global profile can use any supported commercial Region.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html
  - id: caching
    text: Prompt caching reuses long, repeated prompt content, such as an uploaded document asked about many times, to reduce response latency and input token cost on supported models.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html
  - id: routing
    text: Intelligent prompt routing offers one serverless endpoint that predicts response quality and routes each request to the best model within a model family, to optimize quality and cost.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html
cards:
  - id: bedrock-007
    q: A company must summarize 2 million documents overnight and doesn't need instant answers. Which Amazon Bedrock option costs least?
    a: Batch inference, which processes prompts asynchronously into Amazon S3 at about 50% less than on-demand for supported models.
    facts: [batch, batch-price]
  - id: bedrock-008
    q: A company fine-tuned a model in Amazon Bedrock. What are its two ways to run inference on that custom model?
    a: Purchase Provisioned Throughput for dedicated capacity, or create a custom model deployment and invoke it on demand, paying per use.
    facts: [provisioned-custom]
  - id: bedrock-009
    q: A high-volume app needs consistent, guaranteed throughput from one Amazon Bedrock model at a predictable cost. Which option fits?
    a: Provisioned Throughput (model units at a fixed hourly price, cheaper with a 1- or 6-month commitment).
    facts: [provisioned]
  - id: bedrock-010
    q: A chatbot sends the same 20-page manual with every user question. Which Amazon Bedrock feature cuts the input token cost and latency?
    a: Prompt caching, which reuses the cached manual instead of reprocessing it for each request.
    facts: [caching]
  - id: bedrock-011
    q: An EU company must keep inference processing inside the EU but needs more throughput. Which Amazon Bedrock feature fits?
    a: Geographic cross-Region inference with an EU inference profile.
    facts: [cross-region]
  - id: bedrock-012
    q: Which Amazon Bedrock feature sends each prompt to the model in a family that should answer it best, to balance quality and cost?
    a: Intelligent prompt routing.
    facts: [routing]
  - id: bedrock-013
    q: A team runs model evaluations that can wait longer for responses. Which Amazon Bedrock service tier lowers the cost?
    a: The Flex tier, discounted for workloads that tolerate longer processing.
    facts: [tiers]
  - id: bedrock-014
    q: How does Amazon Bedrock Provisioned Throughput affect the cost of model inference?
    a: "It provides a higher level of throughput at a fixed hourly cost, with discounts for longer commitments."
    facts: [provisioned]
---
Bedrock pricing follows tokens. On-demand bills each input and output token; batch, caching, routing and service tiers lower the bill or raise performance; Provisioned Throughput buys reserved capacity by the hour. [Amazon Bedrock pricing](https://aws.amazon.com/bedrock/pricing/)

### How it works

| Option | Best for | How you pay |
|---|---|---|
| On-demand | Variable or spiky traffic | Per token, nothing when idle |
| Batch inference | Large jobs that can wait | Per token, about 50% less |
| Provisioned Throughput | Steady high volume; dedicated capacity, also for custom models | Hourly per model unit |
| Flex tier | Latency-tolerant work | Discounted per token |
| Priority tier | Fastest responses | Premium per token |

1. Prompt caching cuts cost and latency when the same long context repeats.
2. Intelligent prompt routing sends easy prompts to cheaper models in a family.
3. Cross-Region inference adds throughput; geographic profiles keep data in one geography.

### Exam cues

- If the question says large volume, not time-sensitive, think batch inference.
- If the question says run a custom (fine-tuned) model in Bedrock, think Provisioned Throughput for dedicated capacity or a custom model deployment for on-demand use.
- If the question says repeated long system prompt or document, think prompt caching.
- If the question says data residency plus more throughput, think geographic cross-Region inference.

### Remember

- Token count drives cost: shorter prompts and capped responses cost less.
- Provisioned Throughput: no commitment, 1 month or 6 months; billing runs until you delete it.

> **Trap:** Provisioned Throughput doesn't work through cross-Region inference profiles; a provisioned model can't borrow capacity from other Regions.
