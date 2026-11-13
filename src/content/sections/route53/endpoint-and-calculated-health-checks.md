---
title: Endpoint and calculated health checks
level: associate
order: 20
facts:
  - id: probe
    text: Endpoint checks send HTTP, HTTPS or TCP requests to the endpoint configured in the health check.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-endpoint
  - id: interval
    text: Each checker uses a request interval of 30 seconds or 10 seconds; the 10-second option costs extra.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-advanced
  - id: consecutive
    text: The failure threshold is the number of consecutive successes or failures required to change a checker status.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-advanced
  - id: aggregate
    text: Route 53 considers an endpoint healthy when more than 18% of checkers report healthy.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: http-connect
    text: HTTP and HTTPS checks must establish a TCP connection within four seconds.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: http-status
    text: HTTP and HTTPS checks need a 2xx or 3xx status within two seconds after connecting.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: string-body
    text: String checks need the body within two more seconds after the status, with the full search string in the first 5,120 bytes.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: tcp-time
    text: TCP-only checks must establish a connection within ten seconds.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: tls-cert
    text: HTTPS checks do not validate the TLS certificate and can pass with an expired or invalid certificate.
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
  - id: notify
    text: The health-check console can create a CloudWatch alarm that notifies an SNS topic in us-east-1 after the endpoint has been unhealthy for one minute.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-alarm
  - id: independent
    text: Endpoint probes run periodically rather than when a DNS query arrives.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-how-route-53-chooses-records.html#health-checks-how-route-53-chooses-records
cards:
  - id: route53-004
    q: How does Route 53 aggregate endpoint health check results?
    a: The endpoint is healthy when more than 18% of checkers report healthy. Each checker applies its interval and consecutive-check threshold.
    facts:
      - aggregate
      - consecutive
      - interval
  - id: route53-005
    q: What must a Route 53 HTTP or HTTPS health check receive to pass?
    a: A TCP connection within four seconds and a 2xx or 3xx status within two more seconds. String checks need the body within another two seconds and the string within its first 5,120 bytes. HTTPS does not validate certificates.
    facts:
      - http-connect
      - http-status
      - string-body
      - tls-cert
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
  - id: route53-027
    q: How can the Route 53 health-check console notify an operator of an endpoint failure?
    a: Create its default CloudWatch alarm and send notifications to an SNS topic in us-east-1. The default alarm waits for one minute of unhealthy status.
    facts:
      - notify
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
  - id: route53-036
    q: A Route 53 HTTPS check stays healthy after a certificate expires. Is certificate validation malfunctioning?
    a: No. HTTPS health checks do not validate TLS certificates.
    facts:
      - tls-cert
    trap: true
---
Route 53 health checks supply a health signal for DNS routing. An endpoint check probes an address and port. A calculated check combines component results so DNS can represent application health.

### How it works

1. Choose an endpoint, child health checks, or a CloudWatch alarm data stream to monitor. An endpoint is the network address and port receiving the probe.
2. For an endpoint, allow the checker addresses through routing and firewall rules. A security group can use the AWS-managed health-check prefix lists.
3. Each checker sends requests at a 30-second or 10-second interval and applies the configured consecutive-success or failure threshold.
4. Route 53 aggregates the results. More than 18% of checkers must report healthy.
5. For a calculated check, count healthy children and compare the count with the required threshold. Calculated checks cannot be children of another calculated check.
6. Attach the check to the record whose selection should depend on it. The check continues probing its configured target independently of DNS queries.

| Endpoint protocol | Passing response |
|---|---|
| HTTP or HTTPS | TCP connection within four seconds, then 2xx or 3xx within two seconds |
| HTTP or HTTPS with string match | The same connection and status, then body within two more seconds; string entirely in the first 5,120 bytes |
| TCP | Connection within ten seconds |

TLS is the protocol that protects an HTTPS connection. Route 53 HTTPS checks do not validate its certificate.

### Exam cues

- If the question says users can connect but checkers cannot, think firewall and routing access for checker addresses, because probes must reach the configured port.
- If the question says every application component must be healthy, think a calculated check with an all-children threshold, because it combines child results.
- If the question says send an email after a health failure, think a CloudWatch alarm and an SNS notification, because health checks can drive that alarm.

### Remember

- More than 18% healthy checkers means healthy.
- The 10-second interval costs extra.
- The default console notification waits for one minute of unhealthy status and uses an SNS topic in us-east-1.
- The health check probes its own configured target.

> **Trap:** An HTTPS health check can pass with an expired certificate. It is not a certificate-expiry test.
