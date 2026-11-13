---
title: Pipes filtering and enrichment
level: associate
order: 50
facts:
  - id: pipe-flow
    text: A pipe connects one source to one target with optional filtering followed by optional enrichment.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html
  - id: pipe-sources
    text: Pipe sources include SQS, Kinesis, DynamoDB Streams, Amazon MQ, Amazon MSK, and self-managed Apache
      Kafka.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-event-source.html#eb-pipes-event-source
  - id: pipe-charge
    text: Only events matching the pipe filter are charged for pipe processing.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html
  - id: enrichment-options
    text: Pipe enrichments can use Lambda, API Gateway, API destinations, or Step Functions Express workflows.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/pipes-enrichment.html#pipes-enrichment
  - id: enrichment-sync
    text: "Enrichment is synchronous: Pipes waits for its response before invoking the target."
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/pipes-enrichment.html#pipes-invocation
  - id: sqs-filter-delete
    text: Pipes removes SQS messages that do not match the filter.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-event-filtering.html#pipes-filter-sqs
  - id: sqs-retries
    text: For customer invocation errors with an SQS source, retry count follows the source queue maximum receive
      count.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-error-troubleshooting.html#eb-pipes-error-invoke-customer
  - id: sqs-dlq
    text: An SQS-source pipe uses the source queue redrive policy and DLQ.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-error-troubleshooting.html#eb-pipes-dlq-behavior
  - id: stream-retries
    text: For customer invocation errors with Kinesis or DynamoDB sources, retries stop at the retry-count limit
      or maximum record age, whichever comes first.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-error-troubleshooting.html#eb-pipes-error-invoke-customer
  - id: stream-dlq
    text: Kinesis and DynamoDB source pipes can use SQS or SNS dead-letter destinations, but not FIFO DLQs.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-error-troubleshooting.html#eb-pipes-dlq-behavior
  - id: record-age
    text: A stream pipe maximum record age should be shorter than source retention so failed records can reach its
      DLQ before expiring.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-error-troubleshooting.html#eb-pipes-dlq-behavior
  - id: partial-batch
    text: Pipes supports partial batch failure handling for target failures with SQS, Kinesis, and DynamoDB
      sources.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-error-troubleshooting.html#eb-pipes-error-invoke-customer
  - id: async-runtime
    text: A pipe must invoke compute synchronously to observe runtime errors; it cannot retry execution failures
      inside an asynchronously invoked Step Functions Standard workflow.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-error-troubleshooting.html#eb-pipes-error-invoke-customer
  - id: internal-retry
    text: Pipes retries internal errors until the record expires in the source; these retries do not count against stream retry limits or the SQS maximum receive count.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-error-troubleshooting.html#eb-pipes-error-invoke-internal
  - id: source-key-permission
    text: For a pipe source encrypted with a customer managed KMS key, both the pipe execution role and the key policy need to allow kms:Decrypt.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes-error-troubleshooting.html#eb-pipes-error-handling-cms
diagrams:
  - id: eventbridge-pipe-processing
    title: A pipe filters before synchronously enriching an event
    width: 1030
    height: 200
    nodes:
      - id: source
        label: SQS source
        sub: messages to process
        icon: simple-queue-service
        x: 30
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: filter
        label: Pipe filter
        sub: keeps matching messages
        icon: eventbridge
        x: 290
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: enrich
        label: Lambda enrichment
        sub: wait for response
        icon: lambda
        x: 550
        y: 60
        w: 190
        h: 86
        tone: compute
      - id: target
        label: Target queue
        sub: receives enriched data
        icon: simple-queue-service
        x: 810
        y: 60
        w: 190
        h: 86
        tone: integration
    edges:
      - from: source
        to: filter
        step: 1
      - from: filter
        to: enrich
        step: 2
      - from: enrich
        to: target
        step: 3
    steps:
      - Pipes reads source messages and evaluates its filter.
      - Matching messages reach the synchronous enrichment.
      - After enrichment responds, Pipes invokes the target with the prepared data.
