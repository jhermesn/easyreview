---
title: "Compute Optimizer basics"
level: foundational
order: 5
facts:
  - id: rightsizing
    text: "AWS Compute Optimizer analyzes the configuration and utilization of AWS resources to recommend rightsizing and to find idle resources."
    source: https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html#what-is-compute-optimizer
cards:
  - id: compute-optimizer-009
    q: "A company suspects many EC2 instances are oversized. Which service recommends better sizes from usage data?"
    a: "AWS Compute Optimizer."
    facts: [rightsizing]
---
AWS Compute Optimizer recommends resource sizes based on how resources are actually used. [What is AWS Compute Optimizer?](https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html#what-is-compute-optimizer)

### How it works

1. Opt in to Compute Optimizer.
2. It analyzes utilization metrics.
3. It recommends rightsizing and flags idle resources.

### Exam cues

- If the question says rightsizing recommendations, think Compute Optimizer.

### Remember

- Rightsizing and idle resources.

> **Trap:** Compute Optimizer recommends; it does not resize resources by itself.
