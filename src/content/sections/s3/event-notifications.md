---
title: Event notifications
level: associate
order: 120
facts:
  - id: events-purpose
    text: S3 event notifications send messages when configured bucket events occur.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html#EventNotifications
  - id: events-targets
    text: Native S3 event notifications can target Lambda, standard SNS topics, or standard SQS queues
      in the bucket Region.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html#supported-notification-destinations
  - id: events-policy
    text: S3 needs permission to publish to SNS or SQS or invoke the target Lambda function.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html#supported-notification-destinations
  - id: events-delivery
    text: S3 notifications are delivered at least once and can be duplicated or arrive out of order.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html#event-ordering-and-duplicate-events
  - id: events-filter
    text: Native notifications can filter object key names by prefix and suffix; wildcard characters are
      unsupported in those filters.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-filtering.html#notification-how-to-filtering
  - id: events-overlap
    text: Overlapping prefix or suffix filters for the same event types can make a notification
      configuration invalid.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-filtering.html#notification-how-to-filtering-examples-invalid
  - id: events-fifo
    text: Native S3 notifications cannot target SQS FIFO; EventBridge can route S3 events to a FIFO
      queue.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html#EventNotifications
  - id: events-eventbridge
    text: Enabling EventBridge on an S3 bucket sends all supported events to EventBridge, where rules
      select events and targets.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventBridge.html#EventBridge
  - id: events-loop
    text: A Lambda function writing to the same bucket and triggering prefix can invoke itself
      repeatedly; use separate buckets or distinct input prefixes.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html#EventNotifications
  - id: events-created
    text: s3:ObjectCreated:* covers object creation events including completed multipart uploads.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html#supported-notification-event-types
  - id: events-object-deleted
    text: s3:ObjectRemoved:Delete signals an object deletion, not that the bucket is empty.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html#supported-notification-event-types
  - id: events-sqs
    text: SQS queues store notification messages until consumers can process them.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html#notification-how-to-event-types-and-destinations
  - id: events-idempotent
    text: AWS recommends idempotent event consumers that track processed events to handle duplicate
      notifications.
    source: https://aws.amazon.com/blogs/storage/manage-event-ordering-and-duplicate-events-with-amazon-s3-event-notifications/
  - id: event-prefix
    text: A prefix selects the beginning of an object key; a suffix selects its ending.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-filtering.html#notification-how-to-filtering
  - id: fifo-definition
    text: FIFO queues preserve message order within each message group.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queues.html#sqs-fifo-queues
  - id: events-destination-policy
    text: SNS and SQS destination policies grant the S3 service principal SNS:Publish or SQS:SendMessage; AWS examples restrict the source bucket ARN and account.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/grant-destinations-permissions-to-s3.html#grant-sns-sqs-permission-for-s3
  - id: events-kms
    text: For an SNS topic or SQS queue encrypted with a customer managed KMS key, its key policy must allow S3 kms:GenerateDataKey and kms:Decrypt.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/grant-destinations-permissions-to-s3.html#key-policy-sns-sqs
  - id: events-sequencer
    text: PUT and DELETE notification sequencers can order events for the same object key, but not different keys; left-pad shorter values with zeros before comparison.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-content-structure.html#notification-content-structure
  - id: events-queue-size
    text: S3 notifications can be up to 64 KB; SQS rejects a notification exceeding the queue's configured MaximumMessageSize.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-content-structure.html#notification-content-structure
  - id: events-replace-config
    text: PutBucketNotificationConfiguration replaces the whole configuration and normally validates destinations atomically; a failed test causes the entire request to fail.
    source: https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketNotificationConfiguration.html#API_PutBucketNotificationConfiguration
  - id: events-lifecycle-delete
    text: S3 ObjectRemoved notifications do not report automatic lifecycle deletions; lifecycle expiration has its own event types.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html#supported-notification-event-types
  - id: events-key-encoding
    text: The object key in an S3 event notification is URL encoded, with spaces represented by plus signs.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-content-structure.html#notification-content-structure
diagrams:
  - id: s3-eventbridge-fifo
    title: Routing S3 events to a FIFO queue
    width: 1000
    height: 230
    nodes:
      - id: source
        label: S3 bucket
        icon: res-simple-storage-service-bucket
        tone: storage
        x: 30
        y: 80
        w: 210
        h: 72
      - id: bus
        label: EventBridge
        icon: eventbridge
        tone: integration
        x: 360
        y: 80
        w: 210
        h: 72
      - id: queue
        label: FIFO queue
        icon: simple-queue-service
        tone: integration
        x: 690
        y: 80
        w: 210
        h: 72
    edges:
      - from: source
        to: bus
        step: 1
      - from: bus
        to: queue
        step: 2
    steps:
      - Enabling EventBridge sends supported S3 events to the event bus.
      - An EventBridge rule selects matching events and sends them to the FIFO queue.
