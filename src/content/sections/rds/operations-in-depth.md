---
title: RDS operational troubleshooting
level: professional
order: 90
facts:
  - id: backup-availability
    text: RDS automated backups do not occur unless the DB instance is available, or while a snapshot
      copy for that database runs in the same Region.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html#USER_WorkingWithAutomatedBackups
  - id: aws-backup-window-conflict
    text: Unless AWS Backup manages both RDS snapshots and continuous backups, its RDS backup jobs fail
      when initiated during the RDS automated backup window.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/troubleshooting.html#troubleshooting-create-backup
  - id: oracle-option-copy
    text: Since November 2026, RDS for Oracle can copy the snapshot's option group to another Region
      in the same snapshot copy request using CopyOptionGroup.
    source: https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-rds-oracle-cross-region-snapshot-copy-option-group/
  - id: instance-test
    text: Reboot with failover tests a Multi-AZ DB instance by switching to its standby; AWS recommends
      stopping transactions before this abrupt interruption.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RebootInstance.html#USER_RebootInstance
  - id: cluster-test
    text: A Multi-AZ DB cluster supports a manual failover through FailoverDBCluster or
      failover-db-cluster.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts-failover.html#multi-az-db-clusters-concepts-failover-manual
  - id: connection-cap
    text: MaxConnectionsPercent limits RDS Proxy backend connections as a percentage of the database
      max_connections setting.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.maxconnectionspercent
  - id: cap-monitoring
    text: RDS Proxy DatabaseConnections and MaxDatabaseConnectionsAllowed show used and permitted
      backend connections; reserved connections can make the latter lower than the configured
      percentage suggests.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.maxconnectionspercent
  - id: borrow-default
    text: ConnectionBorrowTimeout defaults to 120 seconds and limits how long RDS Proxy waits for an
      available database connection.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.connectionborrowtimeout
  - id: idle-default
    text: IdleClientTimeout defaults to 1800 seconds; closing an idle client connection returns its
      backend connection to the pool.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.idleclienttimeout
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
  - id: enhanced-monitoring
    text: "Enhanced Monitoring reads operating system metrics in real time from an agent on the DB instance, while standard CloudWatch metrics come from the hypervisor, and delivers them to CloudWatch Logs (log group RDSOSMetrics, 30 days by default)."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.html#USER_Monitoring.OS.CloudWatchComparison
cards:
  - id: rds-035
    q: An Amazon RDS DB instance is in storage_full state during its automated backup window. Will RDS take its automated backup?
    a: No. Automated backups require the instance to be available. A same-Region snapshot copy of that database also prevents them.
    facts:
      - backup-availability
  - id: rds-036
    q: AWS Backup snapshot jobs for an Amazon RDS instance fail during the RDS automated backup window. What configuration can avoid the conflict?
    a: Have AWS Backup manage both snapshots and continuous backups for the instance, or schedule the job outside the RDS backup window.
    facts:
      - aws-backup-window-conflict
  - id: rds-040
    q: An Amazon RDS for Oracle team copies a DB snapshot to another Region and needs its option group there. What can it do in the snapshot copy request?
    a: Set CopyOptionGroup to true. Cross-Region option group copying was added in November 2026.
    facts:
      - oracle-option-copy
  - id: rds-006
    q: How should a team deliberately test failover for an RDS Multi-AZ DB instance versus an RDS
      Multi-AZ DB cluster?
    a: Use Reboot with failover for the DB instance. Use FailoverDBCluster for the DB cluster. Stop
      transactions before the abrupt instance failover.
    facts:
      - instance-test
      - cluster-test
  - id: rds-014
    q: An RDS Proxy workload must leave database connections available for other users. Which setting
      caps the proxy connection pool?
    a: MaxConnectionsPercent. It caps backend connections relative to database max_connections. Compare
      DatabaseConnections with MaxDatabaseConnectionsAllowed to monitor actual usable capacity.
    facts:
      - connection-cap
      - cap-monitoring
  - id: rds-032
    q: What are the default RDS Proxy ConnectionBorrowTimeout and IdleClientTimeout values?
    a: ConnectionBorrowTimeout is 120 seconds. IdleClientTimeout is 1800 seconds. They control waiting
      for backend capacity and closing idle client connections, respectively.
    facts:
      - borrow-default
      - idle-default
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
  - id: rds-063
    q: "Why can RDS CPU numbers from Enhanced Monitoring differ from the CloudWatch CPUUtilization metric?"
    a: "CloudWatch measures from the hypervisor, Enhanced Monitoring from an agent inside the instance, and the hypervisor does a little work of its own."
    facts: [enhanced-monitoring]
