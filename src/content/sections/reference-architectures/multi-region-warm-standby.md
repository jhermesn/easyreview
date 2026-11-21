---
title: Multi-Region disaster recovery with warm standby
level: associate
order: 30
facts:
  - id: strategies
    text: AWS groups disaster recovery strategies into four approaches, from low-cost backup and restore to multiple active Regions; active/passive strategies serve traffic from one Region and fail over to another.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html
  - id: warm-standby
    text: Warm standby keeps a scaled-down but fully functional copy of production running in another Region, so it can take traffic at reduced capacity at once and recovers faster than pilot light.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#warm-standby
  - id: pilot-light
    text: In pilot light, data stores such as databases and object storage stay running in the DR Region, but the application servers cannot serve requests until more action is taken.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#pilot-light
  - id: iac-regions
    text: CloudFormation can deploy the same infrastructure definition consistently across accounts and Regions, which keeps a DR Region in step with production.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#pilot-light
  - id: stackset
    text: A StackSet deploys one template as stacks across selected AWS accounts and Regions; a stack instance associates it with an account and Region.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts
  - id: r53-active-passive
    text: Route 53 health checks support active-passive failover, where the failover routing policy sends traffic to a secondary resource when the primary is unhealthy, and active-active failover with the other routing policies.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html
  - id: health-checks
    text: Route 53 health checks monitor the health of web applications and other resources, and CloudWatch alarms can notify when a health check status changes.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html
  - id: aurora-global
    text: An Aurora global database has one primary Region that takes writes and up to 10 read-only secondary Regions that Aurora keeps synchronized.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html
  - id: switchover
    text: Switchover, formerly managed planned failover, synchronizes the selected secondary before changing primary Region and has RPO zero.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-disaster-recovery.managed-failover
  - id: managed-failover
    text: Managed failover handles an unplanned outage without waiting for synchronization; asynchronous replication lag can cause lost writes.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned
  - id: writer-endpoint
    text: The global writer endpoint keeps the same name and points to the new primary after switchover or failover; applications must observe the DNS change before resuming writes.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned
  - id: s3-crr
    text: S3 Cross-Region Replication copies objects asynchronously to a bucket in another Region, and with versioning you can choose a restore point.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#backup-and-restore
  - id: backup-copy
    text: AWS Backup can copy supported backups to other Regions on demand or through backup plan copy actions.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html
  - id: backup-incremental
    text: The first copy to a new Region is full; later copies are generally incremental if the service supports incremental backups.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html
  - id: ddb-global
    text: DynamoDB global tables are multi-active and multi-Region, with fast local reads and writes in each replica Region.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html
