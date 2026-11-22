---
title: "Elastic Disaster Recovery basics"
level: foundational
order: 5
facts:
  - id: drs
    text: "AWS Elastic Disaster Recovery reduces downtime and data loss with fast recovery of on-premises and cloud applications, using low-cost storage, minimal compute and point-in-time recovery."
    source: https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html#what-is-drs
  - id: scope
    text: Elastic Disaster Recovery recovers on-premises and cloud-based applications running on supported server operating systems.
    source: https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html
  - id: agent
    text: The AWS Replication Agent continuously copies disk block changes from source servers to a target staging area.
    source: https://docs.aws.amazon.com/drs/latest/userguide/CloudEndure-Concepts.html
  - id: staging
    text: The staging area subnet is in a selected AWS account and Region and uses storage and minimal compute for ongoing replication.
    source: https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html
  - id: conversion
    text: Recovery orchestration creates volumes from replicated data and converts non-AWS servers to boot natively on EC2.
    source: https://docs.aws.amazon.com/drs/latest/userguide/CloudEndure-Concepts.html
  - id: recovery-dashboard
    text: "The Elastic Disaster Recovery recovery dashboard shows source server replication status, replication progress and lag."
    source: https://docs.aws.amazon.com/drs/latest/userguide/recovery-dashboard.html
cards:
  - id: elastic-disaster-recovery-013
    q: "A company wants to recover on-premises servers into AWS quickly after a disaster, paying little while idle. Which service fits?"
    a: "AWS Elastic Disaster Recovery."
    facts: [drs]
  - id: elastic-disaster-recovery-001
    q: When does AWS Elastic Disaster Recovery fit a recovery requirement?
    a: When supported servers need continuous replication to AWS and recovery onto EC2. The staging area maintains replicated data with minimal compute.
    facts:
      - scope
      - agent
      - staging
      - conversion
  - id: elastic-disaster-recovery-014
    q: "Where can an AWS Elastic Disaster Recovery operator see a source server replication progress and lag?"
    a: "The source server recovery dashboard."
    facts: [recovery-dashboard]
---
AWS Elastic Disaster Recovery replicates servers into AWS so they can be recovered quickly.

### How it works

1. Replicate source servers to AWS continuously.
2. Keep low-cost storage and minimal compute while idle.
3. Launch recovery instances when needed.

### Exam cues

- If the question says check replication progress or lag, think the Elastic Disaster Recovery recovery dashboard, because it shows source server replication status.
- If the question says recover on-premises or cloud servers into AWS, think Elastic Disaster Recovery.

### Remember

- Low-cost standby, point-in-time recovery.

> **Trap:** Elastic Disaster Recovery is for recovery; migration projects use AWS Application Migration Service.
