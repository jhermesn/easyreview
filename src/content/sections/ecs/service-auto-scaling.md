---
title: Service auto scaling
level: associate
order: 60
facts:
  - id: ecs-scale-desired
    text: ECS Service Auto Scaling uses Application Auto Scaling to change the desired number of service
      tasks.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html
  - id: ecs-scale-cpu-memory
    text: ECS publishes service average CPU and memory metrics for scaling.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html
  - id: ecs-scale-minute
    text: ECS sends its scaling metrics to CloudWatch at one-minute intervals.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html
  - id: ecs-scale-target
    text: Target tracking chooses a metric target and manages the alarms and task-count adjustments
      automatically.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-autoscaling-targettracking.html
  - id: ecs-scale-step
    text: Step scaling changes task count using configured adjustments based on the size of an alarm
      breach.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html
  - id: ecs-scale-scheduled
    text: Scheduled scaling changes service capacity based on a date and time.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html
  - id: ecs-scale-predictive
    text: Predictive scaling uses historical load to identify daily or weekly traffic patterns.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html
  - id: ecs-scale-queue
    text: SQS worker services can scale using a custom backlog-per-task metric.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html
  - id: ecs-scale-zero
    text: A minimum capacity of 0 permits scale to zero; target tracking waits for a demand data point
      before scaling out from zero.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html#auto-scaling-concepts
  - id: ecs-scale-cooldown
    text: A cooldown is a wait for a scaling activity to take effect; scale-out can interrupt a scale-in
      cooldown.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html
  - id: ecs-scale-deploy
    text: During ECS deployments, scale-in is suspended and scale-out continues unless suspended; this
      exception does not apply to EXTERNAL controllers.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html#service-auto-scaling-deployments
  - id: ecs-scale-suspend
    text: RegisterScalableTarget can suspend dynamic scaling with DynamicScalingInSuspended and
      DynamicScalingOutSuspended.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html#service-auto-scaling-deployments
  - id: ecs-scale-missing
    text: Target tracking takes no scaling action when the metric has insufficient data.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-autoscaling-targettracking.html
  - id: ecs-scale-multiple
    text: With multiple target tracking policies, any policy can request scale-out; scale-in requires
      every policy with scale-in enabled to agree.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-autoscaling-targettracking.html
  - id: ecs-scale-alb
    text: ALBRequestCountPerTarget target tracking is unsupported for the blue/green deployment type.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-autoscaling-targettracking.html
  - id: ecs-scale-instances
    text: EC2 cluster auto scaling uses a managed Auto Scaling group capacity provider to change
      instance capacity.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cluster-auto-scaling.html
cards:
  - id: ecs-012
    q: How can an ECS service scale its task count automatically?
    a: Use Application Auto Scaling with target tracking, step, scheduled, predictive, or SQS
      backlog-per-task scaling. A minimum capacity of 0 permits scale to zero.
    facts:
      - ecs-scale-desired
      - ecs-scale-target
      - ecs-scale-step
      - ecs-scale-scheduled
      - ecs-scale-predictive
      - ecs-scale-queue
      - ecs-scale-zero
  - id: ecs-013
    q: Does ECS service auto scaling continue during a deployment?
    a: Scale-in pauses; scale-out continues unless suspended. This behavior excludes EXTERNAL
      controllers. RegisterScalableTarget can suspend dynamic scale-out explicitly.
    facts:
      - ecs-scale-deploy
      - ecs-scale-suspend
  - id: ecs-041
    q: An ECS worker service processes SQS messages with variable backlog. What scaling metric fits?
    a: Use a custom backlog-per-task metric so capacity responds to queued work per worker.
    facts:
      - ecs-scale-queue
  - id: ecs-042
    q: An ECS service has CPU and memory target tracking policies. CPU requires scale-out but memory
      does not. What happens?
    a: The service can scale out when either policy requests it. Scale-in requires agreement from all
      target tracking policies with scale-in enabled.
    facts:
      - ecs-scale-multiple
  - id: ecs-043
    q: An ECS target tracking metric has insufficient data. Will ECS interpret that as low load and
      remove tasks?
    a: No. Target tracking takes no scaling action for insufficient metric data.
    trap: true
    facts:
      - ecs-scale-missing
---

ECS Service Auto Scaling adjusts how many tasks a service should run as demand changes. Application Auto Scaling manages this task count; EC2 instance capacity is managed separately through capacity providers.

### How it works

1. Set service minimum and maximum capacity, the allowed task-count bounds, and choose a scaling policy.
2. For target tracking, select a metric and target. Application Auto Scaling manages alarms and changes capacity to approach that target. ECS publishes CPU and memory metrics every minute.
3. For queue workers, measure backlog per task, the queued work divided across workers. Use a custom SQS metric to scale with that work.
4. Allow a cooldown, a wait for a prior change to take effect. Scale-out can interrupt a scale-in cooldown when demand rises.
5. During deployments, scale-in pauses while scale-out continues unless suspended. This rule excludes `EXTERNAL` controllers. Use `RegisterScalableTarget` suspension settings when dynamic scaling must pause explicitly.

| Policy | Trigger |
| --- | --- |
| Target tracking | Keep a metric near a target |
| Step scaling | Apply an adjustment based on an alarm breach |
| Scheduled | Change capacity at a specified date and time |
| Predictive | Anticipate recurring patterns from historical load |

### Exam cues

- If the question says an ECS service should maintain average CPU near a target, think target tracking, because it manages the alarms and adjustments.
- If the question says SQS worker demand depends on queued work, think backlog per task, because it relates outstanding work to workers.
- If the question says a deployment should prevent all dynamic scale-out, think explicit scaling suspension, because deployments ordinarily pause only scale-in.

### Remember

- Minimum capacity 0 permits scale to zero; scaling out from zero needs a demand data point.
- Target tracking does nothing with insufficient metric data.
- With multiple target tracking policies, any may request scale-out; all enabled scale-in policies must agree to scale in.
- `ALBRequestCountPerTarget` target tracking is unsupported for blue/green deployments.

> **Trap:** Increasing desired task count does not itself add EC2 hosts. A managed capacity provider scales the instances.
