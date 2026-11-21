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
  - id: replicas
    text: "A Neptune cluster can have up to 15 Neptune Replicas that share the primary storage volume, serve reads and sit in other Availability Zones for high availability."
    source: https://docs.aws.amazon.com/neptune/latest/userguide/intro.html#intro
  - id: streams
    text: "Neptune Streams records every change to the graph, in order, so other systems can consume the changes."
    source: https://docs.aws.amazon.com/neptune/latest/userguide/streams.html#streams
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
    q: "Which AWS database service is designed for applications with highly connected data?"
    a: "Amazon Neptune is a fully managed graph database service for highly connected datasets."
    facts: [purpose]
  - id: neptune-004
    q: Is Amazon Neptune a relational database?
    a: No. It is a graph database; relational databases on AWS are Amazon RDS and Aurora.
    trap: true
    facts: [purpose]
  - id: neptune-005
    q: "Which AWS database service can support a recommendation engine using relationships between data?"
    a: "Amazon Neptune is a graph database used for recommendation engines and other connected-data applications."
    facts: [purpose, use-cases]
---
Amazon Neptune stores data as a graph: things and the relationships between them. That makes queries like "friends of friends" or "accounts linked to this device" fast, where a relational database would need many joins.

### How it works

1. Load data as vertices (things) and edges (relationships).
2. Query relationships with Gremlin, openCypher or SPARQL.
3. Neptune manages replicas, backups and recovery.

### Exam cues

- If the question says relationships, social networks, recommendations, fraud rings or knowledge graphs, think Amazon Neptune.

### Remember

- Graph database; billions of relationships; millisecond queries.

> **Trap:** "Highly connected data" points to a graph database, not to DynamoDB or RDS.
