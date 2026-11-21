---
title: Backup operational checks
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
AWS Backup operations depend on resource selection, rule settings, permissions, and retention bounds. Check each setting against the job or restore that failed.

### How it works

1. For a tag-only resource assignment, check service opt-in settings. They still apply to the selected resources.
2. Review the backup rule's console defaults for start time and windows. The completion window does not apply to Amazon FSx.
3. For a database point-in-time recovery (PITR) copy, check `rds:DeleteDBSnapshot`. AWS Backup uses it to remove a temporary source snapshot; without it, an expired recovery point can require manual deletion.
4. Before restoring a copy in another account, ensure that account has the service-linked role for the resource's service.
5. Compare new backup and copy job retention with the vault's Vault Lock bounds. Incompatible jobs fail, while existing recovery points keep their lifecycles.

### Exam cues

- If the question says tagged resources are missing from a tag-only assignment, think service opt-in, because that setting still applies.
- If the question says a database PITR copy leaves an expired source recovery point, think `rds:DeleteDBSnapshot`, because AWS Backup needs it to clean up the temporary snapshot.
- If the question says a copy reached a new account but restore fails, think service-linked role, because the destination needs the role for the resource's service.
- If the question says jobs fail after Vault Lock retention bounds are set, think retention mismatch, because new jobs must meet those bounds.

### Remember

- Console start time: 00:30 in the local system time zone.
- Console start window: 8 hours; completion window: 7 days. The completion window does not apply to Amazon FSx.

> **Trap:** Vault Lock retention bounds do not rewrite existing recovery point lifecycles. They reject incompatible new backup and copy jobs.
