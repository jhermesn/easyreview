---
title: "EKS basics"
level: foundational
order: 5
facts:
  - id: managed-k8s
    text: "Amazon EKS is a fully managed Kubernetes service that removes the work of operating Kubernetes clusters."
    source: https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html#what-is-eks
cards:
  - id: eks-062
    q: "A company already runs Kubernetes and wants AWS to manage the clusters. Which service fits?"
    a: "Amazon Elastic Kubernetes Service (Amazon EKS)."
    facts: [managed-k8s]
---
Amazon EKS runs Kubernetes for you on AWS.

### How it works

1. Create an EKS cluster; AWS runs the Kubernetes control plane.
2. Add compute for the containers.
3. Deploy workloads with standard Kubernetes tools.

### Exam cues

- If the question says Kubernetes on AWS, think EKS.

### Remember

- Managed Kubernetes.

> **Trap:** Choose EKS for Kubernetes and ECS for the AWS-native orchestrator.
