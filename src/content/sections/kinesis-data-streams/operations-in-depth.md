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

> **Trap:** A `PutRecords` request can succeed for some entries and fail for others. A batch does not guarantee strict ordering, even when records are sent together. [Source](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html#API_PutRecords)
