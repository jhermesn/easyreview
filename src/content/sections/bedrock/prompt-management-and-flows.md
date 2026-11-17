---
title: Prompt Management and Flows
level: foundational
order: 70
facts:
  - id: prompt-management
    text: Prompt Management in Amazon Bedrock lets you create, edit and save prompts to reuse across workflows, with a chosen model and inference parameters.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html#prompt-management
  - id: variables
    text: Prompts in Prompt Management can include variables, so one prompt adapts to different inputs.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html#prompt-management
  - id: variants
    text: You can compare variants of a prompt to pick the one with the best outputs and save versions of the prompt as you iterate.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html#prompt-management
  - id: flows
    text: Amazon Bedrock Flows (previously Prompt Flows) builds generative AI workflows visually by linking prompts, models, knowledge bases, guardrails and services such as AWS Lambda.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: catalog
    text: A prompt catalog is a central repository for storing, managing and versioning the prompts an organization uses.
    source: https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/definitions.html
  - id: prompt-tools
    text: "A prompt saved in Bedrock Prompt Management can include a tools configuration, for supported models, so the model can call an external tool or API when it generates the response."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-create.html#prompt-management-create
cards:
  - id: bedrock-049
    q: A team wants to store reusable prompts with placeholders, test variants and keep versions. Which Amazon Bedrock feature fits?
    a: Amazon Bedrock Prompt Management, with variables, variants and versions.
    facts: [prompt-management, variables, variants]
  - id: bedrock-050
    q: A developer wants to chain a prompt, a knowledge base lookup, a guardrail and a Lambda function into one visual workflow. Which Amazon Bedrock feature fits?
    a: Amazon Bedrock Flows.
    facts: [flows]
  - id: bedrock-051
    q: Why version prompts instead of editing them in application code?
    a: Versions let teams test variants, roll back and reuse approved prompts across applications, like a prompt catalog.
    facts: [variants, catalog]
  - id: bedrock-052
    q: In Amazon Bedrock Prompt Management, what lets one saved prompt serve many customers' requests?
    a: Variables in the prompt, filled in with each request's values.
    facts: [variables]
  - id: bedrock-054
    q: "A reusable prompt in Bedrock Prompt Management must let the model call an external API. What does the prompt need?"
    a: "A tools configuration in the saved prompt, for a model that supports tool use."
    facts: [prompt-tools]
---
Prompts are part of an application's code and deserve the same care: Amazon Bedrock Prompt Management stores them with variables, compares variants and keeps versions, and Flows wires prompts into larger workflows. [Prompt Management](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html)

### How it works

1. Create a prompt with variables, such as {{product}}, and choose a model and inference parameters.
2. Test variants side by side and keep the best one.
3. Save a version, so applications use a fixed, approved prompt.
4. Call it from inference or add it as a node in a Flow.

### Exam cues

- If the question says reuse, version and manage prompts centrally, think Prompt Management.
- If the question says visual workflow linking prompts, knowledge bases and Lambda, think Bedrock Flows.

### Remember

- Prompt Management: variables, variants, versions.
- Flows was previously called Prompt Flows.

> **Trap:** Prompt Management doesn't train or change the model; it manages the prompts sent to it.
