---
title: Replication Time Control and monitoring
level: professional
order: 40
facts:
  - id: rtc-threshold
    text: S3 RTC adds a 15-minute replication threshold to live replication rules.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-time-control.html#replication-time-control
  - id: rtc-sla
    text: The RTC SLA uses a monthly 15-minute replication percentage of 99.9% per Region pair per
      account as the service-credit threshold.
    source: https://aws.amazon.com/s3/sla-rtc/
  - id: rtc-metrics
    text: Enabling RTC also enables replication metrics; metrics can be enabled independently of RTC.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-time-control.html#replication-time-control
  - id: rtc-pending-bytes
    text: BytesPendingReplication measures bytes of objects waiting to replicate.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/metrics-dimensions.html#s3-cloudwatch-replication-metrics
  - id: rtc-pending-ops
    text: OperationsPendingReplication counts operations waiting to replicate.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/metrics-dimensions.html#s3-cloudwatch-replication-metrics
  - id: rtc-latency
    text: ReplicationLatency measures the maximum lag in seconds for a replication rule.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/metrics-dimensions.html#s3-cloudwatch-replication-metrics
  - id: rtc-failed-ops
    text: OperationsFailedReplication counts operations that failed to replicate.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/metrics-dimensions.html#s3-cloudwatch-replication-metrics
  - id: rtc-late-event
    text: s3:Replication:OperationMissedThreshold reports objects missing the RTC threshold.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-metrics-events.html#replication-metrics-events
  - id: rtc-after-event
    text: s3:Replication:OperationReplicatedAfterThreshold reports replication that finishes after the
      RTC threshold.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-metrics-events.html#replication-metrics-events
  - id: rtc-failure-event
    text: With replication metrics enabled, s3:Replication:OperationFailedReplication can notify Lambda,
      SNS, or SQS of failures.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-metrics-events.html#replication-metrics-events
  - id: rtc-failure-reason
    text: A replication failure notification contains the object key, version ID, and failureReason.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-metrics-events.html#replication-metrics-events
  - id: rtc-status
    text: Source replication status values include PENDING, COMPLETED, and FAILED; a replica normally
      reports REPLICA.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-status.html#replication-status
  - id: rtc-retry
    text: Batch Replication can retry objects filtered by FAILED replication status.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-filters
  - id: rtc-batch
    text: RTC does not apply to Batch Replication.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
  - id: rtc-automation
    text: AWS describes consuming replication failure events and automating retries of failed objects.
    source: https://aws.amazon.com/blogs/storage/how-bridgewater-maintains-data-consistency-across-regions-with-amazon-s3-replication/
diagrams:
  - id: s3-replication-failure-retry
    title: Replication failure handling
    width: 1000
    height: 230
    nodes:
      - id: events
        label: Failure event
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 30
        y: 80
        w: 210
        h: 72
      - id: handler
        label: Inspect failure
        icon: lambda
        tone: compute
        x: 360
        y: 80
        w: 210
        h: 72
      - id: batch
        label: Batch retry
        icon: simple-storage-service
        tone: storage
        x: 690
        y: 80
        w: 210
        h: 72
    edges:
      - from: events
        to: handler
        step: 1
      - from: handler
        to: batch
        step: 2
    steps:
      - With replication metrics enabled, S3 sends an OperationFailedReplication notification to
        Lambda.
      - Automation examines the failure reason and submits a Batch Replication retry after the cause
        is addressed.
cards:
  - id: s3-011
    q: What does S3 Replication Time Control add to live replication?
    a: A 15-minute replication threshold, replication metrics, and events for missed and later-completed
      replication. The SLA service-credit threshold is 99.9% per Region pair per account per month;
      it is not a guarantee for every object.
    facts:
      - rtc-threshold
      - rtc-metrics
      - rtc-late-event
      - rtc-after-event
      - rtc-sla
  - id: s3-012
    q: How can an S3 operator distinguish replication backlog, lag, and failures?
    a: Use CloudWatch BytesPendingReplication, OperationsPendingReplication, ReplicationLatency, and
      OperationsFailedReplication. Inspect per-object replication status and failure events for
      diagnosis.
    facts:
      - rtc-pending-bytes
      - rtc-pending-ops
      - rtc-latency
      - rtc-failed-ops
      - rtc-status
      - rtc-failure-event
  - id: s3-031
    q: An S3 team needs predictable cross-Region replication timing and notifications when copying is
      late. What should it enable?
    a: S3 RTC on the CRR rule and notifications for s3:Replication:OperationMissedThreshold. RTC enables
      replication metrics but does not cover Batch Replication.
    facts:
      - rtc-threshold
      - rtc-metrics
      - rtc-late-event
      - rtc-batch
  - id: s3-043
    q: An S3 team wants failed replication attempts to trigger automated retries. What event and retry
      mechanism fit?
    a: Enable replication metrics and send s3:Replication:OperationFailedReplication events to Lambda.
      Automation can inspect failureReason, correct or escalate the cause, and submit Batch
      Replication retries for failed objects.
    facts:
      - rtc-failure-event
      - rtc-failure-reason
      - rtc-retry
      - rtc-automation
  - id: s3-044
    q: Does S3 RTC promise every new object will reach its destination in 15 minutes?
    a: No. It has a monthly SLA percentage, and missed-threshold events exist for late objects. Batch
      Replication is outside RTC.
    trap: true
    facts:
      - rtc-sla
      - rtc-late-event
      - rtc-batch
---
S3 Replication Time Control (RTC) makes live replication timing measurable against a 15-minute threshold. A service-level agreement (SLA) sets the conditions for service credits; it does not make asynchronous replication instantaneous.

### How it works

1. Enable RTC on the live replication rule when predictable timing is required. For monitoring alone, enable replication metrics independently.
2. Watch bytes and operations waiting to replicate, maximum lag, and failed operations in CloudWatch.
3. Subscribe to missed-threshold and replicated-after-threshold notifications to distinguish late objects from completed ones.
4. With replication metrics enabled, route failure notifications to Lambda, SNS, or SQS. The event identifies the object version and failure reason.
5. Use automation to inspect failures and submit Batch Replication retries after addressing their cause.

| CloudWatch metric | Meaning |
|---|---|
| `BytesPendingReplication` | Bytes waiting to replicate |
| `OperationsPendingReplication` | Operations waiting to replicate |
| `ReplicationLatency` | Maximum lag in seconds |
| `OperationsFailedReplication` | Failed operations |

### Exam cues

- If the question says S3 replication must report when an object is late, think RTC plus `OperationMissedThreshold`, because it exposes the 15-minute threshold.
- If the question says S3 replication failures need automated handling, think replication metrics plus `OperationFailedReplication` to Lambda, because the notification identifies the failed version and reason.

### Remember

- The SLA service-credit threshold is 99.9% per Region pair per account per month.
- `PENDING`, `COMPLETED`, and `FAILED` describe source replication; a replica normally reports `REPLICA`.
- RTC does not cover Batch Replication.

> **Trap:** An alarm reports a problem; it does not repair missing bucket or KMS permissions. A retry must address the failure cause.
