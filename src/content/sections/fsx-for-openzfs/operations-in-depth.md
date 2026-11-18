---
title: "PLACEHOLDER fsx-for-openzfs/operations-in-depth"
level: professional
order: 20
facts:
  - id: clone-dependency
    text: A clone depends on its source snapshot, which cannot be deleted while the clone is in use.
    source: https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/snapshots-openzfs.html#snapshots-volumes
  - id: full-copy
    text: A full-copy volume is an independent writable copy of a snapshot; copying the data takes longer than creating a clone.
    source: https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/snapshots-openzfs.html#snapshots-volumes
  - id: full-copy-readonly
    text: A full-copy volume is read-only while its data is being copied.
    source: https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/creating-volumes.html#volume-properties
  - id: restore-file
    text: Clients can restore individual files by copying them from the hidden .zfs/snapshot directory; the volume's NFS exports must include crossmnt.
    source: https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/snapshots-openzfs.html#snapshots-user-restore
  - id: quota-reservation
    text: A volume quota limits capacity but does not guarantee space; a reservation guarantees space for the volume.
    source: https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/creating-volumes.html#volume-properties
cards:
  - id: fsx-for-openzfs-004
    q: Can a team delete an FSx for OpenZFS snapshot while a clone that depends on it is in use?
    a: No. The clone depends on its source snapshot.
    facts: [clone-dependency]
    trap: true
  - id: fsx-for-openzfs-005
    q: A team needs a writable FSx for OpenZFS volume that is independent of its source snapshot. What should it create?
    a: A full-copy volume. It is read-only while the snapshot data is copied.
    facts: [full-copy, full-copy-readonly]
  - id: fsx-for-openzfs-006
    q: How can a client restore one file from an FSx for OpenZFS snapshot?
    a: Copy it from the hidden `.zfs/snapshot` directory. The volume's NFS exports must include `crossmnt`.
    facts: [restore-file]
  - id: fsx-for-openzfs-009
    q: Does an FSx for OpenZFS volume quota guarantee that the volume has that much space available?
    a: No. A quota sets a limit; a reservation guarantees space.
    facts: [quota-reservation]
    trap: true
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
