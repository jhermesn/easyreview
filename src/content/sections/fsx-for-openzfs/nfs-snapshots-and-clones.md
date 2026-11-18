---
title: NFS, snapshots, and clones
level: associate
order: 10
facts:
  - id: nfs-access
    text: FSx for OpenZFS provides managed file storage accessible using NFS versions 3, 4.0, 4.1, and 4.2 from Linux, Windows, and macOS clients.
    source: https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/what-is-fsx.html#fsx-openzfs-feature-overview
  - id: exports
    text: Each volume has NFS exports that specify permitted clients and their access options.
    source: https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/creating-volumes.html#nfs-exports
  - id: snapshot
    text: A snapshot is a read-only point-in-time image of a volume, stored on the file system, that consumes capacity for changed file portions.
    source: https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/snapshots-openzfs.html#snapshots-openzfs
  - id: clone
    text: A clone is a writable volume initialized from a snapshot; it is created almost instantly and initially consumes no additional capacity.
    source: https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/snapshots-openzfs.html#snapshots-volumes
  - id: backup
    text: FSx backups are stored in S3 and support cross-Region backup copies, while snapshots are stored locally on the file system.
    source: https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/what-is-fsx.html#fsx-openzfs-feature-overview
  - id: availability
    text: Multi-AZ file systems replicate data and support failover across Availability Zones in the same Region; Single-AZ HA uses a primary and standby in one Availability Zone.
    source: https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/what-is-fsx.html#what-is-availability-durability
cards:
  - id: fsx-for-openzfs-001
    q: Which managed file service provides OpenZFS features and NFS access on AWS?
    a: Amazon FSx for OpenZFS. It supports NFS access and OpenZFS snapshots and clones.
    facts: [nfs-access, snapshot, clone]
  - id: fsx-for-openzfs-002
    q: What is an Amazon FSx for OpenZFS snapshot?
    a: A read-only point-in-time image of a volume, stored on its file system.
    facts: [snapshot]
  - id: fsx-for-openzfs-003
    q: A team needs an almost immediate writable copy of an FSx for OpenZFS dataset for testing. What should it create?
    a: Create a clone volume from a snapshot. It initially consumes no additional capacity.
    facts: [clone]
  - id: fsx-for-openzfs-007
    q: A team needs an FSx for OpenZFS backup copy in another AWS Region. Are local snapshots sufficient?
    a: No. Use a cross-Region backup copy; snapshots are stored locally on the file system.
    facts: [backup]
    trap: true
  - id: fsx-for-openzfs-008
    q: A team needs FSx for OpenZFS to fail over across Availability Zones. Which deployment should it choose?
    a: Multi-AZ. Single-AZ HA keeps its primary and standby in one Availability Zone.
    facts: [availability]
---

Amazon FSx for OpenZFS provides managed shared file storage for clients using Network File System (NFS), a protocol for accessing files over a network. It supports point-in-time snapshots and writable copies of a dataset.

### How it works

1. Create a file system and volume, a named portion of its storage. Clients mount the volume through NFS; volume export settings determine which clients can access it and with what permissions.
2. Take a snapshot, a read-only image of the volume at a point in time. It stays on the file system and uses capacity for changed portions of files.
3. Create a clone from a snapshot for an almost immediate writable copy. It initially consumes no additional capacity.
4. Use backups for a separate backup copy, including copies across Regions. Choose Multi-AZ when failover across Availability Zones is required.

### Exam cues

- If the question says a test needs a quick writable copy, think clone, because it starts from a snapshot without initially using additional capacity.
- If the question says preserve a copy in another Region, think cross-Region backup copy, because snapshots are local to the file system.
- If the question says failover across Availability Zones, think Multi-AZ, because Single-AZ HA keeps its primary and standby in one zone.

### Remember

- NFS versions 3, 4.0, 4.1, and 4.2 are supported.
- Multi-AZ replicates across Availability Zones; Single-AZ HA keeps its primary and standby in one zone.
- A snapshot is read-only; a clone is writable and initially consumes no additional capacity.

> **Trap:** A snapshot is not a cross-Region backup. It is stored on the same file system.
