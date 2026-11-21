---
title: Legacy data workflows
level: associate
order: 10
facts:
  - id: what
    text: AWS Data Pipeline automates the movement and transformation of data with data-driven workflows in which tasks can depend on earlier tasks succeeding.
    source: https://docs.aws.amazon.com/datapipeline/latest/DeveloperGuide/what-is-datapipeline.html#what-is-datapipeline
  - id: ec2
    text: A Data Pipeline pipeline schedules and runs tasks by creating Amazon EC2 instances, where Task Runner polls for and performs the work, such as copying logs to S3 or launching EMR clusters.
    source: https://docs.aws.amazon.com/datapipeline/latest/DeveloperGuide/what-is-datapipeline.html#what-is-datapipeline
  - id: closed
    text: AWS Data Pipeline is in maintenance mode and no longer available to new customers (recorded in its guide on July 25, 2025); existing customers continue as normal.
    source: https://docs.aws.amazon.com/datapipeline/latest/DeveloperGuide/DocHistory.html
  - id: migrate
    text: AWS recommends migrating Data Pipeline workloads to AWS Glue, AWS Step Functions or Amazon MWAA, depending on the workload.
    source: https://docs.aws.amazon.com/datapipeline/latest/DeveloperGuide/migration.html#migration
  - id: glue-fit
    text: AWS Glue suits migrated Data Pipeline workloads that need serverless data integration, Spark or Python jobs and crawlers, such as exporting a DynamoDB table to Amazon S3.
    source: https://docs.aws.amazon.com/datapipeline/latest/DeveloperGuide/migration.html#migration-glue
  - id: sfn-fit
    text: AWS Step Functions suits migrated Data Pipeline workloads that orchestrate tasks across services such as EMR, Lambda, Glue and DynamoDB, billed per task execution.
    source: https://docs.aws.amazon.com/datapipeline/latest/DeveloperGuide/migration.html#migration-step-functions
cards:
  - id: data-pipeline-001
    q: A new AWS customer asks for AWS Data Pipeline to export a DynamoDB table to S3 every night. What should they use instead?
    a: "AWS Glue (or Step Functions for orchestration).\nData Pipeline is closed to new customers and in maintenance mode."
    trap: true
    facts: [closed, migrate, glue-fit]
  - id: data-pipeline-002
    q: A team is moving an AWS Data Pipeline data integration job that uses Spark and Python. Which
      service is a suitable replacement?
    a: "AWS Glue supports serverless data integration with Spark and Python jobs."
    facts: [glue-fit]
  - id: data-pipeline-003
    q: An existing AWS Data Pipeline workflow moves and transforms data through dependent tasks.
      What does the service automate?
    a: "AWS Data Pipeline automates data movement and transformation, with tasks that can depend on earlier tasks succeeding."
    facts: [what]
  - id: data-pipeline-004
    q: A Data Pipeline workflow coordinates EMR steps, Lambda functions and DynamoDB writes. Which service is the recommended serverless replacement for the orchestration?
    a: "AWS Step Functions."
    facts: [sfn-fit]
---
AWS Data Pipeline still appears in older exam questions about scheduled copies and EMR jobs. Today it only serves existing customers, so new designs use AWS Glue, AWS Step Functions or Amazon MWAA.

### How it works

1. A pipeline definition describes activities, data nodes, schedules and preconditions.
2. The pipeline launches EC2 instances (or EMR clusters) on schedule.
3. Task Runner on those instances polls for tasks and runs them in dependency order.

| Workload | Replacement |
|---|---|
| Spark or Python ETL, crawlers, templates such as DynamoDB to S3 | AWS Glue |
| Orchestrating EMR, Lambda, Glue, DynamoDB steps | AWS Step Functions |
| Existing Apache Airflow skills or DAGs | Amazon MWAA |

### Exam cues

- If the question names Data Pipeline for a new solution, think AWS Glue or Step Functions, because Data Pipeline is closed to new customers.
- If the question is older and asks for scheduled data movement with EMR, Data Pipeline may be the expected answer.

### Remember

- Maintenance mode; no new customers (guide entry July 25, 2025).
- Replacements: Glue, Step Functions, MWAA.

> **Trap:** "Scheduled ETL" doesn't mean Data Pipeline anymore. For a new account, AWS Glue jobs and triggers or Step Functions do the job.
