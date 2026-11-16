---
title: JumpStart, Canvas and Unified Studio
level: foundational
order: 30
facts:
  - id: jumpstart
    text: Amazon SageMaker JumpStart is an ML hub with hundreds of open-weight and proprietary foundation models that you can deploy in a few steps and customize with techniques such as Parameter-Efficient Fine-Tuning (PEFT) and LoRA.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: implementations
    text: Pre-trained models from SageMaker JumpStart need the least effort, built-in algorithms need more, and custom code or a custom Docker image needs the most.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/algorithms-choose.html#algorithms-choose-implementation
  - id: canvas
    text: Amazon SageMaker Canvas generates predictions with machine learning without writing any code, for use cases such as predicting customer churn or planning inventory.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/canvas.html
  - id: unified-studio
    text: Amazon SageMaker Unified Studio is a single development experience that brings together AWS data, analytics, AI and ML services to build, deploy and monitor workflows from one interface.
    source: https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/what-is-sagemaker-unified-studio.html
  - id: bedrock-in-studio
    text: Amazon Bedrock in SageMaker Unified Studio (previously Amazon Bedrock IDE) lets you discover models, try prompts in a playground and build generative AI apps with knowledge bases and guardrails, with little or no code.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
cards:
  - id: sagemaker-ai-010
    q: A team wants to deploy and fine-tune an open-weight foundation model from a catalog of pre-trained models, with its own instances. Which SageMaker AI feature fits?
    a: Amazon SageMaker JumpStart.
    facts: [jumpstart]
  - id: sagemaker-ai-011
    q: A business analyst with no coding skills wants to build a churn prediction model. Which SageMaker AI tool fits?
    a: Amazon SageMaker Canvas, which builds ML predictions without code.
    facts: [canvas]
  - id: sagemaker-ai-012
    q: What is the difference between Amazon Bedrock and SageMaker JumpStart for foundation models?
    a: "Bedrock serves FMs serverlessly through an API.\nJumpStart deploys pre-trained models to SageMaker AI endpoints you manage and can fine-tune."
    facts: [jumpstart]
  - id: sagemaker-ai-013
    q: Which approach needs the least effort to get an ML model into use on SageMaker AI?
    a: A pre-trained model from SageMaker JumpStart, ahead of built-in algorithms and custom code.
    facts: [implementations]
  - id: sagemaker-ai-014
    q: A data team wants one interface for data, analytics and AI work, including Amazon Bedrock prototyping. Which tool fits?
    a: Amazon SageMaker Unified Studio.
    facts: [unified-studio, bedrock-in-studio]
---
SageMaker AI covers the range from no-code to full code. Canvas builds predictions without code, JumpStart deploys and tunes pre-trained models, and Unified Studio puts data, analytics and AI work in one place. [JumpStart and FM hosting](https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html)

### How it works

| Tool | For | Gives you |
|---|---|---|
| SageMaker Canvas | Business analysts | No-code ML predictions |
| SageMaker JumpStart | Builders | Pre-trained FMs and models to deploy and fine-tune |
| SageMaker Unified Studio | Data and AI teams | One interface for data, analytics, ML and Bedrock |

### Exam cues

- If the question says no code, business analyst, predictions, think SageMaker Canvas.
- If the question says pre-trained or open-source models to deploy or fine-tune on SageMaker AI, think SageMaker JumpStart.
- If the question says one environment for data, analytics and AI, think SageMaker Unified Studio.

### Remember

- JumpStart supports PEFT and LoRA fine-tuning.
- Least effort: pre-trained model; most effort: custom container.

> **Trap:** JumpStart models run on SageMaker AI endpoints that you pay for by the hour, not serverlessly like Bedrock's catalog.
