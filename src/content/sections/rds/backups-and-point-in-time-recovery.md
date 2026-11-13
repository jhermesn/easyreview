---
title: Backups and point-in-time recovery
level: associate
order: 30
facts:
  - id: backup-scope
    text: RDS automated backups capture the whole DB instance, not just an individual database.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html#USER_WorkingWithAutomatedBackups
  - id: pitr-window
    text: RDS point-in-time recovery restores a DB instance to an available time within its backup
      retention period.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html#USER_PIT
  - id: restore-new
    text: RDS point-in-time recovery creates a new DB instance without changing the source.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html#USER_PIT
  - id: log-upload
    text: RDS uploads DB instance transaction logs to Amazon S3 every five minutes.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html#USER_PIT
  - id: latest-time
    text: LatestRestorableTime reports the latest available recovery time for an RDS DB instance.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html#USER_PIT
  - id: retention-range
    text: An RDS DB instance backup retention period can be 0 to 35 days; 0 disables automated backups.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.BackupRetention.html#USER_WorkingWithAutomatedBackups.BackupRetention
  - id: retention-defaults
    text: For a newly created RDS DB instance, backup retention defaults to one day through the API or
      CLI and seven days through the console.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.BackupRetention.html#USER_WorkingWithAutomatedBackups.BackupRetention
  - id: cluster-retention
    text: A Multi-AZ DB cluster backup retention period can be 1 to 35 days.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.BackupRetention.html#USER_WorkingWithAutomatedBackups.BackupRetention
  - id: retention-outage
    text: Changing RDS DB instance backup retention between 0 and a nonzero value causes an outage.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.BackupRetention.html#USER_WorkingWithAutomatedBackups.BackupRetention
  - id: manual-snapshots
    text: Manual and final RDS snapshots survive deletion of the DB instance independently of automated
      backups.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html#USER_WorkingWithAutomatedBackups
  - id: retain-automated
    text: Deleting an RDS DB instance deletes automated backups unless the user chooses to retain them
      for the retention period.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html#USER_WorkingWithAutomatedBackups
  - id: regional-backups
    text: Supported RDS DB instances can replicate snapshots and transaction logs to another Region;
      this automated backup replication is not supported for Multi-AZ DB clusters.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReplicateBackups.html#USER_ReplicateBackups
  - id: standby-replicates
    text: RDS Multi-AZ DB instance replication copies database changes synchronously to the standby.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html#Concepts.MultiAZSingleStandby
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
cards:
  - id: rds-007
    q: An accidental table deletion is committed on an RDS Multi-AZ DB instance. Is failover sufficient
      to recover the earlier data?
    a: No. The deletion is copied to the standby. Use point-in-time recovery to create a new DB instance
      from an available time before the deletion.
    trap: true
    facts:
      - standby-replicates
      - pitr-window
      - restore-new
  - id: rds-021
    q: What are the automated backup retention defaults for a newly created RDS DB instance?
    a: One day through the API or CLI; seven days through the console. DB instance retention can be 0 to
      35 days, with 0 disabling automated backups.
    facts:
      - retention-defaults
      - retention-range
  - id: rds-022
    q: An RDS team wants to restore to the current second after an incident. Which value must it check
      first?
    a: LatestRestorableTime. RDS uploads transaction logs every five minutes, so the latest available
      recovery point can lag the current time. Recovery creates a new instance.
    facts:
      - latest-time
      - log-upload
      - restore-new
  - id: rds-023
    q: An RDS DB instance is about to be deleted, but a team needs a recovery copy afterwards. Which
      backups should it preserve?
    a: Create or keep a manual or final snapshot. These survive instance deletion. Explicitly retain
      automated backups if their recovery window is also needed.
    facts:
      - manual-snapshots
      - retain-automated
  - id: rds-024
    q: Can an RDS Multi-AZ DB cluster use the same native cross-Region automated backup replication
      feature as a supported RDS DB instance?
    a: No. That feature replicates DB instance snapshots and transaction logs, but does not support
      Multi-AZ DB clusters.
    trap: true
    facts:
      - regional-backups
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
---

RDS backups provide earlier copies of a database for recovery after a data error. Point-in-time recovery (PITR) combines backups and transaction logs, which record database changes, to recover to an available time within the retention window. The [backup guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html#USER_WorkingWithAutomatedBackups) describes backups of the whole DB instance.

### How it works

1. Set automated backup retention. A value of 0 disables automated backups for a DB instance; changing between 0 and a nonzero value causes an outage.
2. RDS takes backups and uploads transaction logs to Amazon S3 every five minutes. Check `LatestRestorableTime` before selecting a recovery point.
3. Use PITR to restore to an available time before the error. RDS creates a new DB instance and leaves the source unchanged.
4. Preserve a manual or final snapshot when deleting an instance if you need a lasting recovery copy. Automated backups require an explicit retain choice to survive deletion for their retention period.
5. For supported DB instances, cross-Region automated backup replication copies snapshots and transaction logs to a destination Region. Multi-AZ DB clusters do not support this feature.
6. Check that the instance is available and no same-Region snapshot copy for it is running. Unless AWS Backup manages both snapshots and continuous backups, schedule its backup jobs outside the RDS automated backup window.
7. An option group configures optional database features. Since November 2026, RDS for Oracle can copy the option group with a cross-Region snapshot copy by setting `CopyOptionGroup` to true.

### Exam cues

- If the question says an accidental deletion has reached the Multi-AZ standby, think PITR before the deletion, because synchronous replication also copies unwanted changes.
- If the question says recover a deleted DB instance after its automated backups are gone, think a retained manual or final snapshot, because those copies are independent of instance deletion.
- If the question says restore without overwriting the source, think PITR, because it creates another DB instance.
- If an AWS Backup job overlaps an RDS backup window, think scheduling conflict unless AWS Backup manages both snapshot and continuous backups.
- If an RDS for Oracle snapshot and its option group must be copied to another Region, think `CopyOptionGroup` on the snapshot copy request.

### Remember

- DB instance retention: 0 to 35 days. Multi-AZ DB cluster retention: 1 to 35 days.
- New DB instance defaults: one day through API/CLI, seven days through the console.
- Transaction log upload interval: five minutes. Use the actual `LatestRestorableTime` for recovery.
- Automated backups cover the DB instance, rather than a selected table or database.

> **Trap:** Multi-AZ availability does not supply an earlier database state. A committed mistake is copied to the standby; restore a backup from before the mistake.
