---
title: "Storage Gateway basics"
level: foundational
order: 5
facts:
  - id: hybrid-storage
    text: "AWS Storage Gateway connects an on-premises software appliance with AWS cloud storage so on-premises applications can use it."
    source: https://docs.aws.amazon.com/storagegateway/latest/vgw/WhatIsStorageGateway.html#WhatIsStorageGateway
cards:
  - id: storage-gateway-016
    q: "On-premises applications must keep using local file or block storage while the data is stored in AWS. Which service fits?"
    a: "AWS Storage Gateway."
    facts: [hybrid-storage]
---
AWS Storage Gateway is a hybrid storage service: an appliance on premises stores data in AWS. [What is Storage Gateway?](https://docs.aws.amazon.com/storagegateway/latest/vgw/WhatIsStorageGateway.html#WhatIsStorageGateway)

### How it works

1. Deploy the gateway appliance on premises.
2. Applications use it as local storage.
3. The gateway stores the data in AWS.

### Exam cues

- If the question says hybrid storage connecting on-premises apps to AWS storage, think Storage Gateway.

### Remember

- On-premises appliance, cloud storage.

> **Trap:** Storage Gateway keeps apps on premises; DataSync moves data in bulk.
