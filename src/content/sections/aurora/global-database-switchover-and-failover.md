---
title: Global database switchover and failover
level: associate
order: 20
facts:
  - id: global-full-copy
    text: Aurora Global Database replicates the primary database to secondary Regions as full copies of its data.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html#aurora-global-database-overview
  - id: global
    text: Aurora Global Database replicates asynchronously from a primary Region to secondary Regions for regional reads and disaster recovery.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html#Concepts.AuroraHighAvailability.GlobalDB
  - id: rpo
    text: Recovery point objective measures acceptable data loss as a time interval.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-bcdr-planning
  - id: rto
    text: Recovery time objective measures the time needed to resume service after an outage.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-bcdr-planning
  - id: switch
    text: Switchover, formerly managed planned failover, synchronizes the selected secondary before changing primary Region and has RPO zero.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-disaster-recovery.managed-failover
  - id: switch-roles
    text: Switchover makes the old primary read-only, promotes a writer in the selected secondary and preserves the existing regional topology, with a brief interruption.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-disaster-recovery.managed-failover
  - id: failover
    text: Managed failover handles an unplanned outage without waiting for synchronization; asynchronous replication lag can cause lost writes.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned
  - id: allow-loss
    text: The failover-global-cluster CLI operation uses --allow-data-loss to request failover that can lose unreplicated writes.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned.cli
  - id: versions
    text: Managed switchover and failover require equal major and minor engine versions; allowed patch-level differences depend on the engine version.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned
  - id: lag
    text: Choose the secondary with the least replication lag to minimize failover data loss.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned
  - id: stop-writes
    text: AWS recommends taking applications offline before managed failover to prevent writes to the old primary; automatic write fencing is best effort and split-brain remains possible.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned
  - id: endpoint
    text: The global writer endpoint keeps the same name and points to the new primary after switchover or failover; applications must observe the DNS change before resuming writes.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned
  - id: configuration
    text: A promoted secondary does not inherit the old primary parameter groups, monitoring settings or service integrations; these must be aligned for the new Region.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned
  - id: proxy-endpoint
    text: After Global Database failover, RDS Proxy users must direct writes to the read/write proxy endpoint associated with the new primary cluster.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned
  - id: rebuild
    text: Managed failover rebuilds other secondary clusters and adds the recovered old primary back as a secondary; switchover can later return the primary role to the original Region.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned
  - id: headless
    text: A secondary without database instances needs an instance added before switchover or failover.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-bcdr-planning
  - id: snapshot-copy
    text: Aurora DB clusters do not support native cross-Region automated backup replication; cluster snapshots can be copied to another Region for recovery.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.Retaining.html#Aurora.Managing.Backups.Retaining.Limits
  - id: backup-copy
    text: AWS Backup supports Aurora cross-Region backup copies; copies of continuous backups become snapshot recovery points without point-in-time recovery.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/backup-feature-availability.html#features-by-resource
  - id: event-subscription
    text: Aurora event subscriptions select database resources and event categories and publish notifications to an SNS topic.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_Events.Subscribing.html#USER_Events.Subscribing
  - id: sns-permissions
    text: RDS event publishing requires permissions on the SNS topic; a custom topic policy can restrict source resources or allow cross-account notification.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_Events.GrantingPermissions.html#USER_Events.GrantingPermissions
  - id: rpo-seconds
    text: "An Aurora global database replicates asynchronously, so the RPO of an unplanned cross-Region failover is typically measured in seconds rather than zero."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html
  - id: managed-rpo
    text: "For an Aurora PostgreSQL global database, the rds.global_db_rpo parameter sets a target RPO; when every secondary lags beyond it, the primary pauses commits until one catches up."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html
  - id: storage-latency
    text: "Aurora Global Database uses storage-based replication with typical cross-Region latency below one second."
    source: https://docs.aws.amazon.com/rds/latest/auroraextendedcontent/aurora-features-availability.html#aurora-features-global-database
  - id: logical-lag
    text: "Aurora cross-Region binlog replication lag depends on change rates, apply rates and network delays, and can grow without bound."
    source: https://docs.aws.amazon.com/rds/latest/auroraextendedcontent/aurora-faq-availability-and-durability.html
  - id: parallel-global
    text: "Aurora MySQL 5.7 supports using Parallel Query together with Aurora Global Database."
    source: https://aws.amazon.com/about-aws/whats-new/2020/09/announcing-aurora-parallel-query-region-expansion-and-mysql-5-7-compatibility/
