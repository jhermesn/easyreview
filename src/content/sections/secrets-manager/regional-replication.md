---
title: Regional replication
level: professional
order: 40
facts:
  - id: replication
    text: Secrets Manager replication copies encrypted secret data and metadata, including tags and
      resource policies, to selected enabled Regions.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/replicate-secrets.html
  - id: arn
    text: A replica secret ARN differs from the primary secret ARN only in its Region.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/replicate-secrets.html
  - id: key
    text: A replica can use a selected KMS key that must be in the replica Region.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/replicate-secrets.html
  - id: propagate
    text: Rotation runs on the primary secret and the new value propagates to its associated replicas;
      replicas do not need independent rotation schedules.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/replicate-secrets.html
  - id: endpoint
    text: A replicated database secret keeps the source database connection information; extra key-value
      pairs can store Region-specific connection details.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/replicate-secrets.html
  - id: promote
    text: Promoting a replica to standalone stops its link to the primary, allowing independent
      management and replication.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/standalone-secret.html
  - id: partition
    text: Secrets Manager cannot replicate between commercial Regions and specialized Regions such as
      AWS GovCloud (US) or China Regions.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/replicate-secrets.html
  - id: remote
    text: An application can access a secret in another Region without replication by calling the
      endpoint of the Region that stores it.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/replicate-secrets.html
cards:
  - id: secrets-manager-006
    q: How can a multi-Region application read local copies of a Secrets Manager secret?
    a: Replicate the primary secret to the enabled destination Regions. Choose a KMS key in each replica
      Region as needed; rotation at the primary propagates the new value.
    facts:
      - replication
      - key
      - propagate
  - id: secrets-manager-007
    q: Will replicating a Secrets Manager database secret change its connection details to a regional
      database endpoint?
    a: No. The replica keeps the source connection details. Store additional Region-specific key-value
      pairs when different endpoints are needed.
    facts:
      - endpoint
    trap: true
  - id: secrets-manager-026
    q: A Secrets Manager replica must be rotated and managed independently after recovery. What should
      the team do?
    a: Promote it to a standalone secret. This stops its link to the primary and allows independent
      management.
    facts:
      - promote
  - id: secrets-manager-027
    q: How does a Secrets Manager replica ARN differ from its primary ARN?
    a: Only the Region portion differs.
    facts:
      - arn
  - id: secrets-manager-028
    q: Must a Secrets Manager secret be replicated before an application in another Region can retrieve
      it?
    a: No. The application can call the endpoint in the Region that stores the secret. Replication
      provides regional copies.
    facts:
      - remote
      - replication
    trap: true
diagrams:
  - id: secret-regional-value-flow
    title: Primary rotation propagates to regional replicas
    width: 800
    height: 330
    groups:
      - label: Primary Region
        x: 20
        y: 20
        w: 330
        h: 290
        tone: mgmt
        icon: group-region
      - label: Replica Region
        x: 430
        y: 20
        w: 350
        h: 290
        tone: mgmt
        icon: group-region
    nodes:
      - id: primary
        label: Primary secret
        icon: secrets-manager
        x: 95
        y: 125
        w: 180
        h: 72
        tone: security
      - id: replica
        label: Replica secret
        icon: secrets-manager
        x: 515
        y: 70
        w: 180
        h: 72
        tone: security
      - id: app
        label: Application
        icon: res-client
        x: 515
        y: 220
        w: 180
        h: 72
        tone: user
    edges:
      - from: primary
        to: replica
        step: 1
        label: propagate value
      - from: app
        to: replica
        step: 2
        label: retrieve locally
    steps:
      - Rotation at the primary propagates the new secret value to linked replicas.
      - Applications retrieve the regional copy using its regional ARN and endpoint.
---
Secrets Manager regional replication gives applications copies of a secret in selected Regions. The primary secret is the source of updates; a replica stays linked to that source until it is promoted to an independent secret.

### How it works

1. Select enabled destination Regions for the primary secret. Secrets Manager copies encrypted data and metadata, including tags and resource policies.
2. Choose a replica encryption key if needed. That KMS key must be in the replica Region. The replica ARN, the resource's unique AWS identifier, differs from the primary ARN only in its Region.
3. Rotate at the primary. Secrets Manager propagates the new value to the replicas, so each replica does not need its own rotation schedule.
4. Check the secret's connection details. Database host information stays the same in the replica; add Region-specific fields if applications need other database endpoints.
5. When the replica must become independently managed, promote it to standalone. This stops the link to the primary and allows independent replication and management.

### Exam cues

- If the question says applications need local secret access in multiple Regions, think replication, because it creates regional copies.
- If the question says rotation must reach every regional copy, think rotate the primary, because its updated value propagates to replicas.
- If the question says the recovery Region must manage its secret independently, think standalone promotion, because it stops replication from the primary.

### Remember

- Replica ARN: same as primary except for Region.
- Replica KMS key: located in the replica Region.
- Replication preserves source connection details.
- Cross-Region retrieval can also call the secret's original regional endpoint without replication.
- Commercial-to-specialized Region replication is unsupported.

> **Trap:** Replicating a database secret does not replace its host field with the destination Region's database endpoint.
