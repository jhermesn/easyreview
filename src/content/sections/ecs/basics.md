---
title: "ECS basics"
level: foundational
order: 5
facts:
  - id: orchestration
    text: "Amazon ECS is a fully managed container orchestration service for deploying, managing and scaling containerized applications."
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html#Welcome
cards:
  - id: ecs-076
    q: "A team packages its app as Docker containers and wants AWS to run and scale them with an AWS-native orchestrator. Which service fits?"
    a: "Amazon Elastic Container Service (Amazon ECS)."
    facts: [orchestration]
---
Amazon ECS runs and scales containers for you, on EC2 instances or on AWS Fargate. [What is Amazon ECS?](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html#Welcome)

### How it works

1. Describe the containers to run.
2. ECS places and runs them.
3. ECS keeps the desired number running and scales them.

### Exam cues

- If the question says run containers with an AWS-managed orchestrator, think ECS.

### Remember

- Fully managed container orchestration.

> **Trap:** ECS is the AWS orchestrator; Kubernetes workloads use Amazon EKS.
