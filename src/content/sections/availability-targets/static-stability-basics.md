---
title: Static stability basics
level: associate
order: 35
facts:
  - id: static-stability
    text: Static stability provides capacity before a failure so recovery can use resources that already exist.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel11-bp05.html
  - id: surviving-capacity
    text: EC2 capacity can be provisioned across Availability Zones so the healthy zones handle the full workload if one zone fails.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_withstand_component_failures_static_stability.html#implementation-guidance
  - id: three-zone-example
    text: For three Availability Zones, AWS illustrates provisioning enough EC2 capacity for the two remaining zones to handle the full workload after one zone fails.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_withstand_component_failures_static_stability.html#implementation-guidance
  - id: shift-traffic
    text: Health checks can shift traffic away from impaired EC2 instances.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_withstand_component_failures_static_stability.html#implementation-guidance
  - id: cost
    text: Holding spare compute capacity costs more than provisioning less capacity and launching instances after a failure.
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_withstand_component_failures_static_stability.html#implementation-guidance
  - id: dependencies
    text: Static stability must also be considered for workload components such as databases, storage and routing.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel11-bp05.html
  - id: plane-dependency
    text: Pre-provisioning removes the need to launch replacement instances through the EC2 control
      plane as part of immediate recovery.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/static-stability.html#static-stability
cards:
  - id: availability-targets-023
    q: An Amazon EC2 workload spans three Availability Zones and must survive losing one without launching instances. How should its capacity be sized?
    a: Provision enough capacity for the two remaining zones together to carry the full workload.
    facts: [three-zone-example, static-stability]
  - id: availability-targets-025
    q: What cost trade-off does static stability make for an Amazon EC2 workload?
    a: Spare compute capacity costs more than launching capacity only after a failure, but is already available when needed.
    facts: [cost, static-stability]
  - id: availability-targets-016
    q: What does static stability mean for a multi-AZ EC2 workload?
    a: Pre-provision enough capacity in surviving AZs to serve the workload without waiting for new
      instance launches.
    facts:
      - static-stability
      - plane-dependency
  - id: availability-targets-017
    q: An EC2 application spans several AZs but needs new instances before it can serve normal load
      after losing an AZ. What resilience improvement is needed?
    a: Provision spare capacity before the failure. A multi-AZ layout alone does not remove the recovery
      dependency on instance launches.
    trap: true
    facts:
      - static-stability
      - plane-dependency
diagrams:
  - id: static-stability-zones
    title: Surviving zones carry the workload
    width: 800
    height: 250
    groups:
      - { label: "AZ A: impaired", x: 20, y: 115, w: 230, h: 115, tone: compute }
      - { label: "AZ B: healthy", x: 285, y: 115, w: 230, h: 115, tone: compute }
      - { label: "AZ C: healthy", x: 550, y: 115, w: 230, h: 115, tone: compute }
    nodes:
      - { id: traffic, label: Traffic, x: 310, y: 15, w: 180, h: 60, tone: network }
      - { id: a, label: EC2 instances, x: 45, y: 150, w: 180, h: 60, tone: compute }
      - { id: b, label: EC2 instances, x: 310, y: 150, w: 180, h: 60, tone: compute }
      - { id: c, label: EC2 instances, x: 575, y: 150, w: 180, h: 60, tone: compute }
    edges:
      - { from: traffic, to: a, dashed: true, label: impaired }
      - { from: traffic, to: b, label: healthy }
      - { from: traffic, to: c, label: healthy }
    steps: []
    facts: [three-zone-example, shift-traffic]
---
Static stability prepares a workload to keep serving traffic during a failure. For Amazon EC2, that means having enough capacity running in the surviving Availability Zones before a zone fails.

### How it works

1. Spread EC2 instances across Availability Zones and decide which failure the workload must tolerate.
2. Provision enough capacity ahead of time for the healthy zones to carry the full workload if one zone fails.
3. Use health checks to shift traffic away from impaired instances. The workload can use the capacity already running without waiting for new instances.
4. Check other components, including storage, databases and routing, for the same failure.

For example, spread capacity across three zones so either two can carry the full workload if the third fails. Spare capacity costs more than launching instances only after a failure.

### Exam cues

- If the question says an EC2 workload must survive a zone failure without waiting for instance launches, think static stability, because capacity is provisioned ahead of time.
- If the question says a workload spans three zones and must survive losing one, think capacity in the two surviving zones, because they must carry the full workload.
- If the question says spare EC2 capacity raises costs, think a reliability trade-off, because that capacity is held before a failure.

### Remember

- In a three-zone design, size the two surviving zones together for the full workload.
- Holding spare compute capacity costs more than adding it after a failure.

> **Trap:** Spreading instances across zones alone does not guarantee enough capacity remains after a zone fails.
