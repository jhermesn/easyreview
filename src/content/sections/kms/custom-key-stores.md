---
title: Custom key stores
level: professional
order: 50
facts:
  - id: store-definition
    text: A key store is the protected location where key material is stored and used.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-store-overview.html#key-store-overview
  - id: standard-hsm
    text: Standard KMS keys are protected by hardware security modules, specialized devices for protecting and
      using cryptographic secrets.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-store-overview.html#key-store-overview
  - id: store-choice
    text: AWS recommends custom key stores for requirements explicitly mandating customer-controlled single-tenant
      HSMs or key management outside AWS.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-store-overview.html#choosing-key-store
  - id: cloudhsm-store
    text: A CloudHSM key store associates KMS keys with a customer-owned CloudHSM cluster, where key material and
      cryptographic operations reside.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/keystore-cloudhsm.html
  - id: cloudhsm-setup
    text: CloudHSM key store setup requires at least two active HSMs in different Availability Zones and a
      dedicated crypto user for KMS.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/keystore-cloudhsm.html
  - id: cloudhsm-disconnect
    text: Disconnecting a CloudHSM key store prevents KMS cryptographic operations using its keys.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/keystore-cloudhsm.html
  - id: xks-store
    text: An external key store keeps its external key material and cryptographic processing in a key manager
      outside AWS.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/keystore-external.html
  - id: xks-proxy
    text: KMS communicates with an external key manager through customer-provided external key store proxy
      software.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/keystore-external.html
  - id: xks-availability
    text: The customer is responsible for external key manager and proxy availability, durability, and latency.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/keystore-external.html
  - id: custom-types
    text: Custom key stores support only symmetric encryption KMS keys.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-store-overview.html#custom-key-store-overview
  - id: custom-limits
    text: Custom key stores do not support asymmetric keys, HMAC keys, imported material, or multi-Region keys.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-store-overview.html#custom-key-store-overview
  - id: custom-rotation
    text: Custom-key-store keys support neither automatic nor on-demand KMS rotation.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys-how-it-works
  - id: standard-sla
    text: The standard key store has a 99.999 percent KMS availability SLA.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-store-overview.html#default-key-store-operations
  - id: custom-no-sla
    text: The KMS key-store comparison lists no KMS availability SLA for CloudHSM and external key stores.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-store-overview.html#choosing-key-store
  - id: custom-tradeoff
    text: Custom key stores add cost and operational complexity and have lower performance than the standard store.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-store-overview.html#choosing-key-store
  - id: import-different
    text: Importing material into the standard store gives control over material generation and removal but keeps
      that imported material in KMS.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-store-overview.html#imported-key-material
diagrams:
  - id: kms-cloudhsm-store-flow
    title: KMS forwards cryptographic requests to the customer HSM cluster
    width: 840
    height: 200
    nodes:
      - id: app
        label: Application
        sub: calls KMS
        icon: res-generic-application
        x: 30
        y: 60
        w: 200
        h: 86
        tone: user
      - id: kms
        label: AWS KMS
        sub: authorizes key use
        icon: key-management-service
        x: 320
        y: 60
        w: 200
        h: 86
        tone: security
      - id: hsm
        label: CloudHSM cluster
        sub: holds and uses material
        icon: cloudhsm
        x: 610
        y: 60
        w: 200
        h: 86
        tone: security
    edges:
      - from: app
        to: kms
        step: 1
      - from: kms
        to: hsm
        step: 2
    steps:
      - The application makes a KMS request using its configured permissions.
      - KMS uses the connected customer-owned CloudHSM cluster for the cryptographic operation.
  - id: kms-external-store-flow
    title: External key operations depend on the proxy and key manager
    width: 1130
    height: 200
    nodes:
      - id: app
        label: Application
        sub: calls KMS
        icon: res-generic-application
        x: 30
        y: 60
        w: 200
        h: 86
        tone: user
      - id: kms
        label: AWS KMS
        sub: uses external store
        icon: key-management-service
        x: 320
        y: 60
        w: 200
        h: 86
        tone: security
      - id: proxy
        label: XKS proxy
        sub: translates requests
        icon: res-generic-application
        x: 610
        y: 60
        w: 200
        h: 86
        tone: neutral
      - id: manager
        label: External manager
        sub: outside AWS
        icon: res-generic-application
        x: 900
        y: 60
        w: 200
        h: 86
        tone: neutral
    edges:
      - from: app
        to: kms
        step: 1
      - from: kms
        to: proxy
        step: 2
      - from: proxy
        to: manager
        step: 3
    steps:
      - The application makes a KMS request for an external-store key.
      - KMS sends the request to the customer-provided XKS proxy.
      - The proxy calls the external manager and returns its response to KMS.
