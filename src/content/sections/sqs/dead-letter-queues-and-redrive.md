---
title: Dead-letter queues and redrive
level: associate
order: 30
facts:
  - id: dlq-isolation
    text: A dead-letter queue isolates source-queue messages that could not be processed successfully for diagnosis and later processing.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html#sqs-dead-letter-queues
  - id: dlq-policy
    text: A source queue RedrivePolicy identifies deadLetterTargetArn and maxReceiveCount; SQS moves a message when its receive count exceeds maxReceiveCount.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html#API_CreateQueue
  - id: dlq-type
    text: A standard source queue needs a standard DLQ; a FIFO source queue needs a FIFO DLQ.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html#API_CreateQueue
  - id: dlq-order
    text: Moving failed messages out of a FIFO queue can break the exact business-operation order.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html#sqs-dead-letter-queues
  - id: dlq-allow-policy
    text: A DLQ RedriveAllowPolicy selects allowed source queues using allowAll, byQueue, or denyAll.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html#API_CreateQueue
  - id: dlq-allow-default
    text: The default allowAll permits source queues in the same account and Region; byQueue allows up to ten specified source ARNs.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html#API_CreateQueue
  - id: standard-dlq-age
    text: A standard message retains its original enqueue timestamp when moved to a DLQ, so time spent in the source counts toward expiration.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html#understanding-message-retention-periods
  - id: fifo-dlq-age
    text: A FIFO message enqueue timestamp resets when it moves to a DLQ.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html#understanding-message-retention-periods
  - id: dlq-age-metric
    text: ApproximateAgeOfOldestMessage on a DLQ measures time since arrival in the DLQ rather than original send time.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html#understanding-message-retention-periods
  - id: dlq-retention
    text: AWS recommends DLQ retention longer than source-queue retention.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html#understanding-message-retention-periods
  - id: redrive-target
    text: A DLQ redrive task moves messages back to their source queue by default, or to another queue of the same type.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html#sqs-configure-dead-letter-queue-redrive
  - id: redrive-api
    text: StartMessageMoveTask starts a DLQ redrive task, ListMessageMoveTasks lists tasks, and CancelMessageMoveTask cancels a running task.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html#sqs-configure-dead-letter-queue-redrive-API
  - id: redrive-rate
    text: Custom max redrive velocity is at most 500 messages per second; AWS recommends starting slowly and increasing while monitoring the source.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html#sqs-configure-dead-letter-queue-redrive-console
  - id: redrive-new
    text: DLQ redrive assigns a new message ID and enqueue time, resetting retention.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html#sqs-configure-dead-letter-queue-redrive
  - id: redrive-no-transform
    text: DLQ redrive cannot filter or modify message contents during movement.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html#sqs-configure-dead-letter-queue-redrive-console
  - id: redrive-interleave
    text: Redriven messages can interleave with new producer messages in the destination, including a FIFO destination.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html#sqs-configure-dead-letter-queue-redrive
  - id: redrive-permissions
    text: Starting redrive needs sqs:StartMessageMoveTask, sqs:ReceiveMessage, sqs:DeleteMessage, and sqs:GetQueueAttributes on the DLQ, plus sqs:SendMessage on the destination.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html#sqs-configure-dead-letter-queue-redrive-permissions
  - id: redrive-kms
    text: Redrive of KMS-encrypted messages needs kms:Decrypt on the keys used to encrypt them; an encrypted destination also needs kms:GenerateDataKey and kms:Decrypt.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue-redrive.html#sqs-configure-dead-letter-queue-redrive-permissions
diagrams:
  - id: sqs-dlq-isolation-and-redrive
    title: Failure routing and recovery move messages in opposite directions
    width: 900
    height: 360
    nodes:
      - id: source
        label: Source queue
        icon: simple-queue-service
        x: 40
        y: 40
        w: 170
        h: 72
        tone: integration
      - id: dlq
        label: DLQ
        icon: simple-queue-service
        x: 350
        y: 40
        w: 170
        h: 72
        tone: integration
      - id: repair
        label: Repair consumer
        icon: res-client
        x: 660
        y: 40
        w: 170
        h: 72
        tone: user
      - id: move
        label: Redrive task
        icon: simple-queue-service
        x: 350
        y: 240
        w: 170
        h: 72
        tone: integration
    edges:
      - from: source
        to: dlq
        step: 1
        label: receive limit
      - from: dlq
        to: repair
        step: 2
        label: diagnose
      - from: dlq
        to: move
        step: 3
        label: start redrive
      - from: move
        to: source
        step: 4
    steps:
      - The source policy isolates messages whose receive count exceeds maxReceiveCount.
      - Inspect retained messages and repair the cause of processing failure.
      - Start a controlled DLQ redrive task after repair.
      - The task returns messages to the source for another processing attempt.
