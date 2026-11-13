---
title: Cross-Region copies and PITR limits
level: professional
order: 40
facts:
  - id: regional-copy
    text: AWS Backup can copy supported backups to other Regions on demand or through backup plan copy
      actions.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html
  - id: regional-support
    text: Cross-Region and cross-account copy support depends on resource type and Region.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/backup-feature-availability.html#features-by-resource
  - id: regional-incremental
    text: The first copy to a new Region is full; later copies are generally incremental if the service
      supports incremental backups.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html
  - id: ebs-copy-key
    text: For EBS, changing the destination vault encryption key causes a full copy; subsequent copies
      to the same vault and key remain incremental.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html
  - id: copy-encryption
    text: Cross-Region copies generally use the destination vault KMS key; copies of unencrypted Aurora,
      DocumentDB, and Neptune clusters remain unencrypted.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/encryption.html#copy-encryption
  - id: continuous-copy
    text: A continuous backup rule with a supported copy action produces periodic snapshot copies at the
      rule frequency.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/point-in-time-recovery-copying.html
  - id: copy-no-pitr
    text: Copies of continuous backups do not support point-in-time recovery in the destination.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/backup-feature-availability.html#features-by-resource
  - id: no-on-demand-continuous
    text: AWS Backup does not support on-demand copies of continuous backups.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/point-in-time-recovery-copying.html
  - id: database-snapshot-cleanup
    text: Database PITR copy jobs need rds:DeleteDBSnapshot to remove temporary source snapshots;
      missing permission can leave expired recovery points requiring manual deletion.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/point-in-time-recovery-copying.html
  - id: cold-region-limit
    text: Backups in cold storage cannot be copied across Regions.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/recov-point-create-a-copy.html
  - id: aurora-replication-limit
    text: Aurora DB clusters do not support native cross-Region automated replication of snapshots and
      transaction logs.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.Retaining.html#Aurora.Managing.Backups.Retaining.Limits
  - id: aurora-backup-copy
    text: AWS Backup supports cross-Region Aurora snapshot copies, including simultaneous cross-account
      and cross-Region copy.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/backup-feature-availability.html#features-by-resource
  - id: aurora-copy-delay
    text: Cross-Region Aurora snapshot copies can take hours and RDS can queue copy requests when many are in progress.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-copy-snapshot.html#aurora-copy-snapshot.Limitations
  - id: rds-option-group
    text: AWS Backup does not transfer a custom RDS option group during cross-Region copy; persistent
      options require a matching group to exist in the destination.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html
diagrams:
  - id: backup-continuous-copy
    title: Continuous source, snapshot destination
    width: 1000
    height: 230
    nodes:
      - id: source
        label: Continuous backup
        sub: Source Region
        icon: backup
        x: 25
        y: 90
        w: 250
        h: 86
        tone: storage
        info: The source provides point-in-time recovery within its retention period.
      - id: snapshot
        label: Snapshot copy
        sub: Destination Region
        icon: backup
        x: 375
        y: 90
        w: 250
        h: 86
        tone: storage
        info: A supported rule copy action creates a periodic snapshot without PITR history.
      - id: restore
        label: Restore job
        sub: Captured state
        icon: backup
        x: 725
        y: 90
        w: 250
        h: 86
        tone: storage
        info: Restore the copied snapshot to the state captured when it was created.
    edges:
      - from: source
        to: snapshot
        step: 1
        label: rule copy
      - from: snapshot
        to: restore
        step: 2
        label: restore
    steps:
      - The continuous rule creates and copies a snapshot at its configured frequency.
      - The destination restores the snapshot state, without point-in-time recovery.
cards:
  - id: backup-001
    q: A team copies AWS Backup continuous backups to another Region and expects point-in-time recovery
      there. Is that supported?
    a: No. Supported copy actions create periodic snapshots without destination PITR. Check the resource
      and Region support before configuring the copy.
    trap: true
    facts:
      - continuous-copy
      - copy-no-pitr
      - regional-support
  - id: backup-024
    q: An Aurora disaster recovery design proposes native RDS automated backup replication to another
      Region. What backup-copy approach fits Aurora?
    a: Use supported AWS Backup Aurora snapshot copies. Aurora clusters do not support native
      cross-Region automated snapshot-and-log replication.
    facts:
      - aurora-replication-limit
      - aurora-backup-copy
  - id: backup-025
    q: Why might an AWS Backup EBS copy become full after changing the destination encryption key?
    a: Changing the destination vault key causes a full EBS copy. Repeated copies to the same vault and
      key can remain incremental.
    facts:
      - ebs-copy-key
  - id: backup-026
    q: An AWS Backup database PITR copy leaves an expired source recovery point. Which cleanup
      permission should be checked?
    a: rds:DeleteDBSnapshot. AWS Backup needs it to delete the temporary source snapshot after the copy.
    facts:
      - database-snapshot-cleanup
  - id: backup-027
    q: Can AWS Backup create an on-demand cross-Region copy of a continuous backup?
    a: No. Use a supported copy action in a continuous backup rule to create periodic snapshot copies.
    trap: true
    facts:
      - no-on-demand-continuous
      - continuous-copy
  - id: backup-033
    q: An Aurora recovery plan needs a fresh snapshot in another Region. Why must it account for copy delays?
    a: Cross-Region copies can take hours and may queue, delaying the availability of the newer recovery point.
    facts: [aurora-copy-delay]
---

Cross-Region copies keep AWS Backup recovery points, or saved backups, outside the source Region. A copy of a continuous backup is a snapshot of the resource, so it does not carry the source's point-in-time recovery (PITR) history.

### How it works

1. Check copy support for the resource type and both Regions. Choose a destination vault and configure its encryption-key access.
2. Add a copy action to the backup rule, or copy an eligible existing snapshot on demand. Continuous backups require a rule copy action; on-demand continuous copies are unsupported.
3. For a continuous rule, AWS Backup takes and copies snapshots at the rule frequency. Destination copies restore to their captured state, without PITR.
4. The first regional copy is full. Later copies are generally incremental when supported. For EBS, changing the destination vault key causes another full copy.

### Exam cues

- If the question says a copied continuous backup must support PITR in another Region, think snapshot limitation, because the copied recovery point has no PITR history.
- If the question says Aurora needs backups in another Region, think supported AWS Backup snapshot copies, because native cross-Region automated snapshot-and-log replication is unsupported for Aurora clusters.
- If the question says a remote Aurora recovery point must be fresh, account for copy time and queues, because a newer snapshot is not available until its copy completes.
- If the question says a database PITR copy leaves an expired source recovery point, think `rds:DeleteDBSnapshot`, because the copy workflow removes a temporary source snapshot.
- If the question says an RDS copy fails because of persistent database options, think destination option group, because AWS Backup does not transfer a custom option group.

### Remember

- Copy support varies by resource and Region.
- Backups already in cold storage cannot be copied across Regions.
- Copies generally use the destination vault key. Copies of unencrypted Aurora, DocumentDB, and Neptune clusters remain unencrypted.

> **Trap:** An Aurora AWS Backup copy and native RDS automated backup replication are different mechanisms. Aurora supports the snapshot-copy path; that copy does not gain PITR.
