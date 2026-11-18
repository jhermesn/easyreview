---
title: "PLACEHOLDER athena/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
