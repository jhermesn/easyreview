---
title: RDS design choices and limits
level: associate
order: 100
facts:
  - id: multiaz-backup-latency
    text: "RDS Multi-AZ deployments can still experience elevated latency during automated backups; Multi-AZ is not a guarantee of a backup window without performance impact."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ManagingAutomatedBackups.html#USER_WorkingWithAutomatedBackups.BackupWindow
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
  - id: transactional-row-layout
    text: "Row-based data layouts suit transactional access that reads or changes complete records; columnar layouts suit analytical queries that scan selected columns."
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/perf03-bp04.html#implementation-guidance
  - id: vpc-change
    text: "An eligible RDS DB instance can move to another VPC by selecting a DB subnet group in the destination VPC; Multi-AZ instances and instances with read-replica relationships must first have those restrictions resolved."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.VPC2VPC.html
  - id: relational-tables
    text: "A relational database organizes records in table rows and their attributes in columns."
    source: https://aws.amazon.com/rds/what-is-a-relational-database/
  - id: key-value-selection
    text: "A key-value database associates a value with a unique key, and applications can retrieve the associated data by that key."
    source: https://aws.amazon.com/nosql/
  - id: multiple-databases
    text: "A single RDS DB instance can serve more than one logical database when its engine allows it."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.html
  - id: compute-storage-cost
    text: "Amazon RDS pricing includes DB instance compute capacity and provisioned storage; Provisioned IOPS storage also charges for the IOPS provisioned."
    source: https://aws.amazon.com/rds/pricing/
  - id: iam-auth-privileges
    text: "IAM database authentication controls who can connect as a database user; the privileges granted to that user inside the database still control what it can do."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html
  - id: iam-ec2-credentials
    text: "An application on EC2 can use its instance profile credentials with RDS IAM database authentication."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html#UsingWithRDS.IAMDBAuth
  - id: iam-mysql-plugin
    text: "RDS for MySQL uses AWSAuthenticationPlugin for database users configured for IAM authentication."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.MySQL
  - id: iam-tls
    text: "RDS IAM database authentication encrypts database network traffic using SSL or TLS."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html#UsingWithRDS.IAMDBAuth
  - id: iam-password
    text: "RDS can retain standard database authentication when IAM database authentication is enabled; for a PostgreSQL user granted rds_iam, IAM authentication takes precedence over password authentication."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html#UsingWithRDS.IAMDBAuth
cards:
  - id: rds-055
    q: "Does an Amazon RDS Multi-AZ deployment guarantee no performance impact during automated backups?"
    a: "No. Multi-AZ deployments can still experience elevated latency during automated backups. Account for backup activity when planning workload performance."
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
  - id: rds-089
    q: "A team is choosing a data layout for a transactional database on Amazon RDS that frequently accesses complete records. Which layout fits?"
    a: "A row-based layout. Transactional access to whole records suits rows; large analytical scans of selected fields suit a columnar layout."
    facts: [transactional-row-layout]
  - id: rds-095
    q: "Can an Amazon RDS DB instance be moved to a different VPC by changing its DB subnet group?"
    a: "Yes, when eligible. Use a subnet group in the destination VPC; first resolve restrictions such as Multi-AZ deployment or read-replica relationships."
    facts: [vpc-change]
  - id: rds-099
    q: "An application being evaluated for Amazon RDS organizes records with consistent attributes and relationships between tables. Which database model fits?"
    a: "The relational model. Records are rows, attributes are columns, and tables can be related."
    facts: [relational-tables]
  - id: rds-101
    q: "A team comparing Amazon RDS with a key-value database only needs to look up an object by its unique identifier. Which access model matches that requirement?"
    a: "Key-value access. The unique key identifies the associated value to retrieve."
    facts: [key-value-selection]
  - id: rds-103
    q: "A team planning Amazon RDS capacity has several logical databases. Does every logical database require a separate DB instance?"
    a: "No. A DB instance can contain multiple user-created databases, subject to its engine's capabilities."
    facts: [multiple-databases]
  - id: rds-104
    q: "A team estimates Amazon RDS cost for a database using Provisioned IOPS SSD storage. Which capacity charges should it include?"
    a: "DB instance compute capacity, provisioned storage and provisioned IOPS. Size each for the workload requirements."
    facts: [compute-storage-cost]
  - id: rds-105
    q: "An application connects to Amazon RDS for MySQL with IAM database authentication. Does the IAM policy decide which tables it can read?"
    a: "No. IAM decides who can connect as the database user; database privileges (GRANT, REVOKE) decide what that user can do."
    trap: true
    facts: [iam-auth-privileges]
  - id: rds-113
    q: "How can an EC2 application authenticate to an RDS database with IAM?"
    a: "Use its EC2 instance profile credentials to obtain an IAM database authentication token."
    facts: [iam-ec2-credentials]
  - id: rds-114
    q: "Which plugin authenticates an IAM-enabled RDS for MySQL database user?"
    a: "AWSAuthenticationPlugin."
    facts: [iam-mysql-plugin]
  - id: rds-116
    q: "How does an Amazon RDS IAM database authentication connection protect traffic?"
    a: "It uses SSL or TLS to encrypt network traffic."
    facts: [iam-tls]
  - id: rds-122
    q: "Can an Amazon RDS database still use standard authentication after IAM database authentication is enabled?"
    a: "Yes. Users can keep signing in with passwords.\nOn PostgreSQL, a user granted `rds_iam` must use IAM: it takes precedence over that user's password."
    facts: [iam-password]
