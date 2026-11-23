---
title: "Operational diagnosis and cache behavior"
level: professional
order: 80
facts:
  - id: metrics
    text: "WriteThrottleEvents counts throttled write events; ReadThrottleEvents distinguishes read throttles, and index metrics use TableName with GlobalSecondaryIndexName."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/metrics-dimensions.html
  - id: gsi
    text: "Insufficient GSI write capacity can throttle base table writes through back-pressure, identified by IndexWriteProvisionedThroughputExceeded."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/throttling-provisioned-capacity-exceeded-mitigation.html
  - id: mode-switch
    text: "A table can switch from provisioned to on-demand up to four times in a rolling 24-hour window; switching from on-demand to provisioned is allowed at any time."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/provisioned-capacity-mode.html
  - id: topology
    text: "MRSC needs exactly three Regions, using three replicas or two replicas and a witness that cannot serve application reads or writes."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html
  - id: limits
    text: "MRSC does not support TTL, LSIs, or DynamoDB transaction operations."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html
  - id: mrec-streams
    text: "MREC replication reads changes from DynamoDB Streams, which are enabled by default on every replica and cannot be disabled there."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html#global-tables-streams
  - id: readers
    text: "DynamoDB Streams supports up to two simultaneous readers per shard; exceeding this can throttle reads."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/streamsmain.html
  - id: adapter
    text: "The DynamoDB Streams Kinesis Adapter lets Kinesis Client Library applications read DynamoDB Streams without changing the underlying service."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
  - id: kinesis
    text: "Kinesis Data Streams for DynamoDB is a separate change-capture option with retention up to one year and enhanced fan-out."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/streamsmain.html
  - id: lambda
    text: "AWS recommends at most two simultaneous Lambda functions per shard for single-Region tables and one for global tables."
    source: https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html
cards:
  - id: dynamodb-034
    q: "A DynamoDB write consumer is falling behind. Which metric distinguishes write throttling from read throttling?"
    a: "WriteThrottleEvents. Compare ReadThrottleEvents and inspect table/index dimensions and exception reasons to locate the affected resource."
    facts: [metrics, gsi]
  - id: dynamodb-050
    q: "A team switched a DynamoDB table from provisioned to on-demand and back several times today; the next switch to on-demand is rejected. Why?"
    a: "Provisioned-to-on-demand switches are limited to **four per rolling 24 hours**. Switching from on-demand to provisioned has no such limit."
    facts: [mode-switch]
  - id: dynamodb-030
    q: "A DynamoDB MRSC design needs only two full replicas. What else is required?"
    a: "A witness in a third Region. MRSC needs exactly three Regions; the witness cannot serve application reads or writes."
    facts: [topology]
  - id: dynamodb-031
    q: "Can a DynamoDB MRSC table use TTL, local secondary indexes, and transactions?"
    a: "No. MRSC does not support those features."
    trap: true
    facts: [limits]
  - id: dynamodb-041
    q: "A team wants to disable DynamoDB Streams on an MREC global table replica. Is that supported?"
    a: "No. MREC replication reads changes from DynamoDB Streams, which are enabled by default and cannot be disabled on its replicas."
    trap: true
    facts: [mrec-streams]
  - id: dynamodb-018
    q: "Several DynamoDB Streams consumers throttle on one shard. Does the Kinesis Adapter remove that limit?"
    a: "No. It still reads DynamoDB Streams. Reduce direct readers, distribute records downstream, or choose Kinesis Data Streams with enhanced fan-out."
    trap: true
    facts: [readers, adapter, kinesis]
  - id: dynamodb-020
    q: "How many simultaneous Lambda readers should a team plan per DynamoDB Streams shard?"
    a: "Up to two functions for a single-Region table; AWS recommends one for a global table to avoid throttling."
    facts: [lambda]
---
DynamoDB operations involve table and index capacity, global table configuration, and stream consumers.

### How it works

1. Compare `WriteThrottleEvents` and `ReadThrottleEvents` to distinguish write and read throttling. For index metrics, use both `TableName` and `GlobalSecondaryIndexName`. An `IndexWriteProvisionedThroughputExceeded` reason can point to GSI write back-pressure throttling base table writes.
2. Check the capacity mode switch limit before switching from provisioned to on-demand. The reverse switch is allowed at any time.

### Exam cues

- If the question says a write consumer is falling behind, think `WriteThrottleEvents`, because it counts write throttles separately from read throttles.
- If the question says table writes throttle due to a GSI, think index write capacity, because back-pressure can affect base table writes.

### Remember

- A table can switch from provisioned to on-demand up to four times in a rolling 24-hour window; on-demand to provisioned is allowed at any time.
- MRSC needs exactly three Regions: three replicas, or two replicas plus a witness that serves no application reads or writes.
- MRSC does not support TTL, local secondary indexes or transactions.
- MREC replication reads DynamoDB Streams, which stay enabled on every replica.
- DynamoDB Streams: plan at most two simultaneous readers per shard; the Kinesis Adapter changes the client interface, not those limits.

> **Trap:** A DynamoDB Streams Kinesis Adapter still reads DynamoDB Streams and does not remove its reader limits.
