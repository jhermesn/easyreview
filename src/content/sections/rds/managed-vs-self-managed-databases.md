---
title: Managed vs self-managed databases
level: foundational
order: 1
facts:
  - id: rds
    text: Amazon RDS is a managed service that makes it easier to set up, operate and scale a relational database and manages common database administration tasks.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome
  - id: rds-custom
    text: Amazon RDS Custom gives database administrators access to customize the database environment and operating system for legacy, custom and packaged applications, while automating administration tasks.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-custom.html#rds-custom
  - id: nosql-types
    text: Key-value (DynamoDB), document (DocumentDB) and graph (Neptune) databases are NoSQL, non-relational databases.
    source: https://aws.amazon.com/nosql/
  - id: timestream
    text: "Amazon Timestream is the purpose-built time series database; Timestream for LiveAnalytics is serverless with a memory store for recent data and a magnetic store for history, and Timestream for InfluxDB runs managed InfluxDB."
    source: https://docs.aws.amazon.com/timestream/latest/developerguide/what-is-timestream.html#what-is-timestream
  - id: timestream-closed
    text: "Amazon Timestream for LiveAnalytics closed to new customers on June 20, 2025; AWS points new workloads to Timestream for InfluxDB."
    source: https://docs.aws.amazon.com/timestream/latest/developerguide/AmazonTimestreamForLiveAnalytics-availability-change.html#AmazonTimestreamForLiveAnalytics-availability-change
  - id: managed-blockchain
    text: "Amazon Managed Blockchain provides Ethereum and Bitcoin public nodes and private Hyperledger Fabric networks; it stopped accepting new customers on October 29, 2026, and existing customers lose access after September 29, 2027."
    source: https://docs.aws.amazon.com/managed-blockchain/latest/hyperledger-fabric-dev/what-is-managed-blockchain.html#what-is-managed-blockchain
  - id: custom-engines
    text: "RDS Custom exists for Oracle and SQL Server and grants privileged access to the database and the host operating system."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-custom.html#rds-custom
  - id: custom-pause
    text: "Before customizing an RDS Custom host, pause RDS Custom automation for a set period so monitoring and instance recovery do not interfere; it resumes when the pause ends."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/custom-managing-sqlserver.pausing.html#custom-managing-sqlserver.pausing
  - id: per-second-billing
    text: "RDS instance usage is billed in one-second increments with a 10-minute minimum."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_OnDemandDBInstances.html
cards:
  - id: rds-046
    q: "Which of these AWS databases are NoSQL: Amazon DynamoDB, Amazon Neptune, Amazon DocumentDB, Amazon Aurora?"
    a: DynamoDB (key-value), Neptune (graph) and DocumentDB (document). Aurora is relational.
    facts: [nosql-types]
  - id: rds-060
    q: "Which managed AWS service helps a company run a relational database without handling routine database administration?"
    a: "Amazon RDS. It helps set up, operate and scale relational databases and manages common administration tasks."
    facts: [rds]
  - id: rds-067
    q: "A company needs a managed relational database but also needs to customize its operating system for a legacy application. Which Amazon RDS option fits?"
    a: "Amazon RDS Custom provides access to customize the database environment and operating system while automating administration tasks."
    facts: [rds-custom]
---
AWS offers managed services for relational databases, NoSQL databases and blockchain networks. Amazon RDS handles common administration tasks for relational databases, while RDS Custom allows access to the database environment and operating system.

### How it works

1. Choose a database type for the data: relational databases include Amazon RDS and Amazon Aurora; NoSQL databases include key-value, document and graph databases. Amazon RDS, NoSQL databases
2. Use Amazon RDS Custom when a managed database needs customization of its database environment or operating system.
3. Before customizing an RDS Custom for SQL Server host, pause automation for the change so monitoring and recovery do not interfere. Automation resumes when the pause ends.

Examples of database types:

| Type | Service |
|---|---|
| Relational | Amazon RDS, Amazon Aurora |
| Key-value NoSQL | Amazon DynamoDB |
| Document | Amazon DocumentDB |
| Graph | Amazon Neptune |

### Exam cues

- If the question says key-value, document or graph database, think NoSQL: DynamoDB, DocumentDB or Neptune, respectively.
- If the question says install an agent on a managed SQL Server host, think RDS Custom for SQL Server and pause automation before the change.
- If the question says managed Hyperledger Fabric networks or Ethereum nodes, think Amazon Managed Blockchain.

### Remember

- NoSQL: DynamoDB, DocumentDB, Neptune. Relational: RDS, Aurora.
- Amazon Managed Blockchain stopped accepting new customers on October 29, 2026; access ends after September 29, 2027.

> **Trap:** Aurora is relational, while DynamoDB, DocumentDB and Neptune are NoSQL databases.
