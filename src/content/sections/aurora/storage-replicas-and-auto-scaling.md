---
title: Storage, replicas, and auto scaling
level: associate
order: 10
facts:
  - id: cluster
    text: An Aurora cluster has one writer instance using a shared cluster volume.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.html#Aurora.Overview
  - id: reader-limit
    text: An Aurora cluster supports up to 15 reader instances that share the writer cluster volume.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.html#Aurora.Overview
  - id: storage
    text: Aurora stores six copies of cluster data across three Availability Zones, independent of the number of database instances.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless.storage
  - id: compute
    text: Adding an Aurora instance connects it to the existing cluster volume without making a new copy of the table data.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html#aurora-storage-contents
  - id: growth
    text: Aurora cluster storage automatically grows as data increases; maximum size and resizing behavior depend on engine version.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html#aurora-storage-growth
  - id: readers
    text: Aurora Replicas serve reads and can be promoted when the writer fails; placing instances in different Availability Zones improves instance availability.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html#Concepts.AuroraHighAvailability.Instances
  - id: writer-endpoint
    text: The cluster endpoint follows the current writer and supports reconnection after failover.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.Endpoints.html#Aurora.Overview.Endpoints.HA
  - id: reader-endpoint
    text: The reader endpoint balances new connections among available Aurora Replicas, not individual queries within a connection.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Endpoints.Reader.html#Aurora.Endpoints.Reader
  - id: no-reader
    text: With no Aurora Replicas, the reader endpoint connects to the writer and can accept writes.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Endpoints.Reader.html#Aurora.Endpoints.Reader
  - id: autoscaling
    text: Aurora Auto Scaling uses target tracking to add and remove reader instances within configured limits; it does not scale the writer.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling
  - id: aggregate
    text: Aurora Auto Scaling metric averages include all readers, including manually added readers and custom-endpoint members, and exclude the writer.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling.Concepts.TargetMetric
  - id: minimum-reader
    text: If an Aurora cluster has no readers, reader metrics are not calculated and scaling alarms remain inactive; at least one reader is needed for metric-driven Auto Scaling.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling.Concepts.TargetMetric
  - id: remove
    text: Aurora Auto Scaling removes only readers it created.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling
  - id: custom-endpoint
    text: "An Aurora custom endpoint points to a set of DB instances you choose and balances connections among them, for example to send reporting queries to specific replicas."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Endpoints.Custom.html#Aurora.Endpoints.Custom
  - id: xtrabackup
    text: "A MySQL 5.7 or 8.0 database can be migrated physically to Aurora MySQL by copying Percona XtraBackup files to Amazon S3 and restoring from them."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Migrating.ExtMySQL.S3.html#AuroraMySQL.Migrating.ExtMySQL.S3
  - id: no-replica-failover
    text: "If an Aurora cluster has no Aurora Replicas, a failure recreates the primary instance in the same Availability Zone, which typically takes under 10 minutes; promoting a replica is much faster."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html#Aurora.Managing.FaultTolerance
  - id: volume-max
    text: "An Aurora cluster volume grows automatically up to 256 TiB on supported engine versions, and you pay only for the space used."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html#aurora-storage-growth
  - id: backtrack
    text: "Aurora MySQL Backtrack rewinds the same cluster to an earlier time in minutes without a restore; it must be enabled when the cluster is created or restored, and the window is at most 72 hours."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Managing.Backtrack.html#AuroraMySQL.Managing.Backtrack.Limitations
  - id: aurora-ml
    text: "Aurora machine learning lets SQL in Aurora MySQL or Aurora PostgreSQL call Amazon Bedrock, Amazon Comprehend or SageMaker AI models."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-ml.html#aurora-ml
  - id: migrate-via-replica
    text: "To move from RDS for MySQL to Aurora MySQL with little downtime, create an Aurora read replica of the RDS instance, wait for replica lag 0, point clients to it and promote it."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Migrating.RDSMySQL.Replica.html#AuroraMySQL.Migrating.RDSMySQL.Replica
  - id: dynamic-resizing
    text: "On supported versions, an Aurora cluster volume shrinks automatically when data is removed, such as by dropping or truncating a table, which lowers storage charges."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html
