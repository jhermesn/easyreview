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
  - id: multiaz-backup-latency
    text: "Synchronous replication to a Multi-AZ standby also minimizes latency spikes on the primary during system backups."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html#Concepts.MultiAZSingleStandby
  - id: free-backup-storage
    text: "RDS includes free backup storage up to 100 percent of the total provisioned database storage in the account for each Region, covering DB snapshots and DB cluster snapshots."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html#USER_WorkingWithAutomatedBackups
  - id: aurora-no-disable
    text: "Aurora automated backups cannot be turned off; the cluster keeps continuous, incremental backups for its retention period (1 day by default)."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html#Aurora.Managing.Backups.Backup
  - id: mysql-s3-import
    text: "RDS for MySQL can create a new DB instance from backup files that you upload to Amazon S3."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Importing.html#MySQL.Procedural.Importing
  - id: snapshot-incremental
    text: "The first snapshot of a DB instance holds the full database; later snapshots of it store only the data changed since the most recent snapshot."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html
  - id: snapshots-outlive-instance
    text: "Final and manual DB snapshots are kept after the DB instance is deleted, independent of the backup retention period; automated backups are deleted with the instance unless you choose to retain them."
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html
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
  - id: rds-061
    q: "A team needs to choose an RDS backup retention period for point-in-time recovery. What determines the available recovery window?"
    a: "The backup retention period. Point-in-time recovery restores an instance to an available time within that period."
    facts: [pitr-window]
  - id: rds-068
    q: "Can you set the backup retention of an Aurora cluster to 0 to turn automated backups off?"
    a: "No. Aurora automated backups cannot be disabled; only RDS DB instances can set retention to 0."
    trap: true
    facts: [aurora-no-disable]
  - id: rds-069
    q: "A team needs to recover an RDS DB instance after an accidental change. What does point-in-time recovery create?"
    a: "A new DB instance restored to an available time within the backup retention period. The source is unchanged."
    facts: [pitr-window, restore-new]
  - id: rds-080
    q: "A team deletes an RDS DB instance without choosing to retain automated backups. What happens to its automated backups and to its manual DB snapshots?"
    a: "Automated backups are **deleted** with the instance. Manual and final snapshots are **kept** until you delete them."
    trap: true
    facts: [snapshots-outlive-instance]
---

RDS backups provide earlier copies of a database for recovery after a data error. Point-in-time recovery (PITR) combines backups and transaction logs, which record database changes, to recover to an available time within the retention window. The [backup guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html#USER_WorkingWithAutomatedBackups) describes backups of the whole DB instance.

### How it works

1. Set automated backup retention. A value of 0 disables automated backups for a DB instance; changing between 0 and a nonzero value causes an outage.
2. RDS takes backups and uploads transaction logs to Amazon S3 every five minutes. Check `LatestRestorableTime` before selecting a recovery point.
3. Use PITR to restore to an available time before the error. RDS creates a new DB instance and leaves the source unchanged.
4. Preserve a manual or final snapshot when deleting an instance if you need a lasting recovery copy. Automated backups require an explicit retain choice to survive deletion for their retention period.
5. For supported DB instances, cross-Region automated backup replication copies snapshots and transaction logs to a destination Region. Multi-AZ DB clusters do not support this feature.

### Exam cues

- If the question says an accidental deletion has reached the Multi-AZ standby, think PITR before the deletion, because synchronous replication also copies unwanted changes.
- If the question says recover a deleted DB instance after its automated backups are gone, think a retained manual or final snapshot, because those copies are independent of instance deletion.
- If the question says restore without overwriting the source, think PITR, because it creates another DB instance.

### Remember

- DB instance retention: 0 to 35 days. Multi-AZ DB cluster retention: 1 to 35 days.
- New DB instance defaults: one day through API/CLI, seven days through the console.
- Transaction log upload interval: five minutes. Use the actual `LatestRestorableTime` for recovery.
- Automated backups cover the DB instance, rather than a selected table or database.

> **Trap:** Multi-AZ availability does not supply an earlier database state. A committed mistake is copied to the standby; restore a backup from before the mistake.
