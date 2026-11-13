---
title: Routing controls
level: professional
order: 20
facts:
  - id: switch
    text: ARC routing controls are On or Off switches that change Route 53 health checks associated with
      application DNS records.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.about.html
  - id: regional
    text: ARC routing controls can fail over DNS traffic between application replicas in different
      Regions.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.html
  - id: not-monitor
    text: A routing control does not probe endpoint health or measure response time; its configured
      state controls the associated health check.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.about.html
  - id: cluster
    text: An ARC routing control cluster provides five redundant regional endpoints for getting and
      updating routing control states.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/introduction-components-routing.html
  - id: panel
    text: A control panel groups related routing controls; creating a cluster also creates a default
      control panel.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/introduction-components-routing.html
  - id: setup
    text: Create an ARC cluster before creating its control panels and routing controls, then associate
      routing control health checks with Route 53 DNS records.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.html
  - id: planes
    text: ARC configuration control plane operations create or delete routing control resources, while
      the routing control data plane gets, lists, and updates their states.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/data-and-control-planes.html
  - id: failover
    text: Switching the primary routing control Off and a standby control On changes associated health
      checks to reroute DNS traffic to the standby application replica.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.about.html
  - id: batch
    text: ARC supports updating multiple routing control states together so one replica can be turned
      off while another is turned on.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.update.html
  - id: assertion
    text: An assertion safety rule rejects a routing control state update unless its configured
      conditions remain true, such as at least one control remaining On.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.safety-rules.html#routing-control.about-safety-rule
  - id: gating
    text: A gating safety rule uses control states as a master switch that permits or blocks changes to
      target routing controls.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.safety-rules.html#routing-control.about-safety-rule
  - id: prestore
    text: AWS recommends keeping local copies of all five regional cluster endpoints and routing control
      ARNs before a failure.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/route53-arc-best-practices.regional.html
  - id: retry
    text: Failover automation should try other ARC regional cluster endpoints when one is unavailable
      and be able to use all five.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/route53-arc-best-practices.regional.html
  - id: data-api
    text: AWS recommends using the ARC data plane API to get or update routing control states during
      failover rather than relying on the console.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/route53-arc-best-practices.regional.html
  - id: delay
    text: ARC routing control failover is affected by DNS settings and existing connection reuse, so
      traffic might not move immediately.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.about.html
  - id: ttl
    text: Lower DNS TTL values and limited client connection lifetimes help traffic move sooner during
      routing control failover.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/route53-arc-best-practices.regional.html
  - id: readiness
    text: ARC readiness checks audit replica capacity, configuration, quotas, and routing policies; they
      should not be the primary failover trigger during a disaster.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/readiness-what-is.html
cards:
  - id: application-recovery-controller-009
    q: An application has primary and standby stacks in separate Regions and needs an
      operator-controlled DNS failover switch. Which ARC feature fits?
    a: Routing controls linked to Route 53 health checks and DNS records. Set the primary Off and
      standby On to change DNS traffic eligibility.
    facts:
      - regional
      - switch
      - failover
  - id: application-recovery-controller-010
    q: Does an ARC routing control decide its On or Off state by probing application response times?
    a: No. It is a switch controlling an associated Route 53 health check, not an endpoint health
      monitor.
    facts:
      - not-monitor
    trap: true
  - id: application-recovery-controller-011
    q: How many regional endpoints does an ARC routing control cluster provide?
    a: Five redundant regional endpoints for reading and changing routing control states.
    facts:
      - cluster
  - id: application-recovery-controller-012
    q: An ARC failover script cannot reach its first cluster endpoint. What should it do?
    a: Try another regional endpoint, using locally saved endpoints and ARNs. The retry process should
      be able to use all five endpoints.
    facts:
      - retry
      - prestore
      - cluster
  - id: application-recovery-controller-013
    q: An ARC operator must prevent turning off every application replica. Which safety rule fits?
    a: An assertion rule requiring at least one routing control to remain On. An update that violates
      the condition is rejected.
    facts:
      - assertion
  - id: application-recovery-controller-014
    q: An ARC operator wants a master switch that freezes automated changes to several routing controls.
      Which safety rule fits?
    a: A gating rule. It permits or blocks updates to the target routing controls based on the
      configured gating control states.
    facts:
      - gating
  - id: application-recovery-controller-015
    q: Which ARC API plane should an outage runbook use to update routing control states?
    a: The data plane. Configure resources in advance through the control plane, then use saved cluster
      endpoints to read and update states during recovery.
    facts:
      - planes
      - data-api
      - prestore
  - id: application-recovery-controller-016
    q: An ARC routing control failover succeeded but some clients still use the old Region. What should
      the team inspect?
    a: DNS TTL and client connection reuse. DNS-based failover and existing connections can delay
      complete movement.
    facts:
      - delay
      - ttl
  - id: application-recovery-controller-017
    q: Should an ARC readiness check be the primary trigger for regional failover during a disaster?
    a: No. It audits preparedness, including capacity and configuration, and complements application
      monitoring rather than serving as the primary failover trigger.
    facts:
      - readiness
    trap: true
