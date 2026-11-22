---
title: Queue and stream event sources
level: associate
order: 30
facts:
  - id: mapping-batches
    text: A Lambda event source mapping reads queue or stream records and invokes a function with a batch.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html#invocation-eventsourcemapping
  - id: mapping-duplicates
    text: Event source mappings provide at-least-once processing and can repeat records.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html#invocation-eventsourcemapping
  - id: sqs-region
    text: A Lambda function and its SQS source must be in the same Region but may be in different accounts.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html#services-sqs-configure
  - id: sqs-role
    text: The execution role needs source-queue permissions; AWSLambdaSQSQueueExecutionRole supplies queue-reading permissions and an encrypted queue can also require kms:Decrypt.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html#services-sqs-configure
  - id: kinesis-role
    text: AWSLambdaKinesisExecutionRole supplies permissions for reading Kinesis records through a Lambda event source mapping.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-kinesis-create.html#services-kinesis-create
  - id: sqs-timeout
    text: Lambda requires function timeout to be no greater than the SQS visibility timeout.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html#services-sqs-configure
  - id: sqs-redrive
    text: SQS visibility timeout and source-queue redrive policy govern retries and dead-letter routing rather than function asynchronous invocation settings.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-retries.html#invocation-retries
  - id: sqs-batch-error
    text: By default, a failed SQS batch makes all messages visible again after visibility timeout, including successfully processed messages.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-errorhandling
  - id: sqs-batch-sizes
    text: The maximum SQS mapping batch size is 10,000 for standard queues and 10 for FIFO queues, or 10,000 for FIFO when the mapping uses provisioned mode; a size over 10 requires a batching window of at least one second.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html#services-sqs-configure
  - id: sqs-batch-payload
    text: SQS batches must fit the 6 MB synchronous invocation payload quota, including variable-length message metadata, which can reduce the number of records delivered.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html#events-sqs-eventsource
  - id: kinesis-order
    text: By default, Lambda processes one batch at a time per Kinesis shard and a function error blocks further progress in that shard.
    source: https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html#with-kinesis
  - id: stream-recovery
    text: Kinesis mapping MaximumRecordAgeInSeconds and MaximumRetryAttempts bound failed-record processing; BisectBatchOnFunctionError splits failed batches to isolate bad records.
    source: https://docs.aws.amazon.com/lambda/latest/dg/kinesis-on-failure-destination.html#kinesis-on-failure-destination
  - id: stream-destination
    text: A Kinesis mapping on-failure destination can retain discarded-batch information; S3 also retains the full invocation record.
    source: https://docs.aws.amazon.com/lambda/latest/dg/kinesis-on-failure-destination.html#kinesis-on-failure-destination
  - id: iterator-age
    text: IteratorAge helps detect a stalled Lambda stream consumer.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-retries.html#invocation-retries
  - id: esm-sources
    text: "Lambda event source mappings poll Amazon SQS, Kinesis, DynamoDB Streams, Amazon MQ, Amazon MSK and Amazon DocumentDB change streams."
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html
  - id: kinesis-polling
    text: A Lambda Kinesis standard iterator polls each shard at a base rate of once per second.
    source: https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html#kinesis-polling-and-batching
  - id: kinesis-fanout
    text: An enhanced fan-out Kinesis consumer has a dedicated connection to each shard and pushes records to Lambda to reduce latency.
    source: https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html#kinesis-polling-and-batching
diagrams:
  - id: lambda-sqs-batch-routing
    title: An SQS source queue owns failed-message redrive
    width: 800
    height: 360
    nodes:
      - id: queue
        label: Source SQS
        icon: simple-queue-service
        x: 30
        y: 40
        w: 170
        h: 72
        tone: integration
      - id: function
        label: Lambda batch
        icon: lambda
        x: 340
        y: 40
        w: 170
        h: 72
        tone: compute
      - id: retry
        label: Failed messages
        icon: simple-queue-service
        x: 340
        y: 240
        w: 170
        h: 72
        tone: integration
      - id: dlq
        label: Queue DLQ
        icon: simple-queue-service
        x: 30
        y: 240
        w: 170
        h: 72
        tone: integration
    edges:
      - from: queue
        to: function
        step: 1
      - from: function
        to: retry
        step: 2
      - from: retry
        to: queue
        step: 3
      - from: queue
        to: dlq
        step: 4
    steps:
      - The mapping reads a batch from the source SQS queue and invokes Lambda.
      - With partial responses enabled, the handler reports failed message IDs.
      - Failed messages in the source queue become available again after visibility timeout.
      - The source redrive policy isolates messages that exceed its receive-count threshold in the queue DLQ.
  - id: lambda-stream-failure-recovery
    title: A failed stream batch must be handled before progress resumes
    width: 900
    height: 320
    nodes:
      - id: stream
        label: Kinesis shard
        icon: kinesis-data-streams
        x: 30
        y: 100
        w: 170
        h: 72
        tone: integration
      - id: function
        label: Lambda batch
        icon: lambda
        x: 330
        y: 100
        w: 170
        h: 72
        tone: compute
      - id: dest
        label: Failure record
        icon: simple-storage-service
        x: 630
        y: 100
        w: 170
        h: 72
        tone: storage
    edges:
      - from: stream
        to: function
        step: 1
      - from: function
        to: dest
        step: 2
    steps:
      - The mapping invokes the function with a shard batch; default errors block shard progress.
      - Bounded retries or age allow discarding the batch; an on-failure destination retains failure information.
