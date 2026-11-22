---
title: Inventory and access logging
level: associate
order: 140
facts:
  - id: inventory-purpose
    text: "S3 Inventory produces daily or weekly object and metadata listings for an entire bucket or for keys with a selected prefix."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory-buckets
  - id: inventory-formats
    text: Inventory output formats are CSV, Apache ORC, and Apache Parquet.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory
  - id: inventory-versions
    text: Inventory can list only current versions or all object versions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory-contents
  - id: inventory-metadata
    text: Inventory can include encryption status and replication status metadata.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory-contents
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
  - id: inventory-acl
    text: S3 Inventory reports can include an Object ACL field that lists the grantees and permissions of each object.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html
  - id: logging-principal
    text: "Server access log delivery needs the destination bucket policy to grant s3:PutObject to the logging service principal logging.s3.amazonaws.com."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-server-access-logging.html#grant-log-delivery-permissions-bucket-policy
  - id: access-log-fields
    text: "S3 server access log records include fields for requester identity, request time, operation, and HTTP response status."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/LogFormat.html#log-record-fields
  - id: vended-log-delivery
    text: "S3 server access logs can be delivered to a CloudWatch Logs log group using CloudWatch Logs vended log delivery."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/sal-cw-enabling.html
cards:
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
  - id: s3-130
    q: A company must audit the ACLs of millions of objects on a schedule without calling an API per object. Which S3 feature fits?
    a: S3 Inventory with the Object ACL field in its reports.
    facts: [inventory-acl]
  - id: s3-165
    q: "Server access logging is on, but no logs reach the destination bucket. What permission is often missing?"
    a: "A destination bucket policy that allows s3:PutObject for the logging.s3.amazonaws.com service principal."
    facts: [logging-principal]
  - id: s3-191
    q: "An Amazon S3 auditor needs a weekly object listing limited to keys beginning with finance/. How can Inventory select them?"
    a: "Set the Inventory source prefix to finance/; the report can cover a prefix rather than the whole bucket."
    facts: [inventory-purpose]
  - id: s3-193
    q: "An Amazon S3 investigation needs requester identity, time, operation, and response status for bucket requests. Which records contain those fields?"
    a: "S3 server access logs contain those request fields."
    facts: [access-log-fields]
  - id: s3-233
    q: "How can Amazon S3 server access logs be delivered to a CloudWatch Logs log group?"
    a: "Use CloudWatch Logs vended log delivery."
    facts: [vended-log-delivery]
---
S3 Inventory answers what objects exist and which metadata they have. Access logging and CloudTrail data events answer what requests were made; they serve different audit needs.

### How it works

1. Configure Inventory for a daily or weekly report for the entire bucket or a selected key prefix. Choose current versions or all versions and metadata such as encryption and replication status.
2. Choose an output format and destination bucket for the report. Query reports with Athena when needed.
3. Enable server access logging for request records with requester, time, operation, and response-status fields. A separate destination without access logging avoids a recursive stream of logs.
4. Enable CloudTrail S3 data events on a trail for object-level API auditing. Select the required buckets; these events are not included in Event history.

| Requirement | Feature |
|---|---|
| Scheduled object and metadata list | S3 Inventory |
| Best-effort request traffic records | Server access logging |
| Object API activity for auditing | CloudTrail data events |

### Exam cues

- If the question says send S3 server access logs to a CloudWatch Logs group, think vended log delivery, because it supports that destination.
- If the question says an S3 audit needs a scheduled object catalog, think Inventory, because it lists objects and selected metadata.
- If the question says an S3 audit needs object read and write calls, think CloudTrail data events, because Inventory is not a request log.
- If the question says an S3 server access log is delayed or absent, think best-effort delivery, because completeness and timeliness are not guaranteed.

### Remember

- Inventory can select a key prefix.
- Server access logging is off by default and can also deliver structured records to CloudWatch Logs.
- A direct S3 access-log destination cannot use Object Lock or Requester Pays.
- CloudTrail data events are off by default, incur charges, and do not appear in Event history.

> **Trap:** Inventory lists objects and metadata; it does not record object API requests.
