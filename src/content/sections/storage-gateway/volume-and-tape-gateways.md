---
title: Volume and Tape Gateways
level: associate
order: 20
facts:
  - id: iscsi
    text: Volume Gateway exposes cloud-backed block storage to application servers as iSCSI devices,
      which carry storage commands over IP networks.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/WhatIsStorageGateway.html
  - id: cached
    text: Cached volumes store primary data in S3 and keep frequently accessed data locally.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/WhatIsStorageGateway.html
  - id: stored
    text: Stored volumes keep the complete primary dataset on premises and asynchronously back it up to
      S3 as EBS snapshots.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html#storage-gateway-stored-volume-concepts
  - id: buffer
    text: An upload buffer stages volume writes before the gateway uploads them to AWS.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html
  - id: snapshots
    text: Volume Gateway snapshots are incremental point-in-time EBS backups that can restore gateway
      volumes or create EBS volumes for EC2 recovery.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html
  - id: not-objects
    text: Cached Volume Gateway data and snapshots cannot be read with the S3 API or S3 console even
      though they are stored in S3.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html
  - id: cached-limit
    text: Cached volumes support 1 GiB to 32 TiB per volume and up to 32 volumes per gateway.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html#storage-gateway-cached-concepts
  - id: stored-limit
    text: Stored volumes support 1 GiB to 16 TiB per volume and up to 32 volumes per gateway.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html#storage-gateway-stored-volume-concepts
  - id: vtl
    text: Tape Gateway presents a virtual tape library (VTL) with tape drives and a media changer as
      iSCSI devices to existing backup software.
    source: https://docs.aws.amazon.com/storagegateway/latest/tgw/StorageGatewayConcepts.html
  - id: tape-upload
    text: Tape Gateway stores writes locally before asynchronously uploading virtual tape data to S3.
    source: https://docs.aws.amazon.com/storagegateway/latest/tgw/StorageGatewayConcepts.html
  - id: tape-archive
    text: Ejecting a tape through backup software moves it to an archive backed by S3 Glacier Flexible
      Retrieval or S3 Glacier Deep Archive.
    source: https://docs.aws.amazon.com/storagegateway/latest/tgw/StorageGatewayConcepts.html
  - id: tape-retrieve
    text: Archived tapes cannot be read directly; retrieve them to Tape Gateway before reading.
    source: https://docs.aws.amazon.com/storagegateway/latest/tgw/StorageGatewayConcepts.html
  - id: tape-time
    text: Archived tape retrieval typically takes 3 to 5 hours from S3 Glacier Flexible Retrieval or 12
      hours from S3 Glacier Deep Archive.
    source: https://docs.aws.amazon.com/storagegateway/latest/tgw/StorageGatewayConcepts.html
diagrams:
  - id: storage-tape-archive
    title: Tape writes and archival
    width: 800
    height: 190
    nodes:
      - id: backup
        label: Backup software
        icon: res-server
        tone: neutral
        x: 30
        y: 60
        w: 210
        h: 86
      - id: tape
        label: Tape Gateway
        icon: storage-gateway
        tone: storage
        x: 295
        y: 60
        w: 210
        h: 86
      - id: archive
        label: Tape archive
        icon: simple-storage-service
        tone: storage
        x: 560
        y: 60
        w: 210
        h: 86
    edges:
      - from: backup
        to: tape
        step: 1
      - from: tape
        to: archive
        step: 2
    steps:
      - Write virtual tapes
      - Eject to archive
