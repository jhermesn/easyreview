---
title: "ElastiCache basics"
level: foundational
order: 5
facts:
  - id: in-memory
    text: "Amazon ElastiCache sets up, manages and scales a distributed in-memory data store or cache in the cloud."
    source: https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html#WhatIs
cards:
  - id: elasticache-026
    q: "A database is slow for repeated reads. Which AWS service adds an in-memory cache in front of it?"
    a: "Amazon ElastiCache."
    facts: [in-memory]
---
Amazon ElastiCache is a managed in-memory cache that speeds up reads. [What is Amazon ElastiCache?](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html#WhatIs)

### How it works

1. Create a cache.
2. The application checks the cache first.
3. On a miss, it reads the database and stores the result in the cache.

### Exam cues

- If the question says in-memory cache to reduce database load, think ElastiCache.

### Remember

- Managed in-memory data store.

> **Trap:** A cache speeds up reads; it does not replace the database as the source of truth.