cards:
  - id: s3-002
    q: An S3 log bucket must trigger file processing on arrival. Which notification choices fit?
    a: Native notifications to Lambda, standard SNS, or standard SQS in the same Region, or EventBridge
      routing. Grant destination permissions; SQS can retain messages for later processing.
    facts:
      - events-targets
      - events-policy
      - events-eventbridge
      - events-sqs
  - id: s3-025
    q: When should an S3 team choose EventBridge over native object event notifications?
    a: Use EventBridge for rules over the event payload and additional targets such as SQS FIFO. Native
      notifications support prefix and suffix filtering and deliver at least once, with possible
      duplication or reordering.
    facts:
      - events-eventbridge
      - events-fifo
      - events-filter
      - events-delivery
  - id: s3-026
    q: Can S3 send a native event notification directly to an SQS FIFO queue?
    a: No. Enable EventBridge on the bucket and route the event to the FIFO queue through an EventBridge
      rule.
    trap: true
    facts:
      - events-fifo
      - events-eventbridge
  - id: s3-070
    q: An S3-triggered Lambda writes processed results back to the input prefix and keeps invoking
      itself. What should change?
    a: Write outputs to a separate bucket or use a trigger limited to a distinct input prefix. This
      breaks the notification loop.
    facts:
      - events-loop
  - id: s3-071
    q: An S3 consumer receives the same object event twice. What application behavior is required?
    a: "Idempotent processing: applying the same event again should not repeat its side effects. Track
      processed events rather than assuming exactly-once delivery."
    trap: true
    facts:
      - events-delivery
      - events-idempotent
  - id: s3-083
    q: An application receives an S3 ObjectRemoved:Delete notification. Does that mean the bucket is empty?
    a: No. It signals an object deletion, not that all objects in the bucket have been removed.
    trap: true
    facts:
      - events-object-deleted
  - id: s3-098
    q: An S3 bucket sends notifications to an SNS topic in another account. What should the topic policy allow?
    a: Allow the S3 service principal SNS:Publish, restricted by the source bucket ARN and account.
    facts:
      - events-destination-policy
  - id: s3-099
    q: S3 cannot publish notifications to a customer-managed KMS encrypted SQS queue despite an allowing queue policy. What else is needed?
    a: Grant the S3 service principal kms:GenerateDataKey and kms:Decrypt in the KMS key policy.
    facts:
      - events-kms
  - id: s3-100
    q: An S3 event consumer maintains an index and receives out-of-order PUT events for one key. How can it identify the later event?
    a: Compare sequencer values for that key after left-padding the shorter value with zeros. Sequencers cannot order different keys.
    facts:
      - events-sequencer
  - id: s3-101
    q: An S3 notification is rejected by an SQS queue with a small message limit. What limit should the team check?
    a: Set the queue MaximumMessageSize to at least 64 KB. Notifications can be up to that size.
    facts:
      - events-queue-size
  - id: s3-102
    q: A PutBucketNotificationConfiguration request adds an SQS target but an existing SNS destination fails validation. Is the new configuration saved?
    a: No. Normal destination validation is atomic and failure rejects the whole request. The operation replaces the whole configuration.
    trap: true
    facts:
      - events-replace-config
  - id: s3-103
    q: Will an S3 ObjectRemoved notification alert a consumer when S3 Lifecycle automatically deletes an object?
    a: No. Subscribe to lifecycle expiration events for automatic lifecycle deletions.
    trap: true
    facts:
      - events-lifecycle-delete
  - id: s3-104
    q: An S3 event consumer sees a plus sign in an object key that contains a space. How should it interpret the key?
    a: Decode it as a URL-encoded key; a plus sign represents a space.
    facts:
      - events-key-encoding
---
S3 event notifications start work when selected bucket events occur. They let a file arrival trigger processing without an application repeatedly listing the bucket.

### How it works

1. Select an event such as `s3:ObjectCreated:*` and optionally narrow it with an object-key prefix or suffix. A prefix is the beginning of the object name; a suffix is its ending.
2. Choose Lambda, standard SNS, or standard SQS in the same Region for a native notification. Grant S3 permission on the destination.
3. For EventBridge routing, enable EventBridge on the bucket. All supported events go to the bus; rules there select the events and targets. This path supports first-in, first-out (FIFO) queues, which preserve message order within a message group.
4. Make processing idempotent, meaning a repeated event does not duplicate its effects. S3 notifications can arrive more than once or out of order.
5. Keep output writes outside the triggering bucket or input prefix so processing does not recursively trigger itself.
6. For SNS or SQS, grant the S3 service principal publish or send access in the destination policy, scoped to the source bucket ARN and account. A customer managed KMS key also needs a key policy granting S3 data key generation and decryption.
7. Updating the bucket notification configuration replaces it in full. By default S3 validates destinations and rejects the whole update if validation fails.

### Exam cues

- If the question says S3 arrivals must reach an SQS FIFO queue, think EventBridge, because native notifications do not support that destination.
- If the question says S3 processing must survive consumer downtime, think SQS, because the queue stores notifications until consumers can handle them.
- If the question says an S3-triggered Lambda repeatedly processes its own output, think input-prefix isolation or separate buckets, because output uploads can trigger the same notification.
- If the question says an `s3:ObjectRemoved:Delete` notification arrived, think an object deletion, not an empty bucket, because the event describes the removed object.
- If an index receives out-of-order events for the same S3 key, compare the sequencer, a hexadecimal ordering value, after left-padding the shorter value. Sequencers cannot order different keys.
- If a notification must report S3 Lifecycle deletions, select lifecycle expiration events, because ObjectRemoved excludes automatic lifecycle deletions.

### Remember

- Native Lambda, SNS, and SQS targets must be in the bucket Region. SNS and SQS targets must be standard types.
- Delivery is at least once, with possible duplicates and reordering.
- Prefix and suffix filters do not support wildcards; overlapping filters for the same event types can be invalid.
- `s3:ObjectCreated:*` includes completed multipart uploads.
- An SQS queue must accept messages up to 64 KB to accommodate the maximum S3 notification size.
- Event object keys are URL encoded; decode plus signs as spaces.

> **Trap:** A FIFO destination does not retroactively make S3 emit events in object-operation order.
