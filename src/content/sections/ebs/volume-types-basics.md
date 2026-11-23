---
title: Volume type basics
level: foundational
order: 7
facts:
  - id: general-purpose
    text: AWS recommends General Purpose SSD volumes for most workloads.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html#general-purpose
  - id: provisioned-iops
    text: Provisioned IOPS SSD volumes suit workloads that need sustained IOPS performance.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html#vol-type-ssd
  - id: iops-meaning
    text: IOPS measures input and output operations per second.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-io-characteristics.html#ebs-io-iops
  - id: throughput-hdd
    text: Throughput Optimized HDD volumes suit frequently accessed, large sequential workloads such as log processing.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/hdd-vols.html#EBSVolumeTypes_st1
  - id: cold-hdd
    text: Cold HDD volumes suit infrequently accessed, large sequential data.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/hdd-vols.html#EBSVolumeTypes_sc1
  - id: no-hdd-boot
    text: Throughput Optimized HDD and Cold HDD volumes cannot be used as boot volumes.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html#vol-type-hdd
  - id: ssd-boot
    text: General Purpose SSD volumes support use as boot volumes.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html#general-purpose
  - id: io-patterns
    text: EBS SSD volumes handle small or random I/O, while HDD volumes are optimized for large sequential I/O.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-io-characteristics.html
cards:
  - id: ebs-063
    q: Which Amazon EBS volume family does AWS recommend for most workloads?
    a: General Purpose SSD. It is a starting choice for a broad range of workloads.
    facts: [general-purpose]
  - id: ebs-064
    q: An Amazon EBS database workload needs sustained high IOPS. Which volume family fits?
    a: Provisioned IOPS SSD. It suits workloads that need sustained IOPS performance.
    facts: [provisioned-iops]
  - id: ebs-067
    q: Can an Amazon EBS Throughput Optimized HDD or Cold HDD volume boot an EC2 instance?
    a: No. Use a supported boot volume such as General Purpose SSD.
    trap: true
    facts: [no-hdd-boot, ssd-boot]
  - id: ebs-058
    q: Which EBS HDD volume type fits frequently accessed sequential data, and which fits less frequently accessed data?
    a: Throughput Optimized HDD fits frequent access; Cold HDD fits less frequent access.
    facts: [throughput-hdd]
  - id: ebs-059
    q: Which EBS volume family fits small random I/O, and which favors large sequential I/O?
    a: SSD volumes handle small or random I/O; HDD volumes favor large sequential I/O.
    facts: [io-patterns]
  - id: ebs-018
    q: "A job reads large log files in order every hour, and an archive of sequential data is read twice a year. Which Amazon EBS HDD volume type fits each?"
    a: st1 for frequently accessed sequential workloads; sc1 for infrequently accessed sequential data
      where lower cost matters.
    facts:
      - throughput-hdd
      - cold-hdd
---
Amazon EBS offers volume families for different storage workloads. Choose based on how often data is accessed and the performance the workload needs.

### How it works

1. Start with General Purpose SSD for most workloads.
2. Consider Provisioned IOPS SSD when the workload needs sustained high IOPS, or input and output operations per second.
3. Consider an HDD volume for large sequential data. Sequential access reads or writes data in order.
4. Check whether the volume must boot an instance. The HDD choices cannot be boot volumes.

| Volume family | Fits |
|---|---|
| General Purpose SSD | Most workloads |
| Provisioned IOPS SSD | Sustained high IOPS |
| Throughput Optimized HDD | Frequent access to large sequential data, such as logs |
| Cold HDD | Infrequent access to large sequential data |

### Exam cues

- If the question says a database needs sustained high IOPS, think Provisioned IOPS SSD, because it suits sustained IOPS workloads.
- If the question says frequent large sequential log reads, think Throughput Optimized HDD, because it suits frequently accessed sequential data.
- If the question says large sequential data is rarely accessed, think Cold HDD, because it suits infrequent access.
- If the question says small or random I/O, think an SSD volume, because HDD volumes are built for large sequential I/O.
- If the question says an instance needs a boot volume, think General Purpose SSD, because it supports boot volumes.

### Remember

- General Purpose SSD is the recommended starting choice for most workloads.
- Throughput Optimized HDD and Cold HDD cannot be boot volumes.

> **Trap:** A workload may suit HDD storage for its data, but it needs a supported volume type to boot the instance.
