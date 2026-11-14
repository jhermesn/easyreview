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
cards:
  - id: glue-001
    q: A company needs serverless ETL jobs to clean data from several sources and load it into an S3 data lake. Which AWS service fits?
    a: AWS Glue, a serverless data integration and ETL service.
    facts: [purpose, etl]
  - id: glue-002
    q: Which AWS Glue feature keeps a central inventory of table definitions that Amazon Athena can query?
    a: The AWS Glue Data Catalog.
    facts: [catalog]
  - id: glue-003
    q: Does AWS Glue require provisioning servers for ETL jobs?
    a: No. AWS Glue is serverless.
    trap: true
    facts: [purpose]
---
AWS Glue prepares data for analytics. It discovers data in many sources, keeps a central catalog of it, and runs ETL jobs that clean and move data into a data lake, without servers to manage. [What is AWS Glue?](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html#what-is-glue)

### How it works

1. Connect Glue to data sources; it records their structure in the Data Catalog.
2. Build ETL pipelines, visually or in code, to transform data and load it into a data lake.
3. Query the cataloged data with Amazon Athena, Amazon EMR or Amazon Redshift Spectrum.

| Analytics need | Service |
|---|---|
| Prepare and catalog data (ETL) | AWS Glue |
| Query data in S3 with SQL | Amazon Athena |
| Stream data in real time | Amazon Kinesis |
| Dashboards and BI | Amazon Quick (QuickSight) |
| Data warehouse | Amazon Redshift |

### Exam cues

- If the question says ETL, data catalog or data preparation, think AWS Glue.

### Remember

- Serverless; 70+ data sources; central Data Catalog.

> **Trap:** Glue prepares and catalogs data; querying it with SQL is Amazon Athena.
