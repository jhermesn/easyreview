---
title: Async destinations and dead-letter queues
level: associate
order: 20
facts:
  - id: dest-record
    text: An asynchronous destination receives a JSON invocation record containing request and response details.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-async-destinations
  - id: dest-conditions
    text: On-success destinations capture successful asynchronous invocations; on-failure destinations capture events that exceed maximum age or exhaust attempts.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-async-destinations
  - id: dest-targets
    text: Asynchronous destinations support standard SQS queues, standard SNS topics, Lambda functions, and EventBridge event buses.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-async-destinations
  - id: dest-s3
    text: An S3 bucket is supported as an asynchronous on-failure destination only.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-async-destinations
  - id: dlq-event
    text: A function dead-letter queue receives discarded asynchronous event content without the function response details in a destination record.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-dlq
  - id: dlq-targets
    text: A function dead-letter queue can be a standard SQS queue or standard SNS topic; FIFO queues and topics are unsupported.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-dlq
  - id: dest-scope
    text: Asynchronous destinations can be configured for a function, version, or alias.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-async-destinations
  - id: dlq-scope
    text: The function-level dead-letter queue setting is shared by published versions and $LATEST.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-dlq
  - id: sqs-source-dlq
    text: SQS-triggered Lambda retries and failure routing use the source queue visibility timeout and redrive policy.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-retries.html#invocation-retries
  - id: zero-routing
    text: For asynchronous invocations, setting reserved concurrency to zero sends new events to the configured DLQ or on-failure destination without retries.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-async-retain-records
diagrams:
  - id: lambda-async-outcome-routing
    title: Route asynchronous outcomes to separate destinations
    width: 760
    height: 330
    nodes:
      - id: function
        label: Lambda
        icon: lambda
        x: 40
        y: 110
        w: 170
        h: 72
        tone: compute
      - id: success
        label: Success target
        icon: eventbridge
        x: 500
        y: 30
        w: 170
        h: 72
        tone: integration
      - id: failure
        label: Failure target
        icon: simple-queue-service
        x: 500
        y: 210
        w: 170
        h: 72
        tone: integration
    edges:
      - from: function
        to: success
        step: 1
      - from: function
        to: failure
        step: 2
    steps:
      - A successful asynchronous execution can emit a record to an on-success destination.
      - An event that expires or exhausts attempts can emit a record to an on-failure destination.
cards:
  - id: lambda-006
    q: A team must retain asynchronous Lambda events that expire or exhaust retries. What should it configure?
    a: Configure an on-failure destination or a function dead-letter queue. The destination includes request and response details; a DLQ retains the event without those response details.
    facts:
      - dest-conditions
      - dest-record
      - dlq-event
  - id: lambda-007
    q: How do asynchronous Lambda destinations and a function DLQ differ?
    a: Destinations can capture success or failure records and support standard SQS, standard SNS, Lambda, and EventBridge; S3 is failure-only. A function DLQ handles discarded events through standard SQS or standard SNS without the destination response record.
    facts:
      - dest-record
      - dest-conditions
      - dest-targets
      - dest-s3
      - dlq-event
      - dlq-targets
  - id: lambda-024
    q: A team wants a record of successful asynchronous Lambda executions. Can it use the function DLQ?
    a: Use an on-success destination. A function DLQ handles discarded events, not successful invocations.
    trap: true
    facts:
      - dest-conditions
      - dlq-event
  - id: lambda-026
    q: Can an asynchronous Lambda destination send failed execution records to an SQS FIFO queue?
    a: No. The SQS destination must be a standard queue. FIFO is also unsupported for a function DLQ.
    trap: true
    facts:
      - dest-targets
      - dlq-targets
---
Asynchronous destinations retain invocation records so another service can act on a successful or failed execution. A dead-letter queue (DLQ) retains discarded events for later processing. Think of a destination as an execution report and a DLQ as the event to revisit.

### How it works

1. Choose `On success` or `On failure` for the asynchronous destination. Failure includes exhausting attempts or exceeding maximum event age.
2. Lambda sends a JSON invocation record containing the request and response details to the chosen target. Configure the function execution role, the permissions Lambda uses while running the function, to deliver that record.
3. Alternatively, configure a function DLQ. It receives discarded event content without the function response details included in a destination record.

| Target | Asynchronous destination | Function DLQ |
|---|---|---|
| Standard SQS queue | Success or failure | Discarded events |
| Standard SNS topic | Success or failure | Discarded events |
| Lambda function | Success or failure | Unsupported |
| EventBridge event bus | Success or failure | Unsupported |
| S3 bucket | Failure only | Unsupported |

### Exam cues

- If the question says retain the response and error details, think on-failure destination, because it includes an invocation record.
- If the question says start work after a successful asynchronous execution, think on-success destination, because a DLQ only retains discarded events.
- If the question says SQS-triggered messages need a failure queue, think source-queue redrive policy, because the function's asynchronous settings do not control SQS polling.

### Remember

- Asynchronous destinations can be set on a function, version, or alias. The function DLQ is configured at function level and shared by versions.
- SQS and SNS targets must be standard. S3 is an on-failure destination only.
- Reserved concurrency of 0 sends new asynchronous events to the configured failure destination or DLQ without retries.

> **Trap:** A function DLQ does not capture failed SQS-triggered batches. Configure the DLQ on the source SQS queue.
