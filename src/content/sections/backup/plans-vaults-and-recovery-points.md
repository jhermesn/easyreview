---
title: Plans, vaults, and recovery points
level: associate
order: 10
facts:
  - id: plan-purpose
    text: A backup plan defines when AWS Backup backs up assigned resources and how long it retains
      their backups.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/about-backup-plans.html
  - id: rule-settings
    text: A backup rule specifies a schedule, start and completion windows, target vault, lifecycle, and
      optional copy actions.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/creating-a-backup-plan.html
  - id: resource-selection
    text: Backup plan resource assignments can select resource types or use tags and conditions; local
      assignments can target individual resource ARNs.
    source: https://docs.aws.amazon.com/aws-backup/latest/APIReference/API_BackupSelection.html
  - id: tag-opt-in
    text: When resource assignment uses only tags, AWS Backup service opt-in settings still apply.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/assigning-resources.html
  - id: vault-container
    text: A backup vault is a container that stores and organizes backups, also called recovery points.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/vaults.html
  - id: vault-encryption
    text: The vault KMS key encrypts backups with independent AWS Backup encryption; other backups
      inherit encryption from the source service.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/encryption.html#independent-encryption
  - id: incremental-backups
    text: For supported resource types, the first backup is full and later incremental backups contain
      changes; other resource types use full backups.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/about-backup-plans.html
  - id: snapshot-pitr
    text: Continuous backups support point-in-time recovery, which restores to a chosen time; snapshot
      backups restore the captured state.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/plan-options-and-configuration.html
  - id: continuous-retention
    text: Continuous backup retention ranges from 1 to 35 days.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/plan-options-and-configuration.html
  - id: cold-minimum
    text: Backups transitioned to cold storage must remain there for at least 90 days, so deletion must
      be scheduled at least 90 days after transition.
    source: https://docs.aws.amazon.com/aws-backup/latest/APIReference/API_BackupRule.html#Backup-Type-BackupRule-Lifecycle
  - id: console-start-time
    text: The backup rule console defaults to a start time of 00:30 in the local system time zone.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/creating-a-backup-plan.html
  - id: console-start-window
    text: The backup rule console defaults to an 8-hour start window.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/creating-a-backup-plan.html
  - id: console-completion-window
    text: The backup rule console defaults to a 7-day completion window; the completion-window parameter
      does not apply to Amazon FSx.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/plan-options-and-configuration.html
  - id: overlap-retention
    text: When backup rule start windows overlap, AWS Backup optimizes backups using the rule with the
      longer retention period.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/plan-options-and-configuration.html
cards:
  - id: backup-002
    q: What does an AWS Backup plan define, and how are resources selected?
    a: Rules define the schedule, windows, lifecycle, vault, and optional copies. Resource assignments
      select types, tags, or individual resource ARNs.
    facts:
      - plan-purpose
      - rule-settings
      - resource-selection
  - id: backup-014
    q: An AWS Backup plan selects resources only by tags, but tagged resources are not protected. Which
      setting should the team inspect?
    a: Check service opt-in settings, because tag-only selections still respect them.
    facts:
      - tag-opt-in
  - id: backup-015
    q: An AWS Backup design needs recovery to a chosen time within the retention period. Which backup
      type should it use?
    a: Continuous backups for a supported resource type. Snapshot backups restore only their captured
      state.
    facts:
      - snapshot-pitr
  - id: backup-016
    q: Does every AWS Backup recovery point use the encryption key of its vault?
    a: No. Independently encrypted backups use the vault key; other resource types inherit
      source-service encryption.
    trap: true
    facts:
      - vault-encryption
  - id: backup-017
    q: What are the AWS Backup console defaults for a rule start time and its start and completion
      windows?
    a: 00:30 in the local system time zone, an 8-hour start window, and a 7-day completion window. The
      completion window does not apply to FSx.
    facts:
      - console-start-time
      - console-start-window
      - console-completion-window
  - id: backup-018
    q: What minimum cold-storage residence and continuous-backup retention should an AWS Backup plan
      account for?
    a: Cold storage requires at least 90 days after transition. Continuous backup retention is 1 to 35
      days.
    facts:
      - cold-minimum
      - continuous-retention
---

AWS Backup schedules and retains backups for assigned AWS resources. A plan is the timetable, a vault is the storage container, and a recovery point is the saved backup you can restore.

### How it works

1. Create a plan with backup rules. Each rule sets the schedule, start window, completion window, destination vault, and lifecycle. Lifecycle means when a backup changes storage tier or expires.
2. Assign resources by type, tags, or individual Amazon Resource Names (ARNs), which identify AWS resources. Tags are key-value labels. Tag-only selection still depends on service opt-in settings.
3. Choose snapshots for the state captured by each backup, or continuous backups for point-in-time recovery (PITR), which restores to a chosen time within the retention period.
4. AWS Backup stores recovery points in the vault. For resource types that support incremental backups, it saves a full backup first and changes afterward. Other types use full backups.

| Rule setting | Meaning |
|---|---|
| Start window | Time allowed for a job to begin |
| Completion window | Time allowed for a started job to finish |
| Lifecycle | Storage transition and deletion timing |
| Copy action | Additional backup in a destination vault |

### Exam cues

- If the question says tagged resources are absent from a tag-only plan, think service opt-in, because tag selection still respects that setting.
- If the question says two backup rule start windows overlap, think longer retention, because AWS Backup optimizes overlapping backups under that rule.
- If the question says restore to a chosen time, think continuous backups, because snapshots only preserve captured states.

### Remember

- Console defaults: 00:30 local start time, 8 hours to start, and 7 days to complete. The completion window does not apply to FSx.
- Continuous retention: 1 to 35 days.
- Eligible cold backups must stay cold for at least 90 days. Schedule deletion at least 90 days after transition.

> **Trap:** A vault key does not determine every backup's encryption. Independently encrypted backups use it; other resources inherit source-service encryption.
