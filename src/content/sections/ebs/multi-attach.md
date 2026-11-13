---
title: Multi-Attach
level: associate
order: 20
facts:
  - id: eligible
    text: Multi-Attach lets multiple EC2 instances read and write the same io1 or io2 volume in one
      Availability Zone.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html#ebs-volumes-multi
  - id: limit
    text: A Multi-Attach volume can attach to up to 16 Nitro-based instances in the same AZ.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html#considerations
  - id: os
    text: Linux supports Multi-Attach io1 and io2; Windows supports Multi-Attach io2 only.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html#considerations
  - id: filesystem
    text: Standard EXT4 and XFS file systems are not designed for simultaneous access from multiple
      servers; use a clustered file system.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html#considerations
  - id: coordination
    text: Applications must order writes across attached instances; I/O fencing controls write access to
      preserve data consistency.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html#considerations
  - id: boot
    text: Multi-Attach volumes cannot be boot volumes.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html#considerations
  - id: shared-failure
    text: An issue at the EBS infrastructure layer can make a Multi-Attach volume unavailable to every
      attached instance.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html#considerations
  - id: capacity
    text: Provisioned Multi-Attach volume performance is shared across all attached instances.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-multi-attach-perf.html#ebs-multi-attach-perf
  - id: termination
    text: The last attached instance termination determines volume deletion according to its
      delete-on-termination setting.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html#considerations
  - id: modify-attach
    text: Multi-Attach cannot be enabled or disabled while the volume is attached to an instance.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html#considerations
cards:
  - id: ebs-012
    q: Can several EC2 instances share any EBS volume with Multi-Attach?
    a: No. Multi-Attach supports io1 or io2 with up to 16 Nitro-based instances in the same AZ. Linux
      supports both; Windows supports io2 only. Coordinate concurrent writes.
    trap: true
    facts:
      - eligible
      - limit
      - os
      - coordination
  - id: ebs-022
    q: Two EC2 instances mount the same Multi-Attach EBS volume using ordinary EXT4 and write
      concurrently. Is attachment permission enough to preserve the data?
    a: No. Use a clustered file system and coordinate write ordering. Ordinary EXT4 and XFS do not
      support this shared-writer design.
    trap: true
    facts:
      - filesystem
      - coordination
  - id: ebs-023
    q: An application needs two EC2 instances in different AZs to share one EBS io2 Multi-Attach volume.
      Does Multi-Attach meet the requirement?
    a: No. All attached instances must be in the same AZ as the volume.
    trap: true
    facts:
      - limit
  - id: ebs-024
    q: An EBS Multi-Attach volume is provisioned for a given IOPS rate. Does every attached EC2 instance
      receive that entire rate independently?
    a: No. The volume performance is shared across attached instances.
    trap: true
    facts:
      - capacity
  - id: ebs-025
    q: What determines whether an EBS Multi-Attach volume is deleted when its final attached instance
      terminates?
    a: The delete-on-termination setting in the final instance attachment. Use consistent settings
      across attachments for predictable behavior.
    facts:
      - termination
diagrams:
  - id: ebs-multi-attach-shared-volume
    title: Two coordinated writers share one volume inside an AZ
    width: 900
    height: 380
    groups:
      - label: One Availability Zone
        x: 20
        y: 20
        w: 860
        h: 330
        tone: mgmt
    nodes:
      - id: a
        label: EC2 writer A
        icon: res-ec2-instance
        x: 80
        y: 90
        w: 180
        h: 72
        tone: compute
      - id: b
        label: EC2 writer B
        icon: res-ec2-instance
        x: 80
        y: 240
        w: 180
        h: 72
        tone: compute
      - id: v
        label: Shared io2 volume
        icon: res-elastic-block-store-volume
        x: 620
        y: 165
        w: 180
        h: 72
        tone: storage
    edges:
      - from: a
        to: v
        label: coordinated writes
      - from: b
        to: v
        label: coordinated writes
    steps: []
---
EBS Multi-Attach connects one io1 or io2 volume to several EC2 instances in the same Availability Zone (AZ). It supports applications designed to coordinate access to shared block storage; it does not provide that coordination for them.

### How it works

1. Enable Multi-Attach on an eligible io1 or io2 volume and attach it to supported Nitro-based instances, EC2 instances built on AWS's Nitro platform, in the same AZ.
2. Each attached instance can read and write the volume. All attachments share its provisioned performance.
3. Use a clustered file system, software designed to coordinate shared disk access, and application write ordering. I/O fencing controls which instances can write so a conflicting writer cannot damage shared data.
4. Set consistent delete-on-termination behavior. The last attached instance's setting determines deletion when that instance terminates.

| Requirement | Support |
|---|---|
| Volume types | io1 and io2 |
| Linux | io1 and io2 |
| Windows | io2 only |
| Placement | Same AZ; up to 16 Nitro-based instances |
| Boot volume | Unsupported |

### Exam cues

- If the question says an application coordinates shared disk writes within one AZ, think Multi-Attach, because supported instances can access one io1 or io2 volume.
- If the question says ordinary EXT4 or XFS should be mounted by concurrent writers, think a clustered file system, because standard file systems do not coordinate this access.
- If the question says instances in different AZs must attach to one volume, think an unmet placement requirement, because Multi-Attach stays within one AZ.

### Remember

- Multi-Attach supports up to 16 Nitro-based instances per volume in the same AZ.
- Windows supports io2 only; Linux supports io1 and io2.
- An EBS infrastructure issue can affect every attachment to the shared volume.
- Detach the volume before enabling or disabling Multi-Attach.

> **Trap:** Multi-Attach adds attachments, not independent copies. It does not turn one AZ's volume into storage shared across AZs.
