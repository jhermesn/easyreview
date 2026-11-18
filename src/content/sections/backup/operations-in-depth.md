---
title: "PLACEHOLDER backup/operations-in-depth"
level: professional
order: 70
facts:
  - id: restore-service-role
    text: The destination account needs the service-linked role of the service whose resource it
      restores.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html#restore-cab
  - id: database-snapshot-cleanup
    text: Database PITR copy jobs need rds:DeleteDBSnapshot to remove temporary source snapshots;
      missing permission can leave expired recovery points requiring manual deletion.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/point-in-time-recovery-copying.html
  - id: tag-opt-in
    text: When resource assignment uses only tags, AWS Backup service opt-in settings still apply.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/assigning-resources.html
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
  - id: retention-check
    text: Vault Lock retention bounds reject new backup and copy jobs with incompatible retention, but
      do not change existing recovery point lifecycles.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html#lock-backup-vault-console
cards:
  - id: backup-023
    q: An AWS Backup copy reached a new account, but restoring a resource from a service never used
      there fails. What prerequisite may be absent?
    a: The destination service-linked role. Ensure that the underlying service has created its role in
      that account.
    facts:
      - restore-service-role
  - id: backup-026
    q: An AWS Backup database PITR copy leaves an expired source recovery point. Which cleanup
      permission should be checked?
    a: rds:DeleteDBSnapshot. AWS Backup needs it to delete the temporary source snapshot after the copy.
    facts:
      - database-snapshot-cleanup
  - id: backup-014
    q: An AWS Backup plan selects resources only by tags, but tagged resources are not protected. Which
      setting should the team inspect?
    a: Check service opt-in settings, because tag-only selections still respect them.
    facts:
      - tag-opt-in
  - id: backup-017
    q: What are the AWS Backup console defaults for a rule start time and its start and completion
      windows?
    a: 00:30 in the local system time zone, an 8-hour start window, and a 7-day completion window. The
      completion window does not apply to FSx.
    facts:
      - console-start-time
      - console-start-window
      - console-completion-window
  - id: backup-029
    q: Do new AWS Backup Vault Lock retention bounds rewrite the retention of existing recovery points?
    a: No. Existing recovery points keep their lifecycle. Incompatible new backup or copy jobs fail.
    trap: true
    facts:
      - retention-check
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
