---
title: "DataSync basics"
level: foundational
order: 5
facts:
  - id: online-transfer
    text: "AWS DataSync securely transfers file or object data at high speed. Transfers can go to, from or between AWS storage services."
    source: https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html#what-is-datasync
  - id: scheduled-task
    text: "AWS DataSync tasks can run repeatedly on a schedule."
    source: https://docs.aws.amazon.com/datasync/latest/userguide/task-scheduling.html#how-task-scheduling-works
cards:
  - id: datasync-007
    q: "A company must copy terabytes of files from an on-premises file server to Amazon S3 over the network. Which service fits?"
    a: "AWS DataSync."
    facts: [online-transfer]
  - id: datasync-008
    q: "How can AWS DataSync repeat a data transfer on a schedule?"
    a: "Configure a recurring schedule on the DataSync task."
    facts: [scheduled-task]
---
AWS DataSync moves file and object data over the network into, out of and between AWS storage services.

### How it works

1. Set up the source and destination locations.
2. Create a transfer task.
3. DataSync copies and verifies the data.

### Exam cues

- If the question says copy data on a recurring schedule, think a DataSync task schedule, because the task can run repeatedly.
- If the question says move large amounts of file data online, think DataSync.

### Remember

- Online transfer.

> **Trap:** DataSync transfers data; Storage Gateway gives ongoing hybrid access.
