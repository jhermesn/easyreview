---
title: Visibility, retention, and polling
level: associate
order: 20
facts:
  - id: visibility-hides
    text: Receiving an SQS message leaves it in the queue but hides it for the visibility timeout.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html#sqs-visibility-timeout
  - id: visibility-values
    text: The SQS queue visibility timeout defaults to 30 seconds and accepts 0 through 43,200 seconds, or 12 hours.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html#quotas-messages
  - id: visibility-redelivery
    text: If a received SQS message is not deleted before visibility timeout expires, it becomes available for another receive.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html#configuring-visibility-timeout
  - id: visibility-change
    text: ChangeMessageVisibility changes the timeout for a received message; setting it to zero makes the message available immediately.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html#changing-terminating-visibility-timeout
  - id: visibility-ceiling
    text: Extending SQS visibility does not reset the 12-hour maximum measured from the initial receipt.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html#visibility-timeout-best-practices
  - id: retention-values
    text: SQS retains messages for four days by default, configurable from one minute through fourteen days.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html#quotas-messages
  - id: retention-expiry
    text: SQS deletes messages that remain in a queue beyond the configured retention period.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_DeleteMessage.html#API_DeleteMessage
  - id: delay-values
    text: A queue delay hides newly sent messages before their first receive, defaults to zero, and can be up to fifteen minutes.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-delay-queues.html#sqs-delay-queues
  - id: message-timer
    text: A standard-queue per-message DelaySeconds timer overrides queue delay; FIFO queues do not support timers on individual messages.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-timers.html#sqs-message-timers
  - id: delay-retroactive
    text: Changing queue delay affects messages already queued for FIFO but not for standard queues.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-delay-queues.html#sqs-delay-queues
  - id: short-poll
    text: Short polling is the default; it samples some servers and returns immediately even if no message is found.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html#sqs-short-and-long-polling
  - id: long-poll
    text: Long polling queries all servers and waits for an available message or expiration of its wait time, reducing empty and false-empty responses.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html#sqs-short-and-long-polling
  - id: poll-values
    text: ReceiveMessage WaitTimeSeconds greater than zero enables long polling, up to twenty seconds; queue ReceiveMessageWaitTimeSeconds defaults to zero.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html#API_CreateQueue
  - id: receive-size
    text: ReceiveMessage retrieves up to ten messages per request.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ReceiveMessage.html#API_ReceiveMessage
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
  - id: message-size
    text: The maximum SQS message size is 1,048,576 bytes, or 1 MiB.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html#quotas-messages
diagrams:
  - id: sqs-message-visibility-lifecycle
    title: Receiving hides a message until deletion or visibility expiry
    width: 900
    height: 330
    nodes:
      - id: queue
        label: Available
        icon: simple-queue-service
        x: 40
        y: 40
        w: 170
        h: 72
        tone: integration
      - id: work
        label: Consumer
        icon: res-client
        x: 350
        y: 40
        w: 170
        h: 72
        tone: user
      - id: delete
        label: Delete message
        icon: simple-queue-service
        x: 660
        y: 40
        w: 170
        h: 72
        tone: integration
      - id: retry
        label: Visible again
        icon: simple-queue-service
        x: 350
        y: 220
        w: 170
        h: 72
        tone: integration
    edges:
      - from: queue
        to: work
        step: 1
        label: receive and hide
      - from: work
        to: delete
        step: 2
        label: success
      - from: work
        to: retry
        step: 3
        label: timeout expires
      - from: retry
        to: queue
        step: 4
    steps:
      - ReceiveMessage starts the processing visibility window.
      - After processing succeeds, delete with the latest receipt handle.
      - Without deletion, expiration of visibility makes the message available again.
      - An available message can be received for another attempt.
