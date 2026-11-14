---
title: Encryption at rest and in transit
level: foundational
order: 5
facts:
  - id: at-rest
    text: Data at rest is data persisted in non-volatile storage, such as block storage, object storage, databases and archives; encryption and access controls reduce the risk of unauthorized access to it.
    source: https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/protecting-data-at-rest.html#protecting-data-at-rest
  - id: in-transit
    text: Data in transit is data sent from one system to another, inside a workload or between services and end users; protecting it preserves confidentiality and integrity.
    source: https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/protecting-data-in-transit.html#protecting-data-in-transit
  - id: encryption
    text: Encryption transforms content so it is unreadable without the secret key needed to decrypt it back to plaintext.
    source: https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/protecting-data-at-rest.html#protecting-data-at-rest
  - id: kms
    text: AWS Key Management Service (AWS KMS) creates and controls the keys used to encrypt and sign data; KMS keys are protected by FIPS 140-3 Security Level 3 validated HSMs and never leave AWS KMS unencrypted.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/overview.html#overview
  - id: kms-integration
    text: AWS KMS integrates with other AWS services to encrypt data at rest or in transit; common uses are encrypting Amazon EBS volumes, Amazon S3 buckets and Amazon RDS databases.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/service-integration.html#service-integration
  - id: s3-default
    text: Since January 5, 2023, Amazon S3 automatically encrypts all new object uploads with SSE-S3 (AES-256) at no additional cost and with no performance impact.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html#default-encryption-faq
  - id: acm
    text: AWS Certificate Manager (ACM) creates, stores and renews public and private SSL/TLS certificates that protect AWS websites and applications.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html#acm-overview
  - id: privatelink
    text: AWS PrivateLink keeps traffic between a VPC or on-premises network and services on the Amazon backbone, so it does not traverse the internet.
    source: https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/protecting-data-in-transit.html#protecting-data-in-transit
cards:
  - id: kms-038
    q: What is the difference between encryption at rest and encryption in transit on AWS?
    a: "- At rest: protects stored data, such as in Amazon S3, Amazon EBS or a database\n- In transit: protects data moving between systems, usually with TLS"
    facts: [at-rest, in-transit]
  - id: kms-039
    q: Which AWS service creates and controls the keys used to encrypt data in services such as Amazon S3, Amazon EBS and Amazon RDS?
    a: AWS Key Management Service (AWS KMS). Its keys stay inside FIPS 140-3 validated HSMs and never leave unencrypted.
    facts: [kms, kms-integration]
  - id: kms-040
    q: A website on AWS needs a TLS certificate for HTTPS that renews automatically. Which AWS service provides it?
    a: AWS Certificate Manager (ACM). It creates, stores and renews SSL/TLS certificates, which encrypt data in transit.
    facts: [acm]
  - id: kms-041
    q: A company uploads new objects to Amazon S3 without configuring encryption. Are they stored unencrypted?
    a: No. Since January 5, 2023, S3 encrypts all new uploads with SSE-S3 (AES-256) automatically, at no extra cost.
    trap: true
    facts: [s3-default]
  - id: kms-042
    q: Why is encrypting data stored on AWS one of the benefits of cloud security?
    a: Encrypted data is unreadable without the key, so a stolen copy of storage is useless; AWS services make encryption a setting, managed with AWS KMS.
    facts: [encryption, kms-integration]
---
Encryption protects data in two states. Data at rest sits in storage; data in transit moves between systems. AWS services offer encryption for both, and the customer decides how to use it. [Data at rest](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/protecting-data-at-rest.html#protecting-data-at-rest) · [Data in transit](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/protecting-data-in-transit.html#protecting-data-in-transit)

### How it works

1. **At rest:** storage services encrypt data with keys. AWS KMS creates and controls those keys and integrates with services such as Amazon S3, Amazon EBS and Amazon RDS. [AWS KMS](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html#overview)
2. **In transit:** TLS encrypts connections. AWS Certificate Manager issues and renews the TLS certificates. [ACM](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html#acm-overview)
3. **Private paths:** AWS PrivateLink keeps traffic on the Amazon network instead of the internet.

| State | Protects | AWS tools |
|---|---|---|
| At rest | Data in storage | AWS KMS keys, server-side encryption in S3, EBS, RDS |
| In transit | Data moving between systems | TLS with ACM certificates, AWS PrivateLink, VPN |

### Exam cues

- If the question says manage the keys that encrypt stored data, think AWS KMS.
- If the question says HTTPS certificates, think ACM.
- If the question says protect data moving over the network, think encryption in transit (TLS).

### Remember

- Amazon S3 encrypts new uploads by default with SSE-S3 since January 5, 2023.
- KMS keys never leave AWS KMS unencrypted.

> **Trap:** TLS certificates protect data in transit, not at rest. For stored data, the answer is server-side encryption with AWS KMS keys.
