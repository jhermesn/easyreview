---
title: Cost and Usage Reports
level: foundational
order: 30
facts:
  - id: purpose
    text: AWS Cost and Usage Reports (AWS CUR) contain the most comprehensive set of AWS cost and usage data available and are published to an Amazon S3 bucket you own.
    source: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html#what-is-cur
  - id: granularity
    text: CUR breaks costs down by the hour, day or month, by product or resource, and by tags you define, with a line item for each combination of product, usage type and operation.
    source: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html#what-is-cur
  - id: updates
    text: AWS updates the Cost and Usage Report in your bucket at least once a day until charges are finalized.
    source: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html#how-cur-works
  - id: data-exports
    text: AWS Data Exports creates billing and cost management exports with basic SQL; Cost and Usage Report 2.0 (CUR 2.0) in Data Exports is the new and recommended way to receive detailed cost and usage data.
    source: https://docs.aws.amazon.com/cur/latest/userguide/what-is-data-exports.html#what-is-data-exports
  - id: tools
    text: CUR files can be read with spreadsheet software or from applications through the Amazon S3 API.
    source: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html#what-is-cur
  - id: export-formats
    text: "Data Exports delivers CUR 2.0 data to an S3 bucket as gzip-compressed CSV or Parquet files, with a manifest describing the export."
    source: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-export-delivery.html
  - id: analytics-integrations
    text: "AWS Cost and Usage Reports can be analyzed with Amazon Athena, Amazon Redshift and Amazon QuickSight."
    source: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-migrate.html
  - id: billing-group-report
    text: "AWS Billing Conductor can create a pro forma Cost and Usage Report for each billing group."
    source: https://docs.aws.amazon.com/billingconductor/latest/userguide/configuring-abc.html
  - id: reservation-effective-cost
    text: "The reservation effective cost column in AWS Cost and Usage Reports includes the amortized upfront and recurring reservation fees for discounted usage."
    source: https://docs.aws.amazon.com/cur/latest/userguide/reservation-columns.html
cards:
  - id: billing-and-cost-management-010
    q: A finance team needs the most detailed AWS billing data, line by line and hour by hour, delivered to Amazon S3. Which AWS feature provides it?
    a: AWS Cost and Usage Reports, now delivered as CUR 2.0 through AWS Data Exports.
    facts: [purpose, granularity, data-exports]
  - id: billing-and-cost-management-011
    q: Where does AWS deliver the Cost and Usage Report?
    a: To an Amazon S3 bucket the customer owns, updated at least daily.
    facts: [purpose, updates]
  - id: billing-and-cost-management-012
    q: How can a Cost and Usage Report show costs per project?
    a: Activate cost allocation tags; CUR then breaks costs down by those tags.
    facts: [granularity]
  - id: billing-and-cost-management-055
    q: "How can AWS Billing Conductor report pro forma costs for each billing group?"
    a: "Create a pro forma AWS Cost and Usage Report for each billing group."
    facts: [billing-group-report]

---
AWS Cost and Usage Reports (CUR) are the most detailed billing data AWS provides: line items by hour, resource and tag, delivered to Amazon S3 for your own analysis.

### How it works

1. Create a report and choose an S3 bucket.
2. AWS writes line items for every product, usage type and operation, by hour, day or month.
3. Activated cost allocation tags appear as columns, so costs can be split by team or project.
4. Analyze the files with spreadsheets, Amazon Athena or other tools. Today AWS recommends CUR 2.0 through AWS Data Exports.

### Exam cues

- If the question says find the effective reservation cost of discounted usage, think the reservation effective cost column, because it combines the applicable reservation fees.
- If the question says create a Cost and Usage Report with custom billing group prices, think a pro forma report, because Billing Conductor can create one for each group.
- If the question says analyze Cost and Usage Report data, think Amazon Athena, Amazon Redshift or Amazon QuickSight, because these tools support the report.
- If the question says most granular or detailed billing data, think AWS Cost and Usage Reports.
- If the question says deliver billing data to S3 for analysis, think CUR (Data Exports).

### Remember

- Delivered to your S3 bucket, updated at least daily.
- CUR 2.0 in Data Exports is the recommended version.

> **Trap:** CUR is raw data, not a dashboard. For charts and quick analysis, use AWS Cost Explorer.
