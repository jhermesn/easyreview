---
title: "PLACEHOLDER cloudhsm/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
