---
title: SQS delivery policies and encryption
level: associate
order: 30
facts:
  - id: queue-policy
    text: An SQS queue policy must allow sns.amazonaws.com to call sqs:SendMessage, scoped with aws:SourceArn to
      the permitted SNS topic.
    source: https://docs.aws.amazon.com/sns/latest/dg/subscribe-sqs-queue-to-sns-topic.html#subscribe-sqs-queue-to-sns-topic
  - id: queue-subscription
    text: The SQS queue must be subscribed to the SNS topic using the queue ARN.
    source: https://docs.aws.amazon.com/sns/latest/dg/subscribe-sqs-queue-to-sns-topic.html#subscribe-sqs-queue-to-sns-topic
  - id: queue-key
    text: For an SQS queue encrypted with a customer managed KMS key, the key policy must allow the SNS service
      principal kms:GenerateDataKey and kms:Decrypt.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-enable-encryption-for-topic-sqs-queue-subscriptions.html#sns-enable-encryption-for-topic-sqs-queue-subscriptions
  - id: topic-key
    text: Publishing to an encrypted SNS topic requires kms:GenerateDataKey* and kms:Decrypt permissions on the
      topic key in addition to SNS publish permission.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html#sns-key-management
  - id: symmetric
    text: SNS topic encryption supports symmetric KMS keys only.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-key-management.html#sns-key-management
  - id: raw
    text: "RawMessageDelivery: true strips the SNS JSON envelope for SQS delivery and sends the published message
      body as-is."
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html#sns-large-payload-raw-message-delivery
  - id: raw-attributes
    text: Raw SQS delivery supports at most 10 message attributes; SNS discards messages with more attributes as
      client-side errors.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html#sns-large-payload-raw-message-delivery
  - id: retries
    text: SNS retries server-side delivery errors according to the endpoint protocol; after retry exhaustion it
      discards the message unless a subscription DLQ is configured.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-message-delivery-retries.html#sns-message-delivery-retries
  - id: aws-retries
    text: For retryable errors at SQS and Lambda endpoints, the SNS delivery policy provides 100015 attempts over
      23 days.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-message-delivery-retries.html#sns-message-delivery-retries
  - id: custom-retry
    text: Only HTTP(S) delivery policies can be customized; their total retry time cannot exceed 3600 seconds.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-message-delivery-retries.html#sns-message-delivery-retries
  - id: client-error
    text: SNS does not retry delivery failures caused by client-side errors such as a destination policy blocking
      access.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-dead-letter-queues.html
  - id: subscription-dlq
    text: An SNS subscription redrive policy targets an SQS dead-letter queue for messages SNS cannot deliver; the
      policy is on the subscription rather than the topic.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-dead-letter-queues.html
  - id: dlq-location
    text: An SNS subscription and its dead-letter queue must be in the same account and Region.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-dead-letter-queues.html
  - id: dlq-type
    text: Standard topic subscriptions use Standard dead-letter queues; FIFO topic subscriptions use FIFO
      dead-letter queues.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-dead-letter-queues.html
  - id: dlq-retention
    text: AWS recommends a 14-day retention period for SNS subscription dead-letter queues.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-dead-letter-queues.html
  - id: encrypted-dlq
    text: An encrypted SNS subscription dead-letter queue requires a customer managed KMS key that grants the SNS
      service principal key access.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-dead-letter-queues.html
  - id: symmetric-definition
    text: Symmetric encryption uses the same key to encrypt and decrypt data.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-data-at-rest-encryption/about-data-encryption.html
cards:
  - id: sns-002
    q: What permissions does SNS need to deliver into an SQS queue encrypted with a customer managed KMS key?
    a: The queue policy must allow sns.amazonaws.com to call sqs:SendMessage, restricted to the topic ARN. The
      queue KMS key policy must also permit SNS to call kms:GenerateDataKey and kms:Decrypt.
    facts:
      - queue-policy
      - queue-key
  - id: sns-019
    q: An SNS subscription exists, but an SQS destination policy no longer permits delivery. Will retries
      eventually fix it?
    a: No. A policy denial is a client-side delivery error, which SNS does not retry. Restore the queue policy and
      configure a subscription dead-letter queue for failed deliveries.
    facts:
      - client-error
      - queue-policy
      - subscription-dlq
    trap: true
  - id: sns-020
    q: Where should an SNS team configure an SQS dead-letter queue to retain failed notifications?
    a: On each SNS subscription through its redrive policy. The subscription and DLQ must be in the same account
      and Region.
    facts:
      - subscription-dlq
      - dlq-location
  - id: sns-021
    q: Can an SNS team customize retries for SQS subscriptions in the same way as HTTP subscriptions?
    a: No. Custom delivery policies are supported only for HTTP(S), with a maximum total retry time of 3600
      seconds.
    facts:
      - custom-retry
    trap: true
  - id: sns-022
    q: An SQS consumer expects the original application JSON but receives an SNS notification envelope. Which
      subscription setting helps?
    a: Set RawMessageDelivery to true. It removes the SNS envelope for SQS delivery; keep message attributes
      within the 10-attribute limit.
    facts:
      - raw
      - raw-attributes
  - id: sns-023
    q: SNS delivers retryable errors to an SQS endpoint. What retry policy applies before moving undeliverable
      messages to a configured subscription DLQ?
    a: The AWS managed endpoint policy provides 100015 attempts over 23 days. The DLQ retains messages SNS
      ultimately cannot deliver.
    facts:
      - aws-retries
      - retries
      - subscription-dlq
  - id: sns-024
    q: What SQS DLQ type and retention should an SNS FIFO subscription use?
    a: A FIFO DLQ in the same account and Region. AWS recommends a 14-day retention period.
    facts:
      - dlq-type
      - dlq-location
      - dlq-retention
  - id: sns-025
    q: Does granting SNS access to a topic encryption key automatically authorize delivery into a separately
      encrypted SQS queue?
    a: No. Publishing to an encrypted topic and writing to an encrypted queue use separate permissions. Configure
      the queue policy and its KMS key policy too.
    facts:
      - topic-key
      - queue-policy
      - queue-key
    trap: true
