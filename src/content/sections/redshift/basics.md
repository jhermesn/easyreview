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
    q: "Which AWS analytics service provides a managed data warehouse for large datasets?"
    a: "Amazon Redshift is a fully managed data warehouse. Redshift Serverless runs it without managing capacity."
    facts: [warehouse]
---
Amazon Redshift is AWS's data warehouse for analytics on large datasets.

### How it works

1. Load data into Redshift or run Redshift Serverless.
2. Run analytic SQL queries.
3. Connect BI tools for reports.

### Exam cues

- If the question says data warehouse or OLAP analytics, think Redshift.

### Remember

- Petabyte-scale warehouse.

> **Trap:** Redshift is for analytics; transactional apps use RDS or Aurora.
