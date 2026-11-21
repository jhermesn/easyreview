---
title: Data lake governance
level: foundational
order: 10
facts:
  - id: what
    text: AWS Lake Formation centrally governs, secures and shares data for analytics and ML, with fine-grained access control for data lake data in Amazon S3 and its metadata in the AWS Glue Data Catalog.
    source: https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html#what-is-lake-formation
  - id: permissions
    text: Lake Formation has its own permissions model that augments IAM and grants fine-grained access with a simple grant or revoke, including to external sources such as Amazon Redshift and Amazon DynamoDB.
    source: https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html#what-is-lake-formation
  - id: cross-account
    text: "Lake Formation shares Data Catalog resources with other AWS accounts, organizations or IAM principals in another account using AWS RAM, with fine-grained access to both metadata and the underlying data."
    source: https://docs.aws.amazon.com/lake-formation/latest/dg/cross-account-permissions.html#cross-account-permissions
cards:
  - id: lake-formation-001
    q: A company must let its ML team read only certain columns of customer tables in an S3 data lake. Which AWS service fits?
    a: AWS Lake Formation, which grants fine-grained (table and column level) permissions on data lake data.
    facts: [what, permissions]
  - id: lake-formation-002
    q: Which service centrally governs who can access data cataloged in the AWS Glue Data Catalog?
    a: AWS Lake Formation.
    facts: [what]
  - id: lake-formation-003
    q: Does Lake Formation replace IAM?
    a: "No. Its permissions model augments IAM with fine-grained data access."
    trap: true
    facts: [permissions]
  - id: lake-formation-004
    q: "Which AWS service centrally governs and controls access to data in an Amazon S3 data lake for analytics and machine learning?"
    a: "AWS Lake Formation provides centralized governance and fine-grained access control for data lake data."
    facts: [what]
---
AWS Lake Formation is the governance layer of a data lake: it decides who may see which databases, tables and columns in S3 and the Glue Data Catalog, and shares data safely for analytics and ML.

### How it works

1. Register S3 locations and catalog tables in the AWS Glue Data Catalog.
2. Grant or revoke Lake Formation permissions on databases, tables and columns.
3. Analytics and ML services read only what each principal is allowed to see.

### Exam cues

- If the question says fine-grained, centralized access control for a data lake used for ML, think AWS Lake Formation.

### Remember

- Governs S3 data and Glue Data Catalog metadata.
- Augments IAM with grant and revoke permissions.

> **Trap:** The Glue Data Catalog stores metadata; Lake Formation governs access to it.
