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
  - id: subnet-group-azs
    text: "An RDS DB instance needs a VPC with subnets in at least two Availability Zones, even for Single-AZ, so a standby can be created later."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html
  - id: cluster-failover-time
    text: "Multi-AZ DB cluster failover typically completes in under 35 seconds, once both readers have applied the outstanding transactions of the failed writer."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts-failover.html
  - id: subnet-group-placement
    text: "An RDS DB subnet group lists eligible VPC subnets; RDS selects a subnet and an IP address from that group when placing a DB instance."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html#USER_VPC.Subnets
  - id: cluster-instance-endpoint
    text: "An RDS Multi-AZ DB cluster instance endpoint addresses one DB instance; writer and reader endpoints are better suited to connections that must follow failover."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts-connection-management.html#multi-az-db-clusters-concepts-connection-management-endpoints-ha
  - id: cluster-engines
    text: "The database engines available for an RDS Multi-AZ DB cluster are MySQL and PostgreSQL."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/create-multi-az-db-cluster.html
  - id: cluster-endpoint-roles
    text: "For an RDS Multi-AZ DB cluster, the cluster endpoint connects to the writer for reads and writes, while the reader endpoint sends read-only connections to reader instances."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts-connection-management.html#multi-az-db-clusters-concepts-connection-management-endpoint-types
  - id: primary-storage-failure
    text: "Failure of the storage underlying an RDS Multi-AZ DB instance primary can trigger automatic failover."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.Failover.html#Concepts.MultiAZ.Failover
  - id: multi-az-cost
    text: "An RDS Multi-AZ DB instance deployment costs more than Single-AZ because the standby adds instance and storage resources."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_OnDemandDBInstances.html#USER_OnDemandDBInstances.MultiAZ
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
  - id: rds-079
    q: "An RDS for PostgreSQL workload needs faster failover than the 60 to 120 seconds of a Multi-AZ DB instance, plus readable standbys. Which RDS deployment fits?"
    a: "A **Multi-AZ DB cluster**: a writer and two readable replicas in three AZs. Failover is typically **under 35 seconds**."
    facts: [cluster-failover-time, failover-duration, cluster-topology]
  - id: rds-088
    q: "When creating an Amazon RDS DB instance in a VPC, what controls which subnets RDS can choose for placement?"
    a: "The DB subnet group. It lists eligible VPC subnets from which RDS selects a subnet and IP address."
    facts: [subnet-group-placement]
  - id: rds-092
    q: "An Amazon RDS Multi-AZ DB cluster application uses an individual instance endpoint for writes. Which endpoint better supports reconnecting after writer failover?"
    a: "The cluster writer endpoint. It tracks the current writer; an instance endpoint identifies a particular DB instance."
    facts: [cluster-instance-endpoint]
  - id: rds-093
    q: "A team choosing Amazon RDS needs a Multi-AZ DB cluster with readable replicas. Which database engines can it select?"
    a: "MySQL or PostgreSQL. RDS Multi-AZ DB clusters support these two engines."
    facts: [cluster-engines]
  - id: rds-094
    q: "An Amazon RDS Multi-AZ DB cluster serves order updates and read-only reports. Which endpoints should the application use?"
    a: "The cluster writer endpoint for updates and the reader endpoint for reports. The reader endpoint creates read-only connections to reader instances."
    facts: [cluster-endpoint-roles]
  - id: rds-115
    q: "What happens if storage under an Amazon RDS Multi-AZ primary DB instance fails?"
    a: "RDS can automatically fail over to the standby."
    facts: [primary-storage-failure]
  - id: rds-117
    q: "Why does an Amazon RDS Multi-AZ DB instance deployment cost more than Single-AZ?"
    a: "The standby adds instance and storage resources."
    facts: [multi-az-cost]
---

Multi-AZ keeps database copies in separate Availability Zones (AZs), which are isolated locations within an AWS Region. It lets RDS move database service to another AZ after an infrastructure failure. The RDS deployment models differ in whether their standby copies can serve reads.

### How it works

1. For a Multi-AZ DB instance, RDS maintains a synchronous standby: changes are copied as part of committing writes. The standby is in another AZ and does not accept application reads.
2. A Multi-AZ DB cluster supports MySQL or PostgreSQL and has a writer and two readable replicas across three AZs. It uses semisynchronous replication, where a replica acknowledges receipt before all replicas have applied the change.
3. If a Multi-AZ DB instance suffers a qualifying outage, RDS promotes the standby and updates the database endpoint's DNS record. DNS maps the endpoint name to an address. Clients must resolve the endpoint and reconnect.
4. To add availability to an existing Single-AZ instance, modify it to enable Multi-AZ. RDS initializes standby storage from a snapshot and enables synchronous replication. Allow for write-performance impact.
5. Choose a DB subnet group to define the eligible VPC subnets for placement. RDS selects a subnet and an IP address from the group.
6. For a Multi-AZ DB cluster, connect writes to the cluster writer endpoint and read-only work to the reader endpoint. These endpoints handle failover better than an endpoint tied to one DB instance.

### Exam cues

- If the question says compare RDS Single-AZ and Multi-AZ costs, think added standby resources, because Multi-AZ includes another instance and its storage.
- If the question says storage under an RDS Multi-AZ primary fails, think automatic failover, because storage failure is a failover condition.
- If the question says automatic recovery from an AZ failure, think Multi-AZ, because RDS manages a copy in another AZ and the failover.
- If the question says reporting reads from a standby, think a Multi-AZ DB cluster or read replica, because the single standby of a Multi-AZ DB instance does not serve reads.
- If the question says Java clients cannot reconnect after failover, think DNS cache settings, because an old cached address can hide the endpoint change.

### Remember

- Multi-AZ DB instance: one standby. Multi-AZ DB cluster: two readable replicas across three AZs.
- DB instance failover typically takes 60 to 120 seconds; large transactions can extend it.
- AWS recommends a Java DNS cache time-to-live of no more than 60 seconds.
- RDS for Oracle does not support Oracle Real Application Clusters (RAC). Use Multi-AZ for managed availability.

> **Trap:** A readable replica and a single Multi-AZ standby have different roles. The single standby provides failover without serving application reads.
