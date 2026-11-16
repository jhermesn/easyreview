---
title: Accelerated computing for AI
level: foundational
order: 40
facts:
  - id: trainium
    text: AWS Trainium is an AWS-designed AI chip for training and serving models; Amazon EC2 Trn2 and Trn3 UltraServers use it for large-scale training and inference.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: inferentia
    text: AWS Inferentia is an AWS-designed AI chip for inference; Amazon EC2 Inf2 instances use it for high-performance, cost-efficient deep learning and generative AI inference.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: gpu
    text: NVIDIA GPU instances such as Amazon EC2 P5 and P6 serve demanding training and inference, and G6e instances serve cost-efficient inference and graphics workloads.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
  - id: neuron
    text: AWS Trainium and AWS Inferentia use the AWS Neuron SDK, which supports PyTorch, JAX and vLLM.
    source: https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html#understand
cards:
  - id: ec2-057
    q: A company wants the most cost-efficient AWS-designed chips to train its own large models. Which option fits?
    a: AWS Trainium (Amazon EC2 Trn2 or Trn3 instances).
    facts: [trainium]
  - id: ec2-058
    q: A company wants low-cost, high-throughput inference for a deep learning model on AWS-designed chips. Which EC2 instances fit?
    a: Amazon EC2 Inf2 instances, powered by AWS Inferentia.
    facts: [inferentia]
  - id: ec2-059
    q: Which SDK runs models on AWS Trainium and Inferentia?
    a: The AWS Neuron SDK.
    facts: [neuron]
  - id: ec2-060
    q: Is AWS Inferentia meant for training large models?
    a: "No. Inferentia targets inference; Trainium targets training (and also serves models)."
    trap: true
    facts: [inferentia, trainium]
---
Training and serving large models needs accelerators. AWS offers its own chips (Trainium for training, Inferentia for inference) next to NVIDIA GPU instances. [Infrastructure for training and inference](https://docs.aws.amazon.com/decision-guides/latest/generative-ai-on-aws-how-to-choose/guide.html)

### How it works

| Accelerator | Instances | Main job |
|---|---|---|
| AWS Trainium | Trn2, Trn3 | Training (and serving) |
| AWS Inferentia | Inf2 | Cost-efficient inference |
| NVIDIA GPUs | P5, P6, G6e | Training and inference, graphics |

### Exam cues

- If the question says cost-efficient training on AWS-designed chips, think Trainium.
- If the question says cost-efficient inference on AWS-designed chips, think Inferentia.

### Remember

- Trainium and Inferentia use the AWS Neuron SDK.

> **Trap:** Trainium is for training, Inferentia for inference. The names give it away.
