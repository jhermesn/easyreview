---
title: Standard and Advanced protection
level: associate
order: 10
facts:
  - id: ddos
    text: A distributed denial of service (DDoS) attack floods a target with traffic from multiple
      systems and can deny access to legitimate users.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html
  - id: standard
    text: Shield Standard automatically protects AWS customers from common network and transport layer
      DDoS attacks at no additional charge.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-standard-summary.html
  - id: layers
    text: Network and transport attacks target layers 3 and 4; application layer attacks target layer 7,
      such as web request floods.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html
  - id: enrollment
    text: Shield Advanced requires a subscription and explicit resource protection, either directly or
      through a Firewall Manager Shield Advanced policy.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary-protected-resources.html
  - id: edge-resources
    text: Shield Advanced supports CloudFront distributions, Route 53 hosted zones and Global
      Accelerator standard accelerators.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary-protected-resources.html
  - id: regional-resources
    text: Shield Advanced supports Application and Classic Load Balancers, plus Elastic IP addresses and
      the EC2 instances or Network Load Balancers associated with them.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary-protected-resources.html
  - id: waf-integration
    text: Shield Advanced uses AWS WAF web ACLs, rules and rule groups for application layer protection.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary-capabilities.html
  - id: automatic-mitigation
    text: Shield Advanced automatic application layer mitigation can count or block attack requests and
      manage custom WAF protections.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary-capabilities.html
  - id: visibility
    text: Shield Advanced exposes attack metrics and reports through its console, API and CloudWatch.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary-capabilities.html
  - id: protection-groups
    text: Protection groups combine protected resources for group-level detection and mitigation; a
      resource can belong to multiple groups.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary-capabilities.html
  - id: cost-eligibility
    text: Shield Advanced cost protection is a service credit process for eligible attack-related
      charges; resources must have been protected before the attack.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-request-service-credit.html
  - id: cost-web-prerequisite
    text: For applicable CloudFront and ALB resources, cost protection requires a WAF web ACL with a
      rate-based rule in Block mode before the attack.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-request-service-credit.html
  - id: cost-application
    text: Credit requests must be submitted within 15 days after the attack billing month; awarded
      credits apply only to Shield Advanced usage.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/ddos-request-service-credit.html
  - id: advanced-billing
    text: "Shield Advanced is subscribed per account; for accounts in an AWS Organizations organization, subscriptions are billed to the payer account, and one subscription fee covers all subscribed accounts in the consolidated billing family."
    source: https://docs.aws.amazon.com/waf/latest/developerguide/enable-ddos-prem.html
cards:
  - id: shield-001
    q: How do AWS Shield Standard and Shield Advanced differ?
    a: Standard provides automatic protection from common network and transport DDoS attacks at no extra
      charge. Advanced requires a subscription and explicit protection of supported resources.
    facts:
      - standard
      - enrollment
  - id: shield-002
    q: Which resources can AWS Shield Advanced protect?
    a: CloudFront distributions, Route 53 hosted zones, standard Global Accelerator accelerators,
      Application and Classic Load Balancers, and Elastic IPs. Protect EC2 instances and Network
      Load Balancers through their Elastic IPs.
    facts:
      - edge-resources
      - regional-resources
  - id: shield-004
    q: A company subscribes to AWS Shield Advanced but never selects its ALB. Does the subscription
      protect that ALB automatically?
    a: No. Explicitly protect the ALB, or use a Firewall Manager Shield Advanced policy.
    trap: true
    facts:
      - enrollment
  - id: shield-005
    q: A protected web application needs AWS Shield Advanced to create WAF protections during a request
      flood. Which feature fits?
    a: Automatic application layer DDoS mitigation. Configure it to count or block attack requests
      through WAF.
    facts:
      - waf-integration
      - automatic-mitigation
  - id: shield-006
    q: "What actions can AWS Shield Advanced automatic application layer mitigation take on attack requests?"
    a: "It can count or block attack requests and manage custom AWS WAF protections."
    facts: [automatic-mitigation]
  - id: shield-008
    q: What do AWS Shield Advanced protection groups do?
    a: Group protected resources for detection and mitigation across the group. A resource can belong to
      more than one protection group.
    facts:
      - protection-groups
  - id: shield-014
    q: "Where can a team examine AWS Shield Advanced attack metrics and reports?"
    a: "Use the Shield Advanced console, API or Amazon CloudWatch."
    facts: [visibility]
  - id: shield-017
    q: "An organization subscribes ten of its AWS accounts to AWS Shield Advanced. Does it pay ten subscription fees?"
    a: "No. One subscription fee covers the subscribed accounts in its consolidated billing family, billed to the payer account. Each account still subscribes."
    trap: true
    facts: [advanced-billing]
diagrams: []
revised:
  - date: 2026-11-23
    note: The card now tests the actions available to automatic application layer mitigation.
    cards: [shield-006]
  - date: 2026-11-23
    note: The card now tests where Shield Advanced attack metrics and reports appear.
    cards: [shield-014]
---
AWS Shield helps keep applications available during a distributed denial of service (DDoS) attack, where many systems flood a target with traffic. Standard protection is automatic. Advanced adds explicitly configured protection for supported resources.

### How it works

1. Shield Standard protects against common network and transport attacks. These target network capacity or connections at layers 3 and 4. Web request floods target the application at layer 7.
2. Subscribe to Advanced and select resources to protect, or apply a Firewall Manager policy. A subscription alone does not enroll resources.
3. For application protection, use a WAF web access control list (web ACL), which is a collection of request filtering rules. Automatic application layer mitigation can count or block attack requests.
4. Use Advanced reports and CloudWatch metrics to examine events. Protection groups let Shield consider several protected resources together.

| Resource | Advanced protection target |
|---|---|
| CloudFront, Route 53, Global Accelerator | Distribution, hosted zone, standard accelerator |
| Application or Classic Load Balancer | Load balancer |
| EC2 instance or Network Load Balancer | Associated Elastic IP, a public IP address allocated to your account |

### Exam cues

- If the question says automatic WAF changes during a web request flood, think Advanced automatic application layer mitigation, because it manages attack-specific WAF protections.
- If the question says DDoS-related scaling charges, think Advanced cost protection eligibility, because credits depend on protection and required controls being in place before the attack.

### Remember

- Layers 3 and 4 cover network and transport attacks; layer 7 covers application requests.
- Advanced protects selected resources, including EC2 and NLB resources through Elastic IPs.
- For applicable ALB and CloudFront cost protection, configure a WAF rate-based rule in Block mode before an attack.
- Submit eligible credit requests within 15 days after the attack billing month. Credits apply only to Shield Advanced usage.
- Shield Advanced: each account subscribes; one fee covers a consolidated billing family, billed to the payer account.

> **Trap:** Subscribing during an attack does not make previously unprotected resources eligible for cost protection.
