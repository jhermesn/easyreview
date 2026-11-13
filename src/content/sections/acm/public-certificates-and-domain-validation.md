---
title: Public certificates and domain validation
level: associate
order: 10
facts:
  - id: certificate
    text: A certificate binds an identity to a public key.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-concepts.html#concept-asymmetric
  - id: tls
    text: TLS protects client-server communication using authentication and encryption.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-concepts.html#concept-tls
  - id: ca
    text: A certificate authority issues signed certificates binding identities to public keys.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-concepts.html#concept-ca
  - id: public-trust
    text: ACM public certificates are trusted by major browsers and operating systems.
    source: https://docs.aws.amazon.com/acm/latest/userguide/certificate-types.html
  - id: private-trust
    text: Private certificates are not publicly trusted.
    source: https://docs.aws.amazon.com/acm/latest/userguide/certificate-types.html
  - id: private-issuance
    text: ACM can issue private certificates through AWS Private CA integration.
    source: https://docs.aws.amazon.com/acm/latest/userguide/service-options.html
  - id: client-trust
    text: Private certificate trust is established by installing the appropriate root CA certificate in
      client trust stores.
    source: https://docs.aws.amazon.com/acm/latest/userguide/renew-private-cert.html
  - id: imported
    text: Imported certificates are customer certificates obtained outside ACM.
    source: https://docs.aws.amazon.com/acm/latest/userguide/import-certificate.html
  - id: validation
    text: ACM must establish control of every domain in a public certificate request.
    source: https://docs.aws.amazon.com/acm/latest/userguide/domain-ownership-validation.html
  - id: no-private-validation
    text: ACM domain ownership validation does not apply to imported certificates or private CA
      certificates.
    source: https://docs.aws.amazon.com/acm/latest/userguide/domain-ownership-validation.html
  - id: public-dns
    text: ACM cannot use private hosted zones or private domains for public certificate domain
      validation.
    source: https://docs.aws.amazon.com/acm/latest/userguide/domain-ownership-validation.html
  - id: dns
    text: DNS validation proves domain control using ACM-provided CNAME records added to the public DNS
      database.
    source: https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html
  - id: dns-reuse
    text: An existing DNS validation token can support certificate requests for the same domain across
      AWS Regions.
    source: https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html
  - id: wildcard-token
    text: A wildcard domain and its base domain receive the same DNS validation record.
    source: https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html
  - id: email
    text: Email validation requires the domain owner to approve a validation email.
    source: https://docs.aws.amazon.com/acm/latest/userguide/email-validation.html
  - id: http
    text: HTTP validation uses a redirect from a domain URL to an ACM-controlled token location for
      CloudFront.
    source: https://docs.aws.amazon.com/acm/latest/userguide/http-validation.html
  - id: http-tenants
    text: HTTP validation is available through CloudFront Distribution Tenants.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-certificate-characteristics.html
  - id: http-no-wildcard
    text: HTTP validation does not support wildcard certificates.
    source: https://docs.aws.amazon.com/acm/latest/userguide/http-validation.html
  - id: wildcard
    text: A wildcard in the leftmost domain label covers one subdomain level, not the base domain or
      deeper subdomains.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-certificate-characteristics.html#wildcard
  - id: alb
    text: ACM integrates with Elastic Load Balancing to deploy a certificate to a load balancer.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-services.html
  - id: regional-elb
    text: An ELB certificate must be in the same Region as its load balancer.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/network.html
  - id: cloudfront
    text: CloudFront requires an ACM certificate requested or imported in US East (N. Virginia),
      us-east-1.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-services.html
  - id: api-edge
    text: An edge-optimized API Gateway custom domain requires a certificate in us-east-1.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-edge-optimized-custom-domain-name.html
  - id: api-regional
    text: A Regional API Gateway custom domain requires an ACM certificate in the API Region.
    source: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-regional-api-custom-domain-create.html
  - id: current-validity
    text: From February 18, 2026, newly issued and renewed ACM public certificates have a maximum
      validity of 198 days.
    source: https://aws.amazon.com/about-aws/whats-new/2026/02/aws-certificate-manager-updates-default/
  - id: switch-validation
    text: Since August 13, 2026, an existing ACM-issued public certificate can switch from email to DNS
      through UpdateCertificateOptions without changing its ARN.
    source: https://aws.amazon.com/about-aws/whats-new/2026/08/AWS-Certificate-Manager-Email-DNS-Switch/
  - id: switch-window
    text: Email-to-DNS migration provides 72 hours to add ACM CNAME records.
    source: https://aws.amazon.com/about-aws/whats-new/2026/08/AWS-Certificate-Manager-Email-DNS-Switch/
  - id: regional-resource
    text: ACM certificates are Regional resources.
    source: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
  - id: retain-records
    text: DNS-validated ACM certificates in use can renew automatically while the validation CNAME
      records remain in place.
    source: https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html
  - id: email-phaseout
    text: AWS announced in August 2026 that email validation will be phased out during 2027.
    source: https://aws.amazon.com/about-aws/whats-new/2026/08/AWS-Certificate-Manager-Email-DNS-Switch/
