---
title: "FSx for NetApp ONTAP basics"
level: foundational
order: 5
facts:
  - id: ontap
    text: "Amazon FSx for NetApp ONTAP is fully managed file storage built on NetApp ONTAP, with the features of that file system."
    source: https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/what-is-fsx-ontap.html#what-is-fsx-ontap
cards:
  - id: fsx-for-netapp-ontap-010
    q: "A company runs NetApp ONTAP storage on premises and wants the same file system as a managed AWS service. Which service fits?"
    a: "Amazon FSx for NetApp ONTAP."
    facts: [ontap]
---
Amazon FSx for NetApp ONTAP brings NetApp ONTAP file storage to AWS as a managed service.

### How it works

1. Create the file system.
2. Clients use it with the ONTAP features they know.
3. AWS manages the hardware and software.

### Exam cues

- If the question says NetApp ONTAP on AWS, think FSx for NetApp ONTAP.

### Remember

- Managed NetApp ONTAP.

> **Trap:** Pick the FSx option that matches the file system the workload already uses.
