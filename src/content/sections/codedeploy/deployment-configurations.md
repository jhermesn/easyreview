---
title: Deployment configurations
level: associate
order: 60
facts:
  - id: configuration
    text: An EC2/On-Premises deployment configuration controls rollout rules and required healthy
      instance counts.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configuration-server
  - id: default
    text: CodeDeployDefault.OneAtATime is the default EC2/On-Premises deployment configuration.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configuration-server
  - id: all
    text: CodeDeployDefault.AllAtOnce attempts all instances concurrently and succeeds if at least one
      instance succeeds.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined
  - id: half-batch
    text: CodeDeployDefault.HalfAtATime updates up to half the instances in each batch, rounding down.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined
  - id: half-success
    text: CodeDeployDefault.HalfAtATime succeeds when at least half the instances succeed, rounding up.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined
  - id: half-groups
    text: HalfAtATime counts instances across all Auto Scaling groups in the deployment group, not
      separately per Auto Scaling group.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined
  - id: one
    text: CodeDeployDefault.OneAtATime deploys to one instance at a time and tolerates failure on the
      last instance when the group contains more than one instance.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined
  - id: single
    text: With a single instance, OneAtATime succeeds only if that instance deployment succeeds.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined
  - id: minimum
    text: Custom configurations specify minimum healthy hosts as an instance count or percentage.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations-create.html#deployment-configurations-create
  - id: zonal
    text: Zonal deployment requires a custom configuration and supports EC2 in-place deployments only,
      excluding on-premises and blue/green.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations-create.html#deployment-configurations-create
  - id: zone-monitor
    text: Zonal configurations can wait for a monitor duration after each zone; without one, deployment
      starts in the next zone immediately.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations-create.html#zonal-config
  - id: zone-rollback
    text: A zonal deployment rollback operates on random hosts rather than one zone at a time.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations-create.html#deployment-configurations-create
  - id: bluegreen-rate
    text: For EC2 blue/green, the configuration controls installation on replacements and the rate of
      registering replacements for traffic.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined
  - id: availability-zone
    text: An Availability Zone is a separate location within an AWS Region.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#using-regions-availability-zones
  - id: half-nine-example
    text: For nine instances, HalfAtATime deploys to up to four together and requires at least five
      successes.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html#deployment-configurations-predefined
  - id: group-concurrency
    text: A CodeDeploy deployment group permits one concurrent deployment.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/limits.html
  - id: inplace-duration
    text: EC2/On-Premises in-place deployments using predefined configurations or custom configurations
      created in June 2023 or later have a 12-hour limit; older custom configurations have eight hours.
    source: https://docs.aws.amazon.com/codedeploy/latest/userguide/limits.html
  - id: restart-mode
    text: CreateDeployment RESTART mode restarts the last successful revision without downloading a new
      revision and supports only EC2/On-Premises in-place deployments.
    source: https://docs.aws.amazon.com/codedeploy/latest/APIReference/API_CreateDeployment.html#CodeDeploy-CreateDeployment-request-deploymentMode
  - id: restart-restrictions
    text: RESTART mode rejects a specified revision and updateOutdatedInstancesOnly set to true.
    source: https://docs.aws.amazon.com/codedeploy/latest/APIReference/API_CreateDeployment.html#CodeDeploy-CreateDeployment-request-deploymentMode