cards:
  - id: aurora-001
    q: What separates Aurora storage durability from database instance availability?
    a: Aurora stores six data copies across three Availability Zones regardless of instance count. One writer and up to 15 readers share that volume; readers in other zones provide promotion targets.
    facts:
      - cluster
      - reader-limit
      - storage
      - readers
  - id: aurora-009
    q: An Aurora application sends every read over one persistent reader-endpoint connection. Why does one reader remain busy?
    a: The endpoint balances connections, not individual queries. A persistent connection stays with its selected reader.
    trap: true
    facts:
      - reader-endpoint
  - id: aurora-010
    q: An Aurora writer fails and the application must reconnect without selecting an instance hostname. Which endpoint applies?
    a: The cluster endpoint. It follows the current writer, while Aurora can promote a reader to take over.
    facts:
      - writer-endpoint
      - readers
  - id: aurora-011
    q: An Aurora cluster needs to handle more read traffic and provide a failover target. What
      should the team add?
    a: Add an Aurora Replica. Readers serve read traffic and can be promoted if the writer fails.
    facts:
      - readers
  - id: aurora-012
    q: An Aurora cluster has variable read demand. How can it adjust read capacity automatically?
    a: Use Aurora Auto Scaling to add or remove reader instances within configured limits. It does
      not scale the writer.
    facts:
      - autoscaling
  - id: aurora-037
    q: "Analytics queries must go only to two large Aurora replicas, while the app uses the others. Which Aurora feature fits?"
    a: "A **custom endpoint** that includes just those two replicas."
    facts: [custom-endpoint]
  - id: aurora-038
    q: How can an Aurora cluster improve database instance availability across Availability Zones?
    a: Place Aurora Replicas in different Availability Zones. A reader can be promoted if the writer
      fails.
    facts: [readers]
  - id: aurora-039
    q: "The writer of a single-instance Aurora cluster fails. What does Aurora do, and how long can it take?"
    a: "It recreates the primary instance in the same AZ, typically within 10 minutes. Add an Aurora Replica in another AZ so failover becomes a fast promotion."
    trap: true
    facts: [no-replica-failover]
  - id: aurora-042
    q: An Aurora application needs read scaling without copying table data for each database
      instance. How do replicas use storage?
    a: Aurora readers share the cluster volume with the writer. Adding an instance does not make a
      new copy of the table data.
    facts: [cluster, reader-limit, compute]
  - id: aurora-043
    q: An Aurora workload needs to distribute read connections across replicas. Which endpoint
      should it use?
    a: Use the reader endpoint. It balances new connections among available Aurora Replicas.
    facts: [reader-endpoint]
  - id: aurora-045
    q: "A production RDS for MySQL database must move to Aurora MySQL with minimal downtime. What path does AWS recommend?"
    a: "Create an Aurora read replica of the RDS instance; when replica lag reaches 0, switch clients and promote the replica."
    facts: [migrate-via-replica]
  - id: aurora-051
    q: "A team drops large tables in an Amazon Aurora cluster. Does it keep paying for the storage those tables used?"
    a: "No, on supported versions. Aurora shrinks the cluster volume automatically when data is removed, lowering storage charges."
    facts: [dynamic-resizing]
diagrams:
  - id: aurora-shared-storage
    title: Instances share storage while endpoints select connections
    width: 1100
    height: 480
    nodes:
      - id: write-endpoint
        label: Cluster endpoint
        icon: aurora
        sub: read/write connections
        x: 30
        y: 60
        w: 210
        h: 86
        tone: database
      - id: read-endpoint
        label: Reader endpoint
        icon: aurora
        sub: read-only connections
        x: 30
        y: 330
        w: 210
        h: 86
        tone: database
      - id: writer
        label: Writer
        icon: aurora
        sub: one writer instance
        x: 420
        y: 60
        w: 210
        h: 86
        tone: database
      - id: readers
        label: Readers
        icon: aurora
        sub: up to 15 instances
        x: 420
        y: 330
        w: 210
        h: 86
        tone: database
      - id: volume
        label: Shared volume
        icon: aurora
        sub: 6 copies across 3 AZs
        x: 830
        y: 195
        w: 210
        h: 86
        tone: database
    edges:
      - from: write-endpoint
        to: writer
        step: 1
      - from: read-endpoint
        to: readers
        step: 2
      - from: writer
        to: volume
        step: 3
      - from: readers
        to: volume
        step: 4
    steps:
      - The cluster endpoint selects the writer.
      - The reader endpoint balances new connections among available readers.
      - The writer modifies data in the shared volume.
      - Readers use the same volume without making another full copy of the tables.
---
An Aurora cluster separates database instances from a shared storage volume. The writer handles changes; reader instances serve read-only work and can take over if the writer fails. Storage copies protect data, while readers in other Availability Zones provide replacement compute capacity.

### How it works

1. Store six copies of the data across three Availability Zones. This storage replication exists even with only one database instance. Storage grows with data, subject to engine-version limits.
2. Add up to 15 Aurora Replicas, meaning read-only instances sharing the same volume. Adding a reader does not copy all table data again.
3. Send read/write connections to the cluster endpoint, the address that follows the writer. Send read-only connections to the reader endpoint, which balances connections across readers. It does not redistribute queries within a connection.
4. For automatic reader counts, use Aurora Auto Scaling target tracking and configure reader limits. The average includes every reader and excludes the writer. At least one reader must exist for these metrics to drive scaling.
5. Auto Scaling removes only the readers it created, even though manually added readers contribute to its metrics.

### Exam cues

- If the question says durable storage but only one database instance, think add a reader in another zone, because storage copies alone are not spare compute.
- If the question says automatically adjust reader count, think Aurora Auto Scaling, because it uses target tracking within configured limits.
- If the question says a single read session overloads one reader, think connection balancing, because the reader endpoint does not balance each query.

### Remember

- Six data copies across three zones; one writer and up to 15 readers.
- Aurora is MySQL and PostgreSQL compatible; AWS patches it in the maintenance window.
- The cluster volume shrinks when data is removed, on supported versions.

> **Trap:** Manually created readers affect Auto Scaling metrics but are not removed by its scale-in actions. With no readers, the reader endpoint reaches the writer and can accept writes.
