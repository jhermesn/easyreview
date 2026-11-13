---
title: Flow Logs
level: associate
order: 40
facts:
  - id: flow-scope
    text: Flow logs can cover a VPC, subnet, or network interface; VPC and subnet logs monitor their
      network interfaces.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-basics.html#flow-logs-basics
  - id: flow-filter
    text: Flow logs can capture accepted traffic, rejected traffic, or all traffic.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-basics.html#flow-logs-basics
  - id: flow-destinations
    text: VPC Flow Logs publish to CloudWatch Logs, S3, or Data Firehose.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs
  - id: flow-outside-path
    text: Flow log collection occurs outside the network traffic path and does not affect its throughput
      or latency.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs
  - id: flow-fields
    text: Flow records include source and destination addresses and ports, protocol, packet and byte
      counts, timestamps, action, and logging status.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-log-records.html#flow-logs-fields
  - id: flow-action
    text: ACCEPT means accepted traffic; REJECT can indicate security group or ACL rejection or packets
      arriving after connection closure.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-log-records.html#flow-logs-fields
  - id: flow-status
    text: OK means normal logging, NODATA means no traffic during the interval, and SKIPDATA means some
      records were skipped because of internal capacity constraints or errors.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-log-records.html#flow-logs-fields
  - id: flow-interval
    text: The default maximum aggregation interval is ten minutes; one minute is selectable, and Nitro
      instance interfaces aggregate in one minute or less.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-log-records.html#flow-logs-aggregration-interval
  - id: flow-delayed
    text: Flow logs are not real-time streams and can take several minutes to begin collecting and
      publishing.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-basics.html#flow-logs-basics
  - id: flow-no-payload
    text: VPC Flow Logs do not capture packet contents.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/application.html
  - id: flow-guardduty
    text: GuardDuty analyzes its own independent stream of EC2 flow data without requiring
      customer-created flow logs; it does not make those logs available for customer retention.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_vpc
  - id: flow-reply-reject
    text: An accepted request and rejected response can reveal a stateless subnet ACL that permits only
      one direction.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-records-examples.html#flow-log-example-security-groups
cards:
  - id: vpc-007
    q: What do VPC Flow Logs record, and where can the records be published?
    a: IP traffic metadata such as addresses, ports, protocol, bytes, and ACCEPT or REJECT, at VPC,
      subnet, or network-interface scope. Publish to CloudWatch Logs, S3, or Data Firehose. Packet
      contents are not captured, and collection is outside the traffic path.
    facts:
      - flow-scope
      - flow-destinations
      - flow-fields
      - flow-no-payload
      - flow-outside-path
  - id: vpc-021
    q: A team wants to inspect HTTP request bodies from historical VPC Flow Logs. Can it do that?
    a: No. Flow Logs contain traffic metadata and do not capture packet contents.
    trap: true
    facts:
      - flow-no-payload
  - id: vpc-022
    q: A GuardDuty-enabled account needs retained EC2 network records for an audit. Must it configure
      its own VPC Flow Logs?
    a: Yes. GuardDuty uses an independent flow-data stream and does not expose it as customer-retained
      flow logs.
    facts:
      - flow-guardduty
  - id: vpc-023
    q: A VPC Flow Log shows NODATA for one interval and SKIPDATA for another. Do both mean there was no
      traffic?
    a: No. NODATA means no traffic in the interval. SKIPDATA means records were skipped because of
      internal capacity constraints or errors.
    trap: true
    facts:
      - flow-status
  - id: vpc-024
    q: What aggregation intervals are available for VPC Flow Logs, and what happens on Nitro instance
      interfaces?
    a: The default maximum is ten minutes, with one minute selectable. Nitro instance interfaces
      aggregate in one minute or less regardless of the selected maximum.
    facts:
      - flow-interval
---

VPC Flow Logs record information about IP traffic at network interfaces. They help investigate allowed and rejected connections without collecting packet contents. A network interface is the virtual network attachment through which a resource sends and receives traffic.

### How it works

1. Choose VPC, subnet, or network-interface scope. Choose accepted traffic, rejected traffic, or all traffic.
2. Select CloudWatch Logs, S3, or Data Firehose as the destination. Collection happens outside the traffic path.
3. Aggregate traffic into flow records containing addresses, ports, protocol, counts, times, an action, and a logging status. Metadata describes a connection; it does not contain the application data inside packets.
4. Compare request and response records. An accepted request followed by a rejected reply can point to a subnet ACL missing its return-path rule.

| Field value | Meaning |
|---|---|
| `ACCEPT` | Traffic was accepted |
| `REJECT` | Traffic was rejected, including by a group or ACL, or after connection closure |
| `OK` | Records are logging normally |
| `NODATA` | No traffic occurred in the interval |
| `SKIPDATA` | Some records were skipped because of internal capacity constraints or errors |

### Exam cues

- If the question says diagnose accepted versus rejected network connections, think Flow Logs, because they record flow metadata and actions.
- If the question says read an HTTP body, think packet contents are unavailable in Flow Logs, because records contain metadata only.
- If the question says GuardDuty already runs but audit logs need retention, think configure your own flow logs, because GuardDuty's separate stream is not exposed for retention.

### Remember

- Default maximum aggregation interval: ten minutes. One minute is selectable.
- Nitro instance interfaces aggregate in one minute or less. Nitro is the EC2 platform used by those instances.
- Collection and publication can take several minutes; this is not a real-time stream.
- Out-of-path collection does not affect traffic throughput or latency.

> **Trap:** `REJECT` alone does not name a particular security rule or prove that an ACL caused the rejection. Examine both directions and the applicable controls.
