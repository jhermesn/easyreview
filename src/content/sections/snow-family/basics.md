---
title: "Snow Family basics"
level: foundational
order: 5
facts:
  - id: what
    text: "Snowball Edge is a shippable device with its own storage and compute: it processes data and runs edge workloads on site, and a carrier moves it, with the data, to or from AWS."
    source: https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html#whatisedge
  - id: closed
    text: Only existing customers can use AWS Snowball Edge since November 7, 2025. For new customers AWS suggests AWS DataSync to move data over the network, AWS Data Transfer Terminal for physical transfers and AWS Outposts for compute at the edge.
    source: https://docs.aws.amazon.com/snowball/latest/developer-guide/doc-history.html#doc-history
cards:
  - id: snow-family-007
    q: "A new AWS customer asks for Snowball Edge to move data. What does AWS suggest now?"
    a: "Snowball Edge is closed to new customers. Use AWS DataSync online, AWS Data Transfer Terminal for physical transfer, or AWS Outposts for edge computing."
    facts: [closed]
---
AWS Snowball Edge devices move data physically and run edge workloads; the service is closed to new customers.

### How it works

1. Existing customers order a device and copy data to it.
2. They ship it back to AWS.
3. AWS loads the data into S3.

### Exam cues

- If the question says move data physically when the network is too slow, think the Snow Family; new customers now use other options.

### Remember

- Closed to new customers since November 7, 2025.

> **Trap:** Physical transfer is for when the network is too slow; for new customers AWS names Data Transfer Terminal instead of Snowball Edge.
