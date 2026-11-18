---
title: Customizing models in Bedrock
level: foundational
order: 60
facts:
  - id: what
    text: Model customization in Amazon Bedrock gives a model training data to improve its performance for specific use cases, adjusting the model's parameters to create a custom model.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html#custom-models
  - id: sft
    text: Supervised fine-tuning trains a model on labeled examples of inputs and expected outputs, so it learns which outputs to produce for which inputs.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html#custom-models
  - id: format
    text: Fine-tuning datasets are JSON Lines (.jsonl) files; for single-turn tasks, each record has a prompt field with the input and a completion field with the expected output.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-prepare.html
  - id: rft
    text: Reinforcement fine-tuning uses reward functions, for example in AWS Lambda or a judge model, to score responses instead of labeled input-output pairs.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html#custom-models
  - id: distillation
    text: Distillation transfers knowledge from a larger teacher model to a smaller, faster and cheaper student model; Amazon Bedrock generates responses from the teacher for your prompts and uses them to fine-tune the student.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html#custom-models
  - id: cpt
    text: Continued pre-training trains a model on your own unlabeled data to make it more domain-specific.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: import
    text: Custom Model Import brings models fine-tuned or trained elsewhere, such as in Amazon SageMaker AI, into Amazon Bedrock for on-demand inference; supported open-weight architectures in Hugging Face format only.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: training-cost
    text: Model training is charged by tokens processed (tokens in the training data times the number of epochs), plus monthly storage per custom model.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html#custom-models
  - id: customization-role
    text: "A Bedrock model customization job uses a service role that Bedrock assumes to read training and validation files and write output in Amazon S3; if those resources use a KMS key, the role also needs permission to decrypt with that key."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-iam-role.html#model-customization-iam-role
  - id: tuning-data-handling
    text: "Bedrock uses fine-tuning data only to fine-tune your model and doesn't store it after the job; a fine-tuned model can still replay training data, so filter confidential data out before tuning."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/encryption-custom-job.html#encryption-custom-job
  - id: custom-inference
    text: "After customization, a Bedrock custom model runs on purchased Provisioned Throughput, or on demand after you deploy it with a custom model deployment and invoke the deployment ARN."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-use.html#model-customization-use
  - id: fine-tunable-amazon-models
    text: "Amazon models that can be fine-tuned in Bedrock include Nova Micro, Nova Lite, Nova Pro, Nova 2 Lite, Nova Canvas, Titan Image Generator G1 v2 and Titan Multimodal Embeddings G1."
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/custom-model-supported.html#custom-model-supported
cards:
  - id: bedrock-041
    q: A company has thousands of labeled examples of support tickets and ideal replies and wants a model to reply in that style. Which Amazon Bedrock customization fits?
    a: Supervised fine-tuning with prompt-completion pairs in a JSONL file.
    facts: [sft, format]
  - id: bedrock-042
    q: A law firm has a large corpus of unlabeled legal documents and wants a model to learn its domain vocabulary. Which Amazon Bedrock customization fits?
    a: Continued pre-training, which uses unlabeled domain data.
    facts: [cpt]
  - id: bedrock-043
    q: A large model gives great answers but is too slow and expensive in production. How can Amazon Bedrock produce a cheaper model with similar quality for this use case?
    a: Model distillation, with the large model as teacher and a smaller model as student.
    facts: [distillation]
  - id: bedrock-044
    q: What format does a fine-tuning dataset for Amazon Bedrock use?
    a: A JSON Lines (.jsonl) file of labeled examples, each with prompt and completion fields for single-turn tasks.
    facts: [format]
  - id: bedrock-045
    q: A team fine-tuned an open-weight model in SageMaker AI and wants to serve it serverlessly through the Amazon Bedrock API. Which feature fits?
    a: Amazon Bedrock Custom Model Import.
    facts: [import]
  - id: bedrock-046
    q: What is the difference between continued pre-training and fine-tuning?
    a: "Continued pre-training uses unlabeled data to build domain knowledge.\nFine-tuning uses labeled input-output pairs to teach a task."
    facts: [cpt, sft]
  - id: bedrock-047
    q: What drives the training cost of a model customization job in Amazon Bedrock?
    a: The tokens processed (training data tokens times epochs), plus monthly storage for the custom model.
    facts: [training-cost]
  - id: bedrock-048
    q: Can a model customized in Amazon Bedrock be called with plain on-demand pricing right after training?
    a: "Not directly. First create a custom model deployment, then invoke its ARN on demand and pay per use, or purchase Provisioned Throughput for dedicated capacity."
    trap: true
    facts: [custom-inference]
  - id: bedrock-063
    q: "How does continued pre-training customize a foundation model in Amazon Bedrock?"
    a: "It trains the model on your own unlabeled data to make it more specific to a domain."
    facts: [cpt]
  - id: bedrock-064
    q: "Does Amazon Bedrock fine-tuning guarantee a custom model never reveals its training data?"
    a: "No. Bedrock doesn't keep the data after the job, but a fine-tuned model can replay some of it. Remove confidential data before tuning."
    trap: true
    facts: [tuning-data-handling]
  - id: bedrock-065
    q: "A team wants to fine-tune an Amazon model in Bedrock that understands text, images and video. Which fits: Nova Micro, Nova Pro or Nova Reel?"
    a: "Nova Pro, a multimodal understanding model that Bedrock can fine-tune. Nova Micro is text only, and Nova Reel generates video and is not on the fine-tuning list."
    facts: [fine-tunable-amazon-models]
---
Customization changes the model itself, unlike prompts and RAG. Bedrock offers supervised fine-tuning, reinforcement fine-tuning, distillation and continued pre-training, and can import models trained elsewhere. [Customize your model](https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html)

### How it works

| Method | Training data | Use it to |
|---|---|---|
| Supervised fine-tuning | Labeled prompt-completion pairs (JSONL) | Teach a task or style |
| Reinforcement fine-tuning | Prompts plus reward functions | Align with what scores well |
| Distillation | Prompts; teacher model makes the answers | Shrink cost and latency |
| Continued pre-training | Unlabeled domain text | Learn a domain's language |

1. Put training (and optional validation) data in Amazon S3.
2. Start a customization job on a supported base model, with hyperparameters such as epochs.
3. Run inference through Provisioned Throughput, or deploy the custom model for on-demand inference and call the deployment ARN.

### Exam cues

- If the question says labeled examples of inputs and desired outputs, think supervised fine-tuning.
- If the question says lots of unlabeled domain documents, think continued pre-training.
- If the question says keep quality but cut cost and latency, think distillation (teacher to student).
- If the question says bring a model trained elsewhere, think Custom Model Import.

### Remember

- Fine-tuning changes the model's weights; RAG doesn't.
- Training cost = tokens processed (data tokens × epochs) + storage.

> **Trap:** Fine-tuning is the wrong fix for data that changes every week. Retraining is slow and costly; RAG serves fresh data at query time.