diagrams:
  - id: sns-failed-delivery
    title: SNS subscription delivery and failure recovery
    width: 1000
    height: 210
    nodes:
      - id: topic
        label: SNS topic
        icon: res-simple-notification-service-topic
        info: A publication enters a queue subscription.
        x: 30
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: target
        label: SQS destination
        icon: res-simple-queue-service-queue
        info: The queue and its KMS key must authorize delivery.
        x: 280
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: failed
        label: Delivery failure
        icon: simple-notification-service
        info: Client-side failures or exhausted retries leave a message undeliverable.
        x: 530
        y: 60
        w: 190
        h: 86
        tone: integration
      - id: dlq
        label: Subscription DLQ
        icon: res-simple-queue-service-queue
        info: The subscription redrive policy preserves the failed message in an SQS queue.
        x: 780
        y: 60
        w: 190
        h: 86
        tone: integration
    edges:
      - from: topic
        to: target
        step: 1
      - from: target
        to: failed
        step: 2
      - from: failed
        to: dlq
        step: 3
    steps:
      - SNS attempts delivery to the subscribed queue.
      - A client-side error or exhausted retries leaves the message undeliverable.
      - The subscription redrive policy sends the message to its DLQ.
---
SNS-to-SQS delivery needs both a subscription and destination permission. Encryption adds a separate key authorization check, while a subscription dead-letter queue (DLQ) retains notifications that SNS cannot deliver.

### How it works

1. Subscribe the SQS queue using its Amazon Resource Name (ARN), the identifier of the destination resource.
2. In the queue policy, allow the SNS service principal, `sns.amazonaws.com`, to perform `sqs:SendMessage`. Restrict `aws:SourceArn` to the publishing topic.
3. For a queue encrypted with a customer managed KMS key, allow SNS `kms:GenerateDataKey` and `kms:Decrypt` on that key. If the SNS topic is also encrypted, publishers need their own topic-key permissions too. SNS requires symmetric keys, which use the same key to encrypt and decrypt data.
4. Choose the payload format. Ordinary delivery includes an SNS JSON envelope, a wrapper containing the message and SNS metadata. `RawMessageDelivery: true` sends the original body to SQS without that wrapper.
5. Handle failure according to its cause.

   | Failure or policy | Behavior |
   |---|---|
   | Retryable server-side failure at SQS or Lambda | SNS policy provides 100015 attempts over 23 days |
   | Client-side error, such as a destination policy denial | SNS does not retry |
   | HTTP(S) custom retry policy | Supported, with total retry time at most 3600 seconds |
   | Retries exhausted | Message is discarded unless a subscription DLQ is attached |

6. Set a `RedrivePolicy` on the subscription to name an SQS DLQ in the same account and Region. Standard topic subscriptions use Standard DLQs; FIFO topic subscriptions use FIFO DLQs. An encrypted DLQ also needs a customer managed key that grants SNS access.

### Exam cues

- If the question says a queue subscription exists but messages do not arrive, think queue access policy and KMS key policy, because subscription creation does not replace delivery authorization.
- If the question says preserve notifications when an endpoint cannot receive them, think a subscription redrive policy, because the DLQ belongs to each delivery path.
- If the question says an SQS consumer cannot parse an SNS wrapper, think raw message delivery, because it removes the notification envelope.

### Remember

- Queue permission: `sqs:SendMessage` for `sns.amazonaws.com`, restricted by topic ARN.
- Queue KMS permissions: `kms:GenerateDataKey` and `kms:Decrypt`.
- Encrypted-topic publisher permissions: `kms:GenerateDataKey*` and `kms:Decrypt`; SNS supports symmetric keys only.
- Raw SQS delivery: maximum 10 attributes; messages above that count are discarded as client-side errors.
- Recommended subscription DLQ retention: 14 days.

> **Trap:** Topic-key permission does not authorize the destination queue or its key. Each resource has its own policy.
