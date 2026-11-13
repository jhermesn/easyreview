---
title: Durable fan-out
level: associate
order: 20
facts:
  - id: fan-copies
    text: Subscribing separate SQS queues to an SNS topic gives each subscribed queue a copy of
      published messages for later processing.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html#sns-sqs-as-subscriber
  - id: fan-permission
    text: An SQS queue policy must allow sns.amazonaws.com to call sqs:SendMessage; aws:SourceArn can
      restrict that permission to a specific topic.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-access-policy-use-cases.html#sns-publish-messages-to-sqs-queue
  - id: fan-filter
    text: An SNS subscription receives every published message by default; a filter policy selects
      messages using attributes or the JSON body.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html#sns-message-filtering
  - id: fan-retention
    text: SQS message retention defaults to 4 days and can be configured from 1 minute to 14 days.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html#quotas-messages
  - id: fan-ddb-readers
    text: AWS recommends no more than two simultaneous readers per DynamoDB Streams shard because
      additional readers can cause throttling.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html#Streams.Processing
  - id: fan-ddb-forward
    text: One Lambda consumer can forward DynamoDB Streams records to SNS, which delivers copies to
      subscribed SQS queues.
    source: https://aws.amazon.com/blogs/database/how-to-perform-ordered-data-replication-between-applications-by-using-amazon-dynamodb-streams/
  - id: fan-routing
    text: An EventBridge default or Classic event bus rule can route a matching event to an SNS topic.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html#eb-targets
  - id: fan-retry
    text: SQS can move repeatedly unsuccessful messages to a dead-letter queue according to the source
      queue redrive policy maxReceiveCount.
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html#policies-for-dead-letter-queues
  - id: fan-arn
    text: An Amazon Resource Name uniquely identifies an AWS resource.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html#reference-arns
  - id: fan-policy
    text: A queue resource policy controls whether SNS is allowed to send messages to that SQS queue.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-access-policy-use-cases.html#sns-publish-messages-to-sqs-queue
diagrams:
  - id: event-fanout
    title: Route events and buffer independent consumers
    width: 800
    height: 340
    nodes:
      - id: source
        label: Event source
        icon: res-generic-application
        x: 20
        y: 130
        w: 130
        h: 72
        tone: user
        info: An application or AWS service emits an event to the event bus.
      - id: bus
        label: EventBridge
        sub: rule matches event
        icon: eventbridge
        x: 210
        y: 130
        w: 150
        h: 86
        tone: integration
        info: A default or Classic event bus rule sends matching events to an SNS target.
      - id: topic
        label: SNS topic
        sub: fan-out
        icon: res-simple-notification-service-topic
        x: 420
        y: 130
        w: 140
        h: 86
        tone: integration
        info: SNS pushes a copy to each matching subscription.
      - id: qa
        label: SQS queue A
        sub: consumer A
        icon: res-simple-queue-service-queue
        x: 640
        y: 30
        w: 140
        h: 86
        tone: integration
        info: This queue stores messages for its own polling consumer, subject to its configured retention.
      - id: qb
        label: SQS queue B
        sub: consumer B
        icon: res-simple-queue-service-queue
        x: 640
        y: 230
        w: 140
        h: 86
        tone: integration
        info: This queue stores messages for its own polling consumer, subject to its configured retention.
    edges:
      - from: source
        to: bus
        step: 1
        label: emit
      - from: bus
        to: topic
        step: 2
        label: match
      - from: topic
        to: qa
        step: 3
        label: publish
      - from: topic
        to: qb
        step: 4
        label: publish
    steps:
      - A producer sends an event to the bus.
      - An EventBridge rule matches the event and sends it to an SNS topic.
      - SNS delivers a copy to queue A for its consumer.
      - SNS delivers another copy to queue B, allowing independent processing.
cards:
  - id: event-processing-patterns-001
    q: Several applications reading a DynamoDB stream are throttled. How can they receive changes
      without each reading the stream?
    a: Use one Lambda stream consumer to publish to SNS and subscribe one SQS queue per application.
      More than two readers per DynamoDB Streams shard can cause throttling.
    trap: true
    facts:
      - fan-ddb-readers
      - fan-ddb-forward
  - id: event-processing-patterns-003
    q: An SNS publisher must send each event to three applications that can be offline temporarily. What
      pattern gives each application stored work?
    a: Subscribe one SQS queue per application to the SNS topic. Each queue holds its own copy within
      its retention period.
    facts:
      - fan-copies
      - fan-retention
  - id: event-processing-patterns-005
    q: A team adds application readers to DynamoDB Streams and encounters read throttling. How can it
      distribute changes with fewer readers?
    a: Have one Lambda consumer forward changes to SNS and subscribe separate SQS queues. This avoids
      one direct stream reader per downstream application.
    trap: true
    facts:
      - fan-ddb-readers
      - fan-ddb-forward
  - id: event-processing-patterns-007
    q: Two applications need every SNS message but process at different rates. How should their SQS
      subscriptions be arranged?
    a: Use one SQS queue per application. Each queue stores a separate copy; configure retention and
      failure handling for each queue.
    facts:
      - fan-copies
      - fan-retention
      - fan-retry
  - id: event-processing-patterns-011
    q: An SNS topic subscription exists, but its SQS queue rejects delivery. Which permission should the
      team check?
    a: The SQS queue policy must allow sns.amazonaws.com to perform sqs:SendMessage. Restrict
      aws:SourceArn to the intended topic.
    facts:
      - fan-permission
  - id: event-processing-patterns-012
    q: An SNS subscriber needs only selected event types. What should the team configure?
    a: A filter policy on that subscription, matching message attributes or the JSON body. Without a
      filter, the subscription receives every published message.
    facts:
      - fan-filter
---

Fan-out means sending a copy of one message to multiple destinations. SNS with one SQS queue per application gives each application stored work that it can process at its own pace.

### How it works

1. Subscribe a separate SQS queue for each application to the SNS topic. A queue is the application's backlog, meaning work waiting to be processed.
2. Allow SNS to send messages in each queue's resource policy, the permission document attached to that queue. Restrict the permission to the intended topic with `aws:SourceArn`, its Amazon Resource Name, or unique AWS resource identifier.
3. Publish to SNS. By default each subscription receives a copy. A subscription filter can select only matching attributes or JSON body fields, the named values in a structured text message.
4. Each application polls its own queue. Configure retention and a dead-letter queue, a separate queue for repeatedly unsuccessful messages, according to that application's needs.
5. For DynamoDB changes, one Lambda stream consumer can publish to SNS. This reduces direct readers when more than two readers per shard cause throttling. EventBridge rules can also route matching events to SNS, as the diagram shows.

### Exam cues

- If the question says every application needs every message despite temporary downtime, think SNS with an SQS queue per application, because each gets stored work.
- If the question says additional DynamoDB Streams readers cause throttling, think one forwarding Lambda consumer and downstream fan-out, because adding readers can exceed the per-shard reading recommendation.
- If the question says an SNS subscription exists but SQS delivery is denied, think queue resource policy, because subscription setup alone does not grant send permission.

### Remember

- SQS retention defaults to 4 days; its configurable range is 1 minute to 14 days.
- DynamoDB Streams should have no more than two simultaneous readers per shard.
- SNS subscriptions receive every message by default; filtering is configured per subscription.
- A queue's `maxReceiveCount` controls movement to its dead-letter queue.

> **Trap:** A queue shared by applications does not give each application its own backlog. Use a separate SNS subscription and queue for each application that needs its own copy.