diagrams:
  - id: arc-routing-control-dns-flow
    title: Routing controls change DNS eligibility of regional replicas
    width: 800
    height: 350
    nodes:
      - id: arc
        label: Routing controls
        icon: application-recovery-controller
        x: 20
        y: 135
        w: 190
        h: 72
        tone: network
      - id: dns
        label: Route 53 checks
        icon: route-53
        x: 300
        y: 135
        w: 180
        h: 72
        tone: network
      - id: primary
        label: "Primary: Off"
        icon: res-elastic-load-balancing-application-load-balancer
        x: 600
        y: 40
        w: 180
        h: 72
        tone: network
      - id: standby
        label: "Standby: On"
        icon: res-elastic-load-balancing-application-load-balancer
        x: 600
        y: 240
        w: 180
        h: 72
        tone: network
    edges:
      - from: arc
        to: dns
        step: 1
        label: state
      - from: dns
        to: primary
        dashed: true
        label: not eligible
      - from: dns
        to: standby
        step: 2
        label: DNS eligibility
    steps:
      - Change primary and standby routing control states through a cluster endpoint.
      - Associated Route 53 health checks let DNS failover records select the standby replica.
---
ARC routing controls let an operator or automation switch DNS traffic between application replicas. A replica is another deployment of the application that can serve the same workload. Each control is an On or Off switch connected to a Route 53 health check; it does not probe the application itself.

### How it works

1. Create a routing control cluster, which supplies five redundant regional endpoints. An endpoint is an address used to call the API. The cluster includes a default control panel, a grouping of related switches.
2. Create routing controls and their Route 53 health checks. Associate the checks with DNS records for the application replicas, such as primary and standby failover records.
3. Add safety rules to the control panel before failover.

   | Component | Purpose |
   |---|---|
   | Routing control | Set the associated health check state through an On or Off switch |
   | Assertion rule | Reject changes unless a condition such as at least one control On remains true |
   | Gating rule | Permit or block changes to target controls using a master switch |

4. Use the data plane, the API operations that read and update live control states, to set the standby On and primary Off. Multiple state changes can be submitted together. The configuration control plane creates or deletes the resources in advance.
5. Route 53 uses the changed health checks with the DNS records to direct clients to the eligible replica. DNS TTL, the time a DNS answer can be cached, and existing connection reuse affect how quickly every client moves.
6. Keep local copies of the five endpoints and routing control ARNs, their AWS resource identifiers. During failover, use the data plane API and retry other endpoints if one is unavailable.

Readiness checks have a different role: they audit replica capacity, configuration, quotas, and routing policies before an event. Use application monitoring to decide whether to fail over; readiness checks are not the primary disaster trigger.

### Exam cues

- If the question says operator-controlled regional DNS failover, think routing controls, because their switches change health checks linked to application DNS records.
- If the question says keep at least one replica enabled, think an assertion rule, because it rejects unsafe state combinations.
- If the question says freeze automated failover changes with one switch, think a gating rule, because it controls permission to update other controls.
- If the question says an endpoint is unavailable during a disaster, think retry another saved cluster endpoint, because the data plane has five regional endpoints.

### Remember

- Routing control state: On or Off.
- Cluster: five redundant regional endpoints.
- Control panel: related routing controls and safety rules.
- Configure before the event; use data plane state updates during recovery.
- Readiness checks audit preparedness; routing controls change traffic eligibility.

> **Trap:** A routing control health check reflects a switch state. It does not independently detect application failure or remove the need for monitoring and a failover decision.
