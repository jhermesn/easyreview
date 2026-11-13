---
title: DNS failover and testing
level: professional
order: 50
facts:
  - id: primary
    text: With health checks on both failover records, Route 53 returns the primary while it is healthy.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-how-route-53-chooses-records.html#health-checks-how-route-53-chooses-records
  - id: secondary
    text: When the checked primary is unhealthy and checked secondary is healthy, Route 53 returns the secondary.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-how-route-53-chooses-records.html#health-checks-how-route-53-chooses-records
  - id: both-failed
    text: If both checked failover records are unhealthy, Route 53 returns the primary.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-how-route-53-chooses-records.html#health-checks-how-route-53-chooses-records
  - id: unchecked-secondary
    text: A secondary without a health check is returned whenever the primary is unhealthy, even if the secondary resource has failed.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-how-route-53-chooses-records.html#health-checks-how-route-53-chooses-records
  - id: cache
    text: Resolvers can keep returning a cached answer until its TTL expires.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-values-weighted.html#rrsets-values-weighted-ttl
  - id: ttl-advice
    text: For records associated with health checks, AWS recommends a TTL of 60 seconds or less.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-values-weighted.html#rrsets-values-weighted-ttl
  - id: invert
    text: Inverted reverses a health check result; a healthy check becomes unhealthy.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_HealthCheckConfig.html#Route53-Type-HealthCheckConfig-Inverted
  - id: disabled
    text: Disabling a check stops monitoring and makes it healthy unless its result is inverted.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_HealthCheckConfig.html#Route53-Type-HealthCheckConfig-Disabled
  - id: async
    text: DNS queries use existing health status rather than starting a probe.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-how-route-53-chooses-records.html#health-checks-how-route-53-chooses-records
diagrams:
  - id: route53-dns-failover
    title: DNS failover between regional endpoints
    width: 800
    height: 310
    nodes:
      - id: client
        label: Client
        sub: uses cached DNS
        icon: res-client
        x: 20
        y: 110
        w: 130
        h: 86
        tone: user
        info: A resolver can reuse a cached DNS answer until its TTL expires.
      - id: dns
        label: Route 53
        sub: failover records
        icon: route-53
        x: 250
        y: 110
        w: 150
        h: 86
        tone: network
        info: With both records checked, return the healthy primary, otherwise the healthy secondary. If both fail, return the primary.
      - id: primary
        label: Primary endpoint
        sub: Region A
        icon: res-elastic-load-balancing-application-load-balancer
        x: 590
        y: 14
        w: 170
        h: 86
        tone: compute
        info: Primary failover record using a health check or applicable alias target health.
      - id: secondary
        label: Secondary
        sub: Region B
        icon: res-elastic-load-balancing-application-load-balancer
        x: 590
        y: 206
        w: 170
        h: 86
        tone: compute
        info: Secondary failover record. An unchecked secondary is treated as healthy.
    edges:
      - from: client
        to: dns
        step: 1
        label: DNS query
      - from: dns
        to: primary
        step: 2
        label: healthy
      - from: dns
        to: secondary
        step: 3
        label: primary unhealthy
        dashed: true
    steps:
      - The resolver asks Route 53 when its cached answer has expired.
      - While the primary is healthy, Route 53 answers with the primary record.
      - If the primary is unhealthy and the secondary is healthy, return the secondary. If both checked records are unhealthy, return the primary.
cards:
  - id: route53-003
    q: Does changing Route 53 failover health immediately change every client DNS answer?
    a: No. Resolvers can keep returning an earlier cached answer until its TTL expires.
    facts:
      - cache
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
  - id: route53-043
    q: A Route 53 primary fails, and the secondary has no health check. Is Route 53 checking whether the secondary works before returning it?
    a: No. It returns the unchecked secondary even if the resource is unhealthy.
    facts:
      - unchecked-secondary
    trap: true
---
Route 53 failover routing changes the DNS answer from a primary resource to a standby. It uses recorded health status, while recursive resolver caches control when a client receives a fresh answer.

### How it works

1. Configure primary and secondary failover records for the application name, with health checks or applicable alias target health.
2. With checks on both records, Route 53 returns the primary while it is healthy. It returns the secondary when the primary is unhealthy and the secondary is healthy.
3. If both checked records are unhealthy, Route 53 returns the primary. An unchecked secondary is returned whenever the primary fails, regardless of the secondary resource's actual condition.
4. A resolver can continue returning an earlier answer until its TTL expires. TTL means the time an answer may stay cached.
5. To test while a primary endpoint remains healthy, invert its health-check result and query for the changed DNS answer. Restore the setting after the test.

### Exam cues

- If the question says the secondary should answer only after a primary failure, think failover records, because the routing policy implements active-passive selection.
- If the question says resolvers still return the primary after its check fails, think TTL, because a cached answer avoids another Route 53 lookup.
- If the question says both checked endpoints are unhealthy, think the primary answer, because that is the failover fallback.

### Remember

- AWS recommends a TTL of 60 seconds or less for health-checked records.
- Probes run separately from DNS queries.
- A disabled non-inverted check counts as healthy.

> **Trap:** Disabling the primary health check does not simulate failure. Invert a healthy check to test that path.
