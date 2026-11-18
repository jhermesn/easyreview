---
title: Encryption, authentication and maintenance
level: associate
order: 70
facts:
  - id: kms
    text: Amazon RDS encrypts DB instances at rest with an AWS KMS key, either the AWS managed key for RDS (the default) or a customer managed key you choose when creating the instance.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html#Overview.Encryption.Overview
  - id: encrypt-existing
    text: To encrypt an unencrypted RDS DB instance or change its KMS key, copy a manual snapshot with encryption enabled and restore it, or use a blue/green deployment with an encrypted green environment.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html#Overview.Encryption.Limitations
  - id: key-fixed
    text: Once an encrypted RDS DB instance exists, you can't change the KMS key it uses.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html#Overview.Encryption.Limitations
  - id: share-cmk
    text: An RDS snapshot encrypted with the account's default AWS managed key can't be shared; copy it with a customer managed key, share that copy, and give the target account access to the key.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/share-encrypted-snapshot.html#share-encrypted-snapshot
  - id: share-public
    text: Encrypted RDS snapshots can't be shared publicly.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/share-encrypted-snapshot.html#share-encrypted-snapshot
  - id: tls
    text: SSL/TLS connections encrypt data moving between a client and an RDS DB instance and can verify the server's identity with its certificate.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html#UsingWithRDS.SSL
  - id: iam-auth
    text: IAM database authentication works with RDS for MariaDB, MySQL and PostgreSQL; clients connect with an authentication token that lasts 15 minutes instead of a password.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html#UsingWithRDS.IAMDBAuth
  - id: maz-os
    text: In a Multi-AZ deployment, RDS applies operating system updates to the standby first, promotes it to primary, then updates the old primary, which becomes the new standby.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Maintenance.html#USER_UpgradeDBInstance.Maintenance.Multi-AZ
  - id: maz-engine
    text: A database engine upgrade on a Multi-AZ RDS instance modifies the primary and standby at the same time, so the database is unavailable until the upgrade finishes.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Maintenance.html#USER_UpgradeDBInstance.Maintenance.Multi-AZ
  - id: force-ssl
    text: "To require encrypted connections, set rds.force_ssl to 1 for RDS for SQL Server (a static parameter, so reboot) or require_secure_transport to ON for RDS for MySQL (no reboot needed) in the DB parameter group."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/SQLServer.Concepts.General.SSL.Using.html#SQLServer.Concepts.General.SSL.Forcing
  - id: replica-encryption
    text: "A read replica has the same encryption state as its source: an unencrypted instance cannot have an encrypted replica, and an encrypted one cannot have an unencrypted replica."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html#Overview.Encryption.Limitations
  - id: log-export
    text: "RDS can publish database logs, such as the MySQL audit, error, general and slow query logs, to CloudWatch Logs, where they are kept until a retention period is set."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Procedural.UploadtoCloudWatch.html#rds-integration-cw-logs
  - id: public-access
    text: "Every DB instance has a private IP address in its VPC. To make it publicly accessible, every subnet in its DB subnet group must be public and the VPC needs DNS hostnames and DNS resolution turned on."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html
  - id: auto-minor-upgrade
    text: "RDS major version upgrades are always started manually; minor version upgrades can be applied manually or automatically by turning on Auto minor version upgrade."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html
  - id: tde
    text: "RDS for Oracle and RDS for SQL Server also support Transparent Data Encryption (TDE), an engine feature with its own keys that can run alongside RDS encryption at rest."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html
  - id: cross-region-key
    text: "KMS keys belong to one Region, so copying an encrypted DB snapshot or creating an encrypted read replica in another Region requires a KMS key in the destination Region."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html
  - id: encryption-scope
    text: "RDS encryption at rest covers the DB instance storage plus its logs, automated backups, read replicas and snapshots."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html
