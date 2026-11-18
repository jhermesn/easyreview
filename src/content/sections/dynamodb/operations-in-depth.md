---
title: "PLACEHOLDER dynamodb/operations-in-depth"
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
  - id: query
    text: "The query cache stores Query and Scan result sets separately from the item cache."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.html
  - id: freshness
    text: "Item or table writes do not invalidate cached query results; new query results are read after the cached result TTL expires."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.consistency.html
  - id: item
    text: "The item cache stores GetItem and BatchGetItem results by primary key with a default TTL of five minutes."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.html
  - id: projection
    text: "KEYS_ONLY projects table/index keys, INCLUDE adds chosen attributes, and ALL projects all attributes."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html
  - id: fetch
    text: "An LSI query can fetch unprojected attributes from the table at extra latency and read capacity cost."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html
  - id: lsi-limit
    text: "A DynamoDB table can have at most five local secondary indexes, and this quota cannot be increased."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ServiceQuotas.html
  - id: lsi
    text: "An LSI keeps the table partition key, changes the sort key, is created with the table, and supports eventual or strong reads."
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html
cards:
  - id: dynamodb-034
    q: "A DynamoDB write consumer is falling behind. Which metric distinguishes write throttling from read throttling?"
    a: "WriteThrottleEvents. Compare ReadThrottleEvents and inspect table/index dimensions and exception reasons to locate the affected resource."
    facts: [metrics, gsi]
  - id: dynamodb-050
    q: "A team switched a DynamoDB table from provisioned to on-demand and back several times today; the next switch to on-demand is rejected. Why?"
    a: "Provisioned-to-on-demand switches are limited to **four per rolling 24 hours**. Switching from on-demand to provisioned has no such limit."
    facts: [mode-switch]
  - id: dynamodb-037
    q: "An application updates a DynamoDB item through DAX but an identical Query still returns an old result. Why?"
    a: "The query cache is separate. Item writes do not invalidate Query or Scan results; the cached query must expire."
    trap: true
    facts: [query, freshness]
  - id: dynamodb-039
    q: "What keys and default expiration does the DAX item cache use?"
    a: "Primary keys for GetItem and BatchGetItem results, with a five-minute default item-cache TTL."
    facts: [item]
  - id: dynamodb-014
    q: "A DynamoDB LSI query repeatedly fetches extra attributes from the table. How can the team reduce those reads?"
    a: "Project required attributes with INCLUDE or ALL. This trades index storage for fewer base table fetches."
    facts: [projection, fetch]
  - id: dynamodb-054
    q: "How many local secondary indexes can a DynamoDB table have?"
    a: "**Five**, a fixed quota. LSIs are also created only with the table."
    facts: [lsi-limit, lsi]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
