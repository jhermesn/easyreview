---
title: Enhanced fan-out and checkpoints
level: professional
order: 30
facts:
  - id: consumer-shared
    text: Shared-throughput consumers poll GetRecords and share 2 MB per second of read throughput per
      shard.
    source: https://docs.aws.amazon.com/streams/latest/dev/enhanced-consumers.html#enhanced-consumers
  - id: consumer-efo
    text: An enhanced fan-out consumer receives dedicated throughput up to 2 MB per second per shard,
      independent of other consumers.
    source: https://docs.aws.amazon.com/streams/latest/dev/enhanced-consumers.html#enhanced-consumers
  - id: consumer-push
    text: Enhanced fan-out pushes records over HTTP/2 with SubscribeToShard instead of GetRecords
      polling.
    source: https://docs.aws.amazon.com/streams/latest/dev/enhanced-consumers.html#enhanced-consumers
  - id: consumer-register
    text: Enhanced fan-out consumers are registered for a stream using RegisterStreamConsumer and
      subscribe to shards with SubscribeToShard.
    source: https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html#kinesis-polling-and-batching
  - id: consumer-limit
    text: On-demand Standard and Provisioned streams support up to 20 registered enhanced fan-out
      consumers per stream; On-demand Advantage supports up to 50 in supported Regions.
    source: https://docs.aws.amazon.com/streams/latest/dev/enhanced-consumers.html#enhanced-consumers
  - id: consumer-date
    text: AWS announced support for 50 enhanced fan-out consumers on On-demand Advantage streams in
      November 2025.
    source: https://aws.amazon.com/about-aws/whats-new/2025/11/amazon-kinesis-data-streams-enhanced-fan-out-consumers/
  - id: consumer-latency
    text: AWS describes enhanced fan-out message propagation delay as typically averaging 70
      milliseconds.
    source: https://docs.aws.amazon.com/streams/latest/dev/enhanced-consumers.html#enhanced-consumers
  - id: consumer-lease
    text: KCL uses a DynamoDB lease table to track which worker processes a shard and the most recent
      checkpoint sequence number.
    source: https://docs.aws.amazon.com/streams/latest/dev/kcl-dynamoDB.html#kcl-dynamoDB
  - id: consumer-tables
    text: KCL 3.x uses lease, worker metrics, and coordinator state DynamoDB tables by default; KCL 3.5
      supports consolidating metadata into one lease table.
    source: https://docs.aws.amazon.com/streams/latest/dev/kcl-dynamoDB.html#kcl-dynamoDB
  - id: consumer-single
    text: New migrations from KCL 2.x to KCL 3.5 use single table format by default; existing KCL 3.x
      applications require a migration to consolidate tables.
    source: https://docs.aws.amazon.com/streams/latest/dev/kcl-single-table-format.html#kcl-single-table-format
  - id: consumer-restart
    text: When a KCL processor restarts after worker failure, deployment, or resharding, it resumes from
      the last checkpoint and can repeat completed processing.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-record-processor-duplicates.html#kinesis-record-processor-duplicates-consumer
  - id: consumer-checkpoint
    text: A checkpoint records completed progress; a crash after a side effect but before checkpointing
      can cause that side effect to be attempted again.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-record-processor-duplicates.html#kinesis-record-processor-duplicates-consumer
  - id: consumer-producer-retry
    text: A producer retry after an uncertain acknowledgement can store duplicate payloads with
      different sequence numbers; an application-level key can identify duplicates.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-record-processor-duplicates.html#kinesis-record-processor-duplicates-producer
  - id: consumer-idempotent
    text: Consumers should handle records more than once without unintended extra side effects; this is
      idempotent processing.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-record-processor-duplicates.html#kinesis-record-processor-duplicates
  - id: kcl-metrics
    text: The KCL publishes CloudWatch metrics under the application name, including MillisBehindLatest per shard, which shows how far consumers lag.
    source: https://docs.aws.amazon.com/streams/latest/dev/monitoring-with-kcl.html
