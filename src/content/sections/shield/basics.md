---
title: "Shield basics"
level: foundational
order: 5
facts:
  - id: standard
    text: "AWS gives automatic protection against common DDoS attacks such as UDP reflection and SYN floods at no extra cost."
    source: https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html#shield-chapter
  - id: advanced
    text: "AWS Shield Advanced is a paid managed service that adds DDoS protection for internet-facing applications."
    source: https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html#shield-chapter
  - id: edge-services
    text: Serving traffic through Amazon CloudFront and Amazon Route 53, which run in edge locations, is an AWS best practice for DDoS resilience because attacks are absorbed at the edge.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/aws-best-practices-ddos-resiliency.html
cards:
  - id: shield-015
    q: "Does an application on AWS get DDoS protection without paying for anything extra?"
    a: "Yes. Common DDoS attacks are covered automatically at no extra cost; Shield Advanced adds more for a fee."
    facts: [standard, advanced]
  - id: shield-016
    q: "Which AWS service protects against DDoS attacks?"
    a: "AWS Shield: the standard protection is automatic, and Shield Advanced is the paid tier."
    facts: [standard, advanced]
  - id: shield-007
    q: "A company wants to improve DDoS resilience by absorbing attack traffic at AWS edge locations. Which services should it use?"
    a: "Amazon CloudFront and Amazon Route 53. Serving traffic through these edge services helps absorb attacks at the edge."
    facts:
      - edge-services
---
AWS Shield protects applications from distributed denial of service (DDoS) attacks.

### How it works

1. Every AWS customer gets automatic protection against common network attacks.
2. Shield Advanced adds managed protection for chosen resources, for a fee.

### Exam cues

- If the question says DDoS, think AWS Shield; extra protection and support means Shield Advanced.

### Remember

- Standard protection: automatic, no extra cost.
- Shield Advanced: paid.

> **Trap:** Shield stops DDoS floods; AWS WAF filters web requests such as SQL injection.
