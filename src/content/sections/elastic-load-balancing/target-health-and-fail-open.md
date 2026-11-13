---
title: Target health and fail open
level: associate
order: 20
facts:
  - id: checks
    text: ALB health checks periodically test registered targets; targets must pass an initial health
      check before receiving normal traffic.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html
  - id: check-settings
    text: ALB health checks default to HTTP GET on the traffic port, with path / for HTTP target groups.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#health-check-settings
  - id: check-timing
    text: For ALB instance and IP targets, the default health check interval is 30 seconds and the
      timeout is 5 seconds.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#health-check-settings
  - id: thresholds
    text: ALB defaults are two consecutive failures to mark a target unhealthy and five consecutive
      successes to recover an unhealthy target.
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
  - id: health-counts
    text: Deregistering an ALB target reduces HealthyHostCount but does not increase UnHealthyHostCount.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#health-check-settings
  - id: health-host
    text: An ALB health check Host header contains the target private IP address and, for a nondefault
      port, the health check port; virtual hosts may need a default configuration.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html#target-not-inservice
  - id: nlb-udp-check
    text: NLB health checks for UDP and QUIC services use TCP, HTTP, or HTTPS; the checked service
      should reflect the UDP or QUIC application's availability.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/target-group-health-checks.html#target-group-health-checks
  - id: nlb-https-tls
    text: NLB HTTPS health checks fail against targets that support only TLS 1.3; targets must also
      support an earlier version such as TLS 1.2.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/target-group-health-checks.html#target-group-health-checks
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
  - id: elastic-load-balancing-021
    q: What are the default ALB health check timings and failure thresholds for instance or IP targets?
    a: 30-second interval, 5-second timeout, two consecutive failures to become unhealthy, and five
      consecutive successes to recover. Initial registration needs one successful check.
    facts:
      - check-timing
      - thresholds
      - checks
  - id: elastic-load-balancing-022
    q: Does deregistering an ALB target increase UnHealthyHostCount?
    a: No. It reduces HealthyHostCount without increasing UnHealthyHostCount.
    facts:
      - health-counts
    trap: true
  - id: elastic-load-balancing-038
    q: An Application Load Balancer health check fails against a web server that responds only to its public domain name. What should the team check?
    a: Configure a virtual host or default response for the health check Host header, which uses the target private IP and a nondefault health check port.
    facts:
      - health-host
  - id: elastic-load-balancing-039
    q: An NLB routes UDP traffic to a service. How should the team make its health check detect UDP service failure?
    a: Use a TCP, HTTP or HTTPS health check endpoint that reports the UDP service's availability.
    facts:
      - nlb-udp-check
  - id: elastic-load-balancing-040
    q: An NLB target supports only TLS 1.3 and fails HTTPS health checks. What must change?
    a: Enable an earlier TLS version such as TLS 1.2 on the target for the health checks.
    facts:
      - nlb-https-tls
---
An ALB health check is a periodic request that tests whether a registered target can respond. Health thresholds decide when to avoid a target or change routing when too little healthy capacity remains.

### How it works

1. Configure the health check protocol, port, path, and thresholds for the target group. The defaults are HTTP GET on the traffic port and path `/` for HTTP target groups.
2. A newly registered target must pass an initial check. For instance and IP targets, checks default to a 30-second interval and a 5-second timeout.
3. Two consecutive failures mark a target unhealthy by default. An unhealthy target needs five consecutive successes to recover.
4. Set minimum healthy counts or percentages for the actions below.

   | Action or measurement | Meaning |
   |---|---|
   | DNS failover | Stop advertising the affected zone node as healthy in DNS, the system that maps names to addresses |
   | Routing failover | Try all targets available to the node, including unhealthy ones |
   | HealthyHostCount and UnHealthyHostCount | Count healthy and unhealthy targets; deregistration only lowers the healthy count |

5. If all registered targets are unhealthy across enabled zones, ALB fails open: it continues sending requests to them regardless of health.
6. An ALB health check uses the target private IP in its Host header, plus the health check port when nondefault. Configure a matching or default virtual host if needed.
7. NLB checks UDP and QUIC services using TCP, HTTP or HTTPS checks. Make the check endpoint reflect the actual service's health. HTTPS checks require support for a TLS version earlier than 1.3.

### Exam cues

- If the question says every registered target failed health checks, think fail open, because ALB still tries the targets.
- If the question says remove a zone from DNS before capacity is exhausted, think DNS failover thresholds, because they control the health of the zone node in DNS.
- If the question says lower the healthy target threshold for trying all targets, think routing failover, because it broadens target selection below that threshold.
- If an NLB UDP service fails while its health endpoint still succeeds, make that endpoint report the UDP service state.

### Remember

- Instance and IP target defaults: 30-second interval, 5-second timeout, two failed checks, five recovery checks.
- Initial registration requires one successful health check.
- Default healthy count threshold: 1 for both failover actions; percentage thresholds default to off.
- DNS failover thresholds must be greater than or equal to routing failover thresholds.
- When count and percentage thresholds are both set, either breach triggers that action.

> **Trap:** Health checks are not a security boundary that blocks all access to unhealthy targets. ALB can fail open.
