---
title: Snapshot lifecycle management
level: associate
order: 40
facts:
  - id: responsibility
    text: AWS does not automatically back up EBS data; create snapshots or configure snapshot automation.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html#ebs-snapshots
  - id: dlm
    text: Data Lifecycle Manager (DLM) automates creation, retention and deletion of EBS snapshots and
      EBS-backed AMIs.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/snapshot-lifecycle.html#snapshot-lifecycle
  - id: tags
    text: A custom DLM snapshot policy selects source volumes or instances using matching tag key-value
      pairs.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/snapshot-ami-policy.html#create-snap-policy
  - id: target-instance
    text: A DLM policy targeting an instance creates a multi-volume snapshot set; targeting a volume
      snapshots that volume.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/snapshot-ami-policy.html#create-snap-policy
  - id: retention
    text: DLM snapshot retention can use snapshot count or age; all schedules in a policy share the
      retention type.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/snapshot-ami-policy.html#create-snap-policy
  - id: schedule
    text: DLM custom policies support daily, weekly, monthly, yearly or cron schedules; the first run
      begins within an hour after its scheduled UTC time.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/snapshot-ami-policy.html#create-snap-policy
  - id: copy-fsr
    text: DLM snapshot policies can configure cross-Region copies, cross-account sharing and FSR in
      selected AZs.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/snapshot-ami-policy.html#create-snap-policy
  - id: owned-only
    text: DLM cannot manage snapshots or AMIs created by other means, and does not manage
      instance-store-backed AMIs.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/snapshot-lifecycle.html#snapshot-lifecycle
  - id: fee
    text: DLM has no additional service charge; storage and other enabled features can still incur
      charges.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/snapshot-lifecycle.html#snapshot-lifecycle
  - id: cross-account
    text: DLM cross-account automation uses a source snapshot policy that shares snapshots and a
      destination event policy that copies them.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/event-policy.html#event-policy
  - id: same-region
    text: The DLM source sharing policy and destination cross-account event policy must be created in
      the same Region; copies can target other Regions.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/event-policy.html#event-policy
  - id: backup
    text: AWS Backup centrally configures, schedules and monitors backups for EBS and other supported
      AWS services.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#backup-and-restore
  - id: eventbridge
    text: EventBridge supports EBS CreateSnapshot as a built-in target; rules with built-in targets are
      created through the console.
    source: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutTargets.html#API_PutTargets
  - id: app-consistent
    text: DLM pre and post scripts can pause application I/O and flush buffered data before snapshots,
      then resume normal I/O after creation.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/automate-app-consistent-backups.html#automate-app-consistent-backups
  - id: instance-scripts
    text: DLM application-consistent pre and post scripts require snapshot policies targeting instances
      and run through Systems Manager command documents.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/automate-app-consistent-backups.html#automate-app-consistent-backups
cards:
  - id: ebs-004
    q: Does AWS automatically create backups for an EBS volume with no configured backup policy?
    a: No. Create snapshots yourself or configure DLM or AWS Backup.
    trap: true
    facts:
      - responsibility
  - id: ebs-006
    q: What does EBS Data Lifecycle Manager automate?
    a: The creation, retention and deletion of EBS snapshots and EBS-backed AMIs. Snapshot policies can
      select tagged resources, copy across Regions, share across accounts and enable FSR.
    facts:
      - dlm
      - tags
      - copy-fsr
  - id: ebs-007
    q: Can DLM apply its lifecycle policy to EBS snapshots created manually or by AWS Backup?
    a: No. DLM cannot manage snapshots created by other means.
    trap: true
    facts:
      - owned-only
  - id: ebs-015
    q: Tagged EBS volumes need nightly snapshots, a fixed number of retained snapshots and a copy in
      another Region. Which tool fits?
    a: A DLM custom snapshot policy targeting the resource tags, with a nightly schedule, count-based
      retention and a cross-Region copy rule.
    facts:
      - tags
      - schedule
      - retention
      - copy-fsr
  - id: ebs-029
    q: An AWS backup requirement covers EBS, EFS and databases under one centrally managed plan. Should
      the team use only DLM?
    a: Use AWS Backup for supported services. DLM focuses on EBS snapshots and EBS-backed AMIs.
    facts:
      - backup
      - dlm
  - id: ebs-030
    q: A DLM source account shares snapshots with an isolated recovery account. What automation must the
      recovery account configure?
    a: A cross-account copy event policy in the same Region as the source sharing policy. It can copy
      shared snapshots to configured destination Regions.
    facts:
      - cross-account
      - same-region
  - id: ebs-031
    q: A team wants an EventBridge rule to invoke the EBS CreateSnapshot operation directly without
      Lambda. Is there a built-in target?
    a: Yes. EBS CreateSnapshot is a built-in EventBridge target; create rules with built-in targets
      through the console.
    facts:
      - eventbridge
  - id: ebs-032
    q: A database needs scheduled EBS snapshots with buffered writes flushed before capture. Which DLM
      feature fits?
    a: Pre and post scripts for application-consistent snapshots. Prepare application I/O before the
      snapshot and resume it afterward.
    facts:
      - app-consistent
      - instance-scripts
---
Data Lifecycle Manager (DLM) automates EBS snapshot and EBS-backed Amazon Machine Image (AMI) management. An AMI is the machine image used to launch an EC2 instance. DLM applies a schedule and retention rules, which decide how long backups remain.

### How it works

1. Select source volumes or instances with tags, resource labels written as key-value pairs. An instance target creates a multi-volume snapshot set; a volume target backs up that volume.
2. Choose a schedule and retention by count or age. The first run begins within an hour after its scheduled time in UTC, the reference time zone used by the schedule.
3. For application-consistent snapshots, use an instance-targeted policy and Systems Manager pre and post scripts to pause application I/O, flush buffered data and resume normal I/O.
4. Configure copies in another Region, sharing with other accounts or fast snapshot restore (FSR), which prepares snapshot restores for immediate volume performance.
5. For isolated account copies, the source policy shares snapshots and the destination's event policy copies them. Create both policies in the same Region; the copies can go to other Regions.

| Need | Mechanism | Scope |
|---|---|---|
| Scheduled EBS snapshots and cleanup | DLM policy | DLM-created resources |
| One backup plan across supported services | AWS Backup | EBS and other supported services |
| Direct event-triggered snapshot call | EventBridge built-in EBS CreateSnapshot target | Create rules with this target through the console |

### Exam cues

- If the question says tagged EBS volumes need scheduled snapshots, cleanup and regional copies, think DLM, because its policy covers that lifecycle.
- If the question says one backup plan spans storage and databases, think AWS Backup, because it supports multiple services.
- If the question says another account must own automated copies of shared snapshots, think a destination DLM event policy, because source sharing alone does not create the owned copy.
- If the question says invoke CreateSnapshot directly from an event rule without Lambda, think the EventBridge built-in target, because it can call the operation.

### Remember

- Configure backups; volume replication is not an automatic snapshot policy.
- DLM manages only resources it created, including EBS-backed AMIs.
- Retention can use count or age, with one retention type across a policy's schedules.
- DLM has no additional service fee. Snapshot storage, copies and FSR can incur charges.

> **Trap:** A DLM policy cannot clean up snapshots created manually or by AWS Backup. Manage those through the mechanism that owns them.