diagrams:
  - id: multi-region-warm-standby
    title: Warm standby in a second Region with DNS failover
    facts: [strategies, warm-standby, pilot-light, iac-regions, stackset, r53-active-passive, health-checks, aurora-global, switchover, managed-failover, writer-endpoint, s3-crr, backup-copy, backup-incremental, ddb-global]
    width: 1240
    height: 920
    groups:
      - { label: Primary Region, x: 20, y: 260, w: 580, h: 520, tone: neutral, icon: group-region }
      - { label: DR Region, x: 640, y: 260, w: 580, h: 520, tone: neutral, icon: group-region }
    nodes:
      - { id: users, label: Users, x: 545, y: 20, w: 150, h: 72, tone: user, icon: res-users }
      - { id: dns, label: Route 53, sub: failover routing, x: 545, y: 140, w: 150, h: 86, tone: network, icon: route-53, info: "Primary record with a health check, secondary record for the DR Region." }
      - { id: hc, label: Health check, sub: primary endpoint, x: 300, y: 140, w: 150, h: 86, tone: network, icon: route-53, info: "Probes the primary load balancer. A CloudWatch alarm can notify when its status changes." }
      - { id: albp, label: ALB, sub: primary, x: 60, y: 310, w: 140, h: 86, tone: network, icon: res-elastic-load-balancing-application-load-balancer }
      - { id: asgp, label: Auto Scaling, sub: full capacity, x: 260, y: 310, w: 140, h: 86, tone: compute, icon: ec2-auto-scaling }
      - { id: dbp, label: Aurora, sub: primary cluster, x: 440, y: 310, w: 140, h: 86, tone: database, icon: aurora, info: "Takes all writes for the global database. Applications use the global writer endpoint." }
      - { id: s3p, label: S3 bucket, sub: versioned, x: 260, y: 680, w: 140, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: backup, label: AWS Backup, sub: backup plan, x: 60, y: 540, w: 150, h: 86, tone: storage, icon: backup, info: "The plan's copy action sends each recovery point to a vault in the DR Region." }
      - { id: dbd, label: Aurora, sub: secondary cluster, x: 660, y: 310, w: 140, h: 86, tone: database, icon: aurora, info: "Read-only until it is promoted by a switchover or failover." }
      - { id: asgd, label: Auto Scaling, sub: scaled down, x: 840, y: 310, w: 140, h: 86, tone: compute, icon: ec2-auto-scaling, info: "Running at reduced size. On failover, raise its capacity to production size." }
      - { id: albd, label: ALB, sub: standby, x: 1040, y: 310, w: 140, h: 86, tone: network, icon: res-elastic-load-balancing-application-load-balancer }
      - { id: s3d, label: S3 bucket, sub: replica, x: 840, y: 680, w: 140, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: vault, label: Backup vault, sub: DR copies, x: 1030, y: 540, w: 150, h: 86, tone: storage, icon: backup }
      - { id: cfn, label: CloudFormation, sub: StackSet, x: 535, y: 810, w: 170, h: 86, tone: mgmt, icon: cloudformation, info: "One template, a stack instance per Region, so the DR Region matches production." }
    edges:
      - { from: cfn, to: asgp, step: 1 }
      - { from: cfn, to: asgd, step: 1 }
      - { from: users, to: dns, step: 2 }
      - { from: dns, to: hc, step: 3 }
      - { from: hc, to: albp, step: 3 }
      - { from: dns, to: albp, step: 4 }
      - { from: albp, to: asgp, step: 4 }
      - { from: asgp, to: dbp, step: 4 }
      - { from: asgp, to: s3p, step: 4 }
      - { from: dbp, to: dbd, step: 5 }
      - { from: s3p, to: s3d, step: 6 }
      - { from: dbp, to: backup, step: 7 }
      - { from: backup, to: vault, step: 7 }
      - { from: dns, to: albd, step: 8, dashed: true }
      - { from: albd, to: asgd, step: 8, dashed: true }
      - { from: asgd, to: s3d, step: 8, dashed: true }
      - { from: asgd, to: dbd, step: 9, dashed: true }
    steps:
      - "Both Regions are deployed from the same CloudFormation template through a StackSet, so the DR Region matches production. Its Auto Scaling group runs at reduced size."
      - "Users resolve the domain in Route 53."
      - "A Route 53 health check probes the primary load balancer, and the failover routing policy answers with the primary record while it is healthy."
      - "The primary Region serves all traffic at full capacity."
      - "Aurora Global Database keeps a read-only secondary cluster synchronized in the DR Region."
      - "S3 Cross-Region Replication copies objects to a versioned bucket in the DR Region."
      - "An AWS Backup plan takes backups and its copy action sends them to a vault in the DR Region, for restores to an earlier point in time."
      - "If the health check fails, Route 53 answers with the DR Region. The standby already serves at reduced size and scales out to production capacity."
      - "Aurora managed failover promotes the secondary cluster to take writes. The global writer endpoint keeps its name and now points to the new primary."
