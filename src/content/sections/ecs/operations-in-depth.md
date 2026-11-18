---
title: "PLACEHOLDER ecs/operations-in-depth"
level: professional
order: 100
facts:
  - id: ecs-capacity-formula
    text: CapacityProviderReservation equals instances needed divided by running instances, multiplied
      by 100.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html
  - id: ecs-capacity-target
    text: targetCapacity defaults to 100%; above target ECS scales out, while below target it can scale
      in.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html
  - id: ecs-capacity-wait
    text: At targetCapacity 100%, new tasks can wait PENDING for new instances to register.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html
  - id: ecs-capacity-tag
    text: Removing the AmazonECSManaged Auto Scaling group tag prevents ECS from managing scaling.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html
  - id: ecs-capacity-policy
    text: Do not add competing scaling policies that manage desired capacity on an ECS managed Auto
      Scaling group.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html
  - id: ecs-capacity-max
    text: The Auto Scaling group MaxSize must exceed 0 to allow scale-out.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/asg-capacity-providers.html
  - id: ecs-capacity-protect
    text: Managed termination protection requires Auto Scaling instance scale-in protection and protects
      instances with non-daemon tasks from scale-in.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/managed-termination-protection.html
  - id: ecs-capacity-weight
    text: Strategy weight controls relative task distribution after base; at least one provider must
      have positive weight.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_CapacityProviderStrategyItem.html
  - id: ecs-capacity-weight-default
    text: An omitted weight defaults to 1 in the console and 0 in the API or CLI.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/asg-capacity-providers.html
  - id: ssm-agent
    text: The SSM Agent on an ECS Anywhere external instance holds IAM credentials that rotate every 30 minutes and refresh after a lost connection is restored.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-anywhere.html#ecs-anywhere-considerations
  - id: ecs-scale-deploy
    text: During ECS deployments, scale-in is suspended and scale-out continues unless suspended; this
      exception does not apply to EXTERNAL controllers.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html#service-auto-scaling-deployments
  - id: ecs-scale-suspend
    text: RegisterScalableTarget can suspend dynamic scaling with DynamicScalingInSuspended and
      DynamicScalingOutSuspended.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html#service-auto-scaling-deployments
cards:
  - id: ecs-015
    q: How does ECS managed scaling decide to add EC2 instances?
    a: It compares CapacityProviderReservation, instances needed / running instances x 100, with
      targetCapacity. The default target is 100%; tasks can wait while hosts register.
    facts:
      - ecs-capacity-formula
      - ecs-capacity-target
      - ecs-capacity-wait
  - id: ecs-016
    q: Which configuration changes can break ECS managed Auto Scaling group scaling?
    a: Removing AmazonECSManaged, adding competing desired-capacity policies, or setting MaxSize to 0.
      Managed termination protection also requires instance scale-in protection.
    trap: true
    facts:
      - ecs-capacity-tag
      - ecs-capacity-policy
      - ecs-capacity-max
      - ecs-capacity-protect
  - id: ecs-044
    q: An ECS capacity provider strategy created through the CLI omits every weight and tasks fail to
      launch. What should change?
    a: Set at least one weight greater than 0. API and CLI weights default to 0, while the console
      defaults to 1.
    trap: true
    facts:
      - ecs-capacity-weight
      - ecs-capacity-weight-default
  - id: ecs-074
    q: How do Amazon ECS Anywhere external instances get AWS credentials?
    a: "Through the SSM Agent, which holds IAM credentials rotated every 30 minutes."
    facts: [ssm-agent]
  - id: ecs-013
    q: Does ECS service auto scaling continue during a deployment?
    a: Scale-in pauses; scale-out continues unless suspended. This behavior excludes EXTERNAL
      controllers. RegisterScalableTarget can suspend dynamic scale-out explicitly.
    facts:
      - ecs-scale-deploy
      - ecs-scale-suspend
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
