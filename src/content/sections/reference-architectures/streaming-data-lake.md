---
title: Streaming ingestion into an S3 data lake
level: associate
order: 50
facts:
  - id: kds
    text: Kinesis Data Streams collects and processes large streams of data records in real time, such as logs, clickstreams and business events, for consumer applications to read.
    source: https://docs.aws.amazon.com/streams/latest/dev/introduction.html
  - id: firehose-source
    text: A Firehose stream can use a Kinesis data stream as its source.
    source: https://docs.aws.amazon.com/firehose/latest/dev/writing-with-kinesis-streams.html
  - id: parquet
    text: Data Firehose can convert JSON input to Apache Parquet or Apache ORC before writing to S3, using a schema from the AWS Glue Data Catalog; columnar formats save space and speed up queries.
    source: https://docs.aws.amazon.com/firehose/latest/dev/record-format-conversion.html
  - id: crawler
    text: An AWS Glue crawler populates the Glue Data Catalog by creating or updating tables for the data stores it crawls.
    source: https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html
  - id: athena
    text: Athena runs standard SQL directly on data in S3; it is serverless, so you pay only for the queries you run.
    source: https://docs.aws.amazon.com/athena/latest/ug/what-is.html
  - id: lake-formation
    text: Lake Formation adds a permissions model on top of IAM for fine-grained access to data lake data in S3 and its metadata in the Glue Data Catalog.
    source: https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html
  - id: spectrum
    text: Redshift Spectrum queries data directly from files in S3.
    source: https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html#c-getting-started-using-spectrum
  - id: quick-sources
    text: Quick Sight can use Athena, Redshift, OpenSearch Service and S3 as data sources for dashboards.
    source: https://docs.aws.amazon.com/quick/latest/userguide/supported-data-sources.html#relational-data-sources
  - id: kms-stream
    text: Kinesis Data Streams supports server-side encryption of stored data with AWS KMS keys.
    source: https://docs.aws.amazon.com/streams/latest/dev/server-side-encryption.html#server-side-encryption
  - id: kms-athena
    text: Reading a KMS-encrypted S3 dataset requires kms:Decrypt permission in addition to Athena and S3 access.
    source: https://docs.aws.amazon.com/athena/latest/ug/encryption.html#permissions-for-encrypting-and-decrypting-data
  - id: esm-batches
    text: A Lambda event source mapping reads queue or stream records and invokes a function with a batch.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html#invocation-eventsourcemapping
  - id: buffer-trigger
    text: The first configured destination buffer condition met, size or interval, triggers Firehose delivery.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-configure-backup.html#buffering-hints
  - id: direct-put
    text: Direct PUT sends application records to Firehose through PutRecord or PutRecordBatch.
    source: https://docs.aws.amazon.com/firehose/latest/dev/writing-with-sdk.html#writing-with-sdk
  - id: conversion-errors
    text: Format conversion parse errors write failed records to an S3 error prefix; if that write fails, Firehose retries it indefinitely and blocks further delivery.
    source: https://docs.aws.amazon.com/firehose/latest/dev/record-format-conversion-error-handling.html#record-format-conversion-error-handling
  - id: stream-retry
    text: For an S3 destination with Kinesis Data Streams or MSK sources, failed delivery retries are bounded by the source stream retention policy.
    source: https://docs.aws.amazon.com/firehose/latest/dev/retry.html#dd-retry-s3
  - id: lifecycle
    text: S3 Lifecycle can transition or expire stored objects, with separate actions for noncurrent versions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-rules.html#intro-lifecycle-rules-actions
