---
title: Inventory and access logging
level: associate
order: 140
facts:
  - id: inventory-purpose
    text: S3 Inventory reports object names and selected metadata on a daily or weekly schedule.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory
  - id: inventory-formats
    text: Inventory output formats are CSV, Apache ORC, and Apache Parquet.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory
  - id: inventory-versions
    text: Inventory can list only current versions or all object versions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory-contents
  - id: inventory-metadata
    text: Inventory can include encryption status and replication status metadata.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory-contents
  - id: inventory-first
    text: The first Inventory report can take up to 48 hours to arrive.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory
  - id: inventory-destination
    text: An Inventory destination bucket must be in the source Region, may be in a different account,
      and needs a delivery bucket policy.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory-buckets
  - id: inventory-query
    text: Athena can query S3 Inventory files using SQL.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory
  - id: access-log-purpose
    text: S3 server access logging records details about requests made to a bucket.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerLogs.html#ServerLogs
  - id: access-log-delay
    text: Server access logs are delivered on a best-effort basis, usually within hours; completeness
      and timeliness are not guaranteed and records may be duplicated.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerLogs.html#ServerLogs
  - id: access-log-default
    text: Server access logging is not enabled by default.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-server-access-logging.html#enable-server-access-logging
  - id: access-log-destination
    text: For direct delivery to S3, the access-log destination bucket must be in the same Region and
      account as the source.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-server-access-logging.html#enable-server-access-logging
  - id: access-log-loop
    text: Use a separate access-log destination bucket without its own access logging to avoid recursive
      logs.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-server-access-logging.html#enable-server-access-logging
  - id: access-log-lock
    text: A server access-log destination bucket cannot have Object Lock or Requester Pays enabled.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-server-access-logging.html#enable-server-access-logging
  - id: access-log-cloudwatch
    text: Server access logs can also be delivered to CloudWatch Logs in structured format.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerLogs.html#ServerLogs
  - id: audit-data
    text: CloudTrail S3 data events record object-level API activity such as reads and writes.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/cloudtrail-logging-s3-info.html#cloudtrail-logging-s3-info
  - id: audit-default
    text: CloudTrail does not log data events by default; they must be enabled and incur additional
      charges.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/cloudtrail-logging-s3-info.html#cloudtrail-logging-s3-info
  - id: audit-history
    text: CloudTrail Event history does not include data events.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/cloudtrail-logging-s3-info.html#cloudtrail-logging-s3-info
  - id: audit-select
    text: A CloudTrail trail can be configured to record data events for selected S3 buckets or all
      buckets in the account.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-cloudtrail-logging-for-s3.html#enable-cloudtrail-logging-for-s3
  - id: columnar-formats
    text: ORC and Parquet are column-oriented formats used to query data efficiently.
    source: https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html#columnar-storage
  - id: csv-format
    text: CSV is a comma-separated-values text format.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory
cards:
  - id: s3-034
    q: An S3 audit needs object reads recorded while a scheduled job lists bucket contents. Which
      features fit?
    a: Enable CloudTrail S3 data events for object activity and S3 Inventory for the listing. Data
      events are not logged by default; Inventory lists objects and metadata rather than access
      calls.
    trap: true
    facts:
      - audit-data
      - audit-default
      - inventory-purpose
  - id: s3-077
    q: An S3 team needs a weekly list of every version with encryption and replication metadata for SQL
      analysis. What should it configure?
    a: S3 Inventory with all versions and the required metadata, in CSV, ORC, or Parquet format. Athena
      can query the reports.
    facts:
      - inventory-purpose
      - inventory-versions
      - inventory-metadata
      - inventory-formats
      - inventory-query
  - id: s3-078
    q: An S3 incident investigation found a missing server access-log record. Does server access logging
      guarantee every request is recorded promptly?
    a: No. Delivery is best effort; records can be delayed, missing, or duplicated. Enable CloudTrail
      data events when object API activity needs auditing.
    trap: true
    facts:
      - access-log-delay
      - audit-data
  - id: s3-079
    q: An S3 team sends server access logs directly to a different account log bucket. What destination
      requirement prevents this?
    a: Direct S3 server access-log delivery requires the same account and Region as the source bucket.
      Inventory has a different rule and can use another account in the same Region.
    trap: true
    facts:
      - access-log-destination
      - inventory-destination
  - id: s3-080
    q: An S3 auditor sees no GetObject calls in CloudTrail Event history. Where should object activity
      be configured?
    a: Enable S3 data events on a trail for the required buckets. Data events are disabled by default
      and are not shown in Event history.
    facts:
      - audit-data
      - audit-default
      - audit-history
      - audit-select
  - id: s3-081
    q: Which report schedules and file formats does S3 Inventory support?
    a: Daily or weekly reports in CSV, ORC, or Parquet. The first report can take up to 48 hours.
    facts:
      - inventory-purpose
      - inventory-formats
      - inventory-first
---
S3 Inventory answers what objects exist and which metadata they have. Access logging and CloudTrail data events answer what requests were made; they serve different audit needs.

### How it works

1. Configure Inventory for a daily or weekly report, selecting current versions or all versions and metadata such as encryption and replication status.
2. Choose comma-separated text (CSV) or a column-oriented format, ORC or Parquet, as output and a same-Region destination bucket with a delivery policy. That bucket can belong to another account. Query reports with Athena when needed.
3. Enable server access logging for request records. Direct S3 delivery requires a same-account, same-Region destination; a separate destination without access logging avoids a recursive stream of logs.
4. Enable CloudTrail S3 data events on a trail for object-level API auditing. Select the required buckets; these events are not included in Event history.

| Requirement | Feature |
|---|---|
| Scheduled object and metadata list | S3 Inventory |
| Best-effort request traffic records | Server access logging |
| Object API activity for auditing | CloudTrail data events |

### Exam cues

- If the question says an S3 audit needs a scheduled object catalog, think Inventory, because it lists objects and selected metadata.
- If the question says an S3 audit needs object read and write calls, think CloudTrail data events, because Inventory is not a request log.
- If the question says an S3 server access log is delayed or absent, think best-effort delivery, because completeness and timeliness are not guaranteed.

### Remember

- Inventory runs daily or weekly; the first report can take up to 48 hours.
- ORC and Parquet support column-oriented querying; choose the format your analysis tools use.
- Server access logging is off by default and can also deliver structured records to CloudWatch Logs.
- A direct S3 access-log destination cannot use Object Lock or Requester Pays.
- CloudTrail data events are off by default, incur charges, and do not appear in Event history.

> **Trap:** Inventory cross-account delivery does not mean direct server access-log delivery has the same permission model.
