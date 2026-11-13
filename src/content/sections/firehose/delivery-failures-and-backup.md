---
title: Delivery failures and backup
level: associate
order: 30
facts:
  - id: recover-duplicates
    text: Firehose uses at-least-once delivery; retries can introduce duplicates except for S3, Apache
      Iceberg tables, and Snowflake destinations.
    source: https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html#basic-deliver
  - id: recover-backup
    text: Firehose backup settings support Direct PUT and Kinesis Data Streams sources; supported
      application destinations can back up all source data or failed data only to S3.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-configure-backup.html#create-configure-backup
  - id: recover-prefix
    text: Firehose backup configuration includes an S3 backup bucket, bucket prefix, and error output
      prefix for failed data.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-configure-backup.html#create-configure-backup
  - id: recover-pause
    text: When both destination delivery and writing failed data to the S3 backup location fail,
      Firehose pauses delivery until one path succeeds.
    source: https://docs.aws.amazon.com/firehose/latest/dev/retry.html#retry
  - id: recover-directput
    text: For an S3 destination with a DirectPut source, Firehose retries failed delivery for up to 24
      hours; data can be lost after that storage window.
    source: https://docs.aws.amazon.com/firehose/latest/dev/retry.html#dd-retry-s3
  - id: recover-stream
    text: For an S3 destination with Kinesis Data Streams or MSK sources, failed delivery retries are
      bounded by the source stream retention policy.
    source: https://docs.aws.amazon.com/firehose/latest/dev/retry.html#dd-retry-s3
  - id: recover-search
    text: OpenSearch and OpenSearch Serverless delivery retry duration is configurable from 0 to 7200
      seconds.
    source: https://docs.aws.amazon.com/firehose/latest/dev/retry.html#dd-retry-osss
  - id: recover-search-backfill
    text: After OpenSearch retries expire, Firehose writes skipped documents to S3 under
      AmazonOpenSearchService_failed/ for manual backfill.
    source: https://docs.aws.amazon.com/firehose/latest/dev/retry.html#dd-retry-osss
  - id: recover-redshift
    text: After the configured Redshift retry duration expires, Firehose writes skipped S3 object
      information to a manifest in errors/ for manual backfill.
    source: https://docs.aws.amazon.com/firehose/latest/dev/retry.html#dd-retry-rs
  - id: recover-lambda-retry
    text: Firehose retries Lambda invocations three times by default when network timeout or invocation
      limits cause failure, then treats the skipped batch as unsuccessfully processed.
    source: https://docs.aws.amazon.com/firehose/latest/dev/data-transformation-failure-handling.html#data-transformation-failure-handling
  - id: recover-lambda-error
    text: Firehose writes unsuccessfully transformed records to the S3 processing-failed folder with
      error details and the raw record.
    source: https://docs.aws.amazon.com/firehose/latest/dev/data-transformation-failure-handling.html#data-transformation-failure-handling
  - id: recover-conversion
    text: Format conversion parse errors write failed records to an S3 error prefix; if that write
      fails, Firehose retries it indefinitely and blocks further delivery.
    source: https://docs.aws.amazon.com/firehose/latest/dev/record-format-conversion-error-handling.html#record-format-conversion-error-handling
  - id: recover-direct-definition
    text: Direct PUT sends application records to Firehose through PutRecord or PutRecordBatch.
    source: https://docs.aws.amazon.com/firehose/latest/dev/writing-with-sdk.html#writing-with-sdk
cards:
  - id: firehose-005
    q: Firehose cannot index some documents into OpenSearch. What should the team configure and how does
      it recover skipped documents?
    a: Configure S3 backup for failed documents or all source data. After the retry duration expires,
      skipped documents go to AmazonOpenSearchService_failed/ for manual backfill. Backup settings
      support Direct PUT and Kinesis Data Streams sources.
    facts:
      - recover-backup
      - recover-search-backfill
  - id: firehose-006
    q: Does Firehose retry behavior provide a general exactly-once guarantee for every destination?
    a: No. Firehose documents at-least-once delivery. Retry duplicates apply except to S3, Iceberg
      tables, and Snowflake destinations; do not extend that exception to the whole pipeline.
    trap: true
    facts:
      - recover-duplicates
  - id: firehose-017
    q: A Firehose stream cannot deliver to its application destination and cannot write to its S3 error
      backup. What happens?
    a: Firehose pauses delivery until destination delivery or the S3 failed-data write can succeed.
      Restore backup access as well as investigating the primary destination.
    facts:
      - recover-pause
  - id: firehose-018
    q: A Firehose Lambda invocation repeatedly fails because of invocation limits. What is the default
      retry count and where do failed records go?
    a: Three retries by default. If the invocation still fails, Firehose treats the skipped batch as
      unsuccessful and writes the failed records with error details to S3 processing-failed.
    facts:
      - recover-lambda-retry
      - recover-lambda-error
  - id: firehose-019
    q: What retry duration range can a Firehose OpenSearch destination use?
    a: 0 to 7200 seconds. After the duration expires, skipped documents are written to S3 for manual
      backfill.
    facts:
      - recover-search
      - recover-search-backfill
  - id: firehose-020
    q: A Firehose DirectPut stream has been unable to write to S3 for more than a day. Can its internal
      storage prevent indefinite data loss?
    a: No. DirectPut retries to an S3 destination are limited to 24 hours. Stream-backed sources have
      their own retention boundary.
    trap: true
    facts:
      - recover-directput
      - recover-stream
---

Firehose recovery depends on the destination and source. Direct PUT means applications send records through Firehose ingestion APIs. S3 backup preserves failed records for investigation and manual backfill, meaning loading records that earlier delivery skipped. It must remain writable for that recovery path to work.

### How it works

1. Configure the S3 backup bucket and prefixes for a supported source and destination. With supported application destinations, choose all source records or failed data only.
2. Firehose retries destination failures according to that destination's policy. For OpenSearch, choose a retry duration from 0 to 7200 seconds.
3. After OpenSearch retries expire, inspect skipped documents in `AmazonOpenSearchService_failed/`. For Redshift, the `errors/` manifest lists skipped S3 objects for manual loading. A manifest is a file identifying the objects to load.
4. Inspect transformation failures separately. Network timeout or Lambda invocation-limit failures get three retries by default. Unsuccessfully transformed records go to `processing-failed` with error details and raw data.
5. Restore S3 backup access if delivery stalls. When both the primary destination and failed-data backup fail, Firehose pauses delivery. Format conversion errors also block delivery if their S3 error write cannot succeed.

### Exam cues

- If the question says OpenSearch rejects documents, think S3 failed-document backup and manual backfill, because retry exhaustion sends skipped documents there.
- If the question says Firehose is stalled despite a backup bucket being configured, think backup write failures, because configuration alone does not ensure the bucket is writable.
- If the question says Redshift loads were skipped, think the `errors/` manifest, because it identifies S3 objects for manual loading.

### Remember

- S3 backup settings support Direct PUT and Kinesis Data Streams sources.
- DirectPut to S3: retries up to 24 hours. Kinesis or MSK to S3: retries are bounded by source retention.
- OpenSearch retry duration: 0 to 7200 seconds.
- Transformation invocation retry default for network timeouts or invocation limits: 3 retries.
- Firehose uses at-least-once delivery. The documented retry-duplicate exception covers S3, Iceberg, and Snowflake destinations.

> **Trap:** An S3 backup setting does not guarantee indefinite retention or automatic replay. Keep the backup writable and perform manual backfill for skipped OpenSearch documents or Redshift loads.
