---
title: Volume types
level: associate
order: 10
facts:
  - id: block-storage
    text: An EBS volume attaches to an EC2 instance and can be used like a local disk; EBS offers SSD
      and HDD volume types.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html#what-is-ebs
  - id: iops
    text: IOPS measures input/output operations per second; I/O size also affects the throughput reached
      by a volume.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-io-characteristics.html#ebs-io-characteristics
  - id: gp3-independent
    text: gp3 lets you provision performance independently of volume size and does not use burst
      performance.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html#gp3-ebs-volume-type
  - id: gp3-baseline
    text: gp3 includes a baseline of 3000 IOPS and 125 MiB/s of throughput.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html#gp3-performance
  - id: gp2-baseline
    text: gp2 baseline performance scales at 3 IOPS per GiB, with a minimum of 100 and maximum of 16000
      IOPS.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html#gp2-performance
  - id: gp2-credits
    text: Small gp2 volumes with a baseline below 3000 IOPS can burst to 3000 IOPS while I/O credits
      last; BurstBalance reports remaining credits.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html#gp2-performance
  - id: io2
    text: io2 Block Express targets demanding workloads with low latency and higher durability than
      General Purpose SSD.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/provisioned-iops.html#io2-block-express
  - id: io2-date
    text: Since April 30, 2025, all new and existing io2 volumes use Block Express.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/provisioned-iops.html#io2-bx-considerations
  - id: st1
    text: Throughput Optimized HDD (st1) targets frequently accessed, large sequential workloads such as
      log processing.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/hdd-vols.html#EBSVolumeTypes_st1
  - id: sc1
    text: Cold HDD (sc1) targets infrequently accessed large sequential data at lower cost than st1.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/hdd-vols.html#EBSVolumeTypes_sc1
  - id: hdd-boot
    text: Neither st1 nor sc1 can be an EC2 boot volume.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/hdd-vols.html#hdd-vols
  - id: ssd-boot
    text: General Purpose SSD volumes are suitable for boot volumes.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html#general-purpose
  - id: instance-limit
    text: Realized EBS performance depends on instance configuration and I/O demand, not only the
      selected volume performance.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html#ebs-volume-types
  - id: elastic-change
    text: Elastic Volumes can migrate a gp2 volume to gp3 and modify type, IOPS and throughput without
      interrupting its EC2 instance.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html#migrate-to-gp3
  - id: defaults
    text: The create-volume console defaults to gp3; command line tools, API and SDK default to gp2.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-creating-volume.html#ebs-creating-volume
  - id: eks-driver
    text: The EBS Container Storage Interface (CSI) driver manages EBS volume lifecycles for Kubernetes
      storage and needs IAM permissions to call AWS APIs.
    source: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#ebs-csi
  - id: eks-identity
    text: Configure EBS CSI driver permissions with EKS Pod Identity or IAM roles for service accounts,
      associating the role with the controller identity.
    source: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#csi-iam-role
  - id: eks-fargate
    text: Amazon EBS volumes cannot be mounted to EKS Fargate Pods.
    source: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#ebs-csi-considerations
  - id: io1
    text: io1 volumes provide a configured IOPS rate for I/O-intensive workloads, particularly databases
      sensitive to consistent storage performance.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/provisioned-iops.html#EBSVolumeTypes_piops
  - id: auto-mode
    text: EKS Auto Mode does not require installing the EBS CSI controller and uses the
      ebs.csi.eks.amazonaws.com provisioner separately from the standard CSI driver.
    source: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#ebs-csi-considerations
  - id: storage-class
    text: An EKS Auto Mode StorageClass defines volume provisioning settings such as volume type and
      encryption.
    source: https://docs.aws.amazon.com/eks/latest/userguide/create-storage-class.html#create-storage-class
  - id: same-az
    text: An EBS volume and the instance it attaches to must be in the same Availability Zone; EBS volumes persist independently of the instance.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes.html
  - id: pricing-dimensions
    text: EBS charges for provisioned storage per GB-month by volume type, for provisioned IOPS and throughput above what is included, and for snapshot storage.
    source: https://aws.amazon.com/ebs/pricing/
