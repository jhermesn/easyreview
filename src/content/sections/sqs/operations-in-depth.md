---
title: "PLACEHOLDER sqs/operations-in-depth"
level: professional
order: 50
facts:
  - id: fifo-content-hash
    text: Content-based FIFO deduplication uses a SHA-256 hash of the message body, excluding message attributes.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-exactly-once-processing.html#FIFO-queues-exactly-once-processing
  - id: fifo-dedup-choice
    text: A FIFO producer must provide a MessageDeduplicationId unless content-based deduplication is enabled.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-exactly-once-processing.html#FIFO-queues-exactly-once-processing
  - id: message-timer
    text: A standard-queue per-message DelaySeconds timer overrides queue delay; FIFO queues do not support timers on individual messages.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-timers.html#sqs-message-timers
  - id: delay-values
    text: A queue delay hides newly sent messages before their first receive, defaults to zero, and can be up to fifteen minutes.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-delay-queues.html#sqs-delay-queues
  - id: delete-handle
    text: DeleteMessage requires the most recently received ReceiptHandle rather than MessageId; an old handle can succeed without deleting the message.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_DeleteMessage.html#API_DeleteMessage
  - id: inflight
    text: An in-flight SQS message has been received but not yet deleted.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html#inflight-messages
  - id: inflight-standard-limit
    text: Standard queues allow approximately 120,000 in-flight messages depending on traffic and backlog.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-queues.html#quotas-queues
  - id: inflight-polling
    text: At the in-flight limit, short polling returns OverLimit while long polling returns no new messages until in-flight count drops.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html#inflight-messages
cards:
  - id: sqs-007
    q: An SQS producer retries messages with identical bodies but different attributes under content-based FIFO deduplication. Are the attributes part of the deduplication hash?
    a: No. The SHA-256 hash uses the message body only. Use an explicit MessageDeduplicationId when the intended identity must distinguish those messages.
    trap: true
    facts:
      - fifo-content-hash
      - fifo-dedup-choice
  - id: sqs-012
    q: An SQS FIFO producer needs a different initial delay for each message. Can it use per-message DelaySeconds timers?
    a: No. FIFO does not support individual message timers. It can use a queue-level delay of up to fifteen minutes.
    trap: true
    facts:
      - message-timer
      - delay-values
  - id: sqs-013
    q: An SQS delete request succeeds, yet the message remains after several receives. Which identifier should the consumer check?
    a: Use the ReceiptHandle from the latest receive, not MessageId or an older receipt handle. An old handle can succeed without deleting the message.
    facts:
      - delete-handle
  - id: sqs-014
    q: An SQS standard queue has many received messages and long polling returns no new work without OverLimit. What should the team investigate?
    a: Check the in-flight message limit and deletion rate. At that limit, long polling stops returning new messages without returning the short-poll OverLimit error.
    facts:
      - inflight
      - inflight-standard-limit
      - inflight-polling
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
