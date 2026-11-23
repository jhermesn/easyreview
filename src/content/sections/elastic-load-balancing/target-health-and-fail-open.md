---
title: Target health and fail open
level: associate
order: 20
facts:
  - id: check-settings
    text: ALB health checks default to HTTP GET on the traffic port, with path / for HTTP target groups.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#health-check-settings
  - id: fail-open
    text: If every registered target in an ALB target group is unhealthy across enabled zones, ALB
      routes to all of them regardless of health.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html
  - id: dns-failover
    text: ALB DNS failover marks a zone node unhealthy in DNS when its healthy target count or
      percentage falls below the configured threshold.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html#target-group-health
  - id: routing-failover
    text: ALB routing failover sends traffic to all targets available to a node, including unhealthy
      ones, when the healthy target threshold is breached.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html#target-group-health
  - id: health-defaults
    text: The default minimum healthy target count is 1 for both DNS failover and unhealthy-state
      routing; percentage thresholds are off by default.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html#target-group-attributes
  - id: health-order
    text: ALB DNS failover thresholds must be at least as high as routing failover thresholds; if both
      count and percentage are configured, either breach triggers the action.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html#target-group-health
  - id: nlb-udp-check
    text: NLB health checks for UDP and QUIC services use TCP, HTTP, or HTTPS; the checked service
      should reflect the UDP or QUIC application's availability.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/target-group-health-checks.html#target-group-health-checks
  - id: success-codes
    text: An ALB target passes its health check only if the response code is in the target group's success codes, 200 by default.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html
  - id: alb-check-protocols
    text: "Application Load Balancer target health checks support HTTP and HTTPS."
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html
cards:
  - id: elastic-load-balancing-005
    q: Every registered target in an ALB target group fails health checks across all enabled zones.
      Where does traffic go?
    a: To all registered targets regardless of health. ALB fails open, so health checks do not provide a
      fail-closed access control.
    facts:
      - fail-open
    trap: true
  - id: elastic-load-balancing-019
    q: An ALB should stop advertising a zone when too few targets are healthy. Which setting fits?
    a: Target group DNS failover thresholds. They mark the zone node unhealthy in DNS when the healthy
      count or percentage is too low.
    facts:
      - dns-failover
  - id: elastic-load-balancing-020
    q: An ALB needs to try unhealthy targets before the remaining healthy fleet is overloaded. Which
      setting fits?
    a: Routing failover thresholds. Below the threshold, the node can send traffic to every available
      target, including unhealthy ones.
    facts:
      - routing-failover
  - id: elastic-load-balancing-039
    q: An NLB routes UDP traffic to a service. How should the team make its health check detect UDP service failure?
    a: Use a TCP, HTTP or HTTPS health check endpoint that reports the UDP service's availability.
    facts:
      - nlb-udp-check
  - id: elastic-load-balancing-059
    q: ALB targets are unhealthy although the app answers the health check path with a 302 redirect. Why?
    a: The default success code is 200; add 302 to the success codes or point the check at a path that returns 200.
    trap: true
    facts: [success-codes]
  - id: elastic-load-balancing-083
    q: "Which protocols can an Application Load Balancer use for target health checks?"
    a: "HTTP and HTTPS."
    facts: [alb-check-protocols]
---
An ALB health check evaluates a target's response. Health thresholds decide when to avoid a target or change routing when too little healthy capacity remains.

### How it works

1. Configure the health check protocol, port, path, and thresholds for the target group. The defaults are HTTP GET on the traffic port and path `/` for HTTP target groups.
2. The response code must match the configured success codes, which default to 200.
3. Set minimum healthy counts or percentages for the actions below.

   | Action or measurement | Meaning |
   |---|---|
   | DNS failover | Stop advertising the affected zone node as healthy in DNS, the system that maps names to addresses |
   | Routing failover | Try all targets available to the node, including unhealthy ones |

4. If all registered targets are unhealthy across enabled zones, ALB fails open: it continues sending requests to them regardless of health.
5. NLB checks UDP and QUIC services using TCP, HTTP or HTTPS checks. Make the check endpoint reflect the actual service's health.

### Exam cues

- If the question says every registered target failed health checks, think fail open, because ALB still tries the targets.
- If the question says remove a zone from DNS before capacity is exhausted, think DNS failover thresholds, because they control the health of the zone node in DNS.
- If the question says lower the healthy target threshold for trying all targets, think routing failover, because it broadens target selection below that threshold.
- If an NLB UDP service fails while its health endpoint still succeeds, make that endpoint report the UDP service state.

### Remember

- Application Load Balancer health checks support HTTP and HTTPS.
- Default healthy count threshold: 1 for both failover actions; percentage thresholds default to off.
- DNS failover thresholds must be greater than or equal to routing failover thresholds.
- When count and percentage thresholds are both set, either breach triggers that action.

> **Trap:** Health checks are not a security boundary that blocks all access to unhealthy targets. ALB can fail open.
