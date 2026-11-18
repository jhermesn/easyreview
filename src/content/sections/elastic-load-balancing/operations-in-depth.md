---
title: "PLACEHOLDER elastic-load-balancing/operations-in-depth"
level: professional
order: 70
facts:
  - id: incompatible
    text: ALB target stickiness and Lambda targets are not supported when target group cross-zone
      balancing is disabled.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-cross-zone
  - id: slow-existing
    text: ALB slow start does not apply to already healthy targets when enabled, or to the first batch
      registered together in an empty target group.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#slow-start-mode
  - id: slow-baseline
    text: A newly registered ALB target enters slow start only when another healthy target is outside
      slow start.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#slow-start-mode
  - id: algorithms
    text: ALB defaults to round robin; least outstanding requests selects targets with the least
      in-progress work, and weighted random is another algorithm.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-routing-algorithm
  - id: algorithm-limits
    text: ALB slow start cannot use least outstanding requests or weighted random; weighted random also
      cannot use sticky sessions.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html#modify-routing-algorithm
  - id: lambda-permission
    text: An ALB Lambda target needs a function resource policy granting elasticloadbalancing.amazonaws.com
      lambda:InvokeFunction; AWS recommends restricting it with aws:SourceArn and aws:SourceAccount.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html#prepare-lambda-function
  - id: nlb-quic-security
    text: NLB QUIC and TCP_QUIC listeners require an IPv4 NLB without security groups, cannot coexist with UDP or TCP_UDP listeners, and are limited to one such listener per NLB.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/create-listener.html#listener-prereqs
  - id: nlb-ip-routing
    text: NLB listener rules require dualstack and match the source IP address type, IPv4 or IPv6, rather than the CIDR ranges supported by ALB source-ip conditions.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-listeners.html#listener-rules
  - id: check-timing
    text: For ALB instance and IP targets, the default health check interval is 30 seconds and the
      timeout is 5 seconds.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#health-check-settings
  - id: thresholds
    text: ALB defaults are two consecutive failures to mark a target unhealthy and five consecutive
      successes to recover an unhealthy target.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#health-check-settings
  - id: checks
    text: ALB health checks periodically test registered targets; targets must pass an initial health
      check before receiving normal traffic.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html
  - id: health-counts
    text: Deregistering an ALB target reduces HealthyHostCount but does not increase UnHealthyHostCount.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html#health-check-settings
  - id: health-host
    text: An ALB health check Host header contains the target private IP address and, for a nondefault
      port, the health check port; virtual hosts may need a default configuration.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html#target-not-inservice
  - id: nlb-https-tls
    text: NLB HTTPS health checks fail against targets that support only TLS 1.3; targets must also
      support an earlier version such as TLS 1.2.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/target-group-health-checks.html#target-group-health-checks
cards:
  - id: elastic-load-balancing-024
    q: Can an ALB target group combine disabled cross-zone balancing with sticky sessions or Lambda
      targets?
    a: No. Neither target stickiness nor Lambda targets is supported with cross-zone balancing disabled.
    facts:
      - incompatible
    trap: true
  - id: elastic-load-balancing-025
    q: A team enables ALB slow start before registering the first batch into an empty target group. Will
      that batch ramp traffic?
    a: No. The first batch registered together in an empty target group does not enter slow start. A new
      target needs another healthy target outside slow start.
    facts:
      - slow-existing
      - slow-baseline
    trap: true
  - id: elastic-load-balancing-026
    q: An ALB target group uses least outstanding requests, but new targets need slow start. What must
      change?
    a: Use a compatible algorithm such as the default round robin. Slow start cannot run with least
      outstanding requests or weighted random.
    facts:
      - algorithms
      - algorithm-limits
  - id: elastic-load-balancing-041
    q: An Application Load Balancer must invoke an AWS Lambda function registered through the CLI. What permission is required?
    a: Grant the ELB service principal lambda:InvokeFunction in the function resource policy, restricted to the target group and account.
    facts:
      - lambda-permission
  - id: elastic-load-balancing-048
    q: A team wants an NLB with a QUIC listener and an attached security group. Is that supported?
    a: No. QUIC and TCP_QUIC listeners require an IPv4 NLB without security groups and cannot coexist with UDP or TCP_UDP listeners.
    trap: true
    facts: [nlb-quic-security]
  - id: elastic-load-balancing-055
    q: Can an NLB listener rule match a specific client CIDR range like an ALB source-ip condition?
    a: No. NLB listener rules match the source IP address type, IPv4 or IPv6, on a dualstack NLB.
    trap: true
    facts: [nlb-ip-routing]
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
  - id: elastic-load-balancing-040
    q: An NLB target supports only TLS 1.3 and fails HTTPS health checks. What must change?
    a: Enable an earlier TLS version such as TLS 1.2 on the target for the health checks.
    facts:
      - nlb-https-tls
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
