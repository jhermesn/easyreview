---
title: Deduplication and message handling
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
  - id: dlq-policy
    text: A source queue RedrivePolicy identifies deadLetterTargetArn and maxReceiveCount; SQS moves a message when its receive count exceeds maxReceiveCount.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html#API_CreateQueue
  - id: dlq-allow-policy
    text: A DLQ RedriveAllowPolicy selects allowed source queues using allowAll, byQueue, or denyAll.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html#API_CreateQueue
  - id: redrive-no-transform
    text: DLQ redrive cannot filter or modify message contents during movement.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html#sqs-configure-dead-letter-queue-redrive-console
  - id: redrive-new
    text: DLQ redrive assigns a new message ID and enqueue time, resetting retention.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html#sqs-configure-dead-letter-queue-redrive
  - id: redrive-permissions
    text: Starting redrive needs sqs:StartMessageMoveTask, sqs:ReceiveMessage, sqs:DeleteMessage, and sqs:GetQueueAttributes on the DLQ, plus sqs:SendMessage on the destination.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html#sqs-configure-dead-letter-queue-redrive-permissions
  - id: redrive-kms
    text: Redrive of KMS-encrypted messages needs kms:Decrypt on the keys used to encrypt them; an encrypted destination also needs kms:GenerateDataKey and kms:Decrypt.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html#sqs-configure-dead-letter-queue-redrive-permissions
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
  - id: sqs-018
    q: How do SQS RedrivePolicy and RedriveAllowPolicy differ?
    a: RedrivePolicy on the source sets failure routing and maxReceiveCount. RedriveAllowPolicy on the DLQ controls which source queues may use it.
    facts:
      - dlq-policy
      - dlq-allow-policy
  - id: sqs-019
    q: A team wants SQS DLQ redrive to rewrite malformed payloads before sending them back. Can the managed redrive task do that?
    a: No. DLQ redrive cannot filter or modify messages. It moves them and assigns new message IDs and enqueue times.
    trap: true
    facts:
      - redrive-no-transform
      - redrive-new
  - id: sqs-021
    q: An SQS DLQ redrive is denied for an encrypted queue pair. Which permissions should the team check?
    a: Check DLQ move/read/delete/attribute permissions and destination sqs:SendMessage. Also check kms:Decrypt for message keys and kms:GenerateDataKey plus kms:Decrypt for the encrypted destination.
    facts:
      - redrive-permissions
      - redrive-kms
---
SQS message handling depends on how producers identify and delay messages and how consumers delete them. These choices also affect how to investigate a queue that stops returning work.

### How it works

1. For FIFO deduplication, provide a `MessageDeduplicationId` or enable content-based deduplication. Content-based deduplication uses a SHA-256 hash, a fingerprint, of the message body and excludes message attributes. See FIFO deduplication.
2. A queue delay hides new messages before their first receive. For standard queues, a per-message `DelaySeconds` timer overrides that delay. FIFO queues do not support individual message timers.
3. A received message remains in flight until it is deleted. To delete it, use the `ReceiptHandle` from the most recent receive, not its `MessageId`. An old handle can return success without deleting the message. See DeleteMessage.
4. If a standard queue reaches its in-flight limit, short polling returns `OverLimit`. Long polling returns no new messages until the in-flight count drops, without that error. See in-flight messages and quotas.

### Exam cues

- If the question says FIFO messages have identical bodies but different attributes, think explicit deduplication IDs, because the content-based hash excludes attributes.
- If the question says a FIFO message needs its own initial delay, think queue-level delay instead, because FIFO does not support individual message timers.
- If the question says a successful delete leaves a message in the queue, think the latest receipt handle, because an old handle can succeed without deleting it.
- If the question says long polling returns no work without `OverLimit`, think in-flight count and deletion rate, because the queue may have reached its in-flight limit.

### Remember

- Queue delay defaults to 0 seconds and can be up to 15 minutes.
- A standard queue allows approximately 120,000 in-flight messages, depending on traffic and backlog.
- Short polling returns `OverLimit` at the in-flight limit; long polling returns no new messages until the count drops.
- A DLQ `RedriveAllowPolicy` selects which source queues may use it: `allowAll`, `byQueue` or `denyAll`.
- Redrive gives messages new IDs and enqueue times and cannot filter or rewrite them.
- Starting a redrive needs `sqs:StartMessageMoveTask`, receive, delete and attribute permissions on the DLQ, `sqs:SendMessage` on the destination, and KMS permissions for encrypted queues.

> **Trap:** Different message attributes do not make content-based FIFO deduplication treat identical bodies as different. Use explicit deduplication IDs when the messages need distinct identities.
