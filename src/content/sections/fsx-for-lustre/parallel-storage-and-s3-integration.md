---
title: Parallel storage and S3 integration
level: associate
order: 10
facts:
  - id: workload
    text: FSx for Lustre provides a managed high-performance Lustre file system for workloads such as machine learning, high-performance computing and video processing.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/what-is.html#what-is
  - id: interface
    text: FSx for Lustre is POSIX-compliant and provides a native file system interface for Linux applications.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/what-is.html#what-is
  - id: access
    text: EC2 instances access FSx for Lustre using the Lustre client; EKS can use the FSx for Lustre CSI driver.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/what-is.html#compute-access
  - id: scratch
    text: Scratch file systems suit temporary processing; data is not replicated and does not persist if a file server fails.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/using-fsx-lustre.html#scratch-file-system
  - id: persistent
    text: Persistent file systems are designed for longer-term workloads, replicate data and replace failed file servers.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/using-fsx-lustre.html#persistent-file-system
  - id: replication
    text: Persistent SSD and HDD data is replicated within the file system's Availability Zone; Intelligent-Tiering data is replicated across multiple Availability Zones.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/using-fsx-lustre.html#persistent-file-system
  - id: storage-classes
    text: SSD provides low-latency access to the full dataset, Intelligent-Tiering automatically tiers data and offers an optional SSD read cache, and HDD provides single-digit millisecond latency.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/using-fsx-lustre.html#lustre-storage-classes
  - id: s3-files
    text: A linked S3 data repository presents S3 objects as files on FSx for Lustre.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/what-is.html#s3-integration
  - id: unsupported
    text: Data repository associations and automatic export are unavailable on Lustre 2.10 or Scratch 1 file systems.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/create-dra-linked-data-repo.html#create-dra-linked-data-repo
  - id: import
    text: A data repository association can import metadata at creation, through an import task, or automatically as S3 objects change.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/create-dra-linked-data-repo.html#create-dra-linked-data-repo
  - id: export
    text: Changes can be exported to a linked S3 repository by automatic export or an on-demand export task.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/export-changed-data-meta-dra.html#export-changed-data-meta-dra
  - id: asynchronous
    text: "FSx for Lustre automatic export sends changes asynchronously after a file is modified; adding a data repository through the console enables automatic export of new, changed and deleted files by default."
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/create-dra-linked-data-repo.html#create-dra-linked-data-repo
  - id: conflict
    text: FSx for Lustre does not prevent conflicting writes to the same file in both the file system and S3.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/create-dra-linked-data-repo.html#create-dra-linked-data-repo
  - id: lazy-load
    text: "With a linked S3 repository, FSx for Lustre loads a file content from S3 the first time an application accesses it; later reads come from the file system."
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/importing-files-dra.html
  - id: it-no-s3-link
    text: "FSx for Lustre Intelligent-Tiering file systems cannot link to an S3 data repository."
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/fsx-data-repositories.html
  - id: backup-scope
    text: "FSx for Lustre backups are supported only on persistent file systems not linked to S3; scratch and S3-linked file systems have no backups."
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/using-backups-fsx.html
  - id: hybrid-access
    text: "On-premises clients can mount FSx for Lustre over Direct Connect or Site-to-Site VPN."
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/fsx-on-premises.html
diagrams:
  - id: lustre-s3-transfer
    title: Transfer between S3 and Lustre
    width: 800
    height: 190
    nodes:
      - { id: input, label: S3 repository, x: 30, y: 55, w: 170, h: 72, tone: storage, icon: simple-storage-service }
      - { id: fsx, label: FSx for Lustre, x: 315, y: 55, w: 170, h: 72, tone: storage, icon: fsx-for-lustre }
      - { id: output, label: Same repository, x: 600, y: 55, w: 170, h: 72, tone: storage, icon: simple-storage-service }
    edges:
      - { from: input, to: fsx, step: 1 }
      - { from: fsx, to: output, step: 2 }
    steps:
      - Import metadata for linked S3 objects into the file system.
      - Export file changes back to the linked repository using configured automatic export or a task.
