---
title: Zonal shift
level: professional
order: 10
facts:
  - id: purpose
    text: ARC zonal shift moves a supported resource traffic away from one impaired Availability Zone to
      healthy zones in the same Region.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-shift.html
  - id: enable
    text: ALB zonal shift is disabled by default and must be enabled on each load balancer before use.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/zonal-shift.html#zonal-shift-before-you-begin
  - id: supported
    text: ARC supports zonal shift for ALB and NLB with cross-zone load balancing enabled or disabled.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-shift.resource-types.html
  - id: active
    text: The shifted resource must be active, fully provisioned, opted in, and deployed in the Region
      and zone being shifted away from.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-shift.resource-types.html
  - id: capacity
    text: Before a zonal shift, prescale capacity so the remaining zones can handle the application
      traffic.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-shift.html
  - id: one-zone
    text: A zonal shift for a specific load balancer can affect only one Availability Zone at a time.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/zonal-shift.html#zonal-shift-before-you-begin
  - id: expires
    text: A manual ARC zonal shift requires an expiration initially from one minute to three days, or 72
      hours; it can be extended or canceled.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-shift.html
  - id: return
    text: When a zonal shift expires or is canceled, the zone becomes available to the resource and
      traffic begins returning.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-shift.how-it-works.html
  - id: dns
    text: For an ALB with cross-zone balancing enabled, zonal shift removes zonal IP addresses from DNS
      and stops new traffic to targets in the affected zone.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/zonal-shift.html#cross-zone-enabled
  - id: override
    text: ALB zonal shift sets AdministrativeOverride independently from TargetHealth;
      zonal_shift_active identifies targets in the shifted zone.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/zonal-shift.html#admin-override
  - id: connections
    text: ALB zonal shift leaves existing connections intact until they close; DNS settings and
      connection reuse can delay complete traffic movement.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/zonal-shift.html
  - id: fail-open
    text: Zonal shift has no effect when an ALB or NLB is failing open, such as when load balancer
      target groups have no instances or all instances are unhealthy.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-shift.how-it-works.html
  - id: auto
    text: Zonal autoshift authorizes AWS to shift a configured resource away from a zone when AWS
      internal telemetry detects a potential zonal impairment.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-autoshift.html
  - id: telemetry
    text: Zonal autoshift does not inspect individual resource health and can shift a resource that is
      not itself experiencing impact.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-autoshift.html
  - id: practice
    text: Zonal autoshift requires practice runs; they occur weekly and move one resource traffic away
      from a zone for about 30 minutes.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-autoshift.html
  - id: pre-scale
    text: Zonal autoshift and practice runs do not wait for auto scaling; preprovision sufficient
      capacity before enabling them.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-autoshift.html
  - id: autoshift-end
    text: AWS ends a zonal autoshift when the affected Availability Zone recovers.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-autoshift.html
  - id: zone
    text: An Availability Zone is an isolated location within an AWS Region.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones
  - id: cross-zone-date
    text: ALB support for zonal shift and autoshift with cross-zone balancing enabled launched in
      November 2024.
    source: https://aws.amazon.com/about-aws/whats-new/2024/11/cross-zone-application-load-balancer-zonal-shift-autoshift
cards:
  - id: application-recovery-controller-001
    q: One Availability Zone behind an ALB is impaired. Which ARC feature can move new traffic away
      while the other zones keep serving?
    a: Start a zonal shift for the opted-in load balancer after checking spare zonal capacity. ALB
      supports this with cross-zone balancing enabled or disabled. Existing connections can take
      time to drain, and the shift needs an expiration of up to 72 hours initially.
    facts:
      - purpose
      - enable
      - supported
      - capacity
      - connections
      - expires
  - id: application-recovery-controller-002
    q: An ARC zonal shift started for a load balancer, but traffic still reaches the impaired zone and
      all target groups lack healthy instances. Why?
    a: The load balancer can be failing open. Zonal shift has no effect in that state.
    facts:
      - fail-open
    trap: true
  - id: application-recovery-controller-003
    q: Must an ALB disable cross-zone balancing before an ARC zonal shift?
    a: No. ALB supports zonal shift with cross-zone balancing enabled or disabled. With it enabled,
      zonal addresses leave DNS and new traffic to targets in the shifted zone stops.
    facts:
      - supported
      - dns
    trap: true
  - id: application-recovery-controller-004
    q: An ALB target is healthy but shows AdministrativeOverride zonal_shift_active. Why does it stop
      receiving new traffic?
    a: A zonal shift administratively excludes it. AdministrativeOverride is independent of
      TargetHealth, and existing connections can remain until they close.
    facts:
      - override
      - connections
  - id: application-recovery-controller-005
    q: What initial expiration can a manual ARC zonal shift use?
    a: From one minute to three days, or 72 hours. Extend the expiration if needed or cancel early to
      let traffic return.
    facts:
      - expires
      - return
  - id: application-recovery-controller-006
    q: A team wants AWS to shift traffic when AWS detects a zonal impairment. Which ARC option fits?
    a: Zonal autoshift. It uses AWS telemetry and requires weekly practice runs; it does not inspect
      individual resource health.
    facts:
      - auto
      - practice
      - telemetry
  - id: application-recovery-controller-007
    q: Can a team rely on auto scaling to finish before an ARC autoshift or practice run starts?
    a: No. Autoshift does not wait for scaling. Preprovision capacity so the application can serve
      traffic without one zone.
    facts:
      - pre-scale
      - capacity
    trap: true
  - id: application-recovery-controller-008
    q: How often do ARC zonal autoshift practice runs occur, and how long does each traffic shift last?
    a: Weekly, with traffic for one resource shifted away from a zone for about 30 minutes.
    facts:
      - practice
