---
title: Full load and change data capture
level: associate
order: 10
facts:
  - id: dms-purpose
    text: AWS DMS migrates data between supported data stores and can replicate ongoing changes.
    source: https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html
  - id: dms-aws-endpoint
    text: At least one endpoint must be on an AWS service; DMS cannot migrate between two on-premises databases.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Endpoints.Creating.html
  - id: dms-modes
    text: DMS supports full-load-only tasks, full load plus ongoing replication and ongoing-replication-only tasks.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html
  - id: dms-phases
    text: A full load plus CDC task loads existing data, applies cached changes and then applies ongoing changes as transactions.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.HighLevelView.html
  - id: dms-per-table
    text: During full load DMS starts capturing changes for a table when that table's full load starts and applies cached changes after its load completes.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.HighLevelView.html
  - id: dms-log
    text: CDC reads ongoing changes from source database logs using engine-specific methods; source configuration requirements vary by engine.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html
  - id: dms-latency
    text: DMS CDC is not real-time replication and has no latency SLA.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html
  - id: dms-cutover
    text: After replication reaches steady state, applications can be stopped while remaining changes are applied and restarted against the target.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.HighLevelView.html
  - id: dms-schema
    text: DMS Schema Conversion assesses and converts schemas and code for a different target engine; objects it cannot convert automatically require manual conversion.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.HighLevelView.html
  - id: dms-documentdb
    text: Amazon DocumentDB is a managed database service for MongoDB-compatible databases.
    source: https://docs.aws.amazon.com/documentdb/latest/devguide/what-is.html
  - id: dms-redshift
    text: Amazon Redshift is a managed data warehouse service for analyzing data.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html
  - id: dms-redshift-workload
    text: Amazon Redshift is designed for analytical queries over large datasets and omits some features suited to transactional processing, including efficient single-row data manipulation.
    source: https://docs.aws.amazon.com/redshift/latest/dg/c_redshift-and-postgres-sql.html
  - id: dms-multiaz
    text: A Multi-AZ DMS replication instance has a synchronous standby in a different Availability Zone for availability and failover.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_ReplicationInstance.html
  - id: dms-serverless
    text: DMS Serverless automatically provisions and scales replication capacity and provides built-in high availability.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Serverless.html
  - id: dms-source-latency
    text: CDCLatencySource measures the delay between the source and the replication instance.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Monitoring.html#CHAP_Monitoring.Metrics.Task
  - id: dms-target-latency
    text: High CDCLatencyTarget indicates a delay applying change events to the target.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Monitoring.html#CHAP_Monitoring.Metrics.Task
  - id: dms-freeable
    text: FreeableMemory includes memory in buffers and cache that can be freed and is not the same as actual free memory.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Monitoring.html#CHAP_Monitoring.Metrics
  - id: dms-views
    text: Views can be migrated with full-load-only tasks but not with tasks that include CDC.
    source: https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html
cards:
  - id: dms-001
    q: How do Amazon DocumentDB, Amazon Redshift and AWS DMS differ?
    a: DocumentDB runs MongoDB-compatible databases. Redshift is a data warehouse for analytics. DMS migrates data and can replicate ongoing changes.
    facts: [dms-documentdb, dms-redshift, dms-purpose]
  - id: dms-002
    q: A team must migrate a database while replicating ongoing changes to reduce cutover downtime. Which AWS DMS task fits?
    a: Use a full load plus CDC task to copy existing data and then apply ongoing changes.
    facts: [dms-modes, dms-phases]
  - id: dms-003
    q: A target already contains the initial database copy. Which AWS DMS task migrates subsequent changes?
    a: A CDC-only task replicates ongoing changes.
    facts: [dms-modes]
  - id: dms-004
    q: A team needs automatic failover for a provisioned AWS DMS replication instance. What should it configure?
    a: Choose Multi-AZ to provision a synchronous standby in a different Availability Zone.
    facts: [dms-multiaz]
  - id: dms-005
    q: A team does not want to manage replication instance capacity for AWS DMS. What feature should it consider?
    a: DMS Serverless automatically provisions and scales replication capacity.
    facts: [dms-serverless]
  - id: dms-009
    q: Does AWS DMS CDC guarantee real-time replication with a latency SLA?
    a: No. CDC latency varies and has no SLA.
    trap: true
    facts: [dms-latency]
  - id: dms-010
    q: "A database is moving to a different engine. How can AWS DMS help with the schema and data?"
    a: "Use DMS Schema Conversion to assess and convert the schema, and DMS to migrate data. Objects that cannot be converted automatically need manual conversion."
    facts: [dms-schema, dms-purpose]
diagrams:
  - id: dms-replication-flow
    title: DMS replication
    width: 800
    height: 160
    nodes:
      - { id: source, label: Source database, icon: res-database, x: 30, y: 40, w: 160, h: 72, tone: database }
      - { id: replication, label: AWS DMS, icon: database-migration-service, x: 310, y: 40, w: 160, h: 72, tone: database }
      - { id: target, label: Target database, icon: res-database, x: 610, y: 40, w: 160, h: 72, tone: database }
    edges:
      - { from: source, to: replication, step: 1 }
      - { from: replication, to: target, step: 2 }
    steps:
      - DMS reads source data and captures changes.
      - DMS loads the target and applies captured changes.
---
AWS Database Migration Service (DMS) moves data between supported data stores and can keep a target updated while the source changes. Think of a full load as the initial copy and change data capture (CDC) as the stream of later changes.

### How it works

1. Use source and target endpoints. At least one endpoint must be an AWS service.
2. Select a replication instance, which reads and loads data, or use DMS Serverless to provision and scale capacity automatically. Multi-AZ gives a provisioned instance a synchronous standby in another Availability Zone.
3. Choose the task type. Full load plus CDC copies existing data while caching changes for each table once its load starts, applies those changes, then continues replication from source logs. Configure the source for CDC as required by its engine.
4. After replication reaches a steady state, stop the application, allow remaining changes to reach the target, and restart the application against the target.

| Task | Use |
| --- | --- |
| Full load only | Copy existing data, including views when needed. |
| Full load plus CDC | Copy existing data and continue applying changes. |
| CDC only | Replicate changes after the target already has its initial data. |

### Exam cues

- If the question says reduce migration cutover downtime, think full load plus CDC, because ongoing changes are applied after the initial copy.
- If the question says automatic failover of a provisioned DMS instance, think Multi-AZ, because it maintains a synchronous standby.
- If the question says the target already has its initial data, think CDC only, because the task replicates ongoing changes.
- If the question says replication capacity should scale without instance management, think DMS Serverless.
- If the question says a MongoDB-compatible database, think Amazon DocumentDB. If it says a data warehouse for large analytical queries, think Amazon Redshift. Redshift omits some features suited to small transactions, such as efficient single-row data manipulation. DMS moves data rather than serving as the destination database.

### Remember

- CDC is not real time and has no latency SLA. Latency is the delay in applying changes.
- Use a full-load-only task to migrate views.

> **Trap:** CDC is not real time and has no latency SLA. Use a full-load-only task when the migration must include views.
