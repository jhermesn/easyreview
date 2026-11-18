---
title: "PLACEHOLDER documentdb/design-details"
level: associate
order: 20
facts:
  - { id: managed, text: "Amazon DocumentDB is a managed MongoDB-compatible database service.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/what-is.html#what-is" }
  - { id: differences, text: "Amazon DocumentDB has functional differences from MongoDB.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/functional-differences.html#functional-differences" }
  - { id: api, text: "Supported MongoDB APIs and operations vary by compatibility level.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/mongo-apis.html#mongo-apis-dababase-administrative" }
  - { id: snapshot, text: "A manual snapshot can retain backup data beyond the backup retention period.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/backup_restore.html#backup_restore" }
  - id: storage-growth
    text: "A DocumentDB cluster volume grows automatically with data, up to 256 TiB on engine version 8.0 and later (128 TiB before), and is billed for the space used."
    source: https://docs.aws.amazon.com/documentdb/latest/devguide/how-it-works.html#how-it-works
cards:
  - id: documentdb-001
    q: Which managed database supports MongoDB-compatible document workloads?
    a: Amazon DocumentDB. Check the supported API operations and functional differences before migration.
    facts: [managed, differences, api]
  - id: documentdb-006
    q: A team must retain an Amazon DocumentDB backup beyond the continuous backup retention period. What should it create?
    a: A manual cluster snapshot.
    facts: [snapshot]
  - id: documentdb-008
    q: "Do you need to provision storage size for an Amazon DocumentDB cluster?"
    a: "No. The cluster volume grows automatically as data grows and you pay for what you use."
    facts: [storage-growth]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
