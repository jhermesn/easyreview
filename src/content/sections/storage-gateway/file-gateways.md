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
  - id: fsx-availability
    text: FSx File Gateway closed to new customers in October 2024; existing customers can continue
      using it.
    source: https://docs.aws.amazon.com/filegateway/latest/filefsxw/DocumentHistory.html
  - id: gateway-types
    text: Volume Gateway exposes block volumes through iSCSI; Tape Gateway exposes a virtual tape
      library through iSCSI.
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html
  - id: smb-ad
    text: "An S3 File Gateway SMB file share authenticates users with Microsoft Active Directory (on-premises or AWS Managed Microsoft AD) after the gateway joins the domain, or with guest access."
    source: https://docs.aws.amazon.com/filegateway/latest/files3/CreatingAnSMBFileShare.html#CreatingAnSMBFileShare
  - id: private-endpoints
    text: "S3 File Gateway can use private VPC endpoints for its AWS connections and data transfers without requiring public internet access."
    source: https://docs.aws.amazon.com/filegateway/latest/files3/Requirements.html#allow-firewall-gateway-access
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
  - id: storage-gateway-009
    q: "An on-premises application needs an SMB file share backed by Amazon S3 with low-latency access to recent data. Which AWS Storage Gateway option fits?"
    a: "S3 File Gateway. It exposes S3 objects through SMB shares and caches recently accessed data locally."
    facts:
      - file-protocols
      - local-cache
  - id: storage-gateway-015
    q: "Windows users must reach an S3 File Gateway share with their corporate logins. What is required?"
    a: "An SMB file share with Active Directory authentication, with the gateway joined to the domain."
    facts: [smb-ad]
  - id: storage-gateway-017
    q: "An on-premises S3 File Gateway must connect to AWS and transfer data without public internet access. Which service connectivity option fits?"
    a: "Private VPC endpoints configured for the gateway's AWS connections and data transfers."
    facts: [private-endpoints]
---
S3 File Gateway lets existing applications use shared files while storing their data as S3 objects. Network File System (NFS) and Server Message Block (SMB) are protocols for accessing files over a network. Think of the gateway as a file interface backed by an S3 bucket.

### How it works

1. Deploy and activate the gateway as a virtual appliance on premises or an EC2 image. Associate a file share with an S3 bucket.
2. Clients access the NFS or SMB share. Each file becomes an S3 object, and its path becomes the object key, the object's name within the bucket.
3. The gateway uploads changes asynchronously, after the local file operation. A local cache keeps recently accessed data nearby.
4. For an SMB share, join the gateway to the domain to authenticate users with Microsoft Active Directory, or use guest access.

### Exam cues

- If the question says retain NFS or SMB access while storing accessible S3 objects, think S3 File Gateway, because it maps files to objects.
- If the question says Windows users need corporate logins for an SMB share, think Active Directory authentication, because the gateway can join the domain.
- If the question says block volumes or virtual tape library, think Volume Gateway or Tape Gateway, because both expose iSCSI interfaces.

### Remember

- Private VPC endpoints allow gateway connections and data transfers to AWS without public internet access.

- S3 data can use versioning, replication and lifecycle management.
- FSx File Gateway closed to new customers in October 2024. Existing customers can continue using it.

> **Trap:** FSx File Gateway is closed to new customers, although existing customers can continue using it.
