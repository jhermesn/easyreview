---
title: "EMR basics"
level: foundational
order: 5
facts:
  - id: big-data
    text: "Amazon EMR is a managed cluster platform for running big data frameworks such as Apache Hadoop and Apache Spark."
    source: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html#emr-what-is-emr
cards:
  - id: emr-013
    q: "A team needs managed Apache Spark and Hadoop clusters to process big data. Which service fits?"
    a: "Amazon EMR."
    facts: [big-data]
---
Amazon EMR runs big data frameworks such as Hadoop and Spark on managed clusters.

### How it works

1. Create a cluster with the frameworks you need.
2. Submit processing jobs.
3. EMR runs them across the cluster.

### Exam cues

- If the question says Hadoop or Spark, think EMR.

### Remember

- Managed big data clusters.

> **Trap:** EMR processes big data; Athena queries S3 with SQL and no cluster.
