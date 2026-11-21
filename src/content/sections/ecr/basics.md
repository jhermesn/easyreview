---
title: "ECR basics"
level: foundational
order: 5
facts:
  - id: registry
    text: "Amazon ECR is an AWS managed container image registry with private repositories controlled through IAM, and public repositories too."
    source: https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html#what-is-ecr
cards:
  - id: ecr-026
    q: "Where can a team store its private Docker images on AWS for ECS and EKS to pull?"
    a: "Amazon Elastic Container Registry (Amazon ECR)."
    facts: [registry]
---
Amazon ECR stores container images so services such as ECS and EKS can pull them.

### How it works

1. Push an image to an ECR repository.
2. IAM controls who can push and pull.
3. Container services pull the image to run it.

### Exam cues

- If the question says store container images, think ECR.

### Remember

- Private and public repositories.

> **Trap:** ECR stores images; ECS, EKS and Fargate run them.
