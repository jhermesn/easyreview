---
title: Launch and scaling operations
level: professional
order: 100
facts:
  - id: reservation-strategy
    text: Reservations then balanced fills targeted Capacity Reservations before distributing remaining capacity
      evenly; a reservation ID or Capacity Reservation resource group is required.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-availability-zone-balanced.html
  - id: template-permissions
    text: Launch template authorization requires ec2:RunInstances, ec2:CreateTags when tags are specified, and
      iam:PassRole when an instance profile is specified. A private cross-account AMI must be shared.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ts-as-launch-template.html#ts-launch-template-unauthorized-error
  - id: group-quota
    text: The default quota is 500 Auto Scaling groups per Region; increases can be requested for supported
      quotas, and EC2 and VPC quotas can also constrain a group.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-quotas.html
  - id: encrypted-volume-key
    text: A customer managed KMS key for encrypted Auto Scaling EBS volumes needs a key policy allowing the
      service-linked role to use the key and create grants.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/key-policy-requirements-EBS-encryption.html#configuring-key-policies
  - id: encrypted-volume-cross-account
    text: A KMS key in another account needs a key policy allowing the Auto Scaling account and a grant to the
      Auto Scaling service-linked role.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/key-policy-requirements-EBS-encryption.html#policy-example-cmk-cross-account-access
  - id: launch-result
    text: CONTINUE on a launch lifecycle hook permits the instance to enter service.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: launch-abandon
    text: ABANDON on a launch lifecycle hook permits termination and replacement of the instance.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: termination-result
    text: CONTINUE on a termination hook permits termination after any remaining lifecycle hooks complete.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: termination-abandon
    text: ABANDON on a termination hook permits termination and skips remaining hooks.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: timeout
    text: The default lifecycle hook heartbeat timeout is one hour.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: global-timeout
    text: A lifecycle hook global timeout is the smaller of 48 hours or 100 times its heartbeat timeout.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hook-considerations
  - id: complete
    text: CompleteLifecycleAction completes a lifecycle action and RecordLifecycleActionHeartbeat extends its wait within the overall timeout.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/completing-lifecycle-hooks.html#completing-lifecycle-hooks
  - id: sns-launch
    text: The autoscaling:EC2_INSTANCE_LAUNCH SNS notification reports a successful launch.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#auto-scaling-sns-notifications
  - id: sns-launch-error
    text: The autoscaling:EC2_INSTANCE_LAUNCH_ERROR SNS notification reports a failed launch.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#auto-scaling-sns-notifications
  - id: sns-terminate
    text: The autoscaling:EC2_INSTANCE_TERMINATE SNS notification reports successful termination.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#auto-scaling-sns-notifications
  - id: sns-terminate-error
    text: The autoscaling:EC2_INSTANCE_TERMINATE_ERROR SNS notification reports failed termination.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#auto-scaling-sns-notifications
  - id: sns-email
    text: To receive Auto Scaling event email, create an SNS topic, subscribe and confirm the email address, then configure group notification types; delivery is best effort.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#as-configure-sns
  - id: event-filter
    text: Auto Scaling emits best-effort EventBridge events with source aws.autoscaling for lifecycle wait states and successful or failed scaling actions.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-event-reference.html#ec2-auto-scaling-event-reference
  - id: event-lambda
    text: EventBridge rules can filter lifecycle notifications and route them to Lambda, SNS or SQS.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html#lifecycle-hooks
  - id: direct-notification-role
    text: A direct SNS or SQS lifecycle hook notification target requires an IAM role that allows Auto Scaling to publish to the target.
    source: https://docs.aws.amazon.com/autoscaling/ec2/APIReference/API_PutLifecycleHook.html#API_PutLifecycleHook_RequestParameters
  - id: forecast-data
    text: Predictive scaling requires at least 24 hours of metric data and analyzes up to 14 days of history.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/predictive-scaling-policy-overview.html#how-predictive-scaling-works
  - id: forecast-window
    text: Predictive scaling produces an hourly forecast for the next 48 hours and updates it every 6 hours.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/predictive-scaling-policy-overview.html#how-predictive-scaling-works
  - id: fallback
    text: When policy warmup is omitted, target tracking uses group default instance warmup, or group default cooldown if default warmup is unset.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#as-target-tracking-scaling-warmup
  - id: size
    text: By default warm-pool size is group maximum capacity minus desired capacity.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#warm-pool-core-concepts
  - id: prepared
    text: MaxGroupPreparedCapacity replaces group maximum capacity in the warm-pool sizing calculation.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#warm-pool-core-concepts
  - id: minimum
    text: MinSize sets a minimum warm-pool size; by default no minimum is set.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#warm-pool-core-concepts
  - id: cold
    text: An empty warm pool causes scale-out to launch directly into the group as a cold start, subject to maximum capacity.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/warm-pool-instance-lifecycle.html#warm-pool-instance-lifecycle
