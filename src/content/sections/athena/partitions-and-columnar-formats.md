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
  - id: table-serde
    text: An Athena table can specify a SerDe that matches its data format, such as a JSON SerDe for JSON data.
    source: https://docs.aws.amazon.com/athena/latest/ug/serde-reference.html#serde-reference
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
  - id: hive
    text: Hive-style partition paths use key=value components; MSCK REPAIR TABLE discovers this layout.
    source: https://docs.aws.amazon.com/athena/latest/ug/partitions.html
  - id: non-hive
    text: Non-Hive partition paths, including typical CloudTrail paths, require explicit partition
      additions such as ALTER TABLE ADD PARTITION.
    source: https://docs.aws.amazon.com/athena/latest/ug/partitions.html
  - id: projection
    text: Partition projection stores rules in table properties and computes partition locations in
      memory rather than looking them up in Glue.
    source: https://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html#performance-tuning-use-partition-projection
  - id: sparse
    text: Partition projection can perform worse for sparse tables because Athena lists calculated
      locations even when they contain no data.
    source: https://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html#performance-tuning-use-partition-projection
  - id: explain
    text: EXPLAIN shows which partition values Athena plans to scan.
    source: https://docs.aws.amazon.com/athena/latest/ug/performance-tuning-data-optimization-techniques.html#performance-tuning-validate-that-your-queries-are-compatible-with-the-partitioning-scheme
  - id: scan-limit
    text: Athena cannot read more than one million partitions in a single scan.
    source: https://docs.aws.amazon.com/athena/latest/ug/partitions.html#partitions-considerations-limitations
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
  - id: athena-015
    q: An Athena administrator runs MSCK REPAIR TABLE against standard CloudTrail date paths and finds
      no partitions. What should the administrator use?
    a: Use ALTER TABLE ADD PARTITION for non-Hive paths, or configure partition projection. MSCK
      discovers Hive-style key=value paths.
    facts:
      - hive
      - non-hive
      - projection
    trap: true
  - id: athena-016
    q: What is Athena partition projection, and when can it make query planning worse?
    a: It calculates partition locations from table-property rules instead of catalog lookups. On sparse
      datasets it can list many locations that contain no data.
    facts:
      - projection
      - sparse
  - id: athena-017
    q: A team creates an Athena table over JSON data in S3. What should the table use to parse the data?
    a: Specify a JSON SerDe, a serializer and deserializer suited to the data format.
    facts:
      - table-serde
---
Partitioning and columnar storage reduce the data Athena needs to read. A partition groups objects by a key such as date. A columnar file groups values by column so a query can read the fields it needs.

### How it works

An Athena table can specify a serializer and deserializer, or SerDe, matching its data format. For JSON data, use a JSON SerDe to parse the records.

1. Choose partition keys that match common filters. Define partition columns as STRING so Athena can push their filtering into the Glue Data Catalog.
2. Convert logs to Parquet or ORC with CREATE TABLE AS SELECT (CTAS), which creates a table from query output, or with a Glue extract, transform, and load (ETL) job.
3. Register partition locations or configure partition projection. Projection computes locations from rules saved in table properties.
4. Filter partition columns in SQL. Parquet and ORC also use block statistics for predicate pushdown, which skips blocks that cannot satisfy a filter.
5. Compact small files, meaning combine them into larger files, to reduce listing and request overhead. Inspect planned partition values with EXPLAIN.

| Technique | What it avoids reading or doing |
|---|---|
| Partition filtering | Unmatched partition locations |
| Parquet or ORC | Unneeded columns and blocks excluded by statistics |
| Column compression | Extra storage and data reading |
| File compaction | Repeated work for many small files |
| Partition projection | Catalog lookups for individual partition locations |

Hive-style paths encode partition keys as key=value. MSCK REPAIR TABLE discovers this layout. For non-Hive paths such as typical CloudTrail date paths, use ALTER TABLE ADD PARTITION or projection.

### Exam cues

- If the question says queries scan years of logs for a date range, think date partition filters, because only matching partition locations need reading.
- If the question says Parquet queries remain slow with many tiny files, think compaction, because columnar storage still has per-file overhead.
- If the question says automate predictable partition locations, think partition projection, because it calculates paths from rules.
- If the question says the projected table has many empty combinations, think sparse-partition overhead, because Athena still lists those computed locations.

### Remember

- Parquet and ORC support column compression and predicate pushdown.
- Choose partition keys for common queries; excessive keys can create too many small files.
- Athena cannot read more than one million partitions in one scan.
- Most compressed text files cannot be split across readers. Avoid consolidating into too few files that prevent parallel reading.

> **Trap:** Partitioning does not automatically restrict a query to the dates you intended. Include conditions on the partition columns and inspect EXPLAIN when the scan is unexpectedly broad.
