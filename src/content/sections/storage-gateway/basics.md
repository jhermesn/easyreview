---
title: "Storage Gateway basics"
level: foundational
order: 5
facts:
  - id: hybrid-storage
    text: "AWS Storage Gateway connects an on-premises software appliance with AWS cloud storage so on-premises applications can use it."
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/WhatIsStorageGateway.html#WhatIsStorageGateway
  - id: file-protocols
    text: S3 File Gateway exposes S3 objects as files through Network File System (NFS) or Server
      Message Block (SMB) shares.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/what-is-file-s3.html
  - id: gateway-types
    text: Volume Gateway exposes block volumes through iSCSI; Tape Gateway exposes a virtual tape
      library through iSCSI.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html
cards:
  - id: storage-gateway-016
    q: "On-premises applications must keep using local file or block storage while the data is stored in AWS. Which service fits?"
    a: "AWS Storage Gateway."
    facts: [hybrid-storage]
  - id: storage-gateway-001
    q: Which AWS Storage Gateway interface fits file shares, block volumes and tape backup software?
    a: S3 File Gateway for NFS or SMB files stored as S3 objects; Volume Gateway for iSCSI block
      volumes; Tape Gateway for an iSCSI virtual tape library.
    facts:
      - file-protocols
      - gateway-types
---
AWS Storage Gateway is a hybrid storage service: an appliance on premises stores data in AWS.

### How it works

1. Deploy the gateway appliance on premises.
2. Applications use it as local storage.
3. The gateway stores the data in AWS.

### Exam cues

- If the question says hybrid storage connecting on-premises apps to AWS storage, think Storage Gateway.

### Remember

- On-premises appliance, cloud storage.

> **Trap:** Storage Gateway keeps apps on premises; DataSync moves data in bulk.
