---
title: Private certificates and trust
level: associate
order: 10
facts:
  - id: private-use
    text: AWS Private CA creates private certificate authority hierarchies and issues certificates for uses including encrypted TLS connections and authentication.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/PcaWelcome.html#PcaWelcome
  - id: hierarchy
    text: A private CA hierarchy has a root and can have subordinate CAs.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/ca-hierarchy.html#ca-hierarchy
  - id: hierarchy-limit
    text: AWS Private CA supports up to five CA levels in a hierarchy.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/ca-hierarchy.html#ca-hierarchy
  - id: trust
    text: Clients validate a certificate chain to a trusted root in their trust stores.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/ca-hierarchy.html#end-entity-validation
  - id: private-root
    text: An organization must add its private root CA to client trust stores for validation.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/ca-hierarchy.html#end-entity-validation
  - id: acm
    text: ACM can request a private certificate from an available private CA, including a shared CA.
    source: https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-private.html#request-private-console
  - id: integrated
    text: Private certificates requested through ACM can be associated with ACM integrated services.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/PcaWelcome.html#PcaIntegratedServices
  - id: installation
    text: Certificates issued directly through the Private CA API or exported from ACM can be installed elsewhere.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/PcaWelcome.html#PcaIntegratedServices
  - id: renewal
    text: An ACM-issued private certificate is eligible for managed renewal if exported or associated with an AWS service.
    source: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html#managed-renewal
  - id: direct-renewal
    text: A private certificate issued directly through the Private CA IssueCertificate API is not eligible for ACM managed renewal.
    source: https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html#managed-renewal
  - id: revocation
    text: Configure OCSP or a certificate revocation list before issuing certificates to support status checking.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/PcaRevokeCert.html#PcaRevokeCert
  - id: revocation-check
    text: Clients must check revocation status for revocation to be effective.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/PcaRevokeCert.html#PcaRevokeCert
  - id: ocsp
    text: With OCSP the client queries an authoritative revocation database.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/PcaRevokeCert.html#PcaRevokeCert
  - id: crl
    text: A certificate revocation list is periodically downloaded and stored by clients.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/PcaRevokeCert.html#PcaRevokeCert
  - id: regional
    text: Private CAs are regional resources and cannot be copied between Regions.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/PcaWelcome.html#PcaRegions
  - id: expiration
    text: AWS Private CA prevents issuance of a certificate that expires later than its issuing CA certificate.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/PcaWelcome.html#RFC-compliance
  - id: certificate
    text: An X.509 certificate binds the identity of its subject, such as a user or device, to a public key.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/PcaTerms.html#terms-ca
  - id: public-key
    text: A public key is the shareable key of a mathematically related public and private key pair.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-concepts.html#concept-asymmetric
  - id: renewal-timing
    text: ACM attempts to renew a managed private certificate 60 days before expiration.
    source: https://docs.aws.amazon.com/acm/latest/userguide/renew-private-cert.html#renew-private-cert
  - id: renewal-deployment
    text: A renewed certificate associated with an ACM integrated service replaces the old certificate without additional customer action.
    source: https://docs.aws.amazon.com/acm/latest/userguide/renew-private-cert.html#renew-private-cert
  - id: renewal-export
    text: A renewed certificate not associated with an ACM integrated service requires customer action to export and install it.
    source: https://docs.aws.amazon.com/acm/latest/userguide/renew-private-cert.html#renew-private-cert
  - id: cross-account
    text: A CA administrator can use AWS Resource Access Manager to share CA access for issuance across accounts.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/pca-ram.html#pca-ram
  - id: cross-account-renewal
    text: The recipient account is responsible for configuring ACM automatic renewal for certificates issued using a shared CA.
    source: https://docs.aws.amazon.com/privateca/latest/userguide/pca-ram.html#pca-ram
diagrams:
  - id: private-ca-trust-chain
    title: Private certificate trust chain
    width: 800
    height: 160
    nodes:
      - { id: root, label: Root CA, x: 30, y: 35, w: 150, h: 72, tone: security, icon: private-certificate-authority }
      - { id: sub, label: Subordinate CA, x: 250, y: 35, w: 150, h: 72, tone: security, icon: private-certificate-authority }
      - { id: cert, label: Certificate, x: 470, y: 43, w: 130, h: 56, tone: neutral }
      - { id: client, label: Client, x: 650, y: 35, w: 120, h: 72, tone: user, icon: res-client }
    edges:
      - { from: root, to: sub, step: 1 }
      - { from: sub, to: cert, step: 2 }
      - { from: cert, to: client, step: 3 }
    steps:
      - The root signs a subordinate CA.
      - The subordinate CA issues an end-entity certificate.
      - The client validates the chain against its trusted root.