cards:
  - id: eventbridge-010
    q: A team needs EventBridge to filter and enrich messages from one supported source before one target. Which
      feature fits?
    a: "Use EventBridge Pipes: source, optional filter, optional synchronous enrichment, then target. Enrichment
      can use Lambda, API Gateway, API destinations, or Step Functions Express."
    facts:
      - pipe-flow
      - enrichment-options
      - enrichment-sync
  - id: eventbridge-011
    q: How do EventBridge Pipes customer-error retries and dead-letter handling differ for SQS and stream sources?
    a: SQS uses the source queue maximum receive count and redrive DLQ. Kinesis and DynamoDB use pipe retry count
      or record age, then an optional SQS or SNS DLQ; FIFO DLQs are unsupported for those streams.
    facts:
      - sqs-retries
      - sqs-dlq
      - stream-retries
      - stream-dlq
  - id: eventbridge-012
    q: A team wants only selected messages to reach EventBridge Pipes enrichment and the target. What should it
      add?
    a: Add a filter before enrichment. Only matching events proceed, and only matching events incur pipe
      processing charges.
    facts:
      - pipe-flow
      - pipe-charge
  - id: eventbridge-030
    q: An EventBridge Pipe reads an SQS queue and rejects a message with its filter. Can another consumer later
      receive that rejected message?
    a: No. Pipes removes unmatched SQS messages from the source queue.
    trap: true
    facts:
      - sqs-filter-delete
  - id: eventbridge-031
    q: An EventBridge Pipe starts a Step Functions Standard workflow, which later fails. Why does the pipe not
      retry that workflow failure?
    a: Standard workflow targets are invoked asynchronously. Pipes cannot observe and retry errors inside the
      later workflow execution.
    trap: true
    facts:
      - async-runtime
  - id: eventbridge-032
    q: How can EventBridge Pipes avoid retrying an entire SQS, Kinesis, or DynamoDB batch after some target
      records fail?
    a: Use partial batch failure handling so the target identifies failed records.
    facts:
      - partial-batch
  - id: eventbridge-047
    q: An EventBridge Pipe encounters internal errors while reading a Kinesis stream. Do those retries count against the pipe's maximum retry attempts?
    a: No. Internal retries do not count against that limit and continue until the source record expires.
    facts:
      - internal-retry
  - id: eventbridge-048
    q: An EventBridge Pipe cannot read an SQS source encrypted with a customer managed KMS key. What encryption permissions should be checked?
    a: Allow kms:Decrypt for the pipe execution role in both the role permissions and the key policy.
    facts:
      - source-key-permission
---
EventBridge Pipes connects one source to one target and prepares selected events between them. Filtering selects messages; enrichment adds or changes their data before delivery. It is a point-to-point connection, meaning one input source and one output target.

### How it works

1. Choose a supported source: SQS, Kinesis, DynamoDB Streams, Amazon MQ, Amazon MSK, or self-managed Apache Kafka. A stream is a retained sequence of records that a consumer reads.
2. Add an optional event filter. Only matches proceed to enrichment and target invocation, and only matches incur pipe processing charges. For SQS, unmatched messages are removed from the queue.
3. Add optional enrichment using Lambda, API Gateway, an API destination, or a Step Functions Express workflow. Enrichment runs synchronously, meaning Pipes waits for the response before continuing.
4. Invoke the target with the prepared event. To observe a compute target's runtime error, use a synchronous invocation. Pipes cannot retry errors inside an asynchronously invoked Step Functions Standard workflow.
5. Configure recovery for the source. A partial batch response can identify individual failed records in an SQS, Kinesis, or DynamoDB batch, a group processed together.
6. If the source uses a customer managed KMS key, allow `kms:Decrypt` in both the key policy and the pipe execution role, the IAM role Pipes uses to access resources.

| Source | Customer invocation failure | Dead-letter destination |
| --- | --- | --- |
| SQS | Queue maximum receive count limits retries | Source queue redrive policy and DLQ |
| Kinesis | Pipe retry count or maximum record age | Optional SQS or SNS destination; FIFO unsupported |
| DynamoDB Streams | Pipe retry count or maximum record age | Optional SQS or SNS destination; FIFO unsupported |

A redrive policy defines when a queue moves repeatedly failed messages to its DLQ. For Kinesis and DynamoDB, set pipe maximum record age below source retention, the time records remain available, so the pipe can deliver failures before the source removes them.

### Exam cues

- If the question says one queue needs filtering and enrichment before one target, think Pipes, because those steps are built into its connection.
- If the question says an SQS-source pipe repeatedly fails, think source queue redrive policy, because its receive-count and DLQ settings govern customer-error recovery.
- If the question says a stream record expires before dead-letter delivery, think a shorter pipe maximum record age, because the source must still retain the record when Pipes gives up.
- If the question says a Standard workflow fails after the pipe starts it, think workflow-level error handling, because the pipe's asynchronous invocation does not expose that runtime failure.

### Remember

- Order: source, filter, enrichment, target.
- Step Functions enrichment supports Express workflows only.
- SQS filtering removes unmatched messages.
- Kinesis and DynamoDB pipe DLQs can be SQS or SNS, with no FIFO DLQ support.
- Internal errors retry until source expiration and do not count against the stream retry limit or SQS maximum receive count.

> **Trap:** Two filtered pipes on one SQS queue do not form independent subscriptions. They compete for messages, and an unmatched message is removed by the pipe that reads it.
