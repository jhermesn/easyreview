---
title: "Fargate basics"
level: foundational
order: 5
facts:
  - id: serverless-containers
    text: "AWS Fargate runs containers without provisioning, configuring or scaling clusters of EC2 instances; you set CPU and memory per task."
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#AWS_Fargate
  - id: compute
    text: Fargate runs ECS containers without customers provisioning, patching, or scaling container hosts.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
cards:
  - id: fargate-017
    q: "A team wants to run containers on ECS without managing any EC2 instances. What should it use?"
    a: "AWS Fargate."
    facts: [serverless-containers]
  - id: fargate-003
    q: "A team wants to run Amazon ECS containers without provisioning or patching container hosts. Which compute option fits?"
    a: "AWS Fargate runs ECS containers without customers provisioning, patching or scaling container hosts."
    facts:
      - compute
---
AWS Fargate is serverless compute for containers: you run tasks without managing servers. [AWS Fargate for Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#AWS_Fargate)

### How it works

1. Package the app in a container.
2. Set the CPU and memory for the task.
3. Fargate runs it with no servers for you to manage.

### Exam cues

- If the question says containers without managing servers, think Fargate.

### Remember

- You choose CPU and memory per task.

> **Trap:** Fargate is not a separate orchestrator; it is the serverless way to run ECS (or EKS) workloads.
