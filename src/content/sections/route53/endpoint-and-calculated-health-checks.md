---
title: Endpoint and calculated health checks
level: associate
order: 20
facts:
  - id: probe
    text: Endpoint checks send HTTP, HTTPS or TCP requests to the endpoint configured in the health check.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-endpoint
  - id: tcp-time
    text: TCP-only checks must establish a connection within ten seconds.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: check-types
    text: The health-check settings support monitoring endpoints, child health checks, or a CloudWatch alarm data stream.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values
  - id: calculation
    text: A calculated check compares the count of healthy children with a threshold; the console offers all, one or more, or at least a chosen count.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-calculated
  - id: no-nesting
    text: A calculated health check cannot monitor another calculated health check.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-calculated
  - id: configured-target
    text: Associating a health check with a record does not change the endpoint being probed; it uses the endpoint specified in that check.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-values-weighted.html#rrsets-values-weighted-associate-with-health-check
  - id: checker-access
    text: Routing and firewall rules must allow checker source addresses to reach the configured endpoint port.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-router-firewall-rules.html#dns-failover-router-firewall-rules
  - id: prefix-list
    text: Security groups can allow the AWS-managed com.amazonaws.<region>.route53-healthchecks prefix list and the ipv6.route53-healthchecks list for IPv6 endpoints.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-router-firewall-rules.html#dns-failover-router-firewall-rules
  - id: independent
    text: Endpoint probes run periodically rather than when a DNS query arrives.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-how-route-53-chooses-records.html#health-checks-how-route-53-chooses-records
cards:
  - id: route53-006
    q: Which monitoring choices does the Route 53 health-check console provide?
    a: An endpoint, the status of other health checks through a calculated check, or a CloudWatch alarm data stream.
    facts:
      - check-types
  - id: route53-007
    q: How does a Route 53 calculated health check determine health?
    a: It compares the healthy-child count with a threshold. Select all children, one or more, or a chosen count. It cannot monitor another calculated check.
    facts:
      - calculation
      - no-nesting
  - id: route53-011
    q: Does attaching a Route 53 health check to a DNS record make it probe the address in that record?
    a: No. It probes the endpoint configured in the health check. The association uses that result to influence record selection.
    facts:
      - configured-target
    trap: true
  - id: route53-034
    q: An application answers user requests, but Route 53 endpoint health checks cannot connect. What network configuration should be checked?
    a: Allow the Route 53 health checker address ranges to reach the configured endpoint port. A security group can use the regional AWS-managed health-check prefix lists.
    facts:
      - checker-access
      - prefix-list
  - id: route53-035
    q: A team needs Route 53 to declare an application healthy only when every component check passes. What should it configure?
    a: A calculated health check with the all-children threshold. Use endpoint or alarm checks as children, because calculated checks cannot be nested.
    facts:
      - calculation
      - no-nesting
---
Route 53 health checks supply a health signal for DNS routing. An endpoint check probes an address and port. A calculated check combines component results so DNS can represent application health.

### How it works

1. Choose an endpoint, child health checks, or a CloudWatch alarm data stream to monitor. An endpoint is the network address and port receiving the probe.
2. For an endpoint, allow the checker addresses through routing and firewall rules. A security group can use the AWS-managed health-check prefix lists.
3. For a calculated check, count healthy children and compare the count with the required threshold. Calculated checks cannot be children of another calculated check.
4. Attach the check to the record whose selection should depend on it. The check continues probing its configured target independently of DNS queries.

### Exam cues

- If the question says users can connect but checkers cannot, think firewall and routing access for checker addresses, because probes must reach the configured port.
- If the question says every application component must be healthy, think a calculated check with an all-children threshold, because it combines child results.

### Remember

- The health check probes its own configured target.

> **Trap:** Attaching a check to a record does not make the check probe the address in that record. It probes its own configured target.
