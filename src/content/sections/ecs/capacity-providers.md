---
title: Capacity providers
level: professional
order: 70
facts:
  - id: ecs-capacity-purpose
    text: An Auto Scaling group capacity provider connects ECS task placement with EC2 instance capacity.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/asg-capacity-providers.html
  - id: ecs-capacity-managed
    text: Managed scaling lets ECS control the Auto Scaling group using a target tracking policy and
      CloudWatch alarms.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html
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
  - id: ecs-capacity-policy
    text: Do not add competing scaling policies that manage desired capacity on an ECS managed Auto
      Scaling group.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html
  - id: ecs-capacity-tag
    text: Removing the AmazonECSManaged Auto Scaling group tag prevents ECS from managing scaling.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html
  - id: ecs-capacity-max
    text: The Auto Scaling group MaxSize must exceed 0 to allow scale-out.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/asg-capacity-providers.html
  - id: ecs-capacity-provisioning
    text: If an Auto Scaling group cannot grow to accommodate tasks, tasks cannot progress beyond
      PROVISIONING.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/asg-capacity-providers.html
  - id: ecs-capacity-associate
    text: Associate a capacity provider with the cluster before using it in a capacity provider strategy.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/asg-capacity-providers.html
  - id: ecs-capacity-base
    text: A strategy base places a minimum number of tasks on one provider before weight distribution;
      base defaults to 0.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_CapacityProviderStrategyItem.html
  - id: ecs-capacity-weight
    text: Strategy weight controls relative task distribution after base; at least one provider must
      have positive weight.
    source: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_CapacityProviderStrategyItem.html
  - id: ecs-capacity-weight-default
    text: An omitted weight defaults to 1 in the console and 0 in the API or CLI.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/asg-capacity-providers.html
  - id: ecs-capacity-mix
    text: A cluster can have both ASG and Fargate capacity providers, but a strategy cannot mix those
      two provider types.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-capacity-providers.html
  - id: ecs-capacity-spot
    text: FARGATE_SPOT uses spare capacity and gives a two-minute interruption warning.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-capacity-providers.html
  - id: ecs-capacity-fallback
    text: Fargate does not automatically replace unavailable Spot capacity with on-demand capacity.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-capacity-providers.html
  - id: ecs-capacity-protect
    text: Managed termination protection requires Auto Scaling instance scale-in protection and protects
      instances with non-daemon tasks from scale-in.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/managed-termination-protection.html
  - id: ecs-capacity-spare
    text: A targetCapacity below 100% retains spare instance capacity for future tasks.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/managed-termination-protection.html
diagrams:
  - id: ecs-capacity-demand
    title: Task demand becomes EC2 capacity
    width: 800
    height: 220
    nodes:
      - id: ecs
        label: ECS
        icon: elastic-container-service
        x: 30
        y: 65
        w: 180
        h: 86
        tone: compute
        sub: task demand
      - id: asg
        label: EC2 Auto Scaling
        icon: ec2-auto-scaling
        x: 310
        y: 65
        w: 180
        h: 86
        tone: compute
        sub: managed policy
      - id: host
        label: EC2 instances
        icon: res-ec2-instances
        x: 590
        y: 65
        w: 180
        h: 86
        tone: compute
        sub: register with cluster
    edges:
      - from: ecs
        to: asg
        step: 1
      - from: asg
        to: host
        step: 2
    steps:
      - ECS managed scaling adjusts the Auto Scaling group desired capacity from task demand.
      - The group launches instances that register with ECS to host waiting tasks.
cards:
  - id: ecs-014
    q: An ECS EC2 service scales out but tasks remain pending for host resources. What capacity control
      is needed?
    a: Use an Auto Scaling group capacity provider with managed scaling, and check its MaxSize and task
      fit. Service auto scaling changes task count; the capacity provider supplies hosts.
    trap: true
    facts:
      - ecs-capacity-purpose
      - ecs-capacity-managed
      - ecs-capacity-max
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
  - id: ecs-045
    q: An ECS Fargate Spot service cannot obtain capacity. Will Fargate automatically run those tasks on
      demand?
    a: No. Fargate does not automatically replace Spot capacity with on-demand capacity. Spot tasks
      receive a two-minute warning when interrupted.
    trap: true
    facts:
      - ecs-capacity-fallback
      - ecs-capacity-spot
  - id: ecs-046
    q: An ECS team needs spare EC2 hosts so tasks can start without waiting for instance launches. What
      setting helps?
    a: Set capacity provider targetCapacity below 100% to retain spare instance capacity.
    facts:
      - ecs-capacity-spare
  - id: ecs-047
    q: How does an ECS capacity provider strategy use base and weight?
    a: Meet the single provider base first, then distribute tasks by relative weights. Base defaults to
      0, and at least one provider needs positive weight.
    facts:
      - ecs-capacity-base
      - ecs-capacity-weight
---

A capacity provider connects ECS task demand to the compute that runs it. For EC2, managed scaling adjusts an Auto Scaling group, the collection of hosts that can grow or shrink as tasks need capacity.

### How it works

1. Associate an Auto Scaling group capacity provider with the ECS cluster. Use it in the service's capacity provider strategy, the task distribution rules across providers.
2. Satisfy `base`, a minimum task count assigned to one provider. Distribute remaining tasks by `weight`, a relative share. Base defaults to 0; at least one weight must be positive.
3. Enable managed scaling. ECS manages a target tracking policy using `CapacityProviderReservation = instances needed / running instances x 100`.
4. Compare that metric with `targetCapacity`. Above the target, ECS requests more hosts. Below it, ECS can remove hosts. The default target is 100%, so new tasks can wait `PENDING` while hosts register.
5. Keep `MaxSize` above 0, preserve the `AmazonECSManaged` tag, and avoid competing desired-capacity scaling policies. Enable instance scale-in protection when using managed termination protection, which protects hosts with non-daemon tasks during scale-in.

A cluster can contain ASG and Fargate providers, but one strategy cannot mix those types. `FARGATE_SPOT` uses spare capacity for work that tolerates interruption. It gives a two-minute warning; unavailable Spot capacity does not automatically fall back to on-demand capacity.

### Exam cues

- If the question says ECS service scale-out leaves tasks waiting for EC2 resources, think managed capacity provider, because desired task count and host count are separate controls.
- If the question says ECS scaling broke after tags changed, think `AmazonECSManaged`, because ECS needs that tag.
- If the question says tasks should start without waiting for hosts, think a target below 100%, because it retains spare capacity.

### Remember

- `weight` defaults to 1 in the console and 0 in the API or CLI.
- A group that cannot grow can leave tasks in `PROVISIONING`.
- Managed termination protection requires instance scale-in protection; daemon tasks do not prevent scale-in.

> **Trap:** Fargate Spot does not promise automatic on-demand replacement when Spot capacity is unavailable.
