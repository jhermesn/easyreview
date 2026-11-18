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
diagrams:
  - id: streaming-data-lake
    title: Events streamed into an S3 data lake and queried in place
    width: 1240
    height: 640
    nodes:
      - { id: apps, label: Apps, sub: events and logs, x: 20, y: 260, w: 150, h: 86, tone: user, icon: res-client }
      - { id: kds, label: Kinesis Data Streams, sub: real-time stream, x: 210, y: 260, w: 180, h: 86, tone: integration, icon: kinesis-data-streams, info: "Other consumers, such as Lambda, can read the same stream in real time." }
      - { id: fh, label: Data Firehose, sub: to Parquet, x: 440, y: 260, w: 150, h: 86, tone: integration, icon: data-firehose, info: "Buffers records, converts JSON to **Parquet** with a Glue schema and writes to S3." }
      - { id: s3, label: S3 data lake, sub: partitioned Parquet, x: 640, y: 260, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: glue, label: Glue, sub: "crawler, Data Catalog", x: 640, y: 500, w: 160, h: 86, tone: integration, icon: glue, info: "The crawler keeps tables and partitions in the Data Catalog up to date." }
      - { id: lf, label: Lake Formation, sub: fine-grained access, x: 400, y: 500, w: 180, h: 86, tone: security, icon: lake-formation, info: "Grants table, column and row access to analysts instead of broad S3 bucket permissions." }
      - { id: athena, label: Athena, sub: serverless SQL, x: 860, y: 120, w: 150, h: 86, tone: integration, icon: athena }
      - { id: quick, label: Quick Sight, sub: dashboards, x: 1060, y: 120, w: 160, h: 86, tone: integration, icon: quick }
      - { id: rs, label: Redshift, sub: Spectrum, x: 860, y: 420, w: 160, h: 86, tone: database, icon: redshift, info: "Joins warehouse tables with data that stays in S3." }
    edges:
      - { from: apps, to: kds, step: 1 }
      - { from: kds, to: fh, step: 2 }
      - { from: fh, to: s3, step: 2 }
      - { from: fh, to: glue, step: 2, dashed: true }
      - { from: glue, to: s3, step: 3 }
      - { from: lf, to: glue, step: 4 }
      - { from: athena, to: s3, step: 5 }
      - { from: quick, to: athena, step: 6 }
      - { from: rs, to: s3, step: 7 }
    steps:
      - "Applications send events and logs to a Kinesis data stream, where real-time consumers can also read them."
      - "Data Firehose reads the stream, converts JSON to Parquet using a schema from the Glue Data Catalog, and writes to S3."
      - "A Glue crawler keeps the Data Catalog tables for the data lake current."
      - "Lake Formation grants analysts fine-grained access to catalog tables instead of broad bucket permissions."
      - "Athena runs SQL on the Parquet files in place, with no servers to manage."
      - "Quick Sight builds dashboards on Athena queries."
      - "Redshift Spectrum lets the warehouse query the same S3 data without loading it."
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
---
Analytics questions describe events or logs that arrive continuously and must be queryable cheaply, often by several teams with different access. The answer is a data lake: stream into S3 in a columnar format, catalog it once, and query it in place with serverless engines.

### How it works

1. Applications write events to a Kinesis data stream, which real-time consumers can also read.
2. Data Firehose reads the stream, converts JSON to Parquet with a Glue Data Catalog schema, and writes to S3. [Record format conversion](https://docs.aws.amazon.com/firehose/latest/dev/record-format-conversion.html)
3. A Glue crawler keeps catalog tables current; Lake Formation controls who can see which tables and columns.
4. Athena queries the files in place, Quick Sight draws dashboards on it, and Redshift Spectrum joins the same data with warehouse tables.

| Need | Service |
|---|---|
| Real-time stream with several consumers | Kinesis Data Streams |
| Load into S3 with no code, convert formats | Data Firehose |
| Schema and tables for the lake | Glue Data Catalog and crawlers |
| Fine-grained access to tables and columns | Lake Formation |
| Ad hoc SQL, pay per query | Athena |
| Warehouse joins with lake data | Redshift Spectrum |
| Dashboards | Quick Sight |

### Exam cues

- If the question says load streaming data into S3 with the least code, think Data Firehose, because it buffers, converts and delivers for you.
- If the question says cheaper and faster Athena queries, think Parquet or ORC, because columnar formats read less data.
- If the question says query S3 with SQL and no servers, think Athena.
- If the question says column-level access for analysts on a data lake, think Lake Formation.
- If the question says the warehouse must query data left in S3, think Redshift Spectrum.

### Remember

- Firehose can read from a Kinesis data stream and convert JSON to Parquet or ORC.
- Crawlers create and update Data Catalog tables.
- Athena: serverless, pay per query.

> **Trap:** Loading the lake into a database before analysts can query it adds cost and delay. Athena and Redshift Spectrum query the files where they are.
