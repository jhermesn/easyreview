---
title: Fleets and Spot requests
level: associate
order: 70
facts:
  - id: fleets
    text: EC2 Fleet and Spot Fleet launch tens to thousands of instances in one operation from a launch template or launch parameters.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet.html
  - id: fleet-types-azs
    text: A fleet can mix instance types and Availability Zones, so it doesn't depend on one instance type's capacity, and picks zones for Spot based on price and interruption preferences.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet.html
  - id: fleet-replace
    text: A fleet that includes Spot Instances can automatically request replacements when Spot Instances are interrupted.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet.html
  - id: one-time
    text: A one-time Spot request isn't resubmitted after its instance is interrupted, and it is the default request type.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-requests.html
  - id: persistent
    text: A persistent Spot request is resubmitted after an interruption to replace the instance, and stays active until it expires or you cancel it.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-requests.html
  - id: cancel
    text: Canceling an active Spot request doesn't terminate its running Spot Instance; you terminate the instance separately.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances-cancel.html#using-spot-instances-cancel
  - id: alloc-pco
    text: "The price-capacity-optimized Spot allocation strategy is the recommended one: it picks the pools with the most spare capacity, then the cheapest of those."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-fleet-allocation-strategy.html#ec2-fleet-allocation-strategies-for-spot-instances
  - id: alloc-others
    text: "capacity-optimized picks only the pools with the most spare capacity (fewest interruptions), diversified spreads Spot Instances across all pools, and lowest-price, the CLI default, carries the highest interruption risk."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-fleet-allocation-strategy.html#ec2-fleet-allocation-strategies-for-spot-instances
  - id: spot-pool
    text: "A Spot capacity pool is the unused EC2 capacity for one instance type in one Availability Zone."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html#spot-features
  - id: rebalance
    text: "An EC2 rebalance recommendation signals that a Spot Instance is at elevated interruption risk; it can arrive before the two-minute interruption notice, but sometimes arrives with it."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/rebalance-recommendations.html
  - id: interruption-notice
    text: "EC2 sends Spot interruption notices through Amazon EventBridge and instance metadata on a best-effort basis; stop and termination notices give two minutes, but hibernation begins immediately."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-instance-termination-notices.html
cards:
  - id: ec2-073
    q: A batch workload must keep 200 vCPUs of cheap capacity running across several instance types and AZs, replacing Spot Instances when they are interrupted. Which feature fits?
    a: "An **EC2 Fleet or Spot Fleet** with diversified instance types and AZs and a target capacity."
    facts: [fleets, fleet-types-azs, fleet-replace]
  - id: ec2-074
    q: A team cancels an active Spot Instance request, but the instance keeps running and billing. Why?
    a: "Canceling a Spot request doesn't terminate its running instance; terminate the instance separately."
    trap: true
    facts: [cancel]
  - id: ec2-075
    q: A long-running Spot job should get a new instance automatically after each interruption. Which Spot request type fits?
    a: "A persistent Spot request, which is resubmitted after an interruption."
    facts: [persistent, one-time]
  - id: ec2-076
    q: What is the default Spot Instance request type, and what happens after an interruption?
    a: "One-time; it isn't resubmitted after the instance is interrupted."
    facts: [one-time]
  - id: ec2-092
    q: "Which Spot allocation strategy balances low price with a low chance of interruption, and is the one AWS recommends?"
    a: "price-capacity-optimized. It narrows to the pools with the most capacity, then launches from the cheapest of them."
    facts: [alloc-pco]
  - id: ec2-093
    q: "A Spot Fleet runs a workload that is costly to interrupt and price matters less. Which allocation strategy fits?"
    a: "capacity-optimized, which launches only from the pools with the most spare capacity. lowest-price has the highest interruption risk."
    facts: [alloc-others]
  - id: ec2-106
    q: "Which Spot signal can warn earlier than the two-minute interruption notice?"
    a: "The EC2 instance rebalance recommendation, sent when the instance is at elevated interruption risk; it is not guaranteed to come first."
    facts: [rebalance]
  - id: ec2-116
    q: "An EC2 Spot application needs automated interruption handling. Where can it receive notices, and can it assume a notice always arrives?"
    a: "Amazon EventBridge or instance metadata. Delivery is best effort, so the application must tolerate an interruption without a notice."
    facts: [interruption-notice]
---
Fleets and Spot request types control how EC2 keeps cheap capacity running when Spot Instances come and go.

### How it works

1. Define a target capacity, a launch template and several instance types and AZs.
2. The fleet launches a mix of On-Demand and Spot Instances to reach the target.
3. When Spot Instances are interrupted, the fleet requests replacements.
4. Handle interruption signals from Amazon EventBridge or instance metadata. Delivery is best effort; hibernation begins immediately rather than allowing two minutes to prepare.
5. Single Spot requests are one-time (default) or persistent (resubmitted after interruption).

### Exam cues

- If the question says keep a target capacity with Spot across many instance types, think EC2 Fleet or Spot Fleet (or an Auto Scaling group with mixed instances).
- If the question says relaunch after each Spot interruption for one request, think a persistent Spot request.
- If the question says instances keep running after canceling a request, remember canceling doesn't terminate.

### Remember

- Interruption notices are best effort; a hibernation notice has no two-minute lead time.
- Diversify instance types and AZs to lower interruption impact.
- One-time is the default Spot request; persistent requests resubmit.
- Cancel request and terminate instance are two separate steps.

> **Trap:** A persistent Spot request keeps relaunching instances. To stop it for good, cancel the request and then terminate the instances.
