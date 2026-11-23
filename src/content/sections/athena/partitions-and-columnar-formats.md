---
title: Partitions and columnar formats
level: associate
order: 20
facts:
  - id: partition
    text: Partitioning groups related data by keys such as date; filtering partition columns restricts
      which locations Athena scans.
    source: https://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html#performance-tuning-partition-your-data
  - id: keys
    text: Choose partition keys for common query filters; excessive keys can create fragmented datasets
      with too many small files.
    source: https://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html#performance-tuning-pick-partition-keys-that-will-support-your-queries
  - id: string
    text: Athena recommends STRING partition keys so partition filtering can be pushed into the Glue
      Data Catalog.
    source: https://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html#performance-tuning-always-use-string-as-the-type-for-partition-keys
  - id: columnar
    text: Parquet and ORC organize data by column so Athena loads only the columns required by the query.
    source: https://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html#performance-tuning-use-columnar-file-formats
  - id: compression
    text: Columnar storage supports compression by column to reduce storage and query I/O.
    source: https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html
  - id: pushdown
    text: Parquet and ORC use data-block statistics to skip blocks that cannot match a filter, a
      behavior called predicate pushdown.
    source: https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html
  - id: convert
    text: Athena CREATE TABLE AS SELECT can convert source data into Parquet or ORC.
    source: https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html#convert-to-columnar
  - id: ctas
    text: CREATE TABLE AS SELECT creates a table from query output.
    source: https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html#convert-to-columnar
  - id: glue-convert
    text: Glue ETL jobs can transform CSV or JSON into Parquet or ORC.
    source: https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html#convert-to-columnar
  - id: small-files
    text: Many small files increase Athena listing and per-file processing overhead, including for
      columnar data.
    source: https://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html#performance-tuning-avoid-having-too-many-files
  - id: compact
    text: Buffering writes or combining files with Glue ETL can produce larger files and reduce
      small-file overhead.
    source: https://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html#performance-tuning-avoid-having-too-many-files
  - id: parallel
    text: Most compressed text files cannot be split across readers, so avoid reducing a dataset to too
      few such files.
    source: https://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html#performance-tuning-compress-data
  - id: explain
    text: EXPLAIN shows which partition values Athena plans to scan.
    source: https://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html#performance-tuning-validate-that-your-queries-are-compatible-with-the-partitioning-scheme
  - id: scan-limit
    text: Athena cannot read more than one million partitions in a single scan.
    source: https://docs.aws.amazon.com/athena/latest/ug/partitions.html#partitions-considerations-limitations
  - id: schema-on-read
    text: "An Athena table only describes the schema and S3 location of data for read-time querying; Athena does not modify the data in Amazon S3."
    source: https://docs.aws.amazon.com/athena/latest/ug/creating-tables.html
  - id: workgroups
    text: "Athena workgroups separate workloads, control team access, enforce settings, track query metrics and control costs."
    source: https://docs.aws.amazon.com/athena/latest/ug/workgroups-manage-queries-control-costs.html
  - id: dynamodb-read-only
    text: "The Athena DynamoDB connector queries DynamoDB tables but does not support write operations such as INSERT INTO."
    source: https://docs.aws.amazon.com/athena/latest/ug/connectors-dynamodb.html
  - id: sql-on-s3
    text: "Amazon Athena runs standard SQL queries directly on data stored in Amazon S3."
    source: https://docs.aws.amazon.com/athena/latest/ug/what-is.html
diagrams:
  - id: athena-log-conversion
    title: Convert raw logs for selective scans
    width: 1000
    height: 230
    nodes:
      - id: raw
        label: S3 raw logs
        icon: simple-storage-service
        sub: JSON or CSV
        x: 30
        y: 75
        w: 270
        h: 86
        tone: storage
      - id: ctas
        label: Athena CTAS
        icon: athena
        sub: CREATE TABLE AS SELECT
        x: 360
        y: 75
        w: 270
        h: 86
        tone: database
      - id: columnar
        label: S3 table data
        icon: simple-storage-service
        sub: Parquet or ORC
        x: 690
        y: 75
        w: 270
        h: 86
        tone: storage
    edges:
      - from: raw
        to: ctas
        step: 1
      - from: ctas
        to: columnar
        step: 2
    steps:
      - CTAS reads source records through the source table.
      - CTAS writes the selected records in the chosen columnar format.
