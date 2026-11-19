---
title: Routing policies
level: associate
order: 10
facts:
  - id: dns-choice
    text: A routing policy controls which record value Route 53 returns for a DNS query.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html#routing-policy
  - id: simple
    text: Simple routing is for a single resource performing a function for a domain.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html#routing-policy
  - id: failover
    text: Failover routing uses a primary resource and a standby secondary for active-passive operation.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html#dns-failover-types
  - id: active-active
    text: Active-active configurations use policies other than failover and use record health to exclude unavailable resources.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html#dns-failover-types-active-active
  - id: weighted-ratio
    text: Weighted records with the same name and type receive DNS answers in proportion to their weight divided by the total weight.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-weighted.html#routing-policy-weighted
  - id: ttl-cache
    text: Recursive resolvers cache answers for the record TTL, so a cached answer can serve requests without another Route 53 query.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-values-weighted.html#rrsets-values-weighted-ttl
  - id: latency
    text: "Route 53 latency routing compares configured Regions using measurements collected over time between users and AWS data centers. An endpoint outside AWS can have substantially different latency, even when it is near an AWS Region."
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html#routing-policy-latency
  - id: geo
    text: Geolocation routing uses user location by continent, country or US state; the smallest overlapping location takes precedence.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geo.html#routing-policy-geo
  - id: geo-default
    text: A default geolocation record covers unmapped addresses and locations without a matching record; without it, those queries get no answer.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geo.html#routing-policy-geo
  - id: proximity
    text: Geoproximity routing uses user and resource locations; a positive bias expands the area served by a resource and a negative bias shrinks it.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geoproximity.html#routing-policy-geoproximity
  - id: ip-routing
    text: IP-based routing maps user IP address ranges, called CIDR blocks, to chosen endpoints through CIDR collections.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-ipbased.html#routing-policy-ipbased
  - id: multivalue
    text: Multivalue answer routing returns up to eight healthy records selected at random, or all healthy records when there are eight or fewer.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-multivalue.html#routing-policy-multivalue
  - id: unchecked
    text: A record without an associated health check is treated as healthy.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-how-route-53-chooses-records.html#health-checks-how-route-53-chooses-records
  - id: selection
    text: Route 53 chooses a record using the routing policy, checks its current health status, and tries another if it is unhealthy; probes run separately from DNS queries.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-how-route-53-chooses-records.html#health-checks-how-route-53-chooses-records
  - id: bg-weighted-endpoints
    text: "For a blue/green shift with Route 53, each environment exposes its own endpoint, such as its own load balancer, and weighted records send a percentage of traffic to green, raised step by step until green carries all traffic."
    source: https://docs.aws.amazon.com/whitepapers/latest/blue-green-deployments/update-dns-routing-with-amazon-route-53.html#update-dns-routing-with-amazon-route-53
  - id: health-checks
    text: Route 53 health checks monitor the health of web applications and other resources, and CloudWatch alarms can notify when a health check status changes.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html
  - id: simple-multi
    text: "A simple record with several values returns all of them in random order and the resolver hands them to the client; unlike multivalue answer records, the values are not health checked one by one."
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-simple.html#routing-policy-simple
  - id: geoprox-coords
    text: "Geoproximity routing locates AWS resources by Region or Local Zone group and non-AWS resources by latitude and longitude."
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geoproximity.html#routing-policy-geoproximity
cards:
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
  - id: route53-016
    q: How do Route 53 geolocation, geoproximity and IP-based routing differ?
    a: Geolocation selects by user location. Geoproximity selects by user and resource locations with an optional bias. IP-based routing uses user IP ranges that you supply.
    facts:
      - geo
      - proximity
      - ip-routing
  - id: route53-017
    q: Why should Route 53 geolocation routing include a default record?
    a: It covers unmapped IP addresses and locations without a specific record. Without a default, those queries receive no answer.
    facts:
      - geo-default
  - id: route53-028
    q: A team changes Route 53 weights and expects each application request to follow the new ratio immediately. Why can that fail?
    a: Resolvers reuse cached answers until their TTL expires. Weights control DNS answer selection; cached answers can serve many application requests.
    facts:
      - weighted-ratio
      - ttl-cache
    trap: true
  - id: route53-064
    q: "A team moves traffic gradually from an Auto Scaling group behind an ALB to a new Auto Scaling group using Route 53. How should the new environment be exposed?"
    a: "Behind its own ALB, with weighted alias records for both load balancers. Raise the green weight in steps until it takes all traffic."
    facts:
      - bg-weighted-endpoints
      - weighted-ratio
  - id: route53-065
    q: Which Amazon Route 53 feature monitors whether a web server is healthy so DNS can fail over away from it?
    a: Route 53 health checks.
    facts: [health-checks]
  - id: route53-068
    q: "A simple record lists three IP addresses and one server dies. Does Route 53 stop returning its address?"
    a: "No. A simple record returns every value in random order without checking each one; multivalue answer records with health checks return only healthy addresses."
    trap: true
    facts: [simple-multi, multivalue]
