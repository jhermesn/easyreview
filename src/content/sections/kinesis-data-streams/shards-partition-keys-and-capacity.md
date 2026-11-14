---
title: Shards, partition keys, and capacity
level: associate
order: 10
facts:
  - id: shard-record
    text: A Kinesis data stream contains shards; a record contains a partition key, assigned sequence
      number, and data bytes.
    source: https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html#data-record
  - id: shard-hash
    text: Kinesis uses an MD5 hash of the partition key to map records to a shard hash range; the same
      key maps to the same shard unless explicitly overridden.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html#API_PutRecords
  - id: shard-write
    text: A shard supports sustained writes up to 1 MB per second; intermittent large records use burst
      capacity.
    source: https://docs.aws.amazon.com/streams/latest/dev/large-records.html#how-large-records-work
  - id: shard-read
    text: Shared GetRecords consumers collectively have 2 MB per second per shard and up to 5 read
      transactions per second.
    source: https://docs.aws.amazon.com/streams/latest/dev/service-sizes-and-limits.html#service-sizes-and-limits
  - id: shard-order
    text: For strict write ordering, write PutRecord calls serially to one shard and use
      SequenceNumberForOrdering; sequence numbers do not establish order across shards.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecord.html#API_PutRecord
  - id: shard-batch-order
    text: PutRecords can partially succeed and does not guarantee record ordering; retry failed entries
      rather than assuming the whole request succeeded.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html#API_PutRecords
  - id: shard-hot
    text: On-demand streams can still throttle when one partition key exceeds the shard limit; spreading
      traffic across keys avoids concentrating it on one shard.
    source: https://docs.aws.amazon.com/streams/latest/dev/how-do-i-size-a-stream.html#ondemandmode
  - id: shard-provisioned
    text: Provisioned mode requires a chosen shard count and charges by shard-hour.
    source: https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html#stream-capacity-mode
  - id: shard-standard
    text: On-demand Standard automatically manages shard capacity and suits variable, unpredictable
      traffic.
    source: https://docs.aws.amazon.com/streams/latest/dev/how-do-i-size-a-stream.html#ondemandmode
  - id: shard-advantage
    text: On-demand Advantage is an account-level setting for on-demand streams and supports proactively
      warming write capacity.
    source: https://docs.aws.amazon.com/streams/latest/dev/how-do-i-size-a-stream.html#how-do-i-size-a-stream
  - id: shard-initial
    text: New on-demand streams start with 4 MB per second write and 8 MB per second read throughput.
    source: https://docs.aws.amazon.com/streams/latest/dev/service-sizes-and-limits.html#service-sizes-and-limits
  - id: shard-spike
    text: On-demand accommodates up to twice the prior 30-day peak write throughput; increases beyond
      twice that peak within 15 minutes can throttle.
    source: https://docs.aws.amazon.com/streams/latest/dev/how-do-i-size-a-stream.html#ondemandmode
  - id: shard-record-limit
    text: The default maximum record size is 1 MiB; the stream setting can be increased up to 10 MiB in
      supported Regions.
    source: https://docs.aws.amazon.com/streams/latest/dev/large-records.html#large-records
  - id: shard-record-config
    text: UpdateMaxRecordSize accepts MaxRecordSizeInKiB values from 1024 to 10240 KiB, equivalent to 1
      to 10 MiB.
    source: https://docs.aws.amazon.com/kinesis/latest/APIReference/API_UpdateMaxRecordSize.html#API_UpdateMaxRecordSize_RequestParameters
  - id: shard-large-date
    text: AWS announced support for record sizes up to 10 MiB in October 2025.
    source: https://aws.amazon.com/blogs/big-data/amazon-kinesis-data-streams-now-supports-10x-larger-record-sizes-simplifying-real-time-data-processing/
  - id: shard-kpl-aggregation
    text: KPL aggregation combines multiple application records into one Kinesis record to reduce the
      service-record rate and improve producer throughput.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-kpl-concepts.html#kinesis-kpl-concepts-aggretation
  - id: shard-kpl-collection
    text: KPL collection uses PutRecords to send multiple Kinesis records in one request; aggregation
      and collection are independently configurable and enabled by default.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-kpl-concepts.html#kinesis-kpl-concepts-batching
  - id: shard-encryption
    text: Kinesis Data Streams supports server-side encryption of stored data with AWS KMS keys.
    source: https://docs.aws.amazon.com/streams/latest/dev/server-side-encryption.html#server-side-encryption
  - id: shard-tls
    text: Kinesis API clients must support TLS 1.2; AWS recommends TLS 1.3 for connections.
    source: https://docs.aws.amazon.com/streams/latest/dev/infrastructure-security.html#infrastructure-security
  - id: shard-compatibility
    text: Increasing the Kinesis maximum record size requires checking downstream limits; Firehose
      supports large-record S3 delivery but not dynamic partitioning, HTTP, Snowflake, or Redshift
      delivery.
    source: https://docs.aws.amazon.com/streams/latest/dev/large-records.html#record-compatability
  - id: shard-record-rate
    text: A shard supports writes of up to 1000 Kinesis service records per second.
    source: https://docs.aws.amazon.com/streams/latest/dev/service-sizes-and-limits.html#service-sizes-and-limits
  - id: shard-resharding
    text: Resharding splits or merges shards to change provisioned stream capacity.
    source: https://docs.aws.amazon.com/streams/latest/dev/kinesis-using-sdk-java-resharding.html#kinesis-using-sdk-java-resharding
  - id: real-time
    text: Amazon Kinesis Data Streams collects and processes large streams of data records in real time.
    source: https://docs.aws.amazon.com/streams/latest/dev/introduction.html