cards:
  - id: athena-003
    q: How can a team make Athena SQL queries over a large S3 log archive scan less data and run faster?
    a: Use Parquet or ORC, partition for common filters such as date, and filter partition columns.
      Compact small files so listing and per-file overhead do not erase the gains.
    facts:
      - partition
      - keys
      - columnar
      - compression
      - pushdown
      - small-files
      - compact
  - id: athena-011
    q: An Athena table uses Parquet, but thousands of tiny files make queries slow. What should the team
      change?
    a: Compact the files or buffer writes to create larger files. Columnar format does not remove the
      overhead of listing and requesting many files.
    facts:
      - small-files
      - compact
    trap: true
  - id: athena-012
    q: An Athena query needs only a small selection of columns from S3 logs. How do Parquet and ORC
      help?
    a: They let Athena load required columns and skip blocks that cannot satisfy filter predicates,
      while using column compression.
    facts:
      - columnar
      - compression
      - pushdown
  - id: athena-013
    q: An Athena table has partitions by date, but queries omit the date partition filter. Will
      partitioning alone restrict the scan to the desired dates?
    a: No. Filter the partition columns to select matching partition locations. Use EXPLAIN to inspect
      planned partition values.
    facts:
      - partition
      - explain
    trap: true
  - id: athena-014
    q: A team wants Athena to convert JSON logs to Parquet without moving them through a separate
      processing service. Which SQL operation fits?
    a: CREATE TABLE AS SELECT, also called CTAS, specifying Parquet output. Glue ETL is another
      supported conversion path.
    facts:
      - convert
      - ctas
      - glue-convert
  - id: athena-020
    q: "Does creating an Amazon Athena table load or change the underlying data in Amazon S3?"
    a: "No. The table only describes the schema and location for read-time querying."
    facts: [schema-on-read]
  - id: athena-021
    q: "Two analytics teams share Amazon Athena and finance needs separate cost tracking and limits per team. What should be configured?"
    a: "A workgroup per team, which separates workloads, tracks query metrics and controls costs."
    facts: [workgroups]
  - id: athena-023
    q: "Can the Amazon Athena DynamoDB connector insert records into a DynamoDB table?"
    a: "No. It queries tables but does not support write operations."
    facts: [dynamodb-read-only]
  - id: athena-024
    q: "Which AWS service runs SQL directly on data stored in Amazon S3?"
    a: "Amazon Athena."
    facts: [sql-on-s3]
---
Partitioning and columnar storage reduce the data Athena needs to read. A partition groups objects by a key such as date. A columnar file groups values by column so a query can read the fields it needs.

### How it works

1. Choose partition keys that match common filters. Define partition columns as STRING so Athena can push their filtering into the Glue Data Catalog.
2. Convert logs to Parquet or ORC with CREATE TABLE AS SELECT (CTAS), which creates a table from query output, or with a Glue extract, transform, and load (ETL) job.
3. Filter partition columns in SQL. Parquet and ORC also use block statistics for predicate pushdown, which skips blocks that cannot satisfy a filter.
4. Compact small files, meaning combine them into larger files, to reduce listing and request overhead. Inspect planned partition values with EXPLAIN.

| Technique | What it avoids reading or doing |
|---|---|
| Partition filtering | Unmatched partition locations |
| Parquet or ORC | Unneeded columns and blocks excluded by statistics |
| Column compression | Extra storage and data reading |
| File compaction | Repeated work for many small files |

### Exam cues

- If the question says run SQL directly on S3 data, think Athena, because it queries the data in place.
- If the question says change DynamoDB records through Athena, think use another write method, because the connector supports queries but not writes.
- If the question says queries scan years of logs for a date range, think date partition filters, because only matching partition locations need reading.
- If the question says Parquet queries remain slow with many tiny files, think compaction, because columnar storage still has per-file overhead.
- If the question says convert JSON logs to Parquet with Athena, think CTAS, because it creates a table from query output in the chosen format.

### Remember

- Parquet and ORC support column compression and predicate pushdown.
- Choose partition keys for common queries; excessive keys can create too many small files.
- Athena cannot read more than one million partitions in one scan.
- Most compressed text files cannot be split across readers. Avoid consolidating into too few files that prevent parallel reading.
- Tables describe data in S3 for read-time queries; Athena never changes that data.
- Workgroups separate teams, track query metrics and control costs.

> **Trap:** Partitioning does not automatically restrict a query to the dates you intended. Include conditions on the partition columns and inspect EXPLAIN when the scan is unexpectedly broad.
