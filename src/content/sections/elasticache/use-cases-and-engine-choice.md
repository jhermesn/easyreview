---
title: Use cases and engine choice
level: associate
order: 30
facts:
  - id: leaderboard
    text: Valkey and Redis OSS sorted sets keep unique, ordered elements, which moves the work of real-time leaderboards such as top-10 scores from the application to ElastiCache.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/elasticache-use-cases.html#elasticache-for-redis-use-cases-gaming
  - id: pubsub
    text: Valkey and Redis OSS on ElastiCache support pub/sub messaging, where publishers send to a channel and every subscriber of that channel receives the message.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/elasticache-use-cases.html#elasticache-for-redis-use-cases-messaging
  - id: memcached
    text: Choose ElastiCache for Memcached for the simplest model, large multi-threaded nodes, scaling nodes in and out, and caching objects.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/SelectEngine.html
  - id: valkey-features
    text: Unlike Memcached, Valkey and Redis OSS on ElastiCache support complex data types, replication for high availability and pub/sub.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/SelectEngine.html
  - id: cache-expensive-queries
    text: "Caching the results of expensive queries, such as joins across many tables or heavy calculations, means the database pays for the query once and later reads come from memory."
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/elasticache-use-cases.html#elasticache-use-cases-data-store
  - id: geospatial
    text: "Valkey and Redis OSS on ElastiCache support geospatial indexes; Memcached does not."
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/SelectEngine.html#SelectEngine
  - id: memcached-auto-discovery
    text: "For Memcached clusters, ElastiCache Auto Discovery lets client programs find every node and keep connections to all of them as nodes are added or removed; it is not available for Valkey or Redis OSS."
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoDiscovery.html#AutoDiscovery
  - id: memcached-replacement-empty
    text: A Memcached node automatically replaced by ElastiCache starts empty.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/CacheNodes.NodeReplacement-mc.html
  - id: memcached-failure-replacement
    text: ElastiCache automatically detects and replaces failed cache nodes, which continue to fail until replacement completes.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/AutoDiscovery.Benefits.html
cards:
  - id: elasticache-018
    q: A mobile game needs a real-time global leaderboard that updates with every score change for millions of players. Which service and data structure fit?
    a: "**ElastiCache for Valkey or Redis OSS** with sorted sets."
    facts: [leaderboard]
  - id: elasticache-019
    q: A team needs the simplest multi-threaded object cache, scaling by adding and removing nodes, and doesn't need replication. Which ElastiCache engine fits?
    a: "ElastiCache for Memcached."
    facts: [memcached]
  - id: elasticache-020
    q: A cache must survive a node failure with replicas and automatic failover. Is ElastiCache for Memcached the right engine?
    a: "No. Memcached has no replication; use Valkey or Redis OSS with replicas and Multi-AZ."
    trap: true
    facts: [valkey-features, memcached]
  - id: elasticache-021
    q: Which ElastiCache engines support pub/sub messaging?
    a: "Valkey and Redis OSS (not Memcached)."
    facts: [pubsub, valkey-features]
  - id: elasticache-022
    q: "Which two workloads does ElastiCache help: read-heavy workloads, write-heavy workloads, compute-intensive workloads, ETL, or complex JOIN queries run in the cache?"
    a: "Read-heavy and compute-intensive workloads. The cache stores results of expensive queries or calculations so they run once. It does not run JOINs or ETL itself."
    facts: [cache-expensive-queries]
  - id: elasticache-023
    q: "A cache in front of a relational database must support geospatial queries. Which ElastiCache engine fits?"
    a: "Valkey or Redis OSS, which have geospatial indexes. Memcached does not support them."
    facts: [geospatial]
  - id: elasticache-024
    q: "An app stores sessions in an ElastiCache Memcached cluster that scales its node count. How do clients keep track of the nodes?"
    a: "Memcached Auto Discovery, which lets clients find all nodes and connect to them automatically. It exists only for the Memcached engine."
    facts: [memcached-auto-discovery]
  - id: elasticache-032
    q: What happens to cached data when Amazon ElastiCache automatically replaces a Memcached node?
    a: The replacement starts empty, so the application must repopulate its cache.
    facts: [memcached-replacement-empty]
  - id: elasticache-034
    q: What does Amazon ElastiCache do when a Memcached node fails?
    a: It detects and replaces the failed node. The node continues to fail until replacement completes.
    facts: [memcached-failure-replacement]
---
ElastiCache is more than a database cache. Valkey and Redis OSS add data structures, replication and pub/sub; Memcached stays a simple, multi-threaded object cache.

### How it works

1. Pick the engine from the features you need.
2. Valkey or Redis OSS: rich types (sorted sets, hashes), replicas, Multi-AZ, pub/sub.
3. Memcached: plain key-value objects, many threads per node, scale by adding nodes.

| Need | Engine |
|---|---|
| Leaderboards, counters, rich data types | Valkey or Redis OSS |
| Replicas, Multi-AZ failover, backups | Valkey or Redis OSS |
| Pub/sub messaging | Valkey or Redis OSS |
| Simplest multi-threaded object cache | Memcached |

### Exam cues

- If the question says a Memcached node fails, think automatic replacement, because ElastiCache detects and replaces failed nodes.
- If the question says an ElastiCache Memcached node is replaced, think an empty replacement, because cached data is not restored to it.
- If the question says leaderboard or ranking in real time, think ElastiCache with sorted sets.
- If the question says high availability, replication or persistence for a cache, think Valkey or Redis OSS.
- If the question says simple object caching on large multi-core nodes, think Memcached.

### Remember

- Sorted sets for leaderboards; pub/sub on Valkey and Redis OSS.
- Memcached: no replication, no pub/sub, simple types.

> **Trap:** "In-memory" doesn't settle the choice. Any need for replicas, failover or rich data types rules out Memcached.
