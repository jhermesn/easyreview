---
title: "PLACEHOLDER event-processing-patterns/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