cards:
  - id: kms-011
    q: When should an AWS KMS design choose a CloudHSM key store or an external key store?
    a: Choose CloudHSM for a requirement to protect material in customer-controlled single-tenant HSMs in AWS.
      Choose an external key store when external keys must stay outside AWS. Both support only symmetric
      encryption keys and add operational dependencies.
    facts:
      - store-choice
      - cloudhsm-store
      - xks-store
      - custom-types
      - custom-tradeoff
  - id: kms-030
    q: A policy requires KMS-integrated encryption with key material protected by dedicated HSMs controlled by the
      customer in AWS. Which store fits?
    a: A CloudHSM key store. Setup requires at least two active HSMs in different Availability Zones and a
      dedicated KMS crypto user.
    facts:
      - cloudhsm-store
      - cloudhsm-setup
  - id: kms-031
    q: A policy requires external key material never to be imported into AWS. Should the team use imported KMS
      material or an external key store?
    a: Use an external key store. Importing material places it in KMS; an external key store uses a key manager
      outside AWS through a proxy.
    trap: true
    facts:
      - xks-store
      - xks-proxy
      - import-different
  - id: kms-032
    q: An application loses KMS cryptographic access when its CloudHSM key store is disconnected. Can an IAM
      policy restore that access alone?
    a: No. Reconnect the store and restore its cluster availability. KMS cannot perform those operations while the
      store is disconnected.
    trap: true
    facts:
      - cloudhsm-disconnect
  - id: kms-033
    q: Can an AWS KMS custom key store satisfy a requirement for multi-Region keys and automatic rotation?
    a: No. Custom key stores support neither multi-Region keys nor automatic or on-demand KMS rotation.
    trap: true
    facts:
      - custom-limits
      - custom-rotation
---
A KMS custom key store lets KMS use key material held in a key manager you control. It meets requirements for dedicated hardware or external key custody while retaining the KMS interface. A hardware security module (HSM) is a specialized device that protects and uses cryptographic secrets.

### How it works

1. Start with the requirement for key custody, meaning where material is held and who controls it. AWS recommends a custom store when that requirement explicitly calls for customer-controlled single-tenant HSMs, dedicated to one customer, or external key management.
2. For a CloudHSM key store, create or select a customer-owned cluster, a group of HSMs. Setup requires at least two active HSMs in different Availability Zones and a dedicated crypto user, the cluster account KMS uses. Connect the store before using its keys.
3. For an external key store, operate a key manager outside AWS and an external key store (XKS) proxy, software that passes and translates requests between KMS and that manager. The external key material remains outside AWS.
4. Keep these dependencies available. A disconnected CloudHSM store cannot perform KMS cryptographic operations. For XKS, the external manager and proxy add availability, durability, and latency responsibilities.

| Store choice | Where material is held and used | Operational responsibility |
| --- | --- | --- |
| Standard KMS | AWS-managed HSM infrastructure | AWS manages infrastructure |
| CloudHSM key store | Customer-owned CloudHSM cluster in AWS | Customer manages the cluster and connection |
| External key store | External key manager outside AWS | Customer operates manager, proxy, and connectivity |

Importing material into a standard key store gives control over its generation and removal, but places it in KMS. It does not meet an external-only custody requirement.

### Exam cues

- If the question says dedicated HSMs controlled by the customer in AWS, think a CloudHSM key store, because its cluster holds and uses the material.
- If the question says the external key must stay outside AWS, think XKS, because KMS calls a proxy connected to the external manager.
- If the question says key operations failed after a store disconnect, think its connection and backing manager, because IAM cannot replace a working key-store dependency.

### Remember

- Custom stores support symmetric encryption keys only.
- No asymmetric or HMAC keys, imported material, multi-Region keys, automatic rotation, or on-demand rotation.
- Standard-store availability SLA: 99.999 percent. The KMS comparison lists no KMS availability SLA for custom stores.
- Custom stores add cost, operational work, and lower performance.

> **Trap:** Customer-generated material imported into KMS is not an external key store. External custody requires XKS.
