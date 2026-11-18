---
title: "PLACEHOLDER acm/operations-in-depth"
level: professional
order: 30
facts:
  - id: http-tenants
    text: HTTP validation is available through CloudFront Distribution Tenants.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-certificate-characteristics.html
  - id: http-no-wildcard
    text: HTTP validation does not support wildcard certificates.
    source: https://docs.aws.amazon.com/acm/latest/userguide/http-validation.html
  - id: dns
    text: DNS validation proves domain control using ACM-provided CNAME records added to the public DNS
      database.
    source: https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html
  - id: switch-validation
    text: Since August 13, 2026, an existing ACM-issued public certificate can switch from email to DNS
      through UpdateCertificateOptions without changing its ARN.
    source: https://aws.amazon.com/about-aws/whats-new/2026/08/AWS-Certificate-Manager-Email-DNS-Switch/
  - id: switch-window
    text: Email-to-DNS migration provides 72 hours to add ACM CNAME records.
    source: https://aws.amazon.com/about-aws/whats-new/2026/08/AWS-Certificate-Manager-Email-DNS-Switch/
  - id: current-validity
    text: From February 18, 2026, newly issued and renewed ACM public certificates have a maximum
      validity of 198 days.
    source: https://aws.amazon.com/about-aws/whats-new/2026/02/aws-certificate-manager-updates-default/
  - id: old-export
    text: ACM public certificates created before June 17, 2025 cannot be exported.
    source: https://docs.aws.amazon.com/acm/latest/userguide/export-public-certificate.html
  - id: export-option
    text: Set CertificateOptions.Export to ENABLED to permit export; the export option cannot change
      after certificate creation.
    source: https://docs.aws.amazon.com/acm/latest/APIReference/API_CertificateOptions.html
  - id: export-material
    text: A public certificate export includes the certificate, chain, and passphrase-encrypted private
      key.
    source: https://docs.aws.amazon.com/acm/latest/userguide/export-public-certificate.html
  - id: private-export
    text: ACM private certificate export includes the certificate, certificate chain, and encrypted
      private key for private PKI use.
    source: https://docs.aws.amazon.com/acm/latest/userguide/export-private.html
  - id: public-window
    text: Public certificates with 198-day validity renew 45 days before expiration; older 395-day
      certificates renew 60 days before expiration and receive 198-day replacements.
    source: https://docs.aws.amazon.com/acm/latest/userguide/dns-renewal-validation.html
  - id: private-window
    text: ACM attempts eligible private certificate renewal 60 days before expiration.
    source: https://docs.aws.amazon.com/acm/latest/userguide/renew-private-cert.html
  - id: email-end-new
    text: AWS announced in August 2026 that new email-validated certificate issuance stops on March 31,
      2027.
    source: https://aws.amazon.com/about-aws/whats-new/2026/08/AWS-Certificate-Manager-Email-DNS-Switch/
  - id: email-end-renew
    text: AWS announced in August 2026 that renewal of email-validated certificates stops on September
      30, 2027.
    source: https://aws.amazon.com/about-aws/whats-new/2026/08/AWS-Certificate-Manager-Email-DNS-Switch/
  - id: acme
    text: ACME clients generate and hold their private key and manage public certificate renewal.
    source: https://docs.aws.amazon.com/acm/latest/userguide/service-options.html
  - id: acme-integration
    text: ACME-issued certificates cannot be bound to AWS integrated services.
    source: https://docs.aws.amazon.com/acm/latest/userguide/service-options.html
  - id: acme-renewal
    text: ACME-issued certificates do not use ACM managed renewal.
    source: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
cards:
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
  - id: acm-014
    q: A team wants to export an ACM public certificate created before June 17, 2025. Can it export the
      existing certificate?
    a: "No. Public certificates created before that date cannot be exported. Request an exportable
      replacement with `Export: ENABLED`; that option cannot change after creation."
    facts:
      - old-export
      - export-option
    trap: true
  - id: acm-015
    q: What does an ACM public certificate export contain, and how is its private key protected?
    a: The certificate, certificate chain, and private key encrypted with a supplied passphrase. ACM
      private certificate exports also contain an encrypted private key.
    facts:
      - export-material
      - private-export
  - id: acm-016
    q: How do ACM renewal windows differ for current public certificates, older public certificates, and
      eligible private certificates?
    a: Public certificates with `198-day` validity renew `45 days` before expiry. Older `395-day` public
      certificates renew `60 days` before expiry into `198-day` replacements. Eligible private
      certificates begin renewal attempts `60 days` before expiry.
    facts:
      - public-window
      - private-window
  - id: acm-018
    q: A team still uses email validation for ACM public certificates. Which announced 2027 deadlines
      affect issuance and renewal?
    a: New email-validated issuance stops March 31, 2027; renewal of email-validated certificates stops
      September 30, 2027. Migrate existing certificates to DNS before renewal support ends.
    facts:
      - email-end-new
      - email-end-renew
  - id: acm-019
    q: A team uses ACM with an ACME client on its own infrastructure. Who holds the private key and
      renews the certificate, and can it attach that certificate to an ALB?
    a: The ACME client holds the private key and manages renewal. ACME-issued certificates cannot bind
      to AWS integrated services such as an ALB.
    facts:
      - acme
      - acme-integration
      - acme-renewal
    trap: true
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
