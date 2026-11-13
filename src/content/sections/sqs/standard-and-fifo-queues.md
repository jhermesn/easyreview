---
title: Standard and FIFO queues
level: associate
order: 10
facts:
  - id: queue-buffer
    text: Standard SQS queues decouple request producers from consumers performing background work.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues.html#standard-queues
  - id: standard-delivery
    text: Standard queues are the default type and provide at-least-once delivery, best-effort ordering, and nearly unlimited API calls per second.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues.html#standard-queues
  - id: fifo-order
    text: FIFO ordering applies within a MessageGroupId; different groups can be processed concurrently without a shared ordering guarantee.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-understanding-logic.html#FIFO-queues-understanding-logic
  - id: fifo-group-required
    text: Every FIFO message needs a MessageGroupId; using one group for all messages creates one ordered sequence.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-understanding-logic.html#FIFO-queues-understanding-logic
  - id: fifo-name
    text: A FIFO queue name must end in .fifo.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queue-message-identifiers.html#sqs-fifo-queue-message-identifiers
  - id: queue-type
    text: The queue type cannot be changed after creation; switching between standard and FIFO requires a new queue.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html#API_CreateQueue
  - id: fifo-dedup-window
    text: FIFO suppresses duplicate sends using the same deduplication ID within a five-minute interval.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-exactly-once-processing.html#FIFO-queues-exactly-once-processing
  - id: fifo-content-hash
    text: Content-based FIFO deduplication uses a SHA-256 hash of the message body, excluding message attributes.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-exactly-once-processing.html#FIFO-queues-exactly-once-processing
  - id: fifo-dedup-choice
    text: A FIFO producer must provide a MessageDeduplicationId unless content-based deduplication is enabled.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-exactly-once-processing.html#FIFO-queues-exactly-once-processing
  - id: fifo-receive-block
    text: A FIFO receive can contain multiple messages from one group; later receives cannot take more from that group until the received messages are deleted or visible again.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-understanding-logic.html#FIFO-queues-understanding-logic
  - id: consumer-redelivery
    text: An SQS message not processed and deleted before visibility timeout can become available for another attempt, so duplicate business effects must be prevented.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html#consumer-fails-to-process-message
  - id: fifo-base-tps
    text: Non-high-throughput FIFO partitions allow 300 transactions per second per API action; batching supports up to 3,000 messages per second per action.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html#quotas-messages
  - id: fifo-high-settings
    text: High-throughput FIFO requires DeduplicationScope=messageGroup and FifoThroughputLimit=perMessageGroupId.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html#API_CreateQueue
  - id: fifo-high-region
    text: High-throughput FIFO request quotas vary by Region; increasing distinct message groups helps distribute work across partitions.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html#quotas-messages
diagrams:
  - id: sqs-fifo-independent-groups
    title: FIFO ordering is local to a message group
    width: 900
    height: 330
    nodes:
      - id: a
        label: FIFO group A
        icon: simple-queue-service
        x: 50
        y: 40
        w: 170
        h: 72
        tone: integration
      - id: b
        label: FIFO group B
        icon: simple-queue-service
        x: 50
        y: 220
        w: 170
        h: 72
        tone: integration
      - id: wa
        label: Consumer A
        icon: res-client
        x: 590
        y: 40
        w: 170
        h: 72
        tone: user
      - id: wb
        label: Consumer B
        icon: res-client
        x: 590
        y: 220
        w: 170
        h: 72
        tone: user
    edges:
      - from: a
        to: wa
        step: 1
        label: ordered group A
      - from: b
        to: wb
        step: 2
        label: ordered group B
    steps:
      - Consumer A processes received group A records in order.
      - Consumer B can process group B independently; there is no shared order across these groups.
