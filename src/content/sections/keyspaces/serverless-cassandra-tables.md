---
title: Serverless Cassandra tables
level: associate
order: 10
facts:
  - id: what
    text: Amazon Keyspaces is a scalable, highly available, managed database service compatible with Apache Cassandra, with no servers to provision, patch or manage.
    source: https://docs.aws.amazon.com/keyspaces/latest/devguide/what-is-keyspaces.html#what-is-keyspaces
  - id: same-code
    text: Existing Cassandra workloads run on Amazon Keyspaces with the same Cassandra application code and developer tools.
    source: https://docs.aws.amazon.com/keyspaces/latest/devguide/what-is-keyspaces.html#what-is-keyspaces
  - id: serverless
    text: Amazon Keyspaces is serverless; you pay for the resources you use and tables scale up and down with traffic.
    source: https://docs.aws.amazon.com/keyspaces/latest/devguide/what-is-keyspaces.html#what-is-keyspaces
  - id: capacity-modes
    text: Amazon Keyspaces tables use on-demand capacity (pay per read and write, no planning) or provisioned capacity (set reads and writes per second for predictable traffic), and the mode can change once per day.
    source: https://docs.aws.amazon.com/keyspaces/latest/devguide/how-it-works.html
  - id: three-copies
    text: Amazon Keyspaces stores three copies of your data across multiple Availability Zones.
    source: https://docs.aws.amazon.com/keyspaces/latest/devguide/how-it-works.html
  - id: cql
    text: Applications reach Amazon Keyspaces through a service endpoint using Cassandra Query Language (CQL).
    source: https://docs.aws.amazon.com/keyspaces/latest/devguide/how-it-works.html
cards:
  - id: keyspaces-001
    q: A company runs Apache Cassandra on EC2 and wants a managed, serverless database that keeps its CQL code and drivers. Which AWS service fits?
    a: "**Amazon Keyspaces (for Apache Cassandra)**."
    facts: [what, same-code, cql]
  - id: keyspaces-002
    q: Which two capacity modes do Amazon Keyspaces tables offer, and when do you pick each?
    a: "- **On-demand**: unpredictable traffic, pay per request.\n- **Provisioned**: predictable traffic, set reads and writes per second."
    facts: [capacity-modes]
  - id: keyspaces-003
    q: How many copies of data does Amazon Keyspaces keep, and where?
    a: "Three copies across multiple Availability Zones."
    facts: [three-copies]
  - id: keyspaces-004
    q: A team wants to move a Cassandra workload to Amazon DynamoDB to avoid running servers. Which AWS service would avoid rewriting the CQL data access code?
    a: "Amazon Keyspaces, which is Cassandra-compatible; DynamoDB has its own API."
    trap: true
    facts: [same-code, cql]
---
Amazon Keyspaces is the managed home for Cassandra workloads: the same CQL, drivers and tools, with AWS handling servers, scaling and replication. [What is Amazon Keyspaces?](https://docs.aws.amazon.com/keyspaces/latest/devguide/what-is-keyspaces.html)

### How it works

1. Create a keyspace and tables with CQL or the console.
2. Pick on-demand or provisioned capacity per table.
3. Point existing Cassandra drivers at the Keyspaces endpoint.
4. Keyspaces keeps three copies across AZs and scales with traffic.

### Exam cues

- If the question says Apache Cassandra or CQL and managed or serverless, think Amazon Keyspaces.
- If the question says wide-column NoSQL with existing Cassandra code, think Keyspaces, not DynamoDB.

### Remember

- Cassandra-compatible, serverless, CQL.
- On-demand or provisioned capacity; switch once per day.
- Three copies across AZs.

> **Trap:** DynamoDB and Keyspaces are both serverless NoSQL. Only Keyspaces runs existing Cassandra code unchanged.
