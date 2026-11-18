---
title: "PLACEHOLDER kinesis-data-streams/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
