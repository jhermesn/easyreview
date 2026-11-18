---
title: Renewal, imports, and exports
level: associate
order: 20
facts:
  - id: renewal
    text: ACM provides managed renewal for eligible public and private certificates that it issues.
    source: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
  - id: associated
    text: An ACM-issued certificate associated with an integrated AWS service is eligible for managed
      renewal.
    source: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
  - id: exported
    text: An ACM-issued certificate exported since issuance or its last renewal is eligible for managed
      renewal.
    source: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
  - id: private-eligible
    text: Private certificates requested through ACM require export or service association for managed
      renewal eligibility.
    source: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
  - id: ineligible-import
    text: Imported certificates are not eligible for ACM managed renewal.
    source: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
  - id: ineligible-direct
    text: Private certificates issued directly with AWS Private CA IssueCertificate are not eligible for
      ACM managed renewal.
    source: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
  - id: ineligible-expired
    text: Expired certificates are not eligible for managed renewal.
    source: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
  - id: regional-renewal
    text: ACM certificates are Regional resources and each Region copy renews independently.
    source: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
  - id: renewal-arn
    text: An ACM certificate retains its ARN after managed renewal.
    source: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html
  - id: dns-conditions
    text: DNS renewal for a certificate used by an AWS service requires all required validation CNAME
      records to remain accessible in public DNS.
    source: https://docs.aws.amazon.com/acm/latest/userguide/dns-renewal-validation.html
  - id: email-action
    text: Email-validated renewal requires domain owner action on the renewal email.
    source: https://docs.aws.amazon.com/acm/latest/userguide/email-validation.html
  - id: reimport
    text: Reimporting a renewed certificate preserves the existing ARN and AWS service associations.
    source: https://docs.aws.amazon.com/acm/latest/userguide/import-certificate.html
  - id: import-format
    text: Certificate import requires PEM-encoded certificate materials and an unencrypted private key.
    source: https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-format.html
  - id: valid-import
    text: A certificate must be within its validity period when imported.
    source: https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-prerequisites.html
  - id: public-export
    text: Exportable ACM public certificates can be deployed on EC2, containers, or on-premises hosts.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-exportable-certificates.html
  - id: export-deployment
    text: Customers must manage deployment of exported public certificates, including renewed
      certificates.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-exportable-certificates.html
  - id: private-deployment
    text: Renewed private certificates update integrated services automatically; outside them customers
      must export and install replacements.
    source: https://docs.aws.amazon.com/acm/latest/userguide/renew-private-cert.html
  - id: available-event
    text: ACM Certificate Available events notify when a certificate becomes available after issuance,
      renewal, or import.
    source: https://docs.aws.amazon.com/acm/latest/userguide/supported-events.html#available-event
  - id: expiration-event
    text: ACM Certificate Approaching Expiration events cover active public, private, and imported
      certificates.
    source: https://docs.aws.amazon.com/acm/latest/userguide/supported-events.html#expiration-approaching-event
  - id: certificate-chain
    text: A certificate chain lists issuing certificates in order so each certifies the certificate
      before it.
    source: https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-format.html
  - id: direct-lifecycle
    text: Direct Private CA issuance requires the customer to issue replacements and install
      certificates.
    source: https://docs.aws.amazon.com/acm/latest/userguide/service-options.html
  - id: export-automation
    text: The AWS private certificate renewal example uses EventBridge and Lambda to export a renewed
      certificate, followed by installation on its target.
    source: https://docs.aws.amazon.com/acm/latest/userguide/renew-private-cert.html#automating-export
  - id: expiration-event-timing
    text: "By default ACM sends the Approaching Expiration event daily, starting 45 days before expiry for imported and private certificates and 30 days before for public ones."
    source: https://docs.aws.amazon.com/acm/latest/userguide/supported-events.html#expiration-approaching-event
diagrams:
  - id: acm-private-export-renewal
    title: Renewed private certificate export and installation
    width: 880
    height: 250
    nodes:
      - id: acm
        label: ACM renewal
        x: 20
        y: 75
        w: 170
        h: 72
        icon: certificate-manager
        tone: security
      - id: events
        label: EventBridge
        x: 240
        y: 75
        w: 170
        h: 72
        icon: eventbridge
        tone: integration
      - id: export
        label: Export automation
        x: 460
        y: 75
        w: 170
        h: 72
        icon: lambda
        tone: compute
      - id: host
        label: Target host
        x: 680
        y: 75
        w: 170
        h: 72
        icon: res-client
        tone: neutral
    edges:
      - from: acm
        to: events
        step: 1
      - from: events
        to: export
        step: 2
      - from: export
        to: host
        step: 3
    steps:
      - The renewal workflow emits an event.
      - The private renewal example invokes Lambda to export the replacement.
      - Install the renewed certificate and key on the target; export alone does not install it.
