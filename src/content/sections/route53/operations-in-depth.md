---
title: Health and DNS operations
level: professional
order: 110
facts:
  - id: cloudfront-private
    text: CloudFront alias records are unsupported in a private hosted zone.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_AliasTarget.html#Route53-Type-AliasTarget-DNSName
  - id: cloudfront-health
    text: An alias to CloudFront cannot set EvaluateTargetHealth to true.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_AliasTarget.html#Route53-Type-AliasTarget-EvaluateTargetHealth
  - id: lb-health
    text: For an ALB or NLB to be healthy, every associated target group containing targets needs at least one healthy target.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_AliasTarget.html#Route53-Type-AliasTarget-EvaluateTargetHealth
  - id: empty-group
    text: An associated target group without registered targets is considered unhealthy.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_AliasTarget.html#Route53-Type-AliasTarget-EvaluateTargetHealth
  - id: service-health
    text: For S3, API Gateway and interface endpoints, target health offers no operational benefit for application failover; AWS recommends Route 53 checks of application access.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_AliasTarget.html#Route53-Type-AliasTarget-EvaluateTargetHealth
  - id: invert
    text: Inverted reverses a health check result; a healthy check becomes unhealthy.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_HealthCheckConfig.html#Route53-Type-HealthCheckConfig-Inverted
  - id: disabled
    text: Disabling a check stops monitoring and makes it healthy unless its result is inverted.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_HealthCheckConfig.html#Route53-Type-HealthCheckConfig-Disabled
  - id: both-failed
    text: If both checked failover records are unhealthy, Route 53 returns the primary.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-how-route-53-chooses-records.html#health-checks-how-route-53-chooses-records
  - id: aggregate
    text: For a public endpoint health check, For a public endpoint, Route 53 considers it healthy when more than 18% of checkers report healthy.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: consecutive
    text: The failure threshold is the number of consecutive successes or failures required to change a checker status.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-advanced
  - id: interval
    text: Each checker uses a request interval of 30 seconds or 10 seconds; the 10-second option costs extra.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-advanced
  - id: http-connect
    text: HTTP and HTTPS checks must establish a TCP connection within four seconds.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: http-status
    text: HTTP and HTTPS checks need a 2xx or 3xx status within two seconds after connecting.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: string-body
    text: String checks need the body within two more seconds after the status, with the full search string in the first 5,120 bytes.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: tls-cert
    text: HTTPS checks do not validate the TLS certificate and can pass with an expired or invalid certificate.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: notify
    text: The health-check console can create a CloudWatch alarm that notifies an SNS topic in us-east-1 after the endpoint has been unhealthy for one minute.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-alarm
  - id: firewall-alert
    text: ALERT stops inspection, permits the query, and records an alert in configured VPC Resolver
      query logs.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-rule-actions.html#resolver-dns-firewall-rule-actions
  - id: firewall-order
    text: Rule group associations and rules within a group are evaluated from lowest numeric priority
      upward until a match or exhaustion.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-overview.html#resolver-dns-firewall-overview
  - id: firewall-failclosed
    text: "With an associated rule group, DNS Firewall defaults to fail closed: a missing firewall
      response makes Resolver block the query with SERVFAIL."
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-vpc-configuration.html#resolver-dns-firewall-vpc-configuration
  - id: firewall-failopen
    text: Enabling FirewallFailOpen allows queries through when DNS Firewall does not respond.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-vpc-configuration.html#resolver-dns-firewall-vpc-configuration
  - id: firewall-nodata
    text: The NODATA block response reports a successful query without answer data.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-rule-actions.html#resolver-dns-firewall-rule-actions
  - id: firewall-nxdomain
    text: The NXDOMAIN block response reports that the queried domain does not exist.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-rule-actions.html#resolver-dns-firewall-rule-actions
  - id: firewall-override
    text: OVERRIDE returns a custom CNAME; its override TTL defaults to zero, so the override record is
      not cached by default.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-rule-actions.html#resolver-dns-firewall-rule-actions
  - id: firewall-wildcard
    text: A domain entry does not implicitly include all subdomains; add a wildcard such as
      *.example.com to include those subdomains.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-getting-started.html#resolver-dns-firewall-getting-started
  - id: firewall-test-alert
    text: A blocking rule can first be tested with ALERT to observe queries that would be blocked.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-rule-actions.html#resolver-dns-firewall-rule-actions
  - id: firewall-log-destinations
    text: Resolver query logging must be configured for the VPC; supported destinations include
      CloudWatch Logs, S3, and Firehose in the query logging configuration Region.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/firewall-resolver-query-logs-configuring.html#firewall-resolver-query-logs-configuring
  - id: multivalue
    text: Multivalue answer routing returns up to eight healthy records selected at random, or all healthy records when there are eight or fewer.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-multivalue.html#routing-policy-multivalue
  - id: multivalue-unhealthy
    text: If all multivalue records are unhealthy, Route 53 returns up to eight unhealthy records.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-multivalue.html#routing-policy-multivalue
  - id: all-zero
    text: When every record in a weighted group has weight 0, Route 53 gives the resources equal probability.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-values-weighted.html#rrsets-values-weighted-weight
  - id: regional-tree
    text: Latency aliases can point to regional groups of weighted records; Evaluate Target Health lets Route 53 leave a Region with no healthy records and try another Region.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-complex-configs.html#dns-failover-complex-configs
  - id: tree-leaves
    text: Non-alias leaves in a health-aware alias tree need health checks; an unchecked leaf can keep a failed branch eligible.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-complex-configs.html#dns-failover-complex-configs-hc-omitting
  - id: weight-range
    text: Weighted record weights are integers from 0 through 255.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-values-weighted.html#rrsets-values-weighted-weight
  - id: zero-fallback
    text: With health checks on weighted records, Route 53 considers zero-weight records when all nonzero-weight records are unhealthy.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-weighted.html#routing-policy-weighted-healthchecks
  - id: manual-state
    text: SetAlarmState cannot force a Route 53 health-check change because Route 53 reads the metric stream.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html#dns-failover-determining-health-of-endpoints
  - id: update
    text: After changing the CloudWatch alarm settings, update its Route 53 health check.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-creating-values.html#health-checks-creating-values-cloudwatch
  - id: sla
    text: The Route 53 SLA covers authoritative DNS hosted-zone availability and excludes API and console availability.
    source: https://aws.amazon.com/route53/sla/
  - id: dnssec-keys
    text: "DNSSEC signing works only for public hosted zones; each key-signing key is backed by an asymmetric customer managed KMS key you own, Route 53 manages the zone-signing key, and a DS record in the parent zone completes the chain of trust."
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring-dnssec.html#dns-configuring-dnssec
cards:
  - id: route53-026
    q: Can a Route 53 private hosted zone alias to CloudFront and evaluate its target health?
    a: No. Private zones cannot contain CloudFront aliases, and a CloudFront alias cannot enable Evaluate Target Health.
    facts:
      - cloudfront-private
      - cloudfront-health
    trap: true
  - id: route53-039
    q: A Route 53 ALB alias has Evaluate Target Health enabled. One associated target group has no registered targets. Can it make the alias unhealthy?
    a: Yes. An empty target group is unhealthy even if another target group has healthy targets.
    facts:
      - lb-health
      - empty-group
    trap: true
  - id: route53-041
    q: A team needs application-aware DNS failover for API Gateway. Is Evaluate Target Health sufficient?
    a: Use a Route 53 health check that monitors application access. AWS says inherited target health for API Gateway provides no operational benefit for this purpose.
    facts:
      - service-health
    trap: true
  - id: route53-019
    q: A team wants to test Route 53 failover while its primary endpoint remains healthy. Which health-check setting can make it appear unhealthy?
    a: Invert the healthy primary check. Disabling a non-inverted check makes it healthy and will not trigger this failover.
    facts:
      - invert
      - disabled
    trap: true
  - id: route53-042
    q: Both Route 53 primary and secondary failover records have failed their health checks. Which record is returned?
    a: The primary record. Route 53 does not suppress both answers.
    facts:
      - both-failed
    trap: true
  - id: route53-004
    q: How does Route 53 aggregate endpoint health check results?
    a: For a public endpoint, it is healthy when more than 18% of checkers report healthy. Each checker applies its interval and consecutive-check threshold.
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
  - id: route53-027
    q: How can the Route 53 health-check console notify an operator of an endpoint failure?
    a: Create its default CloudWatch alarm and send notifications to an SNS topic in us-east-1. The default alarm waits for one minute of unhealthy status.
    facts:
      - notify
  - id: route53-036
    q: A Route 53 HTTPS check stays healthy after a certificate expires. Is certificate validation malfunctioning?
    a: No. HTTPS health checks do not validate TLS certificates.
    facts:
      - tls-cert
    trap: true
  - id: route53-056
    q: A Route 53 DNS Firewall ALERT rule matches a query before a later BLOCK rule. Does evaluation
      continue to the BLOCK rule?
    a: No. ALERT permits the query, records an alert in configured Resolver logs, and stops inspection.
      Put rules in the intended priority order.
    trap: true
    facts:
      - firewall-alert
      - firewall-order
  - id: route53-057
    q: A protected VPC receives no response from Route 53 DNS Firewall. What is the default result, and
      how can availability be favored?
    a: The default fail-closed mode returns SERVFAIL. Enable FirewallFailOpen to allow queries through
      when the firewall does not respond.
    facts:
      - firewall-failclosed
      - firewall-failopen
  - id: route53-058
    q: How do the Route 53 DNS Firewall NODATA, NXDOMAIN, and OVERRIDE block responses differ?
    a: NODATA returns success without answer data. NXDOMAIN reports a nonexistent domain. OVERRIDE
      returns a custom CNAME with a default TTL of zero.
    facts:
      - firewall-nodata
      - firewall-nxdomain
      - firewall-override
  - id: route53-059
    q: A Route 53 DNS Firewall rule lists example.com, but queries for its subdomains are still allowed.
      What list entry is missing?
    a: A matching subdomain entry, such as *.example.com for all subdomains. The parent domain entry
      alone does not cover them.
    facts:
      - firewall-wildcard
  - id: route53-061
    q: A team wants to test a Route 53 DNS Firewall blocking policy without denying matching queries.
      What should it configure?
    a: Use ALERT first and enable Resolver query logging for the VPC. Logs can go to CloudWatch Logs,
      S3, or Firehose.
    facts:
      - firewall-test-alert
      - firewall-log-destinations
  - id: route53-018
    q: What does Route 53 multivalue answer routing return when resources are healthy, and when all are unhealthy?
    a: Up to eight healthy records, or all healthy records if there are eight or fewer. If all are unhealthy, it returns up to eight unhealthy records.
    facts:
      - multivalue
      - multivalue-unhealthy
  - id: route53-030
    q: Every Route 53 weighted record has weight 0. Does the group stop answering?
    a: No. All resources have equal selection probability.
    facts:
      - all-zero
    trap: true
  - id: route53-031
    q: A Route 53 latency alias points to a regional weighted group with no healthy endpoints. How can DNS choose another Region?
    a: Enable Evaluate Target Health on the latency aliases and attach health checks to the non-alias weighted records. Route 53 can leave the failed regional branch.
    facts:
      - regional-tree
      - tree-leaves
  - id: route53-032
    q: What weight range does a Route 53 weighted record accept?
    a: An integer from 0 through 255.
    facts:
      - weight-range
  - id: route53-033
    q: A healthy Route 53 weighted record has weight 0 while all records with nonzero weights fail their checks. Can it answer?
    a: Yes. Route 53 considers zero-weight records when every nonzero-weight record is unhealthy.
    facts:
      - zero-fallback
    trap: true
  - id: route53-037
    q: A team calls SetAlarmState to test Route 53 failover, but the health check does not change. Why?
    a: Route 53 reads the metric data stream, not the alarm state set by the API.
    facts:
      - manual-state
    trap: true
  - id: route53-038
    q: An operator changes the CloudWatch alarm threshold used by a Route 53 check. What additional update is required?
    a: Update the Route 53 health check after changing the alarm settings.
    facts:
      - update
  - id: route53-051
    q: Does the Route 53 authoritative DNS SLA guarantee its console and API availability?
    a: No. The SLA is scoped to authoritative DNS hosted-zone availability and excludes API and console availability.
    facts:
      - sla
    trap: true
  - id: route53-073
    q: "What does a team need to sign a public Route 53 hosted zone with DNSSEC?"
    a: "A key-signing key backed by an asymmetric customer managed KMS key, then a DS record added at the parent zone. Private hosted zones cannot be signed."
    facts: [dnssec-keys]