diagrams:
  - id: route53-regional-alias-tree
    title: Latency selection above regional weighted records
    width: 880
    height: 390
    nodes:
      - id: latency
        label: Latency aliases
        sub: target health enabled
        icon: route-53
        x: 20
        y: 150
        w: 210
        h: 86
        tone: network
      - id: region-a
        label: Region A records
        sub: weighted and checked
        icon: route-53
        x: 340
        y: 45
        w: 210
        h: 86
        tone: network
      - id: region-b
        label: Region B records
        sub: weighted and checked
        icon: route-53
        x: 340
        y: 260
        w: 210
        h: 86
        tone: network
      - id: app-a
        label: Endpoints A
        icon: res-ec2-instances
        x: 670
        y: 45
        w: 180
        h: 72
        tone: compute
      - id: app-b
        label: Endpoints B
        icon: res-ec2-instances
        x: 670
        y: 260
        w: 180
        h: 72
        tone: compute
    edges:
      - from: latency
        to: region-a
        step: 1
      - from: region-a
        to: app-a
        step: 2
      - from: latency
        to: region-b
        step: 3
        dashed: true
      - from: region-b
        to: app-b
        step: 4
    steps:
      - Select a regional branch using latency data.
      - Use weighted selection among healthy endpoints.
      - If Region A has no healthy leaves, try Region B.
      - Return a value from the healthy regional branch.
---
Route 53 selects DNS answers using routing policies. DNS, the Domain Name System, translates a name into record values such as IP addresses. The policy chooses the answer; health signals can change which resources are eligible.

### How it works

1. Create records for the application name and choose the policy that matches the routing requirement.
2. For weighted routing, give records the same name and type. Each record's share is its weight divided by the total weight.
3. Route 53 applies the policy and checks the selected record's current health. Endpoint probes run independently of queries.
4. A recursive resolver, the server that looks up names for a client, caches the answer for its time to live (TTL). Cached answers can serve many application requests.

| Policy | Selection rule |
|---|---|
| Simple | One resource for a domain function |
| Failover | Primary and standby |
| Weighted | Relative share of DNS answers |
| Latency | AWS Region selected using measured latency |
| Geolocation | User continent, country or US state |
| Geoproximity | Distance between user and resources, adjusted by bias |
| IP-based | User IP ranges in a CIDR collection |
| Multivalue answer | Up to eight healthy records |

Latency routing uses measurements to AWS data centers, which may differ from actual latency to endpoints outside AWS.

A bias expands or shrinks the geographic area served by a geoproximity resource. A CIDR block is a compact way to describe an IP address range.

### Exam cues

- If the question says gradually move DNS answers to a new stack, think weighted routing, because weights control relative answer shares.
- If the question says route users by country, think geolocation with a default record, because unmapped locations otherwise receive no answer.
- If the question says shift traffic gradually between two environments with DNS, think weighted records for two separate endpoints, because each environment needs its own load balancer to weight.

### Remember

- A simple record returns all its values; multivalue records can check each resource.
- The smallest matching geolocation wins.
- An unchecked record counts as healthy.

> **Trap:** Weighted DNS does not promise an exact percentage of application requests. Resolvers can serve a cached answer repeatedly.
