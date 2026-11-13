---
title: Serverless v2 capacity and promotion
level: associate
order: 30
facts:
  - id: compute
    text: Aurora Serverless v2 scales compute capacity for each writer or reader within a cluster-level minimum and maximum capacity range.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works
  - id: acu
    text: An Aurora capacity unit represents approximately 2 GiB of memory with corresponding CPU and networking resources.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.capacity
  - id: increments
    text: Aurora Serverless v2 capacity scales in increments as small as 0.5 ACU.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.scaling
  - id: upper
    text: Supported Aurora MySQL Serverless v2 configurations can reach 256 ACUs, depending on engine and platform version.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.capacity
  - id: postgres-upper
    text: Supported Aurora PostgreSQL Serverless v2 configurations can reach 384 ACUs, depending on engine and platform version.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.capacity
  - id: platform
    text: The available Aurora Serverless v2 range is limited by the less capable of its engine version and platform version; platform availability also varies by Region.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.capacity
  - id: range
    text: A cluster must define ServerlessV2ScalingConfiguration before instances of class db.serverless can be added.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.requirements.html#aurora-serverless-v2.requirements.capacity-range
  - id: nondisruptive
    text: Aurora Serverless v2 can scale during open connections and active transactions without waiting for a quiet point or disrupting current database operations.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.scaling
  - id: mixed
    text: Aurora clusters can combine provisioned and Serverless v2 instances.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.cluster_topology
  - id: metrics
    text: ServerlessDatabaseCapacity reports the current capacity of a Serverless instance in ACUs.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.setting-capacity.html#aurora-serverless-v2.viewing.monitoring
  - id: acu-utilization
    text: ACUUtilization is current ServerlessDatabaseCapacity divided by configured maximum ACUs, expressed as a percentage.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.setting-capacity.html#aurora-serverless-v2.viewing.monitoring
  - id: high-priority
    text: Serverless v2 readers in promotion tiers 0 and 1 have a minimum tied to current writer capacity, within the configured maximum, to prepare for failover.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.scaling
  - id: provisioned-writer
    text: With a provisioned writer, a tier 0 or 1 Serverless v2 reader uses the ACU equivalent of writer memory for its capacity floor.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.scaling
  - id: independent
    text: Serverless v2 readers in promotion tiers 2 through 15 scale independently within the cluster range and might need to scale up after promotion.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.scaling
  - id: storage
    text: Serverless v2 uses the same six-copy, three-Availability-Zone Aurora storage as provisioned capacity; compute scaling does not resize stored data.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless.storage
  - id: global
    text: Aurora Global Database secondary clusters can use Serverless v2 compute capacity for disaster recovery.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless.ha
  - id: auto-pause
    text: On supported versions, setting minimum capacity to 0 ACUs enables auto-pause after a period without user connections; a connection attempt resumes the instance.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-enabling
  - id: nonzero
    text: Setting minimum capacity to 0.5 ACU or greater turns off auto-pause.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-disabling
  - id: pause-interval
    text: SecondsUntilAutoPause allows an idle interval from 300 to 86400 seconds.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-timeout
  - id: pause-default
    text: SecondsUntilAutoPause defaults to 300 seconds when no interval is specified.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-timeout
  - id: pause-tiers
    text: The Serverless writer and tier 0 or 1 readers pause and resume together; readers in tiers 2 through 15 can pause independently.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-multi-az
  - id: pause-proxy
    text: RDS Proxy prevents Serverless v2 auto-pause because it keeps database connections open.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-whynot
  - id: pause-global
    text: Global Database primary writers and their tier 0 or 1 readers do not auto-pause; Serverless instances in secondary global clusters do not auto-pause either.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-whynot
  - id: pause-cost
    text: Paused Serverless v2 instances have no instance-capacity charge, but storage and other cluster charges continue.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-billing
  - id: resume
    text: A connection to an auto-paused instance must wait for it to resume, so applications must tolerate resume latency.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-resuming
  - id: reader-count
    text: Aurora Auto Scaling reader-count policies are unsupported for Serverless v2; create readers in advance and let them scale compute.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.requirements.html#aurora-serverless-v2.limitations
