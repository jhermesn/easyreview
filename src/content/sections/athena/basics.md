---
title: "Athena basics"
level: foundational
order: 5
facts:
  - id: sql-on-s3
    text: "Amazon Athena is an interactive query service that analyzes data directly in Amazon S3 with standard SQL."
    source: https://docs.aws.amazon.com/athena/latest/ug/what-is.html#what-is
  - id: serverless
    text: "Athena SQL and Apache Spark on Athena are serverless, so users do not set up or manage infrastructure."
    source: https://docs.aws.amazon.com/athena/latest/ug/what-is.html
cards:
  - id: athena-019
    q: "Analysts want to run SQL on log files in Amazon S3 without loading them into a database. Which service fits?"
    a: "Amazon Athena."
    facts: [sql-on-s3]
  - id: athena-022
    q: "A team needs SQL queries without managing servers. Which Amazon Athena property fits?"
    a: "Athena SQL is serverless, so the team does not set up or manage query infrastructure."
    facts: [serverless]
---
Amazon Athena runs SQL queries on data where it sits in Amazon S3.

### How it works

1. Point Athena at data in S3.
2. Define a table over it.
3. Run SQL queries.

### Exam cues

- If the question says run analytics without managing infrastructure, think Athena, because its query engines are serverless.
- If the question says query data in S3 with SQL, think Athena.

### Remember

- Standard SQL on S3 data.

> **Trap:** Athena queries data in place; a data warehouse with loaded data is Amazon Redshift.