diagrams:
  - id: acm-dns-issuance
    title: DNS validation and ALB attachment with Route 53
    width: 880
    height: 250
    nodes:
      - id: request
        label: Request
        x: 20
        y: 75
        w: 170
        h: 86
        icon: certificate-manager
        tone: security
        sub: Choose DNS validation
      - id: dns
        label: Publish CNAME
        x: 240
        y: 75
        w: 170
        h: 86
        icon: route-53
        tone: network
        sub: Public DNS example
      - id: issue
        label: Issue certificate
        x: 460
        y: 75
        w: 170
        h: 72
        icon: certificate-manager
        tone: security
      - id: alb
        label: ALB
        x: 680
        y: 75
        w: 170
        h: 72
        icon: res-elastic-load-balancing-application-load-balancer
        tone: network
    edges:
      - from: request
        to: dns
        step: 1
      - from: dns
        to: issue
        step: 2
      - from: issue
        to: alb
        step: 3
    steps:
      - Publish the ACM-provided CNAME in the public DNS zone.
      - ACM establishes domain control before issuing the certificate.
      - Attach the certificate to an ALB in the same Region.
cards:
  - id: acm-001
    q: A team needs TLS for a public ALB and private certificates trusted only within its organization.
      Which ACM certificate types fit?
    a: Use an ACM public certificate on the ALB and ACM with AWS Private CA for private certificates.
      Private clients must trust the issuing root CA. Public certificate requests require proof of
      domain control.
    facts:
      - public-trust
      - private-trust
      - private-issuance
      - client-trust
      - alb
      - validation
    trap: true
  - id: acm-003
    q: A team wants an ACM public certificate to renew without recurring email approval. Which
      validation method should it choose?
    a: Choose DNS validation and retain the public CNAME records. DNS validation proves control through
      those records; email validation requires owner approval.
    facts:
      - dns
      - email
      - retain-records
  - id: acm-004
    q: A team requests ACM certificates for example.com and *.example.com. Does the wildcard alone also
      cover example.com or a.b.example.com?
    a: No. A wildcard covers one subdomain level only. Include the base name separately; the wildcard
      and base name share the ACM DNS validation record.
    facts:
      - wildcard
      - wildcard-token
    trap: true
  - id: acm-005
    q: A team must attach ACM certificates to an ALB in eu-west-1 and a CloudFront distribution. Where
      should the certificates be requested?
    a: In `eu-west-1` for the ALB and `us-east-1` for CloudFront. ELB uses a certificate from its own
      Region; CloudFront requires US East (N. Virginia).
    facts:
      - regional-elb
      - cloudfront
  - id: acm-006
    q: A team hosts an API Gateway Regional custom domain in eu-west-1 but selected an ACM certificate
      in us-east-1. What should it change?
    a: Use an ACM certificate in the API Region, `eu-west-1`. The `us-east-1` requirement applies to
      edge-optimized custom domains.
    facts:
      - api-regional
      - api-edge
    trap: true
  - id: acm-007
    q: Can an ACM public certificate use a private Route 53 hosted zone to prove domain control?
    a: No. ACM public certificate validation cannot use a private hosted zone or private domain. Publish
      the DNS validation CNAME in public DNS.
    facts:
      - public-dns
      - dns
    trap: true
  - id: acm-008
    q: A CloudFront distribution tenant needs an ACM wildcard certificate. Can HTTP validation issue it?
    a: No. HTTP validation is available through CloudFront Distribution Tenants but does not support
      wildcards. Use DNS validation for a wildcard certificate.
    facts:
      - http-tenants
      - http-no-wildcard
      - dns
    trap: true
  - id: acm-009
    q: An existing email-validated ACM certificate must move to DNS validation while preserving ALB
      references to its ARN. What operation fits?
    a: Use `UpdateCertificateOptions` to switch to DNS validation, then add the CNAME records within `72
      hours`. AWS introduced this in August 2026 without changing the ARN.
    facts:
      - switch-validation
      - switch-window
  - id: acm-010
    q: What validity period applies to newly issued or renewed ACM public certificates from February
      2026?
    a: A maximum of `198 days`, effective February 18, 2026.
    facts:
      - current-validity
