---
title: Availability, replication, and backup
level: associate
order: 30
facts:
  - id: multi-az
    text: An RDS Multi-AZ DB instance maintains a synchronous standby in another Availability Zone to
      protect against instance or AZ disruption.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html#Concepts.MultiAZSingleStandby
  - id: standby-reads
    text: The standby of an RDS Multi-AZ DB instance deployment does not serve application reads.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html#Concepts.MultiAZSingleStandby
  - id: read-replica
    text: RDS DB instance read replicas receive changes asynchronously; supported replicas can be
      promoted for disaster recovery.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl.Overview.how-it-works
  - id: regional
    text: Regional disaster recovery requires a recovery design outside the affected Region; multi-AZ
      availability operates inside one Region.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_disaster_recovery.html#rel_planning_for_recovery_disaster_recovery
  - id: corruption
    text: Continuous replication can copy corruption or destructive changes; add versioning or
      point-in-time backups in the recovery site.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_disaster_recovery.html#rel_planning_for_recovery_disaster_recovery
  - id: pitr
    text: Point-in-time recovery restores data to an earlier recoverable state, which helps recover from
      destructive changes.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#backup-and-restore
  - id: aurora-backups
    text: Aurora does not support native cross-Region automated backup replication of snapshots and
      transaction logs; copy DB cluster snapshots for regional recovery.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.Retaining.html#Aurora.Managing.Backups.Retaining.Limits
  - id: backup-copy
    text: AWS Backup can copy backups across Regions, including backups for Aurora.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#backup-and-restore
  - id: aurora-global
    text: Aurora Global Database can promote a secondary regional cluster during an unplanned outage,
      with data loss dependent on replication lag.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html#aurora-global-database-failover
  - id: replica-promotion
    text: An RDS replica promoted for recovery becomes standalone; direct database traffic to it after
      promotion.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.Promote.html#USER_ReadRepl.Promote
  - id: availability-zone
    text: Availability Zones are isolated locations within an AWS Region.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones
  - id: s3-delete-markers
    text: S3 replication leaves delete markers in the source bucket by default; enabling delete marker
      replication copies them to the destination, except for tag-based rules and lifecycle expiration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/delete-marker-replication.html#delete-marker-replication
  - id: backup-service-role
    text: AWS Backup requires a service role that trusts AWS Backup and permits the underlying backup or
      restore operations on the selected resources.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/iam-service-roles.html#iam-service-roles
  - id: backup-tag-scp
    text: An SCP denying tag:GetResources prevents AWS Backup tag-based backup plan selections even
      when the role has that permission.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/troubleshooting.html#troubleshooting-backup-general
  - id: airgap-ebs-archive
    text: Since November 2026, AWS Backup supports archiving EBS snapshots in a logically air-gapped
      vault through a backup rule that runs monthly or less often.
    source: https://aws.amazon.com/about-aws/whats-new/2026/11/aws-backup-lag-vault-ebs-archive/
diagrams:
  - id: rds-ha-dr
    title: RDS availability and regional recovery
    width: 800
    height: 350
    nodes:
      - id: app
        label: Application
        icon: res-generic-application
        x: 20
        y: 120
        w: 140
        h: 72
        tone: user
        info: After promoting a read replica, direct the application to the new standalone database.
      - id: primary
        label: Primary DB
        sub: Region A / AZ 1
        icon: rds
        x: 310
        y: 25
        w: 150
        h: 86
        tone: database
        info: The primary serves writes. Multi-AZ protects against an AZ or instance failure within the
          Region.
      - id: standby
        label: Standby DB
        sub: Region A / AZ 2
        icon: rds
        x: 310
        y: 245
        w: 150
        h: 86
        tone: database
        info: A Multi-AZ DB instance standby is for failover, not application reads.
      - id: replica
        label: Read replica
        sub: Region B
        icon: rds
        x: 610
        y: 25
        w: 160
        h: 86
        tone: database
        info: A cross-Region read replica uses asynchronous replication and can be promoted for disaster
          recovery, subject to engine support.
    edges:
      - from: app
        to: primary
        step: 1
      - from: primary
        to: standby
        step: 2
      - from: primary
        to: replica
        step: 3
    steps:
      - The application sends writes to the primary DB instance.
      - A Multi-AZ DB instance maintains a synchronous standby in another AZ for failover.
      - A supported cross-Region read replica receives asynchronous changes and can be promoted for
        regional recovery.
