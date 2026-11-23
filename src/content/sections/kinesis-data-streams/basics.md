---
title: "Kinesis Data Streams basics"
level: foundational
order: 5
facts:
  - id: streams
    text: "Amazon Kinesis Data Streams collects and processes large streams of data records in real time, read by consumer applications."
    source: https://docs.aws.amazon.com/streams/latest/dev/introduction.html#introduction
  - id: consumer-destinations
    text: A Kinesis Data Streams consumer can write its output to Amazon S3 or Amazon Redshift.
    source: https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html#high-level-architecture
cards:
  - id: kinesis-data-streams-027
    q: Where can a Kinesis Data Streams consumer store its processed output?
    a: It can write the results to Amazon S3 or Amazon Redshift.
    facts: [consumer-destinations]
  - id: kinesis-data-streams-026
    q: "Clickstream events must be collected and processed by several applications in real time. Which service fits?"
    a: "Amazon Kinesis Data Streams."
    facts: [streams]
---
Amazon Kinesis Data Streams carries real-time data streams for applications to process.

### How it works

1. Producers put records into a data stream.
2. The stream stores them in order.
3. Consumers read and process them in real time. They can write results to Amazon S3 or Amazon Redshift.

### Exam cues

- If the question says real-time streaming data processed by custom apps, think Kinesis Data Streams.

### Remember

- Real-time streams with consumers.

> **Trap:** Data Streams needs consumers; Firehose delivers data to destinations for you.
