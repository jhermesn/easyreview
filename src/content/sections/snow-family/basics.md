---
title: "Snow Family basics"
level: foundational
order: 5
facts:
  - id: snow-closed
    text: "AWS Snowball Edge is no longer available to new customers; AWS points new customers to DataSync for online transfers, AWS Data Transfer Terminal for physical transfers, and Outposts for edge computing."
    source: https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html#whatisedge
cards:
  - id: snow-family-007
    q: "A new AWS customer asks for Snowball Edge to move data. What does AWS suggest now?"
    a: "Snowball Edge is closed to new customers. Use AWS DataSync online, AWS Data Transfer Terminal for physical transfer, or AWS Outposts for edge computing."
    facts: [snow-closed]
---
AWS Snowball Edge devices moved data physically and ran edge workloads; the service is closed to new customers, but exam questions may still name it.

### How it works

1. Existing customers order a device and copy data to it.
2. They ship it back to AWS.
3. AWS loads the data into S3.

### Exam cues

- If the question says move data physically when the network is too slow, think the Snow Family; new customers now use other options.

### Remember

- Closed to new customers.

> **Trap:** Physical transfer is for when the network is too slow; for new customers AWS names Data Transfer Terminal instead of Snowball Edge.
