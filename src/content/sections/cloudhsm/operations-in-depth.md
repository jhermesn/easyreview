---
title: Cluster modes and integration
level: professional
order: 20
facts:
  - id: apis
    text: CloudHSM supports PKCS 11, JCE, CNG and KSP interfaces for cryptographic workloads.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction
  - id: mode-fixed
    text: A CloudHSM cluster's mode cannot be changed after creation.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/cluster-hsm-types.html#cluster-hsm-types
  - id: modes
    text: FIPS mode uses validated keys and algorithms; non-FIPS mode supports all keys and algorithms supported by CloudHSM.
    source: https://docs.aws.amazon.com/cloudhsm/latest/userguide/clusters.html#clusters
  - id: kmsuser
    text: KMS uses a dedicated CloudHSM crypto user named kmsuser to create and manage key material in the associated cluster.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/keystore-cloudhsm.html#concept-kmsuser
cards:
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
---
AWS CloudHSM supports cryptographic application interfaces and offers cluster modes with different key and algorithm choices. AWS KMS uses a dedicated crypto user to manage key material in an associated CloudHSM cluster. [CloudHSM interfaces](https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction) | [Cluster modes](https://docs.aws.amazon.com/cloudhsm/latest/userguide/clusters.html#clusters) | [KMS crypto user](https://docs.aws.amazon.com/kms/latest/developerguide/keystore-cloudhsm.html#concept-kmsuser)

### How it works

1. Choose a cluster mode: Federal Information Processing Standard (FIPS) mode uses validated keys and algorithms, while non-FIPS mode supports all keys and algorithms supported by CloudHSM. The mode cannot be changed after creation. [Cluster modes](https://docs.aws.amazon.com/cloudhsm/latest/userguide/clusters.html#clusters) | [Mode selection](https://docs.aws.amazon.com/cloudhsm/latest/userguide/cluster-hsm-types.html#cluster-hsm-types)
2. Integrate cryptographic applications through supported interfaces: PKCS 11, JCE, CNG or KSP. [CloudHSM interfaces](https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html#introduction)
3. For a KMS CloudHSM key store, KMS uses the dedicated crypto user `kmsuser` to create and manage key material in the associated cluster. [KMS crypto user](https://docs.aws.amazon.com/kms/latest/developerguide/keystore-cloudhsm.html#concept-kmsuser)

### Exam cues

- If the question says an existing cryptographic application needs a CloudHSM interface, think PKCS 11, JCE, CNG or KSP, because CloudHSM supports these interfaces.
- If the question says KMS needs to manage key material in its CloudHSM cluster, think `kmsuser`, because KMS uses that dedicated crypto user.

### Remember

- FIPS mode uses validated keys and algorithms; non-FIPS mode supports all CloudHSM-supported keys and algorithms.
- A cluster's mode is fixed at creation.

> **Trap:** An existing FIPS-mode cluster cannot be switched to non-FIPS mode when a workload needs non-FIPS algorithms. [Mode selection](https://docs.aws.amazon.com/cloudhsm/latest/userguide/cluster-hsm-types.html#cluster-hsm-types)
