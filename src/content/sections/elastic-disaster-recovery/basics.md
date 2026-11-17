---
title: "Elastic Disaster Recovery basics"
level: foundational
order: 5
facts:
  - id: drs
    text: "AWS Elastic Disaster Recovery reduces downtime and data loss with fast recovery of on-premises and cloud applications, using low-cost storage, minimal compute and point-in-time recovery."
    source: https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html#what-is-drs
cards:
  - id: elastic-disaster-recovery-013
    q: "A company wants to recover on-premises servers into AWS quickly after a disaster, paying little while idle. Which service fits?"
    a: "AWS Elastic Disaster Recovery."
    facts: [drs]
---
AWS Elastic Disaster Recovery replicates servers into AWS so they can be recovered quickly. [What is Elastic Disaster Recovery?](https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html#what-is-drs)

### How it works

1. Replicate source servers to AWS continuously.
2. Keep low-cost storage and minimal compute while idle.
3. Launch recovery instances when needed.

### Exam cues

- If the question says recover on-premises or cloud servers into AWS, think Elastic Disaster Recovery.

### Remember

- Low-cost standby, point-in-time recovery.

> **Trap:** Elastic Disaster Recovery is for recovery; migration projects use AWS Application Migration Service.
