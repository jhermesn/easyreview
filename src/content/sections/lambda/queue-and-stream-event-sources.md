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
  - id: sqs-visibility
    text: AWS recommends SQS visibility timeout of at least six times the function timeout plus MaximumBatchingWindowInSeconds.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html#services-sqs-configure
  - id: sqs-redrive
    text: SQS visibility timeout and source-queue redrive policy govern retries and dead-letter routing rather than function asynchronous invocation settings.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-retries.html#invocation-retries
  - id: sqs-batch-error
    text: By default, a failed SQS batch makes all messages visible again after visibility timeout, including successfully processed messages.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-errorhandling
  - id: sqs-partial
    text: Enable ReportBatchItemFailures in FunctionResponseTypes and return failed SQS message IDs as itemIdentifier entries in batchItemFailures to retry only failed messages.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-errorhandling
  - id: sqs-partial-scaling
    text: With ReportBatchItemFailures enabled, Lambda does not scale down SQS message polling when function invocations fail.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-batchfailurereporting
  - id: sqs-fifo-partial
    text: For SQS FIFO partial responses, stop after the first failure and return failed and unprocessed messages to preserve order.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-errorhandling
  - id: sqs-throw
    text: Throwing an exception from a Lambda SQS handler makes the entire batch fail even when partial responses are enabled.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-errorhandling
  - id: sqs-batch-sizes
    text: The maximum SQS mapping batch size is 10,000 for standard queues and 10 for FIFO queues; a size over 10 requires a batching window of at least one second.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html#services-sqs-configure
  - id: sqs-batch-payload
    text: SQS batches must fit the 6 MB synchronous invocation payload quota, including variable-length message metadata, which can reduce the number of records delivered.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html#events-sqs-eventsource
  - id: kinesis-order
    text: By default, Lambda processes one batch at a time per Kinesis shard and a function error blocks further progress in that shard.
    source: https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html#with-kinesis
  - id: parallel-factor
    text: ParallelizationFactor can increase concurrent batches per Kinesis shard from the default 1 to 10, while preserving partition-key ordering.
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
  - id: lambda-001
    q: A Lambda function consuming Kinesis repeatedly fails on one bad record with default processing settings. What happens to its shard?
    a: Progress in the affected shard stops while Lambda retries the failed batch. Use mapping retry/age limits and batch bisection to isolate or discard bad records; an on-failure destination can retain discarded-batch information.
    trap: true
    facts:
      - kinesis-order
      - stream-recovery
      - stream-destination
  - id: lambda-002
    q: A Lambda SQS consumer reprocesses successful messages after one message fails. What settings and response should it use?
    a: Enable ReportBatchItemFailures and return failed message IDs in batchItemFailures. For FIFO, stop at the first failure and also return unprocessed messages. AWS recommends visibility timeout of at least six times function timeout plus the batching window.
    facts:
      - sqs-partial
      - sqs-fifo-partial
      - sqs-visibility
  - id: lambda-003
    q: A Lambda consumer retries an entire SQS batch after one record fails. How can it avoid retrying successful records?
    a: Enable ReportBatchItemFailures in the mapping FunctionResponseTypes and return failed message IDs as itemIdentifier entries in batchItemFailures.
    facts:
      - sqs-partial
  - id: lambda-008
    q: Does the asynchronous retry setting or function DLQ control failed SQS-triggered Lambda messages?
    a: No. Configure the SQS source queue visibility timeout and redrive policy with its DLQ. The event source mapping uses source-queue retry behavior.
    trap: true
    facts:
      - sqs-redrive
  - id: lambda-009
    q: A Lambda SQS consumer enables ReportBatchItemFailures but throws an exception after processing part of the batch. What is retried?
    a: The entire batch fails. Catch item-level errors and return a partial response with failed message IDs to preserve successful results.
    facts:
      - sqs-throw
      - sqs-partial
  - id: lambda-038
    q: A Lambda event source mapping cannot read its Kinesis stream. Where should the team check permissions?
    a: Check the function execution role for source-read permissions. AWSLambdaKinesisExecutionRole provides the relevant Kinesis permissions.
    facts:
      - kinesis-role
  - id: lambda-039
    q: A Lambda Kinesis consumer needs more parallel work per shard while retaining partition-key order. What setting applies?
    a: ParallelizationFactor, from 1 by default through 10 concurrent batches per shard.
    facts:
      - parallel-factor
  - id: lambda-040
    q: A Lambda SQS source uses an encrypted queue. What additional execution-role permission can be needed beyond queue access?
    a: kms:Decrypt for the queue encryption key.
    facts:
      - sqs-role
  - id: lambda-053
    q: An SQS queue feeds Lambda and some messages routinely fail. How can the team avoid retrying successful messages without reducing polling on failures?
    a: Enable `ReportBatchItemFailures` and return failed message IDs. Lambda does not scale down polling on function failures with that setting enabled.
    facts:
      - sqs-partial
      - sqs-partial-scaling
  - id: lambda-056
    q: An SQS event source mapping for Lambda has a large configured batch size but sends fewer messages per invocation. What size limit can explain this?
    a: The 6 MB synchronous invocation payload limit includes message metadata. A batch can contain fewer messages than the configured maximum.
    facts:
      - sqs-batch-payload
      - sqs-batch-sizes
