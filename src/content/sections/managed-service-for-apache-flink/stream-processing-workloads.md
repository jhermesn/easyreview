---
title: Stream processing workloads
level: associate
order: 10
facts:
  - id: flink-purpose
    text: Managed Service for Apache Flink runs applications that process and analyze streaming data using Java, Scala, Python, or SQL.
    source: https://docs.aws.amazon.com/managed-flink/latest/java/what-is.html#what-is
  - id: flink-flow
    text: A DataStream application reads a source such as Kinesis Data Streams or an Amazon MSK topic, applies transformations, and writes to a sink.
    source: https://docs.aws.amazon.com/managed-flink/latest/java/how-it-works.html#how-it-works-prog-datastream
  - id: flink-analytics
    text: A Flink application can enrich records, aggregate data over time, and write results to a Firehose stream.
    source: https://docs.aws.amazon.com/streams/latest/dev/kda-consumer.html#kda-consumer
  - id: flink-management
    text: The service provisions compute and handles availability zone failover resilience, parallel computation, automatic scaling, checkpoints, and snapshots.
    source: https://docs.aws.amazon.com/managed-flink/latest/java/what-is.html#what-is
  - id: flink-studio
    text: Flink Studio supports interactive stream queries, while a Flink application is suited to long-running streaming workloads.
    source: https://docs.aws.amazon.com/managed-flink/latest/java/what-is.html#flink-or-studio
  - id: flink-checkpoint
    text: With checkpointing enabled, a running application automatically creates checkpoints and uses the newest one to recover from failure.
    source: https://docs.aws.amazon.com/managed-flink/latest/java/how-fault.html#how-fault
  - id: flink-snapshot
    text: A snapshot backs up application state and can be used to restore an application.
    source: https://docs.aws.amazon.com/managed-flink/latest/java/how-fault.html#how-fault
  - id: flink-defaults
    text: Default checkpointing is enabled with a 60000 millisecond interval and a minimum pause of 5000 milliseconds.
    source: https://docs.aws.amazon.com/managed-flink/latest/java/how-fault.html#how-fault-configure
  - id: flink-kpu
    text: A Kinesis Processing Unit provides one vCPU, 4 GB of memory, and 50 GB of running application storage.
    source: https://docs.aws.amazon.com/managed-flink/latest/java/how-scaling.html#how-scaling-kpus
  - id: firehose-delivery
    text: Amazon Data Firehose delivers streaming data to destinations and can transform data before delivery.
    source: https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html#what-is-this-service
diagrams:
  - id: flink-stream-flow
    title: Process and deliver a stream
    width: 800
    height: 150
    nodes:
      - { id: stream, label: Kinesis stream, x: 25, y: 35, w: 190, h: 72, tone: integration, icon: kinesis-data-streams }
      - { id: flink, label: Managed Flink, x: 305, y: 35, w: 190, h: 72, tone: integration, icon: managed-service-for-apache-flink }
      - { id: delivery, label: Firehose, x: 585, y: 35, w: 190, h: 72, tone: integration, icon: data-firehose }
    edges:
      - { from: stream, to: flink, step: 1 }
      - { from: flink, to: delivery, step: 2 }
    steps:
      - A Flink application reads records from a Kinesis stream.
      - The application processes records and can send results to Firehose.
cards:
  - id: managed-service-for-apache-flink-001
    q: Which AWS service runs Apache Flink applications to process streaming data, rather than primarily delivering it?
    a: "Amazon Managed Service for Apache Flink. It runs stream processing applications; Firehose delivers data and can also transform it."
    facts: [flink-purpose, firehose-delivery]
  - id: managed-service-for-apache-flink-002
    q: A team needs to aggregate Kinesis stream records over time and send results to Firehose. What can process the records?
    a: "Amazon Managed Service for Apache Flink. A Flink application can aggregate records and write results to Firehose."
    facts: [flink-analytics]
  - id: managed-service-for-apache-flink-003
    q: A team wants to query a data stream interactively using SQL. Which Managed Service for Apache Flink option fits?
    a: "Flink Studio. It supports interactive queries of streams."
    facts: [flink-studio]
  - id: managed-service-for-apache-flink-004
    q: How does a Managed Service for Apache Flink application recover from an unexpected failure when checkpointing is enabled?
    a: "It uses the newest automatically created checkpoint."
    facts: [flink-checkpoint]
  - id: managed-service-for-apache-flink-005
    q: What are the default checkpoint settings in Managed Service for Apache Flink?
    a: "Checkpointing is enabled. The interval is 60 seconds and the minimum pause is 5 seconds."
    facts: [flink-defaults]
  - id: managed-service-for-apache-flink-006
    q: Does Amazon Data Firehose need to run an Apache Flink application to transform data before delivery?
    a: "No. Firehose can transform data before delivering it."
    facts: [firehose-delivery]
    trap: true
---

Amazon Managed Service for Apache Flink runs applications that analyze streaming data, a continuous flow of records. Think of it as managed compute for processing records as they arrive.

### How it works

1. Write a Flink application that reads a source, such as a Kinesis stream or an Amazon MSK topic. A source connector reads external data.
2. Apply transformations, such as filtering, enrichment, or aggregation over time. A sink connector writes the results to an external destination, such as Firehose.
3. The service provisions compute and manages scaling and availability zone failover resilience. It can checkpoint a running application and restore it after failure.

### Exam cues

- If the question says aggregate streaming records over time, think Managed Service for Apache Flink, because an application can process records and send the results to Firehose.
- If the question says explore a stream interactively, think Flink Studio, because it supports interactive queries.
- If the question says recover from an unexpected failure, think checkpoints, because the application uses the newest checkpoint when checkpointing is enabled.

### Remember

- Default checkpointing is enabled: the interval is 60 seconds and the minimum pause is 5 seconds.
- A checkpoint is a backup used for failure recovery. A snapshot backs up application state for restoration.
- One Kinesis Processing Unit provides one vCPU, 4 GB of memory, and 50 GB of running application storage.

> **Trap:** Firehose is not limited to delivery without transformation. It can transform data before delivery; use Flink when the application needs stream processing.
