---
title: Failover test planning
level: professional
order: 50
facts:
  - id: objectives
    text: Recovery time objective is the target time to restore a system after an outage.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html
  - id: recovery-point
    text: Recovery point objective is acceptable data loss measured in time.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html
  - id: rds
    text: A Multi-AZ RDS DB instance can be rebooted with failover to switch to its standby in another
      Availability Zone.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RebootInstance.html
  - id: fis-reboot
    text: The FIS aws:rds:reboot-db-instances action forces a Multi-AZ failover when forceFailover is
      true; its default is false.
    source: https://docs.aws.amazon.com/fis/latest/userguide/fis-actions-reference.html#reboot-db-instances
  - id: fis-cluster
    text: The FIS aws:rds:failover-db-cluster action invokes FailoverDBCluster on the target Aurora
      cluster.
    source: https://docs.aws.amazon.com/fis/latest/userguide/fis-actions-reference.html#failover-db-cluster
  - id: switchover
    text: Aurora Global Database switchover synchronizes a healthy secondary before promotion and has a
      recovery point objective of zero.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-disaster-recovery.managed-failover
  - id: global-failover
    text: An unplanned Aurora Global Database failover can lose writes not yet replicated to the
      secondary Region.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html
  - id: invert
    text: An inverted Route 53 health check treats healthy as unhealthy and unhealthy as healthy;
      inverting it again restores the original interpretation.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-invert.html
  - id: origin-group
    text: CloudFront origin failover uses a primary and secondary origin in an origin group selected by
      a cache behavior.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html
  - id: cache
    text: For an origin group, a CloudFront cache hit returns the cached object; on a cache miss it
      tries the primary and uses the secondary for configured failures.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html
  - id: methods
    text: CloudFront origin failover supports GET, HEAD, and OPTIONS; OPTIONS must also be enabled as a
      cached HTTP method.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html
  - id: retry-primary
    text: CloudFront tries the primary for subsequent origin requests even after an earlier request
      failed over.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html
  - id: stop
    text: FIS stop conditions use CloudWatch alarms to stop an experiment when a defined threshold is
      reached.
    source: https://docs.aws.amazon.com/fis/latest/userguide/stop-conditions.html
  - id: availability-zone
    text: Availability Zones are isolated locations within an AWS Region.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html
diagrams:
  - id: testing-cloudfront-failover
    title: Origin failover on a cache miss
    width: 1000
    height: 330
    nodes:
      - id: edge
        label: CloudFront
        icon: cloudfront
        sub: cache miss
        x: 30
        y: 125
        w: 270
        h: 86
        tone: network
      - id: primary
        label: Primary origin
        icon: res-server
        sub: configured failure
        x: 680
        y: 30
        w: 270
        h: 86
        tone: neutral
      - id: secondary
        label: Secondary origin
        icon: res-server
        sub: eligible methods
        x: 680
        y: 215
        w: 270
        h: 86
        tone: neutral
    edges:
      - from: edge
        to: primary
        step: 1
        label: cache miss
      - from: edge
        to: secondary
        step: 2
        label: configured failure
    steps:
      - CloudFront tries the primary origin for the cache miss.
      - After a configured failure, CloudFront sends the eligible request to the secondary.
cards:
  - id: testing-in-pipelines-004
    q: A team needs to exercise database and traffic failover before launch. Which drills cover these
      paths?
    a: Reboot a Multi-AZ RDS instance with failover; test Aurora Global Database switchover and
      unplanned failover; invert a Route 53 health check; and exercise a CloudFront origin group on
      cache misses. Assess recovery time and data loss.
    facts:
      - rds
      - switchover
      - global-failover
      - invert
      - cache
      - objectives
      - recovery-point
  - id: testing-in-pipelines-011
    q: A team must force Multi-AZ RDS instance failover with AWS FIS. Which action and parameter should
      it choose?
    a: "Use aws:rds:reboot-db-instances with forceFailover: true. For an Aurora cluster failover, use
      aws:rds:failover-db-cluster."
    facts:
      - fis-reboot
      - fis-cluster
  - id: testing-in-pipelines-027
    q: A healthy Aurora Global Database must change its primary Region without losing data. Which
      operation fits the drill?
    a: Switchover. It synchronizes the secondary before promotion, giving a recovery point objective of
      zero.
    facts:
      - switchover
  - id: testing-in-pipelines-028
    q: A CloudFront origin-failover drill returns cached objects while the primary is unavailable. What
      should the team test?
    a: Use cache misses to exercise the origin group with eligible request methods. Cache hits return
      stored objects without testing primary-origin recovery.
    facts:
      - cache
      - methods
    trap: true
  - id: testing-in-pipelines-029
    q: A CloudFront application sends POST requests to an origin group. Will primary-origin failure
      cause those requests to use the secondary?
    a: No. CloudFront origin failover supports GET, HEAD, and OPTIONS, with OPTIONS enabled for caching.
    facts:
      - methods
    trap: true
  - id: testing-in-pipelines-030
    q: What do RTO and RPO mean when assessing a failover test?
    a: RTO measures recovery time after an outage. RPO measures data loss in time; an unplanned Aurora
      global failover can lose unreplicated writes.
    facts:
      - objectives
      - recovery-point
      - global-failover
---
Failover tests exercise how an application recovers when its primary resource becomes unavailable. Recovery time objective (RTO) describes acceptable recovery time. Recovery point objective (RPO) describes acceptable data loss measured in time.

### How it works

1. Define the recovery objectives and select the database or traffic path to exercise. For FIS experiments, configure CloudWatch alarm stop conditions to stop when thresholds are reached.
2. For a Multi-AZ RDS DB instance, reboot with failover. Multi-AZ means the database has a standby in another Availability Zone, a separate location within a Region. With FIS, set `forceFailover: true` on `aws:rds:reboot-db-instances`.
3. For Aurora cluster failover, use `aws:rds:failover-db-cluster`. For Aurora Global Database, separately test planned switchover and unplanned cross-Region failover.
4. For traffic recovery, invert a Route 53 health check or exercise a CloudFront origin group, which pairs primary and secondary origins. Invert the health check again to restore its interpretation.
5. Assess recovery time and data loss against the objectives. A healthy Aurora global switchover synchronizes the secondary; an unplanned failover can lose unreplicated writes.

| Drill | Behavior to observe |
|---|---|
| RDS Multi-AZ reboot with failover | Application recovery after switching to standby |
| Aurora global switchover | Promotion after synchronization, with RPO zero |
| Aurora global unplanned failover | Recovery with possible loss of unreplicated writes |
| Route 53 health-check inversion | Healthy and unhealthy interpretations exchange |
| CloudFront origin group | Cache misses use the secondary for configured failures |

### Exam cues

- If the question says force an RDS Multi-AZ instance failover with FIS, think `aws:rds:reboot-db-instances` and `forceFailover: true`, because the default does not force failover.
- If the question says a planned Aurora Region change must lose no data, think switchover, because the secondary is synchronized first.
- If the question says a CloudFront drill never reaches the failed primary, think cache misses, because cache hits return stored objects.

### Remember

- FIS `forceFailover` defaults to `false`.
- Aurora global switchover has RPO zero; unplanned failover can lose data.
- CloudFront failover supports `GET`, `HEAD`, and `OPTIONS`. Enable `OPTIONS` as a cached method to fail it over.
- CloudFront tries the primary again on later origin requests.

> **Trap:** CloudFront origin failover does not redirect `POST` writes to a secondary origin. A database recovery drill must also consider the application's write path.
