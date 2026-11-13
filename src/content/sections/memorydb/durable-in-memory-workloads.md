---
title: Durable in-memory workloads
level: associate
order: 10
facts:
  - id: memorydb-purpose
    text: MemoryDB is a durable in-memory database compatible with Valkey and Redis OSS that can serve as a primary database.
    source: https://docs.aws.amazon.com/memorydb/latest/devguide/what-is-memorydb.html#what-is-memorydb
  - id: memorydb-log
    text: Successful writes are durably stored in a distributed Multi-AZ transactional log before the primary responds to the client.
    source: https://docs.aws.amazon.com/memorydb/latest/devguide/consistency.html#consistency
  - id: memorydb-consistency
    text: Primary reads are strongly consistent across primary failovers; replica reads are eventually consistent.
    source: https://docs.aws.amazon.com/memorydb/latest/devguide/consistency.html#consistency
  - id: memorydb-replication
    text: Each shard has a read-write primary and optional read-only replicas that replicate asynchronously using transaction logs.
    source: https://docs.aws.amazon.com/memorydb/latest/devguide/replication.html#replication.redis.groups.cluster
  - id: memorydb-failover
    text: A failed primary can fail over to a replica, which becomes the new primary for its shard.
    source: https://docs.aws.amazon.com/memorydb/latest/devguide/components.html#whatis.clusters
  - id: memorydb-single-node
    text: If a primary in a shard without replicas fails, MemoryDB stops accepting writes until the primary is replaced and synchronized from the transaction log.
    source: https://docs.aws.amazon.com/memorydb/latest/devguide/autofailover.html#autofailover
  - id: memorydb-multiaz
    text: A MemoryDB cluster is regional; placing primary and replica nodes in multiple Availability Zones improves fault tolerance.
    source: https://docs.aws.amazon.com/memorydb/latest/devguide/replication.html#replication.redis.groups.cluster
  - id: memorydb-multiregion
    text: MemoryDB Multi-Region supports active-active local reads and writes in multiple Regions and asynchronously replicates between them.
    source: https://docs.aws.amazon.com/memorydb/latest/devguide/multi-region.html#multi-region
  - id: memorydb-conflict
    text: MemoryDB Multi-Region uses conflict-free replicated data types to reconcile concurrent writes with eventual consistency.
    source: https://docs.aws.amazon.com/memorydb/latest/devguide/multi-region.html#multi-region.conflict
  - id: memorydb-snapshot
    text: MemoryDB point-in-time snapshots contain cluster metadata and data, are stored in S3, and can restore a new cluster.
    source: https://docs.aws.amazon.com/memorydb/latest/devguide/snapshots.html#snapshots
  - id: cache-comparison
    text: ElastiCache is commonly used as a cache, and node-based ElastiCache for Valkey can also be a durable data store when durability is enabled.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/durability.html#durability
  - id: memorydb-shard
    text: The default is one replica per MemoryDB shard and the maximum is five replicas.
    source: https://docs.aws.amazon.com/memorydb/latest/APIReference/API_CreateCluster.html#MemoryDB-CreateCluster-request-NumReplicasPerShard
  - id: memorydb-release
    text: MemoryDB added Valkey support in October 2024 and launched Multi-Region in December 2024.
    source: https://docs.aws.amazon.com/memorydb/latest/devguide/doc-history.html#doc-history
diagrams:
  - id: memorydb-replication
    title: MemoryDB shard replication
    width: 800
    height: 150
    nodes:
      - { id: primary, label: Primary node, x: 25, y: 35, w: 190, h: 72, tone: database, icon: memorydb }
      - { id: log, label: Multi-AZ log, x: 305, y: 35, w: 190, h: 56, tone: database }
      - { id: replica, label: Read replica, x: 585, y: 35, w: 190, h: 72, tone: database, icon: memorydb }
    edges:
      - { from: primary, to: log, step: 1 }
      - { from: log, to: replica, step: 2 }
    steps:
      - The primary stores successful writes in the Multi-AZ transactional log before responding.
      - Read replicas replicate asynchronously using transaction logs and can be promoted on primary failure.