---
RDS design choices affect database access, availability and operations. These details help you choose how clients connect and what to expect from backups, failover and stopped instances.

### How it works

1. A Multi-AZ DB instance uses a synchronous standby. Automated backups can still cause elevated latency; Multi-AZ does not guarantee a backup window without performance impact. RDS Custom for Oracle and SQL Server also support a synchronous standby in another Availability Zone, but require prerequisites.
2. For MariaDB, MySQL and PostgreSQL, IAM database authentication lets clients use a short-lived token instead of a password.
3. Every DB instance has a private IP address in its VPC, a private virtual network. To make an instance publicly accessible, every subnet in its DB subnet group must be public, and the VPC must have DNS hostnames and DNS resolution enabled. See working with a DB instance in a VPC.
4. RDS Proxy must be in the database's VPC and cannot be public. During failover, most client connections remain open, but connections in the middle of a transaction or SQL statement are canceled. The proxy accepts new connections immediately.
5. A stopped DB instance starts automatically after its maximum stop period, so it does not miss required maintenance.
6. For data modeling, relational tables store records as rows and attributes as columns. Row layouts suit transactions that touch complete records. Key-value access suits looking up a value by its key.
7. A DB instance can host multiple logical databases, depending on its engine. Estimate instance compute, provisioned storage and any provisioned IOPS separately.
8. An eligible instance can change VPCs through a destination DB subnet group, after resolving Multi-AZ and replica restrictions.

### Exam cues

- If the question says retain standard authentication after enabling RDS IAM authentication, think user-specific authentication, because PostgreSQL users granted rds_iam must use IAM.
- If the question says protect traffic for an RDS IAM database authentication connection, think SSL or TLS, because IAM database authentication encrypts database traffic.
- If the question says configure an RDS for MySQL database user for IAM authentication, think AWSAuthenticationPlugin, because it authenticates that user through IAM.
- If the question says an EC2 application needs IAM database authentication to RDS, think instance profile credentials, because they can be used to access the database.
- If the question says avoid storing a database password for a PostgreSQL client, think IAM database authentication, because it uses a token.
- If the question says public access is enabled but the DB subnet group contains private subnets, think subnet configuration, because every subnet in the group must be public.
- If the question says RDS Custom needs a standby, think Multi-AZ and its prerequisites, because RDS Custom runs inside your account.
- If the question says a proxy client was executing a transaction during failover, think canceled connection, because in-flight work is interrupted.
- If the question says a test instance should remain stopped indefinitely, think automatic restart, because RDS limits the stop period.

### Remember

- IAM authentication tokens last 15 minutes.
- A DB instance can remain stopped for at most 7 consecutive days.
- RDS for MySQL supports up to 15 read replicas per source DB instance in the same Region.
- RDS Custom for Oracle support ends March 31, 2027; its console and resources cannot be accessed afterward.
- IAM database authentication decides who connects; database privileges decide what that user can do.

> **Trap:** Public access on a DB instance does not make RDS Proxy public. The proxy remains private even when its database is publicly accessible.
