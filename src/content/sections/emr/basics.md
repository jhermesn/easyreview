---
title: "EMR basics"
level: foundational
order: 5
facts:
  - id: big-data
    text: "Amazon EMR is a managed cluster platform for running big data frameworks such as Apache Hadoop and Apache Spark."
    source: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html#emr-what-is-emr
  - id: serverless
    text: Amazon EMR Serverless runs analytics applications without requiring the user to manage clusters.
    source: https://docs.aws.amazon.com/emr/latest/EMR-Serverless-UserGuide/emr-serverless.html
cards:
  - id: emr-013
    q: "A team needs managed Apache Spark and Hadoop clusters to process big data. Which service fits?"
    a: "Amazon EMR."
    facts: [big-data]
  - id: emr-014
    q: Which Amazon EMR option runs analytics applications without managing clusters?
    a: Amazon EMR Serverless.
    facts: [serverless]
---
Amazon EMR runs big data frameworks such as Hadoop and Spark on managed clusters.

### How it works

1. Create a cluster with the frameworks you need.
2. Submit processing jobs.
3. EMR runs them across the cluster.

### Exam cues

- If the question says Hadoop or Spark, think EMR.
- If the question says run analytics without managing clusters, think EMR Serverless, because it provides a serverless runtime.

### Remember

- Managed big data clusters.

> **Trap:** EMR processes big data; Athena queries S3 with SQL and no cluster.