cards:
  - id: memorydb-001
    q: A workload needs a Valkey-compatible primary database with local writes in multiple AWS Regions. Which service fits?
    a: "MemoryDB Multi-Region. It supports active-active regional reads and writes with asynchronous replication."
    facts: [memorydb-purpose, memorydb-multiregion]
  - id: memorydb-002
    q: Which AWS managed in-memory database can serve as a durable primary database for Redis OSS or Valkey applications?
    a: "Amazon MemoryDB. It stores data in memory and uses a Multi-AZ transactional log."
    facts: [memorydb-purpose, memorydb-log]
  - id: memorydb-003
    q: A MemoryDB application must read the latest successful writes after a primary failover. Which node should it read?
    a: "The primary. Primary reads are strongly consistent across failovers; replica reads are eventually consistent."
    facts: [memorydb-consistency]
  - id: memorydb-004
    q: How can a MemoryDB shard recover from a primary node failure?
    a: "A replica can be promoted to primary. Place primary and replica nodes across Availability Zones for fault tolerance."
    facts: [memorydb-failover, memorydb-multiaz]
  - id: memorydb-005
    q: Does a MemoryDB Multi-Region write immediately appear in every Region?
    a: "No. Replication between Regions is asynchronous and concurrent writes are reconciled with eventual consistency."
    facts: [memorydb-multiregion, memorydb-conflict]
    trap: true
  - id: memorydb-006
    q: How can a MemoryDB cluster be restored to an earlier point?
    a: "Create a new cluster from a snapshot. Snapshots contain data and cluster metadata."
    facts: [memorydb-snapshot]
  - id: memorydb-007
    q: Is Amazon ElastiCache limited to non-durable caching, unlike MemoryDB?
    a: "No. Node-based ElastiCache for Valkey can also serve as a durable data store when durability is enabled."
    facts: [cache-comparison]
    trap: true
  - id: memorydb-008
    q: A MemoryDB shard has no replicas and its primary fails. Can it immediately accept writes?
    a: "No. Writes stop until the primary is replaced and synchronized from the transaction log."
    facts: [memorydb-single-node]
    trap: true
---

Amazon MemoryDB is a durable in-memory database compatible with Valkey and Redis OSS. It can act as a primary database rather than a cache in front of one.

### How it works

1. A cluster divides its data into shards, or partitions. Each shard has a primary node that accepts writes and optional read-only replicas.
2. Before returning a successful write, the primary stores it in a transactional log, a record of changes distributed across Availability Zones. Replicas use the log to update asynchronously, meaning they can lag behind the primary.
3. If a primary fails, a replica can become the new primary. Place the primary and replicas in different Availability Zones for fault tolerance.
4. For active-active access, where applications read and write locally in multiple Regions, MemoryDB Multi-Region replicates changes asynchronously across Regions. A conflict-free replicated data type reconciles concurrent changes.

### Exam cues

- If the question says a durable Valkey-compatible primary database, think MemoryDB, because it stores data in memory and writes to a Multi-AZ log.
- If the question says read the latest successful writes after failover, think primary node, because primary reads remain strongly consistent while replica reads are eventually consistent.
- If the question says local writes in multiple Regions, think MemoryDB Multi-Region, because it provides active-active access with asynchronous replication.
- If the question says restore a previous point, think snapshot, because a new cluster can be created from it.

### Remember

- A shard has one primary. The default is one replica, and the maximum is five.
- Without a replica, a failed primary must be replaced and synchronized before writes resume.
- A cluster is regional; Multi-Region is a separate active-active configuration.
- Valkey support arrived in October 2024; MemoryDB Multi-Region launched in December 2024.
- Snapshots contain data and cluster metadata and are stored in S3.

> **Trap:** ElastiCache is commonly a cache, but node-based ElastiCache for Valkey can also be a durable data store when durability is enabled. Do not select MemoryDB solely because durability is required.
