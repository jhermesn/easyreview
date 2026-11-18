---
title: "PLACEHOLDER rds/design-details"
level: associate
order: 100
facts:
  - id: multiaz-backup-latency
    text: "Synchronous replication to a Multi-AZ standby also minimizes latency spikes on the primary during system backups."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html#Concepts.MultiAZSingleStandby
  - id: iam-auth
    text: IAM database authentication works with RDS for MariaDB, MySQL and PostgreSQL; clients connect with an authentication token that lasts 15 minutes instead of a password.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html#UsingWithRDS.IAMDBAuth
  - id: public-access
    text: "Every DB instance has a private IP address in its VPC. To make it publicly accessible, every subnet in its DB subnet group must be public and the VPC needs DNS hostnames and DNS resolution turned on."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html
  - id: custom-multiaz
    text: "RDS Custom for Oracle and RDS Custom for SQL Server support Multi-AZ deployments with a synchronous standby in another AZ; unlike regular RDS Multi-AZ, they need prerequisites set up first because RDS Custom runs inside your account."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/custom-sqlserver-multiaz.html#custom-sqlserver-multiaz
  - id: custom-oracle-eos
    text: "AWS will end support for RDS Custom for Oracle on March 31, 2027, after which its console and resources can no longer be accessed (noted November 2026)."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/custom-oracle-multiaz.html#custom-oracle-multiaz
  - id: stop-seven-days
    text: "An RDS DB instance can be stopped for at most 7 consecutive days; after that RDS starts it automatically so it does not miss required maintenance."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_StopInstance.html#USER_StopInstance
  - id: proxy-private
    text: "RDS Proxy must be in the same VPC as the database and cannot be publicly accessible, even when the database is."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html#rds-proxy.limitations
  - id: failover-cancel
    text: "During a failover, most client connections through RDS Proxy stay open; only connections in the middle of a transaction or SQL statement are canceled, and the proxy accepts new connections immediately."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.howitworks.html
  - id: replica-count
    text: "RDS for MySQL supports up to 15 read replicas per source DB instance in the same Region."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_MySQL.Replication.ReadReplicas.html
cards:
  - id: rds-055
    q: "Besides failover, what does a Multi-AZ DB instance deployment improve during the daily backup window?"
    a: "It minimizes latency spikes on the primary during backups, because of the synchronous standby. Multi-AZ still does not serve reads."
    facts: [multiaz-backup-latency]
  - id: rds-050
    q: A Lambda function must connect to RDS for PostgreSQL without storing a database password. Which feature fits?
    a: "IAM database authentication: the function's role generates a 15-minute token used instead of a password."
    facts: [iam-auth]
  - id: rds-076
    q: "An RDS DB instance was created with Public access set to Yes, but its DB subnet group contains private subnets. Can clients on the internet reach it?"
    a: "No. **Every** subnet in the DB subnet group must be public for a publicly accessible DB instance, and the VPC needs DNS hostnames and DNS resolution turned on."
    trap: true
    facts: [public-access]
  - id: rds-056
    q: "A legacy Oracle application needs OS-level customization of the database host and higher availability. Which managed option fits?"
    a: "RDS Custom for Oracle with a Multi-AZ deployment. Regular RDS for Oracle gives no OS access, and EC2 leaves all failover work to the team. Note that AWS ends support for RDS Custom for Oracle on March 31, 2027."
    facts: [custom-multiaz, custom-oracle-eos]
  - id: rds-066
    q: "A test database on RDS is used two days a week. Can the team simply keep it stopped between tests?"
    a: "Only for up to 7 consecutive days; RDS then starts it automatically. For longer idle periods, take a snapshot and delete the instance, then restore when needed."
    trap: true
    facts: [stop-seven-days]
  - id: rds-072
    q: "Can a client on the internet connect straight to an RDS Proxy endpoint?"
    a: "No. RDS Proxy is never publicly accessible; clients reach it from inside the VPC or through connected networks."
    trap: true
    facts: [proxy-private]
  - id: rds-082
    q: "An application connects to Aurora through RDS Proxy. During a writer failover, which client connections are affected?"
    a: "Only connections **in the middle of a transaction or SQL statement** are canceled. Idle connections stay open and the proxy accepts new ones immediately, so the app must retry interrupted work."
    facts: [failover-cancel]
  - id: rds-081
    q: "How many same-Region read replicas can one RDS for MySQL source DB instance have?"
    a: "Up to **15**. Size each replica like the source, and scale replicas when you scale the source."
    facts: [replica-count]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
