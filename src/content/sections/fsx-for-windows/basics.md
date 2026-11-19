---
title: "FSx for Windows File Server basics"
level: foundational
order: 5
facts:
  - id: windows-files
    text: "Amazon FSx for Windows File Server provides fully managed Microsoft Windows file servers on a native Windows file system."
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html#what-is
  - id: smb
    text: FSx for Windows File Server provides managed Windows file servers and supports SMB versions 2.0 through 3.1.1.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html#fsx-access-shares
  - id: active-directory
    text: FSx for Windows File Server joins an AWS Managed Microsoft AD or self-managed Microsoft Active Directory domain for authentication and access control.
    source: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/aws-ad-integration-fsxW.html#aws-ad-integration-fsxW
cards:
  - id: fsx-for-windows-010
    q: "Windows applications need a shared SMB file system on AWS that works with Windows features. Which service fits?"
    a: "Amazon FSx for Windows File Server."
    facts: [windows-files]
  - id: fsx-for-windows-001
    q: Which AWS service fits Windows SMB shares with Active Directory authentication?
    a: FSx for Windows File Server. It supports SMB and joins Microsoft Active Directory.
    facts: [smb, active-directory]
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