cards:
  - id: sqs-003
    q: What SQS timer, polling, and message limits should a consumer design account for?
    a: Visibility defaults to 30 seconds, with a 0-to-12-hour range. Retention defaults to four days, with a one-minute-to-fourteen-day range. Initial delay is at most fifteen minutes; long polling waits at most twenty seconds. Messages are at most 1 MiB and a receive returns up to ten.
    facts:
      - visibility-values
      - retention-values
      - delay-values
      - poll-values
      - message-size
      - receive-size
  - id: sqs-010
    q: An SQS worker is still processing when its message becomes visible and another worker receives it. Which setting should it adjust?
    a: Increase visibility timeout or extend it using ChangeMessageVisibility while processing. Delete the message after success. Changing initial delay does not protect work already received.
    facts:
      - visibility-redelivery
      - visibility-change
      - delay-values
  - id: sqs-011
    q: An SQS application makes many receive calls with empty results even while some messages exist. What should it enable?
    a: Enable long polling with a positive WaitTimeSeconds, up to twenty seconds. It queries all servers and reduces empty and false-empty responses.
    facts:
      - long-poll
      - poll-values
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
  - id: sqs-015
    q: A worker repeatedly extends SQS message visibility. Does each extension begin a new twelve-hour allowance?
    a: No. The twelve-hour maximum is measured from initial receipt; extending visibility does not reset it.
    trap: true
    facts:
      - visibility-ceiling
---
SQS separates when a message becomes available, how long a consumer can process it while hidden, and when it expires. Delay is the wait before the first receive. Visibility timeout is the processing window after a receive. Retention is the message's lifetime in the queue.

### How it works

1. A producer sends a message. Queue delay hides new messages before their first receive. On standard queues, an individual `DelaySeconds` timer overrides queue delay. FIFO does not support per-message timers.
2. The consumer calls `ReceiveMessage`. Short polling samples some servers and responds immediately. Long polling queries all servers and waits for an available message or its wait deadline, reducing empty results and false-empty results, where messages exist but the response contains none.
3. Receiving leaves the message in the queue but starts visibility timeout. A received message that is not yet deleted is in flight. Process it and delete it using the latest `ReceiptHandle`, the identifier for that particular receive, rather than its `MessageId`.
4. If processing needs longer, call `ChangeMessageVisibility`. Extensions do not reset the maximum allowance measured from initial receipt. Set visibility to 0 to release the message immediately. An undeleted message becomes available again when visibility expires.
5. SQS deletes messages after retention expires. A delay or a longer visibility timeout is not a replacement for choosing enough retention.
6. Monitor in-flight work and deletion. At the standard-queue in-flight limit, short polling returns `OverLimit`; long polling returns no new messages until in-flight work drops below the limit.

| Control | Starts when | Default | Range or maximum |
|---|---|---|---|
| Visibility timeout | Message is received | 30 seconds | 0 seconds through 12 hours |
| Retention | Message enters the queue | 4 days | 1 minute through 14 days |
| Queue delay | Message is sent | 0 seconds | Up to 15 minutes |
| Receive wait | Receive request waits | 0 seconds, short polling | Up to 20 seconds |

### Exam cues

- If the question says two workers repeat work while one is still processing, think visibility timeout and safe duplicate handling, because the processing window may have expired.
- If the question says reduce empty receive calls, think long polling, because it waits and queries all servers.
- If the question says postpone a new message, think delay, because visibility only starts after receiving it.
- If the question says a delete succeeded but work reappears, think latest receipt handle, because an older handle can succeed without removing the message.

### Remember

- Maximum visibility is 12 hours from initial receipt, including extensions.
- `WaitTimeSeconds > 0` enables long polling. The queue default `ReceiveMessageWaitTimeSeconds` is 0.
- `ReceiveMessage` returns up to 10 messages. Individual message maximum: 1 MiB (1,048,576 bytes).
- Standard queue in-flight limit: approximately 120,000, depending on traffic and backlog.
- Changing queue delay applies to already queued FIFO messages, but not to already queued standard messages.

> **Trap:** Receiving a message does not delete it. Visibility hides it temporarily; deletion requires the latest receipt handle.
