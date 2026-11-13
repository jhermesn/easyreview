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
  - id: tier
    text: Aurora promotion priorities range from 0 for highest priority to 15 for lowest priority.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html#Aurora.Managing.FaultTolerance
  - id: tier-tie
    text: Within equal promotion priority, Aurora favors the larger instance, then an arbitrary instance if sizes also match.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html#Aurora.Managing.FaultTolerance
  - id: tier-exception
    text: After five unsuccessful Aurora failover attempts, promotion tiers are no longer considered.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html#Aurora.Managing.FaultTolerance
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
  - id: dimension
    text: Application Auto Scaling registers an Aurora cluster with service namespace rds and scalable dimension rds:cluster:ReadReplicaCount.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.Add.html#Aurora.Integrating.AutoScaling.AddCode.Register
  - id: cpu
    text: RDSReaderAverageCPUUtilization is average CPU utilization across Aurora readers.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.Add.html#Aurora.Integrating.AutoScaling.AddCode.DefineScalingPolicy.Predefined
  - id: connections
    text: RDSReaderAverageDatabaseConnections is the average connection count across Aurora readers.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.Add.html#Aurora.Integrating.AutoScaling.AddCode.DefineScalingPolicy.Predefined
  - id: aggregate
    text: Aurora Auto Scaling metric averages include all readers, including manually added readers and custom-endpoint members, and exclude the writer.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling.Concepts.TargetMetric
  - id: minimum-reader
    text: If an Aurora cluster has no readers, reader metrics are not calculated and scaling alarms remain inactive; at least one reader is needed for metric-driven Auto Scaling.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling.Concepts.TargetMetric
  - id: remove
    text: Aurora Auto Scaling removes only readers it created.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling
  - id: created
    text: Aurora Auto Scaling creates readers with the writer instance class and promotion tier 15 by default.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling
  - id: secondary
    text: Aurora Auto Scaling is unsupported on Global Database secondary clusters.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling
  - id: serverless
    text: Aurora Auto Scaling is unsupported for Serverless v2; pre-created Serverless readers scale compute capacity instead of being added by a reader-count policy.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.requirements.html#aurora-serverless-v2.limitations
  - id: proxy
    text: RDS Proxy manages reusable database connections separately from client connections; clients connect to the proxy endpoint.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-connections.html#rds-proxy-connection-life
  - id: proxy-cap
    text: RDS Proxy MaxConnectionsPercent caps database connections as a percentage of the Aurora max_connections setting; it does not open all allowed connections in advance.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.maxconnectionspercent
  - id: proxy-reserve
    text: RDS Proxy reserves internal connections, so MaxDatabaseConnectionsAllowed can be lower than the value calculated from MaxConnectionsPercent.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.maxconnectionspercent
cards:
  - id: aurora-001
    q: What separates Aurora storage durability from database instance availability?
    a: Aurora stores six data copies across three Availability Zones regardless of instance count. One writer and up to 15 readers share that volume; readers in other zones provide promotion targets.
    facts:
      - cluster
      - reader-limit
      - storage
      - readers
  - id: aurora-002
    q: How does an Aurora cluster automatically add read-serving instances as demand changes?
    a: Aurora Auto Scaling uses Application Auto Scaling target tracking on rds:cluster:ReadReplicaCount. Predefined metrics are RDSReaderAverageCPUUtilization and RDSReaderAverageDatabaseConnections.
    facts:
      - autoscaling
      - dimension
      - cpu
      - connections
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
    q: An Aurora Auto Scaling policy sees load from manually created readers. Can scale-in delete those readers?
    a: No. All readers contribute to the metric average, but Auto Scaling removes only readers it created.
    trap: true
    facts:
      - aggregate
      - remove
  - id: aurora-012
    q: An Aurora cluster has no readers and a CPU-based reader Auto Scaling policy remains inactive. Why?
    a: There is no reader metric to evaluate. Maintain at least one reader so metric-based alarms can operate.
    trap: true
    facts:
      - minimum-reader
  - id: aurora-013
    q: Which class and promotion tier does Aurora Auto Scaling assign to a new reader by default?
    a: The writer instance class and promotion tier 15, the lowest promotion priority.
    facts:
      - created
      - tier
      - tier-tie
  - id: aurora-014
    q: An Aurora application must cap connections opened to the database while retaining many client connections. Which setting and endpoint apply?
    a: Connect through RDS Proxy and set MaxConnectionsPercent as a percentage of max_connections. Internal reserves mean MaxDatabaseConnectionsAllowed can be lower than that calculation.
    facts:
      - proxy
      - proxy-cap
      - proxy-reserve
  - id: aurora-015
    q: Can Aurora Auto Scaling add readers to a Global Database secondary or an Aurora Serverless v2 cluster?
    a: No. Reader-count Auto Scaling does not support those configurations. Pre-created Serverless readers can scale their compute capacity.
    trap: true
    facts:
      - secondary
      - serverless
  - id: aurora-016
    q: How does Aurora normally select a reader to promote when several are available?
    a: Lower promotion tier numbers take priority, from 0 to 15. Equal tiers favor the larger instance, then an arbitrary equal-size instance; tiers are ignored after five unsuccessful attempts.
    facts:
      - tier
      - tier-tie
      - tier-exception
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
4. For automatic reader counts, register rds:cluster:ReadReplicaCount in Application Auto Scaling and set target tracking limits and a CPU or connection target. The average includes every reader and excludes the writer. At least one reader must exist for these metrics to drive scaling.
5. Auto Scaling adds readers using the writer's instance class and default promotion tier 15, and removes only readers it created. A promotion tier is a priority for taking over the writer role; 0 is highest and 15 lowest. Within a tier, Aurora prefers the larger instance, then an arbitrary equal-size instance. After five unsuccessful failover attempts, tiers are ignored.
6. For connection pressure, use RDS Proxy, which reuses database connections for client requests. Connect clients to its endpoint and set MaxConnectionsPercent to cap backend connections as a percentage of max_connections, the database connection limit.

| Capacity problem | Control |
|---|---|
| More stored data | Automatic cluster-volume growth |
| More provisioned read traffic | Aurora Auto Scaling adds reader instances |
| Variable Serverless v2 instance load | Pre-created instances scale their compute capacity |
| Too many backend database connections | RDS Proxy pooling and MaxConnectionsPercent |

### Exam cues

- If the question says durable storage but only one database instance, think add a reader in another zone, because storage copies alone are not spare compute.
- If the question says automatically add provisioned read capacity, think Aurora Auto Scaling, because it changes reader count using average reader CPU or connections.
- If the question says a single read session overloads one reader, think connection balancing, because the reader endpoint does not balance each query.
- If the question says many clients exhaust database connections, think RDS Proxy and MaxConnectionsPercent, because client sessions and pooled database connections are separate.

### Remember

- Six data copies across three zones; one writer and up to 15 readers.
- Promotion tier 0 is highest; 15 is lowest. New Auto Scaling readers default to 15.
- Metrics: RDSReaderAverageCPUUtilization and RDSReaderAverageDatabaseConnections.
- Reader Auto Scaling does not scale the writer and is unsupported for Global Database secondaries or Serverless v2.
- MaxDatabaseConnectionsAllowed accounts for proxy internal reserves and can be below the simple percentage calculation.

> **Trap:** Manually created readers affect Auto Scaling metrics but are not removed by its scale-in actions. With no readers, the reader endpoint reaches the writer and can accept writes.
