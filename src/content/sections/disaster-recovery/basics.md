---
title: "Disaster recovery basics"
level: foundational
order: 5
facts:
  - id: four-strategies
    text: "AWS groups disaster recovery strategies into four approaches, from low-cost backup and restore, through pilot light and warm standby, to multi-site active/active."
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#disaster-recovery-options-in-the-cloud
  - id: rto-rpo-basic
    text: "Recovery Time Objective (RTO) is how long recovery may take; Recovery Point Objective (RPO) is how much data, measured in time, may be lost."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel13-bp01.html#rel13-bp01
cards:
  - id: disaster-recovery-036
    q: "Which disaster recovery strategy is the cheapest and slowest to recover?"
    a: "Backup and restore."
    facts: [four-strategies]
  - id: disaster-recovery-037
    q: "Which disaster recovery strategy runs full production in more than one Region at the same time?"
    a: "Multi-site active/active, the most expensive with the fastest recovery."
    facts: [four-strategies]
  - id: disaster-recovery-038
    q: "A business can lose at most 15 minutes of data. Which objective is that?"
    a: "Recovery Point Objective (RPO)."
    trap: true
    facts: [rto-rpo-basic]
---
Disaster recovery (DR) is how a workload comes back after a major failure. The four AWS strategies trade cost against recovery speed.

### How it works

1. Backup and restore: copy data elsewhere and rebuild after a disaster.
2. Pilot light: keep the core, such as data, ready and start the rest when needed.
3. Warm standby: run a smaller full copy and scale it up.
4. Multi-site active/active: run full production in several Regions.

### Exam cues

- If the question says lowest cost DR, think backup and restore.
- If the question says near-zero downtime across Regions, think multi-site active/active.

### Remember

- Cost and speed rise from backup and restore to multi-site.
- RTO is time to recover; RPO is data loss allowed.

> **Trap:** RTO is about time to restore service; RPO is about how much data you can lose. Questions swap them.
