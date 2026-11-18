---
title: "Aurora basics"
level: foundational
order: 5
facts:
  - id: relational
    text: "Amazon Aurora is a fully managed relational database engine compatible with MySQL and PostgreSQL."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html#CHAP_AuroraOverview
cards:
  - id: aurora-046
    q: "A company wants a managed, MySQL-compatible relational database built for the cloud. Which AWS engine fits?"
    a: "Amazon Aurora."
    facts: [relational]
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
