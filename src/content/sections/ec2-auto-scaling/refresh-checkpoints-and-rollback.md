---
title: Refresh checkpoints and rollback
level: professional
order: 80
facts:
  - id: checkpoints
    text: Instance refresh checkpoints pause replacement at configured percentages so operators can evaluate a partial deployment.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-overview
  - id: delay
    text: Checkpoint delay defaults to 3600 seconds when checkpoints are used.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: bake
    text: Bake time is the wait at the end of instance refresh before it is considered complete; its default is zero.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: disabled
    text: Instance refresh CloudWatch alarm specifications are disabled by default.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: checkpoint-default
    text: Instance refresh checkpoints are disabled by default.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: rollback-default
    text: Instance refresh auto rollback is disabled by default.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: alarm
    text: A configured CloudWatch alarm entering ALARM can fail a refresh; enabling auto rollback restores the previous configuration after failure.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html#instance-refresh-rollback
  - id: rollback
    text: Rollback replaces instances deployed so far with instances matching the configuration saved on the group before the refresh.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html#instance-refresh-rollback
  - id: desired-required
    text: Rollback requires specifying a desired configuration when starting the refresh.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html#instance-refresh-rollback-considerations
  - id: numbered
    text: Rollback requires a specific numbered launch template version; it is not available for $Latest or $Default.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html#instance-refresh-rollback-considerations
  - id: alias
    text: Rollback cannot restore a launch template using an AMI alias from Systems Manager Parameter Store.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html#instance-refresh-rollback-considerations
  - id: finished
    text: Rollback is available only while a refresh is in progress; after completion, reverting requires a new refresh.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-rollback.html#instance-refresh-rollback
  - id: protected
    text: Scale-in protected instances can be replaced with Refresh, skipped with Ignore or waited on for one hour with Wait before failure.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: standby
    text: Standby instances can be terminated with Terminate, skipped with Ignore or waited on for one hour with Wait before failure.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: defaults
    text: For protected and Standby instances, CLI and SDK default to Wait while the console defaults to Ignore.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: skip
    text: Skip matching keeps instances already matching the desired launch template and instance types.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: events
    text: Auto Scaling emits best-effort EventBridge events for checkpoints, refresh start, success, failure, cancellation and rollback start, success or failure.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-eventbridge-events.html#instance-refresh-eventbridge-events
  - id: limit
    text: A refresh can actively replace instances for at most 14 days.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-limitations
cards:
  - id: ec2-auto-scaling-020
    q: How can an EC2 Auto Scaling team reduce instance refresh deployment risk?
    a: Use checkpoints to inspect partial deployment, alarms with auto rollback for failure recovery, and skip matching to keep matching instances. Explicitly choose how protected and Standby instances are handled.
    facts:
      - checkpoints
      - alarm
      - skip
      - protected
      - standby
  - id: ec2-auto-scaling-026
    q: An EC2 Auto Scaling image rollout must pause in phases and revert if error alarms fire. Which settings apply?
    a: Instance refresh checkpoints, a configured CloudWatch alarm and auto rollback. Bake time adds observation time at the end. Checkpoint delay defaults to one hour; active replacement is limited to 14 days.
    facts:
      - checkpoints
      - alarm
      - bake
      - delay
      - limit
  - id: ec2-auto-scaling-055
    q: An EC2 Auto Scaling group uses $Latest for its launch template version. Can its instance refresh use rollback?
    a: No. Rollback needs a specific numbered version and a desired configuration supplied when the refresh starts. Parameter Store AMI aliases are also unsupported for rollback.
    trap: true
    facts:
      - numbered
      - desired-required
      - alias
  - id: ec2-auto-scaling-056
    q: An EC2 Auto Scaling refresh completed successfully, but an application problem was found afterward. Can the completed operation be rolled back?
    a: No. Start a new refresh to deploy the previous configuration. Rollback is only available while a refresh is in progress.
    trap: true
    facts:
      - finished
  - id: ec2-auto-scaling-057
    q: An EC2 Auto Scaling refresh started through the CLI stops at protected or Standby instances. Which default explains this?
    a: Wait. It gives one hour to remove protection or return the instance to service before failure; the console defaults to Ignore.
    facts:
      - protected
      - standby
      - defaults
  - id: ec2-auto-scaling-058
    q: An EC2 Auto Scaling team wants automation when refresh checkpoints or rollback outcomes occur. Which event source applies?
    a: Auto Scaling instance refresh events in EventBridge. Events cover checkpoints and refresh or rollback state changes and are best effort.
    facts:
      - events
---
Checkpoints pause an instance refresh after part of the fleet is replaced. Rollback restores the configuration saved before the refresh. Together they let operators inspect partial deployment and respond to health or application alarms.

### How it works

1. Save a stable previous configuration with a numbered launch template version. Start the refresh with an explicit desired configuration so rollback is available.
2. Configure checkpoint percentages to pause replacement in phases. Checkpoint delay controls how long each pause lasts.
3. Configure CloudWatch alarms and enable auto rollback. An alarm entering ALARM can fail the refresh; rollback replaces instances deployed so far with the previous configuration.
4. Set bake time if the complete fleet needs observation before the operation finishes. Bake time is a final wait, separate from the pauses at checkpoints.
5. Use EventBridge refresh events for checkpoint notifications and refresh or rollback outcomes. Delivery is best effort.

| Instance condition | Available actions | Default |
|---|---|---|
| Scale-in protected | Refresh, Ignore, Wait | CLI/SDK Wait; console Ignore |
| Standby | Terminate, Ignore, Wait | CLI/SDK Wait; console Ignore |
| Already matches desired settings | Skip matching | Keep matching instances |

### Exam cues

- If the question says inspect a partial image rollout, think checkpoints, because replacement pauses at configured percentages.
- If the question says application errors should restore the old configuration, think alarms plus auto rollback, because an alarm can fail the refresh and trigger recovery.
- If the question says rollback is unavailable with $Latest, think pin a numbered template version and supply desired configuration, because rollback requires those settings.
- If the question says automation must react to a refresh failure, think EventBridge refresh state events, because they describe the operation outcome.

### Remember

- Checkpoints, alarms and auto rollback default off.
- Checkpoint delay defaults to 3600 seconds; bake time defaults to zero.
- Wait for protected or Standby instances allows one hour before failure.
- Active replacement can last at most 14 days.
- Rollback does not support $Latest, $Default or a Parameter Store AMI alias.

> **Trap:** An alarm can fail a refresh without restoring the old configuration when auto rollback is off. After a refresh completes, reverting requires a new refresh.
