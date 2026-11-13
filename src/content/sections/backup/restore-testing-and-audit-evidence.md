---
title: Restore testing and audit evidence
level: associate
order: 60
facts:
  - id: testing-purpose
    text: AWS Backup restore testing schedules restore jobs and records their completion duration.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing.html
  - id: test-selection
    text: A restore testing plan sets the schedule, start window, source vaults, eligibility range, and
      latest-or-random recovery point selection.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing.html
  - id: test-resource-role
    text: Assign protected resources and an IAM restore role to the testing plan; AWS Backup infers
      restore metadata that can be overridden.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing.html
  - id: event-validation
    text: An EventBridge rule for a COMPLETED restore job can invoke a validation workflow such as a
      Lambda function.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing-validation.html
  - id: validation-result
    text: PutRestoreValidationResult records the validation result for a restore job; a recorded
      validation status cannot be changed.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing-validation.html
  - id: test-cleanup
    text: AWS Backup deletes test resources after optional validation completes or the validation window
      closes.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing.html
  - id: cleanup-window
    text: The console permits a validation retention window of 1 to 168 hours before test-resource
      cleanup.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing.html
  - id: cleanup-failure
    text: A failed test-resource deletion requires manual cleanup; removing the awsbackup-restore-test
      tag can cause cleanup failure.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing.html
  - id: restore-time-control
    text: The Audit Manager restore-time control is noncompliant when LatestRestoreExecutionTimeMinutes
      exceeds maxRestoreTime, measured in minutes.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/controls-and-remediation.html#restore-time-meets-target-control
  - id: control-period
    text: The Audit Manager restore-time control runs automatically every 24 hours.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/controls-and-remediation.html#restore-time-meets-target-control
  - id: restore-no-sla
    text: AWS Backup provides no restore-time service-level agreement; times vary with system load and
      capacity.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/controls-and-remediation.html#restore-time-meets-target-control
  - id: test-troubleshooting
    text: Restore testing can fail because of missing subnet settings, an unassumable restore role, or
      insufficient resource and KMS-key permissions.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/restore-testing.html
diagrams:
  - id: backup-restore-validation
    title: Restore, validate, and clean up test resources
    width: 1000
    height: 230
    nodes:
      - id: restore
        label: Restore test
        sub: AWS Backup
        icon: backup
        x: 25
        y: 90
        w: 180
        h: 86
        tone: storage
        info: The scheduled test restores resources and records restore-job duration.
      - id: event
        label: Completed event
        sub: EventBridge
        icon: eventbridge
        x: 275
        y: 90
        w: 180
        h: 86
        tone: integration
        info: A rule matches the restore job COMPLETED event.
      - id: validate
        label: Validation
        sub: Lambda
        icon: lambda
        x: 525
        y: 90
        w: 180
        h: 86
        tone: compute
        info: Run application checks and report the result with PutRestoreValidationResult.
      - id: cleanup
        label: Cleanup
        sub: AWS Backup
        icon: backup
        x: 775
        y: 90
        w: 180
        h: 86
        tone: storage
        info: Delete test resources after validation completes or its window closes.
    edges:
      - from: restore
        to: event
        step: 1
        label: complete
      - from: event
        to: validate
        step: 2
        label: invoke
      - from: validate
        to: cleanup
        step: 3
        label: finish
    steps:
      - AWS Backup emits the restore completion event.
      - EventBridge invokes the configured validation workflow.
      - AWS Backup cleans up after validation or window expiry.
cards:
  - id: backup-010
    q: What does an AWS Backup restore testing plan configure and measure?
    a: It schedules restores from selected vaults using eligible latest or random recovery points,
      assigned resources, and a restore role. It records restore-job duration and cleans up test
      resources.
    facts:
      - testing-purpose
      - test-selection
      - test-resource-role
      - test-cleanup
  - id: backup-011
    q: Does a completed AWS Backup restore test automatically establish that the restored application
      works?
    a: Add application validation. A COMPLETED restore event can trigger a Lambda workflow through
      EventBridge, and PutRestoreValidationResult records its outcome.
    trap: true
    facts:
      - event-validation
      - validation-result
  - id: backup-013
    q: Auditors need scheduled AWS Backup evidence that resource restores meet a target duration. What
      should the team configure?
    a: Restore testing plus the AWS Backup Audit Manager restore-time control. Set maxRestoreTime in
      minutes and compare it with recorded restore execution time.
    facts:
      - testing-purpose
      - restore-time-control
  - id: backup-030
    q: An AWS Backup test resource must remain available while automated health checks run. Which
      setting controls cleanup timing?
    a: Set the validation retention window, from 1 to 168 hours in the console. Cleanup follows
      completed validation or window expiry.
    facts:
      - cleanup-window
      - test-cleanup
  - id: backup-031
    q: An AWS Backup restore-time audit control passes. Does AWS guarantee future restores meet that
      duration?
    a: No. AWS Backup has no restore-time SLA. The control evaluates recorded execution time against the
      configured target.
    trap: true
    facts:
      - restore-time-control
      - restore-no-sla
  - id: backup-032
    q: An AWS Backup restore testing job reports failed resource deletion. What must the operator do?
    a: Clean up the restored resource manually. Check whether the awsbackup-restore-test tag was
      removed.
    facts:
      - cleanup-failure
---

AWS Backup restore testing runs scheduled restores and measures their duration. Add application validation to check that restored resources work, then use AWS Backup Audit Manager to compare resource restore time with a target.

### How it works

1. Create a restore testing plan with a schedule, start window, source vaults, recovery point eligibility range, and latest or random selection.
2. Assign protected resources and an IAM restore role, an identity with permission to restore them. Review the inferred restore parameters, such as subnet and encryption-key settings.
3. AWS Backup runs the restore and records its duration. For validation, route an EventBridge `COMPLETED` restore event to a workflow such as a Lambda function that checks application health.
4. Call `PutRestoreValidationResult` to record the validation outcome. A recorded validation status cannot be changed.
5. AWS Backup deletes the test resources after validation completes or its window closes. If deletion fails, clean up manually and check the `awsbackup-restore-test` tag.
6. Configure the Audit Manager restore-time control. It compares `LatestRestoreExecutionTimeMinutes` with `maxRestoreTime` in minutes.

### Exam cues

- If the question says provide recurring evidence of restore duration, think restore testing and the restore-time audit control, because they measure and evaluate resource restores.
- If the question says confirm that an application works after restoration, think event-driven validation, because a completed restore job can trigger application checks.
- If the question says a test cannot access a key or subnet, think restore parameters and role permissions, because restore testing needs those resources to complete.

### Remember

- Console validation retention: 1 to 168 hours.
- Restore-time control evaluation: every 24 hours.
- AWS Backup provides no restore-time service-level agreement (SLA), a contractual time guarantee.

> **Trap:** Resource restore duration and application validation are separate results. A duration below the audit target does not replace application health checks.
