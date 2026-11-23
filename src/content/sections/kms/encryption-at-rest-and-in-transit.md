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
  - id: acm
    text: AWS Certificate Manager (ACM) creates, stores and renews public and private SSL/TLS certificates that protect AWS websites and applications.
    source: https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html#acm-overview
  - id: privatelink
    text: AWS PrivateLink keeps traffic between a VPC or on-premises network and services on the Amazon backbone, so it does not traverse the internet.
    source: https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/protecting-data-in-transit.html#protecting-data-in-transit
  - id: rds-at-create
    text: An Amazon RDS DB instance is encrypted when it is created; to encrypt an existing one, restore from an encrypted copy of its snapshot, or use a blue/green deployment whose green environment is encrypted.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html
  - id: launch-wizard-sap
    text: AWS Launch Wizard for SAP supports customer managed KMS keys for EBS volume encryption.
    source: https://docs.aws.amazon.com/launchwizard/latest/userguide/launch-wizard-security.html
cards:
  - id: kms-050
    q: Can AWS Launch Wizard for SAP use a customer managed KMS key to encrypt EBS volumes?
    a: Yes. Launch Wizard for SAP supports customer managed KMS keys for EBS encryption.
    facts: [launch-wizard-sap]
  - id: kms-038
    q: How does AWS encryption at rest differ from encryption in transit?
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
  - id: kms-042
    q: Why is encrypting data stored on AWS one of the benefits of cloud security?
    a: Encrypted data is unreadable without the key, so a stolen copy of storage is useless; AWS services make encryption a setting, managed with AWS KMS.
    facts: [encryption, kms-integration]
  - id: kms-043
    q: "Which AWS service creates and controls encryption keys that can protect an Amazon RDS database?"
    a: "AWS Key Management Service (AWS KMS) creates and controls keys and integrates with Amazon RDS encryption."
    facts: [kms, kms-integration]
---
Encryption protects data in two states. Data at rest sits in storage; data in transit moves between systems. AWS services offer encryption for both, and the customer decides how to use it. Data at rest · Data in transit

### How it works

1. **At rest:** storage services encrypt data with keys. AWS KMS creates and controls those keys and integrates with services such as Amazon S3, Amazon EBS and Amazon RDS.
2. **In transit:** TLS encrypts connections. AWS Certificate Manager issues and renews the TLS certificates.
3. **Private paths:** AWS PrivateLink keeps traffic on the Amazon network instead of the internet.

| State | Protects | AWS tools |
|---|---|---|
| At rest | Data in storage | AWS KMS keys, server-side encryption in S3, EBS, RDS |
| In transit | Data moving between systems | TLS with ACM certificates, AWS PrivateLink, VPN |

### Exam cues

- If the question says encrypt EBS volumes for a Launch Wizard for SAP deployment with a customer managed key, think AWS KMS, because Launch Wizard supports those keys.
- If the question says manage the keys that encrypt stored data, think AWS KMS.
- If the question says HTTPS certificates, think ACM.
- If the question says protect data moving over the network, think encryption in transit (TLS).
- If the question says encrypt an existing unencrypted RDS instance, think snapshot copy with encryption and restore, or a blue/green deployment, because RDS encryption is set at creation.

### Remember

- KMS keys never leave AWS KMS unencrypted.
- RDS encryption is set at creation; encrypt a snapshot copy and restore it to encrypt an existing unencrypted instance.

> **Trap:** TLS certificates protect data in transit, not at rest. For stored data, the answer is server-side encryption with AWS KMS keys.
