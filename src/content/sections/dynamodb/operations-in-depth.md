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
DynamoDB operations can involve table and index capacity, cached reads, and index projections. Understanding which resource or cache holds the data helps explain throttling, stale results, and extra reads.

### How it works

1. Compare [`WriteThrottleEvents` and `ReadThrottleEvents`](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/metrics-dimensions.html) to distinguish write and read throttling. For index metrics, use both `TableName` and `GlobalSecondaryIndexName`. An `IndexWriteProvisionedThroughputExceeded` reason can point to [GSI write back-pressure](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/throttling-provisioned-capacity-exceeded-mitigation.html) throttling base table writes.
2. Check the [capacity mode switch limit](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/provisioned-capacity-mode.html) before switching from provisioned to on-demand. The reverse switch is allowed at any time.
3. DAX keeps [`GetItem` and `BatchGetItem` results by primary key in an item cache](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.html). It stores `Query` and `Scan` result sets in a separate query cache. A cache time to live (TTL) sets how long a result remains cached. [Writes do not invalidate cached query results](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.consistency.html); they are read again after the query-cache TTL expires.
4. A [local secondary index (LSI)](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html) keeps the table partition key and uses another sort key. Choose its [projection](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html), the attributes copied into the index: `KEYS_ONLY` copies table and index keys, `INCLUDE` adds selected attributes, and `ALL` copies all attributes. An LSI query can fetch unprojected attributes from the table, with extra latency and read capacity cost.

### Exam cues

- If the question says a write consumer is falling behind, think `WriteThrottleEvents`, because it counts write throttles separately from read throttles.
- If the question says table writes throttle due to a GSI, think index write capacity, because back-pressure can affect base table writes.
- If the question says a query stays stale after an item update, think query-cache TTL, because writes do not invalidate cached query results.
- If the question says an LSI repeatedly fetches attributes from the table, think `INCLUDE` or `ALL`, because projecting those attributes can avoid the fetches.

### Remember

- A table can switch from provisioned to on-demand up to four times in a rolling 24-hour window; on-demand to provisioned is allowed at any time.
- DAX item-cache default TTL: five minutes.
- A table can have at most [five LSIs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ServiceQuotas.html), a fixed quota. LSIs must be created with the table.

> **Trap:** Updating an item does not refresh a cached DAX `Query` or `Scan` result. The query cache is separate from the item cache.
