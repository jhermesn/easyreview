---
title: "ACM basics"
level: foundational
order: 5
facts:
  - id: certificates
    text: "AWS Certificate Manager creates, stores and renews public and private SSL/TLS certificates that protect websites and applications on AWS."
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html#acm-overview
  - id: integrated
    text: "ACM certificates are deployed to integrated AWS services such as Elastic Load Balancing and CloudFront."
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html#acm-overview
cards:
  - id: acm-023
    q: "A website behind an Application Load Balancer needs an HTTPS certificate that renews itself. Which AWS service provides it?"
    a: "AWS Certificate Manager (ACM), which issues and renews the certificate for the load balancer."
    facts: [certificates, integrated]
  - id: acm-024
    q: "Which AWS service handles SSL/TLS certificates so a team does not track expiry dates by hand?"
    a: "AWS Certificate Manager, which renews ACM-issued certificates."
    facts: [certificates]
---
AWS Certificate Manager (ACM) provides SSL/TLS certificates for HTTPS and renews them, so encrypted connections keep working. [What is AWS Certificate Manager?](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html#acm-overview)

### How it works

1. Request a public or private certificate in ACM.
2. Attach it to an integrated service such as a load balancer or CloudFront.
3. ACM renews the certificates it issues.

### Exam cues

- If the question says HTTPS certificate for a load balancer or CloudFront, think ACM.

### Remember

- Issues, stores and renews SSL/TLS certificates.

> **Trap:** ACM encrypts data in transit with certificates; encrypting stored data uses AWS KMS.
