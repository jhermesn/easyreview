---
title: Storage autoscaling and metrics
level: associate
order: 40
facts:
  - id: storage-growth
    text: RDS storage autoscaling automatically increases allocated storage up to a configured maximum
      threshold.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html#USER_PIOPS.Autoscaling
  - id: trigger-space
    text: RDS storage autoscaling requires free space at or below 10 percent of allocated storage for at
      least five minutes.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html#USER_PIOPS.Autoscaling
  - id: trigger-modifications
    text: RDS storage autoscaling requires prior storage optimization to finish and fewer than four
      storage modifications in the past 24 hours.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html#USER_PIOPS.Autoscaling
  - id: growth-increment
    text: RDS autoscaling adds the greatest of 10 GiB, 10 percent of allocated storage, or predicted
      growth exceeding allocated storage over the next seven hours based on the past hour of
      FreeStorageSpace.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html#USER_PIOPS.Autoscaling
  - id: maximum-threshold
    text: The RDS autoscaling maximum threshold must be at least 10 percent above current allocated
      storage; AWS recommends at least 26 percent above it.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html#USER_PIOPS.Autoscaling
  - id: storage-no-shrink
    text: Storage autoscaling cannot reduce RDS allocated storage.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html#autoscaling-limitations
  - id: bulk-risk
    text: Large data loads can fill RDS storage before another autoscaling modification is permitted.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html#autoscaling-limitations
  - id: enable-online
    text: Enabling or changing RDS storage autoscaling settings does not require a reboot or downtime.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html#USER_PIOPS.ModifyingAutoscaling
  - id: queue-metric
    text: DiskQueueDepth counts outstanding disk read and write requests waiting for access.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html#rds-cw-metrics-instance
  - id: latency-metrics
    text: ReadLatency and WriteLatency measure average time per disk I/O operation in seconds.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html#rds-cw-metrics-instance
  - id: rate-metrics
    text: ReadIOPS and WriteIOPS measure disk operations per second; ReadThroughput and WriteThroughput
      measure bytes per second.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html#rds-cw-metrics-instance
  - id: space-metric
    text: FreeStorageSpace measures available RDS storage in bytes.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html#rds-cw-metrics-instance
  - id: connections-metric
    text: DatabaseConnections counts client network connections; it does not include every internal
      database session.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html#rds-cw-metrics-instance
  - id: cpu-metric
    text: CPUUtilization measures the percentage of CPU used by the DB instance.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html#rds-cw-metrics-instance
  - id: lag-metric
    text: ReplicaLag measures supported RDS read replica delay in seconds.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html#rds-cw-metrics-instance
  - id: manual-replicas
    text: RDS DB instance read replicas do not automatically scale their count with read demand.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl
cards:
  - id: rds-001
    q: An RDS DB instance is slow while disk requests accumulate. Which CloudWatch metrics distinguish
      queued work from storage service time and rate?
    a: Compare DiskQueueDepth with ReadLatency and WriteLatency, ReadIOPS and WriteIOPS, and
      ReadThroughput and WriteThroughput. They measure queued requests, operation duration,
      operation rate, and byte rate.
    facts:
      - queue-metric
      - latency-metrics
      - rate-metrics
  - id: rds-010
    q: An RDS DB instance repeatedly runs low on disk space. What feature can grow its allocated
      storage?
    a: Enable storage autoscaling with a maximum threshold at least 10 percent above allocated storage.
      It grows storage up to that limit and cannot shrink it.
    facts:
      - storage-growth
      - maximum-threshold
      - storage-no-shrink
  - id: rds-012
    q: Which RDS CloudWatch metrics show CPU pressure, free disk space, client connection count, and
      supported replica delay?
    a: CPUUtilization, FreeStorageSpace, DatabaseConnections, and ReplicaLag, respectively.
      FreeStorageSpace is in bytes and ReplicaLag is in seconds.
    facts:
      - cpu-metric
      - space-metric
      - connections-metric
      - lag-metric
  - id: rds-013
    q: When can RDS storage autoscaling start a storage modification?
    a: Free space must be at or below 10 percent for at least five minutes, prior storage optimization
      must be complete, and fewer than four storage modifications must have occurred in the past 24
      hours.
    facts:
      - trigger-space
      - trigger-modifications
  - id: rds-025
    q: How does RDS storage autoscaling choose the size of a growth increment?
    a: Use the greatest of 10 GiB, 10 percent of allocated storage, or predicted growth exceeding
      allocated storage over seven hours based on the past hour of FreeStorageSpace.
    facts:
      - growth-increment
  - id: rds-026
    q: A large RDS data import fills the disk even though storage autoscaling is enabled. Can
      autoscaling guarantee the import will finish?
    a: No. A large load can outpace permitted storage modifications. Allocate enough storage before the
      load and check the maximum threshold.
    trap: true
    facts:
      - bulk-risk
      - storage-growth
---

RDS storage autoscaling grows a DB instance's allocated disk space when free space stays low. It addresses storage capacity up to a configured ceiling. [CloudWatch metrics](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html#rds-cw-metrics) separately show disk queues, operation times, CPU use, and connections.

### How it works

1. Enable autoscaling and set a maximum storage threshold. It must be at least 10 percent above current allocation; AWS recommends 26 percent or more. Changing this setting does not require downtime.
2. RDS waits until free space is at or below 10 percent for at least five minutes. Prior storage optimization must be complete, and fewer than four storage modifications must have occurred in the past 24 hours.
3. RDS chooses the largest growth increment: 10 GiB, 10 percent of current allocation, or predicted growth exceeding allocated storage over the next seven hours using the past hour's free-space metrics.
4. Monitor the remaining space and I/O, meaning disk reads and writes. A large load can still fill storage before another modification is permitted. Autoscaling never shrinks allocated storage.

### Exam cues

- If the question says unpredictable disk growth, think storage autoscaling with a suitable maximum, because RDS can increase allocation when its low-space conditions are met.
- If the question says rising disk queues and slow queries, think queue, latency, IOPS, and throughput metrics together, because they describe different parts of disk activity. IOPS means operations per second; throughput means bytes transferred per second.
- If the question says read demand should add RDS DB instance replicas automatically, think manual replica management, because storage autoscaling changes disk allocation rather than replica count.

### Remember

| Metric | Meaning |
|---|---|
| `DiskQueueDepth` | Read/write requests waiting for disk access |
| `ReadLatency`, `WriteLatency` | Average seconds per disk operation |
| `ReadIOPS`, `WriteIOPS` | Disk operations per second |
| `ReadThroughput`, `WriteThroughput` | Bytes read or written per second |
| `FreeStorageSpace` | Available storage in bytes |
| `CPUUtilization` | CPU use as a percentage |
| `DatabaseConnections` | Client network connections, excluding some internal sessions |
| `ReplicaLag` | Supported replica delay in seconds |

> **Trap:** Storage autoscaling cannot guarantee that a large import avoids a full disk. Growth is constrained by optimization, the modification limit, and the configured ceiling.
