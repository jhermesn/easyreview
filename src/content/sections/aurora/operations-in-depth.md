---
title: Global recovery and capacity operations
level: professional
order: 50
facts:
  - id: rpo-parameter
    text: Aurora PostgreSQL rds.global_db_rpo supports a configured RPO threshold starting at 20 seconds.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-set-rpo
  - id: rpo-block
    text: When all secondary clusters exceed the configured rds.global_db_rpo threshold, Aurora PostgreSQL blocks primary commits until at least one secondary catches up.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-manage-recovery
  - id: two-regions
    text: For a two-Region PostgreSQL global database, AWS recommends leaving rds.global_db_rpo at its default in the secondary until the old primary has been rebuilt after failover.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-manage-recovery
  - id: lag-metrics
    text: AuroraGlobalDBRPOLag reports lag in milliseconds for Aurora PostgreSQL and Aurora MySQL 3.04.0 or 2.12.0 and later; older MySQL versions use AuroraGlobalDBReplicationLag.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned
  - id: manual
    text: If engine versions prevent managed failover, manual failover stops old-primary writes, detaches the least-lag secondary as a writable standalone cluster, redirects clients and recreates the global topology.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.manual-unplanned
  - id: endpoint
    text: The global writer endpoint keeps the same name and points to the new primary after switchover or failover; applications must observe the DNS change before resuming writes.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned
  - id: stop-writes
    text: AWS recommends taking applications offline before managed failover to prevent writes to the old primary; automatic write fencing is best effort and split-brain remains possible.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned
  - id: global-limits
    text: "An Aurora global database has one primary Region and up to 10 read-only secondary Regions; a secondary cluster can hold up to 16 reader instances."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html#aurora-global-database-overview
  - id: upper
    text: Supported Aurora MySQL Serverless v2 configurations can reach 256 ACUs, depending on engine and platform version.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.capacity
  - id: postgres-upper
    text: Supported Aurora PostgreSQL Serverless v2 configurations can reach 384 ACUs, depending on engine and platform version.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.capacity
  - id: platform
    text: The available Aurora Serverless v2 range is limited by the less capable of its engine version and platform version; platform availability also varies by Region.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.capacity
  - id: increments
    text: Aurora Serverless v2 capacity scales in increments as small as 0.5 ACU.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.scaling
  - id: auto-pause
    text: On supported versions, setting minimum capacity to 0 ACUs enables auto-pause after a period without user connections; a connection attempt resumes the instance.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-enabling
  - id: high-priority
    text: Serverless v2 readers in promotion tiers 0 and 1 have a minimum tied to current writer capacity, within the configured maximum, to prepare for failover.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.scaling
  - id: independent
    text: Serverless v2 readers in promotion tiers 2 through 15 scale independently within the cluster range and might need to scale up after promotion.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.scaling
  - id: pause-interval
    text: SecondsUntilAutoPause allows an idle interval from 300 to 86400 seconds.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-timeout
  - id: pause-default
    text: SecondsUntilAutoPause defaults to 300 seconds when no interval is specified.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-timeout
  - id: pause-proxy
    text: RDS Proxy prevents Serverless v2 auto-pause because it keeps database connections open.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-whynot
  - id: pause-global
    text: Global Database primary writers and their tier 0 or 1 readers do not auto-pause; Serverless instances in secondary global clusters do not auto-pause either.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-whynot
  - id: global
    text: Aurora Global Database secondary clusters can use Serverless v2 compute capacity for disaster recovery.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless.ha
  - id: compute
    text: Aurora Serverless v2 scales compute capacity for each writer or reader within a cluster-level minimum and maximum capacity range.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works
  - id: pause-tiers
    text: The Serverless writer and tier 0 or 1 readers pause and resume together; readers in tiers 2 through 15 can pause independently.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-multi-az
  - id: metrics
    text: ServerlessDatabaseCapacity reports the current capacity of a Serverless instance in ACUs.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.setting-capacity.html#aurora-serverless-v2.viewing.monitoring
  - id: acu-utilization
    text: ACUUtilization is current ServerlessDatabaseCapacity divided by configured maximum ACUs, expressed as a percentage.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.setting-capacity.html#aurora-serverless-v2.viewing.monitoring
  - id: created
    text: Aurora Auto Scaling creates readers with the writer instance class and promotion tier 15 by default.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling
  - id: tier
    text: Aurora promotion priorities range from 0 for highest priority to 15 for lowest priority.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html#Aurora.Managing.FaultTolerance
  - id: tier-tie
    text: Within equal promotion priority, Aurora favors the larger instance, then an arbitrary instance if sizes also match.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html#Aurora.Managing.FaultTolerance
  - id: tier-exception
    text: After five unsuccessful Aurora failover attempts, promotion tiers are no longer considered.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html#Aurora.Managing.FaultTolerance