cards:
  - id: storage-gateway-002
    q: How do AWS Volume Gateway cached and stored volumes differ?
    a: Cached volumes keep primary data in S3 and frequently accessed data locally. Stored volumes keep
      the entire primary dataset locally and asynchronously back it up as EBS snapshots.
    facts:
      - cached
      - stored
  - id: storage-gateway-003
    q: A datacenter must replace physical tape hardware while retaining supported tape backup software.
      Which AWS Storage Gateway type fits?
    a: Tape Gateway. Its iSCSI virtual tape library accepts backup writes and archives ejected tapes to
      S3 Glacier Flexible Retrieval or Deep Archive.
    facts:
      - vtl
      - tape-archive
  - id: storage-gateway-010
    q: An on-premises block application needs low-latency access to its entire dataset and offsite
      backups. Which AWS Volume Gateway mode fits?
    a: Stored volumes. The complete primary dataset remains local and EBS snapshots back it up
      asynchronously to AWS.
    facts:
      - stored
  - id: storage-gateway-011
    q: An application using AWS Volume Gateway needs less local primary storage and mostly reads a hot
      subset of data. Which volume mode fits?
    a: Cached volumes. Primary data lives in S3 while frequently accessed data stays in the local cache.
    facts:
      - cached
  - id: storage-gateway-012
    q: Can an application use the S3 API to read data from an AWS Volume Gateway cached volume?
    a: No. Use the iSCSI volume interface. The S3 backing data is not directly accessible through the S3
      API or console.
    trap: true
    facts:
      - iscsi
      - not-objects
  - id: storage-gateway-013
    q: A backup application needs an archived AWS Tape Gateway tape immediately. Can it read that tape
      directly?
    a: No. Retrieve it to Tape Gateway first. Typical retrieval takes 3 to 5 hours for Glacier Flexible
      Retrieval or 12 hours for Deep Archive.
    trap: true
    facts:
      - tape-retrieve
      - tape-time
  - id: storage-gateway-014
    q: What are the per-volume size ranges for AWS Volume Gateway cached and stored volumes?
    a: "Cached: 1 GiB to 32 TiB. Stored: 1 GiB to 16 TiB. Each mode supports up to 32 volumes per
      gateway."
    facts:
      - cached-limit
      - stored-limit
---
Volume Gateway gives existing servers block storage, which they access as disks. Tape Gateway gives backup software a virtual tape library, a software replacement for tape drives and a tape changer. Both use iSCSI, a protocol that sends storage commands over an IP network.

### How it works

1. For block storage, deploy Volume Gateway and present iSCSI volumes to application servers. Choose where the primary dataset must live.
2. Cached volumes keep primary data in S3 and recently accessed data locally. An upload buffer stages writes before transfer to AWS.
3. Stored volumes keep the entire primary dataset locally and asynchronously create cloud backups as EBS snapshots. A snapshot is a point-in-time backup; incremental snapshots retain changed data.
4. For tape backups, connect existing backup software to Tape Gateway's virtual drives and media changer. The gateway stages writes locally and uploads tape data asynchronously to S3.
5. Eject a virtual tape through the backup software to archive it in S3 Glacier Flexible Retrieval or Deep Archive. Retrieve an archived tape to the gateway before reading it.

| Requirement | Choice | Primary access |
|---|---|---|
| Reduce local block storage | Cached Volume Gateway | iSCSI, hot data cached locally |
| Keep all block data local with cloud backups | Stored Volume Gateway | iSCSI, full local dataset |
| Replace physical tape infrastructure | Tape Gateway | iSCSI virtual tape library |

### Exam cues

- If the question says all block data must remain local for low latency, think stored volumes, because only backups move to AWS asynchronously.
- If the question says reduce local block storage while retaining fast hot-data reads, think cached volumes, because S3 holds the primary dataset.
- If the question says preserve tape backup software while removing physical tapes, think Tape Gateway, because it presents a compatible virtual tape library.

### Remember

- Cached volumes: 1 GiB to 32 TiB each, up to 32 per gateway.
- Stored volumes: 1 GiB to 16 TiB each, up to 32 per gateway.
- EBS snapshots support gateway restoration or EC2 recovery through an EBS volume.
- Typical archived tape retrieval: 3 to 5 hours from Flexible Retrieval, 12 hours from Deep Archive.

> **Trap:** Volume Gateway stores data in S3 but does not expose it as ordinary S3 objects for direct S3 API access. That file-to-object access model belongs to S3 File Gateway.
