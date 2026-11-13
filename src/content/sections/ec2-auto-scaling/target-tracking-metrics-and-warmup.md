---
title: Target tracking metrics and warmup
level: associate
order: 30
facts:
  - id: metric-rule
    text: A target tracking metric must represent utilization and change proportionally as group capacity changes.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#target-tracking-choose-metrics
  - id: cpu
    text: ASGAverageCPUUtilization measures average group CPU utilization.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#target-tracking-choose-metrics
  - id: network-in
    text: ASGAverageNetworkIn measures average bytes received on instance network interfaces.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#target-tracking-choose-metrics
  - id: network-out
    text: ASGAverageNetworkOut measures average bytes sent on instance network interfaces.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#target-tracking-choose-metrics
  - id: alb
    text: ALBRequestCountPerTarget measures average requests per target and requires ResourceLabel identifying the load balancer target group.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#target-tracking-choose-metrics
  - id: invalid
    text: Total load balancer RequestCount and load balancer Latency are unsuitable for target tracking because they do not change proportionally with group capacity.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#target-tracking-choose-metrics
  - id: queue
    text: Raw SQS ApproximateNumberOfMessagesVisible is unsuitable for target tracking; a custom messages-per-instance metric can work.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#target-tracking-choose-metrics
  - id: multiple
    text: With multiple target tracking policies, any policy can trigger scale-out; all policies with scale-in enabled must agree before scale-in.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#target-tracking-multiple-policies
  - id: warmup
    text: New instances are excluded from aggregated instance metrics until warmup ends.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#as-target-tracking-scaling-warmup
  - id: pending-capacity
    text: Further target tracking scale-out accounts for instances still warming up as part of desired capacity.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#as-target-tracking-scaling-warmup
  - id: scale-in-block
    text: Policy-driven scale-in is blocked during scale-out until the new instances finish warming up.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#as-target-tracking-scaling-warmup
  - id: fallback
    text: When policy warmup is omitted, target tracking uses group default instance warmup, or group default cooldown if default warmup is unset.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#as-target-tracking-scaling-warmup
  - id: monitoring
    text: EC2 metrics default to five-minute intervals; detailed monitoring provides one-minute intervals, which AWS recommends for target tracking.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#target-tracking-choose-metrics
  - id: missing
    text: When missing metric data causes INSUFFICIENT_DATA, target tracking cannot scale until new data arrives.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#target-tracking-considerations
  - id: alarms
    text: Auto Scaling creates and manages target tracking CloudWatch alarms; operators should not create, edit or delete those alarms.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html#target-tracking-considerations
cards:
  - id: ec2-auto-scaling-001
    q: Which EC2 Auto Scaling target tracking metrics work for web servers or queue workers?
    a: Use average CPU, average network traffic, ALBRequestCountPerTarget or a custom messages-per-instance metric. The metric must reflect per-instance utilization.
    trap: true
    facts:
      - metric-rule
      - cpu
      - network-in
      - network-out
      - alb
      - queue
  - id: ec2-auto-scaling-006
    q: Which predefined metrics does EC2 Auto Scaling target tracking support?
    a: ASGAverageCPUUtilization, ASGAverageNetworkIn, ASGAverageNetworkOut and ALBRequestCountPerTarget. The ALB metric requires ResourceLabel for the load balancer target group.
    facts:
      - cpu
      - network-in
      - network-out
      - alb
  - id: ec2-auto-scaling-007
    q: Why are total load balancer RequestCount and Latency unsuitable for EC2 Auto Scaling target tracking?
    a: They do not change proportionally as group capacity changes. Use a utilization metric such as average CPU or requests per target.
    trap: true
    facts:
      - invalid
      - metric-rule
      - cpu
      - alb
  - id: ec2-auto-scaling-008
    q: Two EC2 Auto Scaling target tracking policies disagree about scaling direction. What happens?
    a: Any policy can trigger scale-out. Scale-in requires agreement from all policies with scale-in enabled.
    facts:
      - multiple
  - id: ec2-auto-scaling-009
    q: An EC2 Auto Scaling application starts slowly and its new instances distort utilization measurements. Which setting helps?
    a: Instance warmup. New instances stay out of aggregated metrics until warmup ends, while later scale-out accounts for their pending capacity.
    facts:
      - warmup
      - pending-capacity
  - id: ec2-auto-scaling-023
    q: An EC2 Auto Scaling group processes an SQS queue whose worker count changes. Which target tracking metric fits?
    a: Messages per instance, also called backlog per instance. Raw ApproximateNumberOfMessagesVisible does not reflect utilization per worker.
    trap: true
    facts:
      - queue
  - id: ec2-auto-scaling-038
    q: An EC2 Auto Scaling target tracking policy has no warmup override or group default warmup. Which fallback applies?
    a: The group default cooldown. Configure group default instance warmup to give policies a shared initialization period.
    trap: true
    facts:
      - fallback
  - id: ec2-auto-scaling-039
    q: An EC2 Auto Scaling target tracking alarm enters INSUFFICIENT_DATA. Should missing data be treated as permission to scale in?
    a: No. Target tracking cannot scale until new metric data arrives.
    trap: true
    facts:
      - missing
  - id: ec2-auto-scaling-040
    q: An EC2 Auto Scaling group reacts slowly to CPU changes because it uses basic monitoring. What improves metric frequency?
    a: Enable EC2 detailed monitoring to publish one-minute metrics instead of the default five-minute interval.
    facts:
      - monitoring
---
Target tracking adjusts EC2 Auto Scaling capacity toward a chosen utilization value. Its metric must describe how busy each instance is, so adding capacity reduces the measured load per instance.

### How it works

1. Select a predefined metric or a custom utilization metric. For queue workers, use backlog per instance, meaning queued messages divided by the worker count.
2. Set a target. Auto Scaling creates and manages the CloudWatch alarms; leave those alarms under its control.
3. During scale-out, exclude new instances from aggregated instance metrics until warmup ends. Later scale-out still counts those instances as pending capacity.
4. Block policy-driven scale-in until the new instances finish warming up. With multiple target tracking policies, any policy can request scale-out, but every policy with scale-in enabled must agree to scale in.

| Metric | Meaning |
|---|---|
| ASGAverageCPUUtilization | Average group CPU utilization |
| ASGAverageNetworkIn | Average incoming bytes |
| ASGAverageNetworkOut | Average outgoing bytes |
| ALBRequestCountPerTarget | Average requests per target; requires ResourceLabel for the load balancer target group |

### Exam cues

- If the question says scale queue workers as the fleet changes, think messages per instance, because raw queue length does not measure each worker's utilization.
- If the question says startup measurements cause excess scaling, think instance warmup, because new instance metrics stay out of the aggregate while pending capacity is still counted.
- If the question says a CPU policy wants scale-in while a request policy wants scale-out, think scale-out, because availability takes priority.
- If the question says missing metric data, think INSUFFICIENT_DATA, because target tracking waits for new data before scaling.

### Remember

- Basic EC2 monitoring publishes every 5 minutes; detailed monitoring publishes every minute.
- Omitted policy warmup uses group default instance warmup, then default cooldown if warmup is unset.
- Total RequestCount, Latency and raw SQS ApproximateNumberOfMessagesVisible are unsuitable target tracking metrics.

> **Trap:** A load balancer's total requests are not requests per target. Use ALBRequestCountPerTarget with the target group's ResourceLabel.
