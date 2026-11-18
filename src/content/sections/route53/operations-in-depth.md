---
title: "PLACEHOLDER route53/operations-in-depth"
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
    text: Route 53 considers an endpoint healthy when more than 18% of checkers report healthy.
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
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
