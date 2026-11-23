---
title: "Redshift basics"
level: foundational
order: 5
facts:
  - id: warehouse
    text: "Amazon Redshift is a fully managed, petabyte-scale data warehouse service; Redshift Serverless runs it without managing capacity."
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html#welcome
  - id: redshift-ml
    text: Redshift ML can train machine learning models with SQL and invoke them in SQL queries for predictions.
    source: https://docs.aws.amazon.com/redshift/latest/gsg/machine-learning.html
  - id: spectrum
    text: Redshift Spectrum can query files directly in Amazon S3.
    source: https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html
  - id: super-json
    text: Amazon Redshift can load JSON data into columns of the SUPER data type.
    source: https://docs.aws.amazon.com/redshift/latest/dg/ingest-super.html
  - id: warehouse-purpose
    text: Amazon Redshift is a managed cloud data warehouse that supports SQL-based tools and business intelligence applications.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html#welcome
cards:
  - id: redshift-012
    q: "Which AWS analytics service provides a managed data warehouse for large datasets?"
    a: "Amazon Redshift is a fully managed data warehouse. Redshift Serverless runs it without managing capacity."
    facts: [warehouse]
  - id: redshift-014
    q: How can an Amazon Redshift analyst train a machine learning model and run predictions using SQL?
    a: Use Redshift ML to train the model and invoke it in SQL queries.
    facts: [redshift-ml]
  - id: redshift-015
    q: How can Amazon Redshift query files in S3 without loading them into warehouse tables?
    a: Use Redshift Spectrum to query the files directly.
    facts: [spectrum]
  - id: redshift-016
    q: Which Amazon Redshift data type can store loaded JSON data?
    a: SUPER.
    facts: [super-json]
  - id: redshift-001
    q: Which AWS service provides a managed SQL data warehouse for analytics?
    a: Amazon Redshift provides a managed cloud warehouse for SQL and business intelligence tools.
    facts: [warehouse-purpose]
---
Amazon Redshift is AWS's data warehouse for analytics on large datasets.

### How it works

1. Load data into Redshift or run Redshift Serverless.
2. Run analytic SQL queries.
3. Connect BI tools for reports.

Redshift ML supports model training and prediction with SQL. Redshift Spectrum queries files in S3 directly. SUPER columns can hold JSON data.

### Exam cues

- If the question says data warehouse or OLAP analytics, think Redshift.
- If the question says train a model and predict with SQL in Redshift, think Redshift ML, because it supports both operations.
- If the question says query S3 files from Redshift without loading them, think Redshift Spectrum, because it reads the files directly.

### Remember

- Petabyte-scale warehouse.

> **Trap:** Redshift is for analytics; transactional apps use RDS or Aurora.
