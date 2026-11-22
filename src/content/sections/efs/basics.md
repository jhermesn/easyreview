---
title: "EFS basics"
level: foundational
order: 5
facts:
  - id: shared-files
    text: "Amazon EFS provides serverless, fully elastic file storage that many clients can share, growing to petabytes without provisioning capacity."
    source: https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html#whatisefs
  - id: lifecycle-ia
    text: The documented default IA transition moves files after 30 days without access in Standard.
    source: https://docs.aws.amazon.com/efs/latest/ug/lifecycle-management-efs.html#lifecycle-management-efs
  - id: lifecycle-archive
    text: The documented default Archive transition moves files after 90 days without access in Standard.
    source: https://docs.aws.amazon.com/efs/latest/ug/lifecycle-management-efs.html#lifecycle-management-efs
  - id: archive-requires-elastic
    text: Archive requires Elastic throughput; an Archive transition policy prevents switching to
      Bursting or Provisioned.
    source: https://docs.aws.amazon.com/efs/latest/ug/features.html#storage-classes
  - id: shared-nfs
    text: EFS provides elastic shared file storage over NFS versions 4.0 and 4.1 for concurrent clients.
    source: https://docs.aws.amazon.com/efs/latest/ug/how-it-works.html#how-it-works
  - id: posix-files
    text: EFS supports POSIX file permissions, using numeric users and groups to control file access.
    source: https://docs.aws.amazon.com/efs/latest/ug/accessing-fs-nfs-permissions.html#accessing-fs-nfs-permissions
  - id: regional-placement
    text: Regional EFS stores data redundantly across multiple AZs in one Region and remains available
      when an AZ is unavailable.
    source: https://docs.aws.amazon.com/efs/latest/ug/features.html#availability-durability
  - id: regional-targets
    text: Regional EFS can have one mount target per AZ; clients should use a target in their own AZ for
      performance and cost.
    source: https://docs.aws.amazon.com/efs/latest/ug/how-it-works.html#how-it-works-ec2
  - id: nfs-port
    text: EFS clients need outbound TCP 2049 to the mount target, and its security group must allow
      inbound TCP 2049 from those clients.
    source: https://docs.aws.amazon.com/efs/latest/ug/network-access.html#network-access
  - id: other-region
    text: An EC2 instance in a different AWS Region from an EFS file system can mount it, after setting the file system Region in efs-utils.
    source: https://docs.aws.amazon.com/efs/latest/ug/mount-different-region.html
  - id: on-premises
    text: "On-premises servers can mount Amazon EFS through a VPC connection over AWS Direct Connect or Site-to-Site VPN."
    source: https://docs.aws.amazon.com/efs/latest/ug/mounting-fs-mount-helper-direct.html
  - id: lifecycle-maximum
    text: "EFS IA and Archive transition policies can use an interval of up to 365 days since files were last accessed in Standard storage."
    source: https://docs.aws.amazon.com/efs/latest/APIReference/API_LifecyclePolicy.html#API_LifecyclePolicy_Contents
cards:
  - id: efs-025
    q: "Many Linux EC2 instances must read and write the same files at the same time. Which AWS storage service fits?"
    a: "Amazon EFS, a shared, elastic file system."
    facts: [shared-files]
  - id: efs-012
    q: What are the documented EFS lifecycle transition defaults for IA and Archive?
    a: After 30 days without access in Standard for IA, and after 90 days for Archive. Archive requires
      Elastic throughput.
    facts:
      - lifecycle-ia
      - lifecycle-archive
      - archive-requires-elastic
  - id: efs-001
    q: Which AWS service gives Linux clients shared POSIX file storage across AZs, and what network
      access does it need?
    a: Regional EFS over NFS. Use a mount target in each client AZ, client outbound TCP 2049, and
      mount-target inbound TCP 2049.
    facts:
      - shared-nfs
      - posix-files
      - regional-placement
      - regional-targets
      - nfs-port
  - id: efs-023
    q: Can an EC2 instance in another AWS Region mount an Amazon EFS file system?
    a: Yes. Configure efs-utils with the file system's Region; the instance also needs network access to the file system.
    facts: [other-region]
  - id: efs-028
    q: "How can on-premises Linux servers mount an Amazon EFS file system?"
    a: "Connect to its VPC through AWS Direct Connect or Site-to-Site VPN."
    facts: [on-premises]
  - id: efs-029
    q: "What is the longest selectable EFS lifecycle interval for moving files from Standard to IA or Archive?"
    a: "365 days since the files were last accessed in Standard."
    facts: [lifecycle-maximum]
---
Amazon Elastic File System (Amazon EFS) is a shared file system that grows and shrinks with the files stored in it.

### How it works

1. Create a file system.
2. Mount it on many instances or containers.
3. Capacity grows and shrinks automatically.

### Exam cues

- If the question says move inactive EFS files to IA or Archive, think lifecycle policies, because the transition uses time since last access in Standard.
- If the question says on-premises Linux servers need shared EFS files, think Direct Connect or Site-to-Site VPN, because either can connect the servers to the VPC.
- If the question says shared file storage for many Linux instances, think EFS.

### Remember

- Elastic, shared, no capacity to provision.

> **Trap:** EFS is shared file storage; EBS is a disk for one instance at a time.
