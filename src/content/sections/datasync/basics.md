---
title: "DataSync basics"
level: foundational
order: 5
facts:
  - id: online-transfer
    text: "AWS DataSync is a secure, high-speed service for transferring file or object data to, from and between AWS storage services."
    source: https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html#what-is-datasync
cards:
  - id: datasync-007
    q: "A company must copy terabytes of files from an on-premises file server to Amazon S3 over the network. Which service fits?"
    a: "AWS DataSync."
    facts: [online-transfer]
---
AWS DataSync moves file and object data over the network into, out of and between AWS storage services.

### How it works

1. Set up the source and destination locations.
2. Create a transfer task.
3. DataSync copies and verifies the data.

### Exam cues

- If the question says move large amounts of file data online, think DataSync.

### Remember

- Online transfer.

> **Trap:** DataSync transfers data; Storage Gateway gives ongoing hybrid access.
