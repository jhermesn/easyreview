---
title: "EBS basics"
level: foundational
order: 5
facts:
  - id: block-storage
    text: "Amazon EBS provides scalable, high-performance block storage volumes for use with Amazon EC2 instances."
    source: https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html#what-is-ebs
  - id: instance-store
    text: "An instance store gives an EC2 instance temporary block storage on disks physically attached to the host, suited to buffers, caches and scratch data."
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html#InstanceStorage
  - id: snapshot
    text: An EBS snapshot is a point-in-time backup; each snapshot contains the information needed to
      restore the captured data to a new volume.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html#ebs-snapshots
  - id: incremental
    text: EBS snapshots store only blocks changed since the preceding snapshot.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html#ebs-snapshots
  - id: deletion
    text: Deleting an older EBS snapshot preserves blocks referenced by other snapshots.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html#ebs-snapshots
  - id: billed-stored
    text: EBS snapshot charges are based on the data stored; because snapshots are incremental, only changed blocks add storage.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html
  - id: stored-in-s3
    text: EBS snapshots are stored in Amazon S3, in buckets the customer can't access directly.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html
  - id: hdd-boot
    text: Neither st1 nor sc1 can be an EC2 boot volume.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/hdd-vols.html#hdd-vols
  - id: ssd-boot
    text: General Purpose SSD volumes are suitable for boot volumes.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html#general-purpose
  - id: same-az
    text: An EBS volume and the instance it attaches to must be in the same Availability Zone; EBS volumes persist independently of the instance.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes.html
  - id: pricing-dimensions
    text: EBS charges for provisioned storage per GB-month by volume type, for provisioned IOPS and throughput above what is included, and for snapshot storage.
    source: https://aws.amazon.com/ebs/pricing/
cards:
  - id: ebs-052
    q: "An EC2 instance needs a persistent disk for its operating system and database. Which AWS storage service fits?"
    a: "Amazon EBS, block storage volumes attached to EC2 instances."
    facts: [block-storage]
  - id: ebs-053
    q: "An EC2 workload needs very fast scratch disk space whose data can be lost. EBS or instance store?"
    a: "Instance store, temporary block storage on disks attached to the host. Data that must persist belongs on EBS."
    facts: [instance-store]
  - id: ebs-003
    q: Do incremental EBS snapshots require retaining every older snapshot to restore a full volume?
    a: No. Each snapshot has the information needed to restore its captured data, and deleting an older
      snapshot preserves blocks used by other snapshots.
    facts:
      - snapshot
      - incremental
      - deletion
  - id: ebs-044
    q: A 500 GiB EBS volume has 20 GiB of changes since its last snapshot. Does the new snapshot add 500 GiB of storage charges?
    a: No. Snapshots are incremental and billed on data stored, so the new snapshot adds only the changed blocks.
    trap: true
    facts: [billed-stored, stored-in-s3]
  - id: ebs-011
    q: Can an EC2 instance boot from an EBS st1 or sc1 HDD volume?
    a: No. Neither HDD type supports boot volumes. General Purpose SSD supports boot use.
    trap: true
    facts:
      - hdd-boot
      - ssd-boot
  - id: ebs-041
    q: Can an EC2 instance in us-east-1a attach an EBS volume created in us-east-1b?
    a: No. An EBS volume attaches only to instances in its own Availability Zone. Use a snapshot to create a volume in the other AZ.
    trap: true
    facts: [same-az]
  - id: ebs-055
    q: "Which factors determine the charge for an Amazon EBS volume?"
    a: "Provisioned storage per GB-month by volume type, provisioned IOPS and throughput above what the volume type includes, and snapshot storage."
    facts: [pricing-dimensions]
---
Amazon Elastic Block Store (Amazon EBS) gives EC2 instances network-attached disks (block storage) that keep data when the instance stops. [What is Amazon EBS?](https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html#what-is-ebs)

### How it works

1. Create a volume and attach it to an EC2 instance.
2. The instance uses it like a local disk.
3. Snapshots back the volume up.

### Exam cues

- If the question says a disk for one EC2 instance, think EBS.

### Remember

- Block storage for EC2.

> **Trap:** EBS is a disk for an instance; shared file storage across many instances is Amazon EFS.
