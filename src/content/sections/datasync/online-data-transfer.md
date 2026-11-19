---
title: Online data transfer
level: associate
order: 10
facts:
  - id: what
    text: AWS DataSync is a file transfer service that copies file or object data to, from and between AWS storage services.
    source: https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html#what-is-datasync
  - id: sources
    text: DataSync reads from on-premises NFS, SMB, HDFS and object storage, and from storage in other clouds such as Google Cloud Storage and Azure Blob Storage.
    source: https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html#what-is-datasync
  - id: targets
    text: DataSync writes to Amazon S3, Amazon EFS and every Amazon FSx file system type (Windows File Server, Lustre, OpenZFS and NetApp ONTAP).
    source: https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html#what-is-datasync
  - id: use-cases
    text: Typical DataSync uses are migrating active datasets, archiving cold data straight into S3 Glacier storage classes, replicating data to a standby file system, and moving data in or out of AWS for processing.
    source: https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html#use-cases
  - id: agent
    text: A DataSync agent is a virtual machine that reads and writes your storage during a transfer; it runs on VMware ESXi, KVM, Nutanix AHV or Hyper-V, or as an EC2 instance for storage in a VPC.
    source: https://docs.aws.amazon.com/datasync/latest/userguide/how-datasync-transfer-works.html#sync-agents
  - id: no-agent
    text: Transfers between AWS storage services in the same account need no agent, and the data stays on the AWS network even across Regions.
    source: https://docs.aws.amazon.com/datasync/latest/userguide/how-datasync-transfer-works.html#in-cloud-transfer
  - id: tls
    text: DataSync encrypts data in transit with TLS and always checks data integrity during a transfer.
    source: https://docs.aws.amazon.com/datasync/latest/userguide/how-datasync-transfer-works.html#how-verifying-works
  - id: task
    text: A DataSync task names a source and a destination location plus options such as metadata handling, file filters and a bandwidth limit; each run is a task execution.
    source: https://docs.aws.amazon.com/datasync/latest/userguide/how-datasync-transfer-works.html#how-datasync-transfers
  - id: changed-only
    text: By default a DataSync task compares source and destination and copies only what changed since the last run, and tasks can run on a schedule for recurring transfers.
    source: https://docs.aws.amazon.com/datasync/latest/userguide/how-datasync-transfer-works.html#how-recurring-transfers-work
  - id: vpc-endpoint
    text: With a VPC service endpoint (AWS PrivateLink), traffic between the DataSync agent and the service stays in your VPC instead of crossing the public internet, for example over Direct Connect.
    source: https://docs.aws.amazon.com/datasync/latest/userguide/choose-service-endpoint.html#datasync-in-vpc
  - id: region-cost
    text: Copying between Regions with DataSync is billed as data transfer out from the source Region.
    source: https://docs.aws.amazon.com/datasync/latest/userguide/how-datasync-transfer-works.html#in-cloud-transfer
  - id: task-throughput
    text: "A DataSync task reaches up to 10 Gbps when it uses an agent and up to 5 Gbps without one."
    source: https://docs.aws.amazon.com/general/latest/gr/datasync.html
  - id: transfer-pricing
    text: "AWS DataSync charges for gigabytes transferred; Enhanced mode also charges per task execution, in addition to applicable storage-service request, storage and data-transfer charges."
    source: https://aws.amazon.com/datasync/pricing/#Enhanced_mode_data_transfers
  - id: network-compression
    text: "AWS DataSync compresses transfer data before sending it over the network when compression is possible, reducing the physical bytes sent."
    source: https://docs.aws.amazon.com/datasync/latest/userguide/transfer-performance-counters.html
