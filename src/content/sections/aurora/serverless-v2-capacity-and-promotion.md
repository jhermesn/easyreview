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
  - id: range
    text: A cluster must define ServerlessV2ScalingConfiguration before instances of class db.serverless can be added.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.requirements.html#aurora-serverless-v2.requirements.capacity-range
  - id: nondisruptive
    text: Aurora Serverless v2 can scale during open connections and active transactions without waiting for a quiet point or disrupting current database operations.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.scaling
  - id: mixed
    text: Aurora clusters can combine provisioned and Serverless v2 instances.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.cluster_topology
  - id: provisioned-writer
    text: With a provisioned writer, a tier 0 or 1 Serverless v2 reader uses the ACU equivalent of writer memory for its capacity floor.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless-v2.how-it-works.scaling
  - id: storage
    text: Serverless v2 uses the same six-copy, three-Availability-Zone Aurora storage as provisioned capacity; compute scaling does not resize stored data.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html#aurora-serverless.storage
  - id: nonzero
    text: Setting minimum capacity to 0.5 ACU or greater turns off auto-pause.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-disabling
  - id: pause-cost
    text: Paused Serverless v2 instances have no instance-capacity charge, but storage and other cluster charges continue.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-billing
  - id: resume
    text: A connection to an auto-paused instance must wait for it to resume, so applications must tolerate resume latency.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html#auto-pause-resuming
  - id: reader-count
    text: Aurora Auto Scaling reader-count policies are unsupported for Serverless v2; create readers in advance and let them scale compute.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.requirements.html#aurora-serverless-v2.limitations
  - id: convert-provisioned
    text: "A provisioned Aurora DB instance can be converted to Serverless v2 by modifying its instance class; to keep writer downtime low, convert or add a Serverless v2 reader and then fail over to it."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-administration.html#aurora-serverless-v2-converting-from-provisioned
  - id: acu-per-second
    text: "Aurora Serverless measures capacity in Aurora Capacity Units (ACUs) and bills them per second."
    source: https://aws.amazon.com/rds/aurora/pricing/
cards:
  - id: aurora-006
    q: An Aurora workload has unpredictable bursts. What does Serverless v2 scale, and does ordinary capacity scaling require idle connections?
    a: It scales each writer or reader compute capacity within the cluster ACU range. An ACU includes about 2 GiB of memory with CPU and networking. Capacity scaling can occur during open connections and active transactions.
    facts:
      - compute
      - acu
      - nondisruptive
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
  - id: aurora-041
    q: "A provisioned Aurora cluster must move its writer to Serverless v2 for traffic spikes, with little downtime. What is the usual path?"
    a: "Add (or convert) a Serverless v2 reader, then fail over so it becomes the writer. No new cluster or data migration is needed."
    facts: [convert-provisioned]
  - id: aurora-050
    q: "How is Amazon Aurora Serverless v2 compute billed?"
    a: "In Aurora Capacity Units (ACUs), billed per second as capacity scales."
    facts: [acu-per-second]
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
Aurora Serverless v2 changes database compute capacity as load varies. Each writer or reader uses Aurora capacity units (ACUs), which combine about 2 GiB of memory with corresponding CPU and networking resources. The cluster's stored data stays separate from compute scaling.

### How it works

1. Set the cluster's minimum and maximum capacity range before adding Serverless instances. Each instance has its own current capacity within that range.
2. Aurora adjusts capacity during active connections and transactions without waiting for the database to become idle.
3. Provisioned and Serverless instances can coexist. A Serverless reader in promotion tier 0 or 1 uses the ACU equivalent of a provisioned writer's memory as its capacity floor.
4. To move a provisioned writer to Serverless v2, add or convert a Serverless reader and fail over to promote it. The existing cluster and data remain in place.
5. When an instance auto-pauses, its compute-capacity charge stops, but storage and other cluster charges continue. A new connection waits for the instance to resume.

### Exam cues

- If the question says unpredictable database load with active transactions, think Serverless v2, because it scales instance compute without waiting for idle connections.
- If the question says a provisioned writer must move to Serverless with little downtime, think add or convert a Serverless reader and promote it through failover, because the cluster and data remain in place.
- If the question says a Serverless reader must be ready to replace a provisioned writer, think tier 0 or 1, because its capacity floor uses the ACU equivalent of the writer's memory.

### Remember

- One ACU includes about 2 GiB of memory with corresponding CPU and networking.
- Provisioned and Serverless instances can coexist in a cluster.
- Paused instances have no compute-capacity charge; storage and other cluster charges continue.
- Serverless capacity: ACUs billed per second.

> **Trap:** Normal capacity scaling can occur during active transactions, but a connection to a paused instance must wait for it to resume.
