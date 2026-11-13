---
title: Regional and One Zone file systems
level: associate
order: 10
facts:
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
  - id: one-zone-placement
    text: One Zone EFS stores data in one AZ, so a disaster affecting all copies in that AZ can cause
      data loss.
    source: https://docs.aws.amazon.com/efs/latest/ug/features.html#availability-durability
  - id: regional-targets
    text: Regional EFS can have one mount target per AZ; clients should use a target in their own AZ for
      performance and cost.
    source: https://docs.aws.amazon.com/efs/latest/ug/how-it-works.html#how-it-works-ec2
  - id: one-zone-target
    text: One Zone EFS has a single mount target in its storage AZ; clients in other AZs can access it
      but incur cross-AZ data access charges.
    source: https://docs.aws.amazon.com/efs/latest/ug/how-it-works.html#how-it-works-ec2
  - id: nfs-port
    text: EFS clients need outbound TCP 2049 to the mount target, and its security group must allow
      inbound TCP 2049 from those clients.
    source: https://docs.aws.amazon.com/efs/latest/ug/network-access.html#network-access
  - id: gp-default
    text: General Purpose is the default performance mode and has lower per-operation latency than Max
      I/O; One Zone always uses General Purpose.
    source: https://docs.aws.amazon.com/efs/latest/ug/performance.html#performancemodes
  - id: maxio-restrictions
    text: Max I/O is a previous-generation mode with higher latency and is unsupported with One Zone or
      Elastic throughput; AWS recommends General Purpose.
    source: https://docs.aws.amazon.com/efs/latest/ug/performance.html#performancemodes
  - id: elastic-throughput
    text: Elastic is the default throughput mode, automatically follows workload demand, and does not
      use burst credits.
    source: https://docs.aws.amazon.com/efs/latest/ug/performance.html#elastic
  - id: provisioned-throughput
    text: Provisioned throughput lets you specify throughput independently of file system size and
      burst-credit balance.
    source: https://docs.aws.amazon.com/efs/latest/ug/performance.html#provisioned-throughput
  - id: bursting-throughput
    text: Bursting throughput bases baseline capacity on data stored in Standard and uses credits for
      activity above baseline.
    source: https://docs.aws.amazon.com/efs/latest/ug/performance.html#bursting
  - id: lifecycle-timer
    text: EFS lifecycle policies apply across a file system and use an internal last-access timer rather
      than visible POSIX access attributes.
    source: https://docs.aws.amazon.com/efs/latest/ug/lifecycle-management-efs.html#lifecycle-management-efs
  - id: lifecycle-ia
    text: The documented default IA transition moves files after 30 days without access in Standard.
    source: https://docs.aws.amazon.com/efs/latest/ug/lifecycle-management-efs.html#lifecycle-management-efs
  - id: lifecycle-archive
    text: The documented default Archive transition moves files after 90 days without access in Standard.
    source: https://docs.aws.amazon.com/efs/latest/ug/lifecycle-management-efs.html#lifecycle-management-efs
  - id: lifecycle-return
    text: Files do not return from IA or Archive to Standard on access by default; configure On first
      access to enable return.
    source: https://docs.aws.amazon.com/efs/latest/ug/lifecycle-management-efs.html#lifecycle-management-efs
  - id: archive-requires-elastic
    text: Archive requires Elastic throughput; an Archive transition policy prevents switching to
      Bursting or Provisioned.
    source: https://docs.aws.amazon.com/efs/latest/ug/features.html#storage-classes
  - id: ecs-persistence
    text: EFS volumes let ECS tasks access the same persistent files across container instances; Linux
      Fargate tasks support EFS on platform 1.4.0 or later.
    source: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/efs-volumes.html#efs-volumes
  - id: eks-persistence
    text: EKS supports EFS persistent volumes on Fargate using static provisioning, where the volume is
      prepared in advance; dynamic provisioning is unsupported there.
    source: https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html#efs-csi
  - id: eks-no-ebs
    text: EBS volumes cannot be mounted to EKS Fargate pods.
    source: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html#ebs-csi
