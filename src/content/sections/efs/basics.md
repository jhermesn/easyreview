---
title: "EFS basics"
level: foundational
order: 5
facts:
  - id: shared-files
    text: "Amazon EFS provides serverless, fully elastic file storage that many clients can share, growing to petabytes without provisioning capacity."
    source: https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html#whatisefs
cards:
  - id: efs-025
    q: "Many Linux EC2 instances must read and write the same files at the same time. Which AWS storage service fits?"
    a: "Amazon EFS, a shared, elastic file system."
    facts: [shared-files]
---
Amazon Elastic File System (Amazon EFS) is a shared file system that grows and shrinks with the files stored in it. [What is Amazon EFS?](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html#whatisefs)

### How it works

1. Create a file system.
2. Mount it on many instances or containers.
3. Capacity grows and shrinks automatically.

### Exam cues

- If the question says shared file storage for many Linux instances, think EFS.

### Remember

- Elastic, shared, no capacity to provision.

> **Trap:** EFS is shared file storage; EBS is a disk for one instance at a time.
