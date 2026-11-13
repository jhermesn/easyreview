---
title: Replication and staging
level: associate
order: 10
facts:
  - id: scope
    text: Elastic Disaster Recovery recovers on-premises and cloud-based applications running on supported server operating systems.
    source: https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html
  - id: agent
    text: The AWS Replication Agent continuously copies disk block changes from source servers to a target staging area.
    source: https://docs.aws.amazon.com/drs/latest/userguide/CloudEndure-Concepts.html
  - id: staging
    text: The staging area subnet is in a selected AWS account and Region and uses storage and minimal compute for ongoing replication.
    source: https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html
  - id: volumes
    text: Replication servers write received blocks to attached EBS volumes.
    source: https://docs.aws.amazon.com/drs/latest/userguide/CloudEndure-Concepts.html
  - id: conversion
    text: Recovery orchestration creates volumes from replicated data and converts non-AWS servers to boot natively on EC2.
    source: https://docs.aws.amazon.com/drs/latest/userguide/CloudEndure-Concepts.html
  - id: rpo
    text: RPO measures how recent the last crash-consistent replicated data is; seconds-level RPO depends on sufficient network and staging throughput.
    source: https://docs.aws.amazon.com/drs/latest/userguide/CloudEndure-Concepts.html
  - id: memory
    text: Application data held only in memory is not replicated until written to source volumes.
    source: https://docs.aws.amazon.com/drs/latest/userguide/CloudEndure-Concepts.html
  - id: rto
    text: RTO is the time to recover service; DRS recovery timing depends on OS boot, applications, instance performance, and volume performance.
    source: https://docs.aws.amazon.com/drs/latest/userguide/CloudEndure-Concepts.html
  - id: minutes
    text: DRS can launch recovery instances in minutes using recent server state or a previous point in time.
    source: https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html
  - id: ports
    text: DRS uses TCP 1500 from source servers to replication servers for data transfer and TCP 443 for service communication.
    source: https://docs.aws.amazon.com/drs/latest/userguide/Network-Requirements.html
  - id: pit
    text: DRS point-in-time recovery uses crash-consistent EBS snapshots of replicated source volumes.
    source: https://docs.aws.amazon.com/drs/latest/userguide/CloudEndure-Concepts.html
  - id: minute-policy
    text: The fixed minute snapshot policy retains a recovery point every 10 minutes for the prior hour.
    source: https://docs.aws.amazon.com/drs/latest/userguide/point-in-time.html
  - id: hour-policy
    text: The fixed hourly snapshot policy retains hourly recovery points for the prior 24 hours.
    source: https://docs.aws.amazon.com/drs/latest/userguide/point-in-time.html
  - id: day-policy
    text: Daily point-in-time snapshot retention is configurable from 1 to 365 days.
    source: https://docs.aws.amazon.com/drs/latest/userguide/point-in-time.html
  - id: subnet
    text: Drill and recovery instances use the subnet specified in the EC2 launch template associated with their source server.
    source: https://docs.aws.amazon.com/drs/latest/userguide/Network-Settings-Preparations.html
  - id: lag
    text: Persistent replication lag can indicate insufficient network bandwidth and needs investigation.
    source: https://docs.aws.amazon.com/drs/latest/userguide/best_practices_drs.html
diagrams:
  - id: drs-replication
    title: Source disk changes reach staging storage
    width: 800
    height: 180
    nodes:
      - id: source
        label: Source server
        icon: res-server
        tone: compute
        x: 30
        y: 45
        w: 200
        h: 86
      - id: replica
        label: Replication
        icon: elastic-disaster-recovery
        tone: storage
        x: 300
        y: 45
        w: 200
        h: 86
      - id: volumes
        label: Staging volumes
        icon: res-elastic-block-store-volume
        tone: storage
        x: 570
        y: 45
        w: 200
        h: 86
    edges:
      - from: source
        to: replica
        step: 1
      - from: replica
        to: volumes
        step: 2
    steps:
      - The agent transfers disk changes to replication servers in the staging subnet.
      - Replication servers write the received blocks to attached EBS volumes.
cards:
  - id: elastic-disaster-recovery-001
    q: When does AWS Elastic Disaster Recovery fit a recovery requirement?
    a: When supported servers need continuous replication to AWS and recovery onto EC2. The staging area maintains replicated data with minimal compute.
    facts:
      - scope
      - agent
      - staging
      - conversion
  - id: elastic-disaster-recovery-002
    q: On-premises servers need seconds-level data recovery points with limited compute running at the recovery site. Which AWS service fits?
    a: Elastic Disaster Recovery. It continuously replicates disk blocks to a staging area and can launch recovery instances in minutes. Network and staging throughput must keep up with writes.
    facts:
      - agent
      - staging
      - minutes
      - rpo
  - id: elastic-disaster-recovery-003
    q: How does AWS Elastic Disaster Recovery turn replicated server disks into running recovery instances?
    a: The agent copies disk changes to staging EBS volumes. Recovery orchestration creates recovery volumes, converts non-AWS servers, and boots EC2 instances.
    facts:
      - agent
      - volumes
      - conversion
  - id: elastic-disaster-recovery-006
    q: A source server protected by AWS DRS writes faster than its available replication bandwidth. What happens to its recovery point?
    a: It becomes older as replication falls behind. Seconds-level RPO requires enough network and staging throughput to keep up with source writes.
    facts:
      - rpo
      - lag
  - id: elastic-disaster-recovery-007
    q: Does AWS Elastic Disaster Recovery preserve database updates that exist only in RAM when a server fails?
    a: No. DRS replicates disk blocks. Data must reach the source volumes before it can be replicated.
    trap: true
    facts:
      - memory
  - id: elastic-disaster-recovery-008
    q: Which AWS Elastic Disaster Recovery point-in-time retention setting is adjustable?
    a: Daily retention, from 1 to 365 days. The minute and hourly snapshot schedules are fixed.
    facts:
      - day-policy
      - minute-policy
      - hour-policy
---
AWS Elastic Disaster Recovery (DRS) keeps copies of supported servers' disk data in AWS so they can be recovered onto EC2. Its staging area stores replicated data with minimal compute while the source application continues running.

### How it works

1. Install the AWS Replication Agent on each supported source server. It copies disk block changes, meaning changes to portions of a disk, continuously toward AWS.
2. Replication servers in the staging area subnet write those changes to EBS volumes, the disks attached to EC2 instances. Allow TCP 1500 for replication data and TCP 443 for service communication.
3. Maintain point-in-time recovery points, crash-consistent snapshots that preserve data written to disk. Data still held only in memory is absent.
4. For a drill or recovery, DRS creates recovery volumes and converts non-AWS servers to boot on EC2. The source server's launch template selects the recovery subnet.

### Exam cues

- If the question says replicate supported on-premises servers to AWS with minimal standing compute, think DRS staging, because it maintains replicated storage before launching recovery instances.
- If the question says replication falls behind after write traffic rises, think bandwidth and staging throughput, because replication must keep up with source disk writes.
- If the question says recover an earlier server state, think point-in-time snapshots, because recovery can use an earlier disk recovery point.

### Remember

- RPO, the recovery point objective, measures how much recent data may be missing. Seconds-level recovery points depend on replication capacity.
- RTO, the recovery time objective, concerns recovery time. DRS can launch in minutes; OS boot, applications, and target performance affect timing.
- The fixed schedules retain points every 10 minutes for the prior hour and hourly for the prior 24 hours.
- Daily snapshot retention can be set from 1 to 365 days.

> **Trap:** Successful disk replication does not preserve memory-only application state. A crash-consistent recovery point contains data written to the replicated volumes.