cards:
  - id: aurora-059
    q: "Can region-restricted data remain inside an Aurora Global Database if a secondary Region is outside its allowed locations?"
    a: "No. The global database replicates the primary data to its secondary Regions. Keep restricted data outside that replicated database or choose permitted Regions."
    facts: [global-full-copy]
  - id: aurora-003
    q: An Aurora Global Database must move its primary Region during planned maintenance without data loss. How does this differ from disaster failover?
    a: "Use switchover: it synchronizes the target and has RPO zero. Unplanned failover does not wait for synchronization and can lose writes; --allow-data-loss explicitly accepts that risk."
    trap: true
    facts:
      - switch
      - failover
      - allow-loss
  - id: aurora-004
    q: What should an Aurora Global Database team prepare before and after a managed failover?
    a: Stop old-primary writes, choose the least-lag secondary and use the global writer endpoint. Check engine compatibility, DNS changes, parameter groups, monitoring and regional integrations before resuming writes.
    facts:
      - stop-writes
      - lag
      - endpoint
      - versions
      - configuration
  - id: aurora-019
    q: An Aurora cross-Region recovery design proposes native automated backup replication. Is that supported?
    a: No. Use copied cluster snapshots, supported AWS Backup copies or Global Database replication. A copied continuous backup is a snapshot recovery point without PITR.
    trap: true
    facts:
      - snapshot-copy
      - backup-copy
      - global
  - id: aurora-020
    q: An Aurora team needs database event notifications for recovery workflows. What should it configure?
    a: An event subscription selecting resources and event categories, targeting an SNS topic with permission for RDS to publish.
    facts:
      - event-subscription
      - sns-permissions
  - id: aurora-021
    q: An Aurora Global Database failed over, but clients use an RDS Proxy in the old primary Region. What connection change is required?
    a: Direct writes to the read/write endpoint of the proxy associated with the new primary cluster.
    facts:
      - proxy-endpoint
  - id: aurora-022
    q: Can an Aurora Global Database immediately promote a headless secondary during switchover or failover?
    a: No. Add a database instance to that secondary first. Headless means the secondary has storage but no database instance.
    trap: true
    facts:
      - headless
  - id: aurora-047
    q: "Does an Aurora global database guarantee replication lag below one second, so an unplanned Region failover loses no data?"
    a: "No. Replication is asynchronous; the RPO of an unplanned failover is typically some seconds.\nA switchover synchronizes first and has RPO zero."
    trap: true
    facts: [rpo-seconds]
  - id: aurora-048
    q: "An Aurora PostgreSQL global database must never lose more than a set amount of recent data in a Region failover. Which setting enforces that, and what is the trade-off?"
    a: "`rds.global_db_rpo`. When every secondary lags beyond it, the primary pauses commits until one catches up."
    facts: [managed-rpo]
  - id: aurora-054
    q: "Does Aurora Global Database guarantee cross-Region replication lag below one second?"
    a: "No. Storage-based replication typically takes less than one second, but the figure is not a guarantee."
    facts: [storage-latency]
  - id: aurora-055
    q: "What affects cross-Region Aurora binlog replication lag?"
    a: "Change and apply rates and network delays; lag can grow without bound."
    facts: [logical-lag]
  - id: aurora-056
    q: "Can Aurora MySQL 5.7 use Parallel Query with Aurora Global Database?"
    a: "Yes. AWS supports using the features together."
    facts: [parallel-global]
