---
title: Build, train, and deploy models
level: foundational
order: 10
facts:
  - id: purpose
    text: Amazon SageMaker AI is a fully managed machine learning service where data scientists and developers build, train and deploy ML models into a production-ready hosted environment.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html#whatis
  - id: no-servers
    text: With SageMaker AI you store and share data without building and managing your own servers, and it provides managed ML algorithms that run efficiently on very large data in a distributed environment.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html#whatis
  - id: byo
    text: SageMaker AI supports bring-your-own algorithms and frameworks with flexible distributed training, and deploys models into a secure, scalable environment.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html#whatis
  - id: savings-plans
    text: SageMaker AI Savings Plans lower prices for SageMaker AI instance usage regardless of instance family, size, component or Region.
    source: https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html#what-is-savings-plans
cards:
  - id: sagemaker-ai-001
    q: Data scientists want to build, train and deploy their own custom machine learning model without managing servers. Which AWS service fits?
    a: Amazon SageMaker AI, a fully managed ML service.
    facts: [purpose, no-servers]
  - id: sagemaker-ai-002
    q: When should a company use Amazon SageMaker AI instead of a service like Amazon Rekognition?
    a: When it needs its own custom model trained on its own data. Rekognition and similar services offer pre-built AI for common tasks.
    facts: [purpose, byo]
  - id: sagemaker-ai-003
    q: Can Amazon SageMaker AI train models with the team's own algorithms and frameworks?
    a: Yes. It supports bring-your-own algorithms and frameworks with distributed training.
    facts: [byo]
  - id: sagemaker-ai-004
    q: Is Amazon SageMaker AI the simplest choice to add sentiment analysis to an app with no ML team?
    a: No. A pre-built service such as Amazon Comprehend does it through an API; SageMaker AI is for building custom models.
    trap: true
    facts: [purpose]
---
Amazon SageMaker AI is the AWS platform for custom machine learning. Data scientists prepare data, train models and deploy them to production in one managed service, without running their own servers. [What is Amazon SageMaker AI?](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html#whatis)

### How it works

1. Prepare and store data.
2. Train a model with built-in algorithms or your own framework, distributed across managed instances.
3. Deploy the model to a secure, scalable endpoint.
4. Lower ongoing costs with SageMaker AI Savings Plans.

| Need | Service type |
|---|---|
| Common AI task through an API (text, images, speech) | Pre-built AI services such as Comprehend, Rekognition, Transcribe |
| Your own model trained on your data | Amazon SageMaker AI |

### Exam cues

- If the question says build, train and deploy custom ML models, think Amazon SageMaker AI.
- If the question says a common task with no ML expertise, think a pre-built AI service instead.

### Remember

- Fully managed: build, train, deploy.
- Supports your own algorithms and frameworks.

> **Trap:** SageMaker AI is for teams that build models. For ready-made capabilities like translation or face detection, pick the dedicated AI service.