cards:
  - id: ebs-010
    q: When should an EC2 workload choose EBS gp3 rather than io2 Block Express?
    a: Use gp3 for general-purpose SSD storage with independently configured performance. Choose io2
      Block Express for demanding workloads that need lower latency and higher durability.
    facts:
      - gp3-independent
      - io2
  - id: ebs-011
    q: Can an EC2 instance boot from an EBS st1 or sc1 HDD volume?
    a: No. Neither HDD type supports boot volumes. General Purpose SSD supports boot use.
    trap: true
    facts:
      - hdd-boot
      - ssd-boot
  - id: ebs-016
    q: A small EBS gp2 volume slows after a period of heavy database I/O. Which metric and storage
      behavior should the team inspect?
    a: Inspect BurstBalance. gp2 can spend credits to exceed its size-based baseline; performance falls
      back when credits run out.
    facts:
      - gp2-baseline
      - gp2-credits
  - id: ebs-017
    q: An EC2 workload needs more EBS IOPS without buying extra disk space or depending on burst
      credits. Which general-purpose volume type fits?
    a: gp3. Its performance is configured independently of size and it does not use burst credits.
    facts:
      - gp3-independent
  - id: ebs-018
    q: Which EBS HDD types fit frequent sequential log processing versus infrequently read sequential
      data?
    a: st1 for frequently accessed sequential workloads; sc1 for infrequently accessed sequential data
      where lower cost matters.
    facts:
      - st1
      - sc1
  - id: ebs-019
    q: What EBS gp3 performance is included before provisioning extra IOPS or throughput?
    a: 3000 IOPS and 125 MiB/s.
    facts:
      - gp3-baseline
  - id: ebs-020
    q: An EKS application cannot provision EBS storage and reports UnauthorizedOperation. What should
      the team check?
    a: The EBS CSI controller needs an IAM role with EBS API permissions, connected through EKS Pod
      Identity or IAM roles for service accounts.
    facts:
      - eks-driver
      - eks-identity
  - id: ebs-021
    q: Can an EKS Fargate Pod mount an EBS volume through the EBS CSI driver?
    a: No. EBS volumes cannot be mounted to Fargate Pods.
    trap: true
    facts:
      - eks-fargate
  - id: ebs-041
    q: Can an EC2 instance in us-east-1a attach an EBS volume created in us-east-1b?
    a: No. An EBS volume attaches only to instances in its own Availability Zone. Use a snapshot to create a volume in the other AZ.
    trap: true
    facts: [same-az]
  - id: ebs-042
    q: What does Amazon EBS charge for?
    a: Provisioned storage (GB-month, by volume type), provisioned IOPS and throughput above the included amount, and snapshot storage.
    facts: [pricing-dimensions]
---
Amazon EBS provides block storage, disks attached to EC2 instances. Choose solid-state drive (SSD) storage for transactional I/O, meaning application reads and writes, and hard disk drive (HDD) storage for large sequential transfers.

### How it works

1. Identify the access pattern. IOPS means input/output operations per second. Throughput is the amount of data transferred per second; MiB/s means mebibytes per second. Large transfers can reach a throughput limit before an IOPS limit.
2. Choose a volume type from the table. Provision the size and performance the workload needs.
3. Check the EC2 instance's storage performance limits too. A faster volume cannot remove an instance bottleneck.
4. For gp2 performance changes, consider Elastic Volumes to migrate to gp3 without interrupting the instance.

| Type | Performance model | Typical use |
|---|---|---|
| gp3 SSD | Performance independent of size; no burst credits | General-purpose disks and boot volumes |
| gp2 SSD | Size-based baseline; smaller volumes can spend burst credits | Existing general-purpose disks |
| io2 Block Express SSD | Provisioned performance, low latency and higher durability | Demanding databases |
| io1 SSD | Provisioned IOPS | IOPS-intensive storage |
| st1 HDD | Throughput for frequent sequential I/O | Log processing and large sequential workloads |
| sc1 HDD | Lower-cost throughput for infrequent sequential I/O | Cold data |

Burst credits are an allowance for performance above a volume's baseline. gp2 uses them; gp3 does not. Since April 2025, all io2 volumes use Block Express.

For Kubernetes on EKS, the standard EBS Container Storage Interface (CSI) driver manages volume creation and attachment for application storage. Its controller needs an IAM role, an AWS permissions identity, associated through EKS Pod Identity or IAM roles for service accounts. EBS volumes cannot be mounted to Fargate Pods.

EKS Auto Mode manages block storage without installing that CSI controller. Its StorageClass, a set of rules for provisioning disks, uses the separate `ebs.csi.eks.amazonaws.com` provisioner to set volume type and encryption.

### Exam cues

- If the question says a small gp2 disk slows after sustained I/O, think BurstBalance, because its above-baseline performance consumes credits.
- If the question says storage size is sufficient but performance must increase, think gp3, because IOPS and throughput can be provisioned independently of size.
- If the question says large sequential logs are read frequently, think st1, because it targets frequent sequential transfers.
- If the question says sequential data is rarely read and cost matters, think sc1, because it targets infrequent access.
- If the question says EKS EBS provisioning fails with UnauthorizedOperation, think CSI controller permissions, because the driver calls AWS APIs.

### Remember

- gp3 includes 3000 IOPS and 125 MiB/s.
- gp2 baseline is 3 IOPS per GiB, bounded by 100 and 16000 IOPS. Eligible small volumes can burst to 3000 IOPS.
- st1 and sc1 cannot boot an EC2 instance.
- For direct volume creation, the console defaults to gp3; command line tools, API and SDK default to gp2.
- EBS volume and instance: same AZ.

> **Trap:** An EBS IOPS setting alone does not establish application performance. The I/O size, instance limits and workload demand also matter.
