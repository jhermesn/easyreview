---
title: Storage autoscaling and metrics
level: associate
order: 40
facts:
  - id: storage-growth
    text: RDS storage autoscaling automatically increases allocated storage up to a configured maximum
      threshold.
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
  - id: enhanced-monitoring
    text: "Enhanced Monitoring reads operating system metrics in real time from an agent on the DB instance, while standard CloudWatch metrics come from the hypervisor, and delivers them to CloudWatch Logs (log group RDSOSMetrics, 30 days by default)."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.html#USER_Monitoring.OS.CloudWatchComparison
  - id: em-process-list
    text: "The Enhanced Monitoring process list shows RDS child processes (such as mysqld), RDS processes and OS processes, with the memory and CPU each one uses."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.Viewing.html#USER_Monitoring.OS.Viewing
  - id: database-insights
    text: "CloudWatch Database Insights, which builds on Performance Insights, shows database load and filters it by waits, SQL statements, hosts or users, so you can find the queries that load the database."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.html#USER_PerfInsights
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
  - id: rds-026
    q: A large RDS data import fills the disk even though storage autoscaling is enabled. Can
      autoscaling guarantee the import will finish?
    a: No. A large load can outpace permitted storage modifications. Allocate enough storage before the
      load and check the maximum threshold.
    trap: true
    facts:
      - bulk-risk
      - storage-growth
  - id: rds-062
    q: "An RDS team needs to see how much CPU and memory each database process uses, in real time. Standard CloudWatch metrics are not enough. What should they turn on?"
    a: "Enhanced Monitoring. Its agent on the DB instance reports OS metrics and a process list (RDS child processes, RDS processes, OS processes) to CloudWatch Logs."
    facts: [enhanced-monitoring, em-process-list]
  - id: rds-064
    q: "Which RDS feature shows which SQL statements cause the most database load?"
    a: "CloudWatch Database Insights (built on Performance Insights), which filters DB load by waits, SQL statements, hosts or users."
    facts: [database-insights]
---

RDS storage autoscaling grows a DB instance's allocated disk space when free space stays low. It addresses storage capacity up to a configured ceiling. [CloudWatch metrics](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-metrics.html#rds-cw-metrics) separately show disk queues, operation times, CPU use, and connections.

### How it works

1. Enable autoscaling and set a maximum storage threshold. It must be at least 10 percent above current allocation; AWS recommends 26 percent or more. Changing this setting does not require downtime.
2. Monitor the remaining space and I/O, meaning disk reads and writes. A large load can still fill storage before another modification is permitted. Autoscaling never shrinks allocated storage.
3. Use Enhanced Monitoring to see real-time CPU and memory use by database and operating system processes. Use CloudWatch Database Insights to examine database load by waits, SQL statements, hosts, or users.

### Exam cues

- If the question says unpredictable disk growth, think storage autoscaling with a suitable maximum, because RDS can increase allocation when its low-space conditions are met.
- If the question says rising disk queues and slow queries, think queue, latency, IOPS, and throughput metrics together, because they describe different parts of disk activity. IOPS means operations per second; throughput means bytes transferred per second.
- If the question says CPU and memory use by process, think Enhanced Monitoring, because its process list reports both.
- If the question says identify SQL statements behind database load, think CloudWatch Database Insights, because it can filter load by SQL statement.

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

> **Trap:** Storage autoscaling cannot guarantee that a large import avoids a full disk. Storage can fill before another modification is permitted, and growth stops at the configured ceiling.
