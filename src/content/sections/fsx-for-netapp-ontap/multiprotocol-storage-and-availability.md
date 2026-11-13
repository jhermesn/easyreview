---
title: Multiprotocol storage and availability
level: associate
order: 10
facts:
  - id: service
    text: FSx for NetApp ONTAP is a managed shared file storage service based on the NetApp ONTAP file system.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/what-is-fsx-ontap.html#what-is-fsx-ontap
  - id: protocols
    text: FSx for ONTAP supports NFS and SMB file access and iSCSI and NVMe over TCP block access.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#supported-fsx-clients
  - id: block-limit
    text: iSCSI is available on file systems with six or fewer high-availability pairs; NVMe over TCP requires a second-generation file system with six or fewer pairs.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#supported-fsx-clients
  - id: svm-endpoints
    text: A storage virtual machine provides NFS and SMB endpoints for clients to access its volumes.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#supported-fsx-clients
  - id: shared-volume
    text: FSx for ONTAP supports concurrent NFS and SMB access to the same volume.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/managing-volumes.html#managing-volumes
  - id: volume
    text: A volume is an isolated container for files, directories or iSCSI storage units; its junction path is its location in the storage virtual machine file tree.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/managing-volumes.html#managing-volumes
  - id: mount
    text: A client in the same VPC and account can mount a volume using the storage virtual machine DNS name and the volume junction or SMB share.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#same-vpc-access
  - id: single-az
    text: Single-AZ deployments place active and standby file servers in separate fault domains within one Availability Zone and replicate data within that zone.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/high-availability-AZ.html#single-az
  - id: multi-az
    text: Multi-AZ deployments place standby and active servers in different Availability Zones in the same Region and synchronously replicate writes across them.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/high-availability-AZ.html#multi-az
  - id: failover
    text: Single-AZ and Multi-AZ deployments automatically fail over to standby; failover typically completes in less than 60 seconds.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/high-availability-AZ.html#Failover
  - id: client-failover
    text: NFS and SMB failovers are transparent because the endpoint IP remains the same; transparent iSCSI and NVMe over TCP failover requires client multipathing.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/high-availability-AZ.html#Failover
  - id: multi-az-routing
    text: Multi-AZ NFS, SMB and management endpoints use floating IP addresses and external peered networks require Transit Gateway unless using the documented cache alternatives.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#when-is-transit-gateway-required
  - id: single-az-routing
    text: Single-AZ NFS, SMB and management endpoints can be accessed using VPC peering, Direct Connect or Site-to-Site VPN without requiring Transit Gateway.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#access-saz
  - id: latency
    text: SSD storage provides sub-millisecond file-operation latency; capacity pool storage has latency of tens of milliseconds.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/performance.html#latency-fsxW
  - id: tiering
    text: FSx for ONTAP can automatically tier infrequently accessed data to a lower-cost storage tier.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/what-is-fsx-ontap.html#features-overview
  - id: snapshots-clones
    text: FSx for ONTAP supports snapshots, clones and replication.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/what-is-fsx-ontap.html#what-is-fsx-ontap
  - id: snapmirror
    text: NetApp SnapMirror schedules volume replication to or from another file system in the same Region or a different Region, as frequently as every five minutes.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/scheduled-replication.html#scheduled-replication
  - id: asynchronous
    text: FSx for ONTAP supports volume-level SnapMirror but not synchronous SnapMirror or storage virtual machine disaster recovery replication.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/scheduled-replication.html#scheduled-replication
  - id: openzfs
    text: FSx for OpenZFS supports NFS, snapshots and clones, and can move ZFS or Linux file server data to AWS.
    source: https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/what-is-fsx.html#what-is-fsx
diagrams:
  - id: ontap-multi-az-failover
    title: Multi-AZ storage and failover
    width: 800
    height: 210
    groups:
      - { label: Availability Zone A, x: 220, y: 25, w: 230, h: 160, tone: neutral }
      - { label: Availability Zone B, x: 530, y: 25, w: 230, h: 160, tone: neutral }
    nodes:
      - { id: client, label: Client, x: 25, y: 75, w: 140, h: 72, tone: compute, icon: res-ec2-instance }
      - { id: active, label: Active server, x: 250, y: 75, w: 170, h: 72, tone: storage, icon: fsx-for-netapp-ontap }
      - { id: standby, label: Standby server, x: 560, y: 75, w: 170, h: 72, tone: storage, icon: fsx-for-netapp-ontap }
    edges:
      - { from: client, to: active, step: 1 }
      - { from: active, to: standby, step: 2 }
    steps:
      - The client accesses data through the storage virtual machine endpoint.
      - Writes are synchronously replicated to the standby in another Availability Zone; FSx fails over to it if needed.
