---
title: Instance refresh
level: associate
order: 70
facts:
  - id: refresh
    text: An instance refresh replaces group instances using an updated launch template or instance configuration.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-overview
  - id: template-update
    text: Updating the launch template used by a group affects new launches but does not update existing instances.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html#update-warm-pool
  - id: minimum
    text: Without an instance maintenance policy, instance refresh defaults to a minimum healthy percentage of 90 percent.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: maximum
    text: Without an instance maintenance policy, instance refresh defaults to a maximum healthy percentage of 100 percent.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: health-budget
    text: Minimum healthy percentage defines how much desired capacity must remain healthy and ready during replacement.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-core-concepts
  - id: maximum-budget
    text: Maximum healthy percentage defines the capacity increase allowed during instance refresh replacement.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-core-concepts
  - id: launch-first
    text: Setting both minimum and maximum healthy percentage to 100 makes instance refresh replace instances one at a time by launching before terminating.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-core-concepts
  - id: all-at-once
    text: A minimum healthy percentage of 0 allows all instances to be replaced at once.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-core-concepts
  - id: warmup
    text: After replacement instances pass health checks, refresh waits for instance warmup before proceeding to further replacements.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-core-concepts
  - id: warmup-default
    text: Refresh warmup defaults to group default instance warmup if configured, otherwise the health check grace period.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: desired
    text: Scale-out during instance refresh launches instances with the refresh desired configuration.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-core-concepts
  - id: save-desired
    text: A successful instance refresh saves the desired configuration to the Auto Scaling group.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-core-concepts
  - id: skip
    text: Skip matching avoids replacing instances that already match the desired launch template and instance types.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: skip-default
    text: Skip matching defaults to enabled in the console and disabled in the CLI or SDK.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: safety-defaults
    text: Instance refresh CloudWatch alarm specifications are disabled by default.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: rollback-default
    text: Instance refresh auto rollback is disabled by default.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: checkpoint-default
    text: Instance refresh checkpoints are disabled by default.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: bake-default
    text: Instance refresh bake time defaults to zero.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/understand-instance-refresh-default-values.html#understand-instance-refresh-default-values
  - id: limit
    text: An instance refresh can actively replace instances for at most 14 days.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/instance-refresh-overview.html#instance-refresh-limitations
  - id: skip-user-data
    text: Skip matching cannot detect updated code fetched by an unchanged user data script; disable it when all instances must rerun that setup.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-instance-refresh-skip-matching.html#asg-instance-refresh-skip-matching
cards:
  - id: ec2-auto-scaling-002
    q: An EC2 Auto Scaling fleet needs a new machine image while keeping serving capacity during replacement. Which feature and health settings apply?
    a: Instance refresh. Set the healthy capacity budget; minimum and maximum healthy percentages of 100 launch replacements before terminating, one at a time.
    facts:
      - refresh
      - launch-first
      - health-budget
      - maximum-budget
  - id: ec2-auto-scaling-019
    q: An EC2 Auto Scaling launch template was updated, but existing instances still run the old image. What should the team start?
    a: An instance refresh. A template update affects future launches and does not replace existing instances.
    trap: true
    facts:
      - refresh
      - template-update
  - id: ec2-auto-scaling-024
    q: How should a team replace EC2 Auto Scaling instances after publishing a new machine image?
    a: Use an updated launch template as the instance refresh configuration, then run and monitor the refresh. It replaces the existing instances.
    facts:
      - refresh
      - template-update
  - id: ec2-auto-scaling-025
    q: Which EC2 Auto Scaling instance refresh defaults apply without an instance maintenance policy?
    a: Minimum healthy 90%, maximum healthy 100%. Warmup uses group default instance warmup, then health check grace period. Alarms, auto rollback and checkpoints are off; bake time is zero.
    facts:
      - minimum
      - maximum
      - warmup-default
      - safety-defaults
      - rollback-default
      - checkpoint-default
      - bake-default
  - id: ec2-auto-scaling-027
    q: An EC2 Auto Scaling group scales out during an instance refresh. Which launch settings do those new instances use?
    a: The refresh desired configuration. After the refresh succeeds, that configuration is saved to the group.
    facts:
      - desired
      - save-desired
  - id: ec2-auto-scaling-028
    q: An EC2 Auto Scaling instance refresh should leave instances that match the desired configuration alone. Which setting applies?
    a: Skip matching. It defaults to enabled in the console and disabled in CLI or SDK requests. It cannot detect updated code downloaded by unchanged user data; disable it when every instance must rerun setup.
    trap: true
    facts:
      - skip
      - skip-default
      - skip-user-data
  - id: ec2-auto-scaling-053
    q: An EC2 Auto Scaling instance refresh must wait for application stabilization after replacement health checks pass. Which control does this?
    a: Instance warmup. Refresh waits for that period before moving to further replacements.
    facts:
      - warmup
  - id: ec2-auto-scaling-054
    q: How long can an EC2 Auto Scaling instance refresh actively replace instances?
    a: At most 14 days.
    facts:
      - limit
