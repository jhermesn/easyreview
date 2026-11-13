---
title: Target retries and dead-letter queues
level: associate
order: 20
facts:
  - id: retry-default
    text: For retriable target-delivery errors, EventBridge retries for up to 24 hours and up to 185 retries by
      default.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-retry-policy.html
  - id: retry-backoff
    text: Target-delivery retries use exponential backoff with jitter, a randomized delay.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-retry-policy.html
  - id: retry-config
    text: A rule target retry policy configures retry duration and retry count.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-retry-policy.html
  - id: exhaustion
    text: Events that exhaust delivery retries are dropped unless a target DLQ is configured.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-retry-policy.html
  - id: direct-dlq
    text: Missing target permissions or a missing target can send an event directly to its DLQ without retries.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html#eb-rule-dlq
  - id: dlq-standard
    text: A rule target DLQ must be a standard SQS queue; FIFO queues are unsupported.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html#eb-dlq-considerations
  - id: dlq-region
    text: A rule target DLQ must be in the same Region as the rule.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html#eb-dlq-considerations
  - id: dlq-policy
    text: The DLQ resource policy must allow events.amazonaws.com to perform sqs:SendMessage, and can restrict
      access by the rule ARN.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html#eb-dlq-perms
  - id: dlq-console
    text: The console attaches DLQ permissions for a same-account queue; API configuration and cross-account
      queues require a manually attached queue policy.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html#eb-dlq-considerations
  - id: dlq-attributes
    text: DLQ messages include RULE_ARN, TARGET_ARN, ERROR_CODE, ERROR_MESSAGE, EXHAUSTED_RETRY_CONDITION, and
      RETRY_ATTEMPTS.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html#eb-rule-dlq
  - id: dlq-metrics
    text: InvocationsSentToDLQ and InvocationsFailedToBeSentToDLQ report successful and failed DLQ delivery in
      CloudWatch.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html#eb-rule-dlq
  - id: bus-encryption-dlq
    text: For custom and partner events, a non-retriable encryption or decryption error during event-bus processing goes to the bus DLQ if configured; an error during target delivery goes to the target DLQ if configured.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-encryption-event-bus-dlq.html#eb-encryption-event-bus-dlq
  - id: lambda-async
    text: Lambda handles asynchronous function errors and retries them twice by default.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-error-handling.html#invocation-async-error-handling
  - id: lambda-target-async
    text: EventBridge invokes Lambda rule targets asynchronously.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html#eb-console-targets
  - id: encrypted-sqs-key
    text: An SQS target encrypted with a customer managed KMS key requires a key policy allowing EventBridge kms:Decrypt and kms:GenerateDataKey.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html#targets-permissions
  - id: sqs-owned-key
    text: EventBridge does not support SQS targets or target DLQs encrypted with an AWS owned key.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html#targets-specifics-sqs
  - id: api-http-retry
    text: EventBridge API destinations retry HTTP 401, 407, 409, 429 and 5xx responses, but not other 4xx responses.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html#eb-api-destination-error-codes
diagrams:
  - id: eventbridge-target-recovery
    title: Failed target delivery ends at a configured DLQ
    width: 770
    height: 200
    nodes:
      - id: rule
        label: Rule
        sub: selects an event
        icon: res-eventbridge-rule
        x: 30
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: target
        label: Lambda target
        sub: delivery fails
        icon: lambda
        x: 290
        y: 60
        w: 190
        h: 86
        tone: compute
      - id: dlq
        label: SQS DLQ
        sub: retains failed delivery
        icon: simple-queue-service
        x: 550
        y: 60
        w: 190
        h: 86
        tone: integration
    edges:
      - from: rule
        to: target
        step: 1
      - from: target
        to: dlq
        step: 2
    steps:
      - EventBridge attempts target delivery and retries retriable failures according to its policy.
      - A configured DLQ receives the event after retry exhaustion; missing permissions or a missing target
        can bypass retries.
