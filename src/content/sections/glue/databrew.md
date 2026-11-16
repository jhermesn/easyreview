---
title: Glue DataBrew
level: foundational
order: 4
facts:
  - id: databrew
    text: AWS Glue DataBrew is a visual, serverless data preparation tool that cleans and normalizes data without code, with over 250 ready-made transformations.
    source: https://docs.aws.amazon.com/databrew/latest/dg/what-is.html#what-is
  - id: quality
    text: DataBrew helps users discover, visualize, clean and transform raw data and suggests fixes for data quality issues.
    source: https://docs.aws.amazon.com/databrew/latest/dg/what-is.html#what-is
cards:
  - id: glue-004
    q: A business analyst must clean and normalize a messy dataset for ML training without writing code. Which AWS service fits?
    a: AWS Glue DataBrew, a visual, serverless data preparation tool.
    facts: [databrew]
  - id: glue-005
    q: Does AWS Glue DataBrew need clusters to be provisioned?
    a: "No. DataBrew is serverless."
    trap: true
    facts: [databrew]
---
AWS Glue DataBrew is point-and-click data preparation: profile a dataset, spot quality problems and apply ready-made transformations, with no code and no clusters. [What is DataBrew?](https://docs.aws.amazon.com/databrew/latest/dg/what-is.html)

### How it works

1. Connect a dataset, for example in Amazon S3.
2. Profile it and review suggested data quality fixes.
3. Build a recipe from ready-made transformations and run it as a job.

### Exam cues

- If the question says visual, no-code data cleaning for analytics or ML, think AWS Glue DataBrew.

### Remember

- Serverless, over 250 transformations.

> **Trap:** DataBrew prepares data; AWS Glue ETL jobs are the code-based option for large pipelines.
