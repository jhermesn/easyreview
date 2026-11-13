---
title: Alias records and target health
level: associate
order: 40
facts:
  - id: alias
    text: An alias returns values for a supported AWS target or another record of the same type in the same hosted zone.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html#resource-record-sets-choosing-alias-non-alias
  - id: apex
    text: An alias can exist at the zone apex, the hosted-zone name itself; a CNAME cannot.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html#resource-record-sets-choosing-alias-non-alias
  - id: alias-ttl
    text: An alias to an AWS resource uses that resource TTL; an alias to another record uses that record TTL.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html#resource-record-sets-choosing-alias-non-alias
  - id: alias-price
    text: Route 53 does not charge for alias DNS queries to AWS resources.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html#resource-record-sets-choosing-alias-non-alias
  - id: inherit
    text: EvaluateTargetHealth makes an alias inherit the health of its referenced target.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_AliasTarget.html#Route53-Type-AliasTarget-EvaluateTargetHealth
  - id: lb-health
    text: For an ALB or NLB to be healthy, every associated target group containing targets needs at least one healthy target.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_AliasTarget.html#Route53-Type-AliasTarget-EvaluateTargetHealth
  - id: empty-group
    text: An associated target group without registered targets is considered unhealthy.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_AliasTarget.html#Route53-Type-AliasTarget-EvaluateTargetHealth
  - id: no-lb-probes
    text: Use load-balancer health with Evaluate Target Health rather than separate Route 53 probes of the registered instances.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_AliasTarget.html#Route53-Type-AliasTarget-EvaluateTargetHealth
  - id: cloudfront-health
    text: An alias to CloudFront cannot set EvaluateTargetHealth to true.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_AliasTarget.html#Route53-Type-AliasTarget-EvaluateTargetHealth
  - id: cloudfront-private
    text: CloudFront alias records are unsupported in a private hosted zone.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_AliasTarget.html#Route53-Type-AliasTarget-DNSName
  - id: service-health
    text: For S3, API Gateway and interface endpoints, target health offers no operational benefit for application failover; AWS recommends Route 53 checks of application access.
    source: https://docs.aws.amazon.com/Route53/latest/APIReference/API_AliasTarget.html#Route53-Type-AliasTarget-EvaluateTargetHealth
  - id: both-health
    text: If an alias has its own health check and Evaluate Target Health, both health conditions must pass.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-complex-configs.html#dns-failover-complex-configs-hc-alias
  - id: accelerator-alias
    text: A Route 53 alias can route an application hostname to a Global Accelerator.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-global-accelerator.html#routing-to-global-accelerator
  - id: accelerator-network
    text: A standard Global Accelerator routes through fixed entry-point IP addresses to healthy regional endpoints using location, health and routing settings.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html
  - id: accelerator-tcp
    text: Global Accelerator terminates client TCP connections at an AWS edge location and establishes TCP connections to application endpoints.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html#how-it-works-summary
cards:
  - id: route53-012
    q: What does Evaluate Target Health use for a Route 53 alias to an ALB or NLB?
    a: Load-balancer target-group health. Each target group needs a healthy target; an empty group is unhealthy. Separate Route 53 probes of registered instances are unnecessary.
    facts:
      - inherit
      - lb-health
      - empty-group
      - no-lb-probes
  - id: route53-013
    q: A root domain must point to an ALB through Route 53. Which record should be used?
    a: An alias A record, or AAAA for an IPv6 answer. A CNAME cannot exist at the zone apex. The alias inherits its AWS target TTL, and AWS-resource alias queries have no Route 53 query charge.
    facts:
      - alias
      - apex
      - alias-ttl
      - alias-price
    trap: true
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
  - id: route53-040
    q: A team needs a custom hostname and fixed network entry IPs for healthy application endpoints across Regions. What AWS combination fits?
    a: A Route 53 alias to a standard Global Accelerator. The accelerator routes traffic through its fixed IP entry points to healthy regional endpoints.
    facts:
      - accelerator-alias
      - accelerator-network
  - id: route53-041
    q: A team needs application-aware DNS failover for API Gateway. Is Evaluate Target Health sufficient?
    a: Use a Route 53 health check that monitors application access. AWS says inherited target health for API Gateway provides no operational benefit for this purpose.
    facts:
      - service-health
    trap: true
---
A Route 53 alias points a DNS name at a supported AWS resource or a same-type record in the same hosted zone. It lets a root domain use a changing AWS endpoint without storing that endpoint's IP addresses yourself.

### How it works

1. Choose the supported target and an appropriate record type, such as A for an IPv4 answer or AAAA for an IPv6 answer. The zone apex is the hosted-zone name itself.
2. Route 53 answers with the target's values. It uses the AWS resource TTL, or the target record TTL for an alias to another record.
3. Enable Evaluate Target Health when inherited target health fits the requirement. For an Application Load Balancer (ALB) or Network Load Balancer (NLB), it uses target groups, the collections of destinations behind the load balancer.
4. Every associated target group must have a healthy target. An empty group counts as unhealthy.
5. If you also attach a separate check to the alias, both health conditions must pass.

| Target | Health consideration |
|---|---|
| ALB or NLB | Inherit target-group health; separate instance probes are unnecessary |
| CloudFront | Evaluate Target Health cannot be enabled; private-zone aliases are unsupported |
| S3, API Gateway or interface endpoint | Use an application-access check for application-aware failover |

For fixed network entry addresses across Regions, a Route 53 alias can point to a standard Global Accelerator. The accelerator selects healthy regional endpoints using its routing settings. It terminates client TCP connections at AWS edge locations and opens connections to the endpoints. TCP is a protocol for reliable network connections.

### Exam cues

- If the question says the root domain must point to an ALB, think an alias, because a CNAME cannot exist at the zone apex.
- If the question says an ALB alias is unhealthy despite some working targets, think every associated target group, because an empty or entirely unhealthy group can fail target health.
- If the question says fixed entry IPs and healthy endpoints across Regions, think an alias to Global Accelerator, because the accelerator handles network routing behind those addresses.

### Remember

- AWS-resource alias queries have no Route 53 query charge.
- You cannot set a custom TTL for an alias to an AWS resource.
- CloudFront cannot use Evaluate Target Health or a private-zone alias.

> **Trap:** Evaluate Target Health is not a universal application check for every AWS alias target. For API Gateway, S3 and interface endpoints, AWS recommends checking application access for failover.