cards:
  - id: rds-048
    q: A production RDS for MySQL instance was created without encryption. Compliance now requires encryption at rest. What is the supported path?
    a: "Take a manual snapshot, copy it with encryption enabled (KMS key), restore a new instance from it, and switch over.\nA blue/green deployment with an encrypted green environment also works."
    trap: true
    facts: [encrypt-existing, kms]
  - id: rds-049
    q: An encrypted RDS snapshot must be shared with another AWS account, but sharing fails. The snapshot uses the default aws/rds key. What fixes it?
    a: "Copy the snapshot with a customer managed KMS key, share the copy, and grant the other account use of that key."
    facts: [share-cmk]
  - id: rds-051
    q: How does a Multi-AZ RDS deployment reduce downtime during operating system maintenance?
    a: "RDS patches the standby, fails over to it, then patches the old primary, which becomes the standby."
    facts: [maz-os]
  - id: rds-052
    q: A team expects a database engine version upgrade on a Multi-AZ RDS instance to cause no downtime. Is that right?
    a: "No. Engine upgrades modify primary and standby together, so the database is down until the upgrade completes."
    trap: true
    facts: [maz-engine]
  - id: rds-053
    q: Can you switch an existing encrypted RDS instance to a different KMS key in place?
    a: "No. The key is fixed; copy a snapshot with the new key and restore, or use blue/green."
    facts: [key-fixed, encrypt-existing]
  - id: rds-054
    q: Which mechanism encrypts data in transit between an application and an Amazon RDS database?
    a: "SSL/TLS connections to the DB instance."
    facts: [tls]
  - id: rds-065
    q: "All connections to an RDS for SQL Server instance must use SSL. Which setting enforces it?"
    a: "Set rds.force_ssl to 1 in its DB parameter group and reboot, because the parameter is static. (For RDS for MySQL the parameter is require_secure_transport.)"
    facts: [force-ssl]
  - id: rds-070
    q: "Can you create an encrypted read replica to get an encrypted copy of an unencrypted RDS instance?"
    a: "No. A replica follows the source encryption state. Encrypt a snapshot copy and restore it, or use a blue/green deployment."
    trap: true
    facts: [replica-encryption]
  - id: rds-071
    q: "Auditors need RDS for MySQL audit logs searchable and retained for a year. What do you configure?"
    a: "Publish the audit log to CloudWatch Logs and set the log group retention to a year."
    facts: [log-export]
  - id: rds-077
    q: "A company runs RDS for SQL Server and its auditors require the database engine itself to encrypt data files. Which feature fits?"
    a: "**Transparent Data Encryption (TDE)**, available on RDS for Oracle and RDS for SQL Server.\nIt uses its own keys and can run alongside RDS encryption at rest."
    facts: [tde]
  - id: rds-078
    q: "Copying an encrypted RDS snapshot from us-east-1 to eu-west-1 fails when the team selects the source KMS key. What is required?"
    a: "A **KMS key in the destination Region** (eu-west-1). KMS keys are Regional, so a cross-Region copy or encrypted read replica must use a key from the target Region."
    facts: [cross-region-key]
  - id: rds-083
    q: "An RDS DB instance is encrypted at rest with KMS. Which related data is also encrypted?"
    a: "Its **logs, automated backups, read replicas and snapshots**, along with the instance storage."
    facts: [encryption-scope]
---
RDS security comes down to three questions: is data encrypted at rest (decided at creation), is the connection encrypted (SSL/TLS), and how do clients authenticate (passwords or IAM tokens). Maintenance behavior on Multi-AZ is the other common exam topic. [Encrypting Amazon RDS resources](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html)

### How it works

1. Choose encryption and a KMS key when creating the instance.
2. To fix an unencrypted instance: snapshot, encrypted copy, restore (or blue/green).
3. To share an encrypted snapshot: it must use a customer managed key shared with the target account.
4. Clients use SSL/TLS in transit and, for MariaDB, MySQL and PostgreSQL, optional IAM authentication tokens.

| Maintenance on Multi-AZ | Effect |
|---|---|
| Operating system update | Standby first, then failover, then old primary: short interruption |
| Database engine upgrade | Primary and standby together: downtime until done |

### Exam cues

- If the question says encrypt an existing unencrypted RDS database, think encrypted snapshot copy and restore.
- If the question says share an encrypted snapshot across accounts, think a customer managed key.
- If the question says no database passwords for Lambda or EC2, think IAM database authentication (or Secrets Manager).

### Remember

- Encryption at rest is set at creation; the KMS key can't change later.
- Default-key snapshots can't be shared; encrypted snapshots can't be public.
- IAM auth tokens last 15 minutes; MariaDB, MySQL, PostgreSQL.

> **Trap:** Multi-AZ protects against OS patching and instance failure, not engine upgrades. An engine version upgrade still causes downtime.
