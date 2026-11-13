---
title: Destinations and buffering
level: associate
order: 10
facts:
  - id: deliver-managed
    text: Firehose delivers streaming records to a configured destination without a custom delivery
      consumer.
    source: https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html#basic-deliver
  - id: deliver-options
    text: Firehose destination choices include S3, Redshift, OpenSearch Service, OpenSearch Serverless,
      Splunk, HTTP endpoints, Snowflake, and Apache Iceberg tables.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-destination.html#create-destination
  - id: deliver-s3
    text: For S3 delivery, Firehose concatenates buffered records into objects without delimiters by
      default; a newline delimiter option is available.
    source: https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html#basic-deliver
  - id: deliver-redshift
    text: For Redshift delivery, Firehose first writes records to S3 and then runs a Redshift COPY
      command to load them.
    source: https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html#basic-deliver
  - id: deliver-search
    text: Firehose indexes buffered records in OpenSearch with bulk requests; input must be UTF-8
      single-line JSON objects.
    source: https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html#basic-deliver
  - id: deliver-trigger
    text: The first configured destination buffer condition met, size or interval, triggers Firehose
      delivery.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-configure-backup.html#buffering-hints
  - id: deliver-s3-buffer
    text: S3 destination buffer hints range from 1 to 128 MB, default 5 MB, and from 0 to 900 seconds,
      default 300 seconds.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-configure-backup.html#buffering-hints
  - id: deliver-search-buffer
    text: OpenSearch destination buffer hints range from 1 to 100 MB, default 5 MB, and from 0 to 900
      seconds, default 300 seconds.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-configure-backup.html#buffering-hints
  - id: deliver-http-buffer
    text: HTTP endpoint destination buffer hints range from 1 to 64 MB, default 5 MB, and from 0 to 900
      seconds, default 60 seconds.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-configure-backup.html#buffering-hints
  - id: deliver-zero
    text: Zero buffering is unavailable for S3 backup and for dynamic partitioning.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-configure-backup.html#buffering-hints
  - id: deliver-latest
    text: When Kinesis Data Streams is the Firehose source, Firehose starts at LATEST and disables its
      own PutRecord and PutRecordBatch ingestion operations.
    source: https://docs.aws.amazon.com/firehose/latest/dev/writing-with-kinesis-streams.html#writing-with-kinesis-streams
  - id: deliver-role
    text: The Firehose delivery role grants required source read and destination write permissions; its
      trust policy allows firehose.amazonaws.com to assume it.
    source: https://docs.aws.amazon.com/firehose/latest/dev/controlling-access.html#using-iam-s3
  - id: deliver-logs
    text: CloudWatch Logs subscription filters can forward log events to Firehose.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
  - id: deliver-firewall
    text: AWS Network Firewall supports direct log delivery to Firehose using LogDestinationType
      KinesisDataFirehose and the deliveryStream destination key.
    source: https://docs.aws.amazon.com/network-firewall/latest/APIReference/API_LogDestinationConfig.html#networkfirewall-Type-LogDestinationConfig-LogDestination
  - id: deliver-waf
    text: AWS WAF request logs can be sent to CloudWatch Logs, S3, or a Firehose delivery stream.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/logging.html#logging
  - id: deliver-directput
    text: Applications can send records directly to Firehose through PutRecord or PutRecordBatch.
    source: https://docs.aws.amazon.com/firehose/latest/dev/writing-with-sdk.html#writing-with-sdk
  - id: deliver-api-filter
    text: PutSubscriptionFilter creates or updates a CloudWatch Logs subscription for a log group and
      can target a same-account Firehose delivery stream.
    source: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html#API_PutSubscriptionFilter
  - id: deliver-api-role
    text: Creating a subscription filter targeting Firehose requires iam:PassRole, and the delivery role
      grants CloudWatch Logs access to the destination stream.
    source: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html#API_PutSubscriptionFilter
  - id: deliver-create-event
    text: EventBridge patterns can match CloudWatch Logs API events delivered by CloudTrail using source
      aws.logs, detail eventSource logs.amazonaws.com, and eventName.
    source: https://docs.aws.amazon.com/eventbridge/latest/ref/events-ref-logs.html#events-ref-logs
  - id: deliver-event-target
    text: An EventBridge rule can invoke Lambda asynchronously as its target.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html#eb-targets