cards:
  - id: fsx-for-netapp-ontap-001
    q: When should a team choose FSx for NetApp ONTAP or FSx for OpenZFS?
    a: Choose ONTAP for NFS, SMB and iSCSI access and NetApp features. Choose OpenZFS for NFS storage with OpenZFS snapshots and clones.
    facts: [protocols, snapshots-clones, openzfs]
  - id: fsx-for-netapp-ontap-002
    q: An application needs shared SMB and NFS access to storage across Availability Zones. Which FSx for NetApp ONTAP deployment fits?
    a: Multi-AZ. It supports both protocols and synchronously replicates writes to a standby server in another Availability Zone.
    facts: [shared-volume, multi-az]
  - id: fsx-for-netapp-ontap-003
    q: How does an EC2 client in the same VPC and account mount an FSx for NetApp ONTAP volume over NFS or SMB?
    a: Use the storage virtual machine DNS name and the volume junction for NFS or the SMB share for SMB.
    facts: [svm-endpoints, mount]
  - id: fsx-for-netapp-ontap-004
    q: What latency should a team expect from FSx for NetApp ONTAP SSD storage and capacity pool storage?
    a: SSD file operations have sub-millisecond latency; capacity pool storage has tens of milliseconds of latency.
    facts: [latency]
  - id: fsx-for-netapp-ontap-005
    q: A team needs cross-Region disaster recovery for an FSx for NetApp ONTAP volume. Which replication feature should it use?
    a: NetApp SnapMirror volume replication. It can schedule replication to a file system in another Region.
    facts: [snapmirror, asynchronous]
  - id: fsx-for-netapp-ontap-006
    q: Does FSx for NetApp ONTAP support synchronous SnapMirror replication between Regions?
    a: No. Synchronous SnapMirror is not supported. Use scheduled volume-level replication.
    trap: true
    facts: [asynchronous, snapmirror]
  - id: fsx-for-netapp-ontap-007
    q: What happens when an FSx for NetApp ONTAP Multi-AZ active file server fails?
    a: FSx automatically fails over to the standby. Failover typically completes in less than 60 seconds.
    facts: [multi-az, failover]
  - id: fsx-for-netapp-ontap-008
    q: What must an iSCSI client configure for transparent failover on FSx for NetApp ONTAP?
    a: Client-side multipathing, so the client can switch between file servers.
    facts: [client-failover]
  - id: fsx-for-netapp-ontap-009
    q: A client in a peered VPC needs NFS access to an FSx for NetApp ONTAP Multi-AZ file system without a cache. What routing component is required?
    a: AWS Transit Gateway, because Multi-AZ NFS endpoints use floating IP addresses.
    facts: [multi-az-routing]
---
Amazon FSx for NetApp ONTAP provides managed shared storage for applications that need NetApp features and multiple access protocols. A storage virtual machine (SVM) provides access endpoints for its volumes, which are isolated containers for files, directories or block storage units.

### How it works

1. Choose Single-AZ or Multi-AZ. Both use active and standby file servers. Single-AZ keeps them in one Availability Zone; Multi-AZ places them in different zones and synchronously replicates writes.
2. Create an SVM and volumes. Clients in the same virtual private cloud (VPC) and account mount a volume using the SVM DNS name and the NFS junction path, the volume's location in the SVM file tree, or the SMB share.
3. Use Network File System (NFS) or Server Message Block (SMB) for file access; both can access the same volume at once. Internet Small Computer Systems Interface (iSCSI) and NVMe over TCP provide block access, where clients see storage devices rather than shared files.
4. When a server fails, FSx automatically promotes the standby. NFS and SMB clients retain the endpoint IP; iSCSI and NVMe clients need multipathing, meaning multiple client paths to the servers, for transparent failover.
5. For a separate disaster recovery copy, schedule NetApp SnapMirror volume replication to another file system, including in another Region.

| Access or storage choice | Use |
|---|---|
| SSD | Sub-millisecond file-operation latency. |
| Capacity pool | Lower-cost tier with latency of tens of milliseconds. |
| SnapMirror | Scheduled volume replication to another ONTAP file system. |

### Exam cues

- If the question says Windows and Linux clients need shared SMB and NFS access across zones, think Multi-AZ FSx for ONTAP, because it supports both protocols and replicates writes across zones.
- If the question says replacement instances must access the shared files, think mount the volume on each client, because the SVM endpoint and volume path provide access.
- If the question says recover a volume in another Region, think SnapMirror, because it schedules cross-Region volume replication.
- If the question says a peered VPC must reach a Multi-AZ NFS endpoint without a cache, think Transit Gateway, because the endpoint uses a floating IP address.

### Remember

- Failover typically completes in less than 60 seconds.
- SnapMirror schedules volume replication as often as every five minutes. Synchronous SnapMirror is not supported.
- iSCSI supports file systems with up to six high-availability pairs; NVMe over TCP also requires a second-generation file system.
- Single-AZ NFS and SMB access can use VPC peering, Direct Connect or Site-to-Site VPN without Transit Gateway.

> **Trap:** Multi-AZ synchronous replication is within one Region. It is not synchronous cross-Region SnapMirror replication.
