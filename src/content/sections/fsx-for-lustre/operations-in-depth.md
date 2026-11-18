---
title: "PLACEHOLDER fsx-for-lustre/operations-in-depth"
level: professional
order: 20
facts:
  - id: defaults
    text: Automatic import and export of new, changed and deleted files are enabled by default when adding a repository in the console but disabled by default through the CLI or API.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/create-dra-linked-data-repo.html#create-dra-linked-data-repo
  - id: task-conflict
    text: Automatic export and export data repository tasks cannot run at the same time.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/export-changed-data-meta-dra.html#export-changed-data-meta-dra
  - id: association
    text: A data repository association links a file system directory to an S3 bucket or prefix, with up to eight associations per file system.
    source: https://docs.aws.amazon.com/fsx/latest/LustreGuide/create-dra-linked-data-repo.html#create-dra-linked-data-repo
cards:
  - id: fsx-for-lustre-006
    q: What are the default automatic import and export settings for an FSx for Lustre S3 association created through the console versus the API?
    a: The console enables new, changed and deleted events by default; the API disables automatic import and export by default.
    facts: [defaults]
  - id: fsx-for-lustre-008
    q: Can an FSx for Lustre export task run while automatic export is running?
    a: No. Automatic export and export tasks cannot run at the same time.
    trap: true
    facts: [task-conflict]
  - id: fsx-for-lustre-009
    q: What links an FSx for Lustre directory to an S3 bucket or prefix, and how many links are supported?
    a: A data repository association. A file system can have up to eight.
    facts: [association]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
