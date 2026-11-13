---
title: Dedicated HSM workloads
level: associate
order: 10
facts:
  - id: dedicated
    text: CloudHSM provides single-tenant hardware security modules that process cryptographic operations and store cryptographic keys.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction
  - id: modes
    text: FIPS mode uses validated keys and algorithms; non-FIPS mode supports all keys and algorithms supported by CloudHSM.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/clusters.html#clusters
  - id: fips-level
    text: HSMs in FIPS-mode clusters are validated to either FIPS 140-2 level 3 or FIPS 140-3 level 3.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction
  - id: mode-fixed
    text: A CloudHSM cluster's mode cannot be changed after creation.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/cluster-hsm-types.html#cluster-hsm-types
  - id: control
    text: CloudHSM data plane traffic is end-to-end encrypted and not visible to AWS.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction
  - id: user-control
    text: Customers manage CloudHSM users outside IAM.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction
  - id: setup
    text: CloudHSM operates in a VPC; create a cluster, add HSMs, create users and keys, and integrate the application using client SDKs.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/whatis-concepts.html#whatis-concepts
  - id: vpc-definition
    text: A VPC is a logically isolated virtual network in which AWS resources can be launched.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#what-is-amazon-vpc
  - id: apis
    text: CloudHSM supports PKCS 11, JCE, CNG and KSP interfaces for cryptographic workloads.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction
  - id: pkcs11
    text: PKCS 11 is a standard for performing cryptographic operations on HSMs.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/pkcs11-library.html#pkcs11-library
  - id: users
    text: HSM users are distinct from IAM users; HSM operations require HSM user credentials.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/manage-hsm-users.html#manage-hsm-users
  - id: cluster-sync
    text: CloudHSM keeps HSMs in a cluster synchronized.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/clusters.html#clusters
  - id: cluster-redundancy
    text: Spreading HSMs across Availability Zones provides redundancy.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/clusters.html#clusters
  - id: durability
    text: AWS recommends at least three HSMs across different Availability Zones for durability of newly generated keys.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/bp-cluster-management.html#bp-new-key-durability
  - id: backups
    text: CloudHSM periodically backs up cluster users, keys and policies; the HSM encrypts its data before sending a backup.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/backups.html#backups
  - id: kms-choice
    text: KMS is an option for managed encryption keys when operating HSMs is not required.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction
  - id: custom-store
    text: A KMS CloudHSM key store uses a customer-owned CloudHSM cluster to generate and store non-extractable KMS key material and perform cryptographic operations.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/keystore-cloudhsm.html#keystore-cloudhsm
  - id: custom-minimum
    text: Creating KMS keys in a CloudHSM key store requires at least two active HSMs in the associated cluster.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/keystore-cloudhsm.html#concept-cluster
  - id: kmsuser
    text: KMS uses a dedicated CloudHSM crypto user named kmsuser to create and manage key material in the associated cluster.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/keystore-cloudhsm.html#concept-kmsuser
  - id: custom-disconnect
    text: A disconnected CloudHSM key store cannot create KMS keys or perform cryptographic operations with its KMS keys.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/keystore-cloudhsm.html#concept-cluster
  - id: custom-limits
    text: CloudHSM key stores support symmetric encryption KMS keys but not asymmetric keys, imported key material, automatic rotation or multi-Region keys.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/keystore-cloudhsm.html#keystore-cloudhsm
  - id: asymmetric
    text: An asymmetric KMS key represents a mathematically related public and private key pair.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/symmetric-asymmetric.html#symmetric-asymmetric