cards:
  - id: eventbridge-006
    q: What does an EventBridge rule do when target delivery keeps failing with retriable errors?
    a: By default, retry for up to 24 hours and up to 185 retries with exponential backoff and jitter. When
      retries are exhausted, send to the configured target DLQ or drop the event.
    trap: true
    facts:
      - retry-default
      - retry-backoff
      - exhaustion
  - id: eventbridge-007
    q: What queue and permissions does an EventBridge rule target DLQ require?
    a: A standard SQS queue in the rule Region. Its resource policy must allow `events.amazonaws.com` to call
      `sqs:SendMessage`; restrict it to the rule ARN. API and cross-account setup require adding the policy
      manually.
    facts:
      - dlq-standard
      - dlq-region
      - dlq-policy
      - dlq-console
  - id: eventbridge-023
    q: An EventBridge rule loses events after a long target outage. How can the team retain failed deliveries for
      later processing?
    a: Configure a target DLQ and its queue policy. Retries eventually stop; the DLQ retains failed deliveries for
      investigation and later processing.
    facts:
      - exhaustion
      - dlq-policy
  - id: eventbridge-024
    q: An EventBridge target loses invocation permission and its event immediately appears in the DLQ. Why were
      there no retries?
    a: Missing-permission errors can go directly to the DLQ. Fix target access before processing the event again.
    trap: true
    facts:
      - direct-dlq
  - id: eventbridge-025
    q: An EventBridge rule has a DLQ but failed events do not arrive there. Which signal and permission should
      operators inspect?
    a: Check `InvocationsFailedToBeSentToDLQ` and the queue resource policy allowing `events.amazonaws.com` to use
      `sqs:SendMessage`.
    facts:
      - dlq-metrics
      - dlq-policy
  - id: eventbridge-043
    q: An EventBridge bus encrypted with a customer managed KMS key encounters a non-retriable decryption error while processing a custom event. Which DLQ receives it?
    a: The event-bus DLQ, if configured. Errors during target delivery use the target DLQ instead.
    facts:
      - bus-encryption-dlq
  - id: eventbridge-044
    q: An EventBridge rule successfully invokes a Lambda target, but the Lambda function later fails. Which service handles the function error retries?
    a: Lambda handles its asynchronous function execution retries. Configure Lambda failure handling separately from the EventBridge target DLQ.
    facts:
      - lambda-target-async
      - lambda-async
  - id: eventbridge-045
    q: An EventBridge rule cannot deliver to an SQS target encrypted with a customer managed KMS key despite queue access. What key policy permissions should the team check?
    a: Allow EventBridge kms:Decrypt and kms:GenerateDataKey in the KMS key policy.
    facts:
      - encrypted-sqs-key
  - id: eventbridge-046
    q: An EventBridge API destination returns HTTP 429 for one event and HTTP 400 for another. Which response is retried?
    a: HTTP 429 is retried; HTTP 400 is not among the retried 4xx responses.
    facts:
      - api-http-retry
  - id: eventbridge-049
    q: Can an EventBridge rule use an SQS queue encrypted with an AWS owned key as its target DLQ?
    a: No. EventBridge does not support AWS owned key encryption for SQS targets or target DLQs.
    trap: true
    facts:
      - sqs-owned-key
---
EventBridge retries failed delivery to a rule target and can preserve undelivered events in a dead-letter queue (DLQ), a queue for failures that need later attention. Configure this recovery path on the target.

### How it works

1. EventBridge tries to invoke the rule target. For a retriable failure, it applies the target retry policy.
2. Retries use exponential backoff, increasing the wait between attempts, with jitter, a randomized delay. The defaults are up to 24 hours and up to 185 retries.
3. Missing permissions or a missing target can bypass retries and go directly to the configured DLQ.
4. When retries are exhausted, EventBridge sends the failed event to the target DLQ. Without one, it drops the event.
5. Inspect the DLQ message attributes to find the rule, target, error, retry count, and exhausted retry condition. Resolve the cause before processing failures again.
6. For a bus using a customer managed KMS key, configure a separate bus DLQ for non-retriable encryption or decryption errors during bus processing of custom and partner events. Errors during target delivery use the target DLQ.
7. A Lambda target is invoked asynchronously. Once Lambda accepts the event, Lambda handles later function execution errors, retries them twice by default, and uses its own failure destination or DLQ if configured.

The DLQ must be a standard SQS queue in the rule's Region. Its resource policy, a permission document attached to the queue, must allow `events.amazonaws.com` to call `sqs:SendMessage`. Restrict that permission with the rule's Amazon Resource Name (ARN), its AWS resource identifier. The console adds access for a same-account queue. API setup and cross-account queues require a manually attached policy.

### Exam cues

- If the question says preserve events after a target outage exceeds retries, think a target DLQ, because delivery attempts eventually stop.
- If the question says an event went to the DLQ without waiting, think missing permissions or a missing target, because those failures can bypass retries.
- If the question says the DLQ also loses deliveries, think its resource policy and `InvocationsFailedToBeSentToDLQ`, because EventBridge must be able to write failures there.

### Remember

- Defaults: up to 24 hours and 185 retries; duration and count are configurable.
- DLQ: standard SQS, same Region as the rule; FIFO is unsupported.
- Attributes include `RULE_ARN`, `TARGET_ARN`, `ERROR_CODE`, `ERROR_MESSAGE`, `EXHAUSTED_RETRY_CONDITION`, and `RETRY_ATTEMPTS`.
- Monitor `InvocationsSentToDLQ` and `InvocationsFailedToBeSentToDLQ`.
- Bus-processing encryption failures and target-delivery failures use their respective configured DLQs.
- API destinations retry HTTP 401, 407, 409, 429 and 5xx, but not other 4xx responses.
- An SQS target encrypted with a customer managed key needs the EventBridge service principal to have `kms:Decrypt` and `kms:GenerateDataKey` in the key policy. AWS owned key encryption is unsupported for SQS targets and target DLQs.

> **Trap:** Configuring retries does not retain an event forever. After the retry policy is exhausted, an event without a DLQ is dropped.
