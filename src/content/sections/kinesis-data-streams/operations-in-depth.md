---
title: Producer batching and ordering
level: professional
order: 40
facts:
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
  - id: kcl-metrics
    text: The KCL publishes CloudWatch metrics under the application name, including MillisBehindLatest per shard, which shows how far consumers lag.
    source: https://docs.aws.amazon.com/streams/latest/dev/monitoring-with-kcl.html
  - id: shard-order
    text: For strict write ordering, write PutRecord calls serially to one shard and use
      SequenceNumberForOrdering; sequence numbers do not establish order across shards.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecord.html#API_PutRecord
cards:
  - id: kinesis-data-streams-012
    q: What should a Kinesis Data Streams producer retry after a PutRecords request partially succeeds?
    a: Retry the failed entries rather than assuming the entire request succeeded.
    facts: [shard-batch-order]
  - id: kinesis-data-streams-020
    q: Are Kinesis Producer Library aggregation and collection enabled by default, and can they be configured separately?
    a: Both are enabled by default and can be configured independently.
    facts: [shard-kpl-collection]
  - id: kinesis-data-streams-008
    q: A Kinesis producer sends many tiny application records and reaches the shard record-rate limit
      before its byte limit. Which KPL feature helps?
    a: Aggregation. It packs multiple application records into one Kinesis record, reducing the number
      of service records written. Collection also reduces request overhead by using PutRecords.
    facts:
      - shard-kpl-aggregation
      - shard-kpl-collection
  - id: kinesis-data-streams-019
    q: A KCL application has three metadata tables. Does every KCL 3.5 application always require all
      three?
    a: No. KCL 3.5 supports consolidating metadata into one lease table. New migrations from 2.x use the
      single table format by default; existing 3.x applications must migrate.
    trap: true
    facts:
      - consumer-tables
      - consumer-single
  - id: kinesis-data-streams-024
    q: Which KCL metric shows how far a Kinesis consumer application lags behind the stream, to scale the consumer fleet?
    a: MillisBehindLatest.
    facts: [kcl-metrics]
revised:
  - date: 2026-11-23
    note: The producer card now tests batching defaults and configuration.
    cards: [kinesis-data-streams-020]
  - date: 2026-11-23
    note: The producer card now tests retries after partial success.
    cards: [kinesis-data-streams-012]
---
Kinesis Data Streams producer batching builds on shard routing. The write method and Kinesis Producer Library (KPL) batching settings affect ordering and producer throughput.

### How it works

1. KPL aggregation packs multiple application records into one Kinesis record, reducing the service-record rate and improving producer throughput.
2. KPL collection sends multiple Kinesis records in one `PutRecords` request. Aggregation and collection can be configured independently.
3. A `PutRecords` request can partially succeed. Check for failed entries and retry them; the operation does not guarantee record ordering.

### Exam cues

- If the question says many small application records reach the shard record-rate limit, think KPL aggregation, because it packs them into fewer Kinesis records.
- If the question says a `PutRecords` batch has failures, think retry failed entries, because other entries may have succeeded.

### Remember

- Aggregation combines application records; collection sends Kinesis records together using `PutRecords`.
- Both KPL batching features are enabled by default and can be configured independently.
- KCL 3.x keeps lease, worker metrics and coordinator state tables; KCL 3.5 supports one lease table.

> **Trap:** A `PutRecords` request can succeed for some entries and fail for others. A batch does not guarantee strict ordering, even when records are sent together.
