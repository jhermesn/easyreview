---
title: Partition discovery and SerDes
level: professional
order: 30
facts:
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
  - id: table-serde
    text: An Athena table can specify a SerDe that matches its data format, such as a JSON SerDe for JSON data.
    source: https://docs.aws.amazon.com/athena/latest/ug/serde-reference.html#serde-reference
cards:
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
Athena tables need partition locations and a serializer and deserializer, or SerDe, suited to the data format. The path layout determines how partitions can be discovered, while partition projection calculates locations from rules.

### How it works

1. Check the partition path layout. Hive-style paths use `key=value` components and can be discovered with `MSCK REPAIR TABLE`. For non-Hive paths, such as typical CloudTrail date paths, add partitions explicitly with `ALTER TABLE ADD PARTITION`.
2. Alternatively, configure partition projection. Athena computes locations in memory from rules in table properties instead of looking them up in the Glue Data Catalog.
3. Choose a SerDe matching the table data, such as a JSON SerDe for JSON records.

### Exam cues

- If the question says `MSCK REPAIR TABLE` finds no partitions in standard CloudTrail date paths, think `ALTER TABLE ADD PARTITION` or partition projection, because those paths are not Hive-style.
- If the question says a projected table has many empty partition combinations, think sparse partition overhead, because Athena lists calculated locations even when they contain no data.
- If the question says an Athena table must parse JSON, think JSON SerDe, because the SerDe should match the data format.

### Remember

- Hive-style paths use `key=value` components.
- Partition projection uses table-property rules instead of Glue partition lookups.
- Sparse tables can perform worse with projection when calculated locations contain no data.

> **Trap:** `MSCK REPAIR TABLE` discovers Hive-style paths; it does not discover typical non-Hive CloudTrail date paths. Use explicit partition additions or partition projection for those paths.
