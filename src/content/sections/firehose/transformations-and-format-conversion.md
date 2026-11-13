---
title: Transformations and format conversion
level: associate
order: 20
facts:
  - id: transform-lambda
    text: Firehose buffers source records, invokes Lambda synchronously, receives the transformed
      records, then applies destination buffering before delivery.
    source: https://docs.aws.amazon.com/firehose/latest/dev/data-transformation.html#data-transformation-flow
  - id: transform-limits
    text: Firehose transformation supports Lambda execution up to 5 minutes.
    source: https://docs.aws.amazon.com/firehose/latest/dev/data-transformation.html#data-transformation-execution-duration
  - id: transform-size
    text: The Lambda transformation buffer size hint is configurable from 0.2 to 3 MB.
    source: https://docs.aws.amazon.com/firehose/latest/dev/data-transformation.html#data-transformation-flow
  - id: transform-contract
    text: For Direct PUT and Kinesis Data Streams sources, every Lambda output record must preserve
      recordId and include result and base64-encoded data.
    source: https://docs.aws.amazon.com/firehose/latest/dev/data-transformation-status-model.html#data-transformation-status-model
  - id: transform-status
    text: The Lambda result values are Ok, Dropped, and ProcessingFailed; Firehose treats Ok and Dropped
      as successfully processed.
    source: https://docs.aws.amazon.com/firehose/latest/dev/data-transformation-status-model.html#data-transformation-status-model
  - id: transform-convert
    text: Firehose can convert JSON to Parquet or ORC before S3 delivery; non-JSON input can first be
      transformed to JSON with Lambda.
    source: https://docs.aws.amazon.com/firehose/latest/dev/record-format-conversion.html#record-format-conversion
  - id: transform-columns
    text: Parquet and ORC are columnar formats that organize data by columns and reduce storage and
      query work compared with row formats.
    source: https://docs.aws.amazon.com/firehose/latest/dev/record-format-conversion.html#record-format-conversion
  - id: transform-schema
    text: Firehose format conversion requires a JSON deserializer, a matching AWS Glue Data Catalog
      schema, and a Parquet or ORC serializer.
    source: https://docs.aws.amazon.com/firehose/latest/dev/record-format-conversion.html#record-format-conversion
  - id: transform-fields
    text: Fields absent from the Glue schema are absent from converted output; nested JSON requires
      matching STRUCT definitions.
    source: https://docs.aws.amazon.com/firehose/latest/dev/record-format-conversion.html#record-format-conversion-schema
  - id: transform-order
    text: Firehose S3 processing order is KPL deaggregation, JSON or delimiter deaggregation, Lambda
      processing, data partitioning, format conversion, then S3 delivery.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-destination.html#create-destination
  - id: transform-compression
    text: S3 compression is a separate Firehose destination setting with GZIP, Snappy, Zip,
      Hadoop-Compatible Snappy, or no compression options.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-destination.html#create-destination
  - id: transform-source-backup
    text: For supported sources, Firehose can back up source records to S3 when transformation or format
      conversion is configured for S3 delivery.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-configure-backup.html#create-configure-backup
  - id: transform-athena
    text: Athena can query data stored in S3 using SQL.
    source: https://docs.aws.amazon.com/athena/latest/ug/what-is.html#what-is
  - id: transform-payload
    text: Each Firehose synchronous Lambda transformation request and response has a 6 MB payload limit.
    source: https://docs.aws.amazon.com/firehose/latest/dev/data-transformation.html#data-transformation-flow
cards:
  - id: firehose-001
    q: Logs already flow through Firehose to S3 and need extra fields before delivery. How can the team
      keep the existing pipeline?
    a: Configure a Lambda transformation on the Firehose stream. Firehose invokes the function
      synchronously before destination delivery.
    facts:
      - transform-lambda
  - id: firehose-004
    q: How can Firehose reshape records before S3 or OpenSearch delivery and produce Parquet for an S3
      destination?
    a: Use a Lambda transformation to reshape the records. For S3, separately configure JSON-to-Parquet
      conversion with a matching Glue Data Catalog schema.
    facts:
      - transform-lambda
      - transform-convert
      - transform-schema
  - id: firehose-007
    q: Network logs need enrichment before an S3 archive is queried by Athena. Which Firehose feature
      fits?
    a: Use a Firehose Lambda transformation before S3 delivery. Athena can query the stored S3 data.
    facts:
      - transform-lambda
      - transform-athena
  - id: firehose-013
    q: CSV records arrive in Firehose and must become Parquet in S3. What processing order should the
      team use?
    a: Transform CSV to JSON with Lambda first, then enable JSON-to-Parquet conversion with a matching
      Glue schema. The built-in converter expects JSON.
    facts:
      - transform-convert
      - transform-schema
      - transform-order
  - id: firehose-014
    q: A Firehose Lambda transformation returns new recordId values for transformed records. What
      happens?
    a: Firehose treats the mismatch as transformation failure. Preserve each original recordId and
      return result and base64-encoded data.
    trap: true
    facts:
      - transform-contract
  - id: firehose-015
    q: A team only needs compressed S3 output from Firehose, without changing record fields. Must it
      deploy a Lambda transformation?
    a: No. Configure S3 compression in the destination settings. Compression is separate from Lambda
      transformation.
    facts:
      - transform-compression
  - id: firehose-016
    q: What do Ok, Dropped, and ProcessingFailed mean in a Firehose transformation response?
    a: Ok means transformed successfully, Dropped means intentionally discarded, and ProcessingFailed
      means transformation failed. Ok and Dropped count as successful processing.
    facts:
      - transform-status