diagrams:
  - id: asg-refresh-flow
    title: Replace capacity before continuing the refresh
    width: 1080
    height: 210
    nodes:
      - id: n0
        label: Configuration
        sub: desired launch settings
        icon: ec2-auto-scaling
        x: 30
        y: 65
        w: 210
        h: 86
        tone: compute
      - id: n1
        label: Replacement
        sub: launch instance
        icon: res-ec2-instance
        x: 300
        y: 65
        w: 210
        h: 86
        tone: compute
      - id: n2
        label: Healthy and warm
        sub: wait for initialization
        icon: res-ec2-instance
        x: 570
        y: 65
        w: 210
        h: 86
        tone: compute
      - id: n3
        label: Next replacement
        sub: repeat within budget
        icon: ec2-auto-scaling
        x: 840
        y: 65
        w: 210
        h: 86
        tone: compute
    edges:
      - from: n0
        to: n1
        step: 1
      - from: n1
        to: n2
        step: 2
      - from: n2
        to: n3
        step: 3
    steps:
      - Apply the desired configuration to a replacement.
      - Wait for its health checks and warmup.
      - Proceed with further replacements within the healthy capacity budget.
---
Instance refresh replaces EC2 Auto Scaling instances with an updated configuration. It rolls a new machine image or instance setup through the fleet; updating a launch template alone changes future launches.

### How it works

1. Prepare the launch template and desired configuration, meaning the settings the refresh should deploy.
2. Set the healthy capacity budget. Minimum healthy percentage is the floor for capacity that stays healthy and ready; maximum healthy percentage controls the allowed increase during replacement.
3. Replace instances, wait for health checks and instance warmup, then continue. Warmup is the stabilization period before the refresh treats a new instance as initialized.
4. Enable skip matching to keep instances already using the desired launch template and instance types. User data is the startup script supplied with the launch settings. If an unchanged script downloads updated code, disable skip matching so every instance is replaced.
5. Scale-out during the operation uses the desired configuration. After success, Auto Scaling saves that configuration to the group.

### Exam cues

- If the question says a new image exists but serving instances remain unchanged, think instance refresh, because a launch template change does not replace them.
- If the question says launch before removing serving capacity, think minimum and maximum healthy percentages of 100, because that configuration replaces one instance at a time by launching first.
- If the question says current instances are being needlessly replaced, think skip matching, because it compares their configuration with the desired settings.

### Remember

- Without an instance maintenance policy: minimum healthy 90%, maximum healthy 100%.
- Minimum healthy 0% permits replacing all instances at once.
- Refresh warmup uses default instance warmup, then health check grace period if unset.
- Skip matching: console on; CLI and SDK off.
- Alarms, auto rollback and checkpoints default off; bake time defaults to zero.
- Active replacement limit: 14 days.

> **Trap:** A new template version does not update running instances. Also, the refresh warmup fallback is the health check grace period.
