---
title: Managed vs self-managed databases
level: foundational
order: 1
facts:
  - id: rds
    text: Amazon RDS is a managed service that makes it easier to set up, operate and scale a relational database and manages common database administration tasks.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome
  - id: engines
    text: Amazon RDS supports IBM Db2, MariaDB, Microsoft SQL Server, MySQL, Oracle Database and PostgreSQL.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome.Concepts.on-prem
  - id: rds-manages
    text: Amazon RDS manages backups, software patching, automatic failure detection and recovery, and offers high availability with a synchronous secondary instance and read replicas for read scaling.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome.Concepts.on-prem
  - id: comparison
    text: On premises the customer manages everything; on Amazon EC2, AWS manages server maintenance, hardware lifecycle and power, network and cooling; with Amazon RDS, AWS also manages scaling, high availability, backups, database and OS patching and installation, while the customer still optimizes the application.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome.Concepts.comparison
  - id: default-choice
    text: AWS recommends Amazon RDS as the default for most relational databases; running a database on EC2 means more time managing software and more risk of user error, for example when patching manually.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome.Concepts.comparison
  - id: rds-custom
    text: Amazon RDS Custom gives database administrators access to customize the database environment and operating system for legacy, custom and packaged applications, while automating administration tasks.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-custom.html#rds-custom
  - id: nosql-types
    text: Key-value (DynamoDB), document (DocumentDB) and graph (Neptune) databases are NoSQL, non-relational databases.
    source: https://aws.amazon.com/nosql/
  - id: reserved-db
    text: RDS reserved DB instances give a discount for a one-year or three-year term, with No Upfront, Partial Upfront or All Upfront payment.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithReservedDBInstances.html
  - id: custom-multiaz
    text: "RDS Custom for Oracle and RDS Custom for SQL Server support Multi-AZ deployments with a synchronous standby in another AZ; unlike regular RDS Multi-AZ, they need prerequisites set up first because RDS Custom runs inside your account."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/custom-sqlserver-multiaz.html#custom-sqlserver-multiaz
  - id: custom-oracle-eos
    text: "AWS will end support for RDS Custom for Oracle on March 31, 2027, after which its console and resources can no longer be accessed (noted November 2026)."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/custom-oracle-multiaz.html#custom-oracle-multiaz
  - id: oracle-byol
    text: "RDS for Oracle offers two licensing models, License Included and Bring Your Own License (BYOL), and you can switch between them by modifying the DB instance."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Oracle.Concepts.Licensing.html#Oracle.Concepts.Licensing
  - id: timestream
    text: "Amazon Timestream is the purpose-built time series database; Timestream for LiveAnalytics is serverless with a memory store for recent data and a magnetic store for history, and Timestream for InfluxDB runs managed InfluxDB."
    source: https://docs.aws.amazon.com/timestream/latest/developerguide/what-is-timestream.html#what-is-timestream
  - id: timestream-closed
    text: "Amazon Timestream for LiveAnalytics closed to new customers on June 20, 2025; AWS points new workloads to Timestream for InfluxDB."
    source: https://docs.aws.amazon.com/timestream/latest/developerguide/AmazonTimestreamForLiveAnalytics-availability-change.html#AmazonTimestreamForLiveAnalytics-availability-change
  - id: managed-blockchain
    text: "Amazon Managed Blockchain provides Ethereum and Bitcoin public nodes and private Hyperledger Fabric networks; it stopped accepting new customers on October 29, 2026, and existing customers lose access after September 29, 2027."
    source: https://docs.aws.amazon.com/managed-blockchain/latest/hyperledger-fabric-dev/what-is-managed-blockchain.html#what-is-managed-blockchain
  - id: stop-seven-days
    text: "An RDS DB instance can be stopped for at most 7 consecutive days; after that RDS starts it automatically so it does not miss required maintenance."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_StopInstance.html#USER_StopInstance
