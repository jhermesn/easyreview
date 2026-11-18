---
title: "AWS Backup basics"
level: foundational
order: 5
facts:
  - id: central-backup
    text: "AWS Backup centralizes and automates data protection across AWS services, in the cloud and on premises, with backup policies and monitoring in one place."
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html#whatisbackup
cards:
  - id: backup-034
    q: "A company wants one place to schedule and monitor backups of EBS, RDS and DynamoDB. Which service fits?"
    a: "AWS Backup."
    facts: [central-backup]
---
AWS Backup manages backups for many AWS services from one place. [What is AWS Backup?](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html#whatisbackup)

### How it works

1. Create a backup plan with schedule and retention.
2. Assign resources to it.
3. AWS Backup runs and monitors the backups.

### Exam cues

- If the question says centralize backups across services, think AWS Backup.

### Remember

- Central, policy-based backups.

> **Trap:** AWS Backup coordinates backups; it does not replace replication for high availability.
