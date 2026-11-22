---
title: "Aurora basics"
level: foundational
order: 5
facts:
  - id: relational
    text: "Amazon Aurora is a fully managed relational database engine compatible with MySQL and PostgreSQL."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html#CHAP_AuroraOverview
  - id: engine-compat
    text: Amazon Aurora is a fully managed relational database engine compatible with MySQL and PostgreSQL.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html
  - id: managed-patching
    text: Aurora applies operating system and database engine patches during the cluster maintenance window, so the customer does not patch servers.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_UpgradeDBInstance.Maintenance.html
  - id: self-healing
    text: "Aurora storage continuously scans data blocks and disks for errors and replaces damaged components automatically."
    source: https://docs.aws.amazon.com/rds/latest/auroraextendedcontent/aurora-features-availability.html#aurora-features-fault-tolerant
  - id: postgres-json
    text: "Aurora PostgreSQL supports the JSON and JSONB data types for JSON documents."
    source: https://docs.aws.amazon.com/dms/latest/oracle-to-aurora-postgresql-migration-playbook/chap-oracle-aurora-pg.special.json.html
  - id: aurora-performance-scope
    text: AWS describes Aurora throughput relative to PostgreSQL and MySQL on the Aurora product page.
    source: https://aws.amazon.com/rds/aurora/
cards:
  - id: aurora-046
    q: "What kind of database is Amazon Aurora?"
    a: "Amazon Aurora is a fully managed relational database engine compatible with MySQL and PostgreSQL."
    facts: [relational]
  - id: aurora-031
    q: A company runs MySQL and PostgreSQL applications and wants a managed relational database that AWS patches for it. Which AWS database fits?
    a: "Amazon Aurora.\nIt is compatible with MySQL and PostgreSQL, and AWS applies OS and engine patches in the maintenance window."
    facts: [engine-compat, managed-patching]
  - id: aurora-052
    q: "How does Amazon Aurora respond to damaged storage blocks?"
    a: "Aurora scans its storage continuously and automatically replaces damaged components."
    facts: [self-healing]
  - id: aurora-053
    q: "Which data types can an Aurora PostgreSQL database use to store JSON documents?"
    a: "JSON and JSONB."
    facts: [postgres-json]
---
Amazon Aurora is AWS's MySQL- and PostgreSQL-compatible relational database, managed through Amazon RDS.

### How it works

1. Create an Aurora cluster with the MySQL or PostgreSQL edition.
2. Applications connect as they would to MySQL or PostgreSQL.
3. AWS manages the database.

### Exam cues

- If the question says apply an Aurora performance comparison to every RDS engine, think engine-specific comparison, because the published claim describes Aurora.
- If the question says an Aurora PostgreSQL database must store JSON documents, think JSON or JSONB, because PostgreSQL supports both data types.
- If the question says Aurora storage detects a damaged block, think self-healing storage, because Aurora scans and replaces damaged components automatically.
- If the question says MySQL- or PostgreSQL-compatible managed database built by AWS, think Aurora.

### Remember

- Compatible with MySQL and PostgreSQL.

> **Trap:** Aurora is relational; DynamoDB is the NoSQL choice.
