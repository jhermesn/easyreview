---
title: "Route 53 basics"
level: foundational
order: 5
facts:
  - id: dns
    text: "Amazon Route 53 is a highly available and scalable DNS web service for domain registration, DNS routing and health checking."
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html#Welcome
cards:
  - id: route53-074
    q: "A company needs to register a domain and route its traffic to resources on AWS. Which service fits?"
    a: "Amazon Route 53."
    facts: [dns]
---
Amazon Route 53 is AWS's DNS service: it registers domains, answers DNS queries and checks endpoint health. [What is Amazon Route 53?](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html#Welcome)

### How it works

1. Register a domain or use an existing one.
2. Create DNS records pointing to resources.
3. Health checks steer traffic away from failed endpoints.

### Exam cues

- If the question says DNS or domain registration, think Route 53.

### Remember

- Domain registration, DNS routing, health checks.

> **Trap:** Route 53 answers DNS queries; it does not carry the application traffic.
