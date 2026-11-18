---
title: ECS Anywhere
level: associate
order: 90
facts:
  - id: what
    text: Amazon ECS Anywhere registers external instances, such as on-premises servers or virtual machines, to an Amazon ECS cluster.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-anywhere.html#ecs-anywhere
  - id: outbound
    text: ECS Anywhere external instances suit applications that generate outbound traffic or process data, because service load balancing isn't supported for them.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-anywhere.html#ecs-anywhere-considerations
  - id: ssm-agent
    text: The SSM Agent on an ECS Anywhere external instance holds IAM credentials that rotate every 30 minutes and refresh after a lost connection is restored.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-anywhere.html#ecs-anywhere-considerations
cards:
  - id: ecs-072
    q: A company wants to run containerized batch jobs on its own on-premises servers but manage them from the same Amazon ECS control plane as its cloud tasks. Which feature fits?
    a: "**Amazon ECS Anywhere**, which registers on-premises servers as external instances in an ECS cluster."
    facts: [what]
  - id: ecs-073
    q: Can an ECS service on ECS Anywhere external instances sit behind an Application Load Balancer?
    a: "No. Service load balancing isn't supported for external instances, so they suit outbound or data processing workloads."
    trap: true
    facts: [outbound]
---
ECS Anywhere extends an ECS cluster to servers you own: the same task definitions and console, with the containers running on premises. [Amazon ECS clusters for external instances](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-anywhere.html)

### How it works

1. Register an on-premises server or VM with Systems Manager and the ECS cluster (the install script adds the SSM and ECS agents).
2. ECS schedules tasks on it with the `EXTERNAL` launch type.
3. The SSM Agent keeps rotating IAM credentials for the instance.

### Exam cues

- If the question says run ECS tasks on premises with one control plane, think ECS Anywhere.
- If the question says on-premises tasks must receive load-balanced inbound traffic, ECS Anywhere is a poor fit.

### Remember

- External instances join an existing ECS cluster.
- No service load balancing; best for outbound or processing work.
- Credentials rotate every 30 minutes through the SSM Agent.

> **Trap:** ECS Anywhere and EKS Anywhere differ: ECS Anywhere keeps the AWS-managed ECS control plane, while EKS Anywhere puts the Kubernetes control plane on your hardware.