diagrams:
  - id: streaming-data-lake
    title: Events streamed into an encrypted S3 data lake and queried in place
    width: 1240
    height: 700
    groups:
      - { label: Region, x: 210, y: 20, w: 1010, h: 660, tone: neutral, icon: group-region }
    nodes:
      - { id: apps, label: Apps, sub: events and logs, x: 20, y: 300, w: 150, h: 86, tone: user, icon: res-client }
      - { id: kms, label: KMS key, sub: encryption at rest, x: 240, y: 80, w: 180, h: 86, tone: security, icon: key-management-service, info: "Encrypts the stream and the bucket. Readers need kms:Decrypt as well as Athena and S3 access." }
      - { id: kds, label: Kinesis Data Streams, sub: real-time stream, x: 240, y: 300, w: 180, h: 86, tone: integration, icon: kinesis-data-streams, info: "Several consumers can read the same records. Retention bounds how long Firehose can retry." }
      - { id: lambda, label: Lambda, sub: real-time consumer, x: 240, y: 540, w: 180, h: 86, tone: compute, icon: lambda, info: "An event source mapping reads the stream and invokes the function with batches of records." }
      - { id: fh, label: Data Firehose, sub: to Parquet, x: 470, y: 300, w: 150, h: 86, tone: integration, icon: data-firehose, info: "Buffers records until the size or interval hint is met, converts JSON to Parquet with a Glue schema and writes to S3." }
      - { id: err, label: Error prefix, sub: failed records, x: 680, y: 80, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: s3, label: S3 data lake, sub: partitioned Parquet, x: 680, y: 300, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: archive, label: Archive class, sub: lifecycle rule, x: 1040, y: 80, w: 170, h: 86, tone: storage, icon: res-simple-storage-service-bucket, info: "A lifecycle rule moves old raw data to a cheaper storage class or expires it." }
      - { id: lf, label: Lake Formation, sub: fine-grained access, x: 470, y: 540, w: 180, h: 86, tone: security, icon: lake-formation, info: "Grants table, column and row access to analysts instead of broad S3 bucket permissions." }
      - { id: glue, label: Glue, sub: "crawler, Data Catalog", x: 680, y: 540, w: 160, h: 86, tone: integration, icon: glue, info: "The crawler keeps tables and partitions in the Data Catalog up to date." }
      - { id: athena, label: Athena, sub: serverless SQL, x: 900, y: 300, w: 150, h: 86, tone: integration, icon: athena }
      - { id: quick, label: Quick Sight, sub: dashboards, x: 1070, y: 300, w: 140, h: 86, tone: integration, icon: quick }
      - { id: rs, label: Redshift, sub: Spectrum, x: 900, y: 540, w: 160, h: 86, tone: database, icon: redshift, info: "Joins warehouse tables with data that stays in S3." }
    edges:
      - { from: kms, to: kds, step: 1 }
      - { from: kms, to: s3, step: 1 }
      - { from: lf, to: glue, step: 2 }
      - { from: apps, to: kds, step: 3 }
      - { from: kds, to: lambda, step: 4 }
      - { from: kds, to: fh, step: 5 }
      - { from: fh, to: glue, step: 5 }
      - { from: fh, to: s3, step: 5 }
      - { from: glue, to: s3, step: 6 }
      - { from: athena, to: s3, step: 7 }
      - { from: quick, to: athena, step: 7 }
      - { from: rs, to: s3, step: 8 }
      - { from: s3, to: archive, step: 9 }
      - { from: fh, to: err, step: 10, dashed: true }
    steps:
      - "A KMS key encrypts the stream and the data lake bucket at rest."
      - "Lake Formation grants analysts fine-grained access to catalog tables instead of broad bucket permissions."
      - "Applications send events and logs to the Kinesis data stream."
      - "A Lambda function reads the stream through an event source mapping and reacts to each batch within seconds."
      - "Data Firehose reads the same stream, buffers records, converts JSON to Parquet with a schema from the Glue Data Catalog, and writes to S3."
      - "A Glue crawler keeps the Data Catalog tables and partitions for the lake current."
      - "Athena runs SQL on the Parquet files in place, and Quick Sight builds dashboards on Athena queries."
      - "Redshift Spectrum lets the warehouse query the same S3 data without loading it."
      - "An S3 Lifecycle rule moves old raw data to a cheaper storage class or expires it."
      - "Records that fail format conversion go to an error prefix in S3. If delivery to S3 fails, Firehose retries for as long as the stream keeps the records."
