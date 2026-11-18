---
title: "FSx for Windows File Server basics"
level: foundational
order: 5
facts:
  - id: windows-files
    text: "Amazon FSx for Windows File Server provides fully managed Microsoft Windows file servers on a native Windows file system."
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html#what-is
cards:
  - id: fsx-for-windows-010
    q: "Windows applications need a shared SMB file system on AWS that works with Windows features. Which service fits?"
    a: "Amazon FSx for Windows File Server."
    facts: [windows-files]
---
Amazon FSx for Windows File Server gives Windows workloads managed file shares. [What is FSx for Windows File Server?](https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html#what-is)

### How it works

1. Create the file system.
2. Windows clients connect to the shares.
3. AWS manages the Windows file servers.

### Exam cues

- If the question says Windows file shares on AWS, think FSx for Windows File Server.

### Remember

- Native Windows file system.

> **Trap:** Linux shared files use Amazon EFS; Windows shares use FSx for Windows File Server.