cards:
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
  - id: aurora-023
    q: An Aurora Global Database uses the global writer endpoint. Is its unchanged hostname enough to restart writes immediately after failover?
    a: No. Verify DNS changes and connectivity to the new primary before resuming writes. Stop old-primary writes to reduce split-brain risk because write fencing is best effort.
    trap: true
    facts:
      - endpoint
      - stop-writes
  - id: aurora-044
    q: "How many secondary Regions can an Aurora global database have, and how many readers can a secondary cluster run?"
    a: "Up to 10 secondary Regions, each with up to 16 read-only instances."
    facts: [global-limits]
  - id: aurora-007
    q: Which Aurora Serverless v2 capacity and configuration limits should be checked before deployment?
    a: Check engine, platform and Region support. Supported MySQL configurations reach 256 ACUs and PostgreSQL 384; capacity changes can be as small as 0.5 ACU. A zero minimum enables auto-pause only on supported versions.
    facts:
      - upper
      - postgres-upper
      - platform
      - increments
      - auto-pause
  - id: aurora-008
    q: An Aurora Serverless v2 reader must be ready to take over the writer workload. Which promotion tier should it use?
    a: Tier 0 or 1. Its capacity floor follows the writer within the configured maximum. Tiers 2 through 15 scale independently and can need to scale up after promotion.
    trap: true
    facts:
      - high-priority
      - independent
  - id: aurora-024
    q: An Aurora Serverless v2 development database should pause when unused. Which settings enable this?
    a: On a supported version, set minimum capacity to 0 ACUs and configure SecondsUntilAutoPause. Its default is 300 seconds; the range is 300 to 86400 seconds.
    facts:
      - auto-pause
      - pause-interval
      - pause-default
  - id: aurora-025
    q: An Aurora Serverless v2 cluster has minimum capacity 0 but uses RDS Proxy. Why does it remain active?
    a: RDS Proxy maintains database connections, preventing auto-pause. Zero minimum alone does not ensure pausing.
    trap: true
    facts:
      - pause-proxy
      - auto-pause
  - id: aurora-026
    q: Can an Aurora Global Database Serverless v2 secondary pause to zero during an idle period?
    a: No. Serverless instances in global secondary clusters do not auto-pause, although they can scale compute within their configured range.
    trap: true
    facts:
      - pause-global
      - global
      - compute
  - id: aurora-027
    q: An Aurora Serverless v2 writer is active while a reporting reader should scale independently. Which tier fits?
    a: A promotion tier from 2 through 15. Those readers scale independently and can pause independently if all auto-pause conditions are met.
    facts:
      - independent
      - pause-tiers
  - id: aurora-028
    q: Which Aurora Serverless v2 metrics show current compute capacity and capacity utilization?
    a: ServerlessDatabaseCapacity reports current ACUs. ACUUtilization is that capacity as a percentage of the configured maximum.
    facts:
      - metrics
      - acu-utilization
  - id: aurora-013
    q: Which class and promotion tier does Aurora Auto Scaling assign to a new reader by default?
    a: The writer instance class and promotion tier 15, the lowest promotion priority.
    facts:
      - created
      - tier
      - tier-tie
  - id: aurora-016
    q: How does Aurora normally select a reader to promote when several are available?
    a: Lower promotion tier numbers take priority, from 0 to 15. Equal tiers favor the larger instance, then an arbitrary equal-size instance; tiers are ignored after five unsuccessful attempts.
    facts:
      - tier
      - tier-tie
      - tier-exception