---
Route 53 health checks, routing settings and Resolver DNS Firewall rules determine how DNS answers and queries behave during failures. Their operational details matter when a health signal, record weight or firewall rule produces an unexpected result.

### How it works

1. Endpoint checkers use a 30-second or 10-second interval and a consecutive success or failure threshold. For a public endpoint, Route 53 considers it healthy when more than 18% of checkers report healthy. Check settings · Health determination
2. HTTP and HTTPS checks need a TCP connection within four seconds and a 2xx or 3xx response within two seconds after connection. A string check needs the body within two more seconds and the complete string in its first 5,120 bytes. HTTPS checks do not validate TLS certificates.
3. For an ALB or NLB alias, each associated target group with targets needs at least one healthy target. An empty group is unhealthy. For S3, API Gateway and interface endpoints, AWS recommends checking application access for failover. CloudFront aliases cannot use Evaluate Target Health or exist in private hosted zones. Target health · CloudFront target
4. For regional failover, latency aliases can point to regional weighted groups. Enable Evaluate Target Health and check the non-alias leaves: an unchecked leaf can keep a failed branch eligible. If both checked failover records are unhealthy, Route 53 returns the primary. Regional trees · Unchecked leaves · Failover selection
5. DNS Firewall evaluates rule group associations and rules from the lowest numeric priority upward. An `ALERT` match permits the query, records an alert in configured VPC Resolver query logs and stops inspection. Use it to test a proposed block. Configure logging for the VPC to CloudWatch Logs, S3 or Firehose in the logging configuration Region. Rule order · Actions · Logging

