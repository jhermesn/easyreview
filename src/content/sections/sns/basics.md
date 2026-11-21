---
title: "SNS basics"
level: foundational
order: 5
facts:
  - id: pub-sub
    text: "Amazon SNS delivers messages from publishers to subscribers: publishers send to a topic, and every subscriber of the topic receives the message."
    source: https://docs.aws.amazon.com/sns/latest/dg/welcome.html#welcome
cards:
  - id: sns-030
    q: "One message must reach email subscribers, an SQS queue and a Lambda function at the same time. Which service fits?"
    a: "Amazon SNS, publishing to a topic with those subscribers."
    facts: [pub-sub]
---
Amazon SNS is publish and subscribe messaging: one message to a topic reaches many subscribers.

### How it works

1. Create a topic.
2. Subscribers, such as email, SQS or Lambda, subscribe to it.
3. A published message is pushed to every subscriber.

### Exam cues

- If the question says notify many subscribers at once or fan out, think SNS.

### Remember

- Topics push messages to all subscribers.

> **Trap:** SNS pushes to subscribers right away; SQS keeps messages until a consumer reads them.