cards:
  - id: kinesis-data-streams-001
    q: What sustained write and shared-read capacity does one Kinesis Data Streams shard provide?
    a: "Writes: 1 MB/s or 1000 records/s. Shared reads: 2 MB/s with up to 5 GetRecords calls/s.
      Large-record burst support does not raise the sustained rate."
    facts:
      - shard-write
      - shard-read
      - shard-record-rate
  - id: kinesis-data-streams-002
    q: How does Kinesis Data Streams choose a shard, and how should a producer preserve strict write
      order?
    a: By default it hashes the partition key with MD5 into a shard hash range. For strict ordering,
      make serial PutRecord calls to the same shard with SequenceNumberForOrdering. There is no
      stream-wide shard order.
    facts:
      - shard-hash
      - shard-order
  - id: kinesis-data-streams-003
    q: A Kinesis Data Streams stream throttles writes while most shards are idle. What should the team
      investigate?
    a: A hot partition key can overload one shard. Distribute records across more keys; on-demand
      capacity or extra shards does not remove a single key hotspot.
    trap: true
    facts:
      - shard-hot
      - shard-hash
  - id: kinesis-data-streams-005
    q: How do Kinesis Data Streams Provisioned and On-demand Standard capacity modes differ?
    a: Provisioned requires choosing and managing shard capacity and charges by shard-hour. On-demand
      Standard manages shards automatically and suits unpredictable traffic.
    facts:
      - shard-provisioned
      - shard-standard
  - id: kinesis-data-streams-008
    q: A Kinesis producer sends many tiny application records and reaches the shard record-rate limit
      before its byte limit. Which KPL feature helps?
    a: Aggregation. It packs multiple application records into one Kinesis record, reducing the number
      of service records written. Collection also reduces request overhead by using PutRecords.
    facts:
      - shard-kpl-aggregation
      - shard-kpl-collection
  - id: kinesis-data-streams-009
    q: A Kinesis application needs occasional 4 MiB records. Is the default stream setting enough, and
      does enabling large records raise sustained shard throughput?
    a: Raise the maximum record-size setting from its 1 MiB default, up to 10 MiB in supported Regions.
      Large records use burst capacity; sustained shard limits remain unchanged. Check downstream
      compatibility.
    trap: true
    facts:
      - shard-record-limit
      - shard-write
      - shard-compatibility
  - id: kinesis-data-streams-010
    q: An on-demand Kinesis stream receives more than twice its recent peak within 15 minutes and
      throttles. Can on-demand scaling eliminate this case?
    a: No. On-demand accommodates up to twice the previous 30-day peak; faster increases can throttle
      and require retries.
    trap: true
    facts:
      - shard-spike
  - id: kinesis-data-streams-011
    q: What protects Kinesis Data Streams data at rest and in transit?
    a: Use server-side encryption with AWS KMS keys for stored data. Kinesis API connections require TLS
      1.2 and AWS recommends TLS 1.3.
    facts:
      - shard-encryption
      - shard-tls
  - id: kinesis-data-streams-012
    q: Does Kinesis PutRecords guarantee strict ordering when some records in the batch fail?
    a: No. PutRecords can partially succeed and does not guarantee ordering. Use serial PutRecord writes
      to the same shard with SequenceNumberForOrdering when strict ordering is required.
    trap: true
    facts:
      - shard-batch-order
      - shard-order
  - id: kinesis-data-streams-023
    q: A company must ingest and process website clickstream data in real time. Which AWS service fits?
    a: Amazon Kinesis Data Streams.
    facts: [real-time]