cards:
  - id: acm-002
    q: An ACM certificate on an ALB did not renew. Which validation and issuance conditions should the
      team inspect?
    a: Check whether all DNS CNAME records remain publicly accessible or whether email renewal still
      needs approval. Imported certificates and private certificates issued directly by Private CA
      `IssueCertificate` do not use ACM managed renewal.
    facts:
      - dns-conditions
      - email-action
      - ineligible-import
      - ineligible-direct
    trap: true
  - id: acm-011
    q: A third-party certificate imported into ACM is expiring on an ALB. How should the team replace it
      without changing its ARN or service associations?
    a: Renew it with its issuer and reimport into the existing ACM certificate ARN. ACM does not renew
      imported certificates. Import PEM materials and an unencrypted private key.
    facts:
      - ineligible-import
      - reimport
      - import-format
  - id: acm-012
    q: A team calls AWS Private CA IssueCertificate directly and expects ACM to renew the result. What
      should it change for ACM managed renewal?
    a: Request the private certificate through ACM and associate it with an integrated service or export
      it. Direct `IssueCertificate` certificates are not eligible for ACM managed renewal.
    facts:
      - ineligible-direct
      - private-eligible
    trap: true
  - id: acm-013
    q: A team exported an ACM public certificate to an on-premises server. ACM renewed it, but the
      server still serves the old certificate. What is missing?
    a: Export and deploy the renewed certificate on the server. ACM manages renewal, but the customer
      manages deployment of exported public certificates.
    facts:
      - public-export
      - export-deployment
  - id: acm-017
    q: What happens to an ACM certificate ARN after managed renewal, and how are copies in multiple
      Regions handled?
    a: The ARN stays the same. Each Regional certificate renews independently.
    facts:
      - renewal-arn
      - regional-renewal
  - id: acm-020
    q: A team needs an EventBridge signal when an ACM certificate is renewed and ready for deployment.
      Which event should it match?
    a: "`ACM Certificate Available`. ACM also sends `ACM Certificate Approaching Expiration` for active
      public, private, and imported certificates."
    facts:
      - available-event
      - expiration-event
  - id: acm-022
    q: "Admins must get an email well before any ACM certificate on their load balancers expires, with the least custom code. What should they build?"
    a: "An EventBridge rule matching ACM Certificate Approaching Expiration events, which ACM sends daily from 30 or 45 days before expiry, with an SNS topic as the target."
    facts: [expiration-event, expiration-event-timing]
---
ACM managed renewal replaces eligible certificates before expiration. Renewal and installation are separate steps: integrated services can receive replacements automatically, while exported certificates need deployment to their target hosts.

### How it works

1. Check renewal eligibility. An ACM-issued certificate qualifies when associated with an integrated service or exported since issuance or its last renewal. Private certificates must be requested through ACM for this lifecycle.
2. Preserve domain-control proof for public renewal. For a certificate used by an AWS service, the required DNS CNAME records must remain publicly accessible. Email renewal requires owner approval while that method remains supported.
3. Let ACM renew eligible certificates. The ARN, the AWS resource identifier, stays the same; copies in different Regions renew independently.
4. Replace an imported certificate by renewing it with its issuer and reimporting it into the existing ARN. Supply PEM, a text encoding for certificate material, and an unencrypted private key. The certificate must be within its validity period.
5. For an exported certificate, export the renewed certificate and install it on the host. An export includes the certificate, its chain of issuing CA certificates, and an encrypted private key protected by a passphrase. `ACM Certificate Available` can signal that a replacement is ready.

| Certificate path | Renewal owner | Deployment |
|---|---|---|
| Eligible ACM-issued certificate | ACM. | Integrated services receive replacements automatically. |
| Exported ACM-issued certificate | ACM, while eligible. | Customer exports and installs the replacement. |
| Imported certificate | Customer and original issuer. | Reimport to preserve ARN and service associations. |
| Direct Private CA `IssueCertificate` | Customer. | Customer installs the certificate. |

### Exam cues

- If the question says an imported certificate is expiring, think renew with the issuer and reimport, because imports are outside ACM managed renewal.
- If the question says a renewed export still serves an old certificate, think export and install the replacement, because renewal alone does not update the host.
- If the question says direct Private CA issuance should renew through ACM, think requesting through ACM and then exporting or associating it, because direct `IssueCertificate` is ineligible.
- If the question says avoid changing certificate references, think managed renewal or reimport into the existing ARN, because both preserve that identifier.

### Remember

- Imported, expired, and directly issued Private CA certificates are ineligible for ACM managed renewal.
- `ACM Certificate Approaching Expiration` covers active public, private, and imported certificates.

> **Trap:** Import requires an unencrypted private key, while export returns an encrypted private key. Do not interchange the input and output requirements.

> **Trap:** An exportable certificate is not automatically deployed to an external server after renewal. Your deployment process must retrieve and install the replacement.