cards:
  - id: lambda-079
    q: How can a Lambda Kinesis consumer reduce latency compared with a standard iterator sharing shard throughput?
    a: Use an enhanced fan-out consumer. It has a dedicated connection and pushes records to Lambda; a standard iterator polls each shard at a base rate of once per second.
    facts: [kinesis-polling, kinesis-fanout]
  - id: lambda-001
    q: A Lambda function consuming Kinesis repeatedly fails on one bad record with default processing settings. What happens to its shard?
    a: Progress in the affected shard stops while Lambda retries the failed batch. Use mapping retry/age limits and batch bisection to isolate or discard bad records; an on-failure destination can retain discarded-batch information.
    trap: true
    facts:
      - kinesis-order
      - stream-recovery
      - stream-destination
  - id: lambda-008
    q: Does the asynchronous retry setting or function DLQ control failed SQS-triggered Lambda messages?
    a: No. Configure the SQS source queue visibility timeout and redrive policy with its DLQ. The event source mapping uses source-queue retry behavior.
    trap: true
    facts:
      - sqs-redrive
  - id: lambda-038
    q: A Lambda event source mapping cannot read its Kinesis stream. Where should the team check permissions?
    a: Check the function execution role for source-read permissions. AWSLambdaKinesisExecutionRole provides the relevant Kinesis permissions.
    facts:
      - kinesis-role
  - id: lambda-040
    q: A Lambda SQS source uses an encrypted queue. What additional execution-role permission can be needed beyond queue access?
    a: kms:Decrypt for the queue encryption key.
    facts:
      - sqs-role
  - id: lambda-056
    q: An SQS event source mapping for Lambda has a large configured batch size but sends fewer messages per invocation. What size limit can explain this?
    a: The 6 MB synchronous invocation payload limit includes message metadata. A batch can contain fewer messages than the configured maximum.
    facts:
      - sqs-batch-payload
      - sqs-batch-sizes
  - id: lambda-076
    q: "A team wants AWS Lambda to process messages from an Amazon MQ broker without writing a poller. Is that supported?"
    a: "Yes. An event source mapping can poll Amazon MQ, as it does SQS, Kinesis, DynamoDB Streams, MSK and DocumentDB change streams."
    facts: [esm-sources]
---
An event source mapping is a Lambda resource that reads a queue or stream and invokes a function with batches of records. Its retries belong to that source path. At-least-once processing means the same record can be processed again.

### How it works

1. Give the execution role permission to read the source. `AWSLambdaSQSQueueExecutionRole` and `AWSLambdaKinesisExecutionRole` provide source permissions; an encrypted SQS queue can also require `kms:Decrypt`.
2. For SQS, keep the queue and function in the same Region, including when their accounts differ. Lambda reads messages for a batch; visibility timeout hides received messages while they are being processed.
3. A failed SQS batch normally makes every message visible again after that timeout. The source queue redrive policy moves repeatedly received messages to its DLQ.
4. For Kinesis, a shard is a portion of the stream. By default Lambda processes one batch per shard at a time; an error blocks progress in that shard.
5. Bound stream failures with `MaximumRecordAgeInSeconds` and `MaximumRetryAttempts`. Use `BisectBatchOnFunctionError` to split failed batches and isolate bad records. A mapping on-failure destination retains discarded-batch information; S3 also retains the full invocation record.
6. A batch can be smaller than its configured maximum when messages and their metadata reach the 6 MB synchronous payload limit.

### Exam cues

- If the question says reduce Lambda Kinesis consumer latency, think enhanced fan-out, because a dedicated connection pushes records from each shard.
- If the question says an SQS batch contains fewer records than configured, think the 6 MB payload limit, because message metadata also uses space.
- If the question says one Kinesis record stalls a shard, think bisection and bounded retries or age, because more capacity alone does not repair the bad record.
- If the question says a stream consumer stops advancing, think `IteratorAge`, because it helps detect a stalled consumer.

### Remember

- A Lambda Kinesis standard iterator polls each shard at a base rate of once per second.
- The function timeout must be no greater than the SQS queue visibility timeout.
- SQS mapping maximum batch size: 10,000 for standard, 10 for FIFO (10,000 in provisioned mode). More than 10 records requires at least a 1-second batching window.
- Put the DLQ on the SQS source queue. Put stream failure settings and destinations on the event source mapping.
- Event source mappings: SQS, Kinesis, DynamoDB Streams, Amazon MQ, MSK, DocumentDB change streams.

> **Trap:** A function DLQ and asynchronous retry settings do not control failed SQS messages. Configure the source queue redrive policy and visibility timeout.
