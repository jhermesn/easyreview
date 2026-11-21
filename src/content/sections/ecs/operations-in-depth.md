---
title: ECS scaling and credentials
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
Amazon ECS operations depend on capacity provider settings, external instance credentials, and service scaling controls. Understanding these settings helps diagnose tasks that cannot start and scaling that behaves differently during deployments.

### How it works

1. ECS compares `CapacityProviderReservation` with `targetCapacity` to manage instance capacity. The metric is instances needed divided by running instances, multiplied by 100. Above target, ECS scales out; below target, it can scale in.
2. A capacity provider strategy distributes tasks by relative weight after meeting the base. At least one weight must be positive. An omitted weight defaults to 1 in the console but 0 in the API or CLI. Strategy item, Auto Scaling group capacity providers
3. On an ECS Anywhere external instance, the Systems Manager Agent holds IAM credentials. They rotate every 30 minutes and refresh after a lost connection is restored.
4. During an ECS deployment, service scale-in pauses while scale-out continues unless suspended. This behavior does not apply to `EXTERNAL` controllers. `RegisterScalableTarget` can suspend dynamic scale-in or scale-out using `DynamicScalingInSuspended` and `DynamicScalingOutSuspended`.

### Exam cues

- If the question says tasks wait for new EC2 hosts, think about `targetCapacity`, because its default of 100% can leave tasks `PENDING` until instances register.
- If the question says managed scaling stopped after an Auto Scaling group change, check `AmazonECSManaged`, competing desired-capacity policies, and `MaxSize`, because each can prevent ECS from managing or adding capacity. Cluster auto scaling, Auto Scaling group capacity providers
- If the question says a CLI strategy has no positive weights, set one above 0, because omitted CLI weights default to 0.
- If the question says dynamic scale-out must pause during a deployment, think explicit suspension, because scale-out normally continues.

### Remember

- `targetCapacity` defaults to 100%, and the Auto Scaling group `MaxSize` must exceed 0 for scale-out. Cluster auto scaling, Auto Scaling group capacity providers
- Managed termination protection requires instance scale-in protection and protects instances with non-daemon tasks from scale-in.
- ECS Anywhere credentials rotate every 30 minutes.

> **Trap:** An omitted capacity provider weight does not have the same default everywhere: it is 1 in the console and 0 in the API or CLI. A strategy needs at least one positive weight. Auto Scaling group capacity providers, Strategy item