cards:
  - id: firehose-002
    q: Does a Firehose S3 destination deliver every input record immediately?
    a: No. Firehose buffers records until its size or interval hint is met. S3 defaults are 5 MB and 300
      seconds; ranges are 1 to 128 MB and 0 to 900 seconds.
    trap: true
    facts:
      - deliver-trigger
      - deliver-s3-buffer
  - id: firehose-003
    q: Which Firehose destinations are available, and how does its Redshift destination load data?
    a: Destinations include S3, Redshift, OpenSearch, Splunk, HTTP endpoints, Snowflake, and Iceberg
      tables. For Redshift, Firehose stages objects in S3 and then runs COPY.
    facts:
      - deliver-options
      - deliver-redshift
  - id: firehose-008
    q: A team connects Firehose to a Kinesis data stream that already has retained records. Will
      Firehose copy the historical records?
    a: No. Firehose begins reading at LATEST. Use a consumer with an appropriate historical starting
      position if retained records must be replayed.
    trap: true
    facts:
      - deliver-latest
  - id: firehose-009
    q: Firehose cannot read a Kinesis source or write S3 objects. Which role should the team inspect?
    a: The Firehose delivery role. It needs source read permissions, destination permissions, and a
      trust policy allowing firehose.amazonaws.com to assume it.
    facts:
      - deliver-role
  - id: firehose-010
    q: AWS Network Firewall flow logs need direct delivery to Firehose. Which logging configuration
      selects it?
    a: Set LogDestinationType to KinesisDataFirehose and provide the Firehose stream name under the
      deliveryStream key.
    facts:
      - deliver-firewall
  - id: firehose-011
    q: A team wants managed delivery of CloudWatch Logs events to S3. Which path fits?
    a: Use a CloudWatch Logs subscription filter targeting Firehose, with S3 as the Firehose
      destination. Firehose buffers records into S3 objects.
    facts:
      - deliver-logs
      - deliver-managed
      - deliver-s3
  - id: firehose-012
    q: Can a Firehose stream with dynamic partitioning use zero buffering?
    a: No. Zero buffering is unavailable with dynamic partitioning and for the S3 backup destination.
    trap: true
    facts:
      - deliver-zero
  - id: firehose-021
    q: New CloudWatch log groups must automatically forward events through Firehose. How can the team
      automate subscription creation?
    a: Match the CloudTrail-backed CreateLogGroup API event in EventBridge and invoke Lambda. Have the
      function call PutSubscriptionFilter for the new group with the Firehose destination and
      delivery role; the caller needs iam:PassRole.
    facts:
      - deliver-create-event
      - deliver-event-target
      - deliver-api-filter
      - deliver-api-role
diagrams:
  - id: firehose-redshift-staging
    title: Firehose stages Redshift loads in S3
    width: 800
    height: 300
    nodes:
      - id: fire
        label: Firehose
        icon: data-firehose
        x: 40
        y: 90
        w: 160
        h: 72
        tone: integration
        info: Firehose buffers records before destination delivery.
      - id: stage
        label: S3 staging
        icon: res-simple-storage-service-bucket
        x: 320
        y: 90
        w: 160
        h: 72
        tone: storage
        info: Records are stored as S3 objects before the Redshift load.
      - id: warehouse
        label: Redshift
        icon: redshift
        x: 600
        y: 90
        w: 160
        h: 72
        tone: database
        info: A COPY command loads the staged S3 objects into Redshift.
    edges:
      - from: fire
        to: stage
        label: store batch
        step: 1
      - from: stage
        to: warehouse
        label: COPY
        step: 2
    steps:
      - Firehose writes the buffered records to S3.
      - Firehose issues COPY to load those S3 objects into Redshift.
---

Amazon Data Firehose delivers streaming records to storage and analytics destinations. Its buffer collects records before delivery, so applications can send data without writing a destination delivery consumer.

### How it works

1. Send records through a supported source. Direct PUT means application calls to Firehose through `PutRecord` or `PutRecordBatch`. CloudWatch Logs can use a subscription filter, which forwards selected log events. Network Firewall can send flow logs directly to a Firehose stream; WAF can also send request logs to Firehose.
2. For automatic subscription setup on new log groups, an EventBridge rule can match the CloudTrail-backed `CreateLogGroup` API event and invoke Lambda. The function calls `PutSubscriptionFilter` for the group, Firehose destination, and delivery role. Its caller permissions need `iam:PassRole`.

3. Give Firehose an IAM delivery role, a set of permissions it can assume. Its trust policy permits `firehose.amazonaws.com`; its permissions cover source reads and destination writes.
4. If the source is Kinesis Data Streams, write to that source stream. Firehose starts reading at `LATEST`, the newest position, and disables its own `PutRecord` and `PutRecordBatch` ingestion calls.
5. Firehose delivers when the size or interval buffer condition is met. S3 receives objects; OpenSearch receives bulk indexing requests. Redshift receives data through an intermediate S3 bucket followed by `COPY`, the database command that loads those objects.

| Destination | Buffer size hint, default | Interval hint, default |
|---|---|---|
| S3 | 1 to 128 MB, 5 MB | 0 to 900 seconds, 300 seconds |
| OpenSearch | 1 to 100 MB, 5 MB | 0 to 900 seconds, 300 seconds |
| HTTP endpoint | 1 to 64 MB, 5 MB | 0 to 900 seconds, 60 seconds |

### Exam cues

- If the question says ship CloudWatch Logs to S3 without a custom delivery consumer, think subscription filter to Firehose, because Firehose handles buffered delivery.
- If the question says Firehose loads Redshift, think S3 then `COPY`, because Firehose stages the objects before loading them.
- If the question says new log groups need automatic Firehose subscriptions, think EventBridge to Lambda calling `PutSubscriptionFilter`, because log-group creation can trigger subscription setup.
- If the question says retained Kinesis history must be copied when Firehose is attached, think a separate replay consumer, because Firehose starts at `LATEST`.
- If the question says Network Firewall flow logs must go directly to Firehose, think `KinesisDataFirehose` with `deliveryStream`, because these are its logging destination settings.

### Remember

- S3 destination defaults: 5 MB or 300 seconds, whichever is met first.
- S3 concatenation adds no delimiter by default. Enable the newline option when needed.
- OpenSearch expects UTF-8 single-line JSON objects.
- Zero buffering is unavailable for S3 backup and dynamic partitioning.
- WAF request logs can use CloudWatch Logs, S3, or Firehose.

> **Trap:** The buffering range belongs to the selected destination. Do not apply the S3 destination range to HTTP delivery or to S3 backup.