DNS Firewall block responses differ:

| Response | Result |
|---|---|
| `NODATA` | Successful query with no answer data |
| `NXDOMAIN` | The domain does not exist |
| `OVERRIDE` | A custom CNAME, with a default TTL of zero |

TTL is the time a record can be cached.

### Exam cues

- If the question says test primary failover while the endpoint is healthy, think an inverted health check, because inversion reverses the result. Disabling a non-inverted check makes it healthy. Check settings · Disabled checks
- If the question says an ALB alias is unhealthy despite healthy targets elsewhere, think an empty associated target group, because an empty group is unhealthy.
- If the question says a protected VPC must keep resolving when DNS Firewall does not respond, think `FirewallFailOpen`, because the default fail-closed mode returns `SERVFAIL`.
- If the question says a domain rule misses subdomains, think a wildcard entry such as `*.example.com`, because the parent entry does not include all subdomains.
- If the question says all nonzero weighted records are unhealthy, think zero-weight records, because Route 53 considers them when health checks are configured.

### Remember

- The 10-second check interval costs extra. The health-check console can create a CloudWatch alarm that notifies an SNS topic in us-east-1 after one minute of unhealthy status. Intervals · Notifications
- Weighted records accept integer weights from 0 through 255. If all weights are zero, resources have equal selection probability.
- Multivalue routing returns up to eight healthy records, or all healthy records if there are eight or fewer. If all are unhealthy, it returns up to eight unhealthy records.
- An alarm-based health check follows the metric data stream, not a state set with SetAlarmState; update the check after changing the alarm.
- The Route 53 SLA covers authoritative DNS, not the API or console.
- DNSSEC signing: a customer managed asymmetric KMS key backs each key-signing key, Route 53 manages the zone-signing key, and a DS record in the parent zone completes the chain of trust.

> **Trap:** A healthy HTTPS check does not prove that the TLS certificate is valid. An expired or invalid certificate can still pass.
