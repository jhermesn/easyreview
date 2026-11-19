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
cards:
  - id: aurora-046
    q: "What kind of database is Amazon Aurora?"
    a: "Amazon Aurora is a fully managed relational database engine compatible with MySQL and PostgreSQL."
    facts: [relational]
  - id: aurora-031
    q: A company runs MySQL and PostgreSQL applications and wants a managed relational database that AWS patches for it. Which AWS database fits?
    a: "Amazon Aurora.\nIt is compatible with MySQL and PostgreSQL, and AWS applies OS and engine patches in the maintenance window."
    facts: [engine-compat, managed-patching]
---
Amazon Aurora is AWS's MySQL- and PostgreSQL-compatible relational database, managed through Amazon RDS. [What is Amazon Aurora?](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html#CHAP_AuroraOverview)

### How it works

1. Create an Aurora cluster with the MySQL or PostgreSQL edition.
2. Applications connect as they would to MySQL or PostgreSQL.
3. AWS manages the database.

### Exam cues

- If the question says MySQL- or PostgreSQL-compatible managed database built by AWS, think Aurora.

### Remember

- Compatible with MySQL and PostgreSQL.

> **Trap:** Aurora is relational; DynamoDB is the NoSQL choice.
