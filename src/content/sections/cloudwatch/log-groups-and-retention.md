---
title: Log groups and retention
level: associate
order: 60
facts:
  - id: log-event
    text: A CloudWatch log event contains a timestamp and message describing an activity.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatchLogsConcepts.html#CloudWatchLogsConcepts
  - id: log-stream
    text: A log stream is a sequence of events from the same source.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#Working-with-log-groups-and-streams
  - id: log-group
    text: A log group contains streams with shared retention, monitoring, and access controls.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#Working-with-log-groups-and-streams
  - id: stream-limit
    text: A log group has no limit on its number of log streams.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#Working-with-log-groups-and-streams
  - id: retention-default
    text: CloudWatch Logs stores data indefinitely by default unless retention is configured or an
      applicable account policy overrides it.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#SttingLogRetention
  - id: retention-expiry
    text: Log events older than the applicable retention period are marked for deletion.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#SttingLogRetention
  - id: retention-delay
    text: Deletion normally takes up to 72 hours after expiry and can rarely take longer; marked events
      no longer incur archival storage charges.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#SttingLogRetention
  - id: account-retention
    text: An applicable account-level retention policy overrides a log group retention setting.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#account-level-retention-policies
  - id: retention-modes
    text: Account-level retention supports RETROACTIVE for matching existing and future groups or
      NEW_ONLY for groups created after the policy.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#account-level-retention-policies
  - id: retention-overlap
    text: When account-level retention policies overlap, the longest retention applies; NEVER_EXPIRE is
      treated as the longest.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#account-level-retention-policies
  - id: deletion-protection
    text: Log group deletion protection is disabled by default and, when enabled, blocks deletion until
      disabled.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatchLogsConcepts.html#CloudWatchLogsConcepts
  - id: incoming-bytes
    text: The AWS/Logs metric IncomingBytes, by LogGroupName, shows how much data each log group ingests, which finds the costliest groups.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatch-Logs-Monitoring-CloudWatch-Metrics.html
cards:
  - id: cloudwatch-057
    q: What is the difference between a CloudWatch Logs log stream and a log group?
    a: A stream holds events from one source. A group holds streams with common retention, monitoring,
      and access settings. A group has no limit on its number of streams.
    facts:
      - log-stream
      - log-group
      - stream-limit
  - id: cloudwatch-058
    q: A fleet writes application logs to separate CloudWatch streams but requires the same retention
      and access settings. How should operators organize the streams?
    a: Put the streams in one log group. Retention, monitoring, and access settings are shared at the
      group level.
    facts:
      - log-stream
      - log-group
  - id: cloudwatch-059
    q: A CloudWatch log group has long retention, but an applicable account-level policy specifies
      shorter retention. Which setting applies?
    a: The account-level retention policy overrides the group setting. If several account policies
      overlap, the longest applicable account policy wins.
    trap: true
    facts:
      - account-retention
      - retention-overlap
  - id: cloudwatch-060
    q: CloudWatch log events have expired but have not been physically deleted. Are they still charged
      as archival storage?
    a: No. Events marked for deletion no longer add archival storage charges. Physical deletion normally
      takes up to 72 hours and can occasionally take longer.
    facts:
      - retention-expiry
      - retention-delay
  - id: cloudwatch-061
    q: An organization wants an account-level CloudWatch retention policy to affect existing matching
      log groups. Which enforcement mode fits?
    a: RETROACTIVE. NEW_ONLY applies only to log groups created after the policy.
    facts:
      - retention-modes
  - id: cloudwatch-116
    q: Which CloudWatch metric shows which log groups ingest the most data and drive the CloudWatch Logs bill?
    a: AWS/Logs IncomingBytes, with the LogGroupName dimension.
    facts: [incoming-bytes]
---
CloudWatch Logs stores timestamped events from applications and infrastructure. A log stream holds events from one source; a log group collects streams that need the same retention, monitoring, and access settings.

### How it works

1. Create a log group for streams with a shared storage and access policy. Each producer writes its events to a stream.
2. Choose how long to retain events. Without configured retention or an overriding account policy, storage does not expire.
3. For a common account rule, apply an account-level retention policy. RETROACTIVE includes matching existing groups; NEW_ONLY applies to groups created after the policy.
4. Expired events are marked for deletion. They stop adding archival storage charges before physical deletion completes.

### Exam cues

- If the question says many application instances need common retention, think streams in a shared group, because retention belongs to the group.
- If the question says existing groups must inherit a common account retention policy, think RETROACTIVE, because NEW_ONLY covers future groups.
- If the question says protect a log group from accidental deletion, think deletion protection, because deletion remains blocked until protection is disabled.

### Remember

- Default retention: indefinite. Streams per group: no limit.
- An applicable account-level policy overrides the group's own retention setting.
- Among overlapping account policies, the longest retention wins; NEVER_EXPIRE is longest.
- Physical deletion normally takes up to 72 hours after expiry and can rarely take longer.
- Deletion protection is off by default.

> **Trap:** A longer group retention value does not defeat a shorter applicable account policy. The account policy overrides the group value.
