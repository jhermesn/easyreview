---
title: "RDS availability and scaling basics"
level: foundational
order: 5
revised:
  - date: 2026-11-22
    note: Multi-AZ DB clusters have readable standby instances as well as failover support.
    cards: []
facts:
  - id: multi-az-basic
    text: "An RDS Multi-AZ deployment keeps a standby DB instance in another Availability Zone for failover; in the one-standby form the standby does not serve reads."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html#Concepts.MultiAZ
  - id: read-replica-basic
    text: "An RDS read replica is a read-only copy of a DB instance that takes read queries off the primary for read-heavy workloads."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl
  - id: cluster-readers
    text: "An RDS Multi-AZ DB cluster has a writer and two reader instances in separate Availability Zones; readers serve queries and are failover targets."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html
  - id: resource-events
    text: "RDS event notifications report events in categories associated with RDS resources."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Events.overview.html
  - id: cluster-console
    text: "A Multi-AZ DB cluster can be created in the Amazon RDS console."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/create-multi-az-db-cluster.html#create-multi-az-db-cluster
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
  - id: rds-109
    q: "Which Amazon RDS Multi-AZ deployment serves reads from its standby instances?"
    a: "A Multi-AZ DB cluster has two reader instances that serve reads and can become the writer."
    facts: [cluster-readers]
  - id: rds-118
    q: "What do Amazon RDS event notifications report?"
    a: "Events in categories associated with RDS resources."
    facts: [resource-events]
  - id: rds-121
    q: "Can an Amazon RDS Multi-AZ DB cluster be created in the AWS Management Console?"
    a: "Yes. Choose Multi-AZ DB cluster when creating a database in the RDS console."
    facts: [cluster-console]
---
Amazon RDS improves availability with Multi-AZ standbys and scales reads with read replicas.

### How it works

1. Multi-AZ keeps a standby copy in another Availability Zone.
2. If the primary fails, RDS fails over to the standby.
3. Read replicas copy the data so applications can send reads to them.

### Exam cues

- If the question says create a Multi-AZ RDS DB cluster interactively, think the RDS console, because it supports creating the cluster.
- If the question says monitor RDS resource events, think RDS event notifications, because they publish events in resource categories.
- If the question says an RDS Multi-AZ deployment must serve reads from its standby capacity, think a Multi-AZ DB cluster, because its two readers serve reads and support failover.
- If the question says high availability for RDS, think Multi-AZ.
- If the question says too many reads, think read replicas.

### Remember

- Multi-AZ: availability. Read replicas: read scaling.

> **Trap:** In a Multi-AZ DB instance deployment, the standby takes no read traffic. In a Multi-AZ DB cluster, the reader instances do.