cards:
  - id: ec2-auto-scaling-072
    q: An EC2 Auto Scaling group must use its Capacity Reservations before balancing remaining instances across
      Availability Zones. What does it configure?
    a: Reservations then balanced, with a reservation ID or Capacity Reservation resource group as the target.
    facts:
      - reservation-strategy
  - id: ec2-auto-scaling-074
    q: An EC2 Auto Scaling launch template specifies tags, an instance profile and a private AMI owned by another
      account. What should an administrator check after an authorization error?
    a: Check ec2:RunInstances, ec2:CreateTags and iam:PassRole permissions, and ensure the AMI is shared with the
      group account.
    facts:
      - template-permissions
  - id: ec2-auto-scaling-075
    q: An account cannot create another EC2 Auto Scaling group in a Region. Which default quota should it check?
    a: The default is 500 groups per Region. Check Service Quotas for the account's actual limit and request an
      increase if needed.
    facts:
      - group-quota
  - id: ec2-auto-scaling-077
    q: EC2 Auto Scaling cannot launch instances with EBS volumes encrypted by a customer managed KMS key in
      another account. What access must be configured?
    a: Allow key use and grant creation in the key policy, then create a cross-account grant for the Auto Scaling
      service-linked role.
    facts:
      - encrypted-volume-key
      - encrypted-volume-cross-account
  - id: ec2-auto-scaling-015
    q: What does ABANDON do for EC2 Auto Scaling launch and termination lifecycle hooks?
    a: On launch, it permits termination and replacement. On termination, it permits termination and skips remaining hooks; CONTINUE lets remaining hooks complete.
    trap: true
    facts:
      - launch-result
      - launch-abandon
      - termination-result
      - termination-abandon
  - id: ec2-auto-scaling-043
    q: How long can an EC2 Auto Scaling lifecycle hook wait, and how can automation keep it alive?
    a: Heartbeat timeout defaults to one hour. RecordLifecycleActionHeartbeat extends the wait, up to the smaller of 48 hours or 100 times the heartbeat timeout.
    facts:
      - timeout
      - global-timeout
      - complete
  - id: ec2-auto-scaling-044
    q: An EC2 Auto Scaling team needs emails for successful launches and terminations. What configuration is required?
    a: Configure an SNS topic with a confirmed email subscription and the group notification types autoscaling:EC2_INSTANCE_LAUNCH and autoscaling:EC2_INSTANCE_TERMINATE.
    facts:
      - sns-launch
      - sns-launch-error
      - sns-terminate
      - sns-terminate-error
      - sns-email
  - id: ec2-auto-scaling-047
    q: An EC2 Auto Scaling team wants different automation for launch waits, termination waits and scaling failures. What should route the events?
    a: EventBridge rules filtering source aws.autoscaling and the event type, then routing matching notifications to the required targets.
    facts:
      - event-filter
      - event-lambda
  - id: ec2-auto-scaling-068
    q: Which EC2 Auto Scaling SNS notification types report failed instance launches and terminations?
    a: autoscaling:EC2_INSTANCE_LAUNCH_ERROR and autoscaling:EC2_INSTANCE_TERMINATE_ERROR.
    facts:
      - sns-launch-error
      - sns-terminate-error
  - id: ec2-auto-scaling-069
    q: An EC2 Auto Scaling lifecycle hook sends notifications directly to an Amazon SQS queue. What permission configuration does the hook need?
    a: An IAM role that allows Auto Scaling to publish to the queue.
    facts:
      - direct-notification-role
  - id: ec2-auto-scaling-037
    q: How much history does EC2 Auto Scaling predictive scaling need, and how far ahead does it forecast?
    a: At least 24 hours of data; up to 14 days are analyzed. It forecasts hourly capacity for 48 hours and updates the forecast every 6 hours.
    facts:
      - forecast-data
      - forecast-window
  - id: ec2-auto-scaling-038
    q: An EC2 Auto Scaling target tracking policy has no warmup override or group default warmup. Which fallback applies?
    a: The group default cooldown. Configure group default instance warmup to give policies a shared initialization period.
    trap: true
    facts:
      - fallback
  - id: ec2-auto-scaling-048
    q: How is an EC2 Auto Scaling warm pool sized by default, and what changes the calculation?
    a: Maximum group capacity minus desired capacity. MaxGroupPreparedCapacity supplies a separate prepared-capacity limit; MinSize can maintain a minimum pool size.
    facts:
      - size
      - prepared
      - minimum
  - id: ec2-auto-scaling-051
    q: An EC2 Auto Scaling warm pool is empty when demand rises. Does scale-out have to wait for it to refill?
    a: No. Instances can cold-start directly into the group, subject to maximum capacity.
    trap: true
    facts:
      - cold
