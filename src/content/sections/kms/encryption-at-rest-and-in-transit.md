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
  - id: rds-at-create
    text: An Amazon RDS DB instance can be encrypted only when it is created; to encrypt an existing one, copy an unencrypted snapshot with encryption and restore it.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html
  - id: efs-at-create
    text: Amazon EFS encryption at rest is set when the file system is created and can't be added to an unencrypted file system later.
    source: https://docs.aws.amazon.com/efs/latest/ug/encryption-at-rest.html
  - id: redshift-default
    text: Since January 10, 2025, new Amazon Redshift provisioned clusters are encrypted by default; clusters restored from snapshots are not affected.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/behavior-changes.html#encryption-by-default
  - id: cloudtrail-default
    text: CloudTrail log files delivered to S3 are encrypted by default with SSE-S3, or with SSE-KMS if you choose a KMS key.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html
  - id: storage-gateway-default
    text: AWS Storage Gateway encrypts data in transit with TLS and, by default, encrypts the data it stores in Amazon S3 with SSE-S3.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/encryption.html
  - id: key-types
    text: KMS keys are customer managed keys (you create and control them), AWS managed keys (created in your account by a service, a legacy type) and AWS owned keys (owned by a service, used for encryption by default).
    source: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html
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
  - id: kms-043
    q: A company has an unencrypted Amazon RDS DB instance. Can it turn on encryption for that instance in place?
    a: No. RDS encryption is chosen at creation. Copy a snapshot with encryption and restore a new, encrypted instance.
    trap: true
    facts: [rds-at-create]
  - id: kms-044
    q: "Which of these encrypt data by default with no setting to change: CloudTrail log files, Storage Gateway data in S3, a new Amazon EFS file system created through the API?"
    a: CloudTrail log files (SSE-S3) and Storage Gateway data (SSE-S3, plus TLS in transit). EFS encryption at rest is a setting chosen when the file system is created.
    trap: true
    facts: [cloudtrail-default, storage-gateway-default, efs-at-create]
  - id: kms-045
    q: Are new Amazon Redshift provisioned clusters encrypted by default?
    a: Yes, since January 10, 2025, unless they are restored from a snapshot.
    facts: [redshift-default]
  - id: kms-046
    q: Which three kinds of KMS keys exist, and which one does a customer fully control?
    a: Customer managed keys (full control), AWS managed keys (created by a service in your account) and AWS owned keys (owned by the service).
    facts: [key-types]
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
- If the question says encrypt an existing unencrypted RDS instance, think snapshot copy with encryption and restore, because RDS encryption is set at creation.

### Remember

- Amazon S3 encrypts new uploads by default with SSE-S3 since January 5, 2023.
- KMS keys never leave AWS KMS unencrypted.
- Encrypted by default: S3 new objects, CloudTrail logs, Storage Gateway data, new Redshift provisioned clusters (since January 2025).
- Set at creation: RDS and EFS encryption.

> **Trap:** TLS certificates protect data in transit, not at rest. For stored data, the answer is server-side encryption with AWS KMS keys.
