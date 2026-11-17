---
title: "Redshift basics"
level: foundational
order: 5
facts:
  - id: warehouse
    text: "Amazon Redshift is a fully managed, petabyte-scale data warehouse service; Redshift Serverless runs it without managing capacity."
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html#welcome
cards:
  - id: redshift-012
    q: "A company needs a data warehouse for business intelligence queries over petabytes of data. Which service fits?"
    a: "Amazon Redshift."
    facts: [warehouse]
---
Amazon Redshift is AWS's data warehouse for analytics on large datasets. [What is Amazon Redshift?](https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html#welcome)

### How it works

1. Load data into Redshift or run Redshift Serverless.
2. Run analytic SQL queries.
3. Connect BI tools for reports.

### Exam cues

- If the question says data warehouse or OLAP analytics, think Redshift.

### Remember

- Petabyte-scale warehouse.

> **Trap:** Redshift is for analytics; transactional apps use RDS or Aurora.
