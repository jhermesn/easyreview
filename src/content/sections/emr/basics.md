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
  - id: "data-transform"
    text: "Amazon EMR can transform and move large datasets between AWS data stores."
    source: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html#emr-what-is-emr"
  - id: "sagemaker-spark"
    text: "Amazon SageMaker Spark can build Spark machine learning pipelines using SageMaker stages."
    source: "https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-spark-sagemaker.html"
  - id: "sagemaker-sdk-release"
    text: "The bundled SageMaker Spark SDK component is unavailable in Amazon EMR 7.x and later."
    source: "https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-spark-sagemaker.html"
cards:
  - id: emr-013
    q: "A team needs managed Apache Spark and Hadoop clusters to process big data. Which service fits?"
    a: "Amazon EMR."
    facts: [big-data]
  - id: emr-014
    q: Which Amazon EMR option runs analytics applications without managing clusters?
    a: Amazon EMR Serverless.
    facts: [serverless]
  - id: emr-015
    q: "Which AWS service can run Apache Spark to process and transform large datasets?"
    a: "Amazon EMR."
    facts: [big-data, data-transform]
  - id: emr-016
    q: "Can an Amazon EMR 7.x cluster use the bundled SageMaker Spark SDK component?"
    a: "No. The bundled component is unavailable in EMR 7.x and later."
    facts: [sagemaker-sdk-release]
---
Amazon EMR runs big data frameworks such as Hadoop and Spark on managed clusters.

### How it works

1. Create a cluster with the frameworks you need.
2. Submit processing jobs.
3. EMR runs them across the cluster.

### Exam cues

- If the question says Spark data processing and transformation, think Amazon EMR, because it runs Spark and can transform data.
- If the question says SageMaker Spark integration on EMR, check the release, because the bundled SDK component is unavailable from EMR 7.x.
- If the question says Hadoop or Spark, think EMR.
- If the question says run analytics without managing clusters, think EMR Serverless, because it provides a serverless runtime.

### Remember

- Managed big data clusters.

> **Trap:** EMR processes big data; Athena queries S3 with SQL and no cluster.