---
Aurora operations involve recovery choices, Serverless v2 capacity settings and reader promotion priorities. These controls affect recovery point objectives, instance capacity and failover readiness.

### How it works

1. For an Aurora PostgreSQL global database, set `rds.global_db_rpo` to a recovery point objective (RPO) threshold of at least 20 seconds. If all secondary clusters exceed it, primary commits block until one catches up. In a two-Region database, leave the secondary's parameter at its default until the old primary is rebuilt after failover. See [setting the RPO](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-set-rpo) and [managing recovery](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-manage-recovery).
2. Before managed failover, take applications offline to stop writes to the old primary. Check lag when choosing a target. The global writer endpoint keeps its name but applications must observe its DNS change before resuming writes. If incompatible engine versions prevent managed failover, stop old-primary writes, detach the least-lag secondary as a writable standalone cluster, redirect clients and rebuild the global topology. See [managed failover](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned) and [manual failover](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.manual-unplanned).
3. Set a cluster capacity range for Serverless v2 instances. The available range depends on the less capable of the engine and platform versions, and platform availability varies by Region. Capacity can change in increments as small as 0.5 Aurora capacity units (ACUs). See [capacity](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.capacity) and [scaling](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.scaling).
4. Choose promotion tiers for readers. Serverless readers in tiers 0 and 1 have a capacity floor tied to the writer, within the configured maximum. Readers in tiers 2 through 15 scale independently and might need to scale up after promotion. Aurora normally favors lower tier numbers, then the larger instance when tiers match; if sizes also match, it picks arbitrarily. After five unsuccessful attempts, tiers are ignored. See [Serverless scaling](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.scaling) and [fault tolerance](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html#Aurora.Managing.FaultTolerance).
5. On supported versions, set the minimum to 0 ACUs to enable auto-pause after an interval without user connections. A connection attempt resumes the instance. The writer and tier 0 or 1 readers pause and resume together; tiers 2 through 15 can pause independently. See [enabling auto-pause](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-enabling) and [cluster configurations](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-multi-az).

### Exam cues

- If the question says choose a global failover target, think replication lag: `AuroraGlobalDBRPOLag` reports milliseconds for PostgreSQL and MySQL 3.04.0 or 2.12.0 and later; older MySQL versions use `AuroraGlobalDBReplicationLag`. See [managed failover](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned).
- If the question says a Serverless reader must be ready for the writer workload, think tier 0 or 1, because its capacity floor follows the writer within the configured maximum. For an independently scaling reporting reader, think tier 2 through 15. See [Serverless scaling](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.scaling).
- If the question says measure Serverless compute, think `ServerlessDatabaseCapacity` for current ACUs and `ACUUtilization` for current capacity as a percentage of the configured maximum. See [monitoring capacity](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.setting-capacity.html#aurora-serverless-v2.viewing.monitoring).
- If the question says a new Auto Scaling reader's promotion priority, think tier 15 and the writer's instance class. See [Aurora Auto Scaling](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html#Aurora.Integrating.AutoScaling).

### Remember

- A global database has one primary Region and up to 10 secondary Regions, each secondary cluster with up to 16 readers. See [global database overview](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html#aurora-global-database-overview).
- Supported Serverless v2 configurations reach up to 256 ACUs for MySQL and 384 ACUs for PostgreSQL, depending on engine and platform versions. See [capacity](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.capacity).
- `SecondsUntilAutoPause` defaults to 300 seconds and accepts 300 to 86400 seconds. See [auto-pause timeout](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-timeout).
- Global secondary clusters can use Serverless v2 compute, but their Serverless instances do not auto-pause. Global primary writers and their tier 0 or 1 readers do not auto-pause either. See [high availability](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless.ha) and [auto-pause limitations](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-whynot).

> **Trap:** An unchanged global writer hostname does not mean applications have observed the new DNS destination. Stop old-primary writes because automatic write fencing is best effort and split-brain remains possible. A zero Serverless minimum does not guarantee auto-pause either: RDS Proxy keeps database connections open. See [managed failover](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover.managed-unplanned) and [auto-pause limitations](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-whynot).
