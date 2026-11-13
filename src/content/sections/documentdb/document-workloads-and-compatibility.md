---
title: Document workloads and compatibility
level: associate
order: 10
facts:
  - { id: managed, text: "Amazon DocumentDB is a managed MongoDB-compatible database service.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/what-is.html#what-is" }
  - { id: documents, text: "Document databases store semistructured data in documents using nested key-value pairs.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/document-database-documents-understanding.html#document-database-documents-understanding" }
  - { id: differences, text: "Amazon DocumentDB has functional differences from MongoDB.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/functional-differences.html#functional-differences" }
  - { id: api, text: "Supported MongoDB APIs and operations vary by compatibility level.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/mongo-apis.html#mongo-apis-dababase-administrative" }
  - { id: cluster-types, text: "Amazon DocumentDB supports instance-based clusters and elastic clusters.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/what-is.html#overview" }
  - { id: availability-zone, text: "Availability Zones are distinct locations within an AWS Region, designed to be isolated from failures in other zones.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/what-is.html#what-is-availability-zones" }
  - { id: primary, text: "In an instance-based cluster, the primary handles writes and reads.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/how-it-works.html#how-it-works" }
  - { id: replicas, text: "An instance-based cluster can have up to 15 read replicas, which can also be failover targets.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/how-it-works.html#how-it-works.replication" }
  - { id: storage, text: "The cluster volume has six copies of data across three Availability Zones.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/how-it-works.html#how-it-works" }
  - { id: eventual, text: "Replica reads are eventually consistent with the primary.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/how-it-works.html#how-it-works" }
  - { id: endpoint, text: "The cluster endpoint connects to the current primary and supports failover.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/how-it-works.html#how-it-works.endpoints.cluster" }
  - { id: reader, text: "The reader endpoint balances connections, not requests, across replicas.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/how-it-works.html#how-it-works.endpoints.reader" }
  - { id: recommendation, text: "AWS recommends the cluster endpoint in replica set mode with a suitable read preference.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/how-it-works.html#how-it-works.endpoints" }
  - { id: backup, text: "Continuous backups retain data for 1 to 35 days for point-in-time recovery.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/backup_restore.html#backup_restore" }
  - { id: snapshot, text: "A manual snapshot can retain backup data beyond the backup retention period.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/backup_restore.html#backup_restore" }
  - { id: encryption, text: "Encryption at rest uses AWS KMS keys and covers backups, snapshots and replicas in the cluster.", source: "https://docs.aws.amazon.com/documentdb/latest/devguide/what-is.html#overview" }
diagrams:
  - id: documentdb-instance-topology
    title: Instance-based cluster
    width: 800
    height: 300
    nodes:
      - { id: client, label: Application, icon: res-client, x: 30, y: 105, w: 140, h: 72, tone: user }
      - { id: primary, label: Primary, icon: documentdb, x: 250, y: 40, w: 140, h: 72, tone: database }
      - { id: replica, label: Replica, icon: documentdb, x: 250, y: 190, w: 140, h: 72, tone: database }
      - { id: volume, label: Cluster volume, icon: documentdb, x: 560, y: 105, w: 160, h: 72, tone: database }
    edges:
      - { from: client, to: primary, step: 1 }
      - { from: primary, to: volume, step: 2 }
      - { from: replica, to: volume, step: 3 }
    steps:
      - "The application writes through the primary."
      - "The primary writes to the shared cluster volume."
      - "Replicas read from the shared volume."
cards:
  - id: documentdb-001
    q: Which managed database supports MongoDB-compatible document workloads?
    a: Amazon DocumentDB. Check the supported API operations and functional differences before migration.
    facts: [managed, differences, api]
  - id: documentdb-002
    q: How many read replicas can an instance-based Amazon DocumentDB cluster have?
    a: Up to 15. Replicas also serve as failover targets.
    facts: [replicas]
  - id: documentdb-003
    q: A team needs an Amazon DocumentDB connection that follows the current primary after failover. Which endpoint should it use?
    a: The cluster endpoint. It connects to the current primary and supports failover.
    facts: [endpoint]
  - id: documentdb-004
    q: An application needs to distribute Amazon DocumentDB reads while leaving the primary free for writes. What connection approach should it consider?
    a: Use the cluster endpoint in replica set mode with an appropriate read preference and replicas.
    facts: [recommendation, replicas]
  - id: documentdb-005
    q: Does an Amazon DocumentDB reader endpoint balance individual read requests evenly?
    a: No. It balances connections, not individual requests.
    facts: [reader]
    trap: true
  - id: documentdb-006
    q: A team must retain an Amazon DocumentDB backup beyond the continuous backup retention period. What should it create?
    a: A manual cluster snapshot.
    facts: [snapshot]
  - id: documentdb-007
    q: What consistency should a client expect when reading from an Amazon DocumentDB replica?
    a: Eventual consistency with the primary.
    facts: [eventual]
---

Amazon DocumentDB is a managed database for MongoDB-compatible document workloads. A document stores data in key-value pairs that can be nested. Compatibility does not mean every MongoDB operation behaves identically.

### How it works

1. Check the supported APIs and functional differences for the compatibility level before moving an application.
2. Choose an instance-based or elastic cluster. In an instance-based cluster, the primary instance handles writes and reads. A replica is an additional instance that serves reads.
3. Instances use a shared cluster volume, with six copies across three Availability Zones. An Availability Zone is an isolated location within an AWS Region.
4. Connect through the cluster endpoint, a network address for the current primary. In replica set mode, a read preference can direct eligible reads to replicas.
5. Continuous backups support point-in-time recovery, a restore to a chosen time within the retention period.

### Exam cues

- If the question says MongoDB-compatible managed document database, think Amazon DocumentDB, because it supports compatible APIs.
- If the question says more read capacity and a failover target, think replicas, because replicas serve reads and can be promoted.
- If the question says backup beyond the retention period, think manual snapshot, because it can be retained longer.

### Remember

- An instance-based cluster supports up to 15 replicas. Replica reads are eventually consistent, so they can lag behind writes.
- Continuous backup retention is 1 to 35 days.
- AWS KMS encryption at rest also covers cluster backups, snapshots and replicas.
- The reader endpoint balances connections, not individual requests.

> **Trap:** MongoDB compatibility does not guarantee identical support or behavior for every operation. Check the compatibility documentation.
