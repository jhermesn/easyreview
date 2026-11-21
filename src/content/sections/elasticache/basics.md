---
title: "ElastiCache basics"
level: foundational
order: 5
facts:
  - id: in-memory
    text: "Amazon ElastiCache sets up, manages and scales a distributed in-memory data store or cache in the cloud."
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html#WhatIs
  - id: engines
    text: "ElastiCache works with the Valkey, Memcached and Redis OSS engines, as a serverless cache or a node-based cluster."
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html
cards:
  - id: elasticache-026
    q: "Which AWS service manages and scales a distributed in-memory data store or cache?"
    a: "Amazon ElastiCache sets up, manages and scales an in-memory data store or cache."
    facts: [in-memory]
  - id: elasticache-027
    q: "Which caching engines can a company choose from when it uses Amazon ElastiCache?"
    a: "Valkey, Memcached and Redis OSS, as a serverless cache or a node-based cluster."
    facts: [engines]
---
Amazon ElastiCache is a managed in-memory cache that speeds up reads.

### How it works

1. Create a cache.
2. The application checks the cache first.
3. On a miss, it reads the database and stores the result in the cache.

### Exam cues

- If the question says in-memory cache to reduce database load, think ElastiCache.

### Remember

- Managed in-memory data store.
- Engines: Valkey, Memcached and Redis OSS.

> **Trap:** A cache speeds up reads; it does not replace the database as the source of truth.
