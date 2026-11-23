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
  - id: json-documents
    text: ElastiCache supports storing and accessing JSON documents in Valkey and Redis OSS clusters with supported engine versions.
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/json-gs.html
  - id: sql-query-cache
    text: Applications can cache SQL query results in ElastiCache to avoid repeating database queries.
    source: https://aws.amazon.com/caching/database-caching/
  - id: cache-cost
    text: Caching frequently requested data can reduce the database capacity needed and lower costs.
    source: https://aws.amazon.com/caching/
cards:
  - id: elasticache-026
    q: "Which AWS service manages and scales a distributed in-memory data store or cache?"
    a: "Amazon ElastiCache sets up, manages and scales an in-memory data store or cache."
    facts: [in-memory]
  - id: elasticache-027
    q: "Which caching engines can a company choose from when it uses Amazon ElastiCache?"
    a: "Valkey, Memcached and Redis OSS, as a serverless cache or a node-based cluster."
    facts: [engines]
  - id: elasticache-028
    q: Can Amazon ElastiCache store JSON documents in Valkey or Redis OSS clusters?
    a: Yes. Supported Valkey and Redis OSS versions can store and access JSON documents.
    facts: [json-documents]
  - id: elasticache-033
    q: How can Amazon ElastiCache reduce repeated work for SQL database queries?
    a: Store query results in a cache and reuse them when requested again.
    facts: [sql-query-cache]
---
Amazon ElastiCache is a managed in-memory cache that speeds up reads.

### How it works

1. Create a cache.
2. The application checks the cache first.
3. On a miss, it reads the database and stores the result in the cache.

### Exam cues

- If the question says repeated SQL queries increase database load, think ElastiCache, because applications can reuse cached query results.
- If the question says store JSON documents in ElastiCache, think Valkey or Redis OSS with a supported engine version, because both support JSON.
- If the question says in-memory cache to reduce database load, think ElastiCache.

### Remember

- Managed in-memory data store.
- Engines: Valkey, Memcached and Redis OSS.

> **Trap:** A cache speeds up reads; it does not replace the database as the source of truth.