diagrams:
  - id: firehose-transform-convert
    title: Transform content before S3 format conversion
    width: 1000
    height: 300
    nodes:
      - id: input
        label: Firehose input
        icon: data-firehose
        x: 20
        y: 100
        w: 160
        h: 72
        tone: integration
        info: Configured deaggregation separates combined records before Lambda transformation.
      - id: lambda
        label: Lambda
        icon: lambda
        x: 280
        y: 100
        w: 160
        h: 72
        tone: compute
        info: Transform records and return the original recordId, a result, and encoded data.
      - id: convert
        label: Firehose output
        icon: data-firehose
        x: 540
        y: 100
        w: 160
        h: 72
        tone: integration
        info: Configured partitioning precedes JSON conversion using the Glue schema.
      - id: s3
        label: S3 objects
        icon: res-simple-storage-service-bucket
        x: 800
        y: 100
        w: 160
        h: 72
        tone: storage
        info: Firehose delivers the converted records after destination buffering.
    edges:
      - from: input
        to: lambda
        label: invoke
        step: 1
      - from: lambda
        to: convert
        label: return
        step: 2
      - from: convert
        to: s3
        label: deliver
        step: 3
    steps:
      - Firehose invokes Lambda with buffered source records.
      - Lambda returns transformed records; Firehose partitions and converts them when configured.
      - Firehose delivers the converted output to S3.
---

Firehose transformation changes record content before delivery. Format conversion changes JSON into Parquet or ORC for S3. These columnar formats group values by column to reduce storage and query work. Compression is a separate destination setting that reduces the stored representation.

### How it works

1. Firehose separates aggregated records, meaning records combined by a producer. When configured, Kinesis Producer Library deaggregation runs before JSON or delimiter deaggregation.
2. Firehose buffers the source records and invokes Lambda synchronously, meaning it waits for the response. Lambda can enrich records or change CSV input into JSON.
3. For Direct PUT or Kinesis Data Streams sources, return each original `recordId`, a `result`, and base64-encoded `data`. Base64 is the text encoding used to carry the record bytes in the response.
4. If configured, partition data into S3 destination prefixes, then convert JSON to Parquet or ORC. Conversion uses a deserializer to read JSON, a schema describing fields and types in the Glue Data Catalog, and a serializer to write the output format.
5. Firehose applies destination buffering before S3 delivery. Configure S3 compression separately and enable source record backup when the original input must also be kept.

| Lambda result | Meaning | Firehose treatment |
|---|---|---|
| `Ok` | Transformed successfully | Successful processing |
| `Dropped` | Intentionally discarded | Successful processing |
| `ProcessingFailed` | Could not transform | Unsuccessful processing |

### Exam cues

- If the question says enrich records in an existing Firehose pipeline, think Lambda transformation, because Firehose invokes it before delivery.
- If the question says CSV input must become Parquet, think Lambda to JSON followed by format conversion, because the built-in converter reads JSON.
- If the question says output fields disappeared after conversion, think Glue schema, because output excludes fields absent from that schema.
- If the question says compress S3 output without changing fields, think the S3 compression setting, because that feature does not require a Lambda transformation.

### Remember

- Transformation Lambda execution: up to 5 minutes.
- Synchronous transformation payload: up to 6 MB for each request and response.
- Lambda transformation buffer size hint: 0.2 to 3 MB.
- Conversion order: Lambda, data partitioning, format conversion, S3 delivery.
- S3 compression options include GZIP, Snappy, Zip, Hadoop-Compatible Snappy, and none.

> **Trap:** Changing `recordId` breaks the Firehose transformation contract. Keep the original identifier even when the record data changes.
