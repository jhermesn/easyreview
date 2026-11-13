---
title: Data plane and control plane failover
level: professional
order: 40
facts:
  - id: planes
    text: A service data plane handles ongoing service operations; its control plane configures
      resources. Data planes typically have higher availability design goals.
    source: https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html#disaster-recovery-options-in-the-cloud
  - id: dns-failover
    text: Route 53 health checks and ARC routing controls support DNS failover through their data
      planes, without depending on record configuration changes.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/best-practices-dns.html#best-practices-dns
  - id: arc-switch
    text: ARC routing controls are on-off switches connected to Route 53 health checks and DNS records
      to move traffic between regional replicas.
    source: https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.html#routing-control
  - id: dns-cache
    text: DNS time to live (TTL) specifies how long resolvers cache a record before querying again;
      lower TTLs let resolvers notice changes sooner.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/best-practices-dns.html#best-practices-dns
  - id: accelerator
    text: Global Accelerator keeps static client-facing IP addresses and reroutes traffic when a
      regional application endpoint fails.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-benefits-of-migrating.html#introduction-benefits-of-migrating
  - id: cf-cache
    text: CloudFront serves cache hits from its cache and sends cache misses to the primary origin of
      the configured origin group.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
  - id: cf-retry
    text: CloudFront origin failover sends a request to the secondary after a configured primary
      failure; later origin requests try the primary again.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
  - id: cf-methods
    text: CloudFront origin failover supports GET, HEAD and OPTIONS, not POST or PUT; OPTIONS must be
      included in cached HTTP methods.
    source: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html#high_availability_origin_failover
  - id: preprovision
    text: Increasing warm standby capacity in advance reduces reliance on control plane scaling during
      recovery.
    source: https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_disaster_recovery.html#rel_planning_for_recovery_disaster_recovery
cards:
  - id: disaster-recovery-012
    q: Which traffic-switching approach reduces control plane dependence during cross-Region AWS
      disaster recovery?
    a: Preconfigure Route 53 health-check failover or ARC routing controls and recovery capacity. They
      avoid needing DNS record configuration changes during the incident.
    facts:
      - dns-failover
      - arc-switch
      - preprovision
  - id: disaster-recovery-013
    q: How does CloudFront origin failover differ from Route 53 failover during AWS recovery?
    a: CloudFront retries eligible failed origin requests against a secondary but tries the primary
      again for later origin requests. Route 53 failover changes DNS answers; resolvers can retain
      cached answers until TTL expires.
    facts:
      - cf-retry
      - dns-cache
  - id: disaster-recovery-024
    q: A team configures CloudFront origin failover for an API. Will a failed POST request automatically
      retry against the secondary origin?
    a: No. Origin failover supports GET, HEAD and eligible OPTIONS requests, not POST or PUT.
    trap: true
    facts:
      - cf-methods
  - id: disaster-recovery-025
    q: An AWS application needs regional endpoint failover while keeping the IP addresses embedded in
      clients. Which service fits?
    a: Global Accelerator. Its static client-facing IP addresses stay the same as traffic is rerouted to
      a healthy endpoint.
    facts:
      - accelerator
diagrams:
  - id: dr-cloudfront-origin-retry
    title: CloudFront origin failover on an eligible cache miss
    width: 1200
    height: 180
    nodes:
      - id: edge
        label: CloudFront
        icon: cloudfront
        x: 20
        y: 55
        w: 180
        h: 72
        tone: network
      - id: primary
        label: Primary origin
        icon: res-generic-application
        x: 340
        y: 55
        w: 180
        h: 72
        tone: user
      - id: secondary
        label: Secondary origin
        icon: res-generic-application
        x: 660
        y: 55
        w: 180
        h: 72
        tone: user
    edges:
      - from: edge
        to: primary
        step: 1
        label: cache miss
      - from: primary
        to: secondary
        step: 2
        label: eligible failure
    steps:
      - On an eligible cache miss, CloudFront tries the primary origin.
      - If the primary fails according to the configured criteria, CloudFront retries the eligible
        request at the secondary. Later origin requests try the primary again.
---
Failover moves traffic to a recovery deployment. The data plane performs ongoing service work, such as answering DNS queries. The control plane creates or changes configuration. Preparing failover before an incident reduces the configuration work needed during it.

### How it works

1. Prepare recovery capacity and traffic routing ahead of failure. More standby capacity reduces the need to scale through control plane operations.
2. Use Route 53 health-check failover or Application Recovery Controller (ARC) routing controls. A routing control is an on-off switch linked to a Route 53 health check and DNS records.
3. Clients receive the resulting DNS answers. DNS time to live (TTL) is how long a resolver can cache an answer before querying again, so cached answers affect the transition.
4. For fixed client IP addresses, Global Accelerator reroutes traffic between application endpoints without changing its client-facing addresses.

CloudFront origin failover operates at the request level. A cache hit is served from the cache. A cache miss tries the primary origin, the server holding the content, and a configured failure can send an eligible request to the secondary. Later origin requests try the primary again.

### Exam cues

- If the question says DNS configuration APIs might be unavailable during recovery, think preconfigured health checks or ARC routing controls, because failover can use the data plane.
- If the question says clients must keep fixed IP addresses during regional failover, think Global Accelerator, because it preserves its client-facing IP addresses.
- If the question says CloudFront should retry a failed POST at the secondary, think unsupported method, because origin failover only supports GET, HEAD and eligible OPTIONS requests.

### Remember

- ARC routing control still uses Route 53 DNS; it does not remove resolver caching.
- OPTIONS origin failover needs OPTIONS included in the cached HTTP methods.
- CloudFront's secondary origin is a retry destination, not a permanent switch after one failure.

> **Trap:** Changing DNS record weights during an incident is a configuration operation. Prepare the failover mechanism and capacity beforehand.