cards:
  - id: sqs-001
    q: How do SQS standard and FIFO queues differ in delivery, ordering, and baseline throughput?
    a: Standard provides at-least-once delivery, best-effort order, and nearly unlimited API calls. FIFO orders within each MessageGroupId and deduplicates sends for five minutes. Non-high-throughput FIFO partitions allow 300 transactions per second per action, or up to 3,000 messages per second with batching.
    facts:
      - standard-delivery
      - fifo-order
      - fifo-dedup-window
      - fifo-base-tps
  - id: sqs-002
    q: Does SQS FIFO send deduplication make consumer side effects safe from repetition?
    a: No. Deduplication suppresses duplicate sends within five minutes. A received message can be processed again if it is not deleted before visibility timeout, so consumers still need idempotent business operations.
    trap: true
    facts:
      - fifo-dedup-window
      - consumer-redelivery
  - id: sqs-006
    q: An SQS workload needs order per customer but parallel processing across customers. How should it use FIFO message groups?
    a: Use a MessageGroupId per customer. FIFO preserves order inside each group while different groups can be processed concurrently.
    facts:
      - fifo-order
      - fifo-group-required
  - id: sqs-007
    q: An SQS producer retries messages with identical bodies but different attributes under content-based FIFO deduplication. Are the attributes part of the deduplication hash?
    a: No. The SHA-256 hash uses the message body only. Use an explicit MessageDeduplicationId when the intended identity must distinguish those messages.
    trap: true
    facts:
      - fifo-content-hash
      - fifo-dedup-choice
  - id: sqs-008
    q: A standard SQS queue must provide strict ordering for related messages. Can the team enable FIFO on the existing queue?
    a: No. Create a FIFO queue, whose name ends in .fifo, and send related messages with the same MessageGroupId. Queue type cannot be changed after creation.
    facts:
      - queue-type
      - fifo-name
      - fifo-order
  - id: sqs-009
    q: Which SQS FIFO attributes enable high-throughput mode?
    a: Set DeduplicationScope to messageGroup and FifoThroughputLimit to perMessageGroupId. Distribute independent work across distinct message groups.
    facts:
      - fifo-high-settings
      - fifo-high-region
---
SQS queues buffer work between producers, which send messages, and consumers, which receive and process them. Standard queues suit work that tolerates duplicate delivery and occasional reordering. FIFO (first-in, first-out) queues preserve order within each message group.

### How it works

1. Choose the queue type when creating the queue. Standard is the default. Changing the type later requires a new queue; a FIFO name must end in `.fifo`.
2. For FIFO, assign `MessageGroupId`, the identifier for one ordered sequence, to every message. Different groups can run concurrently. One group for every message creates one sequence.
3. Supply `MessageDeduplicationId`, a token identifying a send for duplicate suppression, or enable content-based deduplication. The latter generates a SHA-256 hash, a fingerprint, from the body rather than its attributes, the message's metadata fields.
4. FIFO suppresses repeated sends with that deduplication ID within five minutes. This does not make the consumer's business operation idempotent, meaning safe to repeat without extra effects. A received message can become available again if it is not deleted before visibility timeout.
5. A FIFO receive can return several messages from one group. Later receives cannot take more from that group until the received messages are deleted or visible again. Different groups can progress independently.
6. For higher FIFO throughput, set `DeduplicationScope=messageGroup` and `FifoThroughputLimit=perMessageGroupId`. Use distinct groups for independent work so SQS can distribute it across partitions, the storage allocations that hold queue messages. Regional quotas still apply.

| Property | Standard | FIFO |
|---|---|---|
| Ordering | Best effort | Within each message group |
| Duplicate handling | At-least-once delivery | Duplicate sends suppressed within five minutes |
| Throughput | Nearly unlimited API calls | Partition and regional quotas |
| Parallel work | Consumers process available work | Different message groups progress independently |

### Exam cues

- If the question says order per customer with parallel customers, think FIFO with a group per customer, because ordering is per group.
- If the question says maximum queue throughput and duplicates are acceptable, think standard, because strict ordering is unnecessary for that requirement.
- If the question says identical bodies but meaningful attribute differences, think explicit deduplication IDs, because content-based hashes exclude attributes.
- If the question says FIFO throughput needs to grow, think independent groups and high-throughput mode, because a single ordered group limits parallel work.

### Remember

- FIFO queue name: `.fifo` suffix. Every FIFO send needs `MessageGroupId`.
- Send deduplication interval: 5 minutes. Content hash: SHA-256 of the body only.
- Non-high-throughput FIFO: 300 transactions per second per action per partition, up to 3,000 messages per second with batching.
- High-throughput quotas vary by Region. Transactions per second count API requests; batching increases messages per request.

> **Trap:** FIFO's duplicate-send suppression does not make an external payment or database update occur only once. A consumer can fail after its side effect and receive the message again.
