---
title: "DynamoDB basics"
level: foundational
order: 5
facts:
  - id: nosql
    text: "Amazon DynamoDB is a serverless, fully managed, distributed NoSQL database with single-digit millisecond performance at any scale."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html#Introduction
  - id: dax
    text: "DAX is an in-memory cache for repeated eventually consistent DynamoDB reads with microsecond response times."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html
  - id: hit
    text: "The DAX client routes requests to a cluster; hits avoid table reads, while misses read DynamoDB and cache results."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.html
  - id: strong
    text: "DAX forwards strong reads and TransactGetItems to DynamoDB without caching their results."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.consistency.html
  - id: items
    text: "A table contains items made of named attributes; non-key attributes may differ between items."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html
  - id: keys
    text: "A simple primary key is a partition key; a composite primary key adds a sort key and its combined values uniquely identify an item."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html
  - id: size
    text: "The item maximum is 400 KB including attribute names and values."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Constraints.html
  - id: global-tables
    text: DynamoDB global tables replicate a table across AWS Regions with managed replication, and every replica can serve reads and writes.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html
cards:
  - id: dynamodb-049
    q: "Which AWS database service is a serverless, fully managed NoSQL database?"
    a: "Amazon DynamoDB is a distributed NoSQL database with single-digit millisecond performance at any scale."
    facts: [nosql]
  - id: dynamodb-008
    q: "An application repeatedly reads DynamoDB items and accepts eventual consistency. What provides microsecond cache reads?"
    a: "DAX. Cache hits avoid table reads. Strong and transactional reads pass through to DynamoDB without caching results."
    facts: [dax, hit, strong]
  - id: dynamodb-015
    q: "How do DynamoDB keys and size limits constrain flexible item attributes?"
    a: "Non-key attributes can vary. A simple key identifies by partition key; a composite key identifies by partition and sort key. Each item is at most 400 KB, including names and values."
    facts: [items, keys, size]
  - id: dynamodb-071
    q: "Users in several AWS Regions must read and write the same Amazon DynamoDB data with low latency in their own Region. Which DynamoDB feature fits?"
    a: "DynamoDB global tables. AWS replicates the table across Regions, and every replica serves reads and writes."
    facts: [global-tables]
---
Amazon DynamoDB is a serverless NoSQL database for fast key-value and document access.

### How it works

1. Create a table with a key.
2. Read and write items through the API.
3. DynamoDB scales without servers to manage.

### Exam cues

- If the question says serverless NoSQL or key-value at any scale, think DynamoDB.

### Remember

- Serverless NoSQL, single-digit millisecond.
- Global tables: multi-Region replicas, each readable and writable.

> **Trap:** DynamoDB is NoSQL; joins and complex SQL point to a relational database.
