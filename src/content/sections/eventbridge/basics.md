---
title: "EventBridge basics"
level: foundational
order: 5
facts:
  - id: event-router
    text: "Amazon EventBridge is a serverless service that uses events to connect application components, for scalable, loosely coupled event-driven applications."
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html#eb-what-is
  - id: rules-route
    text: "EventBridge rules match events and send them to targets."
    source: https://docs.aws.amazon.com/decision-guides/latest/decision-guides/sns-or-sqs-or-eventbridge.html#sns-or-sqs-or-eventbridge
  - id: sqs-queues
    text: "Amazon SQS stores messages in queues for consumers to poll."
    source: https://docs.aws.amazon.com/decision-guides/latest/decision-guides/sns-or-sqs-or-eventbridge.html#sns-or-sqs-or-eventbridge
  - id: sns-subscribers
    text: "Amazon SNS sends published messages to subscribers."
    source: https://docs.aws.amazon.com/decision-guides/latest/decision-guides/sns-or-sqs-or-eventbridge.html#sns-or-sqs-or-eventbridge
cards:
  - id: eventbridge-052
    q: "Several services must react when an order is placed, without the order service knowing about them. Which AWS service routes the events?"
    a: "Amazon EventBridge."
    facts: [event-router]
  - id: eventbridge-054
    q: "Which service matches events to rules and routes them to targets: Amazon EventBridge, Amazon SQS or Amazon SNS?"
    a: "Amazon EventBridge. SQS queues messages for consumers, while SNS sends messages to subscribers."
    facts: [rules-route, sqs-queues, sns-subscribers]
---
Amazon EventBridge routes events from sources to the targets that care about them.

### How it works

1. A source sends an event to an event bus.
2. Rules match events.
3. Matching events go to targets such as Lambda functions.

### Exam cues

- If the question says route events based on their contents, think EventBridge rules, because matching rules send events to targets.
- If the question says event-driven or react to events from AWS services or apps, think EventBridge.

### Remember

- Serverless event routing.

> **Trap:** EventBridge routes events to targets; SQS holds messages until a consumer polls them.
