---
title: MemoryDB basics
level: foundational
order: 5
facts:
  - id: purpose
    text: Amazon MemoryDB is a durable in-memory database.
    source: https://docs.aws.amazon.com/memorydb/latest/devguide/what-is-memorydb.html
  - id: durability
    text: MemoryDB stores data durably across Availability Zones in a transactional log.
    source: https://docs.aws.amazon.com/memorydb/latest/devguide/what-is-memorydb.html
cards:
  - id: memorydb-009
    q: Which AWS database stores data in memory and keeps it durable across Availability Zones?
    a: Amazon MemoryDB. It uses a Multi-AZ transactional log for durability.
    facts: [purpose, durability]
  - id: memorydb-010
    q: What type of database is Amazon MemoryDB?
    a: A durable in-memory database.
    facts: [purpose]
---
Amazon MemoryDB is a durable in-memory database for applications that need fast data access.

### How it works

1. MemoryDB stores application data in memory.
2. A transactional log stores data durably across Availability Zones.

### Exam cues

- If the question says durable in-memory database, think Amazon MemoryDB, because it combines in-memory storage with a Multi-AZ log.

### Remember

- MemoryDB stores data in memory and uses a transactional log for durability.

> **Trap:** An in-memory database can also provide durability. MemoryDB stores its log across Availability Zones.
