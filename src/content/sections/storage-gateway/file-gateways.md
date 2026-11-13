---
title: File gateways
level: associate
order: 10
facts:
  - id: file-protocols
    text: S3 File Gateway exposes S3 objects as files through Network File System (NFS) or Server
      Message Block (SMB) shares.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/what-is-file-s3.html
  - id: file-object-mapping
    text: A file maps to an S3 object and its file path maps to the object key; gateway changes are
      uploaded asynchronously.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/file-gateway-concepts.html
  - id: local-cache
    text: S3 File Gateway keeps recently accessed data in a local cache for low-latency access.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/file-gateway-concepts.html
  - id: deployment
    text: S3 File Gateway can run as an on-premises virtual appliance or as an EC2 image.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/what-is-file-s3.html
  - id: s3-access
    text: S3 File Gateway data is directly accessible through S3 and can use S3 versioning, replication
      and lifecycle management.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/what-is-file-s3.html
  - id: notify-scope
    text: NotifyWhenUploaded requests an EventBridge notification after all files written to a file
      share up to the request time have uploaded to S3.
    source: https://docs.aws.amazon.com/storagegateway/latest/APIReference/API_NotifyWhenUploaded.html
  - id: notify-async
    text: NotifyWhenUploaded returns a NotificationId and does not wait synchronously for file upload
      completion.
    source: https://docs.aws.amazon.com/storagegateway/latest/APIReference/API_NotifyWhenUploaded.html
  - id: notify-targets
    text: EventBridge can route the upload completion notification to targets such as SNS or Lambda.
    source: https://docs.aws.amazon.com/storagegateway/latest/APIReference/API_NotifyWhenUploaded.html
  - id: refresh-inventory
    text: RefreshCache updates the cached inventory of S3 objects after changes outside the gateway; it
      does not import file contents into local cache storage.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/refresh-cache.html
  - id: ttl-refresh
    text: TTL-based cache refresh runs when a directory is accessed after its time to live has expired;
      it is non-recursive and blocks that directory access while refreshing.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/refresh-cache.html
  - id: upload-notification
    text: NotificationPolicy requests individual file upload notifications, whereas NotifyWhenUploaded
      tracks a working file set.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/monitoring-file-gateway.html#get-notification
  - id: fsx-availability
    text: FSx File Gateway closed to new customers in October 2024; existing customers can continue
      using it.
    source: https://docs.aws.amazon.com/filegateway/latest/filefsxw/DocumentHistory.html
  - id: gateway-types
    text: Volume Gateway exposes block volumes through iSCSI; Tape Gateway exposes a virtual tape
      library through iSCSI.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html
diagrams:
  - id: storage-file-upload
    title: Files become asynchronously uploaded S3 objects
    width: 800
    height: 190
    nodes:
      - id: client
        label: NFS or SMB client
        icon: res-server
        tone: neutral
        x: 30
        y: 60
        w: 210
        h: 86
      - id: gateway
        label: File Gateway
        icon: storage-gateway
        tone: storage
        x: 295
        y: 60
        w: 210
        h: 86
      - id: s3
        label: S3 objects
        icon: simple-storage-service
        tone: storage
        x: 560
        y: 60
        w: 210
        h: 86
    edges:
      - from: client
        to: gateway
        step: 1
      - from: gateway
        to: s3
        step: 2
    steps:
      - Write files
      - Upload asynchronously
cards:
  - id: storage-gateway-001
    q: Which AWS Storage Gateway interface fits file shares, block volumes and tape backup software?
    a: S3 File Gateway for NFS or SMB files stored as S3 objects; Volume Gateway for iSCSI block
      volumes; Tape Gateway for an iSCSI virtual tape library.
    facts:
      - file-protocols
      - gateway-types
  - id: storage-gateway-004
    q: An on-premises application must keep using SMB while AWS applications read its files as S3
      objects. Which Storage Gateway type fits?
    a: S3 File Gateway. It maps files to S3 objects and retains recently accessed data locally. Uploads
      happen asynchronously.
    facts:
      - file-protocols
      - file-object-mapping
      - local-cache
      - s3-access
  - id: storage-gateway-005
    q: A workflow must run only after an AWS S3 File Gateway working file set reaches S3. What should it
      use?
    a: Call NotifyWhenUploaded after writing the file set and handle the later EventBridge completion
      notification. The API response itself is not upload completion.
    facts:
      - notify-scope
      - notify-async
      - notify-targets
  - id: storage-gateway-006
    q: An application writes objects directly into the S3 bucket backing an S3 File Gateway share. How
      should the gateway discover those changes?
    a: Refresh the cached inventory with RefreshCache, or configure TTL-based refresh for directory
      access. Refreshing inventory does not preload file contents.
    facts:
      - refresh-inventory
      - ttl-refresh
  - id: storage-gateway-007
    q: Does AWS S3 File Gateway TTL-based cache refresh scan every directory periodically?
    a: No. It refreshes only the directory accessed after its TTL expires, without recursively
      refreshing subdirectories. Access waits for the refresh.
    trap: true
    facts:
      - ttl-refresh
  - id: storage-gateway-008
    q: How do NotificationPolicy and NotifyWhenUploaded differ in AWS S3 File Gateway?
    a: NotificationPolicy requests a notification for each completed file upload. NotifyWhenUploaded
      requests completion for all files written to the share up to the request time.
    facts:
      - upload-notification
      - notify-scope
  - id: storage-gateway-009
    q: Can a new customer choose AWS FSx File Gateway?
    a: No. It closed to new customers in October 2024; existing customers can continue using it.
    trap: true
    facts:
      - fsx-availability
---
S3 File Gateway lets existing applications use shared files while storing their data as S3 objects. Network File System (NFS) and Server Message Block (SMB) are protocols for accessing files over a network. Think of the gateway as a file interface backed by an S3 bucket.

### How it works

1. Deploy and activate the gateway as a virtual appliance on premises or an EC2 image. Associate a file share with an S3 bucket.
2. Clients access the NFS or SMB share. Each file becomes an S3 object, and its path becomes the object key, the object's name within the bucket.
3. The gateway uploads changes asynchronously, after the local file operation. A local cache keeps recently accessed data nearby.
4. To trigger processing after a working file set reaches S3, call `NotifyWhenUploaded`. Save its notification ID and handle the later EventBridge completion event, which can invoke Lambda or notify SNS.
5. If another application changes S3 objects directly, refresh the gateway's cached inventory with `RefreshCache`. An inventory refresh updates the file listing; it does not preload file data.

### Exam cues

- If the question says retain NFS or SMB access while storing accessible S3 objects, think S3 File Gateway, because it maps files to objects.
- If the question says downstream processing must wait until a batch is uploaded, think `NotifyWhenUploaded` and its completion event, because local write completion does not prove S3 upload completion.
- If the question says direct S3 changes are missing from a file share, think cache inventory refresh, because the gateway keeps its own object inventory.

### Remember

- `NotificationPolicy` covers individual file upload notifications. `NotifyWhenUploaded` covers the working file set written up to the request time.
- A time to live (TTL) is the allowed age of a directory inventory before access triggers refresh. TTL refresh is non-recursive and can block directory access.
- S3 data can use versioning, replication and lifecycle management.
- FSx File Gateway closed to new customers in October 2024. Existing customers can continue using it.

> **Trap:** A successful `NotifyWhenUploaded` response gives a notification ID. Wait for its completion event before treating the working file set as uploaded.
