---
title: Read replicas and Regional recovery
level: professional
order: 20
facts:
  - id: async-reads
    text: RDS read replicas use asynchronous engine replication to offload supported read workloads from
      the source.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl
  - id: replica-lag
    text: Asynchronous RDS replication can return stale data; ReplicaLag measures delay behind the
      source in seconds for supported engines.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html#rds-cw-metrics-instance
  - id: manual-count
    text: RDS DB instance read replicas must be created and removed manually rather than automatically
      scaled with read demand.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl
  - id: backup-prerequisite
    text: The source of an RDS read replica must have backup retention enabled.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/API_CreateDBInstanceReadReplica.html
  - id: regional-copy
    text: Supported RDS DB instance read replicas can reside in a different Region from the source.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html#USER_ReadRepl.XRgn
  - id: promote
    text: Promoting an RDS read replica makes it a standalone DB instance and stops its replication
      relationship with the source.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.Promote.html#USER_ReadRepl.Promote
  - id: recovery-steps
    text: For recovery using a read replica, promote it, redirect database traffic to it, and create a
      replacement replica.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.Promote.html#USER_ReadRepl.Promote
  - id: promotion-reboot
    text: Read replica promotion reboots the instance and can take several minutes or longer.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.Promote.html#USER_ReadRepl.Promote
  - id: replica-multi-az
    text: A supported RDS read replica can have its own Multi-AZ standby regardless of the source
      deployment type.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/API_CreateDBInstanceReadReplica.html#API_CreateDBInstanceReadReplica_RequestParameters
  - id: local-transfer
    text: RDS does not charge for replication data transfer to a read replica within the same Region.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl
  - id: regional-transfer
    text: Cross-Region read replica transfer charges apply to the initial snapshot and ongoing changes
      leaving the source Region.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html#USER_ReadRepl.XRgn.Costs
  - id: replica-compute
    text: RDS read replicas are billed as standard DB instances for their instance class.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl
  - id: mysql-packet
    text: RDS for MySQL replication can stop if the replica's max_allowed_packet is smaller than the
      source's; use matching values in their parameter groups to resolve this error.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.Troubleshooting.html#USER_ReadRepl.Troubleshooting
diagrams:
  - id: rds-regional-replica-promotion
    title: Cross-Region replica before and after promotion
    width: 900
    height: 230
    nodes:
      - id: source
        label: Source database
        sub: Region A
        icon: rds
        tone: database
        x: 30
        y: 85
        w: 220
        h: 86
      - id: replica
        label: Read replica
        sub: "Region B: before recovery"
        icon: rds
        tone: database
        x: 340
        y: 85
        w: 220
        h: 86
      - id: writer
        label: Standalone DB
        sub: "Region B: after promotion"
        icon: rds
        tone: database
        x: 650
        y: 85
        w: 220
        h: 86
    edges:
      - from: source
        to: replica
        step: 1
      - from: replica
        to: writer
        step: 2
    steps:
      - Changes flow from the source to the cross-Region replica and can lag.
      - Promotion reboots the replica and ends source replication; redirect application traffic to
        the standalone database.
cards:
  - id: rds-008
    q: How do RDS DB instance read replicas scale reads, and what happens when one is promoted?
    a: They receive changes asynchronously and can return stale data. Add or remove replicas manually.
      Promotion creates a standalone database and ends replication from the source.
    facts:
      - async-reads
      - replica-lag
      - manual-count
      - promote
  - id: rds-009
    q: An RDS source Region is unavailable and a cross-Region read replica exists. What recovery steps
      and costs should the team expect?
    a: Promote the replica, redirect database traffic, and establish a replacement replica. Asynchronous
      replication can leave recent writes missing. Cross-Region snapshot and change transfer incur
      charges.
    facts:
      - regional-copy
      - recovery-steps
      - replica-lag
      - regional-transfer
  - id: rds-017
    q: An RDS reporting replica must survive an Availability Zone failure without promoting it away from
      its source. What should the team configure?
    a: A Multi-AZ deployment for the supported read replica. Its own standby provides failover support
      independently of the source deployment.
    facts:
      - replica-multi-az
  - id: rds-018
    q: How does RDS read-replica replication pricing differ within one Region and across Regions?
    a: Same-Region replication transfer has no charge. Cross-Region transfer of the initial snapshot and
      ongoing changes is billed. Replica instance charges still apply.
    facts:
      - local-transfer
      - regional-transfer
      - replica-compute
  - id: rds-019
    q: An RDS team has disabled automated backups on a source DB instance and wants a read replica. What
      must change first?
    a: Enable backup retention on the source. The read-replica creation API requires it.
    facts:
      - backup-prerequisite
  - id: rds-020
    q: Does promoting an RDS read replica provide an instant, reversible role change?
    a: No. Promotion reboots the replica and ends its replication relationship with the source. Plan
      traffic redirection and a replacement replica.
    trap: true
    facts:
      - promotion-reboot
      - promote
      - recovery-steps
  - id: rds-039
    q: An RDS for MySQL read replica stops with a packet larger than max_allowed_packet error. What should the team change?
    a: Match the max_allowed_packet values in the source and replica DB parameter groups.
    facts:
      - mysql-packet
---

A read replica is a database copy used to move read queries away from an RDS source. Supported replicas can also provide a recovery copy in another Region. The [RDS read-replica guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl) explains that replication is asynchronous: the source can commit a write before the replica receives it.

### How it works

1. Enable backup retention on the source, then create a supported read replica. RDS initializes the copy and uses the engine's replication mechanism to send changes.
2. Send reporting or other supported read workloads to the replica. Watch `ReplicaLag`, the delay in seconds behind the source; recent writes might not yet be visible.
3. For Regional recovery, create the replica in another Region before an outage. A supported replica can also have its own Multi-AZ standby, independent of the source's configuration.
4. When recovery requires a new writable database, promote the replica. RDS reboots it and ends replication from the old source. Redirect the application and create a replacement replica.
5. For a MySQL replica stopped by a packet size error, match `max_allowed_packet` in the source and replica parameter groups.

### Exam cues

- If the question says reporting queries overload the source, think read replicas, because they move read work to separate database instances.
- If the question says recover in another Region with a running database copy, think cross-Region read replica promotion, because the replica can become standalone. Account for recent writes that have not replicated.
- If the question says the reporting replica also needs AZ failover, think Multi-AZ for that replica, because it can have its own standby.
- If RDS for MySQL replication stops on a packet size error, compare `max_allowed_packet` on source and replica.

### Remember

- Add and remove RDS DB instance read replicas manually; their count does not autoscale with read demand.
- Promotion can take several minutes or longer and stops replication from the source.
- Same-Region replication transfer is free. Cross-Region initial snapshot transfer and ongoing change transfer are billed.
- Replica instances have their own standard DB instance charges.

> **Trap:** A cross-Region read replica is not a guarantee that every committed write survives a source outage. Asynchronous replication can leave the recovery copy behind.
