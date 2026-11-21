---
title: "Application Auto Scaling basics"
level: foundational
order: 5
facts:
  - id: beyond-ec2
    text: "Application Auto Scaling scales resources of individual AWS services beyond EC2, such as Aurora replicas and DynamoDB tables."
    source: https://docs.aws.amazon.com/autoscaling/application/userguide/what-is-application-auto-scaling.html#what-is-application-auto-scaling
cards:
  - id: application-auto-scaling-011
    q: "Which service scales DynamoDB table capacity or the number of Aurora replicas automatically?"
    a: "Application Auto Scaling."
    facts: [beyond-ec2]
---
Application Auto Scaling brings automatic scaling to AWS services other than EC2.

### How it works

1. Register a scalable resource such as a DynamoDB table.
2. Define a scaling policy.
3. The capacity changes with the load.

### Exam cues

- If the question says scale a non-EC2 resource such as DynamoDB or Aurora replicas, think Application Auto Scaling.

### Remember

- Covers services beyond EC2.

> **Trap:** EC2 instances scale with EC2 Auto Scaling; other services use Application Auto Scaling.