cards:
  - id: codedeploy-005
    q: Which predefined EC2/On-Premises deployment configurations does CodeDeploy provide, and which is
      the default?
    a: CodeDeployDefault.AllAtOnce, CodeDeployDefault.HalfAtATime, and CodeDeployDefault.OneAtATime.
      OneAtATime is the default.
    facts:
      - default
      - all
      - half-batch
      - one
  - id: codedeploy-024
    q: For EC2/On-Premises CodeDeploy deployments, what success conditions distinguish AllAtOnce,
      HalfAtATime, and OneAtATime?
    a: AllAtOnce needs at least one success. HalfAtATime needs at least half, rounded up. OneAtATime
      tolerates only a last-instance failure in a group with multiple instances; a single-instance
      group must succeed.
    facts:
      - all
      - half-success
      - one
      - single
  - id: codedeploy-046
    q: A CodeDeploy HalfAtATime deployment targets nine EC2 instances. How many can be updated together,
      and how many must succeed?
    a: Up to four in a batch; at least five must succeed. Batch size rounds down and the success
      requirement rounds up.
    facts:
      - half-nine-example
  - id: codedeploy-047
    q: A CodeDeploy release must update EC2 instances one Availability Zone at a time while keeping
      healthy capacity in each zone. What should be configured?
    a: A custom deployment configuration with zonal configuration and minimum healthy hosts per zone.
      Predefined configurations do not provide this.
    facts:
      - minimum
      - zonal
  - id: codedeploy-048
    q: A CodeDeploy HalfAtATime deployment targets two Auto Scaling groups. Is half the capacity
      preserved in each group?
    a: No. The calculation spans the whole deployment group, so a batch may be concentrated in one Auto
      Scaling group.
    trap: true
    facts:
      - half-groups
  - id: codedeploy-065
    q: A CodeDeploy EC2 in-place deployment must restart the last successful application revision
      without downloading a new bundle. Which deployment mode applies?
    a: Use RESTART. Do not supply a revision or set updateOutdatedInstancesOnly to true. RESTART is not
      supported for ECS or Lambda deployments.
    facts:
      - restart-mode
      - restart-restrictions
  - id: codedeploy-066
    q: An EC2 in-place CodeDeploy deployment uses a custom configuration created before June 2023 and
      exceeds eight hours. Why can it time out sooner than a newer configuration?
    a: Older custom configurations have an eight-hour limit. Custom configurations created in June 2023
      or later and predefined configurations have a 12-hour limit.
    facts:
      - inplace-duration
  - id: codedeploy-067
    q: Can two CodeDeploy releases run concurrently against the same deployment group?
    a: No. A deployment group allows one concurrent deployment.
    facts:
      - group-concurrency
---
A deployment configuration defines how quickly CodeDeploy updates instances and when it calls the release successful. Minimum healthy hosts means the number or percentage of instances that must stay available during deployment.

### How it works

1. Choose a predefined configuration or create one with a required healthy instance count or percentage.
2. CodeDeploy updates batches allowed by that configuration and evaluates its success rules.
3. For EC2 blue/green, apply the rules when installing on replacements and registering them with the load balancer.
4. If the rollout must progress by Availability Zone, a separate AWS location within a Region, use a custom zonal configuration. Optionally wait after each zone before progressing.
5. To restart the last successful EC2/On-Premises in-place revision without downloading a new one, use `RESTART` mode. Do not provide a revision or set `updateOutdatedInstancesOnly` to true.

| EC2/On-Premises configuration | Deployment pace | Success rule |
|---|---|---|
| `CodeDeployDefault.AllAtOnce` | Attempt all at once | At least one succeeds |
| `CodeDeployDefault.HalfAtATime` | Up to half per batch, rounded down | At least half succeed, rounded up |
| `CodeDeployDefault.OneAtATime` | One instance at a time | All succeed, except a last-instance failure in a group with multiple instances |

### Exam cues

- If the question says nine instances use HalfAtATime, think batches of up to four and at least five successes, because the two calculations round in different directions.
- If the question says protect each Availability Zone during an EC2 in-place release, think custom zonal configuration, because predefined configurations do not support it.
- If the question says protect half of each Auto Scaling group, think beyond HalfAtATime alone, because its count covers the whole deployment group.
- If the question says an older custom in-place configuration times out after eight hours, check its creation date, because configurations created in June 2023 or later have a 12-hour limit.

### Remember

- Default: `CodeDeployDefault.OneAtATime`.
- A single-instance deployment must succeed even with OneAtATime.
- Zonal configuration supports EC2 in-place deployments only.
- Without a zonal monitor duration, the next zone starts immediately.
- A deployment group permits one concurrent deployment.
- The in-place limit is 12 hours for predefined configurations and custom configurations created in June 2023 or later, but eight hours for older custom configurations.

> **Trap:** A successful AllAtOnce deployment can still contain failed instances. Its success threshold is one instance.

> **Trap:** Zonal rollback uses random hosts; it does not replay the deployment one zone at a time.
