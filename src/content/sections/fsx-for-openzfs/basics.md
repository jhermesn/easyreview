---
title: "FSx for OpenZFS basics"
level: foundational
order: 5
facts:
  - id: openzfs
    text: "Amazon FSx for OpenZFS is fully managed file storage for moving data from on-premises ZFS or other Linux file servers to AWS without changing applications."
    source: https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/what-is-fsx.html#what-is-fsx
cards:
  - id: fsx-for-openzfs-010
    q: "Linux applications use an on-premises ZFS file server and must move to AWS without code changes. Which service fits?"
    a: "Amazon FSx for OpenZFS."
    facts: [openzfs]
---
Amazon FSx for OpenZFS is a managed OpenZFS file system on AWS. [What is FSx for OpenZFS?](https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/what-is-fsx.html#what-is-fsx)

### How it works

1. Create the file system.
2. Move data from ZFS or Linux file servers.
3. Applications keep working as before.

### Exam cues

- If the question says ZFS or Linux file server moving to AWS, think FSx for OpenZFS.

### Remember

- Managed OpenZFS.

> **Trap:** Match the FSx option to the existing file system.
