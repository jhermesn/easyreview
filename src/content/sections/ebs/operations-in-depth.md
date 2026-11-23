---
title: Restore and backup operations
level: professional
order: 70
facts:
  - id: credits
    text: Each FSR snapshot-AZ pair has volume creation credits; each restored volume consumes one
      credit and insufficient credits cause creation without FSR benefits.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/volume-creation-credits.html#volume-creation-credits
  - id: rate-overrides
    text: Specifying a volume initialization rate overrides FSR even if the snapshot has FSR enabled.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/initalize-volume.html#consistent-rate-considerations
  - id: performance
    text: Full FSR benefit applies up to 64000 provisioned IOPS and 1000 MiB/s; above these levels, AWS
      recommends initializing the volume for full performance.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/ebs-fast-snapshot-restore.html#fsr-considerations
  - id: cross-account
    text: DLM cross-account automation uses a source snapshot policy that shares snapshots and a
      destination event policy that copies them.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/event-policy.html#event-policy
  - id: same-region
    text: The DLM source sharing policy and destination cross-account event policy must be created in
      the same Region; copies can target other Regions.
    source: https://docs.aws.amazon.com/ebs/latest/userguide/event-policy.html#event-policy
  - id: eventbridge
    text: EventBridge supports EBS CreateSnapshot as a built-in target; rules with built-in targets are
      created through the console.
    source: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutTargets.html#API_PutTargets
  - id: hdd-throughput
    text: "Maximum throughput is 500 MiB/s for st1 and 250 MiB/s for sc1. Size-based baselines and burst credits govern both."
    source: https://docs.aws.amazon.com/ebs/latest/userguide/hdd-vols.html#hdd-vols
cards:
  - id: ebs-033
    q: An AWS team creates many volumes from one FSR-enabled snapshot in one AZ. Why might some volumes
      lack the FSR performance benefit?
    a: The snapshot-AZ volume creation credit bucket may lack credits. Each FSR restoration consumes one
      credit.
    trap: true
    facts:
      - credits
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
  - id: ebs-030
    q: A DLM source account shares snapshots with an isolated recovery account. What automation must the
      recovery account configure?
    a: A cross-account copy event policy in the same Region as the source sharing policy. It can copy
      shared snapshots to configured destination Regions.
    facts:
      - cross-account
      - same-region
  - id: ebs-031
    q: A team wants an EventBridge rule to invoke the EBS CreateSnapshot operation directly without
      Lambda. Is there a built-in target?
    a: Yes. EBS CreateSnapshot is a built-in EventBridge target; create rules with built-in targets
      through the console.
    facts:
      - eventbridge
  - id: ebs-051
    q: "What is the maximum throughput of st1 and of sc1?"
    a: "st1 up to 500 MiB/s, sc1 up to 250 MiB/s, depending on size and burst credits."
    facts: [hdd-throughput]
---
EBS operations depend on restore settings, snapshot automation and volume throughput. Check these details when planning recovery across accounts or creating volumes from snapshots.

### How it works

1. For fast snapshot restore (FSR), check volume creation credits for the snapshot and Availability Zone (AZ) pair. Each restored volume consumes one credit; without enough credits, the volume is created without FSR benefits.
2. Check the FSR performance limits. Above them, AWS recommends initializing the volume for full performance. A specified volume initialization rate overrides FSR.
3. For cross-account snapshot copies, create a Data Lifecycle Manager (DLM) snapshot policy in the source account to share snapshots, and a cross-account copy event policy in the destination account to copy them. Create both policies in the same Region; copies can go to other Regions.
4. To invoke EBS `CreateSnapshot` directly from an event rule, use the EventBridge built-in target. Create rules with built-in targets through the console.
5. For st1 and sc1 HDD volumes, consider the size-based throughput baseline and burst credits when assessing throughput.

### Exam cues

- If the question says some volumes restored from one FSR-enabled snapshot lack the benefit, think creation credits, because each restore consumes a credit from the snapshot-AZ bucket.
- If the question says an initialization rate was specified for an FSR-enabled snapshot, think the specified rate, because it overrides FSR.
- If the question says a recovery account must copy shared snapshots automatically, think a DLM cross-account copy event policy, because the source policy only shares them.
- If the question says an event rule must call `CreateSnapshot` directly, think the EventBridge built-in target, because it invokes that operation.
- If the question asks for HDD throughput ceilings, think st1 or sc1 and their respective limits, because their throughput depends on size-based baselines and burst credits.

### Remember

- FSR's full benefit applies up to 64000 provisioned IOPS and 1000 MiB/s. Above these levels, AWS recommends initializing the volume for full performance.
- DLM source sharing and destination copy event policies must be in the same Region; copies can target other Regions.
- st1 reaches up to 500 MiB/s; sc1 reaches up to 250 MiB/s.

> **Trap:** FSR does not guarantee its full benefit for unlimited restores or every provisioned performance level. Check creation credits and performance limits, and do not specify an initialization rate if you intend to use FSR.