cards:
  - id: sqs-005
    q: Repeatedly failing SQS messages consume retries. How should the team isolate them, and what is the FIFO ordering risk?
    a: Set the source queue RedrivePolicy with its deadLetterTargetArn and maxReceiveCount. Standard must target standard, and FIFO must target FIFO. Removing a failed FIFO message can break the exact business-operation order.
    trap: true
    facts:
      - dlq-policy
      - dlq-type
      - dlq-order
  - id: sqs-016
    q: A standard SQS message spends time in its source queue before reaching a DLQ. Does its expiration clock restart on DLQ arrival?
    a: No. The original enqueue timestamp remains, so source-queue time counts toward expiration. Use a DLQ retention period longer than the source retention. FIFO messages reset their enqueue timestamp on DLQ arrival.
    trap: true
    facts:
      - standard-dlq-age
      - fifo-dlq-age
      - dlq-retention
  - id: sqs-017
    q: A team has repaired the consumer that caused SQS messages to accumulate in its DLQ. How can it reprocess the backlog safely?
    a: Start a DLQ redrive with StartMessageMoveTask or the console, targeting the source or another same-type queue. Begin with a low custom velocity and monitor the source as the rate increases.
    facts:
      - redrive-target
      - redrive-api
      - redrive-rate
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
  - id: sqs-020
    q: A DLQ age metric looks young, but standard SQS messages expire sooner than expected. Why?
    a: ApproximateAgeOfOldestMessage measures time since DLQ arrival, while standard-message expiration still uses the original enqueue timestamp.
    facts:
      - dlq-age-metric
      - standard-dlq-age
  - id: sqs-021
    q: An SQS DLQ redrive is denied for an encrypted queue pair. Which permissions should the team check?
    a: Check DLQ move/read/delete/attribute permissions and destination sqs:SendMessage. Also check kms:Decrypt for message keys and kms:GenerateDataKey plus kms:Decrypt for the encrypted destination.
    facts:
      - redrive-permissions
      - redrive-kms
---
A dead-letter queue (DLQ) isolates messages that repeatedly fail processing. A redrive policy moves failing messages into the DLQ. A DLQ redrive task moves retained messages back for another processing attempt after the cause is repaired.

### How it works

1. Create a DLQ of the same type as the source: standard to standard, FIFO to FIFO. On the source queue, set `RedrivePolicy` with `deadLetterTargetArn`, the DLQ's Amazon Resource Name (ARN), and `maxReceiveCount`, the receive-count threshold. SQS moves messages whose receive count exceeds that threshold.
2. On the DLQ, use `RedriveAllowPolicy` to choose which source queues may use it. `allowAll` is the default for source queues in the same account and Region; `byQueue` lists allowed source ARNs; `denyAll` blocks use as a DLQ.
3. Inspect the failure and repair its cause. For standard queues, the original enqueue time still controls expiration after DLQ arrival. For FIFO, moving into the DLQ resets that timestamp. Set DLQ retention longer than source retention.
4. Start a message move task with `StartMessageMoveTask` or the console. Redrive returns messages to their source by default, or sends them to another queue of the same type. Start with a low custom velocity, the rate of messages moved per second, and increase while watching the source.
5. Redriven messages receive new IDs and enqueue times, so their retention restarts. They can interleave with newly sent messages. Redrive cannot filter or rewrite their content. Use `ListMessageMoveTasks` to inspect tasks and `CancelMessageMoveTask` to cancel one that is running.
6. Authorize the operator to move and read/delete messages from the DLQ, read its attributes, and send to the destination. KMS-encrypted messages also require `kms:Decrypt` for the message keys; an encrypted destination needs `kms:GenerateDataKey` and `kms:Decrypt`.

| Policy or operation | Configured on | Purpose |
|---|---|---|
| `RedrivePolicy` | Source queue | Move repeatedly received messages to the DLQ |
| `RedriveAllowPolicy` | DLQ | Select source queues allowed to use the DLQ |
| DLQ redrive task | Started against the DLQ | Move retained messages back for processing |

### Exam cues

- If the question says repeatedly failing messages need isolation, think source `RedrivePolicy`, because it defines when to move them.
- If the question says a repaired consumer must reprocess DLQ backlog, think a controlled redrive task, because it returns messages at a selected rate.
- If the question says standard DLQ messages expire unexpectedly early, think original enqueue time, because DLQ arrival does not restart that expiration clock.
- If the question says only selected queues may use a DLQ, think `RedriveAllowPolicy`, because it controls the permitted sources.

### Remember

- `byQueue` supports up to 10 source queue ARNs.
- Custom maximum redrive velocity: 500 messages per second.
- DLQ `ApproximateAgeOfOldestMessage` measures age since DLQ arrival. Standard-message expiration still includes source-queue time.
- Starting redrive needs `sqs:StartMessageMoveTask`, `sqs:ReceiveMessage`, `sqs:DeleteMessage`, and `sqs:GetQueueAttributes` on the DLQ, plus `sqs:SendMessage` on the destination.

> **Trap:** Moving a failed FIFO message aside lets later business operations continue without it. Neither FIFO-to-FIFO DLQ routing nor later redrive preserves the original full business sequence.
