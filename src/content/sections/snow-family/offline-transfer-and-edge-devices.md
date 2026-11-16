---
title: Offline transfer and edge devices
level: associate
order: 10
facts:
  - id: what
    text: Snowball Edge is a device with on-board storage and compute that processes data locally, runs edge workloads, and moves data to or from AWS by shipping the device through a carrier.
    source: https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html#whatisedge
  - id: closed
    text: Since November 7, 2025, AWS Snowball Edge is available only to existing customers; new customers are pointed to AWS DataSync for online transfers, AWS Data Transfer Terminal for physical transfers, and AWS Outposts for edge compute.
    source: https://docs.aws.amazon.com/snowball/latest/developer-guide/doc-history.html#doc-history
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
cards:
  - id: snow-family-001
    q: A research site has 500 TB to load into Amazon S3 and only a slow internet link that would take months. Which AWS option did exam questions traditionally expect, and what changed in November 2025?
    a: "**AWS Snowball Edge** (ship a device, then import into S3).\nSince November 7, 2025 it is only for existing customers; new customers use DataSync, Data Transfer Terminal or Partner solutions."
    facts: [what, import-export, closed]
  - id: snow-family-002
    q: Which two Snowball Edge device options exist?
    a: "Storage Optimized 210 TB and Compute Optimized."
    facts: [options]
  - id: snow-family-003
    q: A ship with no reliable connectivity must run EC2-compatible instances and Kubernetes on board, then bring the data back to AWS. Which device family fits, for an existing customer?
    a: "Snowball Edge, which runs EC2-compatible instances and EKS Anywhere locally and ships data back to S3."
    facts: [edge-compute, closed]
  - id: snow-family-004
    q: A new AWS customer wants to physically bring hard drives to AWS for a fast upload. Which service fits?
    a: "AWS Data Transfer Terminal: reserve a slot at an AWS facility and upload with your own devices (Enterprise Support customers)."
    facts: [dtt, closed]
  - id: snow-family-005
    q: Is data on an AWS Snowball Edge device encrypted while it is shipped?
    a: "Yes. Encryption is enforced at rest and in physical transit."
    facts: [encryption]
---
The Snow Family solves two problems: moving more data than the network can carry in time, and running compute where there is no network. You load a rugged device on site and ship it back to AWS, which imports the data into Amazon S3. [What is Snowball Edge?](https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html)

### How it works

1. Create an import or export job in the AWS Snow Family console.
2. AWS ships a Snowball Edge device; you connect it to your network and unlock it.
3. Copy data to it (or run EC2-compatible instances on it), then ship it back.
4. AWS imports the data into Amazon S3; the device data is encrypted the whole way.

| Situation | Option |
|---|---|
| Large one-time move, network too slow (existing Snow customers) | Snowball Edge Storage Optimized |
| Compute at a disconnected site | Snowball Edge Compute Optimized, or AWS Outposts for new customers |
| New customer, physical upload | AWS Data Transfer Terminal |
| Enough bandwidth, recurring sync | AWS DataSync |

### Exam cues

- If the question says hundreds of terabytes and a link that would take weeks or months, think Snowball Edge, then S3 lifecycle rules for cheaper classes.
- If the question says disconnected or rugged edge location that needs local compute, think Snowball Edge Compute Optimized.
- If the question is set after November 2025 and asks for a new customer, think DataSync, Data Transfer Terminal or Outposts.

### Remember

- Closed to new customers since November 7, 2025; existing customers continue as normal.
- Storage Optimized 210 TB or Compute Optimized; up to 100 Gbit/s adapters; encryption enforced.
- Clusters of 3 to 16 devices; EC2-compatible instances and EKS Anywhere on the device.

> **Trap:** Older practice questions answer "ship the data on a Snowball" for any big migration. Snowball Edge is closed to new customers since November 7, 2025, so a new account needs DataSync, Data Transfer Terminal or a Partner solution instead.
