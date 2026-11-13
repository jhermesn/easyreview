---
title: Multi-Region keys
level: professional
order: 40
facts:
  - id: mrk-purpose
    text: Related multi-Region keys share key ID and material so compatible ciphertext can be decrypted locally in
      another Region.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#multi-region-keys-overview
  - id: mrk-shared
    text: Shared properties include key ID, material, material origin, key specification, encryption algorithms,
      key usage, and rotation.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#mrk-sync-properties
  - id: mrk-independent
    text: Policies, grants, aliases, tags, description, and enabled state are independent for each related key.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#mrk-sync-properties
  - id: mrk-arn
    text: Related multi-Region keys have different ARNs because the Region portion differs.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#mrk-sync-properties
  - id: mrk-create
    text: Choose the multi-Region property when creating the key; it cannot later be changed.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#multi-region-keys-overview
  - id: mrk-topology
    text: A related set has one primary key and at most one related key per Region, all within the same AWS
      partition.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#multi-region-keys-overview
  - id: mrk-replicate
    text: Create replica keys explicitly in selected Regions; KMS does not automatically choose Regions or create
      replicas.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#multi-region-keys-overview
  - id: mrk-rotation
    text: Configure automatic rotation or initiate on-demand rotation on the primary key only.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#mrk-sync-properties
  - id: mrk-kms-material
    text: For AWS_KMS-origin keys, KMS transports material from the primary to replicas within KMS.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#mrk-sync-properties
  - id: mrk-import-material
    text: For EXTERNAL-origin keys, import the same material into each replica independently; KMS synchronizes
      material identifiers rather than the material.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#mrk-sync-properties
  - id: mrk-auth
    text: Each related key needs its own Regional key policy, and policy edits are not synchronized.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-auth.html
  - id: mrk-independent-use
    text: A replica can perform cryptographic operations even when its primary key is disabled.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#multi-region-keys-overview
  - id: mrk-custom
    text: Multi-Region keys cannot be created in a custom key store.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#multi-region-keys-overview
  - id: s3-reencrypt
    text: S3 cross-Region replication still decrypts and re-encrypts data keys under the destination key even when
      related multi-Region keys are used.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#multi-region-keys-overview
diagrams:
  - id: kms-multi-region-local-use
    title: Replicate key material, then use a local key in each Region
    width: 820
    height: 420
    groups:
      - label: Region A
        icon: group-region
        x: 10
        y: 10
        w: 360
        h: 390
        tone: mgmt
      - label: Region B
        icon: group-region
        x: 450
        y: 10
        w: 360
        h: 390
        tone: mgmt
    nodes:
      - id: app-a
        label: Application A
        sub: encrypts data
        icon: res-generic-application
        x: 95
        y: 70
        w: 190
        h: 86
        tone: user
      - id: primary
        label: Primary key
        sub: AWS_KMS origin
        icon: key-management-service
        x: 95
        y: 280
        w: 190
        h: 86
        tone: security
      - id: replica
        label: Replica key
        sub: same ID and material
        icon: key-management-service
        x: 535
        y: 280
        w: 190
        h: 86
        tone: security
      - id: app-b
        label: Application B
        sub: decrypts locally
        icon: res-generic-application
        x: 535
        y: 70
        w: 190
        h: 86
        tone: user
    edges:
      - from: primary
        to: replica
        step: 1
        label: replicate
      - from: app-a
        to: primary
        step: 2
        label: encrypt
      - from: app-a
        to: app-b
        step: 3
        label: ciphertext
        dashed: true
      - from: app-b
        to: replica
        step: 4
        label: decrypt
    steps:
      - Create a related replica; KMS transports AWS_KMS-origin material to it.
      - The application in Region A uses its local key to encrypt.
      - The application makes the ciphertext available in Region B.
      - The application in Region B decrypts through the related local replica with its own permissions.