cards:
  - id: rds-041
    q: What does Amazon RDS manage that a database on Amazon EC2 leaves to the customer?
    a: Database and OS installation and patching, backups, scaling, high availability, and failure detection and recovery.
    facts: [rds-manages, comparison]
  - id: rds-042
    q: A team wants a relational MySQL database without patching or backing it up themselves. Should they run it on EC2 or Amazon RDS?
    a: Amazon RDS, which AWS recommends as the default for relational databases.
    facts: [default-choice, rds-manages]
  - id: rds-043
    q: When does running a database yourself on Amazon EC2 make sense instead of Amazon RDS?
    a: When you need full control of the operating system or database software, or an engine RDS doesn't support. RDS Custom is the managed option when you need OS access for some engines.
    facts: [comparison, rds-custom, engines]
  - id: rds-044
    q: Which database engines does Amazon RDS support (besides Aurora)?
    a: IBM Db2, MariaDB, Microsoft SQL Server, MySQL, Oracle Database and PostgreSQL.
    facts: [engines]
  - id: rds-045
    q: With Amazon RDS, does AWS optimize the customer's application queries?
    a: No. Application optimization stays with the customer on premises, on EC2 and on RDS.
    trap: true
    facts: [comparison]
  - id: rds-046
    q: "Which of these AWS databases are NoSQL: Amazon DynamoDB, Amazon Neptune, Amazon DocumentDB, Amazon Aurora?"
    a: DynamoDB (key-value), Neptune (graph) and DocumentDB (document). Aurora is relational.
    facts: [nosql-types]
  - id: rds-047
    q: A company runs an Amazon RDS database around the clock for the next three years. How can it lower the instance cost?
    a: Buy RDS reserved DB instances for a three-year term (No, Partial or All Upfront).
    facts: [reserved-db]
  - id: rds-056
    q: "A legacy Oracle application needs OS-level customization of the database host and higher availability. Which managed option fits?"
    a: "RDS Custom for Oracle with a Multi-AZ deployment. Regular RDS for Oracle gives no OS access, and EC2 leaves all failover work to the team. Note that AWS ends support for RDS Custom for Oracle on March 31, 2027."
    facts: [custom-multiaz, custom-oracle-eos]
  - id: rds-057
    q: "An RDS production database will run for years. How can its instance cost drop?"
    a: "Buy RDS reserved DB instances for a one- or three-year term. They are a billing discount applied to matching DB instances."
    facts: [reserved-db]
  - id: rds-058
    q: "Which RDS engine lets a company bring its own existing database licenses?"
    a: "RDS for Oracle, which offers Bring Your Own License as well as License Included."
    facts: [oracle-byol]
  - id: rds-059
    q: "IoT sensors write trillions of timestamped readings a day that must be queried by time window. Which AWS database family fits, and which option takes new customers?"
    a: "Amazon Timestream, the time series database. Timestream for LiveAnalytics closed to new customers on June 20, 2025, so new workloads use Timestream for InfluxDB."
    facts: [timestream, timestream-closed]
  - id: rds-060
    q: "Which AWS service offered managed Hyperledger Fabric networks and Ethereum nodes, and what is its status?"
    a: "Amazon Managed Blockchain. It stopped accepting new customers on October 29, 2026, and access ends after September 29, 2027."
    facts: [managed-blockchain]
  - id: rds-066
    q: "A test database on RDS is used two days a week. Can the team simply keep it stopped between tests?"
    a: "Only for up to 7 consecutive days; RDS then starts it automatically. For longer idle periods, take a snapshot and delete the instance, then restore when needed."
    trap: true
    facts: [stop-seven-days]
---
A database can run on servers you manage or as a managed AWS service. Amazon RDS runs relational databases for you: AWS installs, patches, backs up and scales them, and you focus on the data and the application. [What is Amazon RDS?](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome)

### How it works

| Task | On premises | Amazon EC2 | Amazon RDS |
|---|---|---|---|
| Application optimization | Customer | Customer | Customer |
| Scaling, high availability, backups | Customer | Customer | AWS |
| Database and OS patching and installation | Customer | Customer | AWS |
| Server maintenance, hardware, power, network, cooling | Customer | AWS | AWS |

1. Choose Amazon RDS by default for relational databases. [Comparison of responsibilities](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome.Concepts.comparison)
2. Choose EC2 when you need full control of the OS or database software, or an unsupported engine.
3. Choose Amazon RDS Custom when an application needs OS access but you still want automation. [RDS Custom](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-custom.html#rds-custom)

AWS also offers purpose-built databases:

| Type | Service |
|---|---|
| Relational | Amazon RDS, Amazon Aurora |
| Key-value NoSQL | Amazon DynamoDB |
| In-memory | Amazon ElastiCache |
| Document | Amazon DocumentDB |
| Graph | Amazon Neptune |

### Exam cues

- If the question says reduce database administration, think a managed database such as Amazon RDS.
- If the question says full control of the OS or custom database software, think EC2 (or RDS Custom).

### Remember

- RDS engines: Db2, MariaDB, SQL Server, MySQL, Oracle, PostgreSQL; plus Aurora.
- RDS handles backups, patching, failover and read replicas.
- NoSQL: DynamoDB, DocumentDB, Neptune. Relational: RDS, Aurora.

> **Trap:** A managed database doesn't make AWS responsible for your data or access. The customer still controls who can connect and what is stored.
