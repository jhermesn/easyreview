---
title: "FSx for Lustre basics"
level: foundational
order: 5
facts:
  - id: hpc-files
    text: "Amazon FSx for Lustre runs the high-performance Lustre file system for speed-sensitive workloads such as machine learning, high performance computing and video processing."
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/what-is.html#what-is
cards:
  - id: fsx-for-lustre-010
    q: "A high performance computing job needs a very fast shared file system. Which FSx option fits?"
    a: "Amazon FSx for Lustre."
    facts: [hpc-files]
---
Amazon FSx for Lustre is a managed high-performance file system for compute-heavy workloads.

### How it works

1. Create an FSx for Lustre file system.
2. Compute nodes mount it.
3. Jobs read and write data at high speed.

### Exam cues

- If the question says HPC or ML training needing a fast file system, think FSx for Lustre.

### Remember

- Built for speed-sensitive workloads.

> **Trap:** FSx for Lustre is for performance; Windows file shares use FSx for Windows File Server.
