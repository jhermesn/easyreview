---
title: "EventBridge basics"
level: foundational
order: 5
facts:
  - id: event-router
    text: "Amazon EventBridge is a serverless service that uses events to connect application components, for scalable, loosely coupled event-driven applications."
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html#eb-what-is
cards:
  - id: eventbridge-052
    q: "Several services must react when an order is placed, without the order service knowing about them. Which AWS service routes the events?"
    a: "Amazon EventBridge."
    facts: [event-router]
---
Amazon EventBridge routes events from sources to the targets that care about them.

### How it works

1. A source sends an event to an event bus.
2. Rules match events.
3. Matching events go to targets such as Lambda functions.

### Exam cues

- If the question says event-driven or react to events from AWS services or apps, think EventBridge.

### Remember

- Serverless event routing.

> **Trap:** EventBridge routes events to targets; SQS holds messages until a consumer polls them.
