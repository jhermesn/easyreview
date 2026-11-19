---
title: Producer batching and ordering
level: professional
order: 40
facts:
  - id: shard-hash
    text: Kinesis uses an MD5 hash of the partition key to map records to a shard hash range; the same
      key maps to the same shard unless explicitly overridden.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html#API_PutRecords
  - id: shard-order
    text: For strict write ordering, write PutRecord calls serially to one shard and use
      SequenceNumberForOrdering; sequence numbers do not establish order across shards.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecord.html#API_PutRecord
  - id: shard-kpl-aggregation
    text: KPL aggregation combines multiple application records into one Kinesis record to reduce the
      service-record rate and improve producer throughput.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-kpl-concepts.html#kinesis-kpl-concepts-aggretation
  - id: shard-kpl-collection
    text: KPL collection uses PutRecords to send multiple Kinesis records in one request; aggregation
      and collection are independently configurable and enabled by default.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-kpl-concepts.html#kinesis-kpl-concepts-batching
  - id: shard-batch-order
    text: PutRecords can partially succeed and does not guarantee record ordering; retry failed entries
      rather than assuming the whole request succeeded.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html#API_PutRecords
  - id: consumer-tables
    text: KCL 3.x uses lease, worker metrics, and coordinator state DynamoDB tables by default; KCL 3.5
      supports consolidating metadata into one lease table.
    source: https://docs.aws.amazon.com/streams/latest/dev/kcl-dynamoDB.html#kcl-dynamoDB
  - id: consumer-single
    text: New migrations from KCL 2.x to KCL 3.5 use single table format by default; existing KCL 3.x
      applications require a migration to consolidate tables.
    source: https://docs.aws.amazon.com/streams/latest/dev/kcl-single-table-format.html#kcl-single-table-format
  - id: consumer-producer-retry
    text: A producer retry after an uncertain acknowledgement can store duplicate payloads with
      different sequence numbers; an application-level key can identify duplicates.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-record-processor-duplicates.html#kinesis-record-processor-duplicates-producer
  - id: consumer-efo
    text: An enhanced fan-out consumer receives dedicated throughput up to 2 MB per second per shard,
      independent of other consumers.
    source: https://docs.aws.amazon.com/streams/latest/dev/enhanced-consumers.html#enhanced-consumers
  - id: consumer-restart
    text: When a KCL processor restarts after worker failure, deployment, or resharding, it resumes from
      the last checkpoint and can repeat completed processing.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-record-processor-duplicates.html#kinesis-record-processor-duplicates-consumer
  - id: consumer-idempotent
    text: Consumers should handle records more than once without unintended extra side effects; this is
      idempotent processing.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-record-processor-duplicates.html#kinesis-record-processor-duplicates
  - id: consumer-latency
    text: AWS describes enhanced fan-out message propagation delay as typically averaging 70
      milliseconds.
    source: https://docs.aws.amazon.com/streams/latest/dev/enhanced-consumers.html#enhanced-consumers
  - id: kcl-metrics
    text: The KCL publishes CloudWatch metrics under the application name, including MillisBehindLatest per shard, which shows how far consumers lag.
    source: https://docs.aws.amazon.com/streams/latest/dev/monitoring-with-kcl.html
cards:
  - id: kinesis-data-streams-002
    q: How does Kinesis Data Streams choose a shard, and how should a producer preserve strict write
      order?
    a: By default it hashes the partition key with MD5 into a shard hash range. For strict ordering,
      make serial PutRecord calls to the same shard with SequenceNumberForOrdering. There is no
      stream-wide shard order.
    facts:
      - shard-hash
      - shard-order
  - id: kinesis-data-streams-008
    q: A Kinesis producer sends many tiny application records and reaches the shard record-rate limit
      before its byte limit. Which KPL feature helps?
    a: Aggregation. It packs multiple application records into one Kinesis record, reducing the number
      of service records written. Collection also reduces request overhead by using PutRecords.
    facts:
      - shard-kpl-aggregation
      - shard-kpl-collection
  - id: kinesis-data-streams-012
    q: Does Kinesis PutRecords guarantee strict ordering when some records in the batch fail?
    a: No. PutRecords can partially succeed and does not guarantee ordering. Use serial PutRecord writes
      to the same shard with SequenceNumberForOrdering when strict ordering is required.
    trap: true
    facts:
      - shard-batch-order
      - shard-order
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
---
Kinesis Data Streams producers choose how to route and write records. The write method and Kinesis Producer Library (KPL) batching settings affect ordering and producer throughput.

### How it works

1. Kinesis uses an MD5 hash of the partition key, a value supplied with a record, to choose a shard by its hash range. The same key maps to the same shard unless the mapping is explicitly overridden. [Source](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html#API_PutRecords)
2. For strict write order, send `PutRecord` calls serially to the same shard and use `SequenceNumberForOrdering`. The ordering guarantee applies to writes from the same client and partition key; sequence numbers do not establish order across shards. [Source](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecord.html#API_PutRecord)
3. KPL aggregation packs multiple application records into one Kinesis record, reducing the service-record rate and improving producer throughput. [Source](https://docs.aws.amazon.com/streams/latest/dev/kinesis-kpl-concepts.html#kinesis-kpl-concepts-aggretation)
4. KPL collection sends multiple Kinesis records in one `PutRecords` request. Aggregation and collection can be configured independently. [Source](https://docs.aws.amazon.com/streams/latest/dev/kinesis-kpl-concepts.html#kinesis-kpl-concepts-batching)
5. A `PutRecords` request can partially succeed. Check for failed entries and retry them; the operation does not guarantee record ordering. [Source](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html#API_PutRecords)

### Exam cues

- If the question says many small application records reach the shard record-rate limit, think KPL aggregation, because it packs them into fewer Kinesis records.
- If the question says strict write order matters, think serial `PutRecord` calls with `SequenceNumberForOrdering`, because `PutRecords` does not guarantee ordering.
- If the question says a `PutRecords` batch has failures, think retry failed entries, because other entries may have succeeded.

### Remember

- Aggregation combines application records; collection sends Kinesis records together using `PutRecords`.
- Both KPL batching features are enabled by default and can be configured independently. [Source](https://docs.aws.amazon.com/streams/latest/dev/kinesis-kpl-concepts.html#kinesis-kpl-concepts-batching)
- Sequence numbers do not establish order across shards. [Source](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecord.html#API_PutRecord)
- KCL 3.x keeps lease, worker metrics and coordinator state tables; KCL 3.5 supports one lease table.
- Enhanced fan-out propagation typically averages 70 ms; it is not a per-record guarantee, and it does not make processing exactly once.
- Producer retries can duplicate payloads under new sequence numbers; deduplicate on an application identifier.

> **Trap:** A `PutRecords` request can succeed for some entries and fail for others. A batch does not guarantee strict ordering, even when records are sent together. [Source](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html#API_PutRecords)
