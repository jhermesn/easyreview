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
cards:
  - id: ebs-052
    q: "An EC2 instance needs a persistent disk for its operating system and database. Which AWS storage service fits?"
    a: "Amazon EBS, block storage volumes attached to EC2 instances."
    facts: [block-storage]
  - id: ebs-053
    q: "An EC2 workload needs very fast scratch disk space whose data can be lost. EBS or instance store?"
    a: "Instance store, temporary block storage on disks attached to the host. Data that must persist belongs on EBS."
    facts: [instance-store]
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
