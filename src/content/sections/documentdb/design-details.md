---
title: Compatibility, storage and backups
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
  - id: document-query-index
    text: "Amazon DocumentDB can store, query and index JSON documents without enforcing one schema across every document in a collection."
    source: https://docs.aws.amazon.com/documentdb/latest/devguide/document-database-working-with-documents.html
  - id: catalog-workloads
    text: "Document databases fit product catalogs in which different products have different sets of attributes."
    source: https://aws.amazon.com/nosql/document/#ams%23what-isc2%23pattern-data
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
  - id: documentdb-010
    q: "An Amazon DocumentDB application stores JSON records whose fields vary. Can the application query and index that data without one enforced collection schema?"
    a: "Yes. Amazon DocumentDB supports querying and indexing JSON data, and a collection does not enforce one schema across all documents."
    facts: [document-query-index]
  - id: documentdb-011
    q: "A team is considering Amazon DocumentDB for a product catalog whose records have different attributes. Why does a document model fit?"
    a: "Documents can represent products with different attribute sets, matching the variable structure of a product catalog."
    facts: [catalog-workloads]
---
Amazon DocumentDB is a managed database for MongoDB-compatible workloads. Before moving an application, check which operations it needs and how they behave.

Product catalogs are a document-database use case: different products can have different attributes. Amazon DocumentDB can query and index JSON data without enforcing one schema across the collection.

### How it works

1. Check the supported MongoDB APIs and operations for the compatibility level and review the functional differences.
2. The cluster volume grows automatically as data grows, and billing reflects the space used.
3. Create a manual cluster snapshot to retain backup data beyond the backup retention period.

### Exam cues

- If the question says a product catalog has different attributes for each product, think a document database such as Amazon DocumentDB, because documents accommodate that variation.

- If the question says a managed MongoDB-compatible database, think Amazon DocumentDB, because it supports MongoDB-compatible workloads.
- If the question says retain a backup beyond the retention period, think manual cluster snapshot, because it can keep backup data longer.
- If the question says storage must grow with the data, think automatic cluster volume growth, because you pay for the space used.

### Remember

- Cluster storage grows up to 256 TiB on engine version 8.0 and later, or 128 TiB on earlier versions.
- Supported MongoDB APIs and operations vary by compatibility level.

> **Trap:** MongoDB compatibility does not mean every operation is supported or behaves identically. Check the supported APIs and functional differences.
