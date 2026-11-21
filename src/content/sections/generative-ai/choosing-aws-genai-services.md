---
title: Choosing an AWS generative AI service
level: foundational
order: 60
facts:
  - id: three-paths
    text: Employee productivity and software development help point to an AI assistant such as Amazon Quick Suite or Kiro; building your own application or agent points to Amazon Bedrock and Amazon Bedrock AgentCore; hosting, customizing or training models yourself points to Amazon SageMaker AI, SageMaker HyperPod or self-managed infrastructure.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#consider
  - id: bedrock-default
    text: For inference on available models, Amazon Bedrock is the default starting point; it is fully managed and serverless, with models from Amazon and leading providers through a single API.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: sagemaker-when
    text: Amazon SageMaker AI fits when you need a model that Amazon Bedrock doesn't offer, customization beyond what Bedrock supports, or control over how the model is served.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: cost-model
    text: Amazon Bedrock on-demand inference charges per token with no idle cost, which suits variable or spiky traffic; instance-based options charge for compute whether or not it's used and pay off only at sustained high utilization.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#consider
  - id: ops-burden
    text: Amazon Bedrock has the lowest operational burden, SageMaker AI manages instances while you manage the model stack, and self-managed EC2, EKS or ECS gives full control and full responsibility; choose the most managed option that gives the control you need.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#consider
  - id: builtin
    text: Many AWS services include built-in generative AI features, such as AI recommendations for agents in Amazon Connect; if an existing service already has the capability, start there.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: q-business
    text: Amazon Q Business stopped accepting new customers on July 31, 2026; Amazon Quick Suite is its next evolution, and existing customers can keep using Q Business.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
cards:
  - id: generative-ai-033
    q: A company wants to add a generative AI feature to its own app using a hosted model, with no servers to manage. Which AWS service is the default starting point?
    a: Amazon Bedrock, which serves foundation models from several providers through one serverless API.
    facts: [bedrock-default]
  - id: generative-ai-034
    q: A team needs an open-weight model that isn't in Amazon Bedrock and wants control over the serving stack. Which service fits?
    a: Amazon SageMaker AI, which hosts, customizes and trains models when Bedrock doesn't offer the model or the control needed.
    facts: [sagemaker-when]
  - id: generative-ai-035
    q: A generative AI app has unpredictable, spiky traffic and long idle periods. Which pricing model avoids paying for idle capacity?
    a: Amazon Bedrock on-demand inference, billed per token with no cost when idle.
    facts: [cost-model]
  - id: generative-ai-036
    q: Employees want an AI assistant to answer questions across company data, without building anything. Which AWS offering fits?
    a: Amazon Quick Suite, an AI-powered workspace for employee productivity.
    facts: [three-paths, q-business]
  - id: generative-ai-037
    q: Rank Amazon Bedrock, SageMaker AI and self-managed EC2 from least to most operational work for hosting a model.
    a: Amazon Bedrock, then SageMaker AI, then self-managed EC2 (full control, full responsibility).
    facts: [ops-burden]
  - id: generative-ai-038
    q: "Which AWS service is a managed starting point for building a generative AI application with available models from multiple providers?"
    a: "Amazon Bedrock provides serverless access to models from Amazon and other providers."
    facts: [bedrock-default]
---
AWS offers generative AI at three levels: ready-made assistants, a managed platform to build your own apps and agents, and infrastructure to host or train models yourself. Pick the most managed option that meets the need.

### How it works

| Need | Start with |
|---|---|
| Employees want answers, content or analysis across company data | Amazon Quick Suite |
| Developers want an agentic coding assistant | Kiro |
| Build your own generative AI app on a hosted model | Amazon Bedrock |
| Build and run AI agents | Amazon Bedrock AgentCore |
| Host, customize or train a model Bedrock doesn't offer | Amazon SageMaker AI |
| Full control of the serving stack | Self-managed on EC2, EKS or ECS |

1. Check first whether an AWS service you use already has the generative AI feature built in.
2. Prefer Bedrock for inference on available models: per-token pricing and no infrastructure.
3. Move to SageMaker AI or self-managed hosting only for models, customization or control Bedrock lacks.

### Exam cues

- If the question says no infrastructure, choice of models through one API, think Amazon Bedrock.
- If the question says custom training, open-weight model hosting or control of instances, think Amazon SageMaker AI.
- If the question says spiky traffic and no idle cost, think Bedrock on-demand (per token).
- If the question says business users need an assistant over company data, think Amazon Quick Suite.

### Remember

- Bedrock has the lowest operational burden; self-managed has the highest.
- Amazon Q Business closed to new customers on July 31, 2026; Quick Suite succeeds it.

> **Trap:** Instance-based hosting isn't cheaper by default. It bills for idle time and only wins at sustained, high utilization.
