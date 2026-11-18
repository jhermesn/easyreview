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
    q: "Which AWS service offered managed Hyperledger Fabric networks and Ethereum nodes, and what is its status?"
    a: "Amazon Managed Blockchain. It stopped accepting new customers on October 29, 2026, and access ends after September 29, 2027."
    facts: [managed-blockchain]
  - id: rds-067
    q: "A DBA must install a third-party agent on the host of a managed SQL Server database. Which service allows it, and what should the DBA do first?"
    a: "RDS Custom for SQL Server. Pause RDS Custom automation for the duration of the change so recovery automation does not act on it."
    facts: [custom-engines, custom-pause]
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
