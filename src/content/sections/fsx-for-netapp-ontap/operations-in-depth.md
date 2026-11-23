---
title: Client access and replication
level: professional
order: 20
facts:
  - id: multi-az-routing
    text: Multi-AZ NFS, SMB and management endpoints use floating IP addresses and external peered networks require Transit Gateway unless using the documented cache alternatives.
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/supported-fsx-clients.html#when-is-transit-gateway-required
cards:
  - id: fsx-for-netapp-ontap-009
    q: Without a cache, a client in a peered VPC needs NFS access to an FSx for NetApp ONTAP file system deployed across multiple Availability Zones (Multi-AZ). What routing component is required?
    a: AWS Transit Gateway, because Multi-AZ NFS endpoints use floating IP addresses.
    facts: [multi-az-routing]
---
Amazon FSx for NetApp ONTAP client access builds on its multiprotocol storage and availability features.

### How it works

1. For NFS, SMB or management access from a peered network to a Multi-AZ file system, use AWS Transit Gateway unless using a documented cache alternative. These endpoints use floating IP addresses.

### Exam cues

- If the question says a peered VPC needs NFS access to a Multi-AZ file system without a cache, think Transit Gateway, because the NFS endpoint uses a floating IP address.

### Remember

- Multi-AZ NFS, SMB and management endpoints use floating IP addresses.

> **Trap:** VPC peering alone does not provide NFS access to a Multi-AZ file system without a documented cache alternative.
