---
title: Encryption and Regional copies
level: professional
order: 60
facts:
  - id: kms
    text: EBS encryption uses AWS KMS encryption keys and protects data at rest and data in transit
      between an EC2 instance and its attached volume.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-encryption.html#ebs-encryption
  - id: regional
    text: Snapshots are regional; copy a snapshot to the destination Region before sharing or restoring
      it there.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-modifying-snapshot-permissions.html#share-snapshot-considerations
  - id: completed
    text: Copy an EBS snapshot after it reaches completed state; the copy has its own resource ID.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-copy-snapshot.html#ebs-copy-snapshot
  - id: change-key
    text: You cannot change the key on an existing EBS volume or snapshot; copying a snapshot can
      encrypt the copy with a different key.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-encryption.html#encryption-parameters
  - id: encrypt-existing
    text: Create a snapshot of an unencrypted volume, copy the snapshot with encryption, then create an
      encrypted replacement volume from the copy.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/encryption-examples.html#encryption-examples
  - id: direct-encrypt
    text: An encrypted replacement volume can also be created directly from an unencrypted snapshot by
      enabling encryption during volume creation.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/encryption-examples.html#encryption-examples
  - id: replace
    text: After creating a replacement EBS volume, unmount and detach the old volume, attach the
      replacement in the same AZ, and mount it.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-restoring-volume.html#ebs-restoring-volume
  - id: defaults
    text: Encryption by default is an account setting per Region that applies to new volumes and
      snapshot copies; it does not change existing resources.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/encryption-by-default.html#encryption-by-default
  - id: inherit
    text: A snapshot from an encrypted volume inherits encryption and its KMS key; data restored from an
      encrypted snapshot remains encrypted.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-creating-snapshot.html#create-snapshot-encryption
  - id: no-decrypt
    text: EBS cannot remove encryption when copying an encrypted snapshot or restoring a volume from it.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-encryption.html#new-encrypted-volumes
  - id: sharing
    text: Encrypted EBS snapshot sharing requires a customer managed key and access to both the snapshot
      and the key; default AWS managed key snapshots cannot be shared.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-modifying-snapshot-permissions.html#share-snapshot-considerations
  - id: destination-key
    text: DLM cross-Region snapshot copies use a KMS key in the destination Region; a selected key must
      be accessible to the policy role.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/snapshot-ami-policy.html#create-snap-policy
  - id: config
    text: The AWS Config encrypted-volumes rule evaluates attached EBS volumes and can flag missing
      encryption or use of a key outside its optional kmsId parameter.
    source: https://docs.aws.amazon.com/config/latest/developerguide/encrypted-volumes.html#encrypted-volumes
cards:
  - id: ebs-002
    q: How can an EC2 workload recover an encrypted EBS volume in another AWS Region?
    a: Copy its completed snapshot to the target Region using an accessible destination key, then create
      a new encrypted volume in the target instance AZ.
    facts:
      - regional
      - completed
      - destination-key
      - replace
  - id: ebs-013
    q: How can a team encrypt an existing unencrypted EBS volume using a snapshot copy?
    a: Snapshot it, create an encrypted snapshot copy, restore a new encrypted volume, then replace the
      original volume. A direct encrypted restore from the unencrypted snapshot is also supported.
    facts:
      - encrypt-existing
      - direct-encrypt
      - replace
  - id: ebs-037
    q: An account enables EBS encryption by default in one Region. Are its existing volumes encrypted
      and its other Regions covered automatically?
    a: No. The setting is Region-specific and does not modify existing volumes or snapshots.
    trap: true
    facts:
      - defaults
  - id: ebs-038
    q: An encrypted EBS snapshot uses the default AWS managed key. Can its owner share it with a
      recovery account?
    a: No. Copy it under a customer managed key, then share the snapshot and grant the recovery account
      access to that key.
    trap: true
    facts:
      - sharing
      - change-key
  - id: ebs-039
    q: Which AWS Config rule can identify attached EBS volumes that are unencrypted or use an unexpected
      KMS key?
    a: encrypted-volumes. Its optional kmsId parameter specifies the expected encryption key.
    facts:
      - config
  - id: ebs-040
    q: Can an encrypted EBS snapshot be copied into an unencrypted snapshot to simplify regional
      recovery?
    a: No. EBS preserves encryption for copies and restored volumes from encrypted snapshots.
    trap: true
    facts:
      - no-decrypt
