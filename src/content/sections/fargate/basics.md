---
title: "Fargate basics"
level: foundational
order: 5
facts:
  - id: serverless-containers
    text: "AWS Fargate runs containers without provisioning, configuring or scaling clusters of EC2 instances; you set CPU and memory per task."
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html#AWS_Fargate
  - id: linux-ephemeral-storage
    text: "Fargate Linux tasks on platform version 1.4.0 or later receive at least 20 GiB of ephemeral storage by default."
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-task-storage.html
cards:
  - id: fargate-017
    q: "A team wants to run containers on ECS without managing any EC2 instances. What should it use?"
    a: "AWS Fargate."
    facts: [serverless-containers]
  - id: fargate-003
    q: "What resources does a team choose for an AWS Fargate task?"
    a: "Set CPU and memory per task."
    facts: [serverless-containers]
  - id: fargate-018
    q: "How much ephemeral storage does an Amazon ECS Fargate Linux task receive by default on platform version 1.4.0 or later?"
    a: "At least 20 GiB."
    facts: [linux-ephemeral-storage]
revised:
  - date: 2026-11-23
    note: The card now asks which resources are set per task.
    cards: [fargate-003]
---
AWS Fargate is serverless compute for containers: you run tasks without managing servers.

### How it works

1. Package the app in a container.
2. Set the CPU and memory for the task.
3. Fargate runs it with no servers for you to manage.

### Exam cues

- If the question says containers without managing servers, think Fargate.

### Remember

- Fargate Linux platform version 1.4.0 or later: at least 20 GiB of ephemeral storage by default.
- You choose CPU and memory per task.

> **Trap:** Fargate is not a separate orchestrator; it is the serverless way to run ECS (or EKS) workloads.