diagrams:
  - id: arc-zonal-target-exclusion
    title: ALB shifts new traffic away from the impaired zone
    width: 800
    height: 350
    nodes:
      - id: arc
        label: ARC zonal shift
        icon: application-recovery-controller
        x: 20
        y: 60
        w: 190
        h: 72
        tone: network
      - id: alb
        label: ALB
        icon: res-elastic-load-balancing-application-load-balancer
        x: 300
        y: 60
        w: 180
        h: 72
        tone: network
      - id: healthy
        label: Surviving targets
        icon: res-ec2-instance
        x: 600
        y: 60
        w: 180
        h: 72
        tone: compute
      - id: excluded
        label: Shifted targets
        icon: res-ec2-instance
        x: 300
        y: 240
        w: 180
        h: 86
        tone: compute
        sub: no new traffic
    edges:
      - from: arc
        to: alb
        step: 1
        label: start shift
      - from: alb
        to: healthy
        step: 2
        label: new traffic
      - from: alb
        to: excluded
        dashed: true
        label: exclude
    steps:
      - Enable the resource and start a shift away from one zone.
      - With remaining healthy capacity, ALB sends new traffic to targets outside the shifted zone.
---
ARC zonal shift temporarily moves a supported resource's traffic away from one Availability Zone, an isolated location within a Region. It lets the application use the other zones while a zonal problem is investigated.

### How it works

1. Enable zonal shift on the ALB, where it is disabled by default. Check that the resource is active, fully provisioned, opted in, and in the Region and zone being shifted away from.
2. Prescale the remaining zones, meaning provision capacity before the shift rather than waiting for demand-driven scaling.
3. Start a shift for one zone and set an expiration. For ALB with cross-zone balancing enabled, the zonal addresses leave DNS, the system that resolves names to addresses, and targets in the shifted zone stop receiving new traffic.
4. ALB records an AdministrativeOverride separately from TargetHealth. A healthy target can show zonal_shift_active because it is deliberately excluded. Existing connections stay intact until they close, so DNS caching and connection reuse affect how quickly all traffic leaves.
5. Extend, cancel, or let the shift expire. Canceling or expiration makes the zone available again and traffic starts returning.
6. For AWS-initiated shifts, configure zonal autoshift and its required practice runs. AWS uses internal telemetry, measurements of AWS infrastructure, rather than testing individual resource health.

| Mode | Trigger | End condition |
|---|---|---|
| Manual zonal shift | Operator starts a shift | Expiration or cancellation |
| Zonal autoshift | AWS detects a potential zonal impairment | AWS determines the zone has recovered |
| Practice run | Required weekly autoshift test | About 30 minutes for one resource |

ALB added zonal shift and autoshift support with cross-zone balancing enabled in November 2024. Older launch guidance requiring cross-zone balancing to be off predates this change.

### Exam cues

- If the question says one ALB zone is impaired, think zonal shift, because it moves new traffic to other zones in the same Region.
- If the question says ALB cross-zone balancing is enabled, think zonal shift is still supported, because ALB can administratively exclude the affected zone's targets.
- If the question says AWS should trigger evacuation, think zonal autoshift, because AWS telemetry starts the shift.
- If the question says all load balancer targets are unhealthy and a shift has no effect, think fail open, because zonal shift cannot force a move in that state.

### Remember

- ALB and NLB support zonal shift with cross-zone balancing on or off.
- One zone per load balancer shift.
- Initial manual expiration: one minute to three days, or 72 hours; extendable.
- Autoshift requires weekly practice runs lasting about 30 minutes per resource.
- Autoshift and practice runs do not wait for auto scaling.

> **Trap:** Administrative exclusion and health are separate. A healthy ALB target can be excluded by zonal shift, while existing connections remain until they close.
