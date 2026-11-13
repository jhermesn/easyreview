---
title: Cross-zone balancing
level: associate
order: 30
facts:
  - id: scope
    text: With cross-zone load balancing enabled, a node can distribute requests to targets across
      enabled zones; disabled nodes use only targets in their own zone.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#cross-zone-load-balancing
  - id: alb-default
    text: ALB cross-zone balancing is always enabled at the load balancer level; target groups inherit
      that setting by default but can override it.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-cross-zone
  - id: network-default
    text: NLB and GWLB cross-zone balancing is disabled by default.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#cross-zone-load-balancing
  - id: imbalance
    text: When cross-zone balancing is disabled, unequal zonal target counts can cause unequal
      per-target traffic even if nodes receive equal traffic.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#cross-zone-load-balancing
  - id: empty-zone
    text: With ALB target group cross-zone balancing disabled, requests entering an enabled zone with no
      targets receive HTTP 503 errors.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-cross-zone
  - id: incompatible
    text: ALB target stickiness and Lambda targets are not supported when target group cross-zone
      balancing is disabled.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-cross-zone
  - id: zone
    text: An Availability Zone is an isolated location in an AWS Region.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones
cards:
  - id: elastic-load-balancing-003
    q: What are the default cross-zone balancing settings for ALB, NLB, and GWLB?
    a: ALB always enables it at the load balancer and target groups inherit it unless overridden. NLB
      and GWLB disable it by default.
    facts:
      - alb-default
      - network-default
    trap: true
  - id: elastic-load-balancing-004
    q: An ALB target group disables cross-zone balancing and an enabled zone has no targets. What
      happens to requests entering that zone?
    a: They receive HTTP 503 errors. Keep capacity in every participating zone or enable cross-zone
      balancing. Target stickiness is also unsupported with cross-zone disabled.
    facts:
      - empty-zone
      - incompatible
  - id: elastic-load-balancing-023
    q: An NLB has uneven target counts across zones and cross-zone balancing is off. Why are some
      targets busier?
    a: Each node sends only to its own zone. Equal traffic to nodes can become unequal traffic per
      target when their target counts differ.
    facts:
      - scope
      - imbalance
  - id: elastic-load-balancing-024
    q: Can an ALB target group combine disabled cross-zone balancing with sticky sessions or Lambda
      targets?
    a: No. Neither target stickiness nor Lambda targets is supported with cross-zone balancing disabled.
    facts:
      - incompatible
    trap: true
diagrams:
  - id: elb-cross-zone-scope
    title: Cross-zone balancing lets a node reach another zone
    width: 800
    height: 330
    groups:
      - label: Availability Zone A
        x: 20
        y: 20
        w: 360
        h: 290
        tone: network
      - label: Availability Zone B
        x: 420
        y: 20
        w: 360
        h: 290
        tone: network
    nodes:
      - id: node
        label: ALB node
        icon: res-elastic-load-balancing-application-load-balancer
        x: 100
        y: 70
        w: 180
        h: 72
        tone: network
      - id: local
        label: Local target
        icon: res-ec2-instance
        x: 100
        y: 220
        w: 180
        h: 72
        tone: compute
      - id: remote
        label: Other zone target
        icon: res-ec2-instance
        x: 510
        y: 220
        w: 180
        h: 72
        tone: compute
    edges:
      - from: node
        to: local
        step: 1
        label: local
      - from: node
        to: remote
        step: 2
        label: cross-zone on
    steps:
      - A node can use targets in its own zone.
      - With cross-zone enabled, it can also use targets in other enabled zones.
---
Cross-zone load balancing controls which Availability Zones a load balancer node can use for targets. An Availability Zone (AZ) is an isolated location within a Region; a node is the load balancer endpoint serving one zone.

### How it works

1. Requests arrive at a load balancer node in an enabled zone.
2. With cross-zone balancing enabled, the node can choose targets across enabled zones. With it disabled, the node uses only its own zone.
3. Choose the setting at the supported level.

   | Type | Default | Where to change it |
   |---|---|---|
   | ALB | Enabled at the load balancer; inherited by target groups | Override per target group |
   | NLB | Disabled | Load balancer setting |
   | GWLB | Disabled | Load balancer setting |

4. If traffic stays within each zone, provide capacity in each participating zone. Unequal target counts can create unequal per-target load. For an ALB target group with cross-zone disabled, an empty zone produces HTTP 503 responses for requests entering that zone.

### Exam cues

- If the question says targets in one NLB zone are overloaded despite spare capacity elsewhere, think cross-zone balancing, because disabled nodes cannot use the other zones' targets.
- If the question says disable ALB cross-zone balancing, think target group override, because the load balancer level is always enabled.
- If the question says an empty ALB zone returns 503, think missing zonal targets with cross-zone disabled, because that node cannot use another zone.

### Remember

- ALB: always on at the load balancer, inherited by target groups unless overridden.
- NLB and GWLB: off by default.
- ALB target stickiness and Lambda targets require cross-zone balancing.

> **Trap:** Turning off cross-zone balancing does not balance capacity between zones. Every participating zone needs its own target capacity.