cards:
  - id: reference-architectures-027
    q: Clickstream JSON arrives through a Kinesis data stream and must land in S3 in a format that makes Athena queries cheaper and faster, with no code to write. Which design fits?
    a: "A **Data Firehose** stream reading the Kinesis stream, with **record format conversion to Parquet** using a Glue Data Catalog schema."
    facts: [firehose-source, parquet]
  - id: reference-architectures-028
    q: Analysts need ad hoc SQL on terabytes of log files in S3 without loading them into a database or managing servers. Which service fits?
    a: "**Amazon Athena**: standard SQL directly on S3, serverless, paid per query."
    facts: [athena]
  - id: reference-architectures-029
    q: New partitions and files keep arriving in an S3 data lake, and Athena tables must stay current without manual DDL. What keeps the catalog up to date?
    a: "An **AWS Glue crawler**, which creates and updates Data Catalog tables for the data it crawls."
    facts: [crawler]
  - id: reference-architectures-030
    q: Different analyst teams may see only certain columns of data lake tables in S3. Which service manages that access centrally?
    a: "**AWS Lake Formation**, whose permissions add fine-grained access on top of IAM for S3 data and Glue Data Catalog tables."
    facts: [lake-formation]
  - id: reference-architectures-031
    q: A Redshift warehouse must join its tables with years of historical data kept in S3, without loading that data. Which feature fits?
    a: "**Redshift Spectrum**, which queries files in S3 directly."
    facts: [spectrum]
  - id: reference-architectures-032
    q: Business users need dashboards over data lake queries that already run in Athena. Which service fits?
    a: "**Quick Sight**, with Athena as its data source."
    facts: [quick-sources]
  - id: reference-architectures-084
    q: Each clickstream event must trigger a fraud check within seconds, and the same events must also land in S3 for analytics. Which design fits?
    a: "A **Kinesis data stream** with two consumers: **Lambda** through an event source mapping for the real-time check, and **Data Firehose** for delivery to S3."
    facts: [kds, esm-batches, firehose-source]
  - id: reference-architectures-085
    q: A team plans to run per-event alerts from Data Firehose because it already reads the stream. Why is that a poor fit?
    a: "Firehose **buffers** records and delivers when the size or interval hint is met, so it suits loading data, not reacting to each event. Use a stream consumer such as Lambda."
    trap: true
    facts: [buffer-trigger, esm-batches]
  - id: reference-architectures-086
    q: Logs only need to reach S3 as Parquet; nothing reads them in real time. What is the simplest ingestion?
    a: "Send records straight to **Data Firehose** with **Direct PUT** (PutRecord or PutRecordBatch). A Kinesis data stream is not needed."
    facts: [direct-put, parquet]
  - id: reference-architectures-087
    q: Some JSON records fail Parquet conversion in Firehose. What happens to them?
    a: "Firehose writes them to an **S3 error prefix**. If that write fails too, it retries indefinitely and blocks further delivery."
    trap: true
    facts: [conversion-errors]
  - id: reference-architectures-088
    q: Analysts with Athena and S3 permissions get access denied when querying a data lake encrypted with a KMS customer managed key. What is missing?
    a: "**kms:Decrypt** permission on the key used to encrypt the data."
    trap: true
    facts: [kms-athena]
  - id: reference-architectures-089
    q: Raw event files older than 90 days are rarely queried but must be kept cheaply. What handles that automatically?
    a: "An **S3 Lifecycle** rule that transitions them to a cheaper storage class, or expires them when no longer needed."
    facts: [lifecycle]
---
Analytics questions describe events or logs that arrive continuously and must be queryable cheaply, often by several teams with different access. The answer is a data lake: stream into S3 in a columnar format, catalog it once, and query it in place with serverless engines.

### How it works

1. Applications write events to a Kinesis data stream, which real-time consumers can also read.
2. Data Firehose reads the stream, converts JSON to Parquet with a Glue Data Catalog schema, and writes to S3. [Record format conversion](https://docs.aws.amazon.com/firehose/latest/dev/record-format-conversion.html)
3. A Glue crawler keeps catalog tables current; Lake Formation controls who can see which tables and columns.
4. A Lambda function reads the same stream for per-event processing, because Firehose buffers before delivering.
5. Athena queries the files in place, Quick Sight draws dashboards on it, and Redshift Spectrum joins the same data with warehouse tables.
6. A KMS key encrypts the stream and the bucket; S3 Lifecycle moves old data to cheaper storage; failed records go to an error prefix.

| Need | Service |
|---|---|
| Real-time stream with several consumers | Kinesis Data Streams |
| Load into S3 with no code, convert formats | Data Firehose |
| Schema and tables for the lake | Glue Data Catalog and crawlers |
| Fine-grained access to tables and columns | Lake Formation |
| Ad hoc SQL, pay per query | Athena |
| Warehouse joins with lake data | Redshift Spectrum |
| Dashboards | Quick Sight |
| React to each event within seconds | Lambda reading the stream |
| Only load into S3, no real-time readers | Direct PUT to Firehose, no stream |
| Keep old data cheaply | S3 Lifecycle transitions |

### Exam cues

- If the question says load streaming data into S3 with the least code, think Data Firehose, because it buffers, converts and delivers for you.
- If the question says cheaper and faster Athena queries, think Parquet or ORC, because columnar formats read less data.
- If the question says query S3 with SQL and no servers, think Athena.
- If the question says column-level access for analysts on a data lake, think Lake Formation.
- If the question says the warehouse must query data left in S3, think Redshift Spectrum.
- If the question says process each event within seconds, think a Lambda or other consumer on Kinesis Data Streams, because Firehose buffers.

### Remember

- Firehose can read from a Kinesis data stream and convert JSON to Parquet or ORC.
- Crawlers create and update Data Catalog tables.
- Athena: serverless, pay per query.
- Failed format conversions land in an S3 error prefix.
- KMS-encrypted lake: readers need kms:Decrypt.

> **Trap:** Loading the lake into a database before analysts can query it adds cost and delay. Athena and Redshift Spectrum query the files where they are.