cards:
  - id: reference-architectures-014
    q: A company needs its application to keep answering requests within minutes of a Region failure, at lower cost than running two full Regions. Which DR strategy fits?
    a: "**Warm standby**: a scaled-down but fully working copy runs in the DR Region, takes traffic at once and scales out."
    facts: [warm-standby, strategies]
  - id: reference-architectures-015
    q: In the DR Region, the databases are replicated and running but no application servers can serve traffic until they are started. Which strategy is this, and how does warm standby differ?
    a: "**Pilot light.** Warm standby keeps the application running at reduced capacity, so it handles traffic immediately."
    trap: true
    facts: [pilot-light, warm-standby]
  - id: reference-architectures-016
    q: Traffic must go to the primary Region and switch to a DR Region automatically when the primary endpoint is unhealthy. Which Route 53 configuration fits?
    a: "**Failover routing** (active-passive) with a **health check** on the primary record and a secondary record for the DR Region."
    facts: [r53-active-passive, health-checks]
  - id: reference-architectures-017
    q: An Aurora MySQL database must be readable in a second Region and promotable there during a regional outage. Which feature fits?
    a: "**Aurora Global Database**: one primary Region for writes and up to 10 read-only secondary Regions kept in sync."
    facts: [aurora-global]
  - id: reference-architectures-018
    q: A multi-Region application must accept writes in every Region with low local latency. Which database feature fits better than Aurora Global Database?
    a: "**DynamoDB global tables**, which are multi-active: every replica Region takes reads and writes. An Aurora global database writes only in its primary Region."
    facts: [ddb-global, aurora-global]
  - id: reference-architectures-019
    q: A DR plan replicates S3 objects to another Region, but a bad batch job just overwrote thousands of objects, and the overwrites replicated too. What protects against this?
    a: "**Versioning** on the buckets, so earlier versions can be restored. Replication alone copies corruption as well."
    trap: true
    facts: [s3-crr]
  - id: reference-architectures-020
    q: How can a team keep the DR Region's infrastructure identical to production as production changes?
    a: "Define it once in **CloudFormation** and deploy the same template to both Regions (and accounts), for example with a **StackSet**."
    facts: [iac-regions, stackset]
  - id: reference-architectures-077
    q: "A company runs a planned DR test that moves its Aurora global database to the DR Region and must lose no data. Which operation fits?"
    a: "**Switchover** (formerly managed planned failover): it synchronizes the secondary before changing the primary Region, with RPO zero."
    facts: [switchover]
  - id: reference-architectures-078
    q: "The primary Region of an Aurora global database is down. The team runs managed failover. Can recent writes be lost?"
    a: "Yes. Managed failover does not wait for synchronization, so writes still in asynchronous replication can be lost. Only a switchover guarantees RPO zero."
    trap: true
    facts: [managed-failover, switchover]
  - id: reference-architectures-079
    q: "After an Aurora global database fails over to the DR Region, must the application change the database hostname it writes to?"
    a: "No, if it uses the **global writer endpoint**: the name stays the same and points to the new primary. The application must pick up the DNS change before writing again."
    facts: [writer-endpoint]
  - id: reference-architectures-080
    q: "Besides live replication, a company needs point-in-time backups of its databases stored in the DR Region, in case corrupted data replicates. What fits?"
    a: "An **AWS Backup** plan with a **copy action** to a vault in the DR Region. The first copy is full; later copies are generally incremental."
    facts: [backup-copy, backup-incremental]
---
Disaster recovery questions give a recovery time and a budget, then ask for the cheapest strategy that meets them. Warm standby is the middle ground the exams use most: a second Region already runs the full stack at small size, data replicates continuously, backups are copied there, and DNS moves users over when the primary fails.

### How it works

1. One CloudFormation template, deployed to both Regions through a StackSet, keeps the DR Region identical to production at a smaller size.
2. A Route 53 health check watches the primary load balancer, and failover routing answers with the primary Region while it is healthy.
3. Aurora Global Database keeps a read-only cluster in the DR Region, and S3 Cross-Region Replication copies objects to a versioned bucket there.
4. AWS Backup copies recovery points to a vault in the DR Region, so a restore point survives even when bad data replicates.
5. When the primary fails its health check, Route 53 answers with the DR Region. The standby takes traffic at once and scales out.
6. Aurora managed failover promotes the secondary. A planned test uses switchover instead, which loses no data. The global writer endpoint follows the new primary.

| Strategy | DR Region before the event | Recovery |
|---|---|---|
| Backup and restore | Backups only | Slowest: rebuild infrastructure, restore data |
| Pilot light | Data stores running, app servers off | Start or deploy app servers, then switch |
| Warm standby | Full stack running at reduced size | Takes traffic at once, then scales out |
| Multi-site active/active | Full stack serving traffic | Traffic already spread across Regions |

| Decision | Choose | When |
|---|---|---|
| Planned Region move with no data loss | Aurora switchover | Tests and maintenance |
| Region outage | Aurora managed failover | Primary unavailable; accept possible lost writes |
| Writes in every Region | DynamoDB global tables | Multi-active workloads |
| Restore points in the DR Region | AWS Backup copy action | Protection against replicated corruption |

### Exam cues

- If the question says the cheapest option and hours of downtime are acceptable, think backup and restore, because nothing runs in the DR Region.
- If the question says data must be live in the DR Region but compute can start after the event, think pilot light.
- If the question says recover in minutes at reduced cost, think warm standby, because the stack is already running.
- If the question says writes in every Region, think DynamoDB global tables, because Aurora Global Database writes in one primary Region.
- If the question says fail DNS over automatically, think Route 53 failover routing with health checks.
- If the question says a planned Region move with zero data loss, think Aurora switchover; for an outage, managed failover.

### Remember

- Aurora Global Database: one primary Region, up to 10 read-only secondaries.
- Switchover: RPO zero. Managed failover: can lose writes still replicating.
- DynamoDB global tables: multi-active, multi-Region.
- S3 CRR is asynchronous; versioning gives restore points.
- AWS Backup copy actions put recovery points in another Region.
- Pilot light cannot serve without action; warm standby can.

> **Trap:** Replication is not a backup. Corruption and deletions replicate too, so keep versioning, point-in-time recovery or AWS Backup copies alongside it.