diagrams:
  - id: aurora-global-switchover
    title: Planned switchover synchronizes before changing the writer
    width: 1080
    height: 210
    nodes:
      - id: n0
        label: Primary Region
        sub: current writer
        icon: aurora
        x: 30
        y: 65
        w: 210
        h: 86
        tone: database
      - id: n1
        label: Secondary Region
        sub: synchronize first
        icon: aurora
        x: 300
        y: 65
        w: 210
        h: 86
        tone: database
      - id: n2
        label: New primary
        sub: promote target writer
        icon: aurora
        x: 570
        y: 65
        w: 210
        h: 86
        tone: database
      - id: n3
        label: Global endpoint
        sub: follows new primary
        icon: aurora
        x: 840
        y: 65
        w: 210
        h: 86
        tone: database
    edges:
      - from: n0
        to: n1
        step: 1
      - from: n1
        to: n2
        step: 2
      - from: n2
        to: n3
        step: 3
    steps:
      - Aurora synchronizes the selected secondary before a planned switchover.
      - The old primary becomes read-only and the target assumes the primary role.
      - The global writer endpoint points to the new primary; observe its DNS change before resuming writes.
---
Aurora Global Database keeps copies of a database in multiple Regions using asynchronous replication, meaning a write can commit before a secondary receives it. Switchover moves the primary role during a planned operation; failover recovers from an outage that prevents normal synchronization.

Recovery point objective (RPO) measures how much recent data can be lost, expressed as time. Recovery time objective (RTO) measures how long service takes to resume.

### How it works

1. Prepare a secondary with database instances and compatible engine versions. Managed operations require matching major and minor versions; permitted patch differences depend on the version. A headless secondary, meaning storage without database instances, needs an instance before promotion.
2. For a planned move, use switchover. Aurora synchronizes the target, makes the old primary read-only and promotes a writer in the target Region. The topology stays intact and RPO is zero, though the role change briefly interrupts service.
3. For an outage, stop application writes to the old primary and select the least-lag secondary. Managed failover does not wait for synchronization and can lose unreplicated writes. Write fencing, Aurora's attempt to block writes to the old primary, is best effort; split-brain means both sides might accept writes.
4. Use the global writer endpoint, the stable hostname that follows the primary Region. Confirm DNS changes, meaning the hostname resolves to the new destination, before resuming writes. With RDS Proxy, use the read/write proxy endpoint associated with the new primary.
5. Align parameter groups, monitoring and regional service integrations. They are not inherited. Managed failover rebuilds the other secondaries and adds the recovered old primary back as a secondary; later switchover can return the primary role.

| Recovery choice | Data and operation behavior |
|---|---|
| Switchover | Synchronizes first; planned role change with RPO zero |
| Managed failover | Promotes without waiting for synchronization; possible data loss |
| Copied cluster snapshot | Restores backup data in another Region |
| AWS Backup cross-Region copy | Produces a copied recovery point; continuous copies become snapshots without PITR |

Point-in-time recovery (PITR) means restoring to a selected time within retained backup history. Aurora does not support native cross-Region automated backup replication. Use copied cluster snapshots, supported AWS Backup copies or database replication for regional recovery.

For event notifications, configure an Aurora event subscription with resources, event categories and an SNS topic. The topic must permit RDS event publishing; its policy can restrict source resources or allow cross-account notifications.

### Exam cues

- If the question says data must stay within permitted Regions, think about every Aurora Global Database secondary, because each receives a copy of the primary data.
- If the question says combine Aurora MySQL 5.7 Parallel Query with a global database, think a supported configuration, because AWS supports those features together.
- If the question says cross-Region binlog replication is falling behind, think workload and network delay, because logical replication lag can grow without bound.
- If the question says Aurora Global Database must replicate across Regions, think storage-based replication, because its typical latency is below one second but is not a maximum.
- If the question says a planned primary-Region move must avoid data loss, think switchover, because the target synchronizes first.
- If the question says a primary Region is unavailable, think failover to the least-lag secondary, because waiting for the failed Region to synchronize is not the recovery path.
- If the question says regional recovery from backup, think copied cluster snapshots or supported AWS Backup copies, because Aurora lacks native automated backup replication across Regions.
- If the question says database events should notify recovery workflows, think event subscriptions to SNS, because they publish selected event categories from selected resources.

### Remember

- Switchover RPO: 0. Failover can lose unreplicated writes; --allow-data-loss accepts this.
- Parameter groups, alarms and service integrations need regional alignment.
- Unplanned failover RPO: typically seconds. Aurora PostgreSQL `rds.global_db_rpo` pauses primary commits when every secondary lags past it.

> **Trap:** Global replication is asynchronous. An unchanged endpoint name does not remove replication loss or DNS propagation concerns during failover.
