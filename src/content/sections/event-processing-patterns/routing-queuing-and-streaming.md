---
title: Routing, queuing, and streaming
level: associate
order: 10
facts:
  - id: route-bus
    text: An EventBridge default or Classic event bus evaluates incoming events against rule patterns
      and sends matches to the configured targets.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html#eb-what-is-how-it-works
  - id: route-pipe
    text: An EventBridge pipe connects one supported source to one target, with optional filtering
      followed by enrichment before delivery.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html#pipes-how-it-works
  - id: route-sns
    text: SNS pushes published messages to subscriptions; SQS stores messages for applications to
      retrieve by polling.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html#sns-sqs-as-subscriber
  - id: route-sqs
    text: Receiving an SQS message hides it temporarily; the consumer deletes it after successful
      processing.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html#sqs-visibility-timeout
  - id: route-stream
    text: Kinesis Data Streams stores sequences of records in shards, and multiple applications can read
      a stream independently.
    source: https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html#stream
  - id: route-retention
    text: Kinesis Data Streams retains records for 24 hours by default and supports retention up to 365
      days.
    source: https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html#retention
  - id: route-firehose
    text: Firehose delivers records to a configured destination, including S3, Redshift, OpenSearch,
      Splunk, HTTP endpoints, or Snowflake.
    source: https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html#basic-deliver
  - id: route-buffer
    text: Firehose buffers incoming records before delivery; an S3 destination combines records into
      objects.
    source: https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html#basic-deliver
  - id: route-kinesis-source
    text: A Firehose delivery stream can act as a consumer of Kinesis Data Streams.
    source: https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html#high-level-architecture
  - id: route-search
    text: Firehose sends bulk indexing requests to OpenSearch and expects UTF-8 single-line JSON records.
    source: https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html#basic-deliver
  - id: route-lambda
    text: Lambda event source mappings read Kinesis records and can process records more than once.
    source: https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html#with-kinesis
  - id: route-athena
    text: Athena can query data stored in Amazon S3 using SQL.
    source: https://docs.aws.amazon.com/athena/latest/ug/what-is.html#what-is
  - id: route-partition
    text: A Kinesis partition key groups records into a shard; each shard holds a sequence of records.
    source: https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html#partition-key
  - id: route-cloudwatch
    text: CloudWatch Logs subscription filters can forward log events to Kinesis Data Streams.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#DestinationKinesisExample
  - id: route-kcl
    text: Kinesis Client Library supports fault-tolerant consumption of stream records.
    source: https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html#client-library
diagrams:
  - id: streaming-observability
    title: Stream, deliver and query operational data
    width: 1025
    height: 570
    nodes:
      - id: producers
        label: Producers
        sub: apps, CloudWatch Logs
        icon: res-client
        x: 25
        y: 188
        w: 150
        h: 86
        tone: user
        info: A producer writes records with partition keys to Kinesis Data Streams.
      - id: stream
        label: Data Streams
        sub: retain + replay
        icon: kinesis-data-streams
        x: 288
        y: 188
        w: 140
        h: 86
        tone: integration
        info: Records remain available during retention. Multiple applications can consume the same stream
          independently.
      - id: firehose
        label: Firehose
        sub: buffer + deliver
        icon: data-firehose
        x: 550
        y: 188
        w: 140
        h: 86
        tone: integration
        info: Firehose consumes the stream and buffers records before destination delivery.
      - id: s3
        label: S3
        sub: archive + Athena
        icon: res-simple-storage-service-bucket
        x: 825
        y: 45
        w: 140
        h: 86
        tone: storage
        info: Firehose stores batches as S3 objects. Athena can query data stored in S3.
      - id: search
        label: OpenSearch
        sub: search + dashboards
        icon: opensearch-service
        x: 825
        y: 330
        w: 140
        h: 86
        tone: database
        info: Firehose uses bulk requests to index records in OpenSearch. Input records must be UTF-8
          single-line JSON objects.
      - id: fn
        label: Lambda
        sub: custom consumer
        icon: lambda
        x: 550
        y: 435
        w: 140
        h: 86
        tone: compute
        info: A Lambda event source mapping reads Kinesis records and invokes a function. Duplicate
          processing is possible.
    edges:
      - from: producers
        to: stream
        step: 1
        label: write
      - from: stream
        to: firehose
        step: 2
        label: consume
      - from: firehose
        to: s3
        step: 3
        label: deliver
      - from: firehose
        to: search
        step: 4
        label: or index
      - from: stream
        to: fn
        step: 5
        label: poll
        dashed: true
    steps:
      - Producers write records to the stream with partition keys.
      - Firehose reads the stream and buffers records for delivery.
      - An S3 destination stores batches as objects that Athena can query.
      - An alternative OpenSearch destination indexes the records in bulk.
      - A Lambda or KCL consumer can read the same stream independently for custom processing.