---
RDS operational troubleshooting connects backup timing, failover tests, connection capacity, storage growth, and monitoring to the conditions that control them.

### How it works

1. Check [automated backup conditions](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html#USER_WorkingWithAutomatedBackups): the instance must be available, and a same-Region snapshot copy for that database must not be running. For [AWS Backup](https://docs.aws.amazon.com/aws-backup/latest/devguide/troubleshooting.html#troubleshooting-create-backup), schedule jobs outside the RDS backup window unless AWS Backup manages both snapshots and continuous backups.
2. For an RDS for Oracle cross-Region snapshot copy, set [`CopyOptionGroup` to true](https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-rds-oracle-cross-region-snapshot-copy-option-group/) to copy the option group in the same request. This capability was added in November 2026.
3. To test a Multi-AZ DB instance, stop transactions and [reboot with failover](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RebootInstance.html#USER_RebootInstance), which switches to the standby. For a Multi-AZ DB cluster, use [manual failover](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts-failover.html#multi-az-db-clusters-concepts-failover-manual) with `FailoverDBCluster` or `failover-db-cluster`.
4. Set [`MaxConnectionsPercent`](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.maxconnectionspercent) to limit proxy connections to the database relative to `max_connections`. Compare `DatabaseConnections` with `MaxDatabaseConnectionsAllowed`: reserved connections can reduce the usable limit. [`ConnectionBorrowTimeout`](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.connectionborrowtimeout) controls the wait for a database connection; [`IdleClientTimeout`](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-connections.html#rds-proxy-connection-pooling-tuning.idleclienttimeout) closes idle clients and returns their database connections to the pool.
5. [Storage autoscaling](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html#USER_PIOPS.Autoscaling) starts a modification only after free space remains at or below 10 percent for at least five minutes, prior storage optimization finishes, and fewer than four storage modifications have occurred in the past 24 hours. It chooses the greatest of 10 GiB, 10 percent of allocated storage, or predicted growth exceeding allocation over the next seven hours, based on the past hour of `FreeStorageSpace`.
6. Compare CPU measurements with their source in mind. Standard CloudWatch metrics come from the hypervisor, while [Enhanced Monitoring](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.html#USER_Monitoring.OS.CloudWatchComparison) uses an agent on the DB instance and sends operating system metrics to CloudWatch Logs.

### Exam cues

- If the question says an automated backup was missed while an instance was `storage_full`, think instance availability, because automated backups require the available state.
- If the question says AWS Backup jobs fail during the RDS backup window, think backup scheduling or AWS Backup managing both backup types, because the window can cause a conflict.
- If the question says test failover, think reboot with failover for a DB instance and manual cluster failover for a DB cluster, because they use different operations.
- If the question says reserve database connections for other users, think `MaxConnectionsPercent` and the proxy capacity metrics, because the configured percentage and usable limit can differ.
- If the question says storage remains low despite autoscaling, think the low-space duration and previous modifications, because all trigger conditions must be met.
- If the question says CPU readings differ, think the hypervisor and instance agent, because they collect metrics from different places.

### Remember

- Proxy connection borrow timeout: 120 seconds by default. Idle client timeout: 1800 seconds by default.
- Storage trigger: free space at or below 10 percent for at least five minutes, completed optimization, and fewer than four modifications in 24 hours.
- Storage increment: the greatest of 10 GiB, 10 percent of allocation, or the seven-hour predicted growth exceeding allocation.
- Enhanced Monitoring writes to the `RDSOSMetrics` log group, with 30 days of retention by default.

> **Trap:** A configured proxy connection percentage does not directly give the usable connection count. Reserved connections can make `MaxDatabaseConnectionsAllowed` lower.
