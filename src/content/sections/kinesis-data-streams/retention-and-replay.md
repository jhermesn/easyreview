---
title: Retention and replay
level: associate
order: 20
facts:
  - id: replay-retention
    text: Kinesis Data Streams retention defaults to 24 hours, has a minimum of 24 hours, and can be
      increased up to 8760 hours or 365 days.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-extended-retention.html#kinesis-extended-retention
  - id: replay-cost
    text: Kinesis retention beyond 24 hours incurs additional charges.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-extended-retention.html#kinesis-extended-retention
  - id: replay-immutable
    text: After a record is written to Kinesis Data Streams, its contents and order within the stream
      cannot be modified.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecord.html#API_PutRecord
  - id: replay-independent
    text: Multiple applications can consume the same Kinesis stream independently and concurrently.
    source: https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html#enabled-application
  - id: replay-trim
    text: TRIM_HORIZON starts at the oldest record still retained in the shard.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_GetShardIterator.html#API_GetShardIterator_RequestParameters
  - id: replay-latest
    text: LATEST starts just after the most recent shard record and reads newly arriving records.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_GetShardIterator.html#API_GetShardIterator_RequestParameters
  - id: replay-time
    text: AT_TIMESTAMP starts from a specified timestamp; a timestamp older than retained data starts at
      the oldest retained record.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_GetShardIterator.html#API_GetShardIterator_RequestParameters
  - id: replay-sequence
    text: AT_SEQUENCE_NUMBER includes the specified sequence number; AFTER_SEQUENCE_NUMBER starts
      immediately after it.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_GetShardIterator.html#API_GetShardIterator_RequestParameters
  - id: replay-iterator
    text: A shard iterator is a read-position token that expires 5 minutes after creation; GetRecords
      returns NextShardIterator for the following read.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_GetShardIterator.html#API_GetShardIterator
  - id: replay-decrease
    text: Reducing retention makes records older than the new retention period inaccessible almost
      immediately.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-extended-retention.html#kinesis-extended-retention
  - id: replay-recover
    text: Retention must allow time for consumers to recover from processing bugs or downstream outages
      before records expire.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-extended-retention.html#kinesis-extended-retention
  - id: replay-adapter
    text: The DynamoDB Streams Kinesis Adapter directs KCL API calls to DynamoDB Streams; it does not
      change that source into Kinesis Data Streams.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.KCLAdapter.html#Streams.KCLAdapter
  - id: replay-ddb-retention
    text: DynamoDB Streams retains change records for 24 hours.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html#Streams
cards:
  - id: kinesis-data-streams-004
    q: What are the default, minimum, and maximum Kinesis Data Streams retention periods?
    a: "Default and minimum: 24 hours. Maximum: 8760 hours, or 365 days. Retention beyond 24 hours
      incurs additional charges."
    facts:
      - replay-retention
      - replay-cost
  - id: kinesis-data-streams-013
    q: A team fixes a Kinesis consumer bug and must replay all records still retained. Which iterator
      type should it request?
    a: TRIM_HORIZON. It starts at the oldest record still retained in each shard. LATEST reads new
      arrivals instead of the retained history.
    facts:
      - replay-trim
      - replay-latest
  - id: kinesis-data-streams-014
    q: A Kinesis consumer should ignore retained history and process only newly arriving records. Which
      iterator type fits?
    a: LATEST. It starts just after the most recent record. Use AT_TIMESTAMP or TRIM_HORIZON when
      retained history must be read.
    facts:
      - replay-latest
      - replay-time
      - replay-trim
  - id: kinesis-data-streams-015
    q: A team reduces Kinesis retention while a consumer is far behind. What happens to records older
      than the new window?
    a: They become inaccessible almost immediately. Size retention for recovery before shortening it.
    trap: true
    facts:
      - replay-decrease
      - replay-recover
  - id: kinesis-data-streams-016
    q: Can a Kinesis Data Streams consumer edit a stored record to correct a payload before replaying
      it?
    a: No. Written record contents and order are immutable. Replay rereads retained records; the
      consumer must handle the original data.
    trap: true
    facts:
      - replay-immutable
  - id: kinesis-data-streams-017
    q: Does the DynamoDB Streams Kinesis Adapter provide Kinesis Data Streams retention for DynamoDB
      change records?
    a: No. It directs KCL calls to DynamoDB Streams, whose retention is 24 hours. The adapter changes
      the interface used by the consumer, not the underlying source.
    trap: true
    facts:
      - replay-adapter
      - replay-ddb-retention
  - id: kinesis-data-streams-018
    q: A low-level Kinesis consumer needs to resume immediately after a known sequence number. Which
      iterator type should it use?
    a: AFTER_SEQUENCE_NUMBER. AT_SEQUENCE_NUMBER includes that record. Continue subsequent reads with
      NextShardIterator from GetRecords.
    facts:
      - replay-sequence
      - replay-iterator
---

Retention is how long Kinesis keeps a record available after it is written. Replay means reading retained records again from an earlier position. Separate consumer applications can read the same stream independently without changing the stored records.

### How it works

1. Choose retention long enough for a consumer to recover from bugs or a downstream outage. The default and minimum are 24 hours; the maximum is 365 days.
2. Keep in mind that a stored record is immutable: its bytes and order cannot be changed after writing.
3. Select a starting position for each shard. A shard iterator is the token that identifies that read position for the low-level API.
4. Call `GetRecords` and continue with its returned `NextShardIterator`. The iterator expires after 5 minutes, so it is a read token rather than long-term saved progress.
5. Replay while the required data is retained. Reducing retention can make older records inaccessible almost immediately.

| Iterator type | Starting point |
|---|---|
| `TRIM_HORIZON` | Oldest retained record |
| `LATEST` | Just after the most recent record |
| `AT_TIMESTAMP` | Specified time, bounded by retained data |
| `AT_SEQUENCE_NUMBER` | Includes the specified record |
| `AFTER_SEQUENCE_NUMBER` | Immediately after the specified record |

### Exam cues

- If the question says replay everything still available after a bug fix, think `TRIM_HORIZON`, because it starts at the oldest retained record.
- If the question says process only events arriving after the reader starts, think `LATEST`, because it skips the retained history.
- If the question says recover from an outage longer than the default window, think longer retention before records expire, because consumers can recover only while data remains accessible.
- If the question says a DynamoDB Streams Kinesis Adapter extends retention, think the original DynamoDB Streams source, because the adapter only redirects the consumer interface.

### Remember

- Kinesis retention: 24 hours by default and minimum; 8760 hours or 365 days maximum.
- Retention beyond 24 hours costs extra.
- Shard iterators expire after 5 minutes.
- `AT_TIMESTAMP` older than the retention boundary starts at the oldest retained record.
- DynamoDB Streams still retains change records for 24 hours when read through its Kinesis Adapter.

> **Trap:** Reducing retention can remove access to data immediately. A later replay position cannot recover records that are already outside the retention window.
