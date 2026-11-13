---
title: Snapshots and cross-AZ recovery
level: associate
order: 30
facts:
  - id: snapshot
    text: An EBS snapshot is a point-in-time backup; each snapshot contains the information needed to
      restore the captured data to a new volume.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html#ebs-snapshots
  - id: incremental
    text: EBS snapshots store only blocks changed since the preceding snapshot.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html#ebs-snapshots
  - id: deletion
    text: Deleting an older EBS snapshot preserves blocks referenced by other snapshots.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html#ebs-snapshots
  - id: regional
    text: EBS snapshot data is replicated across AZs in its Region and can restore a volume in any AZ
      there.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html#ebs-snapshots
  - id: az-attach
    text: An EBS volume must be created in the same AZ as the EC2 instance to which it attaches.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-restoring-volume.html#ebs-restoring-volume
  - id: cached-data
    text: EBS snapshots include data written to the volume when requested, excluding application and
      operating system caches.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-creating-snapshot.html#ebs-creating-snapshot
  - id: pause
    text: AWS recommends pausing writes or unmounting a volume before snapshot creation; for a root
      volume, stop the instance first.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-creating-snapshot.html#ebs-creating-snapshot
  - id: pending
    text: Snapshot creation is asynchronous; data transfers while the snapshot is pending, and volume
      use can resume after the request.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-creating-snapshot.html#ebs-creating-snapshot
  - id: restore
    text: Recovery from an EBS snapshot creates a replacement volume; attach and mount it on the target
      instance.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-restoring-volume.html#ebs-restoring-volume
  - id: cross-region
    text: Copy a completed EBS snapshot to another Region before using that copy for recovery there.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-copy-snapshot.html#ebs-copy-snapshot
  - id: initialize
    text: Snapshot-restored volumes must download blocks before full performance; use FSR, a provisioned
      initialization rate, or manual initialization to manage this.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/initalize-volume.html#initalize-volume
  - id: fsr-placement
    text: FSR must be enabled on the specific snapshot in the AZ used to create the restored volume.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-fast-snapshot-restore.html#ebs-fast-snapshot-restore
  - id: attached-check
    text: Attached EBS status checks detect volume reachability and I/O impairment;
      StatusCheckFailed_AttachedEBS signals an attached volume cannot complete I/O.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-system-instance-status-check.html#attached-ebs-status-checks
  - id: multi-volume
    text: EBS supports taking multi-volume snapshots of volumes attached to an EC2 instance.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-creating-snapshot.html#ebs-creating-snapshot
  - id: host-recovery
    text: Stopping and starting an EBS-backed EC2 instance usually migrates it to another host when
      addressing an underlying system problem.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-system-instance-status-check.html#system-status-checks
diagrams:
  - id: ebs-cross-az-recovery
    title: Recover an EBS volume in another AZ
    width: 1120
    height: 420
    groups:
      - label: Availability Zone A
        x: 28
        y: 28
        w: 420
        h: 350
        tone: mgmt
      - label: Availability Zone B
        x: 672
        y: 28
        w: 420
        h: 350
        tone: mgmt
    nodes:
      - id: volume
        label: EBS volume
        sub: source
        icon: res-elastic-block-store-volume
        h: 86
        x: 126
        y: 122
        w: 160
        tone: storage
        info: An EBS volume lives in **one AZ**. You cannot attach it to an instance in another AZ.
      - id: snapshot
        label: EBS snapshot
        sub: regional backup
        icon: res-elastic-block-store-snapshot
        h: 86
        x: 448
        y: 290
        w: 160
        tone: storage
        info: Snapshots are **incremental** and stored regionally, so any AZ in the Region can restore them.
          Copy the snapshot to reach another Region.
      - id: restored
        label: New volume
        sub: restore in AZ B
        icon: res-elastic-block-store-volume
        h: 86
        x: 770
        y: 122
        w: 160
        tone: storage
        info: Restore in the target instance AZ. Full performance may require initialization. FSR must be
          enabled for this snapshot and target AZ.
    edges:
      - from: volume
        to: snapshot
        step: 1
        label: snapshot
      - from: snapshot
        to: restored
        step: 2
        label: restore
    steps:
      - Create a snapshot of the source volume. Pause writes first when application consistency
        matters.
      - Create a volume from the snapshot in the target AZ and attach it to an instance there.
