---
title: Backpressure and idempotency
level: professional
order: 30
facts:
  - id: pressure-visibility
    text: SQS hides a received message for the visibility timeout; if it is not deleted, it can be
      received again after that timeout.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html#sqs-visibility-timeout
  - id: pressure-idempotent
    text: SQS standard queues can deliver a message more than once; consumers should tolerate repeated
      processing without unintended effects.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html#standard-queues-at-least-once-delivery
  - id: pressure-lambda-duplicates
    text: Lambda SQS event source mappings process messages at least once, including FIFO sources, so
      function code must handle duplicate processing.
    source: https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html#sqs-polling-behavior
  - id: pressure-limit
    text: For an SQS event source mapping without provisioned mode, maximum concurrency limits
      simultaneous Lambda invocations from that queue.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-scaling.html#events-sqs-max-concurrency
  - id: pressure-reserved
    text: If a Lambda function has reserved concurrency, it should be at least the sum of maximum
      concurrency values for all its SQS mappings to avoid throttling.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-scaling.html#events-sqs-max-concurrency
  - id: pressure-timeout
    text: AWS recommends SQS visibility timeout of at least six times the Lambda function timeout, plus
      the batch window when one is configured.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html#events-sqs-queueconfig
  - id: pressure-batch
    text: A Lambda SQS batch failure retries the entire batch by default; ReportBatchItemFailures with a
      batchItemFailures response retries only reported failed messages.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-batchfailurereporting
  - id: pressure-fifo
    text: SQS FIFO ordering applies within a message group; different message groups can be processed
      independently.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-understanding-logic.html#FIFO-queues-understanding-logic
  - id: pressure-fifo-batch
    text: For a FIFO partial batch response, stop after the first failed message and report failed and
      unprocessed messages to preserve ordering.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-batchfailurereporting
  - id: pressure-dlq
    text: The SQS redrive policy maxReceiveCount controls how many receives a message can have before
      movement to a dead-letter queue.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html#policies-for-dead-letter-queues
  - id: pressure-age
    text: SQS ApproximateNumberOfMessagesVisible estimates available work and
      ApproximateAgeOfOldestMessage reports the oldest unprocessed message age, with documented
      exclusions for repeatedly received standard-queue messages.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-available-cloudwatch-metrics.html#sqs-metrics
  - id: pressure-backlog
    text: Backpressure occurs when an SQS producer persistently sends messages faster than the Lambda
      consumer processes them.
    source: https://docs.aws.amazon.com/lambda/latest/dg/troubleshooting-event-source-mapping.html#troubleshooting-event-source-mapping
  - id: pressure-recover
    text: To increase Lambda SQS processing capacity, investigate function performance, batch size,
      concurrency quota, or provisioned event-source polling.
    source: https://docs.aws.amazon.com/lambda/latest/dg/troubleshooting-event-source-mapping.html#troubleshooting-event-source-mapping
  - id: pressure-send-dedup
    text: SQS FIFO avoids adding duplicate messages when the same SendMessage is retried within its
      5-minute deduplication interval.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-exactly-once-processing.html#FIFO-queues-exactly-once-processing
  - id: pressure-reserved-definition
    text: Reserved concurrency reserves a function-level execution allocation and sets its upper
      concurrency limit.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html#configuration-concurrency
cards:
  - id: event-processing-patterns-013
    q: An SQS-triggered Lambda function overwhelms a downstream database during traffic bursts. Which
      event source setting can limit simultaneous work?
    a: Set maximum concurrency on the SQS event source mapping without provisioned mode. Keep function
      reserved concurrency sufficient for all configured SQS mapping limits.
    facts:
      - pressure-limit
      - pressure-reserved
  - id: event-processing-patterns-014
    q: An SQS-triggered Lambda function finishes a payment operation but fails before the message is
      deleted. Can FIFO alone prevent the operation from repeating?
    a: No. Lambda SQS mappings can process a message more than once, including FIFO sources. Make the
      payment handler idempotent so a repeated message has no extra effect.
    trap: true
    facts:
      - pressure-visibility
      - pressure-lambda-duplicates
  - id: event-processing-patterns-015
    q: A Lambda SQS batch contains successful messages and one failure. How can the team retry only
      failed messages?
    a: Enable ReportBatchItemFailures and return failed message IDs in batchItemFailures. By default a
      batch failure returns every message for retry.
    facts:
      - pressure-batch
  - id: event-processing-patterns-016
    q: A Lambda function uses an SQS batching window. What visibility timeout does AWS recommend?
    a: At least six times the function timeout, plus the configured batching window. This leaves time
      for processing and throttling retries.
    facts:
      - pressure-timeout
  - id: event-processing-patterns-017
    q: A Lambda function processes an SQS FIFO batch and encounters a failed message. How should its
      partial batch response preserve order?
    a: Stop processing after the first failure and report both failed and unprocessed messages in
      batchItemFailures.
    facts:
      - pressure-fifo-batch
  - id: event-processing-patterns-018
    q: What does idempotent processing mean for an SQS consumer?
    a: Processing the same message again causes no unintended extra effect. Standard queues and Lambda
      event source mappings can deliver duplicate work.
    facts:
      - pressure-idempotent
      - pressure-lambda-duplicates
---

Backpressure occurs when a producer consistently sends work faster than its consumer can process it. An SQS backlog holds waiting work while a Lambda event source concurrency limit controls simultaneous processing. Idempotency means repeated processing has no unintended extra effect.

### How it works

1. Buffer work in SQS. Monitor visible messages and the approximate age of the oldest unprocessed message to detect a growing backlog. To increase processing capacity, investigate function speed, batch size, concurrency quotas, or provisioned polling.
2. For an SQS Lambda mapping without provisioned mode, set maximum concurrency to limit simultaneous invocations. Reserved concurrency is the function-level allocation; keep it sufficient for the sum of its SQS mapping limits.
3. Receiving a message starts its visibility timeout, the period during which it is hidden from other receives. Delete it after success. Undeleted messages can return after that period.
4. Make the handler idempotent because processing can repeat. For mixed-success Lambda batches, enable `ReportBatchItemFailures` and return the failed message IDs.
5. Use a redrive policy to move repeatedly unsuccessful messages to a dead-letter queue for investigation. For FIFO, meaning first in, first out, preserve order within each message group when reporting partial failures.

### Exam cues

- If the question says a queue-triggered function overwhelms its downstream service, think maximum concurrency on the mapping, because it caps simultaneous invocations from that queue.
- If the question says successful messages repeat after one batch item fails, think partial batch responses, because the default retries the entire batch.
- If the question says a payment succeeded before the handler crashed, think idempotent handling, because deleting or acknowledging work can fail after its side effect succeeds.

### Remember

- Recommended visibility timeout: at least 6 times the function timeout, plus any batching window.
- `ReportBatchItemFailures` requires the handler to return `batchItemFailures`.
- FIFO order is per message group. For partial failure, stop after the first failure and report failed and unprocessed messages.
- `maxReceiveCount` controls SQS movement to a dead-letter queue.

> **Trap:** FIFO deduplication removes repeated producer sends within a 5-minute interval. It does not make a Lambda handler's side effects execute exactly once: Lambda SQS mappings can process a message more than once.