---
An event source mapping is a Lambda resource that reads a queue or stream and invokes a function with batches of records. Its retries belong to that source path. At-least-once processing means the same record can be processed again.

### How it works

1. Give the execution role permission to read the source. `AWSLambdaSQSQueueExecutionRole` and `AWSLambdaKinesisExecutionRole` provide source permissions; an encrypted SQS queue can also require `kms:Decrypt`.
2. For SQS, keep the queue and function in the same Region, including when their accounts differ. Lambda reads messages for a batch; visibility timeout hides received messages while they are being processed.
3. A failed SQS batch normally makes every message visible again after that timeout. Enable `ReportBatchItemFailures` in `FunctionResponseTypes`, then return only failed message IDs as `itemIdentifier` entries in `batchItemFailures`.
4. For FIFO (first-in, first-out) queues, stop at the first failure and include failed and unprocessed messages in that response. Throwing an exception fails the whole batch even when partial responses are enabled.
5. For Kinesis, a shard is a portion of the stream. By default Lambda processes one batch per shard at a time; an error blocks progress in that shard. `ParallelizationFactor` increases concurrent batches while preserving order for records sharing a partition key, the value that groups related records.
6. Bound stream failures with `MaximumRecordAgeInSeconds` and `MaximumRetryAttempts`. Use `BisectBatchOnFunctionError` to split failed batches and isolate bad records. A mapping on-failure destination retains discarded-batch information; S3 also retains the full invocation record.
7. With `ReportBatchItemFailures` enabled, Lambda does not scale down SQS polling when function invocations fail.
8. A batch can be smaller than its configured maximum when messages and their metadata reach the 6 MB synchronous payload limit.

### Exam cues

- If the question says successful SQS records run again after one failure, think partial batch responses, because the default retries the whole batch.
- If the question says expected SQS message failures must not reduce polling, think `ReportBatchItemFailures`, because Lambda does not scale polling down on function failures with it enabled.
- If the question says an SQS batch contains fewer records than configured, think the 6 MB payload limit, because message metadata also uses space.
- If the question says a FIFO batch has a failure followed by unprocessed records, think return both sets, because continuing past the failure can violate order.
- If the question says one Kinesis record stalls a shard, think bisection and bounded retries or age, because more capacity alone does not repair the bad record.
- If the question says a stream consumer stops advancing, think `IteratorAge`, because it helps detect a stalled consumer.

### Remember

- Required SQS rule: function timeout must be no greater than queue visibility timeout. AWS recommendation: visibility timeout at least `6 × function timeout + batching window`.
- SQS mapping maximum batch size: 10,000 for standard, 10 for FIFO. More than 10 records requires at least a 1-second batching window.
- Kinesis `ParallelizationFactor`: 1 by default, up to 10.
- Put the DLQ on the SQS source queue. Put stream failure settings and destinations on the event source mapping.

> **Trap:** Returning partial failures without enabling `ReportBatchItemFailures` does not activate partial batch handling. Both mapping configuration and handler response are required.