cards:
  - id: aurora-006
    q: An Aurora workload has unpredictable bursts. What does Serverless v2 scale, and does ordinary capacity scaling require idle connections?
    a: It scales each writer or reader compute capacity within the cluster ACU range. An ACU includes about 2 GiB of memory with CPU and networking. Capacity scaling can occur during open connections and active transactions.
    facts:
      - compute
      - acu
      - nondisruptive
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
  - id: aurora-029
    q: Can Aurora Serverless v2 mix with provisioned instances, and what keeps a high-priority Serverless reader ready for a provisioned writer?
    a: Yes. Mixed clusters are supported; a tier 0 or 1 Serverless reader uses the ACU equivalent of the writer memory as its capacity floor.
    facts:
      - mixed
      - provisioned-writer
  - id: aurora-030
    q: Does auto-pausing an Aurora Serverless v2 instance stop every cluster charge and allow immediate connections?
    a: No. Instance-capacity charges pause, but storage and other charges continue. New connections wait for resume.
    trap: true
    facts:
      - pause-cost
      - resume
diagrams:
  - id: aurora-serverless-promotion-tiers
    title: Promotion tiers choose shared or independent capacity
    width: 1000
    height: 470
    nodes:
      - id: writer
        label: Writer
        icon: aurora
        sub: current compute capacity
        x: 30
        y: 190
        w: 230
        h: 86
        tone: database
      - id: ready
        label: Tier 0 or 1
        icon: aurora
        sub: floor follows writer
        x: 530
        y: 60
        w: 230
        h: 86
        tone: database
      - id: independent
        label: Tier 2 to 15
        icon: aurora
        sub: scales independently
        x: 530
        y: 320
        w: 230
        h: 86
        tone: database
        info: Independent readers remain within the cluster range and might need to scale up after promotion.
    edges:
      - from: writer
        to: ready
        step: 1
        label: capacity floor
    steps:
      - A tier 0 or 1 reader keeps its minimum tied to writer capacity within the configured maximum.
---
Aurora Serverless v2 changes database compute capacity as load varies. Its writers and readers use Aurora capacity units (ACUs), which combine about 2 GiB of memory with corresponding CPU and networking resources. The cluster's stored data stays separate from this compute scaling.

### How it works

1. Set ServerlessV2ScalingConfiguration, the cluster's minimum and maximum capacity range, before adding db.serverless instances. Each Serverless instance has its own current capacity within that range.
2. Aurora monitors CPU, memory and network load and adjusts capacity in increments as small as 0.5 ACU. Normal scaling can occur during active connections and transactions without waiting for a quiet point.
3. Choose reader promotion tiers. Tiers 0 and 1 keep a capacity floor tied to the writer, within the configured maximum. With a provisioned writer, that floor uses the ACU equivalent of its memory size. Tiers 2 through 15 scale independently and might need more capacity after promotion.
4. Monitor ServerlessDatabaseCapacity for current ACUs and ACUUtilization for that capacity as a percentage of the configured maximum. Provisioned and Serverless instances can coexist, and global secondary clusters can use Serverless capacity.
5. For supported versions, a minimum of 0 enables auto-pause after an idle interval without user connections. A new connection waits for resume. The writer and tier 0 or 1 readers pause together; other readers can pause independently.

| Capacity setting or mode | Meaning |
|---|---|
| Minimum 0 ACUs | Auto-pause on supported versions when other conditions permit |
| Minimum 0.5 ACU or higher | Auto-pause disabled |
| Supported MySQL upper bound | Up to 256 ACUs |
| Supported PostgreSQL upper bound | Up to 384 ACUs |
| Actual range | Limited by engine version, platform version and regional platform availability |

Aurora Auto Scaling reader-count policies do not support Serverless v2. Create readers in advance and let their compute capacity change. Serverless uses the same six data copies across three Availability Zones as provisioned Aurora.

### Exam cues

- If the question says unpredictable relational load without fixed instance sizing, think Serverless v2, because compute scales within a capacity range.
- If the question says a reader must absorb the writer workload after failover, think tier 0 or 1, because its capacity floor follows the writer.
- If the question says a reporting reader should shrink independently, think tier 2 through 15, because those readers have independent capacity.
- If the question says minimum zero but the cluster never pauses, think open connections or incompatible features such as RDS Proxy, because auto-pause requires more than a zero minimum.

### Remember

- One ACU includes about 2 GiB of memory; capacity changes can be as small as 0.5 ACU.
- Supported upper bounds are 256 ACUs for MySQL and 384 for PostgreSQL; actual support depends on engine and platform versions.
- SecondsUntilAutoPause defaults to 300 seconds and supports 300 to 86400 seconds.
- RDS Proxy prevents auto-pause. Global primary writers, their tier 0 or 1 readers and all global secondary instances do not auto-pause.
- Paused instances have no compute-capacity charge; storage and other cluster charges continue.

> **Trap:** Normal scaling keeps current operations running, but resuming from zero takes time. A Global Database secondary can use Serverless capacity without supporting auto-pause.