diagrams:
  - id: kinesis-partition-routing
    title: Partition keys distribute records among shards
    width: 650
    height: 360
    nodes:
      - id: producer
        label: Producer
        icon: res-generic-application
        x: 40
        y: 130
        w: 160
        h: 72
        tone: user
        info: Each record carries a partition key. Its MD5 hash maps it to a shard.
      - id: a
        label: Shard A
        icon: kinesis-data-streams
        x: 390
        y: 30
        w: 160
        h: 72
        tone: integration
        info: Records whose key hashes into this range use this shard and its capacity.
      - id: b
        label: Shard B
        icon: kinesis-data-streams
        x: 390
        y: 230
        w: 160
        h: 72
        tone: integration
        info: A different hash range can use a different shard. There is no order across shards.
    edges:
      - from: producer
        to: a
        label: hash range A
        step: 1
      - from: producer
        to: b
        label: hash range B
        step: 2
    steps:
      - A partition key hash selects shard A when it falls in that range.
      - A hash in another range selects shard B; one hot key stays on its mapped shard.
---

Kinesis Data Streams stores records for applications to process independently. A shard is an ordered lane of records with its own capacity. The partition key is the producer's grouping value that normally decides which lane receives a record.

### How it works

1. A producer sends record bytes with a partition key. Kinesis hashes that key using MD5, a function that maps it to a number, and chooses the shard whose hash range contains it.
2. Distribute traffic across keys. A hot key, meaning one key carrying too much traffic, can throttle its shard even while other shards have room.
3. Choose capacity management. Provisioned mode requires a shard count; on-demand manages shards automatically. On-demand can still throttle on a hot key or a sudden increase beyond its scaling envelope.
4. For strict write order, send `PutRecord` calls serially to the same shard with `SequenceNumberForOrdering`. `PutRecords` batches improve request efficiency but can partially fail and do not guarantee ordering.
5. Use Kinesis Producer Library, or KPL, aggregation to combine small application records into one service record. Collection sends multiple service records through `PutRecords`; both features are enabled by default.
6. Choose a maximum record size that downstream consumers can handle. Protect stored data with KMS server-side encryption and API connections with Transport Layer Security, or TLS, which encrypts data in transit.

| Mode | Capacity responsibility | Cue |
|---|---|---|
| Provisioned | Choose shard count; split or merge shards | Manage known capacity explicitly |
| On-demand Standard | Kinesis manages shards | Variable, unpredictable traffic |
| On-demand Advantage | Account-level setting for on-demand streams | Proactively warm write capacity |

### Exam cues

- If the question says most shards are idle but writes throttle, think hot partition key, because the same key maps to one shard.
- If the question says many tiny records hit the record-rate limit, think KPL aggregation, because multiple application records become one service record.
- If the question says strict write order matters, think serial `PutRecord` calls and `SequenceNumberForOrdering`, because `PutRecords` does not guarantee ordering.
- If the question says unpredictable traffic with no shard management, think On-demand Standard, because it automatically manages capacity.

### Remember

- Sustained shard writes: 1 MB/s or 1,000 service records/s. Shared reads: 2 MB/s and 5 `GetRecords` calls/s.
- New on-demand stream: 4 MB/s writes and 8 MB/s reads.
- On-demand supports twice the prior 30-day peak; exceeding that within 15 minutes can throttle.
- October 2025: AWS introduced records up to 10 MiB. The default maximum remains 1 MiB; `UpdateMaxRecordSize` accepts 1024 to 10240 KiB.
- Large records use intermittent burst capacity. Check Region support and downstream limits, including Firehose destination restrictions.
- API connections require TLS 1.2; AWS recommends TLS 1.3.

> **Trap:** A larger allowed record does not create a higher sustained shard write rate. Separate the per-record size setting from sustained capacity and from producer batching.
