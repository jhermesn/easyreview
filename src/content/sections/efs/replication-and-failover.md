---
title: Replication and failover
level: professional
order: 30
facts:
  - id: replica-scope
    text: EFS replication copies file data and metadata to a destination file system in the selected
      Region.
    source: https://docs.aws.amazon.com/efs/latest/ug/efs-replication.html#efs-replication
  - id: replica-new-existing
    text: Replication supports a new destination or an existing destination, including an existing
      destination in a different account.
    source: https://docs.aws.amazon.com/efs/latest/ug/replicate-existing-destination.html#replicate-existing-destination
  - id: replica-async
    text: Replication transfers changes asynchronously relative to application writes; Last synced
      identifies the point through which source changes reached the destination.
    source: https://docs.aws.amazon.com/efs/latest/ug/efs-replication.html#efs-replication
  - id: replica-initial
    text: Replica data is accessible only after initial synchronization completes, whose duration
      depends on source size and file count.
    source: https://docs.aws.amazon.com/efs/latest/ug/efs-replication.html#efs-replication-performance
  - id: replica-rpo
    text: After initial synchronization, EFS maintains an RPO of 15 minutes for most file systems;
      frequently changing sources with over 100 million files or files larger than 100 GB may take
      longer.
    source: https://docs.aws.amazon.com/efs/latest/ug/efs-replication.html#efs-replication-performance
  - id: replica-metric
    text: TimeSinceLastSync is the EFS CloudWatch metric for monitoring time since the last successful
      replication synchronization.
    source: https://docs.aws.amazon.com/efs/latest/ug/efs-replication.html#efs-replication-performance
  - id: replica-readonly
    text: A destination in REPLICATING state is read-only to clients and modified only by EFS
      replication.
    source: https://docs.aws.amazon.com/efs/latest/ug/replicate-existing-destination.html#replicate-existing-destination
  - id: overwrite-protection
    text: Replication overwrite protection is enabled by default; disable it before using an existing
      file system as a replication destination.
    source: https://docs.aws.amazon.com/efs/latest/ug/replicate-existing-destination.html#replicate-existing-destination
  - id: replica-overwrites
    text: Replication to an existing destination applies source differences to that destination, so its
      contents are updated to match the source.
    source: https://docs.aws.amazon.com/efs/latest/ug/replicate-existing-destination.html#replicate-existing-destination
  - id: replica-promote
    text: Deleting the replication configuration makes the replica writable so the application can use
      it after failover.
    source: https://docs.aws.amazon.com/efs/latest/ug/replication-fail-over.html#replication-fail-over
  - id: failback-preserve
    text: To preserve writes made during failover, replicate from the former replica back to the
      original primary before restoring the original direction.
    source: https://docs.aws.amazon.com/efs/latest/ug/replication-fail-over.html#replication-fail-over
  - id: failback-discard
    text: Recreating the original primary-to-replica configuration overwrites replica changes to match
      the primary, discarding failover changes.
    source: https://docs.aws.amazon.com/efs/latest/ug/replication-fail-over.html#replication-fail-over
  - id: cross-account-role
    text: Cross-account replication requires a supplied IAM role and cannot use the EFS service-linked
      role; passing a role requires iam:PassRole.
    source: https://docs.aws.amazon.com/efs/latest/ug/efs-replication.html#efs-replication-permissions