cards:
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
  - id: efs-002
    q: How do EFS Regional and One Zone differ in data placement and AZ failure exposure?
    a: Regional stores data across multiple AZs and tolerates an unavailable AZ. One Zone stores all
      copies in one AZ, so an AZ disaster affecting those copies can cause data loss.
    facts:
      - regional-placement
      - one-zone-placement
  - id: efs-006
    q: A Linux application runs in three AZs and needs one writable shared directory available during an
      AZ outage. Which EFS configuration fits?
    a: Regional EFS with a mount target in each client AZ. It stores data across AZs and lets those
      clients share one file system.
    facts:
      - shared-nfs
      - regional-placement
      - regional-targets
  - id: efs-007
    q: An EFS workload has unpredictable throughput and should not manage burst credits. Which
      throughput mode fits?
    a: Elastic throughput. It automatically follows workload demand and does not use burst credits.
    facts:
      - elastic-throughput
  - id: efs-008
    q: An EFS workload needs a known throughput level independent of stored size. Which mode fits?
    a: Provisioned throughput. Bursting instead depends on Standard storage size and available credits.
    facts:
      - provisioned-throughput
      - bursting-throughput
  - id: efs-009
    q: An EFS application needs low per-operation latency. Should the team select Max I/O simply because
      it expects parallel access?
    a: Use General Purpose, the default AWS recommendation. Max I/O has higher per-operation latency and
      is unsupported with One Zone or Elastic throughput.
    trap: true
    facts:
      - gp-default
      - maxio-restrictions
  - id: efs-010
    q: An EFS file has moved to IA and becomes active again. Does a read automatically return it to
      Standard under the default policy?
    a: No. Configure the return-to-Standard policy as On first access. The default keeps accessed files
      in IA or Archive.
    trap: true
    facts:
      - lifecycle-return
  - id: efs-011
    q: EKS Fargate pods need shared persistent files. Which storage option fits, and how should volumes
      be provisioned?
    a: EFS with statically provisioned persistent volumes. EFS dynamic provisioning is unsupported on
      Fargate, and EBS volumes cannot be mounted to Fargate pods.
    facts:
      - eks-persistence
      - eks-no-ebs
  - id: efs-012
    q: What are the documented EFS lifecycle transition defaults for IA and Archive?
    a: After 30 days without access in Standard for IA, and after 90 days for Archive. Archive requires
      Elastic throughput.
    facts:
      - lifecycle-ia
      - lifecycle-archive
      - archive-requires-elastic
diagrams:
  - id: efs-regional-clients
    title: Clients in different AZs share one Regional file system
    width: 1000
    height: 380
    nodes:
      - id: a
        label: EC2 in AZ A
        icon: res-ec2-instance
        tone: compute
        x: 30
        y: 45
        w: 220
        h: 72
      - id: b
        label: EC2 in AZ B
        icon: res-ec2-instance
        tone: compute
        x: 30
        y: 255
        w: 220
        h: 72
      - id: efs
        label: Regional EFS
        icon: efs
        tone: storage
        x: 720
        y: 150
        w: 230
        h: 72
    edges:
      - from: a
        to: efs
        step: 1
        label: via AZ A target
      - from: b
        to: efs
        step: 2
        label: via AZ B target
    steps:
      - The client in AZ A mounts the shared Regional file system through its local mount target.
      - The client in AZ B mounts the same file system through its own AZ mount target.
---

Amazon EFS provides shared files that multiple clients can read and write over Network File System (NFS), a protocol for accessing files across a network. Regional and One Zone determine where EFS keeps its data; throughput and lifecycle settings control performance and storage placement.

### How it works

1. Choose Regional for data stored across Availability Zones (AZs), separate locations within a Region. One Zone stores all copies within one AZ.
2. Create a mount target, the network address used to mount the file system, in each Regional client AZ. Allow TCP 2049 from clients to the targets. One Zone has one mount target in its storage AZ.
3. Select a performance mode, which affects per-operation latency, and a throughput mode, which controls how much data the file system can move over time.
4. Apply lifecycle policies to move inactive files from Standard into Infrequent Access (IA) or Archive. EFS tracks access using an internal timer rather than the visible POSIX access timestamp. POSIX permissions are the Unix-style user, group, and file permission model.

| Setting | Behavior | Selection cue |
|---|---|---|
| General Purpose performance | Default; lower per-operation latency | AWS recommendation for all file systems |
| Max I/O performance | Previous generation; higher latency | Unsupported on One Zone and with Elastic |
| Elastic throughput | Default; follows demand without credits | Unpredictable activity |
| Provisioned throughput | Capacity specified independently of size | Known throughput requirement |
| Bursting throughput | Baseline follows Standard data size; credits permit bursts | Performance that scales with stored data |

| Compute client | Shared storage behavior |
|---|---|
| EC2 | Multiple NFS clients share a file system |
| ECS, including supported Linux Fargate tasks | EFS volumes persist across task placement |
| EKS Fargate | EFS persistent volumes use static provisioning, prepared in advance |

### Exam cues

- If the question says a shared writable Linux directory must survive an AZ outage, think Regional EFS with local mount targets, because data spans AZs.
- If the question says unpredictable throughput without credit management, think Elastic, because capacity follows workload demand.
- If the question says reduce storage cost for inactive files, think lifecycle policies, because they move content into IA or Archive.
- If the question says EKS Fargate needs shared persistent files, think statically provisioned EFS, because those pods cannot mount EBS volumes.

### Remember

- NFS versions: 4.0 and 4.1. Network port: TCP 2049.
- Regional: one mount target per AZ. One Zone: a single target in its storage AZ; access from other AZs incurs cross-AZ data access charges.
- Documented lifecycle defaults: IA after 30 days without Standard access, Archive after 90 days. Return to Standard on access is disabled by default.
- Archive requires Elastic throughput. Configure `On first access` to return active files to Standard.

> **Trap:** A mount target in another AZ does not change One Zone's data placement. One Zone still keeps its copies in one AZ, where a disaster affecting those copies can cause data loss.

> **Trap:** A throughput mode and a performance mode are separate choices. Max I/O does not mean automatically scaling throughput.