cards:
  - id: kinesis-data-streams-006
    q: Five Kinesis Data Streams applications each need the full shard read rate without competing with
      the others. Which consumer model fits?
    a: Enhanced fan-out. Each registered consumer gets up to 2 MB/s per shard through SubscribeToShard
      over HTTP/2. Standard and Provisioned modes allow 20 consumers; On-demand Advantage allows 50
      in supported Regions.
    facts:
      - consumer-efo
      - consumer-push
      - consumer-limit
  - id: kinesis-data-streams-007
    q: How does KCL save Kinesis processing progress, and what happens if a worker crashes after
      processing but before checkpointing?
    a: KCL stores the checkpoint sequence number in a DynamoDB lease table. The replacement resumes from
      the last checkpoint, so completed processing can repeat. Make side effects idempotent.
    facts:
      - consumer-lease
      - consumer-restart
      - consumer-checkpoint
      - consumer-idempotent
  - id: kinesis-data-streams-019
    q: A KCL application has three metadata tables. Does every KCL 3.5 application always require all
      three?
    a: No. KCL 3.5 supports consolidating metadata into one lease table. New migrations from 2.x use the
      single table format by default; existing 3.x applications must migrate.
    trap: true
    facts:
      - consumer-tables
      - consumer-single
  - id: kinesis-data-streams-020
    q: A Kinesis producer retries PutRecord after a network timeout. Can duplicate payloads share one
      sequence number for deduplication?
    a: No. If both writes succeeded, the payloads have different sequence numbers. Put an
      application-level identifier in the payload when duplicates must be detected.
    trap: true
    facts:
      - consumer-producer-retry
  - id: kinesis-data-streams-021
    q: A consumer uses enhanced fan-out and then restarts after a failed deployment. Does dedicated
      throughput guarantee exactly-once side effects?
    a: No. Enhanced fan-out isolates read throughput. Restart from the last checkpoint can still repeat
      processing, so side effects must be idempotent.
    trap: true
    facts:
      - consumer-efo
      - consumer-restart
      - consumer-idempotent
  - id: kinesis-data-streams-022
    q: Does the typical 70 ms enhanced fan-out propagation figure describe a guaranteed per-record
      latency?
    a: No. AWS describes 70 ms as a typical average propagation delay.
    trap: true
    facts:
      - consumer-latency
  - id: kinesis-data-streams-024
    q: Which KCL metric shows how far a Kinesis consumer application lags behind the stream, to scale the consumer fleet?
    a: MillisBehindLatest.
    facts: [kcl-metrics]
diagrams:
  - id: kinesis-independent-consumers
    title: Independent consumers keep separate read progress
    width: 900
    height: 360
    nodes:
      - id: stream
        label: Kinesis stream
        icon: kinesis-data-streams
        x: 40
        y: 130
        w: 160
        h: 72
        tone: integration
        info: Each enhanced fan-out consumer has dedicated throughput up to 2 MB/s per shard.
      - id: a
        label: KCL app A
        icon: res-generic-application
        x: 360
        y: 30
        w: 160
        h: 72
        tone: user
        info: This application independently processes the stream and checkpoints its progress.
      - id: b
        label: KCL app B
        icon: res-generic-application
        x: 360
        y: 230
        w: 160
        h: 72
        tone: user
        info: Another application can process the same records independently.
      - id: db
        label: Lease metadata
        icon: dynamodb
        x: 680
        y: 130
        w: 160
        h: 72
        tone: database
        info: Each KCL application maintains its own DynamoDB lease table with shard ownership and
          checkpoints.
    edges:
      - from: stream
        to: a
        label: push
        step: 1
      - from: stream
        to: b
        label: push
        step: 2
      - from: a
        to: db
        label: checkpoint A
        step: 3
      - from: b
        to: db
        label: checkpoint B
        step: 4
    steps:
      - Consumer A receives its own enhanced fan-out stream of records.
      - Consumer B independently receives the same records.
      - Application A saves completed progress in its own lease metadata.
      - Application B saves its own progress independently.
---

Enhanced fan-out gives each registered consumer its own shard read throughput. Kinesis Client Library, or KCL, coordinates workers and stores read progress. These solve separate problems: read isolation controls capacity, while checkpointing records completed work.

### How it works

1. Choose shared reads when applications can share the shard's 2 MB/s through `GetRecords` polling, meaning repeated requests for new records. Choose enhanced fan-out when each application needs dedicated read throughput.
2. Register the enhanced fan-out consumer with `RegisterStreamConsumer`. `SubscribeToShard` pushes records over HTTP/2 with up to 2 MB/s per consumer per shard.
3. If using KCL, let its workers coordinate shard ownership through a lease, the stored assignment of a shard to a worker. The DynamoDB lease table also stores each shard's checkpoint, its saved completed position.
4. Complete the processing side effect before checkpointing that progress. If the worker crashes between those operations, its replacement starts from the last checkpoint and can repeat the side effect.
5. Make processing idempotent so a repeated record has no unintended extra effect. Producer retries can also create duplicate payloads with different sequence numbers, so use an application-level identifier when deduplicating them.

### Exam cues

- If the question says readers compete for the same shard throughput, think enhanced fan-out, because each registered consumer has independent capacity.
- If the question says processing completed before a worker crashed but checkpointing did not, think repeated processing after restart, because the saved position still points behind the completed work.
- If the question says three KCL metadata tables are always required, think KCL version and table format, because KCL 3.5 supports a single lease table.

### Remember

- Shared reads: 2 MB/s total per shard. Enhanced fan-out: up to 2 MB/s per consumer per shard.
- Standard and Provisioned: up to 20 registered enhanced fan-out consumers per stream.
- November 2025: AWS announced up to 50 for On-demand Advantage in supported Regions.
- Enhanced fan-out propagation delay typically averages 70 ms.
- KCL 3.x defaults to lease, worker metrics, and coordinator state tables. KCL 3.5 supports one-table metadata; new migrations from 2.x use it by default.

> **Trap:** Enhanced fan-out does not make processing exactly once. Dedicated read capacity and saved checkpoints still require duplicate-safe side effects.
