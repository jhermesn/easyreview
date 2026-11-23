---
title: "Database choices and costs"
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
  - id: sql-server-byom
    text: "RDS for SQL Server Bring Your Own Media supports existing SQL Server licenses with active Software Assurance and License Mobility."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/sqlserver-byom.html
  - id: stopped-billing
    text: "A stopped RDS DB instance has no DB instance-hour charges, while provisioned storage and backup storage remain chargeable."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_StopInstance.html#USER_StopInstance.Operation.characteristics
  - id: snapshot-restore
    text: "An RDS manual DB snapshot captures a database instance backup that can be restored to a new DB instance."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/gettingstartedguide/managing-backup-restore.html#manual-snapshots
  - id: modify-class
    text: "Changing an RDS DB instance class is a DB instance modification."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ModifyInstance.Settings.html
  - id: running-billing
    text: "RDS on-demand DB instance billing starts when the instance is available and is based on its instance class."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_OnDemandDBInstances.html#USER_OnDemandDBInstances
  - id: storage-autoscaling
    text: "RDS storage autoscaling increases allocated storage when its configured conditions are met."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html#USER_PIOPS.Autoscaling
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
    q: "A company needs a managed relational database that supports PostgreSQL. Which AWS service can it choose?"
    a: "Amazon RDS supports PostgreSQL and manages tasks such as backups and software patching."
    facts: [engines, rds-manages]
  - id: rds-106
    q: "How can a company use eligible existing SQL Server licenses with Amazon RDS?"
    a: "Use Bring Your Own Media with the required active Software Assurance and License Mobility."
    facts: [sql-server-byom]
  - id: rds-107
    q: "What charges remain when a supported Amazon RDS DB instance is stopped?"
    a: "Provisioned storage and backup storage remain chargeable; DB instance-hour charges stop."
    facts: [stopped-billing]
  - id: rds-108
    q: "How can a team restore an Amazon RDS database from a manual backup?"
    a: "Restore the manual DB snapshot to a new DB instance."
    facts: [snapshot-restore]
  - id: rds-110
    q: "How can a team change the compute capacity of an Amazon RDS DB instance?"
    a: "Modify the DB instance and select a different instance class."
    facts: [modify-class]
  - id: rds-119
    q: "Does an available but idle on-demand Amazon RDS DB instance incur instance charges?"
    a: "Yes. Billing starts when the instance is available."
    facts: [running-billing]
  - id: rds-120
    q: "What does Amazon RDS storage autoscaling increase?"
    a: "Allocated storage, when the autoscaling conditions are met."
    facts: [storage-autoscaling]
---
Amazon RDS manages common database tasks, so teams can run relational databases with less administration. Choosing between RDS and a database on Amazon EC2 depends on how much control the application needs.

### How it works

1. Choose RDS for a supported relational engine when you want AWS to handle installation, patching, backups, scaling and availability. The customer still optimizes the application.
2. Consider EC2 when you need full control of the operating system or database software, or an engine RDS does not support. RDS Custom offers database and operating system customization while automating administration tasks.
3. For a long-running RDS database, consider a reserved DB instance for a discount. For RDS for Oracle, choose License Included or Bring Your Own License (BYOL). Reserved DB instances, Oracle licensing

### Exam cues

- If the question says automatically increase RDS disk space, think storage autoscaling, because it grows allocated storage when conditions are met.
- If the question says an RDS instance is available but idle, think instance charges, because billing begins when the instance is available.
- If the question says increase RDS instance compute capacity, think modify the DB instance class, because storage autoscaling changes allocated storage.
- If the question says keep an RDS database backup for later recovery, think a manual DB snapshot, because it can restore a new DB instance.
- If the question says reduce compute charges for an idle supported RDS instance, think stopping it, because instance-hour charges stop while storage and backup charges remain.
- If the question says use eligible existing SQL Server licenses with Amazon RDS, think Bring Your Own Media, because it uses License Mobility through Software Assurance.
- If the question says a MySQL database needs less patching and backup work, think RDS because it manages those tasks.
- If the question says an existing Oracle license should be used, think RDS for Oracle BYOL because it offers that licensing model.
- If the question says timestamped sensor readings, think Amazon Timestream for time series data. New customers should evaluate Timestream for InfluxDB because LiveAnalytics is closed to them. Timestream, availability change

### Remember

- RDS supports IBM Db2, MariaDB, Microsoft SQL Server, MySQL, Oracle Database and PostgreSQL.
- Reserved DB instances offer one-year or three-year terms, with No Upfront, Partial Upfront or All Upfront payment.
- Timestream for LiveAnalytics closed to new customers on June 20, 2025.

> **Trap:** RDS manages database tasks, but the customer still optimizes the application.