cards:
  - id: kms-009
    q: Which properties do related AWS KMS multi-Region keys share, and which must be managed independently?
    a: "Shared: key ID, material, origin, specification, algorithms, usage, and rotation. Independent: policies,
      grants, aliases, tags, description, and enabled state. Configure rotation on the primary."
    facts:
      - mrk-shared
      - mrk-independent
      - mrk-rotation
  - id: kms-010
    q: Can an existing single-Region AWS KMS key become multi-Region, or can a multi-Region key use a custom key
      store?
    a: No. The multi-Region property is fixed at creation, and custom key stores do not support multi-Region keys.
      S3 replication also continues re-encrypting data keys even with related multi-Region keys.
    trap: true
    facts:
      - mrk-create
      - mrk-custom
      - s3-reencrypt
  - id: kms-026
    q: An application must decrypt the same protected data in a recovery Region without making a KMS call to the
      failed Region. Which key design fits?
    a: Use related multi-Region keys and authorize the application on the local replica. Their matching material
      and key ID support local decryption.
    facts:
      - mrk-purpose
      - mrk-auth
  - id: kms-027
    q: A team changes the AWS KMS multi-Region primary key policy, but its recovery Region still denies access.
      Why?
    a: Key policies are independent and are not synchronized. Update the policy on the relevant Regional key.
    trap: true
    facts:
      - mrk-auth
  - id: kms-028
    q: A team replicates an AWS KMS key with imported material and finds the new replica lacks usable material.
      What must it do?
    a: Import the same material into that replica. KMS synchronizes material identifiers but does not transport
      EXTERNAL-origin material.
    facts:
      - mrk-import-material
  - id: kms-029
    q: A primary AWS KMS multi-Region key is disabled. Does that disable a related enabled replica?
    a: No. Enabled state is independent, and a replica can perform cryptographic operations while the primary is
      disabled.
    trap: true
    facts:
      - mrk-independent
      - mrk-independent-use
---
Multi-Region KMS keys are related Regional keys with the same key ID and key material. An application can encrypt in one Region and decrypt through a related key in another Region, avoiding a call back to the first Region.

### How it works

1. Create a multi-Region primary key. This property is fixed at creation; an existing single-Region key cannot be converted.
2. Explicitly create replicas in the Regions that need them. A replica is a fully usable related key, not a pointer to the primary. A related set has one primary and at most one related key per Region, within one AWS partition, a boundary separating groups of AWS Regions.
3. For `AWS_KMS` origin, KMS transports key material to replicas within KMS. For imported `EXTERNAL` material, import the same material into each replica yourself.
4. Configure a key policy and other local settings for each key. Policies, grants, aliases, tags, descriptions, and enabled states are independent. Related keys have different ARNs because their Region components differ.
5. Configure or initiate rotation on the primary. KMS synchronizes shared properties; each enabled replica can serve local cryptographic requests even when the primary is disabled.

| Property | Shared across related keys | Local responsibility |
| --- | --- | --- |
| ID, material, origin, specification, algorithms, usage | Yes | Import external material into each replica |
| Rotation | Yes | Configure or initiate it on the primary |
| Policy, grants, aliases, tags, description, enabled state | No | Manage each Regional key independently |

### Exam cues

- If the question says decrypt in a recovery Region without a cross-Region KMS request, think related multi-Region keys, because they share the material needed for local decryption.
- If the question says a primary policy edit did not fix replica access, think the replica's own policy, because policies are independent.
- If the question says imported material did not appear in a replica, think a separate import, because KMS synchronizes its identifier but does not copy the material.

### Remember

- Same key ID and material; different Regional ARNs.
- One primary per related set; create replicas explicitly.
- Rotation is controlled from the primary.
- Custom key stores do not support multi-Region keys.
- S3 replication still decrypts and re-encrypts data keys under the destination key.

> **Trap:** Multi-Region does not mean global access settings. Replicas need their own permissions and enabled state.
