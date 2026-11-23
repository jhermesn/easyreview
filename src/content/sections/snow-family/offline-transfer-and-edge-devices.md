---
title: Offline transfer and edge devices
level: associate
order: 10
facts:
  - id: options
    text: Snowball Edge comes as Storage Optimized 210 TB or Compute Optimized.
    source: https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html#whatisedge
  - id: import-export
    text: Snowball Edge imports or exports data between your site and Amazon S3 without using the internet, with network adapters of up to 100 Gbit/s on the device.
    source: https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html#edge-feature-overview
  - id: encryption
    text: Snowball Edge enforces encryption of data at rest and in physical transit.
    source: https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html#edge-feature-overview
  - id: edge-compute
    text: Snowball Edge offers S3 and EC2 compatible endpoints, runs EC2-compatible instances from AMIs, supports Amazon EKS Anywhere, and can cluster 3 to 16 devices for local durability.
    source: https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html#edge-feature-overview
  - id: dtt
    text: AWS Data Transfer Terminal is a physical AWS facility you reserve and visit with your own storage devices to upload data quickly to AWS; it is available to Enterprise Support customers.
    source: https://docs.aws.amazon.com/datatransferterminal/latest/userguide/what-is-dtt.html#what-is-dtt
  - id: import-to-s3
    text: "A Snowball Edge import job copies data into Amazon S3 buckets, with each file becoming an S3 object; to archive it cheaply, a lifecycle rule then moves the objects to a Glacier storage class."
    source: https://docs.aws.amazon.com/snowball/latest/developer-guide/importtype.html#importtype
  - id: terminal-equipment
    text: AWS Data Transfer Terminal customers must bring compatible equipment for their scheduled reservation.
    source: https://docs.aws.amazon.com/datatransferterminal/latest/userguide/tech-requirements.html
cards:
  - id: snow-family-001
    q: What network adapter speed can a Snowball Edge device use for offline data transfers?
    a: Up to 100 Gbit/s.
    facts: [import-export]
  - id: snow-family-002
    q: Which two Snowball Edge device options exist?
    a: "Storage Optimized 210 TB and Compute Optimized."
    facts: [options]
  - id: snow-family-003
    q: A ship with no reliable connectivity must run EC2-compatible instances and Kubernetes on board, then bring the data back to AWS. Which device family fits, for an existing customer?
    a: "Snowball Edge, which runs EC2-compatible instances and EKS Anywhere locally and ships data back to S3."
    facts: [edge-compute]
  - id: snow-family-004
    q: A new AWS customer wants to physically bring hard drives to AWS for a fast upload. Which service fits?
    a: "AWS Data Transfer Terminal: reserve a slot at an AWS facility and upload with your own devices (Enterprise Support customers)."
    facts: [dtt]
  - id: snow-family-005
    q: Is data on an AWS Snowball Edge device encrypted while it is shipped?
    a: "Yes. Encryption is enforced at rest and in physical transit."
    facts: [encryption]
  - id: snow-family-006
    q: "Backups shipped on a Snowball device must end up in the cheapest archive tier. Where should the import job write?"
    a: "To an S3 bucket, with a lifecycle rule that moves the objects to Glacier Deep Archive the same day. Import jobs land data in S3 buckets, not straight in a Glacier vault."
    trap: true
    facts: [import-to-s3]
  - id: snow-family-008
    q: Which AWS support customers can use AWS Data Transfer Terminal?
    a: Enterprise Support customers.
    facts: [dtt]
revised:
  - date: 2026-11-23
    note: The transfer card now tests Snowball Edge network adapter speed.
    cards: [snow-family-001]
  - date: 2026-11-23
    note: The terminal card now tests the required support tier.
    cards: [snow-family-008]
---
Snowball Edge also supports local workloads and device clusters at disconnected sites.

### How it works

1. Create an import or export job in the AWS Snow Family console.
2. Connect and unlock the device, then copy data or run EC2-compatible instances on it.
3. The device data is encrypted at rest and during shipment.

| Situation | Option |
|---|---|
| Large one-time move, network too slow (existing Snow customers) | Snowball Edge Storage Optimized |
| Compute at a disconnected site | Snowball Edge Compute Optimized, or AWS Outposts for new customers |

### Exam cues

- If the question says upload at an AWS Data Transfer Terminal, think a reservation and compatible customer equipment, because the customer visits the facility with their devices.
- If the question says hundreds of terabytes and a link that would take weeks or months, think Snowball Edge, then S3 lifecycle rules for cheaper classes.
- If the question says disconnected or rugged edge location that needs local compute, think Snowball Edge Compute Optimized.

### Remember

- Storage Optimized 210 TB or Compute Optimized; up to 100 Gbit/s adapters; encryption enforced.
- Clusters of 3 to 16 devices; EC2-compatible instances and EKS Anywhere on the device.

> **Trap:** Snowball Edge imports land in S3 buckets. Use a lifecycle rule to move the objects to a Glacier storage class.