cards:
  - id: cloudhsm-001
    q: A security team requires dedicated hardware security modules under its control. Which AWS service fits?
    a: AWS CloudHSM provides single-tenant HSMs and customer control of HSM users and keys.
    trap: true
    facts: [dedicated, user-control]
  - id: cloudhsm-002
    q: A team needs KMS integration while controlling the hardware that stores its KMS key material. What can it use?
    a: A KMS CloudHSM key store backed by its own CloudHSM cluster.
    facts: [custom-store]
  - id: cloudhsm-003
    q: A CloudHSM key store is disconnected from its cluster. Can AWS KMS use its keys for encryption?
    a: No. Cryptographic operations using keys in the disconnected store are unavailable.
    trap: true
    facts: [custom-disconnect]
  - id: cloudhsm-004
    q: What credentials authenticate operations on an AWS CloudHSM HSM?
    a: HSM user credentials. HSM users are distinct from IAM users.
    facts: [users]
  - id: cloudhsm-005
    q: How many active HSMs are required to create KMS keys in a CloudHSM key store?
    a: At least two active HSMs in the associated cluster.
    facts: [custom-minimum]
  - id: cloudhsm-006
    q: A workload needs newly generated CloudHSM keys to be durable across Availability Zones. What does AWS recommend?
    a: At least three HSMs spread across different Availability Zones.
    facts: [durability]
  - id: cloudhsm-007
    q: Can a KMS CloudHSM key store create asymmetric KMS keys?
    a: No. CloudHSM key stores support symmetric encryption KMS keys.
    trap: true
    facts: [custom-limits]
  - id: cloudhsm-008
    q: Which AWS CloudHSM interfaces help integrate existing cryptographic applications?
    a: PKCS 11, JCE, CNG and KSP are supported interfaces.
    facts: [apis]
  - id: cloudhsm-009
    q: A team needs non-FIPS algorithms in an existing AWS CloudHSM FIPS-mode cluster. Can it change the cluster mode?
    a: No. Cluster mode cannot be changed after creation; non-FIPS mode supports the additional algorithms.
    trap: true
    facts: [mode-fixed, modes]
  - id: cloudhsm-010
    q: Which CloudHSM user does KMS use to manage key material in a CloudHSM key store?
    a: A dedicated crypto user named `kmsuser`.
    facts: [kmsuser]
diagrams:
  - id: cloudhsm-kms-store
    title: KMS CloudHSM key store
    width: 700
    height: 160
    nodes:
      - { id: client, label: Application, x: 20, y: 30, w: 170, h: 72, tone: user, icon: res-client }
      - { id: kms, label: KMS, x: 265, y: 30, w: 170, h: 72, tone: security, icon: key-management-service }
      - { id: hsm, label: CloudHSM, x: 510, y: 30, w: 170, h: 72, tone: security, icon: cloudhsm }
    edges:
      - { from: client, to: kms, step: 1 }
      - { from: kms, to: hsm, step: 2 }
    steps:
      - Request a cryptographic operation using a KMS key in the CloudHSM key store.
      - KMS uses the connected cluster for the operation.
---
AWS CloudHSM provides dedicated hardware security modules (HSMs), devices that store cryptographic keys and perform cryptographic operations. It suits workloads that need control of their HSMs and keys.

### How it works

1. Create a cluster in a virtual private cloud (VPC), an isolated virtual network, and add HSMs. CloudHSM synchronizes the HSMs in the cluster.
2. Create HSM users and keys, then integrate applications using the client software development kits (SDKs). HSM user credentials, not AWS Identity and Access Management (IAM) user credentials, authenticate operations on the HSM. CloudHSM periodically backs up users, keys and policies.
3. Optionally connect a KMS CloudHSM key store to a customer-owned cluster. KMS uses a dedicated HSM user named `kmsuser`, generates non-extractable key material there and sends cryptographic operations to the HSMs.

| Need | Choice |
|---|---|
| Dedicated HSMs and direct cryptographic interfaces | CloudHSM |
| Managed keys without operating HSMs | KMS |
| KMS integration with a customer-managed HSM cluster | KMS CloudHSM key store |

### Exam cues

- If the question says dedicated hardware and direct PKCS 11 access, think CloudHSM, because it provides single-tenant HSMs and supports that standard interface for HSM operations.
- If the question says KMS integration and customer-controlled HSMs, think a CloudHSM key store, because its KMS key material and operations use the customer's cluster.
- If the question says newly generated keys need durability across zones, think at least three HSMs in different Availability Zones, because AWS recommends that configuration.

### Remember

- Federal Information Processing Standard (FIPS) mode uses validated keys and algorithms; non-FIPS mode supports all CloudHSM-supported keys and algorithms. Cluster mode cannot be changed after creation.
- HSMs in FIPS-mode clusters are validated to FIPS 140-2 level 3 or FIPS 140-3 level 3.
- Creating KMS keys in a CloudHSM key store requires at least two active HSMs.
- CloudHSM key stores support symmetric encryption KMS keys, not asymmetric KMS keys, imported key material, automatic rotation or multi-Region keys.
- An asymmetric KMS key uses a related public and private key pair.

> **Trap:** A disconnected CloudHSM key store cannot perform cryptographic operations with its KMS keys, even though the KMS keys still exist.