cards:
  - id: ebs-001
    q: Can an EBS volume attach to an EC2 instance in a different Availability Zone?
    a: No. Create a snapshot, restore a new volume in the target instance AZ, then attach that new
      volume.
    trap: true
    facts:
      - az-attach
      - regional
      - restore
  - id: ebs-003
    q: Do incremental EBS snapshots require retaining every older snapshot to restore a full volume?
    a: No. Each snapshot has the information needed to restore its captured data, and deleting an older
      snapshot preserves blocks used by other snapshots.
    facts:
      - snapshot
      - incremental
      - deletion
  - id: ebs-005
    q: How should a team prepare an EBS snapshot when application consistency matters?
    a: Pause writes or unmount the volume before requesting the snapshot. Data still in application or
      operating system caches is not included; stop the instance first for a root-volume snapshot.
    facts:
      - cached-data
      - pause
  - id: ebs-026
    q: An AZ fails and an EC2 workload must recover its EBS data in a different AZ in the same Region.
      Is a cross-Region snapshot copy required?
    a: No. Restore a new volume from the regional snapshot in the target instance AZ.
    facts:
      - regional
      - az-attach
      - restore
  - id: ebs-027
    q: An EBS snapshot was requested while recent database data remained in memory. Will the snapshot
      include those unwritten changes?
    a: No. The snapshot includes data already written to the volume when requested, not application or
      operating system caches.
    trap: true
    facts:
      - cached-data
  - id: ebs-028
    q: Which EC2 status metric helps identify an attached EBS volume that cannot complete I/O?
    a: StatusCheckFailed_AttachedEBS. It reports attached-volume reachability or I/O impairment.
    facts:
      - attached-check
---
An EBS snapshot is a point-in-time backup used to create a replacement disk. The volume must share its instance's Availability Zone (AZ), but the snapshot can restore volumes across AZs in the same Region.

### How it works

1. Prepare the application for the snapshot. Pause writes or unmount the volume, making its file system unavailable to the operating system. AWS recommends stopping the instance for a root-volume snapshot, which backs up its boot disk.
2. Request the snapshot. It captures data already written to disk, not data still in application or operating system caches. You can resume use while its data transfer is pending.
3. EBS stores incremental snapshot data: only blocks changed since the preceding snapshot. Each snapshot still has the information needed to restore its captured state.
4. In the recovery AZ, create a new volume from the snapshot and attach it to an instance in that AZ. Mount it, making its file system accessible to the operating system.
5. Account for volume initialization, the loading of snapshot blocks onto the new volume, before expecting full performance. For regional recovery, copy the completed snapshot to the destination Region first.

For an attached disk that cannot complete I/O, inspect the EC2 attached-EBS status check. Its metric is `StatusCheckFailed_AttachedEBS`. For an underlying EC2 system problem, stopping and starting an EBS-backed instance usually moves it to another host; this does not move its volume to another AZ.

### Exam cues

- If the question says recover an EBS disk in another AZ, think snapshot then a new volume, because a volume can attach only within its AZ.
- If the question says delete old snapshots without damaging recent recovery points, think incremental block references, because EBS preserves blocks used by remaining snapshots.
- If the question says application data was still cached at snapshot time, think missing unwritten data, because a snapshot captures the volume's stored data.

### Remember

- Volume attachment is scoped to an AZ; regional snapshot recovery can choose any AZ in that Region.
- Deleting a snapshot does not delete data referenced by other snapshots.
- EBS can snapshot multiple volumes attached to an instance.
- A restored volume may need initialization before it delivers full performance.

> **Trap:** An incremental snapshot is still a complete recovery point. You do not manually combine snapshot files to restore a volume.
