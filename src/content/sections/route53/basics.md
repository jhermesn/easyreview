---
title: "Route 53 basics"
level: foundational
order: 5
facts:
  - id: dns
    text: "Amazon Route 53 is a highly available and scalable DNS web service for domain registration, DNS routing and health checking."
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html#Welcome
  - id: failover
    text: Failover routing uses a primary resource and a standby secondary for active-passive operation.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html#dns-failover-types
  - id: active-active
    text: Active-active configurations use policies other than failover and use record health to exclude unavailable resources.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html#dns-failover-types-active-active
  - id: selection
    text: Route 53 chooses a record using the routing policy, checks its current health status, and tries another if it is unhealthy; probes run separately from DNS queries.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-how-route-53-chooses-records.html#health-checks-how-route-53-chooses-records
  - id: weighted-ratio
    text: Weighted records with the same name and type receive DNS answers in proportion to their weight divided by the total weight.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-weighted.html#routing-policy-weighted
  - id: latency
    text: "Route 53 latency routing compares configured Regions using measurements collected over time between users and AWS data centers. An endpoint outside AWS can have substantially different latency, even when it is near an AWS Region."
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html#routing-policy-latency
  - id: health-checks
    text: Route 53 health checks monitor the health of web applications and other resources, and CloudWatch alarms can notify when a health check status changes.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html
  - id: "resolver-hybrid"
    text: "Route 53 Resolver inbound and outbound endpoints forward DNS queries in both directions between a VPC and on-premises DNS over a VPN or Direct Connect link."
    source: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html#resolver"
cards:
  - id: route53-074
    q: "A company needs to register a domain and route its traffic to resources on AWS. Which service fits?"
    a: "Amazon Route 53."
    facts: [dns]
  - id: route53-001
    q: An application runs in two AWS Regions, and its standby should receive DNS answers only after the primary fails. Which Route 53 policy fits?
    a: Failover routing. It implements active-passive selection using primary and secondary records.
    facts:
      - failover
  - id: route53-002
    q: How does Route 53 support active-active failover?
    a: Use a policy such as weighted or latency with health checks or alias target health. Healthy resources remain eligible for DNS answers.
    facts:
      - active-active
      - selection
  - id: route53-014
    q: A team wants a gradual DNS migration to a new application stack using Route 53. Which policy should it use?
    a: Weighted routing. Give the stacks relative weights and increase the new stack weight as the migration proceeds.
    facts:
      - weighted-ratio
  - id: route53-015
    q: Which Route 53 policy selects a Region using measured network latency?
    a: Latency routing. It uses AWS latency data collected over time for the Regions with configured records.
    facts:
      - latency
  - id: route53-065
    q: Which Amazon Route 53 feature monitors whether a web server is healthy so DNS can fail over away from it?
    a: Route 53 health checks.
    facts: [health-checks]
  - id: route53-083
    q: "A VPC and an on-premises data center are connected by VPN. How can Route 53 Resolver exchange DNS queries between them?"
    a: "Use inbound and outbound Resolver endpoints for the required query directions."
    facts: [resolver-hybrid]
---
Amazon Route 53 is AWS's DNS service: it registers domains, answers DNS queries and checks endpoint health.

### How it works

1. Register a domain or use an existing one.
2. Create DNS records pointing to resources.
3. Health checks steer traffic away from failed endpoints.

### Exam cues

- If the question says resolve names between a VPC and on-premises DNS over VPN, think Route 53 Resolver endpoints, because they forward queries between networks.
- If the question says DNS or domain registration, think Route 53.

### Remember

- Domain registration, DNS routing, health checks.

> **Trap:** Route 53 answers DNS queries; it does not carry the application traffic.
