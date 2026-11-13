---
title: Global Datastore
level: professional
order: 20
facts:
  - id: global
    text: Global Datastore replicates node-based Valkey or Redis OSS clusters across AWS Regions.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Redis-Global-Datastore.html
  - id: writer
    text: The primary cluster accepts reads and writes; secondary clusters accept reads only until promoted.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Redis-Global-Datastore.html
  - id: async
    text: Global Datastore replication from primary to secondary clusters is asynchronous.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Redis-Global-Datastore.html
  - id: regions
    text: A Global Datastore can have secondary clusters in up to two other Regions.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Redis-Global-Datastores-Getting-Started.html
  - id: manual
    text: Global Datastore does not automatically fail over across Regions; a secondary can be promoted manually.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Redis-Global-Datastores-Getting-Started.html
  - id: routing
    text: After secondary promotion, update the application to send writes to the new primary Region.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Redis-Global-Datastores-Console.html
  - id: former-primary
    text: After promotion completes, the former primary becomes a secondary and stops accepting writes.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Redis-Global-Datastores-Console.html
  - id: matching
    text: Global Datastore member clusters use matching node types, engine versions, primary-node counts, and shard counts; read-replica counts can differ.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Redis-Global-Datastores-Getting-Started.html
  - id: same-account
    text: Global Datastore does not support cross-account deployments.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Redis-Global-Datastores-Getting-Started.html
  - id: node-only
    text: Global Datastore is available only for node-based clusters, not Serverless.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Redis-Global-Datastore.html
  - id: local-failover
    text: Global Datastore regional clusters can use automatic failover to their regional replicas.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Redis-Global-Datastores-Console.html
  - id: no-auto-scaling
    text: ElastiCache Auto Scaling is not supported for clusters in Global Datastores.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoScaling.html
  - id: no-durability
    text: Global Datastore is not supported with durability-enabled ElastiCache clusters.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Durability.Limitations.html
diagrams:
  - id: elasticache-global-regions
    title: One writer Region replicates to read-only Regions
    width: 800
    height: 340
    groups:
      - label: Primary Region
        icon: group-region
        x: 20
        y: 85
        w: 250
        h: 170
        tone: database
      - label: Secondary Region B
        icon: group-region
        x: 490
        y: 10
        w: 290
        h: 150
        tone: database
      - label: Secondary Region C
        icon: group-region
        x: 490
        y: 180
        w: 290
        h: 150
        tone: database
    nodes:
      - id: primary
        label: Read and write
        icon: elasticache
        tone: database
        x: 45
        y: 140
        w: 200
        h: 86
      - id: b
        label: Read only
        icon: elasticache
        tone: database
        x: 535
        y: 60
        w: 200
        h: 86
      - id: c
        label: Read only
        icon: elasticache
        tone: database
        x: 535
        y: 230
        w: 200
        h: 86
    edges:
      - from: primary
        to: b
        step: 1
      - from: primary
        to: c
        step: 2
    steps:
      - The primary cluster asynchronously replicates writes to a secondary cluster.
      - An optional second secondary receives the same primary writes in another Region.
cards:
  - id: elasticache-002
    q: Which ElastiCache feature provides cross-Region replication, and where can applications write?
    a: Global Datastore for node-based Valkey or Redis OSS. Only the primary cluster accepts writes; secondary Regions serve reads until promoted.
    facts:
      - global
      - writer
      - node-only
  - id: elasticache-013
    q: An application needs local cache reads in two additional Regions while retaining one writer Region. Which ElastiCache feature fits?
    a: Global Datastore. It asynchronously replicates the primary to secondary clusters in up to two other Regions.
    facts:
      - global
      - async
      - regions
      - writer
  - id: elasticache-014
    q: An ElastiCache Global Datastore primary Region fails. Does Multi-AZ automatically promote a secondary Region?
    a: No. Regional automatic failover uses local replicas. Cross-Region recovery requires a manual secondary promotion and an application routing update.
    trap: true
    facts:
      - manual
      - local-failover
      - routing
  - id: elasticache-015
    q: Can a company attach ElastiCache Serverless caches in separate accounts to one Global Datastore?
    a: No. Global Datastore requires node-based clusters within the same AWS account.
    trap: true
    facts:
      - node-only
      - same-account
  - id: elasticache-016
    q: A Global Datastore secondary Region needs more read capacity than another secondary. Must their replica counts match?
    a: No. Read-replica counts may differ, while member node types, engine versions, primary counts, and shard counts must match.
    facts:
      - matching
  - id: elasticache-017
    q: Can an ElastiCache Global Datastore use durability-enabled Valkey clusters?
    a: No. Global Datastore does not support durability-enabled clusters.
    trap: true
    facts:
      - no-durability
---
Global Datastore maintains a writable Valkey or Redis OSS cache cluster in one Region and read-only copies in other Regions. It supports regional read access and a recovery path when the writer Region is unavailable.

### How it works

1. Start with a node-based primary cluster. Add secondary clusters in other Regions in the same AWS account.
2. Send writes to the primary. ElastiCache replicates them asynchronously, meaning secondaries can temporarily lag behind it, while secondary clusters serve regional reads.
3. Keep required cluster settings aligned across Regions. Read-replica counts can differ to suit regional demand.
4. For cross-Region recovery, manually promote a secondary. When promotion finishes, the old primary becomes secondary. Update the application to write to the new primary Region.

### Exam cues

- If the question says one cache writer and local reads in distant Regions, think Global Datastore, because its secondary clusters serve regional reads.
- If the question says automatically recover a node within one Region, think regional Multi-AZ failover, because it promotes a local replica.
- If the question says recover writes in another Region, think manual Global Datastore promotion and application routing updates, because cross-Region failover is not automatic.

### Remember

- One primary can replicate to secondary clusters in up to two other Regions.
- Global Datastore supports node-based Valkey and Redis OSS, within one account.
- Node types, engine versions, primary-node counts, and shard counts must match. Read-replica counts may differ.
- ElastiCache Auto Scaling and durability-enabled clusters are not supported with Global Datastore.

> **Trap:** A secondary cluster remains read only until promoted. Regional automatic failover does not move the writable role to another Region.
