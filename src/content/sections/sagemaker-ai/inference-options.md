---
title: Inference options
level: foundational
order: 20
facts:
  - id: real-time
    text: SageMaker AI real-time inference suits interactive workloads with low-latency requirements.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html#deploy-model-additional
  - id: serverless
    text: SageMaker AI Serverless Inference deploys models without managing infrastructure and suits workloads with idle periods between traffic spurts that can tolerate cold starts.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html#deploy-model-additional
  - id: serverless-gpu
    text: SageMaker AI Serverless Inference doesn't support GPUs, so it suits smaller models that run on CPU; large foundation models typically need GPU-based real-time endpoints.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: async
    text: Asynchronous inference queues requests and processes them asynchronously, for payloads up to 1 GB, processing times up to one hour and near real-time latency needs.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html#deploy-model-additional
  - id: batch
    text: Batch transform gets inferences for large datasets when you don't need a persistent endpoint, and can also preprocess datasets.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/batch-transform.html#batch-transform
cards:
  - id: sagemaker-ai-005
    q: A fraud check must score each card payment in milliseconds while the customer waits. Which SageMaker AI inference option fits?
    a: Real-time inference, a persistent endpoint for interactive, low-latency requests.
    facts: [real-time]
  - id: sagemaker-ai-006
    q: A company must score a 50 GB file of customer records once a week and doesn't need an endpoint the rest of the time. Which SageMaker AI option fits?
    a: Batch transform, which runs inference over a whole dataset without a persistent endpoint.
    facts: [batch]
  - id: sagemaker-ai-007
    q: Requests carry 500 MB images and take about 20 minutes each to process. Which SageMaker AI inference option fits?
    a: Asynchronous inference, built for payloads up to 1 GB and processing up to one hour.
    facts: [async]
  - id: sagemaker-ai-008
    q: An internal tool gets a few requests per hour with long idle gaps, and occasional cold starts are fine. Which SageMaker AI option minimizes cost?
    a: Serverless Inference, which needs no instances and suits intermittent traffic.
    facts: [serverless]
  - id: sagemaker-ai-009
    q: Can a large GPU-based foundation model run on SageMaker AI Serverless Inference?
    a: "No. Serverless Inference doesn't support GPUs; large FMs typically need GPU real-time endpoints."
    trap: true
    facts: [serverless-gpu]
---
SageMaker AI offers four ways to serve a model, chosen by latency need, payload size and traffic pattern. [Deploy models for inference](https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html)

### How it works

| Option | Latency | Best for |
|---|---|---|
| Real-time | Milliseconds | Interactive, steady traffic |
| Serverless | Milliseconds plus cold starts | Intermittent traffic, CPU models |
| Asynchronous | Near real-time, queued | Payloads up to 1 GB, up to 1 hour of processing |
| Batch transform | Minutes to hours | Whole datasets, no endpoint |

### Exam cues

- If the question says immediate, low-latency predictions, think real-time inference.
- If the question says large payloads or long processing, think asynchronous inference.
- If the question says score a whole dataset on a schedule, think batch transform.
- If the question says sporadic traffic and tolerates cold starts, think Serverless Inference.

### Remember

- Asynchronous: up to 1 GB payload, up to one hour.
- Serverless: no GPUs.

> **Trap:** Batch transform doesn't keep an endpoint running, so it can't answer individual live requests.
