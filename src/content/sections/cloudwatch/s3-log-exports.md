---
title: S3 log exports
level: associate
order: 110
facts:
  - id: export-purpose
    text: CreateExportTask copies a selected CloudWatch log group time range into an S3 bucket for batch
      processing.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3Export.html#S3Export
  - id: export-region
    text: The S3 bucket must be in the same Region as the source logs; it can belong to another account.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3ExportTasks.html#CreateS3Bucket-CLI-crossaccount
  - id: export-permissions
    text: An export needs caller export permissions and a bucket policy allowing the regional CloudWatch
      Logs service principal to write objects.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3ExportTasks.html#S3Permissions
  - id: export-source-scope
    text: The export bucket policy uses aws:SourceAccount and aws:SourceArn to restrict authorized log
      sources.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3ExportTasks.html#S3Permissions
  - id: export-delay
    text: Log data can take up to 12 hours to become available for export.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3Export.html#S3Export
  - id: export-timeout
    text: An export task times out after 24 hours; reducing the requested time range can avoid a timeout.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3Export.html#S3Export
  - id: export-duration
    text: An export task can take from seconds to hours depending on data size.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3ExportTasks.html#CreateExportTask
  - id: export-continuous
    text: AWS recommends subscriptions rather than recurring export tasks for continuous archival to S3.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3Export.html#S3Export
  - id: export-kms
    text: Exports support S3 buckets with SSE-KMS encryption but not DSSE-KMS encryption.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3ExportTasks.html#S3ExportTasks
  - id: export-lifecycle
    text: S3 lifecycle rules can archive or delete exported files automatically.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3Export.html#S3Export
  - id: export-athena
    text: Athena can query CloudWatch logs stored in S3 after a table describes the exported data.
    source: https://docs.aws.amazon.com/athena/latest/ug/cloudwatch-logs.html
  - id: firehose-archive
    text: A CloudWatch Logs subscription can send logs to Firehose for delivery to S3.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters-AccountLevel.html#SubscriptionFilters-AccountLevel
cards:
  - id: cloudwatch-017
    q: A team needs long-term CloudWatch log archives in S3 that it can query. Which paths fit batch and
      continuous delivery?
    a: Use CreateExportTask for a selected historical range, or a subscription to Firehose for
      continuous S3 delivery. Apply S3 lifecycle rules and use an Athena table to query the exported
      logs.
    facts:
      - export-purpose
      - export-continuous
      - firehose-archive
      - export-lifecycle
      - export-athena
  - id: cloudwatch-018
    q: Is a CloudWatch Logs export task a near-real-time delivery mechanism to S3?
    a: No. Logs can take up to 12 hours to become exportable, and tasks run in batches. Use a
      subscription to Firehose for continuous archival. SSE-KMS buckets are supported; DSSE-KMS
      buckets are not.
    trap: true
    facts:
      - export-delay
      - export-duration
      - export-continuous
      - firehose-archive
      - export-kms
  - id: cloudwatch-072
    q: A CloudWatch Logs export must write to a security account S3 bucket in another Region. Will that
      export task work?
    a: No. Cross-account export is supported, but the bucket must share the source log Region.
    trap: true
    facts:
      - export-region
  - id: cloudwatch-073
    q: A CloudWatch Logs S3 export times out on a large historical range. What adjustment does AWS
      recommend?
    a: Reduce the time range and export smaller batches. Export tasks time out after 24 hours.
    facts:
      - export-timeout
---
A CloudWatch Logs export task copies a selected log group time range to S3. It suits a batch archive or analysis job, while a subscription to Firehose suits continuous delivery.

### How it works

1. Choose an S3 bucket in the same Region as the source logs. A different account is allowed.
2. Grant the caller export permissions. Let the regional CloudWatch Logs service identity write to the bucket, with `aws:SourceAccount` and `aws:SourceArn` conditions restricting the sources.
3. Create an export task with the log group, time range, bucket, and optional object prefix, the shared beginning of exported object names.
4. Wait for the task. Logs can take up to 12 hours to become exportable; task runtime depends on volume and can span seconds to hours.
5. Apply S3 lifecycle rules to archive or delete files. Define an Athena table to query their format. For continuous archival, use a subscription to Firehose rather than repeated exports.

### Exam cues

- If the question says copy a historical range to S3, think export task, because it operates on a selected batch.
- If the question says continuously archive new logs, think subscription and Firehose, because AWS recommends subscriptions for that use.
- If the question says an export times out, think smaller time ranges, because tasks have a 24-hour timeout.

### Remember

- Export bucket: same Region, same or different account.
- Availability for export can lag ingestion by up to 12 hours.
- SSE-KMS, meaning S3 storage encryption using KMS, is supported. DSSE-KMS, its dual-layer variant, is not supported for exports.

> **Trap:** An export task is not a live log feed. Choosing it for near-real-time delivery introduces both availability lag and batch processing.