cards:
  - id: disaster-recovery-007
    q: Does an RDS Multi-AZ DB instance deployment replace cross-Region disaster recovery?
    a: No. Its synchronous standby protects against instance or AZ disruption inside a Region. Regional
      recovery needs a recovery site outside that Region.
    trap: true
    facts:
      - multi-az
      - regional
  - id: disaster-recovery-009
    q: An AWS database continuously replicates to its recovery Region. Why retain point-in-time backups
      too?
    a: Replication can copy destructive changes. Backups let the team recover an earlier data state.
    trap: true
    facts:
      - corruption
      - pitr
  - id: disaster-recovery-022
    q: An RDS Multi-AZ DB instance needs more read capacity. Can the application query its standby?
    a: No. Use a supported read replica for read scaling. The Multi-AZ DB instance standby is reserved
      for availability.
    trap: true
    facts:
      - standby-reads
      - read-replica
  - id: disaster-recovery-023
    q: An Aurora team wants to replicate automated snapshots and transaction logs to another Region
      using the native RDS instance feature. What should it use for regional recovery?
    a: Use copied Aurora cluster snapshots, AWS Backup cross-Region copies, or Aurora Global Database
      where appropriate. Native cross-Region automated backup replication is not supported for
      Aurora.
    facts:
      - aurora-backups
      - backup-copy
      - aurora-global
  - id: disaster-recovery-032
    q: An Amazon S3 bucket replicates to a disaster recovery Region. What happens when a source object is deleted with default replication settings?
    a: The delete marker stays in the source bucket, so the destination remains accessible. Enable delete marker replication to copy markers, subject to rule and lifecycle limitations.
    facts:
      - s3-delete-markers
  - id: disaster-recovery-033
    q: An AWS Backup plan selects Amazon RDS resources by tags, but an organization SCP denies tag:GetResources. Does granting the service role that action fix the selection?
    a: No. Remove the SCP denial too. AWS Backup also needs a trusted service role with permissions for the underlying backup operations.
    trap: true
    facts:
      - backup-tag-scp
      - backup-service-role
  - id: disaster-recovery-034
    q: A team uses AWS Backup to retain infrequent Amazon EBS backups in a logically air-gapped vault. Can it archive them?
    a: Yes. Since November 2026, configure EBS snapshot archiving in a backup rule that runs monthly or less often.
    facts:
      - airgap-ebs-archive
---
Availability, replication and backups address different failures. An Availability Zone (AZ) is an isolated location inside an AWS Region. Keeping a standby in another AZ helps availability; keeping recoverable data outside the Region addresses regional loss.

### How it works

1. For an RDS Multi-AZ DB instance, synchronous replication keeps a standby copy synchronized with the primary in another AZ for instance or AZ disruption. That standby does not serve application reads.
2. For supported RDS engines, asynchronous read replicas, read-only database copies, receive changes after the primary. Promote a replica when using it for recovery, then direct database traffic to the promoted instance.
3. For regional recovery, keep the recovery data and workload outside the affected Region.
4. Retain point-in-time backups as well. Point-in-time recovery means returning data to an earlier recoverable state, before a destructive change.
5. For S3 replication, a delete marker, which hides the current object version, stays in the source by default. Enabling marker replication copies it unless the rule is tag-based or the marker comes from lifecycle expiration.
6. Pass AWS Backup a service role that trusts the service and permits the resource operations. An organization service control policy (SCP) can still deny tag-based selection.
7. A logically air-gapped vault holds locked backups that can be shared across accounts. Since November 2026, AWS Backup can archive EBS snapshots there using a backup rule that runs monthly or less often.

| Requirement | Mechanism | Boundary to remember |
|---|---|---|
| RDS instance or AZ availability | Multi-AZ DB instance standby | Same Region; standby cannot serve reads |
| RDS read scaling | Supported read replica | Asynchronous copies can be stale |
| Regional database recovery | Cross-Region replica or Aurora Global Database | Promotion and replication lag matter |
| Recovery before corruption | Point-in-time backups or versioning | Replication alone can copy the damage |

Aurora does not support the native RDS instance feature that replicates automated snapshots and transaction logs across Regions. Use copied cluster snapshots, AWS Backup cross-Region copies or Aurora Global Database as the design requires.

### Exam cues

- If the question says an RDS instance or AZ fails, think Multi-AZ, because its standby is in another AZ.
- If the question says the entire Region is unavailable, think a recovery site in another Region, because the Multi-AZ standby shares the Region.
- If the question says a replicated delete destroyed valid data, think point-in-time recovery, because another current replica may contain the same damage.
- If an AWS Backup tag-based plan cannot select RDS resources despite role permissions, check for an SCP denying `tag:GetResources`.
- If infrequent EBS backups in a logically air-gapped vault need archival storage, configure the archive lifecycle on an eligible AWS Backup rule.

### Remember

- Multi-AZ DB instance standby and read replica are different roles.
- Keep point-in-time backups in the recovery site alongside replicated data.
- Aurora regional backup recovery uses cluster snapshot copies or AWS Backup copies, not native cross-Region automated backup replication.

> **Trap:** Replication is not a history of good states. It can carry a damaging change into the recovery site.
