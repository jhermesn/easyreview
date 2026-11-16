---
title: Foundation models through one API
level: foundational
order: 10
facts:
  - id: what
    text: Amazon Bedrock is a fully managed service that provides secure, enterprise-grade access to foundation models from leading AI companies for building and scaling generative AI applications.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html#what-is-bedrock
  - id: serverless
    text: Amazon Bedrock is serverless and offers models from Amazon (Amazon Nova) and other providers through a single API; with on-demand inference you pay for what you use and nothing while the application is idle.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: switch
    text: Because Amazon Bedrock gives model-independent API access, you can evaluate, switch and upgrade models with minimal code changes.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: converse
    text: The Converse API gives a consistent interface for conversational applications across models, and tool use (function calling) lets a model call tools you define, such as APIs or databases.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: marketplace
    text: Amazon Bedrock Marketplace offers more than 100 additional specialized models, which run on SageMaker AI endpoints with instances you choose, unlike the serverless catalog models.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: playground
    text: The Amazon Bedrock playground is a console interface for trying models, settings and inference parameters on your prompts.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/key-definitions.html
  - id: not-shared
    text: Amazon Bedrock doesn't share your inputs and model outputs with model providers.
    source: https://aws.amazon.com/bedrock/faqs/
  - id: private-copy
    text: When you customize a foundation model in Amazon Bedrock, it is based on a private copy of the model; your data isn't shared with model providers and isn't used to improve the base models.
    source: https://aws.amazon.com/bedrock/security-compliance/
cards:
  - id: bedrock-001
    q: A company wants to try models from several providers for a chatbot and switch between them without managing servers. Which AWS service fits?
    a: Amazon Bedrock, which offers foundation models from many providers through one serverless API.
    facts: [what, serverless, switch]
  - id: bedrock-002
    q: Does Amazon Bedrock use a customer's prompts or fine-tuning data to improve the base foundation models?
    a: "No. Inputs and outputs aren't shared with model providers, and fine-tuning runs on a private copy of the model."
    facts: [not-shared, private-copy]
  - id: bedrock-003
    q: Which Amazon Bedrock API gives one consistent request format for chat across different models?
    a: The Converse API.
    facts: [converse]
  - id: bedrock-004
    q: How does an LLM on Amazon Bedrock look up live data, such as an order status in a database, while answering?
    a: Through tool use (function calling). You define tools, and the model asks to call them to build its response.
    facts: [converse]
  - id: bedrock-005
    q: Where can a developer try different Amazon Bedrock models and inference parameters in the console, without writing code?
    a: The Amazon Bedrock playground.
    facts: [playground]
  - id: bedrock-006
    q: Do models from Amazon Bedrock Marketplace run serverless like the standard Bedrock catalog?
    a: "No. Marketplace models run on SageMaker AI-managed endpoints on instances you choose."
    trap: true
    facts: [marketplace]
---
Amazon Bedrock is the managed way to use foundation models on AWS: one API, many model providers, no servers. Your data stays yours: providers don't see your prompts and outputs, and customization works on a private copy of a model. [What is Amazon Bedrock?](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)

### How it works

1. Pick a model from the Bedrock catalog (Amazon Nova, Anthropic Claude, Meta Llama, Mistral and others).
2. Send prompts with the Converse or InvokeModel API; try them first in the console playground.
3. Add features as needed: Knowledge Bases for RAG, Guardrails for safety, evaluation, customization, agents with AgentCore.
4. Pay per token on demand, or choose batch, Provisioned Throughput or another service tier.

### Exam cues

- If the question says use foundation models from several providers without managing infrastructure, think Amazon Bedrock.
- If the question says the company worries its data trains the provider's model, think Bedrock's data privacy: data isn't shared or used to improve base models.
- If the question says the model must call an API or database, think tool use (function calling).

### Remember

- Serverless, single API, models from Amazon and other providers.
- Inputs and outputs aren't shared with model providers.

> **Trap:** Fine-tuning in Bedrock doesn't change the shared base model; it creates a private custom model in your account.