cards:
  - id: private-ca-001
    q: What does AWS Private CA provide for an organization's internal certificates?
    a: A private CA hierarchy that issues certificates for authentication and encrypted TLS connections.
    facts: [private-use, hierarchy]
  - id: private-ca-002
    q: An internal client rejects a certificate from AWS Private CA because it cannot find a trusted root. What should the organization do?
    a: Add the private root CA certificate to the client's trust store and provide the chain.
    facts: [trust, private-root]
  - id: private-ca-003
    q: A team wants an AWS Private CA certificate to renew through ACM. How should it obtain and use the certificate?
    a: Request it through ACM and export it or associate it with an AWS service; direct Private CA API issuance is not eligible for ACM managed renewal.
    facts: [acm, renewal, direct-renewal]
  - id: private-ca-004
    q: How many CA levels can an AWS Private CA hierarchy contain?
    a: Up to five CA levels.
    facts: [hierarchy-limit]
  - id: private-ca-005
    q: A private key is compromised. What must be in place for AWS Private CA revocation to protect clients?
    a: Configure OCSP or a CRL before issuance and ensure clients check revocation status.
    facts: [revocation, revocation-check]
  - id: private-ca-006
    q: Can an AWS Private CA be copied to another Region?
    a: No. Create a CA in each Region where it is needed.
    facts: [regional]
    trap: true
  - id: private-ca-007
    q: Can an AWS Private CA issue a certificate that expires after its issuing CA certificate?
    a: No. AWS Private CA prevents it.
    facts: [expiration]
    trap: true
  - id: private-ca-008
    q: An ACM-issued private certificate is exported and installed on a server outside an ACM integrated service. What happens after ACM renews it?
    a: Export and install the renewed certificate on the server; ACM does not deploy it there automatically.
    facts: [renewal-export]
    trap: true
  - id: private-ca-009
    q: A central account owns an AWS Private CA and another account needs to issue certificates from it. What sharing mechanism can the administrator use?
    a: Share CA access through AWS Resource Access Manager. The recipient account configures ACM automatic renewal.
    facts: [cross-account, cross-account-renewal]
---

AWS Private CA issues private certificates for authentication and encrypted connections. A certificate binds an identity to a public key, the shareable part of a key pair, and a certificate authority (CA) signs it. Clients decide whether to trust the chain of signatures leading to a root CA.

### How it works

1. Create a root CA and, if needed, subordinate CAs that the root or another CA signs. Configure revocation before issuing certificates.
2. Request an end-entity certificate, a certificate for a user, device, or service, through AWS Certificate Manager (ACM) or issue one directly through AWS Private CA.
3. Give clients the certificate chain and place the private root in their trust store, the client's collection of trusted CA certificates.
4. Clients can query Online Certificate Status Protocol (OCSP) for status or download a certificate revocation list (CRL), a list of revoked certificates.

### Exam cues

- If the question says clients reject an internal certificate, think private root in the client trust store, because the chain must reach a trusted root.
- If the question says automatic renewal for a private certificate, think ACM issuance and an eligible association or export, because direct Private CA API issuance is not eligible for ACM managed renewal.
- If the question says a certificate's key is compromised, think revoke and check status, because clients must check OCSP or a CRL for revocation to work.
- If the question says an exported private certificate has renewed, think export and install it again, because ACM does not deploy it to a nonintegrated service.
- If the question says another account needs to issue from a central private CA, think AWS Resource Access Manager, because the CA administrator can share issuance access.

### Remember

- A managed CA hierarchy supports up to five CA levels.
- A private CA is regional and cannot be copied to another Region.
- A certificate cannot expire later than its issuing CA certificate.
- ACM private certificates can be used with ACM integrated services.
- ACM attempts to renew a managed private certificate 60 days before expiration. Integrated services receive the replacement without additional customer action.

> **Trap:** A private certificate is not automatically trusted by clients. Install the private root in their trust stores.
