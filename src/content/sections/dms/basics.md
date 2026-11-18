---
title: "DMS basics"
level: foundational
order: 5
facts:
  - id: migrate-data
    text: "AWS Database Migration Service (AWS DMS) migrates relational databases, data warehouses, NoSQL databases and other data stores into AWS or between cloud and on-premises setups."
    source: https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html#Welcome
  - id: ongoing
    text: "AWS DMS can do a one-time migration or replicate ongoing changes to keep source and target in sync."
    source: https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html#Welcome
cards:
  - id: dms-019
    q: "A company must move an on-premises Oracle database to AWS while it keeps serving users. Which service copies the data and the ongoing changes?"
    a: "AWS Database Migration Service (AWS DMS), with ongoing replication."
    facts: [migrate-data, ongoing]
  - id: dms-020
    q: "Can AWS DMS keep a source and target database in sync after the first copy?"
    a: "Yes. It replicates ongoing changes after the initial migration."
    facts: [ongoing]
---
AWS DMS moves data from one database to another, including into AWS, and can keep them in sync during the move. [What is AWS DMS?](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html#Welcome)

### How it works

1. Connect DMS to the source and target databases.
2. Copy the existing data.
3. Optionally replicate ongoing changes until cutover.

### Exam cues

- If the question says migrate a database to AWS with little downtime, think AWS DMS.

### Remember

- One-time migration or ongoing replication.

> **Trap:** DMS moves data; converting the schema between different engines uses schema conversion tools.