cards:
  - id: efs-004
    q: How should a team maintain an EFS disaster-recovery copy in another Region and monitor lag?
    a: Configure EFS replication and monitor TimeSinceLastSync. After initial synchronization, the RPO
      is 15 minutes for most file systems, with documented exceptions. The destination is read-only
      during replication.
    facts:
      - replica-scope
      - replica-rpo
      - replica-metric
      - replica-readonly
  - id: efs-005
    q: How does a team fail over to an EFS replica and preserve its new writes during failback?
    a: Delete the replication configuration to make the replica writable, then direct the application to
      it. To preserve recovery-site writes, replicate back to the original primary before restoring
      the original direction.
    facts:
      - replica-promote
      - failback-preserve
  - id: efs-018
    q: An EFS replication destination already exists and rejects its use as a replica. Which protection
      should the team inspect?
    a: Replication overwrite protection. It is enabled by default and must be disabled before using an
      existing destination.
    facts:
      - overwrite-protection
  - id: efs-019
    q: After EFS failover, a team recreates the original primary-to-replica configuration without
      copying back recovery-site writes. What happens to those writes?
    a: They are discarded as the replica is synchronized to match the original primary. Reverse
      replication first when those writes must be preserved.
    trap: true
    facts:
      - failback-discard
      - failback-preserve
  - id: efs-020
    q: An EFS replication configuration spans AWS accounts. Can the team rely on the EFS service-linked
      role?
    a: No. It must supply an IAM role for cross-account replication, and the configuring identity needs
      iam:PassRole.
    trap: true
    facts:
      - cross-account-role
  - id: efs-021
    q: A team expects immediate access to a new EFS replica with a strict 15-minute lag guarantee for
      every workload. Which assumptions need correction?
    a: Data is accessible only after initial synchronization. Afterwards, the 15-minute RPO applies to
      most file systems; large, frequently changing sources can take longer.
    facts:
      - replica-initial
      - replica-rpo
diagrams:
  - id: efs-replication-promotion
    title: Replicate, promote, then redirect clients
    width: 1000
    height: 230
    nodes:
      - id: primary
        label: Primary EFS
        icon: efs
        tone: storage
        x: 25
        y: 85
        w: 230
        h: 72
      - id: replica
        label: Replica EFS
        icon: efs
        tone: storage
        x: 365
        y: 85
        w: 230
        h: 72
      - id: client
        label: Recovery client
        icon: res-ec2-instance
        tone: compute
        x: 705
        y: 85
        w: 230
        h: 72
    edges:
      - from: primary
        to: replica
        step: 1
        label: replicate
      - from: replica
        to: client
        step: 2
        label: use replica
    steps:
      - EFS copies source data and metadata to the destination; the destination stays read-only
        while replication is configured.
      - Delete the replication configuration to make the destination writable, then direct the
        recovery application to it.
---

EFS replication maintains a recovery file system by copying source files and metadata, information such as file ownership and directory structure. Recovery Point Objective (RPO) describes how far behind the source a recovery copy may be. Replication is asynchronous, so source writes can be newer than the replica.

### How it works

1. Choose a new or existing destination in the selected Region. Before reusing an existing file system, disable its default replication overwrite protection and plan for its contents to be updated to match the source.
2. Wait for initial synchronization. Replica data becomes accessible after it finishes, and duration depends on size and file count.
3. Monitor `TimeSinceLastSync` and the last synced time. The destination remains read-only to clients while replication is configured.
4. For failover, delete the replication configuration. The replica becomes writable; direct the recovery application to it.
5. For failback, decide whether to keep writes made at the recovery site. Replicate those changes back before restoring the original direction if they must survive.

| Recovery choice | Action | Result |
|---|---|---|
| Fail over | Delete replication configuration | Replica becomes writable |
| Preserve recovery-site changes | Replicate former replica back to primary | Primary receives the changes |
| Discard recovery-site changes | Recreate primary-to-replica configuration | Replica is updated to match primary |

### Exam cues

- If the question says a shared file system needs a recovery copy in another Region, think EFS replication, because it copies file data and metadata to the selected destination.
- If the question says the recovery copy rejects writes, think delete the replication configuration for failover, because an active replication destination is read-only.
- If the question says preserve writes made during failover, think reverse replication before restoring the original direction, because primary-to-replica synchronization discards divergent replica changes.

### Remember

- RPO after initial sync: 15 minutes for most file systems, not an unconditional maximum.
- Frequently changing sources with more than 100 million files or files larger than 100 GB may take longer.
- Monitor `TimeSinceLastSync`; source changes after the last synced time might not have reached the replica.
- Cross-account replication needs a supplied IAM role. The configuring identity needs `iam:PassRole`.

> **Trap:** Failback direction determines which changes survive. Recreating the original replication direction can discard the writes made at the recovery site.
