---
title: Multi-AZ and failover tests
level: associate
order: 10
facts:
  - id: instance-standby
    text: A Multi-AZ DB instance synchronously copies changes to a standby in another Availability Zone.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html#Concepts.MultiAZSingleStandby
  - id: standby-no-reads
    text: The standby of a Multi-AZ DB instance cannot serve application reads.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html#Concepts.MultiAZSingleStandby
  - id: cluster-topology
    text: A Multi-AZ DB cluster has a writer and two readable replicas in three Availability Zones in
      one Region.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html#multi-az-db-clusters-concepts
  - id: cluster-replication
    text: A Multi-AZ DB cluster uses semisynchronous replication.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html#multi-az-db-clusters-concepts
  - id: automatic-failover
    text: RDS automatically fails over a Multi-AZ DB instance to its standby after qualifying
      infrastructure outages.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.Failover.html#Concepts.MultiAZ.Failover
  - id: endpoint-reconnect
    text: Multi-AZ DB instance failover changes the endpoint DNS record to the standby and requires
      clients to re-establish connections.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.Failover.html
  - id: failover-duration
    text: Multi-AZ DB instance failover typically takes 60 to 120 seconds and can take longer with large
      transactions or recovery.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.Failover.html#Concepts.MultiAZ.Failover
  - id: jvm-dns
    text: AWS recommends a Java DNS cache time-to-live no greater than 60 seconds for RDS failover.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.Failover.html#Concepts.MultiAZ.Failover.Java-DNS
  - id: instance-test
    text: Reboot with failover tests a Multi-AZ DB instance by switching to its standby; AWS recommends
      stopping transactions before this abrupt interruption.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RebootInstance.html#USER_RebootInstance
  - id: cluster-test
    text: A Multi-AZ DB cluster supports a manual failover through FailoverDBCluster or
      failover-db-cluster.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts-failover.html#multi-az-db-clusters-concepts-failover-manual
  - id: convert-instance
    text: An existing Single-AZ DB instance can be modified to Multi-AZ by adding a standby in another
      Availability Zone.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.Migrating.html#Concepts.MultiAZ.Migrating
  - id: conversion-io
    text: Single-AZ to Multi-AZ conversion creates standby volumes from a snapshot and enables
      synchronous replication; write performance can be affected.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.Migrating.html#Concepts.MultiAZ.Migrating
  - id: oracle-rac
    text: Amazon RDS for Oracle does not support Oracle Real Application Clusters (RAC); AWS directs
      high-availability workloads to Multi-AZ.
    source: https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Source.Oracle.ToRDSOracle.html
diagrams:
  - id: rds-instance-multi-az
    title: Multi-AZ DB instance connection and replication paths
    width: 900
    height: 230
    nodes:
      - id: app
        label: Application
        sub: connect by endpoint
        icon: res-client
        tone: user
        x: 30
        y: 85
        w: 220
        h: 86
      - id: primary
        label: Primary
        sub: "AZ A: reads and writes"
        icon: rds
        tone: database
        x: 340
        y: 85
        w: 220
        h: 86
      - id: standby
        label: Standby
        sub: "AZ B: no client reads"
        icon: rds
        tone: database
        x: 650
        y: 85
        w: 220
        h: 86
    edges:
      - from: app
        to: primary
        step: 1
        label: SQL
      - from: primary
        to: standby
        step: 2
        label: synchronous
    steps:
      - The application connects to the primary through its database endpoint.
      - RDS copies changes synchronously to the standby; after failover, the endpoint points to this
        standby and clients reconnect.
cards:
  - id: rds-003
    q: An RDS application needs automatic recovery if its database Availability Zone fails. Which
      deployment should the team choose?
    a: A Multi-AZ DB instance. RDS maintains a synchronous standby in another Availability Zone and
      automatically fails over after qualifying outages.
    facts:
      - instance-standby
      - automatic-failover
  - id: rds-004
    q: Can the standby of an RDS Multi-AZ DB instance serve reporting queries?
    a: No. Use a read replica or a Multi-AZ DB cluster with readable replicas. The single standby is
      reserved for failover.
    trap: true
    facts:
      - standby-no-reads
      - cluster-topology
  - id: rds-005
    q: An RDS Multi-AZ DB instance has failed over, but the application still uses an old connection.
      What must the application do?
    a: Resolve the database endpoint again and reconnect. RDS updates its DNS record, but existing
      connections must be re-established.
    facts:
      - endpoint-reconnect
  - id: rds-006
    q: How should a team deliberately test failover for an RDS Multi-AZ DB instance versus an RDS
      Multi-AZ DB cluster?
    a: Use Reboot with failover for the DB instance. Use FailoverDBCluster for the DB cluster. Stop
      transactions before the abrupt instance failover.
    facts:
      - instance-test
      - cluster-test
  - id: rds-015
    q: Must a team recreate an existing Single-AZ RDS DB instance to obtain a Multi-AZ standby?
    a: No. Modify the existing instance to enable Multi-AZ. Plan for possible write-performance impact
      while the standby is initialized.
    facts:
      - convert-instance
      - conversion-io
  - id: rds-016
    q: An RDS for Oracle migration requires Oracle RAC for availability. Is that feature supported?
    a: No. RDS for Oracle does not support Oracle RAC. Use RDS Multi-AZ for the managed standby and
      failover requirement.
    trap: true
    facts:
      - oracle-rac
---

Multi-AZ keeps database copies in separate Availability Zones (AZs), which are isolated locations within an AWS Region. It lets RDS move database service to another AZ after an infrastructure failure. The [RDS deployment models](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html#Concepts.MultiAZ) differ in whether their standby copies can serve reads.

### How it works

1. For a Multi-AZ DB instance, RDS maintains a synchronous standby: changes are copied as part of committing writes. The standby is in another AZ and does not accept application reads.
2. A Multi-AZ DB cluster has a writer and two readable replicas across three AZs. It uses semisynchronous replication, where a replica acknowledges receipt before all replicas have applied the change.
3. If a Multi-AZ DB instance suffers a qualifying outage, RDS promotes the standby and updates the database endpoint's DNS record. DNS maps the endpoint name to an address. Clients must resolve the endpoint and reconnect.
4. Test an instance with **Reboot with failover**. Test a Multi-AZ DB cluster with **FailoverDBCluster**. Stop transactions before the abrupt instance failover.
5. To add availability to an existing Single-AZ instance, modify it to enable Multi-AZ. RDS initializes standby storage from a snapshot and enables synchronous replication. Allow for write-performance impact.

### Exam cues

- If the question says automatic recovery from an AZ failure, think Multi-AZ, because RDS manages a copy in another AZ and the failover.
- If the question says reporting reads from a standby, think a Multi-AZ DB cluster or read replica, because the single standby of a Multi-AZ DB instance does not serve reads.
- If the question says Java clients cannot reconnect after failover, think DNS cache settings, because an old cached address can hide the endpoint change.

### Remember

- Multi-AZ DB instance: one standby. Multi-AZ DB cluster: two readable replicas across three AZs.
- DB instance failover typically takes 60 to 120 seconds; large transactions can extend it.
- AWS recommends a Java DNS cache time-to-live of no more than 60 seconds.
- RDS for Oracle does not support Oracle Real Application Clusters (RAC). Use Multi-AZ for managed availability.

> **Trap:** A readable replica and a single Multi-AZ standby have different roles. The single standby provides failover without serving application reads.