---
ACM issues and manages certificates for TLS, the protocol that authenticates servers and encrypts client-server traffic. A certificate binds an identity to a public key. A certificate authority (CA) signs that binding so clients can decide whether to trust it.

### How it works

1. Choose the certificate type. Public certificates suit public endpoints; private certificates rely on a root CA trusted by your clients. A trust store is the client's collection of trusted CA certificates.
2. For an ACM-issued public certificate, prove control of every requested domain. With DNS, the directory of domain records, publish the CNAME record supplied by ACM. A CNAME points one DNS name to another. The record must be in public DNS, not a private hosted zone.
3. Wait for issuance, then attach the certificate to the integrated endpoint. Request it in the Region required by that endpoint.
4. Keep validation records in place for later renewal. The DNS token can support requests for the same domain across Regions, but each certificate remains a separate Regional resource.

| Certificate type | Trust | Use |
|---|---|---|
| Public | Major browsers and operating systems trust it. | Public endpoints such as an ALB. |
| Private | Clients must trust your root CA. | Internal services using ACM with AWS Private CA. |
| Imported | Supplied from outside ACM. | An existing certificate for an integrated service. |

| Validation method | Required proof | Scope |
|---|---|---|
| DNS | Publish the ACM CNAME. | Public domains, including wildcard requests. |
| Email | Approve the validation email. | Legacy workflows being phased out during 2027. |
| HTTP | Redirect a domain URL to the ACM token location. | CloudFront Distribution Tenants; no wildcards. |

| Endpoint | Certificate Region |
|---|---|
| ALB | Same Region as the load balancer. |
| CloudFront | `us-east-1`. |
| API Gateway Regional custom domain | Same Region as the API. |
| API Gateway edge-optimized custom domain | `us-east-1`. |

### Exam cues

- If the question says public browsers and internal clients need different trust, think public ACM certificates and private CA certificates, because private trust must be installed in client trust stores.
- If the question says renew without repeated email approval, think DNS validation, because public CNAME records provide reusable domain-control proof.
- If the question says a certificate is unavailable to an endpoint, think its Region, because ALB and Regional APIs need local certificates while CloudFront and edge-optimized API domains use `us-east-1`.
- If the question says preserve an email-validated certificate ARN, its AWS resource identifier, during migration, think `UpdateCertificateOptions`, because the August 2026 change permits an email-to-DNS switch in place.

### Remember

- From February 2026, new and renewed ACM public certificates have a maximum validity of 198 days.
- `*.example.com` covers one subdomain level. It does not cover `example.com` or `a.b.example.com`.
- The wildcard and base name share a DNS validation record; the token works across Regions.
- Since August 2026, email-to-DNS migration preserves the ARN. Add the supplied CNAME records within 72 hours.
- Public certificate domain validation does not apply to imported or private CA certificates.

> **Trap:** Sharing a DNS validation record does not extend a wildcard's name coverage. Request the base domain separately when it also needs coverage.

> **Trap:** A private certificate is not publicly trusted merely because ACM manages it. Clients must trust the private root CA.