revised:
  - date: 2026-11-23
    note: The notification card now tests the SNS events for failed launches and terminations.
    cards: [ec2-auto-scaling-068]
---
EC2 Auto Scaling operations depend on launch permissions, lifecycle decisions and scaling settings. Knowing where each setting applies helps diagnose failed launches and control what happens as instances enter or leave a group.

### How it works

1. Choose Reservations then balanced to fill targeted Capacity Reservations before distributing remaining capacity evenly. Supply a reservation ID or Capacity Reservation resource group.
2. For launch authorization errors, check `ec2:RunInstances`, `ec2:CreateTags` when tags are specified, and `iam:PassRole` when an instance profile is specified. A private AMI from another account must be shared with the group account. See launch template troubleshooting.
3. For encrypted EBS volumes, allow the Auto Scaling service-linked role to use the customer managed KMS key and create grants in its key policy. For a cross-account key, also allow the Auto Scaling account in the key policy and create a grant for its service-linked role.
4. Complete a lifecycle action with `CompleteLifecycleAction`, or extend its wait with `RecordLifecycleActionHeartbeat` within the overall timeout. On launch, `CONTINUE` permits service entry and `ABANDON` permits termination and replacement. On termination, `CONTINUE` allows remaining hooks to complete, while `ABANDON` skips them. See completing lifecycle actions and hook considerations.
5. Route lifecycle wait and scaling outcome events with EventBridge rules, filtering source `aws.autoscaling` and event type. Lifecycle notifications can target Lambda, SNS or SQS. A direct SNS or SQS hook target needs an IAM role that permits Auto Scaling to publish.
6. For scaling event email, create an SNS topic, subscribe and confirm the email address, then configure group notification types. Both SNS delivery and EventBridge events are best effort.

| SNS notification type | Outcome |
|---|---|
| `autoscaling:EC2_INSTANCE_LAUNCH` | Successful launch |
| `autoscaling:EC2_INSTANCE_LAUNCH_ERROR` | Failed launch |
| `autoscaling:EC2_INSTANCE_TERMINATE` | Successful termination |
| `autoscaling:EC2_INSTANCE_TERMINATE_ERROR` | Failed termination |

### Exam cues

- If the question says route different lifecycle waits or scaling failures to automation, think EventBridge rules, because they filter events by source and type.
- If the question says target tracking has no policy warmup or group default warmup, think group default cooldown, because it is the fallback.
- If the question says an empty warm pool must scale out, think a cold start directly into the group, because scale-out is subject to maximum capacity.
- If the question says a group cannot be created, think regional group quota, because the default is 500 groups per Region. EC2 and VPC quotas can also constrain a group.

### Remember

- The lifecycle hook heartbeat timeout defaults to 1 hour. The global timeout is the smaller of 48 hours or 100 times the heartbeat timeout.
- Predictive scaling needs at least 24 hours of data and analyzes up to 14 days. It forecasts hourly capacity for 48 hours and updates the forecast every 6 hours.
- Warm-pool sizing defaults to group maximum capacity minus desired capacity. `MaxGroupPreparedCapacity` replaces the maximum in that calculation; `MinSize` sets a minimum, with none set by default.

> **Trap:** `ABANDON` has different effects at launch and termination. A launch can be terminated and replaced; a termination proceeds while remaining hooks are skipped.
