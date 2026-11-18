---
title: Client access and replication
level: professional
order: 20
facts:
  - id: svm-endpoints
    text: A storage virtual machine provides NFS and SMB endpoints for clients to access its volumes.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#supported-fsx-clients
  - id: mount
    text: A client in the same VPC and account can mount a volume using the storage virtual machine DNS name and the volume junction or SMB share.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#same-vpc-access
  - id: asynchronous
    text: FSx for ONTAP supports volume-level SnapMirror but not synchronous SnapMirror or storage virtual machine disaster recovery replication.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/scheduled-replication.html#scheduled-replication
  - id: snapmirror
    text: NetApp SnapMirror schedules volume replication to or from another file system in the same Region or a different Region, as frequently as every five minutes.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/scheduled-replication.html#scheduled-replication
  - id: multi-az-routing
    text: Multi-AZ NFS, SMB and management endpoints use floating IP addresses and external peered networks require Transit Gateway unless using the documented cache alternatives.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#when-is-transit-gateway-required
cards:
  - id: fsx-for-netapp-ontap-003
    q: How does an EC2 client in the same VPC and account mount an FSx for NetApp ONTAP volume over NFS or SMB?
    a: Use the storage virtual machine DNS name and the volume junction for NFS or the SMB share for SMB.
    facts: [svm-endpoints, mount]
  - id: fsx-for-netapp-ontap-006
    q: Does FSx for NetApp ONTAP support synchronous SnapMirror replication between Regions?
    a: No. Synchronous SnapMirror is not supported. Use scheduled volume-level replication.
    trap: true
    facts: [asynchronous, snapmirror]
  - id: fsx-for-netapp-ontap-009
    q: A client in a peered VPC needs NFS access to an FSx for NetApp ONTAP Multi-AZ file system without a cache. What routing component is required?
    a: AWS Transit Gateway, because Multi-AZ NFS endpoints use floating IP addresses.
    facts: [multi-az-routing]
---
Amazon FSx for NetApp ONTAP uses storage virtual machines (SVMs) to provide Network File System (NFS) and Server Message Block (SMB) endpoints for volume access. NetApp SnapMirror provides scheduled volume replication to another file system. [Client access](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#supported-fsx-clients) | [SnapMirror replication](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/scheduled-replication.html#scheduled-replication)

### How it works

1. For a client in the same virtual private cloud (VPC) and account, mount the volume using the SVM DNS name and the volume junction for NFS or the SMB share for SMB. [Same VPC access](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#same-vpc-access)
2. For NFS, SMB or management access from a peered network to a Multi-AZ file system, use AWS Transit Gateway unless using a documented cache alternative. These endpoints use floating IP addresses. [Transit Gateway requirements](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#when-is-transit-gateway-required)
3. Schedule SnapMirror volume replication to or from another file system in the same Region or another Region. FSx for ONTAP supports volume-level replication, while synchronous SnapMirror and SVM disaster recovery replication are unsupported. [SnapMirror replication](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/scheduled-replication.html#scheduled-replication)

### Exam cues

- If the question says an EC2 client in the same VPC and account needs to mount a volume, think SVM DNS name plus the NFS junction or SMB share, because these identify the endpoint and volume access path.
- If the question says a peered VPC needs NFS access to a Multi-AZ file system without a cache, think Transit Gateway, because the NFS endpoint uses a floating IP address.
- If the question says replicate a volume across Regions, think scheduled SnapMirror volume replication, because FSx for ONTAP supports it between Regions.

### Remember

- SnapMirror replication can run as often as every five minutes.
- Synchronous SnapMirror and SVM disaster recovery replication are unsupported.

> **Trap:** A cross-Region SnapMirror schedule does not provide synchronous replication. FSx for ONTAP supports scheduled volume-level replication.
