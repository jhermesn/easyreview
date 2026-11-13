---
title: Global database switchover and failover
level: professional
order: 20
facts:
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
  - id: lag-metrics
    text: AuroraGlobalDBRPOLag reports lag in milliseconds for Aurora PostgreSQL and Aurora MySQL 3.04.0 or 2.12.0 and later; older MySQL versions use AuroraGlobalDBReplicationLag.
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
  - id: manual
    text: If engine versions prevent managed failover, manual failover stops old-primary writes, detaches the least-lag secondary as a writable standalone cluster, redirects clients and recreates the global topology.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.manual-unplanned
  - id: headless
    text: A secondary without database instances needs an instance added before switchover or failover.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-bcdr-planning
  - id: rpo-parameter
    text: Aurora PostgreSQL rds.global_db_rpo supports a configured RPO threshold starting at 20 seconds.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-set-rpo
  - id: rpo-block
    text: When all secondary clusters exceed the configured rds.global_db_rpo threshold, Aurora PostgreSQL blocks primary commits until at least one secondary catches up.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-manage-recovery
  - id: two-regions
    text: For a two-Region PostgreSQL global database, AWS recommends leaving rds.global_db_rpo at its default in the secondary until the old primary has been rebuilt after failover.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-manage-recovery
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
cards:
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
  - id: aurora-005
    q: How can an Aurora PostgreSQL global database enforce a recovery point threshold, and what availability tradeoff follows?
    a: Set rds.global_db_rpo to at least 20 seconds. If every secondary exceeds it, primary commits block until one catches up. For two Regions, keep the secondary default until the failed Region is rebuilt.
    facts:
      - rpo-parameter
      - rpo-block
      - two-regions
  - id: aurora-017
    q: An Aurora Global Database team needs a lag metric before choosing a failover target. Which metric and units apply?
    a: AuroraGlobalDBRPOLag in milliseconds for PostgreSQL and MySQL 3.04.0 or 2.12.0 and later. Older MySQL versions use AuroraGlobalDBReplicationLag.
    facts:
      - lag-metrics
  - id: aurora-018
    q: An Aurora Global Database has incompatible engine versions for managed failover. What recovery path remains?
    a: "Manual failover: stop writes to the old primary, detach the least-lag secondary into a writable standalone cluster, redirect clients and rebuild the global topology."
    facts:
      - manual
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
  - id: aurora-023
    q: An Aurora Global Database uses the global writer endpoint. Is its unchanged hostname enough to restart writes immediately after failover?
    a: No. Verify DNS changes and connectivity to the new primary before resuming writes. Stop old-primary writes to reduce split-brain risk because write fencing is best effort.
    trap: true
    facts:
      - endpoint
      - stop-writes
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
6. If versions prevent managed failover, detach the least-lag secondary into a writable standalone cluster, redirect clients and recreate the global topology after stopping writes to the old primary.

| Recovery choice | Data and operation behavior |
|---|---|
| Switchover | Synchronizes first; planned role change with RPO zero |
| Managed failover | Promotes without waiting for synchronization; possible data loss |
| Copied cluster snapshot | Restores backup data in another Region |
| AWS Backup cross-Region copy | Produces a copied recovery point; continuous copies become snapshots without PITR |

Point-in-time recovery (PITR) means restoring to a selected time within retained backup history. Aurora does not support native cross-Region automated backup replication. Use copied cluster snapshots, supported AWS Backup copies or database replication for regional recovery.

For Aurora PostgreSQL, rds.global_db_rpo can enforce a lag threshold. If every secondary exceeds it, commits on the primary block until at least one catches up. In a two-Region deployment, keep the secondary's default until the failed Region is rebuilt to avoid blocking the new primary.

For event notifications, configure an Aurora event subscription with resources, event categories and an SNS topic. The topic must permit RDS event publishing; its policy can restrict source resources or allow cross-account notifications.

### Exam cues

- If the question says a planned primary-Region move must avoid data loss, think switchover, because the target synchronizes first.
- If the question says a primary Region is unavailable, think failover to the least-lag secondary, because waiting for the failed Region to synchronize is not the recovery path.
- If the question says bound PostgreSQL global data loss, think rds.global_db_rpo, because it blocks commits when every secondary exceeds the threshold.
- If the question says regional recovery from backup, think copied cluster snapshots or supported AWS Backup copies, because Aurora lacks native automated backup replication across Regions.
- If the question says database events should notify recovery workflows, think event subscriptions to SNS, because they publish selected event categories from selected resources.

### Remember

- Switchover RPO: 0. Failover can lose unreplicated writes; --allow-data-loss accepts this.
- AuroraGlobalDBRPOLag uses milliseconds for PostgreSQL and MySQL 3.04.0 or 2.12.0 and later. Earlier MySQL versions use AuroraGlobalDBReplicationLag.
- The configured PostgreSQL rds.global_db_rpo threshold starts at 20 seconds.
- Parameter groups, alarms and service integrations need regional alignment.

> **Trap:** Global replication is asynchronous. An unchanged endpoint name does not remove replication loss or DNS propagation concerns during failover.
