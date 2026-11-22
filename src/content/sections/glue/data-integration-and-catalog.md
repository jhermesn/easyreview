---
title: Data integration and catalog
level: foundational
order: 10
facts:
  - id: purpose
    text: AWS Glue is a serverless data integration service for discovering, preparing, moving and integrating data from multiple sources for analytics, machine learning and application development.
    source: https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html#what-is-glue
  - id: catalog
    text: With AWS Glue you connect to more than 70 data sources and manage data in a centralized data catalog that Amazon Athena, Amazon EMR and Amazon Redshift Spectrum can query.
    source: https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html#what-is-glue
  - id: etl
    text: AWS Glue lets you visually create, run and monitor extract, transform and load (ETL) pipelines that load data into data lakes.
    source: https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html#what-is-glue
  - id: job-bookmarks
    text: "Glue job bookmarks persist what a previous ETL job run already processed, so scheduled reruns process only new data instead of reprocessing old data."
    source: https://docs.aws.amazon.com/glue/latest/dg/monitor-continuations.html#monitor-continuations
  - id: streaming-etl
    text: "AWS Glue streaming ETL jobs run continuously, read from Kinesis Data Streams, Apache Kafka or Amazon MSK, and load cleaned data into S3 or JDBC stores."
    source: https://docs.aws.amazon.com/glue/latest/dg/add-job-streaming.html#add-job-streaming
  - id: studio
    text: AWS Glue Studio provides a visual interface to create, run and monitor Glue ETL jobs.
    source: https://docs.aws.amazon.com/glue/latest/dg/author-job-glue.html
  - id: crawler
    text: A Glue crawler classifies data, infers its schema and creates or updates metadata tables in the Data Catalog.
    source: https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html#crawler-running
  - id: format-conversion
    text: An AWS Glue ETL job can convert CSV data in Amazon S3 to Parquet files in S3.
    source: https://docs.aws.amazon.com/glue/latest/dg/developing-blueprints-sample.html
  - id: workflow-event
    text: An Amazon EventBridge event for a new S3 object can start an AWS Glue workflow whose event trigger starts a job.
    source: https://docs.aws.amazon.com/glue/latest/dg/starting-workflow-eventbridge.html
  - id: job-minimum
    text: Glue Spark jobs have a minimum billed duration that varies with the Glue version.
    source: https://aws.amazon.com/glue/pricing/
  - id: emrfs-s3
    text: EMRFS lets Amazon EMR workloads read and write files in Amazon S3.
    source: https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-fs.html
  - id: emrfs-default
    text: Starting with Amazon EMR 7.10.0, S3A replaced EMRFS as the default Amazon S3 connector.
    source: https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-fs.html
cards:
  - id: glue-012
    q: Why might a very short AWS Glue Spark job still incur a minimum charge?
    a: Glue Spark jobs have a minimum billed duration that depends on the Glue version.
    facts: [job-minimum]
  - id: glue-013
    q: Does EMRFS start an AWS Glue workflow when an S3 object arrives?
    a: "No. EMRFS only gives Amazon EMR access to files in S3.\nTo start the workflow, route the S3 event through Amazon EventBridge to a Glue event trigger."
    facts: [workflow-event, emrfs-s3]
  - id: glue-001
    q: A company needs serverless ETL jobs to clean data from several sources and load it into an S3 data lake. Which AWS service fits?
    a: AWS Glue, a serverless data integration and ETL service.
    facts: [purpose, etl]
  - id: glue-002
    q: "What does the AWS Glue Data Catalog help an analytics team do?"
    a: "It lets the team manage data in a centralized catalog that analytics services can query."
    facts: [catalog]
  - id: glue-003
    q: Does AWS Glue require provisioning servers for ETL jobs?
    a: No. AWS Glue is serverless.
    trap: true
    facts: [purpose]
  - id: glue-006
    q: "What can AWS Glue do to prepare data for a data lake?"
    a: "AWS Glue can create and run extract, transform and load pipelines that load data into data lakes."
    facts: [etl]
  - id: glue-007
    q: "Which AWS service helps discover and prepare data from multiple sources for machine learning?"
    a: "AWS Glue is a serverless data integration service for discovering and preparing data for machine learning and analytics."
    facts: [purpose]
  - id: glue-008
    q: Which AWS Glue feature provides a visual interface to create and monitor ETL jobs?
    a: AWS Glue Studio.
    facts: [studio]
  - id: glue-009
    q: An analytics team wants to discover the schema of files in S3 and catalog it before transforming the files. What should AWS Glue use?
    a: A crawler discovers the format and schema and updates the Data Catalog. An ETL job transforms the data.
    facts: [crawler, etl]
  - id: glue-010
    q: A team needs to convert CSV files in Amazon S3 to Parquet. Which AWS Glue component can perform the conversion?
    a: An AWS Glue ETL job.
    facts: [format-conversion]
  - id: glue-011
    q: How can an S3 object arrival start an AWS Glue ETL workflow?
    a: Route the event through Amazon EventBridge to a Glue workflow with an event trigger that starts the job.
    facts: [workflow-event]
---
AWS Glue prepares data for analytics. It discovers data in many sources, keeps a central catalog of it, and runs ETL jobs that clean and move data into a data lake, without servers to manage.

### How it works

1. Connect Glue to data sources; it records their structure in the Data Catalog.
2. Build ETL pipelines, visually or in code, to transform data and load it into a data lake.
3. Query the cataloged data with Amazon Athena, Amazon EMR or Amazon Redshift Spectrum.

AWS Glue Studio provides a visual interface for jobs. A crawler classifies data and records its inferred schema in the catalog. ETL jobs perform transformations, including CSV to Parquet conversion. An EventBridge event for a new S3 object can start a workflow and its ETL job.

EMRFS provides Amazon EMR access to files in S3. Starting with EMR 7.10.0, S3A is the default S3 connector. Glue Spark job billing has a minimum duration that varies by version.

| Analytics need | Service |
|---|---|
| Prepare and catalog data (ETL) | AWS Glue |
| Query data in S3 with SQL | Amazon Athena |
| Stream data in real time | Amazon Kinesis |
| Dashboards and BI | Amazon Quick (QuickSight) |
| Data warehouse | Amazon Redshift |

### Exam cues

- If the question says ETL, data catalog or data preparation, think AWS Glue.
- If the question says discover an S3 dataset's schema, think Glue crawler, because it updates catalog metadata.
- If the question says convert CSV to Parquet, think a Glue ETL job, because the job transforms the files.
- If the question says start a Glue job on S3 object arrival, think EventBridge and a workflow event trigger, because the event can start the workflow.
- If the question says a Glue Spark job runs briefly, check the minimum billing duration, because it depends on the Glue version.

### Remember

- Serverless; 70+ data sources; central Data Catalog.

> **Trap:** Glue prepares and catalogs data; querying it with SQL is Amazon Athena.
