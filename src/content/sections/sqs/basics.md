---
title: "SQS basics"
level: foundational
order: 5
facts:
  - id: decouple
    text: "Amazon SQS is a hosted message queue that lets you decouple and integrate distributed software components."
    source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html#welcome
cards:
  - id: sqs-030
    q: "A web tier must hand jobs to a worker tier that sometimes falls behind, without losing jobs. Which service fits?"
    a: "Amazon SQS, a queue between the two tiers."
    facts: [decouple]
---
Amazon SQS is a message queue: producers add messages and consumers process them at their own pace.

### How it works

1. A producer sends a message to the queue.
2. The queue stores it durably.
3. A consumer polls, processes and deletes it.

### Exam cues

- If the question says decouple components or buffer work, think SQS.

### Remember

- Durable hosted queue.

> **Trap:** SQS consumers pull messages; SNS pushes them to subscribers.
