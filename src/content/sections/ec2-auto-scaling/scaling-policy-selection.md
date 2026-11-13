---
title: Scaling policy selection
level: associate
order: 20
facts:
  - id: target
    text: Target tracking adjusts group capacity toward a metric target and manages the associated CloudWatch alarms.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#as-scaling-target-tracking
  - id: step
    text: Step scaling uses operator-managed CloudWatch alarms and different capacity adjustments based on the size of the alarm breach.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html#as-scaling-simple-step
  - id: simple
    text: Simple scaling performs one adjustment and waits for a cooldown before further simple scaling activities.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scaling-cooldowns.html#ec2-auto-scaling-scaling-cooldowns
  - id: cooldown
    text: The default cooldown is 300 seconds unless configured otherwise.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scaling-cooldowns.html#set-default-cooldown
  - id: cooldown-exceptions
    text: Target tracking and step scaling scale-out, scheduled actions and unhealthy instance replacement do not wait for simple scaling cooldown.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scaling-cooldowns.html#cooldown-considerations
  - id: recommendation
    text: AWS recommends target tracking or step scaling instead of simple scaling and cooldowns.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scaling-cooldowns.html#ec2-auto-scaling-scaling-cooldowns
  - id: scheduled
    text: Scheduled scaling changes minimum, maximum or desired capacity at specified times and supports recurring schedules.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scheduled-scaling.html#ec2-auto-scaling-scheduled-scaling
  - id: predictive
    text: Predictive scaling forecasts recurring demand from historical metric data and starts in forecast-only mode.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/predictive-scaling-policy-overview.html#how-predictive-scaling-works
  - id: forecast-data
    text: Predictive scaling requires at least 24 hours of metric data and analyzes up to 14 days of history.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/predictive-scaling-policy-overview.html#how-predictive-scaling-works
  - id: forecast-window
    text: Predictive scaling produces an hourly forecast for the next 48 hours and updates it every 6 hours.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/predictive-scaling-policy-overview.html#how-predictive-scaling-works
  - id: forecast-scale
    text: Forecast-and-scale mode adds capacity for predicted demand but does not scale in; dynamic policies can remove excess capacity and handle unexpected demand.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/predictive-scaling-policy-overview.html#how-predictive-scaling-works
  - id: promql-scaling
    text: Since November 2026, CloudWatch PromQL alarms can invoke EC2 Auto Scaling step and simple scaling policies, but not target tracking policies.
    source: https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-cloudwatch-alarms-autoscaling-group-actions/
cards:
  - id: ec2-auto-scaling-003
    q: Which EC2 Auto Scaling policy keeps average CPU near a target without manually maintaining its alarms?
    a: Target tracking. Auto Scaling manages the CloudWatch alarms for the chosen metric target.
    facts:
      - target
  - id: ec2-auto-scaling-004
    q: How do EC2 Auto Scaling target tracking, step scaling and simple scaling differ?
    a: Target tracking maintains a metric target. Step scaling chooses an adjustment by alarm breach size. Simple scaling makes one adjustment and waits for cooldown.
    facts:
      - target
      - step
      - simple
  - id: ec2-auto-scaling-005
    q: An EC2 Auto Scaling application has a known opening time and recurring daily peaks. Which proactive scaling choices apply?
    a: Scheduled scaling changes capacity at known times. Predictive scaling learns recurring demand; review forecast-only results before enabling forecast and scale.
    facts:
      - scheduled
      - predictive
      - forecast-scale
  - id: ec2-auto-scaling-034
    q: An EC2 Auto Scaling simple scaling policy pauses after a capacity change. What is the default cooldown?
    a: 300 seconds, unless changed for the group or policy. AWS recommends target tracking or step scaling for better scaling performance.
    facts:
      - cooldown
      - recommendation
  - id: ec2-auto-scaling-035
    q: An EC2 Auto Scaling predictive policy adds capacity for a morning peak but leaves excess instances afterward. What is missing?
    a: A dynamic scaling policy for scale-in. Predictive scaling only adds capacity in forecast-and-scale mode.
    trap: true
    facts:
      - forecast-scale
  - id: ec2-auto-scaling-036
    q: An EC2 Auto Scaling alarm must add more instances for larger threshold breaches. Which policy fits?
    a: Step scaling. Define adjustments for different breach sizes and manage the CloudWatch alarm that invokes the policy.
    facts:
      - step
  - id: ec2-auto-scaling-037
    q: How much history does EC2 Auto Scaling predictive scaling need, and how far ahead does it forecast?
    a: At least 24 hours of data; up to 14 days are analyzed. It forecasts hourly capacity for 48 hours and updates the forecast every 6 hours.
    facts:
      - forecast-data
      - forecast-window
  - id: ec2-auto-scaling-070
    q: A team wants a CloudWatch PromQL alarm to scale an EC2 Auto Scaling group by different amounts for different threshold breaches. Which policy supports this?
    a: Step scaling. Since November 2026, PromQL alarms can trigger step and simple scaling, but not target tracking.
    facts:
      - promql-scaling
      - step
---
Scaling policies change the desired capacity of an EC2 Auto Scaling group as demand changes. Scale-out adds capacity; scale-in removes it. Choose a policy based on whether the trigger is current utilization, a known time or a recurring demand pattern.

### How it works

1. For current demand, choose a metric target or alarm thresholds. Target tracking manages its alarms; step and simple scaling use alarms you manage.
2. For a known time, create a scheduled action that changes minimum, maximum or desired capacity.
3. For recurring patterns, let predictive scaling analyze history in forecast-only mode. Review the forecast before enabling forecast and scale.
4. Combine predictive scaling with a dynamic policy for unexpected demand and scale-in. Predictive scaling does not remove capacity.
5. A CloudWatch alarm using PromQL, the Prometheus query language, can invoke a step or simple scaling policy. PromQL alarms do not support target tracking policies.

| Choice | Trigger and behavior |
|---|---|
| Target tracking | Adjust capacity toward a metric target |
| Step scaling | Choose an adjustment by alarm breach size |
| Simple scaling | Make one adjustment, then wait for cooldown |
| Scheduled scaling | Change capacity at specified times |
| Predictive scaling | Add capacity ahead of forecast demand |

### Exam cues

- If the question says keep average CPU near a target, think target tracking, because it adjusts capacity and manages the alarms.
- If the question says add progressively more instances for larger breaches, think step scaling, because each breach range has an adjustment.
- If the question says open at a known time, think scheduled scaling, because its trigger is a schedule.
- If the question says recurring demand should be learned from history, think predictive scaling plus dynamic scaling, because prediction adds capacity and dynamic scaling can remove it.

### Remember

- Simple scaling cooldown defaults to 300 seconds. Target tracking and step scaling scale-out, scheduled actions and unhealthy replacement do not wait for it.
- AWS recommends target tracking or step scaling over simple scaling.
- Predictive scaling needs at least 24 hours of history and analyzes up to 14 days.
- It forecasts hourly capacity for 48 hours and refreshes the forecast every 6 hours.
- Forecast-only is the initial mode.
- Since November 2026, PromQL alarms support simple and step scaling, not target tracking.

> **Trap:** Enabling predictive scaling does not immediately enable scaling, and forecast-and-scale mode does not scale in.
