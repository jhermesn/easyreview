---
title: Data preparation and human review
level: foundational
order: 40
facts:
  - id: data-wrangler
    text: SageMaker Data Wrangler imports, prepares, transforms, featurizes and analyzes data for ML; it is now integrated into SageMaker Canvas, with a natural language interface as well as a visual one.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler.html
  - id: feature-store
    text: Amazon SageMaker Feature Store creates, stores and shares features, the transformed inputs for ML models, for training and inference across teams and accounts.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html
  - id: ground-truth
    text: Amazon SageMaker Ground Truth builds labeled training datasets with a vendor or private workforce, and automated data labeling uses ML to decide which data needs human labels.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/sms.html
  - id: a2i
    text: Amazon Augmented AI (A2I) adds human review of low-confidence or randomly sampled predictions from Amazon Rekognition, Amazon Textract or custom ML models.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/a2i-use-augmented-ai-a2i-human-review-loops.html
  - id: closed
    text: SageMaker Ground Truth and Amazon A2I are no longer open to new customers; existing customers can keep using them, but no new features are planned.
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/sms.html
  - id: dw-quality-report
    text: "The Data Wrangler Data Quality and Insights Report analyzes an imported dataset and shows issues such as missing values and outliers to guide cleaning."
    source: https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler-data-insights.html#data-wrangler-data-insights
cards:
  - id: sagemaker-ai-015
    q: A loan app built on Amazon Textract must send low-confidence extractions to a person to check. Which AWS service was built for this?
    a: Amazon Augmented AI (A2I), which routes low-confidence predictions to human reviewers. It's no longer open to new customers.
    facts: [a2i, closed]
  - id: sagemaker-ai-016
    q: Data scientists across teams keep rebuilding the same customer features. Which SageMaker AI feature lets them store and share features?
    a: Amazon SageMaker Feature Store.
    facts: [feature-store]
  - id: sagemaker-ai-017
    q: A team must label 100,000 images for training, using its own staff plus ML to label the easy ones automatically. Which SageMaker AI feature was built for this?
    a: SageMaker Ground Truth with automated data labeling. It's no longer open to new customers.
    facts: [ground-truth, closed]
  - id: sagemaker-ai-018
    q: Which SageMaker AI tool prepares and transforms data visually, now inside SageMaker Canvas?
    a: SageMaker Data Wrangler.
    facts: [data-wrangler]
  - id: sagemaker-ai-019
    q: How can Amazon SageMaker Ground Truth help prepare data for machine learning?
    a: "It helps build labeled training datasets using human workers and automated data labeling."
    facts: [ground-truth]
---
Good models need prepared data and, often, people in the loop. SageMaker AI has tools to prepare and share data, to label it, and to send uncertain predictions to human reviewers.

### How it works

| Tool | Job |
|---|---|
| Data Wrangler (in Canvas) | Prepare, transform and analyze data |
| Feature Store | Store and share features for training and inference |
| Ground Truth | Label training data with people plus automated labeling |
| Augmented AI (A2I) | Human review of low-confidence predictions |

### Exam cues

- If the question says human review of low-confidence predictions, think Amazon A2I (human-in-the-loop).
- If the question says label training data with a workforce, think SageMaker Ground Truth.
- If the question says reuse features across teams, think SageMaker Feature Store.
- If the question says visual data preparation, think Data Wrangler in SageMaker Canvas.

### Remember

- Ground Truth labels training data before training; A2I reviews predictions after deployment.
- Ground Truth and A2I are closed to new customers.

> **Trap:** Ground Truth and A2I both involve people, but at different stages: labeling training data versus checking live predictions.
