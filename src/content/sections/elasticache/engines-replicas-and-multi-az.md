---
title: Engines, replicas, and Multi-AZ
level: associate
order: 10
facts:
  - id: service
    text: ElastiCache provides managed in-memory caches and data stores using Valkey, Redis OSS, or Memcached.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html
  - id: serverless
    text: ElastiCache Serverless manages cache capacity without customers provisioning or configuring cache nodes.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html
  - id: shards
    text: Valkey and Redis OSS cluster mode enabled partitions data across shards, each with a read/write primary and optional read-only replicas.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.html
  - id: memcached
    text: Node-based Memcached partitions data across nodes rather than replicating data between them.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/disaster-recovery-resiliency.html
  - id: cache-aside
    text: Lazy loading checks the cache first; on a miss, the application reads the database and writes the result to the cache.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html
  - id: stale
    text: Lazy-loaded cache values can become stale after database changes; write-through updates or time to live can address stale data.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html
  - id: ttl
    text: A time to live sets how long a cached value remains valid before expiration.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html
  - id: multi-az
    text: Multi-AZ distributes replicas across Availability Zones and enables automatic failover, requiring a replica in a different Zone.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html
  - id: promotion
    text: On primary failure, ElastiCache promotes the replica with the least replication lag and updates the primary endpoint DNS.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html
  - id: ha-default
    text: Cluster mode enabled has Multi-AZ enabled by default and requires automatic failover.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html
  - id: loss
    text: Without durability enabled, asynchronous replica lag can cause data loss when a primary fails.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoFailover.html
  - id: endpoints
    text: Cluster mode disabled uses the primary endpoint for writes and the reader endpoint to spread connections among replicas.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Endpoints.html
  - id: configuration-endpoint
    text: Cluster mode enabled uses its configuration endpoint with a cluster-aware Valkey or Redis OSS client.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Endpoints.html
  - id: vertical
    text: Changing to a larger Valkey or Redis OSS node type increases per-node read and write capacity.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/redis-cluster-vertical-scaling.html
  - id: autoscale
    text: ElastiCache Auto Scaling can adjust shards or replicas in supported cluster mode enabled Valkey and Redis OSS configurations.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoScaling.html
  - id: autoscale-global
    text: ElastiCache Auto Scaling is not supported for Global Datastore clusters.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoScaling.html
  - id: snapshots
    text: Valkey, Redis OSS, and Serverless Memcached support snapshot backup and restore; node-based Memcached does not.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/backups.html
  - id: restore
    text: Restoring an ElastiCache backup creates and populates a new cache.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/backups.html
  - id: auth
    text: Node-based Valkey and Redis OSS AUTH tokens require encryption in transit.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth.html
  - id: rbac
    text: Role-based access control assigns command and key access permissions to users organized in user groups.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Clusters.RBAC.html
  - id: log-delivery
    text: Supported node-based Valkey and Redis OSS versions can deliver slow and engine logs to CloudWatch Logs or Data Firehose; serverless caches do not support this log delivery.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Log_Delivery.html
  - id: subnets
    text: Node-based caches in a VPC use a subnet group for subnet and IP placement; Serverless takes subnet IDs directly.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/SubnetGroups.html
  - id: durability-date
    text: AWS announced ElastiCache durability for Valkey 9.0 and later in June 2026.
    source: https://aws.amazon.com/about-aws/whats-new/2026/06/durability-amazon-elasticache/
  - id: durable-sync
    text: Durable synchronous writes are persisted across at least two Availability Zones in a transactional log before acknowledging the client.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/durability.html
  - id: durable-async
    text: Durable asynchronous writes acknowledge before log persistence and can lose up to 10 seconds of uncommitted data on failure.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/durability.html
  - id: durable-scope
    text: Durability requires node-based Valkey 9.0 or later with cluster mode enabled and Multi-AZ with at least one replica per shard.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Durability.Limitations.html
  - id: durable-exclusions
    text: Durability is not supported with ElastiCache Serverless or Global Datastores.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Durability.Limitations.html
diagrams:
  - id: elasticache-multi-az
    title: A replica in another Availability Zone can become primary
    width: 800
    height: 240
    groups:
      - label: Availability Zone A
        x: 280
        y: 20
        w: 220
        h: 200
        tone: database
      - label: Availability Zone B
        x: 550
        y: 20
        w: 220
        h: 200
        tone: database
    nodes:
      - id: app
        label: Application
        icon: res-client
        tone: user
        x: 20
        y: 75
        w: 180
        h: 86
      - id: primary
        label: Primary
        icon: elasticache
        tone: database
        x: 300
        y: 75
        w: 180
        h: 86
      - id: replica
        label: Read replica
        icon: elasticache
        tone: database
        x: 570
        y: 75
        w: 180
        h: 86
    edges:
      - from: app
        to: primary
        step: 1
      - from: primary
        to: replica
        step: 2
    steps:
      - The application sends writes to the primary endpoint.
      - The primary replicates to the read replica; Multi-AZ can promote a replica on failure.
