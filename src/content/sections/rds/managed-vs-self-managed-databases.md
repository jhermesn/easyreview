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

> **Trap:** A managed database doesn't make AWS responsible for your data or access. The customer still controls who can connect and what is stored.
