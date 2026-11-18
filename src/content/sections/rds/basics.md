---
title: "RDS availability and scaling basics"
level: foundational
order: 5
facts:
  - id: multi-az-basic
    text: "An RDS Multi-AZ deployment keeps a standby DB instance in another Availability Zone for failover; in the one-standby form the standby does not serve reads."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html#Concepts.MultiAZ
  - id: read-replica-basic
    text: "An RDS read replica is a read-only copy of a DB instance that takes read queries off the primary for read-heavy workloads."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl
cards:
  - id: rds-073
    q: "An RDS database must survive the loss of an Availability Zone. Which feature fits?"
    a: "Multi-AZ deployment, with a standby in another Availability Zone."
    facts: [multi-az-basic]
  - id: rds-074
    q: "A database is overloaded by reporting queries. Which RDS feature takes the reads?"
    a: "Read replicas, read-only copies that serve the queries."
    facts: [read-replica-basic]
  - id: rds-075
    q: "Does an RDS Multi-AZ standby (one-standby deployment) serve read traffic?"
    a: "No. It is for failover; read replicas serve reads."
    trap: true
    facts: [multi-az-basic, read-replica-basic]
---
Amazon RDS improves availability with Multi-AZ standbys and scales reads with read replicas. [Multi-AZ deployments](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html#Concepts.MultiAZ)

### How it works

1. Multi-AZ keeps a standby copy in another Availability Zone.
2. If the primary fails, RDS fails over to the standby.
3. Read replicas copy the data so applications can send reads to them.

### Exam cues

- If the question says high availability for RDS, think Multi-AZ.
- If the question says too many reads, think read replicas.

### Remember

- Multi-AZ: availability. Read replicas: read scaling.

> **Trap:** Multi-AZ is for availability, not performance.