cards:
  - id: elasticache-001
    q: How does a node-based ElastiCache Valkey or Redis OSS deployment survive a primary node or Availability Zone failure?
    a: Use replicas across Zones with Multi-AZ automatic failover. ElastiCache promotes the least-lagging replica and updates primary-endpoint DNS. Without durability, replication lag can cause data loss.
    facts:
      - multi-az
      - promotion
      - loss
  - id: elasticache-003
    q: A relational database repeats expensive reads for unchanged results. How can an application use ElastiCache to reduce those reads?
    a: "Use lazy loading, also called cache-aside: check the cache, query the database on a miss, then cache the result. Plan updates or expiration to handle stale values."
    facts:
      - cache-aside
      - stale
  - id: elasticache-004
    q: An ElastiCache Valkey workload needs more write capacity across multiple data partitions. Should it add only read replicas?
    a: No. Use cluster mode enabled and add shards to partition data. Replicas within a shard serve reads; a larger node type is another capacity option.
    trap: true
    facts:
      - shards
      - vertical
  - id: elasticache-005
    q: Does every ElastiCache Memcached deployment lack backup support?
    a: No. Serverless Memcached supports snapshots. Node-based Memcached does not support snapshot backup and restore.
    trap: true
    facts:
      - snapshots
  - id: elasticache-006
    q: Which connection endpoints should an application use for node-based ElastiCache Valkey or Redis OSS?
    a: With cluster mode disabled, use primary for writes and reader for replica connections. With cluster mode enabled, use the configuration endpoint and a cluster-aware client.
    facts:
      - endpoints
      - configuration-endpoint
  - id: elasticache-007
    q: A team needs node-based ElastiCache clients restricted to specific commands and keys. Which feature fits?
    a: Role-based access control with users and user groups. A shared AUTH token alone does not define those per-user permissions.
    facts:
      - rbac
      - auth
  - id: elasticache-008
    q: Can an ElastiCache AUTH token secure a node-based Valkey connection without encryption in transit?
    a: No. AUTH requires encryption in transit.
    trap: true
    facts:
      - auth
  - id: elasticache-009
    q: A team wants persistent acknowledged writes in node-based ElastiCache Valkey. Which durability mode fits?
    a: Synchronous durability on a supported Valkey 9.0 or later cluster. It persists writes across at least two Zones before acknowledgment.
    facts:
      - durable-sync
      - durable-scope
  - id: elasticache-010
    q: How does a team troubleshoot slow commands in a supported node-based ElastiCache Valkey cluster?
    a: Configure slow log delivery to CloudWatch Logs or Data Firehose. Engine logs provide supported operational events. This log delivery is unavailable for serverless caches.
    facts:
      - log-delivery
  - id: elasticache-011
    q: How do ElastiCache node-based and serverless deployments select VPC subnets?
    a: Node-based caches use a subnet group. Serverless caches receive subnet IDs directly.
    facts:
      - subnets
  - id: elasticache-012
    q: A team wants ElastiCache to adjust its cache capacity automatically. Which deployment or feature fits?
    a: Serverless manages capacity automatically. Supported node-based cluster mode enabled configurations can use ElastiCache Auto Scaling for shards or replicas.
    facts:
      - serverless
      - autoscale
---
ElastiCache keeps data in memory to serve application reads without repeatedly querying an underlying database. Choose an engine and a deployment type before deciding how to partition data, add replicas, or recover from failure.

### How it works

1. Choose Serverless to let AWS manage capacity, or node-based caches when you need control of nodes and placement. Node-based caches use a subnet group, a set of eligible VPC subnets; Serverless receives subnet IDs directly.
2. Implement lazy loading, also called cache-aside. Read the cache first. On a cache miss, meaning the value is absent or expired, query the database and populate the cache. Address stale values with write-through updates or a time to live (TTL), an expiration duration.
3. For Valkey or Redis OSS, split data across shards, partitions with a primary node for writes and optional replicas for reads. Enable Multi-AZ to place a replica in another Availability Zone, a separate failure location within a Region.
4. On primary failure, ElastiCache promotes the replica with the least lag, meaning the smallest delay behind the primary, and updates the primary endpoint's DNS address. Non-durable replication is asynchronous, so recent writes may be lost.
5. Configure authentication, backups, and operational logs for the selected deployment. AUTH requires encryption in transit; role-based access control (RBAC) uses users and user groups to restrict commands and keys.

| Scaling need | Mechanism |
|---|---|
| More per-node capacity | Change to a larger Valkey or Redis OSS node type |
| More partitions and write capacity | Add shards with cluster mode enabled |
| More replica read capacity | Add read replicas |
| Automatic shard or replica adjustment | ElastiCache Auto Scaling on supported cluster mode enabled configurations |
| Capacity without node management | Serverless |
| Node-based Memcached growth | Partition data across more nodes; these nodes do not replicate each other |

### Exam cues

- If the question says repeat database reads dominate load, think cache-aside, because cache hits avoid those database queries.
- If the question says survive an Availability Zone failure, think Multi-AZ replicas, because a replica in another Zone can become primary.
- If the question says spread write load across data partitions, think shards, because adding read replicas does not create additional writable partitions.
- If the question says analyze slow cache commands centrally, think slow log delivery to CloudWatch Logs or Data Firehose on supported node-based versions, because serverless caches do not support that log delivery.

### Remember

- With cluster mode disabled, use the primary endpoint for writes and reader endpoint for replica connections. With cluster mode enabled, use the configuration endpoint and a cluster-aware client.
- Cluster mode enabled defaults to Multi-AZ and requires automatic failover.
- Valkey, Redis OSS, and Serverless Memcached support snapshots. Node-based Memcached does not. A restore creates a new cache.
- June 2026: AWS introduced optional durability for Valkey 9.0 and later. It requires node-based cluster mode enabled, Multi-AZ, and a replica per shard.
- Synchronous durability logs writes across at least two Zones before acknowledging them. Asynchronous durability can lose up to 10 seconds of uncommitted writes.
- Durability is unavailable for Serverless and Global Datastore clusters.

> **Trap:** A read replica, a snapshot, and a transactional durability log solve different failure problems. Multi-AZ alone on a non-durable cluster does not guarantee preservation of every acknowledged write.
