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
  - id: r53-active-passive
    text: Route 53 health checks support active-passive failover, where the failover routing policy sends traffic to a secondary resource when the primary is unhealthy, and active-active failover with the other routing policies.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html
  - id: aurora-global
    text: An Aurora global database has one primary Region that takes writes and up to 10 read-only secondary Regions that Aurora keeps synchronized.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html
  - id: s3-crr
    text: S3 Cross-Region Replication copies objects asynchronously to a bucket in another Region, and with versioning you can choose a restore point.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#backup-and-restore
  - id: ddb-global
    text: DynamoDB global tables are multi-active and multi-Region, with fast local reads and writes in each replica Region.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html
diagrams:
  - id: multi-region-warm-standby
    title: Warm standby in a second Region with DNS failover
    width: 1240
    height: 700
    groups:
      - { label: Primary Region, x: 20, y: 260, w: 580, h: 420, tone: neutral, icon: group-region }
      - { label: DR Region, x: 640, y: 260, w: 580, h: 420, tone: neutral, icon: group-region }
    nodes:
      - { id: users, label: Users, x: 545, y: 20, w: 150, h: 72, tone: user, icon: res-users }
      - { id: dns, label: Route 53, sub: failover routing, x: 545, y: 140, w: 150, h: 86, tone: network, icon: route-53, info: "Primary record with a health check, secondary record for the DR Region." }
      - { id: albp, label: ALB, sub: primary, x: 60, y: 310, w: 140, h: 86, tone: network, icon: res-elastic-load-balancing-application-load-balancer }
      - { id: asgp, label: Auto Scaling, sub: full capacity, x: 260, y: 310, w: 140, h: 86, tone: compute, icon: ec2-auto-scaling }
      - { id: dbp, label: Aurora, sub: primary cluster, x: 440, y: 310, w: 140, h: 86, tone: database, icon: aurora, info: "Takes all writes for the global database." }
      - { id: s3p, label: S3 bucket, sub: versioned, x: 260, y: 540, w: 140, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: dbd, label: Aurora, sub: secondary cluster, x: 660, y: 310, w: 140, h: 86, tone: database, icon: aurora, info: "Read-only until it is promoted by a switchover or failover." }
      - { id: asgd, label: Auto Scaling, sub: scaled down, x: 840, y: 310, w: 140, h: 86, tone: compute, icon: ec2-auto-scaling, info: "Running at reduced size. On failover, raise its capacity to production size." }
      - { id: albd, label: ALB, sub: standby, x: 1040, y: 310, w: 140, h: 86, tone: network, icon: res-elastic-load-balancing-application-load-balancer }
      - { id: s3d, label: S3 bucket, sub: replica, x: 840, y: 540, w: 140, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
    edges:
      - { from: users, to: dns, step: 1 }
      - { from: dns, to: albp, step: 2 }
      - { from: albp, to: asgp, step: 2 }
      - { from: asgp, to: dbp, step: 2 }
      - { from: asgp, to: s3p, step: 2 }
      - { from: dbp, to: dbd, step: 3 }
      - { from: s3p, to: s3d, step: 4 }
      - { from: dns, to: albd, step: 5, dashed: true }
      - { from: albd, to: asgd, step: 5, dashed: true }
      - { from: asgd, to: dbd, step: 5, dashed: true }
      - { from: asgd, to: s3d, step: 5, dashed: true }
    steps:
      - "Users resolve the domain. Route 53 failover routing answers with the primary Region while its health check passes."
      - "The primary Region serves all traffic at full capacity."
      - "Aurora Global Database keeps a read-only secondary cluster synchronized in the DR Region."
      - "S3 Cross-Region Replication copies objects to a versioned bucket in the DR Region."
      - "If the primary fails its health check, Route 53 answers with the DR Region. The standby already serves at reduced size, scales out, and the Aurora secondary is promoted to take writes."
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
    facts: [r53-active-passive]
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
    a: "Define it once in **CloudFormation** and deploy the same template to both Regions (and accounts)."
    facts: [iac-regions]
---
Disaster recovery questions give a recovery time and a budget, then ask for the cheapest strategy that meets them. Warm standby is the middle ground the exams use most: a second Region already runs the full stack at small size, data replicates continuously, and DNS moves users over when the primary fails.

### How it works

1. Route 53 failover routing answers with the primary Region while its health check passes. [Active-passive failover](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html)
2. Aurora Global Database keeps a read-only cluster in the DR Region, and S3 Cross-Region Replication copies objects to a versioned bucket there.
3. The DR Region runs the same stack, deployed from the same CloudFormation template, with a smaller Auto Scaling group.
4. When the primary fails its health check, Route 53 answers with the DR Region. The standby takes traffic at once, scales out, and the Aurora secondary is promoted to take writes.

| Strategy | DR Region before the event | Recovery |
|---|---|---|
| Backup and restore | Backups only | Slowest: rebuild infrastructure, restore data |
| Pilot light | Data stores running, app servers off | Start or deploy app servers, then switch |
| Warm standby | Full stack running at reduced size | Takes traffic at once, then scales out |
| Multi-site active/active | Full stack serving traffic | Traffic already spread across Regions |

### Exam cues

- If the question says the cheapest option and hours of downtime are acceptable, think backup and restore, because nothing runs in the DR Region.
- If the question says data must be live in the DR Region but compute can start after the event, think pilot light.
- If the question says recover in minutes at reduced cost, think warm standby, because the stack is already running.
- If the question says writes in every Region, think DynamoDB global tables, because Aurora Global Database writes in one primary Region.
- If the question says fail DNS over automatically, think Route 53 failover routing with health checks.

### Remember

- Aurora Global Database: one primary Region, up to 10 read-only secondaries.
- DynamoDB global tables: multi-active, multi-Region.
- S3 CRR is asynchronous; versioning gives restore points.
- Pilot light cannot serve without action; warm standby can.

> **Trap:** Replication is not a backup. Corruption and deletions replicate too, so keep versioning or point-in-time recovery alongside it.
