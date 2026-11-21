---
title: Managed Kafka clusters
level: associate
order: 10
facts:
  - id: what
    text: Amazon MSK is a fully managed service for building and running applications that use Apache Kafka to process streaming data.
    source: https://docs.aws.amazon.com/msk/latest/developerguide/what-is-msk.html#what-is-msk-intro
  - id: data-plane
    text: Amazon MSK runs the control plane (create, update, delete clusters) while applications keep using standard Apache Kafka operations to create topics and produce and consume data.
    source: https://docs.aws.amazon.com/msk/latest/developerguide/what-is-msk.html#what-is-msk-intro
  - id: brokers-per-az
    text: An MSK Provisioned cluster has at least one broker node in each Availability Zone you choose.
    source: https://docs.aws.amazon.com/msk/latest/developerguide/what-is-msk.html#what-is-msk-intro
  - id: recovery
    text: Amazon MSK detects broker failures and replaces unhealthy brokers automatically so producers and consumers keep working.
    source: https://docs.aws.amazon.com/msk/latest/developerguide/what-is-msk.html#what-is-msk-intro
  - id: serverless
    text: MSK Serverless runs Apache Kafka without managing or scaling cluster capacity; it provisions and scales capacity and manages topic partitions automatically.
    source: https://docs.aws.amazon.com/msk/latest/developerguide/serverless.html#serverless
  - id: serverless-iam
    text: MSK Serverless requires IAM access control and does not support Apache Kafka ACLs.
    source: https://docs.aws.amazon.com/msk/latest/developerguide/serverless.html#serverless
  - id: connect-replicator
    text: MSK Connect streams data between Kafka clusters and other systems, and MSK Replicator copies data between MSK Provisioned clusters in the same or different Regions.
    source: https://docs.aws.amazon.com/msk/latest/developerguide/what-is-msk.html#what-is-msk
cards:
  - id: msk-001
    q: A company runs self-managed Apache Kafka on EC2 and wants AWS to manage the brokers while its Kafka producers and consumers stay unchanged. Which service fits?
    a: "**Amazon MSK**.\nApps keep the Kafka APIs; AWS runs the brokers and replaces failed ones."
    facts: [what, data-plane, recovery]
  - id: msk-002
    q: A team wants Apache Kafka on AWS without sizing or scaling brokers at all. Which option fits?
    a: "MSK Serverless, which provisions and scales capacity and manages partitions automatically."
    facts: [serverless]
  - id: msk-003
    q: Can an MSK Serverless cluster be secured with Apache Kafka ACLs?
    a: "No. MSK Serverless requires IAM access control; Kafka ACLs aren't supported."
    trap: true
    facts: [serverless-iam]
  - id: msk-004
    q: Kafka topics on Amazon MSK must be copied to a cluster in another Region for disaster recovery. Which managed feature fits?
    a: "MSK Replicator, which replicates data between MSK Provisioned clusters across Regions."
    facts: [connect-replicator]
  - id: msk-005
    q: A new streaming app needs managed ingestion and the team has no Kafka code or skills. A Kafka-based team has existing Kafka code. Which AWS service fits each?
    a: "- No Kafka code: **Amazon Kinesis Data Streams**.\n- Existing Kafka code: **Amazon MSK**, which keeps the Kafka APIs."
    facts: [data-plane]
---
Amazon MSK is managed Apache Kafka. Choose it when the application or team already uses Kafka; for a new AWS-native stream, Amazon Kinesis Data Streams is usually simpler.

### How it works

1. Create an MSK Provisioned cluster (choose broker count per AZ and type) or an MSK Serverless cluster.
2. Producers and consumers connect with standard Kafka clients to create topics and stream data.
3. MSK watches the brokers and replaces failed ones.
4. MSK Connect moves data to and from other systems; MSK Replicator copies topics across clusters and Regions.

### Exam cues

- If the question says existing Apache Kafka applications or Kafka APIs, think Amazon MSK.
- If the question says Kafka without managing capacity, think MSK Serverless.
- If the question says real-time stream with no Kafka requirement, think Kinesis Data Streams.

### Remember

- At least one broker per chosen AZ in a provisioned cluster.
- MSK Serverless: automatic capacity and partitions; IAM access control only.
- MSK Connect for connectors; MSK Replicator for cross-cluster and cross-Region copies.

> **Trap:** MSK keeps the Kafka APIs. Moving a Kafka application to Kinesis Data Streams means rewriting producers and consumers, so "no code changes" points to MSK.
