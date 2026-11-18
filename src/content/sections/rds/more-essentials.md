---
title: "PLACEHOLDER rds/more-essentials"
level: foundational
order: 80
facts:
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
  - id: engines
    text: Amazon RDS supports IBM Db2, MariaDB, Microsoft SQL Server, MySQL, Oracle Database and PostgreSQL.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome.Concepts.on-prem
  - id: reserved-db
    text: RDS reserved DB instances give a discount for a one-year or three-year term, with No Upfront, Partial Upfront or All Upfront payment.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithReservedDBInstances.html
  - id: oracle-byol
    text: "RDS for Oracle offers two licensing models, License Included and Bring Your Own License (BYOL), and you can switch between them by modifying the DB instance."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Oracle.Concepts.Licensing.html#Oracle.Concepts.Licensing
  - id: timestream
    text: "Amazon Timestream is the purpose-built time series database; Timestream for LiveAnalytics is serverless with a memory store for recent data and a magnetic store for history, and Timestream for InfluxDB runs managed InfluxDB."
    source: https://docs.aws.amazon.com/timestream/latest/developerguide/what-is-timestream.html#what-is-timestream
  - id: timestream-closed
    text: "Amazon Timestream for LiveAnalytics closed to new customers on June 20, 2025; AWS points new workloads to Timestream for InfluxDB."
    source: https://docs.aws.amazon.com/timestream/latest/developerguide/AmazonTimestreamForLiveAnalytics-availability-change.html#AmazonTimestreamForLiveAnalytics-availability-change
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
  - id: rds-047
    q: A company runs an Amazon RDS database around the clock for the next three years. How can it lower the instance cost?
    a: Buy RDS reserved DB instances for a three-year term (No, Partial or All Upfront).
    facts: [reserved-db]
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
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
