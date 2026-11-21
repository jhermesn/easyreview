---
title: Logging and transformation details
level: professional
order: 40
facts:
  - id: deliver-firewall
    text: AWS Network Firewall supports direct log delivery to Firehose using LogDestinationType
      KinesisDataFirehose and the deliveryStream destination key.
    source: https://docs.aws.amazon.com/network-firewall/latest/APIReference/API_LogDestinationConfig.html#networkfirewall-Type-LogDestinationConfig-LogDestination
  - id: deliver-zero
    text: Zero buffering is unavailable for S3 backup and for dynamic partitioning.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-configure-backup.html#buffering-hints
  - id: transform-contract
    text: For Direct PUT and Kinesis Data Streams sources, every Lambda output record must preserve
      recordId and include result and base64-encoded data.
    source: https://docs.aws.amazon.com/firehose/latest/dev/data-transformation-status-model.html#data-transformation-status-model
  - id: transform-status
    text: The Lambda result values are Ok, Dropped, and ProcessingFailed; Firehose treats Ok and Dropped
      as successfully processed.
    source: https://docs.aws.amazon.com/firehose/latest/dev/data-transformation-status-model.html#data-transformation-status-model
cards:
  - id: firehose-010
    q: AWS Network Firewall flow logs need direct delivery to Firehose. Which logging configuration
      selects it?
    a: Set LogDestinationType to KinesisDataFirehose and provide the Firehose stream name under the
      deliveryStream key.
    facts:
      - deliver-firewall
  - id: firehose-012
    q: Can a Firehose stream with dynamic partitioning use zero buffering?
    a: No. Zero buffering is unavailable with dynamic partitioning and for the S3 backup destination.
    trap: true
    facts:
      - deliver-zero
  - id: firehose-014
    q: A Firehose Lambda transformation returns new recordId values for transformed records. What
      happens?
    a: Firehose treats the mismatch as transformation failure. Preserve each original recordId and
      return result and base64-encoded data.
    trap: true
    facts:
      - transform-contract
  - id: firehose-016
    q: What do Ok, Dropped, and ProcessingFailed mean in a Firehose transformation response?
    a: Ok means transformed successfully, Dropped means intentionally discarded, and ProcessingFailed
      means transformation failed. Ok and Dropped count as successful processing.
    facts:
      - transform-status
---
Amazon Data Firehose can receive AWS Network Firewall logs and process records returned by Lambda. Destination settings, buffering restrictions, and the transformation response determine how these configurations work.

### How it works

1. For direct Network Firewall log delivery, set `LogDestinationType` to `KinesisDataFirehose` and put the stream name in `deliveryStream`. See the logging destination configuration.
2. For Direct PUT or Kinesis Data Streams sources, each transformed Lambda output record must keep its original `recordId` and include a `result` and base64-encoded `data`. A mismatched ID causes transformation failure. See the transformation response requirements.
3. Firehose treats `Ok` as successfully transformed and `Dropped` as intentionally discarded. Both count as successful processing; `ProcessingFailed` indicates failure.

### Exam cues

- If the question says Network Firewall flow logs must go directly to Firehose, think `KinesisDataFirehose` and `deliveryStream`, because those settings select the stream.
- If the question says a transformation returns a new `recordId`, think transformation failure, because the output must preserve the original ID.
- If the question says a Lambda response marks a record `Dropped`, think successful processing, because the record was intentionally discarded.
- If the question says dynamic partitioning needs zero buffering, think a different buffering setting, because zero buffering is unavailable for dynamic partitioning.

### Remember

- Zero buffering is unavailable for S3 backup and dynamic partitioning.
- Lambda result values are `Ok`, `Dropped`, and `ProcessingFailed`.

> **Trap:** `Dropped` counts as successful processing, but changing a record's `recordId` causes transformation failure.
