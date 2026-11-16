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
  - id: rds-050
    q: A Lambda function must connect to RDS for PostgreSQL without storing a database password. Which feature fits?
    a: "IAM database authentication: the function's role generates a 15-minute token used instead of a password."
    facts: [iam-auth]
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