diagrams:
  - id: ebs-encrypted-regional-recovery
    title: Copy an encrypted snapshot before regional recovery
    width: 1160
    height: 280
    nodes:
      - id: source
        label: Source snapshot
        icon: res-elastic-block-store-snapshot
        x: 60
        y: 105
        w: 180
        h: 72
        tone: storage
      - id: copy
        label: Snapshot copy
        icon: res-elastic-block-store-snapshot
        x: 480
        y: 105
        w: 180
        h: 72
        tone: storage
      - id: volume
        label: Restored volume
        icon: res-elastic-block-store-volume
        x: 900
        y: 105
        w: 180
        h: 72
        tone: storage
    edges:
      - from: source
        to: copy
        step: 1
        label: copy with key
      - from: copy
        to: volume
        step: 2
        label: restore
    steps:
      - Copy the completed snapshot into the recovery Region with an accessible destination key.
      - Create an encrypted volume in the recovery instance AZ and attach it there.
    groups:
      - label: Source Region
        icon: group-region
        x: 20
        y: 20
        w: 300
        h: 230
        tone: mgmt
      - label: Recovery Region
        icon: group-region
        x: 430
        y: 20
        w: 710
        h: 230
        tone: mgmt
---
EBS encryption protects stored data and the transfer between an EC2 instance and its attached disk. It uses AWS KMS keys, encryption keys managed through AWS Key Management Service. Regional recovery adds a snapshot copy in the destination Region and access to a suitable encryption key.

### How it works

1. Create a snapshot and wait for its `completed` state before copying it. Copy the snapshot to the recovery Region; the copy has its own resource ID.
2. Select an accessible destination-Region KMS key for the copy when required. You can encrypt an unencrypted snapshot copy or use a different key for an encrypted copy.
3. Create the replacement volume in the recovery instance's Availability Zone (AZ). An encrypted snapshot produces an encrypted volume.
4. For replacement on an existing instance, unmount and detach the old disk, then attach and mount the replacement. You change the data's encryption by creating a replacement resource, not by changing an existing disk's key.

To encrypt an existing unencrypted disk, take a snapshot, make an encrypted copy and restore a replacement volume. You can also create an encrypted replacement directly from the unencrypted snapshot.

| Requirement | Mechanism | Constraint |
|---|---|---|
| Encrypt future volumes and snapshot copies | EBS encryption by default | Per account and Region; existing resources stay unchanged |
| Change an existing resource's key | Snapshot copy with another KMS key | Creates a new resource |
| Share an encrypted snapshot | Customer managed key plus snapshot and key permissions | Default AWS managed key snapshots cannot be shared |
| Evaluate attached-volume encryption | AWS Config `encrypted-volumes` | Optional `kmsId` checks the expected key |

### Exam cues

- If the question says recover encrypted EBS data in another Region, think snapshot copy and destination key access, because the source snapshot is regional.
- If the question says enabling encryption by default should fix existing disks, think encrypted replacement volumes, because the setting only affects new resources.
- If the question says an encrypted snapshot must be shared with another account, think a customer managed key and both permissions, because snapshot permission alone is insufficient.

### Remember

- You cannot change the key attached to an existing EBS volume or snapshot.
- Snapshot copies can use a different key.
- Encryption by default is Region-specific.
- EBS does not remove encryption when restoring or copying encrypted snapshots.
- AWS Config's encryption rule evaluates attached volumes.

> **Trap:** A shared encrypted snapshot still requires key access. A snapshot encrypted with the default AWS managed key must first be copied under a customer managed key before sharing.
