---
title: "Firehose basics"
level: foundational
order: 5
facts:
  - id: delivery
    text: "Amazon Data Firehose is a fully managed service that delivers real-time streaming data to destinations such as Amazon S3, Amazon Redshift and Amazon OpenSearch Service."
    source: https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html#what-is-this-service
cards:
  - id: firehose-022
    q: "Streaming logs must be loaded into Amazon S3 continuously without writing consumer code. Which service fits?"
    a: "Amazon Data Firehose."
    facts: [delivery]
---
Amazon Data Firehose loads streaming data into storage and analytics services for you.

### How it works

1. Create a Firehose stream with a destination.
2. Send data to it.
3. Firehose delivers the data to the destination.

### Exam cues

- If the question says deliver streaming data to S3 or Redshift with no code, think Firehose.

### Remember

- Fully managed delivery to destinations.

> **Trap:** Firehose delivers data; Kinesis Data Streams is for custom real-time consumers.