cards:
  - id: datasync-001
    q: A company must copy 200 TB from an on-premises NFS server to Amazon EFS over its existing network link, with encryption in transit and integrity checks, and then keep syncing changes nightly. Which service fits?
    a: "**AWS DataSync** with an agent on premises and a scheduled task.\nIt copies only changed files on each run and verifies integrity."
    facts: [what, sources, targets, changed-only, tls]
  - id: datasync-002
    q: Which AWS storage targets can AWS DataSync write to?
    a: "Amazon S3 (including Glacier storage classes), Amazon EFS and all Amazon FSx file systems."
    facts: [targets, use-cases]
  - id: datasync-003
    q: A team uses AWS DataSync to copy data from an on-premises SMB share to Amazon S3 over AWS Direct Connect and must keep the traffic off the public internet. What should they configure?
    a: "A **VPC service endpoint** for DataSync (AWS PrivateLink), and activate the agent against it."
    facts: [vpc-endpoint]
  - id: datasync-004
    q: Does AWS DataSync need an agent to copy data from an S3 bucket to an EFS file system in the same AWS account?
    a: "No. Transfers between AWS storage services in the same account are agentless, and the data stays on the AWS network."
    trap: true
    facts: [no-agent]
  - id: datasync-005
    q: A company wants to move rarely used on-premises files directly into S3 Glacier Deep Archive to free local capacity. Which AWS service copies them online?
    a: "AWS DataSync, which can write straight to S3 Glacier storage classes."
    facts: [use-cases]
  - id: datasync-006
    q: What does an AWS DataSync agent run on?
    a: "A VM on VMware ESXi, KVM, Nutanix AHV or Hyper-V, or an EC2 instance when the storage is in a VPC."
    facts: [agent]
  - id: datasync-008
    q: "A company schedules many AWS DataSync Enhanced mode transfers. Which billing dimensions should it include in its estimate?"
    a: "Gigabytes transferred and task executions, plus applicable storage, request and data-transfer charges."
    facts: [transfer-pricing]
  - id: datasync-009
    q: "During an AWS DataSync migration, why can network bytes be lower than the amount of data transferred?"
    a: "Compression before network transmission. When the data can be compressed, fewer physical bytes cross the network."
    facts: [network-compression]
---
AWS DataSync copies files and objects over the network, fast and with checks, so you don't have to script `rsync` jobs and verify them yourself. [What is AWS DataSync?](https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html)

### How it works

1. For on-premises or other-cloud storage, deploy a DataSync agent near the data and activate it against a public or VPC service endpoint.
2. Create a source and a destination location, such as an NFS share and an S3 bucket.
3. Create a task with options: what metadata to keep, filters, bandwidth limit, schedule.
4. Each task execution scans both sides, copies what changed over TLS, and verifies integrity. DataSync compresses data before network transmission when possible.

| Need | Service |
|---|---|
| One-time or recurring online copy of files or objects into AWS | AWS DataSync |
| On-premises apps keep using NFS or SMB while data lands in S3 or FSx | AWS Storage Gateway |
| Partners upload with SFTP, FTPS, FTP or AS2 | AWS Transfer Family |
| Database migration with ongoing change capture | AWS DMS |

### Exam cues

- If the question says migrate or sync large file shares to S3, EFS or FSx online, on a schedule, with integrity checks, think AWS DataSync.
- If the question says the transfer must not use the public internet, think DataSync with a VPC service endpoint over Direct Connect or VPN.
- If the question says copy between two AWS storage services, think DataSync with no agent.

### Remember

- Transfer charges depend on gigabytes copied; Enhanced mode adds a per-execution fee. Storage, request and data-transfer charges can also apply.
- Compression can reduce network bytes when the data is compressible.

- Sources: NFS, SMB, HDFS, object storage, other clouds. Targets: S3, EFS, all FSx types.
- Agent needed for on-premises and other clouds; none between AWS services in one account.
- TLS in transit, integrity verification, incremental runs, schedules, bandwidth limits.

> **Trap:** DataSync is a copy job, not a file share. When on-premises applications must keep reading and writing through NFS or SMB after the move, add Storage Gateway.
