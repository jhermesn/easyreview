---
title: Fast snapshot restore
level: associate
order: 50
facts:
  - id: initialization
    text: A snapshot-restored EBS volume downloads snapshot blocks before full performance;
      initialization can increase I/O latency.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/initalize-volume.html#initalize-volume
  - id: fsr
    text: Fast snapshot restore (FSR) creates a fully initialized volume from a snapshot, avoiding the
      first-block-access latency penalty within supported performance limits.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-fast-snapshot-restore.html#ebs-fast-snapshot-restore
  - id: placement
    text: Enable FSR separately for each snapshot and target AZ; restore the volume in an enabled AZ.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-fast-snapshot-restore.html#ebs-fast-snapshot-restore
  - id: inheritance
    text: Snapshot copies and new snapshots of restored volumes do not inherit FSR.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-fast-snapshot-restore.html#ebs-fast-snapshot-restore
  - id: quota
    text: FSR has a quota of 5 enabled snapshots per Region, including owned and shared snapshots
      enabled by the account.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-fast-snapshot-restore.html#fsr-considerations
  - id: billing
    text: FSR is billed per minute for each enabled snapshot-AZ pair, with a minimum of one hour.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-fast-snapshot-restore.html#fsr-pricing
  - id: size
    text: FSR supports snapshots of 16 TiB or less.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-fast-snapshot-restore.html#fsr-considerations
  - id: performance
    text: Full FSR benefit applies up to 64000 provisioned IOPS and 1000 MiB/s; above these levels, AWS
      recommends initializing the volume for full performance.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-fast-snapshot-restore.html#fsr-considerations
  - id: credits
    text: Each FSR snapshot-AZ pair has volume creation credits; each restored volume consumes one
      credit and insufficient credits cause creation without FSR benefits.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/volume-creation-credits.html#volume-creation-credits
  - id: state
    text: The FSR enabled state with sufficient volume creation credits provides the full restoration
      performance benefit.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/view-fsr-enabled-snapshots.html#view-fsr-enabled-snapshots
  - id: manual
    text: You can manually initialize a snapshot-restored volume by reading its blocks before using it
      for the workload.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/initalize-volume.html#ebs-initialize
  - id: rate
    text: A provisioned initialization rate from 100 to 300 MiB/s downloads snapshot blocks after
      creation for predictable initialization time.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/initalize-volume.html#volume-initialization-rate
  - id: rate-overrides
    text: Specifying a volume initialization rate overrides FSR even if the snapshot has FSR enabled.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/initalize-volume.html#consistent-rate-considerations
  - id: automation
    text: DLM snapshot schedules can enable FSR in selected AZs and control how long or how many
      snapshots retain it.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/snapshot-ami-policy.html#create-snap-policy
cards:
  - id: ebs-008
    q: What does EBS fast snapshot restore provide, and how is it scoped and billed?
    a: A fully initialized restored volume within supported limits. Enable it per snapshot and AZ.
      Billing is per minute per snapshot-AZ pair with a one-hour minimum; the quota is 5 enabled
      snapshots per Region.
    facts:
      - fsr
      - placement
      - billing
      - quota
  - id: ebs-009
    q: A team copies an FSR-enabled EBS snapshot and creates a new snapshot of its restored volume. Do
      the new snapshots inherit FSR?
    a: No. Enable FSR explicitly for each snapshot in each required AZ.
    trap: true
    facts:
      - inheritance
      - placement
  - id: ebs-014
    q: An EBS-restored database must avoid the first-read performance penalty during failover. What
      should the team prepare?
    a: Enable FSR for the recovery snapshot in the recovery AZ before creating the volume, check enabled
      state and creation credits, and stay within supported performance limits. DLM can automate FSR
      for new snapshots.
    facts:
      - fsr
      - placement
      - state
      - credits
      - performance
      - automation
  - id: ebs-033
    q: An AWS team creates many volumes from one FSR-enabled snapshot in one AZ. Why might some volumes
      lack the FSR performance benefit?
    a: The snapshot-AZ volume creation credit bucket may lack credits. Each FSR restoration consumes one
      credit.
    trap: true
    facts:
      - credits
  - id: ebs-034
    q: An EBS recovery plan allows time to initialize disks but needs a predictable download rate. Which
      alternative to FSR fits?
    a: Specify a provisioned initialization rate of 100 to 300 MiB/s when creating volumes from
      snapshots. The download still happens after creation.
    facts:
      - rate
  - id: ebs-035
    q: A team specifies a volume initialization rate while restoring from an FSR-enabled EBS snapshot.
      Which initialization method is used?
    a: The specified initialization rate overrides FSR. Omit the rate to use FSR.
    trap: true
    facts:
      - rate-overrides
  - id: ebs-036
    q: Does enabling FSR for an EBS snapshot guarantee full performance for unlimited restores at any
      provisioned IOPS level?
    a: No. Check creation credits and FSR performance limits. AWS recommends initialization above 64000
      IOPS or 1000 MiB/s.
    trap: true
    facts:
      - credits
      - performance
---
Fast snapshot restore (FSR) prepares an EBS snapshot so restored volumes can start fully initialized. Initialization means loading snapshot blocks onto the volume. FSR avoids the latency of loading a block on its first access, within its supported performance limits.

### How it works

1. Enable FSR for the specific recovery snapshot in each target Availability Zone (AZ).
2. Wait for its `enabled` state and check volume creation credits, the allowance for creating initialized volumes from that snapshot in that AZ.
3. Create the volume in the enabled AZ. Each FSR restore consumes one credit; insufficient credits create the volume without FSR benefits.
4. Prepare each new snapshot or copy separately. DLM can enable FSR for snapshots produced by a schedule.

| Initialization method | When data loads | Useful requirement |
|---|---|---|
| FSR | Prepared for fully initialized volume creation | Immediate restored performance within FSR limits |
| Provisioned initialization rate | After creation at 100 to 300 MiB/s | Predictable initialization time |
| Manual initialization | Read volume blocks after creation | Prepare the restored disk before workload use |

### Exam cues

- If the question says a restored database is slow on initial reads and must start at full performance, think FSR, because the restored volume starts initialized within its supported limits.
- If the question says a copy of an FSR snapshot lacks the benefit, think explicit enablement, because copies do not inherit FSR.
- If the question says many concurrent restores from one snapshot are inconsistent in performance, think volume creation credits, because FSR is limited by the snapshot-AZ credit bucket.

### Remember

- Scope: one snapshot and one AZ per FSR enablement.
- Quota: 5 enabled snapshots per Region, including snapshots shared with the account.
- Billing: per minute per snapshot-AZ pair, with a one-hour minimum.
- Snapshot size: at most 16 TiB.
- Full performance benefit: up to 64000 IOPS and 1000 MiB/s. Above these, initialize the volume as AWS recommends.
- An explicit provisioned initialization rate overrides FSR.

> **Trap:** An enable request is not enough. Check `enabled` state, credits, target AZ and supported volume performance before relying on FSR for recovery.