cards:
  - id: event-processing-patterns-002
    q: When should an application use Kinesis Data Streams rather than Firehose?
    a: Use Kinesis Data Streams when independent consumers must reread retained records. Use Firehose
      for buffered delivery to a configured destination.
    trap: true
    facts:
      - route-stream
      - route-retention
      - route-firehose
      - route-buffer
  - id: event-processing-patterns-004
    q: A team archives transformed events through Firehose and also needs independent replay of the
      original events. Which source should Firehose consume?
    a: Kinesis Data Streams. It retains the source records so another consumer can reread them while
      Firehose handles destination delivery.
    facts:
      - route-kinesis-source
      - route-stream
      - route-retention
  - id: event-processing-patterns-006
    q: How do EventBridge event buses, SNS, and SQS differ in an event processing design?
    a: EventBridge default or Classic bus rules route matching events. SNS pushes messages to
      subscribers. SQS buffers messages for polling consumers.
    facts:
      - route-bus
      - route-sns
  - id: event-processing-patterns-008
    q: How does processing an SQS message differ from reading a Kinesis Data Streams record?
    a: An SQS consumer deletes a successfully processed message. A Kinesis record remains available
      during retention for independent readers.
    facts:
      - route-sqs
      - route-stream
      - route-retention
  - id: event-processing-patterns-009
    q: An application must filter one SQS source, add reference data, and send matching events to one
      target without integration code. Which EventBridge feature fits?
    a: EventBridge Pipes. A pipe connects one source to one target with optional filtering and
      enrichment.
    facts:
      - route-pipe
  - id: event-processing-patterns-010
    q: An operations team must route only matching AWS service events to an automation target. Which
      EventBridge mechanism fits?
    a: A rule on the default event bus. EventBridge evaluates the rule pattern and delivers matching
      events to its targets.
    facts:
      - route-bus
---

Event processing separates the component that reports a change from the component that handles it. EventBridge routes events, SNS distributes copies, SQS buffers work, and Kinesis Data Streams retains records for independent readers.

| Need | Service or feature | Mechanism |
|---|---|---|
| Route by event content | EventBridge default or Classic event bus | Rules match patterns and select targets |
| Connect one source to one target | EventBridge Pipes | Filter, optionally enrich, then deliver |
| Distribute copies | SNS | Push a message to subscriptions |
| Buffer work | SQS | Consumers poll and delete completed messages |
| Read and replay a record sequence | Kinesis Data Streams | Consumers read retained records from shards |
| Deliver records to storage or analytics | Firehose | Buffer records and deliver to a configured destination |

A shard is one ordered sequence within a Kinesis stream. A consumer is an application that reads or processes messages or records.

### How it works

1. Choose routing when event content determines the destination. A default or Classic event bus compares the event with rule patterns.
2. Choose SNS when subscribers need copies. Add an SQS queue to a subscription when that consumer needs stored work to poll later.
3. Choose Kinesis Data Streams when applications need separate read positions and replay. Reading does not consume the retained record for other applications.
4. For managed destination delivery, let Firehose consume Kinesis Data Streams. It can write batches to S3 or index records in OpenSearch. A Lambda consumer can independently process the same stream.

### Exam cues

- If the question says several applications must reread the original events independently, think Kinesis Data Streams, because each application can read retained records.
- If the question says filter and enrich one source before sending to one target, think EventBridge Pipes, because that is its integration model.
- If the question says distribute one notification but let each application work later, think SNS with SQS subscriptions, because SNS sends copies and SQS stores them.

### Remember

- Kinesis retention defaults to 24 hours and can reach 365 days.
- SQS messages need deletion after successful processing.
- Firehose buffers destination delivery. Redshift, S3, and OpenSearch are destination choices, not independent replay consumers.
- Firehose OpenSearch input must be UTF-8 single-line JSON. Athena queries data stored in S3.

> **Trap:** A delivery pipeline alone does not explain how another application will replay the source. Keep the source in Kinesis Data Streams when independent rereading is required.