cards:
  - id: fsx-for-lustre-001
    q: Which file system fits HPC or machine learning workloads that process S3 data as files?
    a: FSx for Lustre. Link an S3 repository and choose scratch for temporary work or persistent storage for longer-lived workloads.
    facts: [workload, s3-files, scratch, persistent]
  - id: fsx-for-lustre-002
    q: A short-lived FSx for Lustre processing job can recreate its data after a server failure. Which deployment fits?
    a: Scratch. It is designed for temporary processing and does not replicate data.
    facts: [scratch]
  - id: fsx-for-lustre-003
    q: A long-running workload needs an FSx for Lustre file system that replaces failed servers. Which deployment fits?
    a: Persistent. Its data is replicated and failed file servers are replaced.
    facts: [persistent]
  - id: fsx-for-lustre-004
    q: Does every persistent FSx for Lustre storage class replicate data only within one Availability Zone?
    a: No. SSD and HDD replicate within the same Availability Zone, while Intelligent-Tiering replicates across multiple Availability Zones.
    trap: true
    facts: [replication]
  - id: fsx-for-lustre-005
    q: Does linking an S3 bucket to FSx for Lustre guarantee that file changes immediately appear in S3?
    a: No. Automatic export is asynchronous. The console enables it by default for new repository associations; check its configuration or run an export task.
    trap: true
    facts: [export, asynchronous]
  - id: fsx-for-lustre-007
    q: How should applications handle concurrent writes to the same data in S3 and an FSx for Lustre file system?
    a: Coordinate writes at the application level. FSx for Lustre does not prevent conflicting writes.
    facts: [conflict]
  - id: fsx-for-lustre-011
    q: "An HPC job starts on FSx for Lustre linked to a 200 TB S3 bucket. Does the file system copy all object data before the job can read files?"
    a: "No. Metadata is imported, and **file content loads from S3 on first access**. Later reads come from the file system."
    facts: [lazy-load]
  - id: fsx-for-lustre-012
    q: "A team needs FSx backups for a scratch FSx for Lustre file system used by a nightly job. Is that supported?"
    a: "No. Backups work only on **persistent** file systems **not linked to S3**. Keep durable data in S3 or use a persistent deployment."
    trap: true
    facts: [backup-scope]
---
Amazon FSx for Lustre provides a managed high-performance file system for workloads such as machine learning and high-performance computing. Linux applications can use its POSIX file interface, a standard way to access files.

### How it works

1. Choose scratch for temporary processing or persistent for longer-lived workloads. Scratch does not replicate data; persistent replicates data and replaces failed servers.
2. Select a storage class. SSD provides low latency for the full dataset. Intelligent-Tiering moves data between storage tiers and can use an SSD read cache. HDD provides single-digit millisecond latency.
3. Link an S3 data repository. Its objects appear as files, and a data repository association can import their metadata, such as file names and attributes.
4. Mount the file system from EC2 using the Lustre client, or use the FSx for Lustre CSI driver with EKS. Applications process the files.
5. To return changes to S3, use automatic export or an on-demand export task. The console enables automatic export of new, changed and deleted files by default when adding a repository. Automatic export sends changes asynchronously after the application finishes modifying a file.

### Exam cues

- If the question says a temporary compute job can recreate its input, think scratch, because its data is not replicated.
- If the question says long-running processing must survive a file server failure, think persistent, because FSx replaces failed servers and replicates data.
- If the question says process S3 objects through a Linux file interface, think FSx for Lustre with an S3 association, because objects are presented as files.
- If the question says results must reach S3, think automatic export or an export task, because linking alone does not ensure export.
- If the question says an S3-linked file system must read a large dataset, think lazy loading, because file content loads from S3 on first access.
- If the question says an FSx for Lustre file system needs backups, think persistent without an S3 link, because scratch and S3-linked file systems do not support backups.

### Remember

- Persistent SSD and HDD replicate within one Availability Zone; Intelligent-Tiering replicates across multiple Availability Zones.
- Lustre 2.10 and Scratch 1 do not support data repository associations or automatic export.
- New console-created repository associations enable automatic export by default; check the settings when using another creation method.
- File content loads from S3 on first access; later reads come from the file system.
- Backups are supported only on persistent file systems that are not linked to S3.

> **Trap:** A linked S3 bucket is not an immediate, conflict-free mirror. Configure export and coordinate concurrent writes to the same file in S3 and the file system.
