---
title: Graph databases
level: foundational
order: 10
facts:
  - id: purpose
    text: Amazon Neptune is a fast, reliable, fully managed graph database service for applications that work with highly connected datasets.
    source: https://docs.aws.amazon.com/neptune/latest/userguide/intro.html#intro
  - id: engine
    text: The Neptune engine is optimized for storing billions of relationships and querying the graph with milliseconds latency.
    source: https://docs.aws.amazon.com/neptune/latest/userguide/intro.html#intro
  - id: languages
    text: Neptune supports the graph query languages Apache TinkerPop Gremlin, openCypher and SPARQL.
    source: https://docs.aws.amazon.com/neptune/latest/userguide/intro.html#intro
  - id: use-cases
    text: Neptune powers graph use cases such as recommendation engines, fraud detection, knowledge graphs, drug discovery and network security.
    source: https://docs.aws.amazon.com/neptune/latest/userguide/intro.html#intro
cards:
  - id: neptune-001
    q: A social network must store and query relationships between billions of users quickly. Which AWS database fits?
    a: Amazon Neptune, a managed graph database for highly connected data.
    facts: [purpose, engine]
  - id: neptune-002
    q: A bank wants to detect fraud rings by following links between accounts, devices and transactions. Which AWS database fits?
    a: Amazon Neptune; fraud detection is a typical graph use case.
    facts: [use-cases]
  - id: neptune-003
    q: Which query languages does Amazon Neptune support?
    a: Gremlin, openCypher and SPARQL.
    facts: [languages]
  - id: neptune-004
    q: Is Amazon Neptune a relational database?
    a: No. It is a graph database; relational databases on AWS are Amazon RDS and Aurora.
    trap: true
    facts: [purpose]
---
Amazon Neptune stores data as a graph: things and the relationships between them. That makes queries like "friends of friends" or "accounts linked to this device" fast, where a relational database would need many joins. [What is Amazon Neptune?](https://docs.aws.amazon.com/neptune/latest/userguide/intro.html#intro)

### How it works

1. Load data as vertices (things) and edges (relationships).
2. Query relationships with Gremlin, openCypher or SPARQL.
3. Neptune manages replicas, backups and recovery.

### Exam cues

- If the question says relationships, social networks, recommendations, fraud rings or knowledge graphs, think Amazon Neptune.

### Remember

- Graph database; billions of relationships; millisecond queries.

> **Trap:** "Highly connected data" points to a graph database, not to DynamoDB or RDS.
