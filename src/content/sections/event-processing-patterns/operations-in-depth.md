---
title: Lambda SQS batch failures
level: professional
order: 40
facts:
  - id: pressure-batch
    text: A Lambda SQS batch failure retries the entire batch by default; ReportBatchItemFailures with a
      batchItemFailures response retries only reported failed messages.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-batchfailurereporting
  - id: pressure-timeout
    text: AWS recommends SQS visibility timeout of at least six times the Lambda function timeout, plus
      the batch window when one is configured.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html#events-sqs-queueconfig
  - id: pressure-fifo-batch
    text: For a FIFO partial batch response, stop after the first failed message and report failed and
      unprocessed messages to preserve ordering.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-batchfailurereporting
cards:
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
---
Lambda can process SQS messages in batches. Partial batch responses let failed messages be retried without retrying the successful messages in the same batch.

### How it works

1. Set the SQS visibility timeout to at least six times the Lambda function timeout, plus the batching window when configured. See [queue configuration](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html#events-sqs-queueconfig).
2. Enable `ReportBatchItemFailures` on the event source mapping and return failed message IDs in `batchItemFailures`. By default, a batch failure retries every message in the batch. See [partial batch responses](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-batchfailurereporting).
3. For a FIFO queue, stop processing after the first failure and report both failed and unprocessed messages to preserve order.

### Exam cues

- If the question says one message fails in a batch of successful messages, think partial batch responses, because they retry only the reported failures.
- If the question says an SQS batching window is configured, think visibility timeout of at least six times the function timeout plus the window, because the recommendation accounts for both.
- If the question says a FIFO batch has a failure, think stop at the first failure and report failed and unprocessed messages, because this preserves order.

### Remember

- Visibility timeout: at least 6 times the function timeout, plus any configured batching window.
- Enable `ReportBatchItemFailures` and return failed message IDs in `batchItemFailures`.
- For FIFO, include unprocessed messages in the response after the first failure.

> **Trap:** Enabling partial batch responses alone does not identify failed messages. The function must return their IDs in `batchItemFailures`; for FIFO, it must also report unprocessed messages after the first failure.
